<?php
namespace JupiterX_Core\Raven\Modules\Products;

use JupiterX_Core\Raven\Base\Module_base;
use JupiterX_Core\Raven\Utils;
use Elementor\Plugin as Elementor;
use Elementor\Utils as ElementorUtils;

defined( 'ABSPATH' ) || die();

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.NPathComplexity)
 * @SuppressWarnings(PHPMD.TooManyMethods)
 */
class Module extends Module_Base {
	protected static $widget_data               = [];
	protected static $active_rendering_contexts = [];
	protected static $context_counter           = 0;
	protected static $increment                 = 0;
	protected static $product_item              = [];
	protected static $current_index             = 0;
	protected static $post_id                   = 0;
	protected static $model_id                  = 0;

	public function __construct() {
		parent::__construct();

		add_action( 'wp_ajax_raven_products_query', [ $this, 'ajax_query' ] );
		add_action( 'wp_ajax_nopriv_raven_products_query', [ $this, 'ajax_query' ] );

		$request_action = filter_input( INPUT_POST, 'action' );
		$request_filter = filter_input( INPUT_GET, 'sellkit_filters' );

		if ( 'sellkit_get_products' === $request_action || '1' === $request_filter ) {
			self::$post_id  = filter_input( INPUT_POST, 'postId' );
			self::$model_id = filter_input( INPUT_POST, 'modelId' );

			add_action( 'sellkit_product_filter_before_render_product', [ $this, 'add_custom_layout_hooks' ], 10 );
			remove_action( 'sellkit_product_filter_after_render_product', [ $this, 'add_custom_layout_hooks' ] );
		}

		add_filter( 'jx_products_apply_image_size', [ $this, 'apply_image_size' ], 10 );
		add_filter( 'jx_products_apply_swap_effects', [ $this, 'apply_swap_effects' ], 10 );
		add_filter( 'jx_products_apply_button_location', [ $this, 'apply_button_location' ], 10 );
		add_filter( 'jx_products_apply_button_icon', [ $this, 'apply_button_icon' ], 10 );
		add_filter( 'jx_products_apply_wishlist', [ $this, 'apply_wishlist' ], 10 );
	}

	public function get_widgets() {
		return [ 'products', 'products-carousel' ];
	}

	public function get_name() {
		return 'products';
	}

	public static function get_filters() {
		$filters        = [];
		$sorted_filters = [];

		$filter_files = glob( plugin_dir_path( __FILE__ ) . 'filters/*.php' );

		foreach ( $filter_files as $filter_file ) {
			$filter_name = basename( $filter_file, '.php' );

			if ( 'filter-base' === $filter_name ) {
				continue;
			}

			$filter_class = self::get_filter( $filter_name );

			$filters[ $filter_class::get_order() ] = [
				'name' => $filter_class::get_name(),
				'title' => $filter_class::get_title(),
			];
		}

		ksort( $filters );

		foreach ( $filters as $filter ) {
			$sorted_filters[ $filter['name'] ] = $filter['title'];
		}

		return $sorted_filters;
	}

	public static function get_filter( $filter_name ) {
		if ( empty( $filter_name ) ) {
			return false;
		}

		$filter_name = str_replace( '-', '_', $filter_name );

		return __NAMESPACE__ . '\Filters\\' . ucfirst( $filter_name );
	}

