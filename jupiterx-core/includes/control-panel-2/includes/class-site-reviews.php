<?php
defined('ABSPATH') || exit;

/** Thin, nonce-protected client of the central account service. */
class JupiterX_Core_Site_Reviews {
    public function __construct() {
        add_action('wp_ajax_jupiterx_site_review_status', [$this, 'status']);
        add_action('wp_ajax_jupiterx_site_review_submit', [$this, 'submit']);
        add_action('wp_ajax_jupiterx_site_review_dismiss', [$this, 'dismiss']);
    }

    public static function settings() {
        return [
            'hiddenUntil' => self::hidden_until(),
            'snoozed' => self::hidden_until() > time(),
            'enabled' => (bool) get_option('jupiterx_site_reviews_enabled', true),
            // Local installs without a local portal use the normal account link, not a failing API retry.
            'portalOnly' => self::is_local() && !self::allowed_url(self::api_base(), '/wp-json/my-artbees/v1/service-requests'),
            'url' => home_url('/'),
            'email' => wp_get_current_user()->user_email,
            'portal' => self::portal(),
        ];
    }

    private static function dismissal_key() {
        // User meta is shared on multisite; explicitly scope this preference to this site.
        return 'jupiterx_site_reviews_hidden_until_' . get_current_blog_id();
    }

    public static function hidden_until() {
        return (int) get_user_meta(get_current_user_id(), self::dismissal_key(), true);
    }

    public function dismiss() {
        $this->guard();
        $until = time() + 20 * DAY_IN_SECONDS;
        $saved = update_user_meta(get_current_user_id(), self::dismissal_key(), $until);
        if (false === $saved && self::hidden_until() !== $until) {
            wp_send_json_error(['message' => __('Could not hide this card. Please try again.', 'jupiterx-core')], 500);
        }
        wp_send_json_success(['hiddenUntil' => $until]);
    }

    private static function portal() {
        $default = 'https://my.artbees.net/site-reviews/';
        $value = get_option('jupiterx_site_reviews_portal_url', $default);
        return self::allowed_url($value, '/site-reviews/') ? $value : $default;
    }

    private static function is_local() {
        return substr(strtolower((string) wp_parse_url(home_url(), PHP_URL_HOST)), -5) === '.test';
    }

    private static function api_base() {
        return get_option('jupiterx_site_reviews_api_url', 'https://my.artbees.net/wp-json/my-artbees/v1/service-requests');
    }

    /** Never send installation credentials to an arbitrary configured host. */
    private static function allowed_url($url, $path) {
        if (!is_string($url)) { return false; }
        $parts = wp_parse_url($url);
        if (!$parts || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment']) || isset($parts['port'])) {
            return false;
        }
        $host = strtolower($parts['host'] ?? '');
        $local = self::is_local();
        $scheme = $parts['scheme'] ?? '';
        $valid_host = $local
            ? substr($host, -5) === '.test' && in_array($scheme, ['http', 'https'], true)
            : $host === 'my.artbees.net' && $scheme === 'https';
        return $valid_host && rtrim($parts['path'] ?? '', '/') === rtrim($path, '/');
    }

    private function guard() {
        check_ajax_referer('jupiterx_control_panel', 'nonce');
        if (!current_user_can('manage_options') || !get_option('jupiterx_site_reviews_enabled', true)) {
            wp_send_json_error(['message' => __('Site Reviews is not available.', 'jupiterx-core')], 403);
        }
    }

    private function call($action, $data = []) {
        $key = jupiterx_get_option('api_key', '');
        $token = jupiterx_get_option('api_access_token', '');
        if (!$key || !$token) {
            wp_send_json_error(['message' => __('Connect your Jupiter X license, or log in to myArtbees to request a review.', 'jupiterx-core')], 401);
        }
        $base = self::api_base();
        if (!self::allowed_url($base, '/wp-json/my-artbees/v1/service-requests')) {
            wp_send_json_error(['message' => __('Configure the Site Reviews endpoint for this environment.', 'jupiterx-core')], 503);
        }
        $base = untrailingslashit($base);
        $response = wp_remote_post($base . '/plugin/' . $action, [
            'timeout' => 15, 'redirection' => 0,
            'headers' => ['Content-Type' => 'application/json', 'X-Artbees-License' => $key, 'X-Artbees-Token' => $token],
            'body' => wp_json_encode($data),
        ]);
        if (is_wp_error($response)) {
            wp_send_json_error(['message' => __('The request service could not be reached. Please retry with the same form.', 'jupiterx-core')], 503);
        }
        $body = json_decode(wp_remote_retrieve_body($response), true);
        $status = wp_remote_retrieve_response_code($response);
        if ($status < 200 || $status >= 300 || !is_array($body)) {
            $message = is_array($body) && isset($body['message']) && is_string($body['message'])
                ? sanitize_text_field($body['message']) : __('Site Reviews is temporarily unavailable.', 'jupiterx-core');
            wp_send_json_error(['message' => $message], $status >= 400 && $status < 600 ? $status : 502);
        }
        if ($action === 'eligibility' && (!isset($body['credits']['remaining'], $body['credits']['eligible'], $body['intake_open'])
            || !is_numeric($body['credits']['remaining']) || !is_bool($body['credits']['eligible']) || !is_bool($body['intake_open']))) {
            wp_send_json_error(['message' => __('Site Reviews is temporarily unavailable.', 'jupiterx-core')], 502);
        }
        if ($action === 'submit' && empty($body['request']['id'])) {
            wp_send_json_error(['message' => __('The response could not be confirmed. Please retry with the same form.', 'jupiterx-core')], 502);
        }
        wp_send_json_success($body);
    }

    public function status() {
        $this->guard();
        // Credentials already belong to this installation; no URL, email or diagnostics sent on page load.
        $this->call('eligibility');
    }

    public function submit() {
        $this->guard();
        if (($_POST['consent'] ?? '') !== 'true') {
            wp_send_json_error(['message' => __('Please give consent before sending your request.', 'jupiterx-core')], 400);
        }
        $data = ['consent' => true];
        foreach (['request_type', 'source', 'url', 'email', 'context', 'idempotency_key'] as $key) {
            if (isset($_POST[$key]) && !is_scalar($_POST[$key])) { wp_send_json_error(['message' => __('Invalid form value.', 'jupiterx-core')], 400); }
            if (strlen((string) ($_POST[$key] ?? '')) > 16000) { wp_send_json_error(['message' => __('Form value is too long.', 'jupiterx-core')], 400); }
            $data[$key] = sanitize_textarea_field(wp_unslash($_POST[$key] ?? ''));
        }
        if (!in_array($data['source'], ['jupiterx_onboarding', 'jupiterx_control_panel'], true)) {
            $data['source'] = 'jupiterx_control_panel';
        }
        $this->call('submit', $data);
    }
}

new JupiterX_Core_Site_Reviews();