	/**
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	public static function raven_before_shop_loop_item() {
		global $product;

		$settings = self::get_current_settings();

		$quick_view_class      = function_exists( 'jupiterx_wc_is_product_quick_view_active' ) && jupiterx_wc_is_product_quick_view_active() ? 'jupiterx-product-has-quick-view' : '';
		$block_hover_animation = '';
		$loaded_animation      = '';

		if ( ! isset( $settings['is_products_carousel'] ) && ! empty( $settings['load_effect'] ) ) {
			$loaded_animation = 'raven-product-load-effect raven-product-effect-' . $settings['load_effect'];
		}

		if ( ! isset( $settings['is_products_carousel'] ) && ! empty( $settings['block_hover'] ) ) {
			$block_hover_animation = 'elementor-animation-' . $settings['block_hover'];
		}

		$layout = isset( $settings['content_layout'] ) ? $settings['content_layout'] : '';

		if ( ! empty( $settings['general_layout'] ) && in_array( $settings['general_layout'], [ 'matrix', 'metro' ], true ) ) {
			$layout = isset( $settings['metro_matrix_content_layout'] ) ? $settings['metro_matrix_content_layout'] : '';
		}

		$location = isset( $settings['pc_atc_button_location'] ) ? $settings['pc_atc_button_location'] : '';

		if ( 'overlay' === $layout ) {
			$location = isset( $settings['pc_atc_button_location_overlay'] ) ? $settings['pc_atc_button_location_overlay'] : '';
		}

		if (
			empty( $quick_view_class ) &&
			'outside' === $location
		) {
			add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
			add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );
		}

		$html = sprintf(
			'<div class="jupiterx-products-wrapper %1$s"><div class="jupiterx-product-container %2$s %3$s" data-product-id="%4$s">',
			esc_attr( $block_hover_animation ),
			esc_attr( $quick_view_class ),
			esc_attr( $loaded_animation ),
			esc_attr( $product->get_id() )
		);

		// phpcs:ignore WordPress.Security
		echo wp_kses( $html, [
			'div' => [
				'class' => [],
				'data-product-id' => [],
			],
		] );

		// Prepare sale badge.
		if ( get_theme_mod( 'jupiterx_product_list_custom_sale_badge', true ) && function_exists( 'jupiterx_wc_product_page_custom_sale_badge' ) ) {
			add_filter( 'woocommerce_sale_flash', 'jupiterx_wc_product_page_custom_sale_badge' );
		}
	}

	public static function raven_after_shop_loop_item() {
		echo wp_kses( '</div></div>', [ 'div' => [] ] );
	}

	/**
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	public static function raven_before_shop_loop_item_thumbnail() {
		if ( ! function_exists( 'jupiterx_open_markup_e' ) || ! function_exists( 'jupiterx_close_markup_e' ) ) {
			return;
		}

		global $product;

		$settings = self::get_current_settings();

		$image_size = apply_filters( 'single_product_archive_thumbnail_size', 'woocommerce_thumbnail' );
		$overlay    = '';

		if (
			( in_array( $settings['general_layout'] ?? '', [ 'matrix', 'metro' ], true ) ) ||
			( in_array( $settings['general_layout'] ?? '', [ 'grid', 'masonry' ], true ) && 'side' !== ( $settings['content_layout'] ?? '' ) )
		) {
			$overlay = '<div class="raven-product-image-overlay"></div>';
		}

		$image_fit = 'raven-image-fit';

		if (
			isset( $settings['general_layout'] ) &&
			'masonry' === $settings['general_layout'] &&
			'full' === ( $settings['image_size'] ?? '' )
		) {
			$image_fit = 'raven-masonry-image';
		}

		if ( ! empty( $settings['swap_effect'] ) && strpos( $settings['swap_effect'], 'gallery' ) !== false ) {
			$image_fit = '';
		}

		$quick_view_class   = function_exists( 'jupiterx_wc_is_product_quick_view_active' ) && jupiterx_wc_is_product_quick_view_active() ? 'jupiterx-product-has-quick-view' : '';
		$product_link_open  = '';
		$product_link_close = '';

		if (
			empty( $quick_view_class ) &&
			'outside' === ( $settings['pc_atc_button_location'] ?? '' ) &&
			'overlay' !== ( $settings['content_layout'] ?? '' )
		) {
			$product_link_open  = '<a href=' . get_the_permalink( $product->get_id() ) . '>';
			$product_link_close = '</a>';
		}

		if ( empty( $quick_view_class ) && empty( $settings['atc_button'] ?? '' ) ) {
			$product_link_open  = '<a href=' . get_the_permalink( $product->get_id() ) . '>';
			$product_link_close = '</a>';
		}

		echo '<div class=jupiterx-wc-loop-product-image-wrapper>';
			ElementorUtils::print_unescaped_internal_string( $product_link_open );
				jupiterx_open_markup_e( 'jupiterx_wc_loop_product_image', 'div', 'class=jupiterx-wc-loop-product-image ' . esc_attr( $image_fit ) );

					if ( $product ) {
						echo wp_kses_post( $overlay );
						echo wp_kses_post( $product->get_image( $image_size ) );
					}

				jupiterx_close_markup_e( 'jupiterx_wc_loop_product_image', 'div' );
			ElementorUtils::print_unescaped_internal_string( $product_link_close );
		echo '</div>';
	}

	public static function product_contet_wrapper_start() {
		echo '<div class="raven-product-content-wrapper">';
	}

	public static function product_contet_wrapper_end() {
		echo '</div>';
	}

	/**
	 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	public static function add_custom_layout_hooks( $settings ) {
		// If no settings provided, get current context settings
		if ( empty( $settings ) ) {
			$settings = self::get_current_settings();

			// Fallback: if still no settings and we have post/model IDs, fetch them
			if ( empty( $settings ) && self::$post_id && self::$model_id ) {
				$widget_data     = Elementor::$instance->documents->get( self::$post_id )->get_elements_data();
				$widget          = Utils::find_element_recursive( $widget_data, self::$model_id );
				$widget_instance = Elementor::$instance->elements_manager->create_element_instance( $widget );
				$settings        = $widget_instance->get_settings_for_display();

				self::add_custom_ordering_count( $settings );
			}
		}

		// Clean up any existing hooks first to prevent conflicts
		self::cleanup_all_hooks();

		remove_filter( 'woocommerce_before_shop_loop_item', 'jupiterx_wc_loop_item_before', 0 );
		add_filter( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item' ], 0 );

		remove_filter( 'woocommerce_after_shop_loop_item', 'jupiterx_wc_loop_item_after', 999 );
		add_filter( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'raven_after_shop_loop_item' ], 999 );

		if ( isset( $settings['layout'] ) && 'default' !== $settings['layout'] ) {
			add_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item_thumbnail' ], 20 );
			remove_action( 'woocommerce_before_shop_loop_item', 'jupiterx_wc_loop_product_thumbnail', 20 );
		}

		$layout = isset( $settings['content_layout'] ) ? $settings['content_layout'] : '';

		if ( ! empty( $settings['general_layout'] ) && in_array( $settings['general_layout'], [ 'matrix', 'metro' ], true ) ) {
			$layout = $settings['metro_matrix_content_layout'] ?? '';
		}

		$location = $settings['pc_atc_button_location'] ?? '';

		if ( 'overlay' === $layout ) {
			$location = $settings['pc_atc_button_location_overlay'] ?? '';
		}

		if ( empty( $location ) ) {
			add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
			add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );
		}

		if ( ! empty( $settings['general_layout'] ) && 'overlay' !== $layout ) {
			add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
			remove_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_start' ], 21 );
			remove_action( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_end' ] );
		}

		if ( 'overlay' === $layout ) {
			add_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_start' ], 21 );
			add_action( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_end' ] );
		}

		$request_action = filter_input( INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( 'sellkit_get_products' === $request_action ) {
			if ( 'inside' === $location && 'overlay' === $layout ) {
				add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
				add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );
				remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart' );
				add_action( 'jupiterx_wc_loop_product_image_append_markup', 'woocommerce_template_loop_add_to_cart' );
			}

			if ( 'outside' === $location && 'overlay' === $layout ) {
				add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 999 );
			}
		}
	}

	public static function remove_custom_layout_hooks( $settings ) {
		// Clean up hooks
		self::cleanup_all_hooks();

		// Restore default hooks
		remove_filter( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item' ], 0 );
		add_filter( 'woocommerce_before_shop_loop_item', 'jupiterx_wc_loop_item_before', 0 );

		add_filter( 'woocommerce_after_shop_loop_item', 'jupiterx_wc_loop_item_after', 999 );
		remove_filter( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'raven_after_shop_loop_item' ], 999 );

		if ( isset( $settings['layout'] ) && 'default' !== $settings['layout'] ) {
			remove_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item_thumbnail' ], 20 );
			add_action( 'woocommerce_before_shop_loop_item', 'jupiterx_wc_loop_product_thumbnail', 20 );
		}

		if ( ! empty( $settings['general_layout'] ) ) {
			add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
			remove_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_start' ], 21 );
			remove_action( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_end' ] );
		}

		if ( isset( $settings['layout'] ) && 'custom' !== $settings['layout'] ) {
			return;
		}

		$current_settings = self::get_current_settings();
		// Use current context settings if available, otherwise fall back to passed settings
		$active_settings = ! empty( $current_settings ) ? $current_settings : $settings;

		$layout = $settings['content_layout'] ?? '';

		if ( ! empty( $active_settings['general_layout'] ) && in_array( $active_settings['general_layout'], [ 'matrix', 'metro' ], true ) ) {
			$layout = $settings['metro_matrix_content_layout'] ?? '';
		}

		$location = $settings['pc_atc_button_location'] ?? '';

		if ( 'overlay' === $layout ) {
			$location = $settings['pc_atc_button_location_overlay'] ?? '';
		}

		if ( 'inside' === $location ) {
			remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
			remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );
		}

		remove_action( 'jupiterx_wc_loop_product_image_append_markup', [ __CLASS__, 'add_product_gallery' ] );
		remove_all_filters( 'woocommerce_loop_add_to_cart_link' );
	}

	/**
	 * Clean up all hooks that might interfere between widgets
	 */
	private static function cleanup_all_hooks() {
		// Remove all potential hook conflicts - both our custom hooks and WooCommerce defaults
		remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10 );
		remove_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart' );
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 999 );
		remove_action( 'jupiterx_wc_loop_product_image_append_markup', 'woocommerce_template_loop_add_to_cart' );
		remove_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_start' ], 21 );
		remove_action( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'product_contet_wrapper_end' ] );

		// Remove our custom hooks that might be left over
		remove_filter( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item' ], 0 );
		remove_filter( 'woocommerce_after_shop_loop_item', [ __CLASS__, 'raven_after_shop_loop_item' ], 999 );
		remove_action( 'woocommerce_before_shop_loop_item', [ __CLASS__, 'raven_before_shop_loop_item_thumbnail' ], 20 );

		// Clear all jupiterx_wc_loop_product_image_append_markup hooks which might have content
		remove_all_actions( 'jupiterx_wc_loop_product_image_append_markup' );
	}

	public static function query( $widget, $settings ) {
		$filter          = self::get_filter( $settings['query_filter'] );
		$fallback_filter = self::get_filter( $settings['query_fallback_filter'] );

		// Create and activate a rendering context for this widget
		$widget_id  = isset( $widget ) && method_exists( $widget, 'get_id' ) ? $widget->get_id() : uniqid( 'query_widget_', true );
		$context_id = self::create_rendering_context( $widget_id, $settings );
		self::activate_rendering_context( $context_id );

		remove_action( 'woocommerce_shop_loop_item_title', 'jupiterx_wc_template_loop_product_title' );

		if ( 'custom' === $settings['layout'] ) {
			remove_action( 'woocommerce_before_shop_loop_item', 'jupiterx_wc_loop_elements_enabled' );
			self::add_custom_layout_hooks( $settings );
		}

		add_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title' );
		add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart' );
		add_action( 'woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10 );

		self::add_custom_ordering_count( $settings );

		apply_filters( 'jx_products_apply_image_size', $settings );
		apply_filters( 'jx_products_apply_swap_effects', $settings );
		apply_filters( 'jx_products_apply_button_location', $settings );
		apply_filters( 'jx_products_apply_button_icon', $settings );
		apply_filters( 'jx_products_apply_wishlist', $settings );

		$query = $filter::query( $widget, $settings );

		if ( empty( $fallback_filter ) ) {
			// Store context ID in query for later cleanup
			$query->context_id = $context_id;
			return $query;
		}

		$products      = $query->get_content();
		$query_results = $products['query_results'];

		if ( 0 === (int) $query_results->total ) {
			$query                  = $fallback_filter::query( $widget, $settings );
			$query->fallback_filter = true;
		}

		// Store context ID in query for later cleanup
		$query->context_id = $context_id;
		return $query;
	}

	public static function ajax_query() {
		$post_id       = filter_input( INPUT_GET, 'post_id' );
		$model_id      = filter_input( INPUT_GET, 'model_id' );
		$paged         = filter_input( INPUT_GET, 'paged' );
		$archive_query = filter_input( INPUT_GET, 'raven_archive_query' );

		if ( empty( $post_id ) ) {
			wp_send_json_error( new \WP_Error( 'no_post_id', __( 'No post_id defined.', 'jupiterx-core' ) ) );
		}

		if ( empty( $model_id ) ) {
			wp_send_json_error( new \WP_Error( 'no_model_id', __( 'No model_id defined.', 'jupiterx-core' ) ) );
		}

		// Widget.
		$widget_data     = Elementor::$instance->documents->get( $post_id )->get_elements_data();
		$widget          = Utils::find_element_recursive( $widget_data, $model_id );
		$widget_instance = Elementor::$instance->elements_manager->create_element_instance( $widget );
		$widget_settings = $widget_instance->get_settings_for_display();

		$widget_settings['page']          = $paged;
		$widget_settings['archive_query'] = json_decode( $archive_query );

		self::get_pagination( $widget_settings );

		// Query.
		$query      = static::query( $widget_instance, $widget_settings );
		$products   = $query->get_content();
		$query_args = $query->get_query_args();

		wp_send_json_success( [
			'products' => self::format_query_products( $products ),
			'query_results' => $products['query_results'],
			'paged' => ! empty( $query_args['paged'] ) ? $query_args['paged'] : 1,
			'result_count' => self::get_query_result_count( $products ),
		] );
	}

	public static function add_custom_ordering_count( $settings ) {
		$current_settings = self::get_current_settings();
		// Use current context settings if available, otherwise fall back to passed settings
		$active_settings = ! empty( $current_settings ) ? $current_settings : $settings;

		if (
			'yes' !== ( $active_settings['show_pagination'] ?? '' ) &&
			isset( $active_settings['show_all_products'] ) &&
			$active_settings['show_all_products']
		) {
			return;
		}

		if (
			isset( $active_settings['allow_ordering'] ) &&
			isset( $active_settings['show_result_count'] ) &&
			! $active_settings['allow_ordering'] &&
			! $active_settings['show_result_count']
		) {
			return;
		}

		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
		remove_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );

		add_action( 'woocommerce_before_shop_loop', [ __CLASS__, 'custom_soring_and_result_count' ], 20 );
	}

	public static function remove_custom_ordering_count() {
		$settings = self::get_current_settings();

		if (
			'yes' !== ( $settings['show_pagination'] ?? '' ) &&
			isset( $settings['show_all_products'] ) &&
			$settings['show_all_products']
		) {
			return;
		}

		if (
			isset( $settings['allow_ordering'] ) &&
			isset( $settings['show_result_count'] ) &&
			! $settings['allow_ordering'] &&
			! $settings['show_result_count']
		) {
			return;
		}

		remove_action( 'woocommerce_before_shop_loop', [ __CLASS__, 'custom_soring_and_result_count' ], 20 );

		add_action( 'woocommerce_before_shop_loop', 'woocommerce_result_count', 20 );
		add_action( 'woocommerce_before_shop_loop', 'woocommerce_catalog_ordering', 30 );
	}

	public static function custom_soring_and_result_count() {
		$settings              = self::get_current_settings();
		$product_results_count = '';

		if ( 'x' === ( $settings['result_count_style'] ?? '' ) ) {
			$product_results_count = '<p class="woocommerce-result-count">' . self::woocommerce_result_count() . '</p>';
		}

		ob_start();

		if ( 'x' !== ( $settings['result_count_style'] ?? '' ) ) {
			woocommerce_result_count();
		}

		$product_results_count .= ob_get_clean();

		$product_results_count .= self::woocommerce_catalog_ordering();

		ElementorUtils::print_unescaped_internal_string( '<div class="raven-products-ordering-result-wrapper">' . $product_results_count . '</div>' );
	}


	/**
	 * Override woocommerce result count.
	 *
	 * @since 3.2.0
	 */
	public static function woocommerce_result_count( $total = null, $per_page = null, $current = null, $on_load = true ) {
		if ( ( ! wc_get_loop_prop( 'is_paginated' ) || ! woocommerce_products_will_display() ) && $on_load ) {
			return '';
		}

		$total    = empty( $total ) ? wc_get_loop_prop( 'total' ) : $total;
		$per_page = empty( $per_page ) ? wc_get_loop_prop( 'per_page' ) : $per_page;
		$current  = empty( $current ) ? wc_get_loop_prop( 'current_page' ) : $current;

		if ( 1 === intval( $total ) ) {
			return esc_html__( '1 Product', 'jupiterx-core' );
		}

		if ( $total <= $per_page || -1 === $per_page ) {
			return sprintf(
				// translators: %s Products count
				esc_html__( '%s Products', 'jupiterx-core' ),
				$total
			);
		}

		$products = min( $total, $per_page * $current );

		return sprintf(
			// translators: %s Products count
			esc_html__( '%s Products', 'jupiterx-core' ),
			$products
		);
	}

	/**
	 * Override woocommerce catalog form.
	 *
	 * @since 3.2.0
	 */
	public static function woocommerce_catalog_ordering() {
		ob_start();
		woocommerce_catalog_ordering();

		$ordering = ob_get_clean();
		$svg_icon = '<svg aria-hidden="true" class="e-font-icon-svg e-fas-chevron-down" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>';

		return '<div class="raven-products-ordering-wrapper">' . $ordering . $svg_icon . '</div>';
	}

	public static function get_pagination( $settings, $disable = false ) {
		remove_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );
		remove_action( 'woocommerce_after_shop_loop', 'jupiterx_add_load_more', 30 );

		if ( 'yes' === $settings['show_all_products'] || $disable ) {
			return;
		}

		if (
			'yes' !== $settings['show_pagination']
		) {
			add_action( 'woocommerce_after_shop_loop', function() {
				echo wp_kses_post( '<span class="raven-products-preloader">' );
			}, 30 );

			return;
		}

		if ( 'infinite_load' === $settings['pagination_type'] ) {
			add_action( 'woocommerce_after_shop_loop', function() {
				echo wp_kses_post( '<span class="raven-products-preloader"></span><span class="raven-infinite-load"></span>' );
			}, 30 );

			return;
		}

		if ( 'load_more' === $settings['pagination_type'] ) {
			$text = $settings['load_more_text'];
			add_action( 'woocommerce_after_shop_loop', function() use ( $text ) {
				$load_more = sprintf(
					'<span class="raven-products-preloader"></span><div class="raven-load-more"><a class="raven-load-more-button" href="#"><span>%s</span></a></div>',
					$text
				);

				echo wp_kses_post( $load_more );
			}, 30 );
		}

		if ( 'page_based' === $settings['pagination_type'] ) {
			add_action( 'woocommerce_after_shop_loop', 'woocommerce_pagination', 10 );
		}
	}

	private static function format_query_products( $products ) {
		$products = $products['data'];

		preg_match(
			'/<li.+li>/s',
			$products,
			$matches
		);

		return ! empty( $matches ) ? $matches[0] : false;
	}

	private static function get_query_result_count( $products ) {
		$settings = self::get_current_settings();

		$args = [
			'total'    => ! empty( $products['query_results']->total ) ? $products['query_results']->total : '',
			'per_page' => ! empty( $products['query_results']->per_page ) ? $products['query_results']->per_page : '',
			'current'  => ! empty( $products['query_results']->current_page ) ? $products['query_results']->current_page : '',
		];

		ob_start();

		wc_get_template( 'loop/result-count.php', $args );

		$product_results_count = ob_get_clean();

		if ( 'x' === ( $settings['result_count_style'] ?? '' ) ) {
			$product_results_count = '<p class="woocommerce-result-count">' . self::woocommerce_result_count( $args['total'], $args['per_page'], $args['current'], false ) . '</p>';
		}

		return $product_results_count;
	}

	/**
	 * Note: The control name for image size here should be 'image'.
	 *       Elementor will add '_size' and '_custom_dimension' prefix to the control name.
	 *
	 * @param $settings
	 *
	 * @return void
	 */
	public static function apply_image_size( $settings ) {
		add_filter( 'single_product_archive_thumbnail_size', function( $size ) use ( $settings ) {

			if ( 'custom' !== $settings['image_size'] ) {
				$image_size = ! empty( $settings['image_size'] ) ? $settings['image_size'] : 'woocommerce_thumbnail';
				$size       = $image_size;

				return $size;
			}

			$size = [
				0 => $settings['image_custom_dimension']['width'] || 100,
				1 => $settings['image_custom_dimension']['height'] || 100,
			];

			return $size;
		} );
	}

	/**
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	public static function apply_swap_effects( $settings ) {
		// Return on 'None', 'Enlarge on Hover' since no markup modification is needed.
		if (
			empty( $settings['swap_effect'] ) ||
			'enlarge_hover' === $settings['swap_effect']
		) {
			return;
		}

		// Enqueue WC Zoom library for 'Zoom on Hover' effect and add full src of image.
		if ( 'zoom_hover' === $settings['swap_effect'] ) {
			wp_enqueue_script( 'zoom' );

			add_action( 'jupiterx_wc_loop_product_image_prepend_markup', function() {
				global $product;

				$product_image = wp_get_attachment_image_src( $product->get_image_id(), 'full' );

				if ( ! empty( $product_image ) ) {
					add_filter( 'safe_style_css', function( $styles ) {
						$styles[] = 'display';
						return $styles;
					} );

					$allowed_html = [
						'img' => [
							'style' => true,
							'src' => [],
						],
					];

					echo wp_kses( "<img style='display: none;' src='" . esc_attr( $product_image[0] ) . "'>", $allowed_html );
				}
			} );

			return;
		}

		// Add a class to the parent of images with gallery images.
		add_filter( 'woocommerce_post_class', function( $classes ) {
			global $product;

			$gallery_ids = $product->get_gallery_image_ids();

			if ( ! empty( $gallery_ids ) ) {
				$classes[] = 'jupiterx-has-gallery-images';
			}

			return $classes;
		} );

		// Add gallery images to the markup.
		add_action( 'jupiterx_wc_loop_product_image_append_markup', [ __CLASS__, 'add_product_gallery' ] );
	}

	public static function add_product_gallery() {
		global $product;

		$settings    = self::get_current_settings();
		$output      = '';
		$size        = apply_filters( 'single_product_archive_thumbnail_size', 'woocommerce_thumbnail' );
		$gallery_ids = $product->get_gallery_image_ids();

		if ( empty( $settings ) ) {
			return;
		}

		if ( strpos( $settings['swap_effect'] ?? '', 'gallery' ) !== false ) {
			wp_enqueue_script( 'flexslider' );
		}

		if ( empty( $gallery_ids ) ) {
			return;
		}

		if ( in_array( $settings['swap_effect'] ?? '', [ 'fade_hover', 'flip_hover' ], true ) ) {
			$output = wp_get_attachment_image( array_shift( $gallery_ids ), $size );
		}

		if ( strpos( $settings['swap_effect'] ?? '', 'gallery' ) !== false ) {
			$output = '<ul class="raven-swap-effect-gallery-slides">';

			$output .= '<li><div class="raven-image-fit">' . wp_get_attachment_image( $product->get_image_id(), $size ) . '</div></li>';

			foreach ( $gallery_ids as $id ) {
				$output .= '<li><div class="raven-image-fit">' . wp_get_attachment_image( $id, $size ) . '<div></li>';
			}

			$output .= '</ul>';
		}

		echo wp_kses_post( $output );
	}

	public static function apply_button_location() {
		// Always use current context settings, ignore passed settings completely
		$current_settings = self::get_current_settings();

		// If no active context, return early
		if ( empty( $current_settings ) ) {
			return;
		}

		if ( isset( $current_settings['layout'] ) && 'custom' !== $current_settings['layout'] ) {
			return;
		}

		$layout = $current_settings['content_layout'] ?? '';

		if ( ! empty( $current_settings['general_layout'] ) && in_array( $current_settings['general_layout'], [ 'matrix', 'metro' ], true ) ) {
			$layout = $current_settings['metro_matrix_content_layout'] ?? '';
		}

		$location = $current_settings['pc_atc_button_location'] ?? '';

		if ( 'overlay' === $layout ) {
			$location = $current_settings['pc_atc_button_location_overlay'] ?? '';
		}

		if ( 'outside' === $location ) {
			return;
		}

		// If add to cart button is disabled, remove it from appearing anywhere
		if ( empty( $current_settings['atc_button'] ) || 'show' !== $current_settings['atc_button'] ) {
			remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart' );
			remove_action( 'jupiterx_wc_loop_product_image_append_markup', 'woocommerce_template_loop_add_to_cart' );
			return;
		}

		add_action( 'woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 21 );
		add_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 999 );

		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart' );
		add_action( 'jupiterx_wc_loop_product_image_append_markup', 'woocommerce_template_loop_add_to_cart' );
	}

	public static function apply_button_icon( $settings ) {
		if ( empty( $settings['pc_atc_button_icon'] ) ) {
			return;
		}

		add_filter( 'woocommerce_loop_add_to_cart_link', function( $link ) use ( $settings ) {
			ob_start();
				\Elementor\Icons_Manager::render_icon( $settings['pc_atc_button_icon'], [ 'aria-hidden' => 'true' ] );
			$icon = ob_get_clean();

			$link = preg_replace( '/>(.+)</m', ">{$icon} $1<", $link );

			return $link;
		} );
	}

	public static function apply_wishlist( $settings ) {
		if ( empty( $settings['wishlist'] ) ) {
			return;
		}

		add_action( 'jupiterx_wc_loop_product_image_prepend_markup', function() use ( $settings ) {
			if ( ! class_exists( 'YITH_WCWL' ) ) {
				return;
			}

			global $product;

			$product_id   = $product->get_id();
			$state        = 'add';
			$classes      = 'jupiterx-wishlist';
			$nonce_add    = wp_create_nonce( 'add_to_wishlist' );
			$nonce_remove = wp_create_nonce( 'remove_from_wishlist' );

			if ( YITH_WCWL()->is_product_in_wishlist( $product_id ) ) {
				$classes .= ' jupiterx-wishlist-remove';
				$state    = 'remove';
			}

			$wishlist_button = sprintf(
				'<button class="%1$s" data-state="%2$s" data-product-id="%3$s" data-nonce-add="%4$s" data-nonce-remove="%5$s">',
				esc_attr( $classes ),
				esc_attr( $state ),
				esc_attr( $product_id ),
				esc_attr( $nonce_add ),
				esc_attr( $nonce_remove )
			);

			ob_start();
			\Elementor\Icons_Manager::render_icon( $settings['wishlist_icon'], [
				'aria-hidden' => 'true',
				'class'       => 'jupiterx-wishlist-add-icon',
			] );

			\Elementor\Icons_Manager::render_icon( $settings['wishlist_icon_remove'], [
				'aria-hidden' => 'true',
				'class'       => 'jupiterx-wishlist-remove-icon',
			] );

			$wishlist_button .= ob_get_clean();
			$wishlist_button .= '</button>';

			$kses_defaults = wp_kses_allowed_html( 'post' );

			$svg_args = [
				'svg' => [
					'class' => true,
					'aria-hidden' => true,
					'aria-labelledby' => true,
					'role' => true,
					'xmlns' => true,
					'width' => true,
					'height' => true,
					'viewbox' => true,
				],
				'g' => [
					'fill' => true,
				],
				'title' => [
					'title' => true,
				],
				'path' => [
					'd'  => true,
					'fill' => true,
				],
			];

			$allowed_tags = array_merge( $kses_defaults, $svg_args );

			echo wp_kses( $wishlist_button, $allowed_tags );
		} );
	}

	public static function is_editor_or_preview() {
		$elementor  = \Elementor\Plugin::instance();
		$is_preview = (bool) filter_input( INPUT_GET, 'elementor_library', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		return $elementor->editor->is_edit_mode() || $is_preview;
	}

	/**
	 * Create a new rendering context for a widget
	 */
	public static function create_rendering_context( $widget_id, $settings ) {
		$context_id = 'ctx_' . self::$context_counter++;

		self::$active_rendering_contexts[ $context_id ] = [
			'widget_id' => $widget_id,
			'settings' => $settings,
			'is_active' => false,
		];
		return $context_id;
	}

	/**
	 * Activate a rendering context
	 */
	public static function activate_rendering_context( $context_id ) {
		if ( isset( self::$active_rendering_contexts[ $context_id ] ) ) {
			// Deactivate all other contexts
			foreach ( self::$active_rendering_contexts as $key => $context ) {
				self::$active_rendering_contexts[ $key ]['is_active'] = false;
			}
			// Activate the requested context
			self::$active_rendering_contexts[ $context_id ]['is_active'] = true;
		}
	}

	/**
	 * Deactivate a rendering context
	 */
	public static function deactivate_rendering_context( $context_id ) {
		if ( isset( self::$active_rendering_contexts[ $context_id ] ) ) {
			self::$active_rendering_contexts[ $context_id ]['is_active'] = false;
		}
	}

	/**
	 * Get settings for the currently active context
	 */
	public static function get_current_settings() {
		foreach ( self::$active_rendering_contexts as $context ) {
			if ( $context['is_active'] ) {
				return $context['settings'];
			}
		}
		return [];
	}

	/**
	 * Clean up a rendering context
	 */
	public static function cleanup_rendering_context( $context_id ) {
		unset( self::$active_rendering_contexts[ $context_id ] );
	}
}
