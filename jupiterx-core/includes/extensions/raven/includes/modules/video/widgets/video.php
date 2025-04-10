<?php
namespace JupiterX_Core\Raven\Modules\Video\Widgets;

use Elementor\Group_Control_Image_Size;
use JupiterX_Core\Raven\Base\Base_Widget;
use JupiterX_Core\Raven\Utils;
use Elementor\Plugin as Elementor;
use Elementor\Group_Control_Css_Filter;

defined( 'ABSPATH' ) || die();

/**
 * Temporary suppressed.
 *
 * @SuppressWarnings(PHPMD)
 */
class Video extends Base_Widget {

	public function get_name() {
		return 'raven-video';
	}

	public function get_title() {
		return esc_html__( 'Advanced Video', 'jupiterx-core' );
	}

	public function get_icon() {
		return 'raven-element-icon raven-element-icon-video';
	}

	public function get_script_depends() {
		return [ 'mediaelement', 'mediaelement-vimeo', 'jupiterx-core-raven-mejs-speed', 'jupiterx-core-raven-mejs-forward', 'jupiterx-core-raven-mejs-back' ];
	}

	public function get_style_depends() {
		return [ 'mediaelement' ];
	}

	protected function register_controls() {
		$this->register_section_video();
		$this->register_section_muted_autoplay();
		$this->register_section_video_controls();
		$this->register_section_image_overlay();
		$this->register_section_device_frame();
		$this->register_section_style();
	}

	private function register_section_video() {
		$this->start_controls_section(
			'section_video',
			[
				'label' => esc_html__( 'Video', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'video_type',
			[
				'label' => esc_html__( 'Video Type', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'youtube',
				'frontend_available' => true,
				'options' => [
					'youtube' => esc_html__( 'YouTube', 'jupiterx-core' ),
					'vimeo' => esc_html__( 'Vimeo', 'jupiterx-core' ),
					'hosted' => esc_html__( 'Self Hosted', 'jupiterx-core' ),
				],
			]
		);

		$this->add_control(
			'youtube_link',
			[
				'label' => esc_html__( 'Link', 'jupiterx-core' ),
				'type' => 'text',
				'placeholder' => esc_html__( 'Enter your YouTube link', 'jupiterx-core' ),
				'default' => 'https://www.youtube.com/watch?v=GuAL8OhcbNk',
				'label_block' => true,
				'condition' => [
					'video_type' => 'youtube',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'vimeo_link',
			[
				'label' => esc_html__( 'Link', 'jupiterx-core' ),
				'type' => 'text',
				'placeholder' => esc_html__( 'Enter your Vimeo link', 'jupiterx-core' ),
				'default' => 'https://vimeo.com/100902001',
				'label_block' => true,
				'condition' => [
					'video_type' => 'vimeo',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'hosted_link',
			[
				'label' => esc_html__( 'Upload Video - MP4', 'jupiterx-core' ),
				'type' => 'raven_media',
				'placeholder' => esc_html__( 'https://your-link.com', 'jupiterx-core' ),
				'label_block' => true,
				'query' => [
					'type' => 'video/mp4',
				],
				'condition' => [
					'video_type' => 'hosted',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'hosted_link_webm',
			[
				'label' => esc_html__( 'Upload Video - WebM', 'jupiterx-core' ),
				'type' => 'raven_media',
				'placeholder' => esc_html__( 'https://your-link.com', 'jupiterx-core' ),
				'label_block' => true,
				'query' => [
					'type' => 'video/webm',
				],
				'condition' => [
					'video_type' => 'hosted',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'start_time',
			[
				'label'     => esc_html__( 'Start Time', 'jupiterx-core' ),
				'description' => esc_html__( 'Specify a start time (in seconds)', 'jupiterx-core' ),
				'type'      => 'number',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'end_time',
			[
				'label'     => esc_html__( 'End Time', 'jupiterx-core' ),
				'description' => esc_html__( 'Specify an end time (in seconds)', 'jupiterx-core' ),
				'type'      => 'number',
				'condition' => [
					'video_type' => [ 'youtube', 'hosted' ],
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'video_options_heading',
			[
				'label' => esc_html__( 'Video Options', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'video_aspect_ratio',
			[
				'label' => esc_html__( 'Aspect Ratio', 'jupiterx-core' ),
				'type' => 'select',
				'render_type' => 'template',
				'options' => [
					'1 / 1' => '1:1',
					'2 / 1' => '2:1',
					'3 / 2' => '3:2',
					'4 / 3' => '4:3',
					'5 / 4' => '5:4',
					'5 / 3' => '5:3',
					'8 / 5' => '8:5',
					'9 / 5' => '9:5',
					'9 / 16' => '9:16',
					'10 / 7' => '10:7',
					'16 / 9' => '16:9',
					'20 / 9' => '20:9',
					'21 / 9' => '21:9',
					'25 / 9' => '25:9',
				],
				'default' => '16 / 9',
				'selectors' => [
					'{{WRAPPER}} .raven-video, {{WRAPPER}} .raven-video-thumbnail .raven-modal .modal-content' => 'aspect-ratio: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'youtube_autoplay',
			[
				'label' => esc_html__( 'Autoplay', 'jupiterx-core' ),
				'description' => esc_html__( 'Video will be muted if Autoplay is enabled.', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'youtube',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'youtube_mute',
			[
				'label' => esc_html__( 'Mute', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'youtube',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'youtube_loop',
			[
				'label' => esc_html__( 'Loop', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'youtube',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'youtube_rel',
			[
				'label' => esc_html__( 'Suggested Videos', 'jupiterx-core' ),
				'type' => 'hidden',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'condition' => [
					'video_type' => 'youtube',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'youtube_controls',
			[
				'label' => esc_html__( 'Player Controls', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'condition' => [
					'video_type' => 'youtube',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'youtube_showinfo',
			[
				'label' => esc_html__( 'Player Title & Actions', 'jupiterx-core' ),
				'type' => 'hidden',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'condition' => [
					'video_type' => 'youtube',
				],
			]
		);

		$this->add_control(
			'youtube_privacy',
			[
				'label' => esc_html__( 'Privacy Mode', 'jupiterx-core' ),
				'type' => 'switcher',
				'description' => esc_html__( 'When you turn on privacy mode, YouTube won\'t store information about visitors on your website unless they play the video.', 'jupiterx-core' ),
				'condition' => [
					'video_type' => 'youtube',
				],
			]
		);

		$this->add_control(
			'hosted_autoplay',
			[
				'label' => esc_html__( 'Autoplay', 'jupiterx-core' ),
				'description' => esc_html__( 'Video will be muted if Autoplay is enabled.', 'jupiterx-core' ),
				'prefix_class' => 'raven-video-hosted-autoplay-',
				'type' => 'switcher',
				'default' => 'off',
				'condition' => [
					'video_type' => 'hosted',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'hosted_muted',
			[
				'label' => esc_html__( 'Mute', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'off',
				'condition' => [
					'video_type' => 'hosted',
				],
			]
		);

		$this->add_control(
			'hosted_loop',
			[
				'label' => esc_html__( 'Loop', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'off',
				'condition' => [
					'video_type' => 'hosted',
				],
			]
		);

		$this->add_control(
			'hosted_controls',
			[
				'label' => esc_html__( 'Player Controls', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'condition' => [
					'video_type' => 'hosted',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'vimeo_autoplay',
			[
				'label' => esc_html__( 'Autoplay', 'jupiterx-core' ),
				'description' => esc_html__( 'Video will be muted if Autoplay is enabled.', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'vimeo',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'vimeo_mute',
			[
				'label' => esc_html__( 'Mute', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'vimeo',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'vimeo_loop',
			[
				'label' => esc_html__( 'Loop', 'jupiterx-core' ),
				'type' => 'switcher',
				'condition' => [
					'video_type' => 'vimeo',
				],
			]
		);

		$this->add_control(
			'lazyload',
			[
				'label' => esc_html__( 'Lazy Load', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'condition' => [
					'video_type' => [ 'youtube', 'vimeo' ],
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'vimeo_title',
			[
				'label' => esc_html__( 'Intro Title', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'condition' => [
					'video_type' => 'vimeo',
				],
			]
		);

		$this->add_control(
			'vimeo_portrait',
			[
				'label' => esc_html__( 'Intro Portrait', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'condition' => [
					'video_type' => 'vimeo',
				],
			]
		);

		$this->add_control(
			'vimeo_byline',
			[
				'label' => esc_html__( 'Intro Byline', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'condition' => [
					'video_type' => 'vimeo',
				],
			]
		);

		$this->add_control(
			'vimeo_color',
			[
				'label' => esc_html__( 'Controls Color', 'jupiterx-core' ),
				'type' => 'hidden',
				'default' => '',
				'condition' => [
					'video_type' => 'vimeo',
				],
			]
		);

		$this->add_control(
			'enhancements_heading',
			[
				'label' => esc_html__( 'Enhancements', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'hide_youtube_ui',
			[
				'label' => esc_html__( 'Hide Youtube UI', 'jupiterx-core' ),
				'description' => esc_html__( 'Hides the Youtube logo and related videos.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'prefix_class' => 'raven-video-hide-youtube-',
				'frontend_available' => true,
				'condition' => [
					'video_type' => 'youtube',
				],
			]
		);

		$this->add_control(
			'auto_hide_controls',
			[
				'label' => esc_html__( 'Auto-Hide Controls', 'jupiterx-core' ),
				'description' => esc_html__( 'Hide video controls automatically after 2 seconds of no mouse movement.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => 'yes',
				'frontend_available' => true,
				'condition' => [
					'video_type' => [ 'youtube', 'hosted' ],
				],
			]
		);

		$this->add_control(
			'turn_on_captions_by_default',
			[
				'label' => esc_html__( 'Turn on Captions by Default', 'jupiterx-core' ),
				'description' => esc_html__( 'Enable this option if captions should be active by default.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'frontend_available' => true,
				'condition' => [
					'video_type' => 'youtube',
					'hide_youtube_ui!' => 'yes',
				],
			]
		);

		$this->add_control(
			'sticky_on_scroll',
			[
				'label' => esc_html__( 'Sticky on Scroll', 'jupiterx-core' ),
				'description' => esc_html__( 'Stick videos to the side of the screen when the page is scrolled and the video is playing.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'stick_video_position',
			[
				'label' => esc_html__( 'Stick Video Position', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'default',
				'options' => [
					'default' => esc_html__( 'Default', 'jupiterx-core' ),
					'center-center' => esc_html__( 'Center Center', 'jupiterx-core' ),
					'center-left' => esc_html__( 'Center Left', 'jupiterx-core' ),
					'center-right' => esc_html__( 'Center Right', 'jupiterx-core' ),
					'top-center' => esc_html__( 'Top Center', 'jupiterx-core' ),
					'top-left' => esc_html__( 'Top Left', 'jupiterx-core' ),
					'top-right' => esc_html__( 'Top Right', 'jupiterx-core' ),
					'bottom-center' => esc_html__( 'Bottom Center', 'jupiterx-core' ),
					'bottom-left' => esc_html__( 'Bottom Left', 'jupiterx-core' ),
					'bottom-right' => esc_html__( 'Bottom Right', 'jupiterx-core' ),
				],
				'selectors_dictionary' => [
					'default' => 'bottom:20px; left:20px',
					'center-center' => 'top: 50%; left: 50%; transform: translate(-50%, -50%)',
					'center-left' => 'top: 50%; left: 20px; transform: translate(0, -50%)',
					'center-right' => 'top: 50%; right: 20px; transform: translate(0, -50%)',
					'top-center' => 'top: 20px; left: 50%; transform: translateX(-50%)',
					'top-left' => 'top:20px; left:20px',
					'top-right' => 'top:20px; right:20px',
					'bottom-center' => 'bottom: 20px; left: 50%; transform: translateX(-50%)',
					'bottom-left' => 'bottom:20px; left:20px',
					'bottom-right' => 'bottom:20px; right:20px',
				],
				'selectors' => [
					'{{WRAPPER}} .sticky' => '{{VALUE}}',
				],
				'condition' => [
					'sticky_on_scroll' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	private function register_section_muted_autoplay() {
		$this->start_controls_section(
			'section_muted_autoplay',
			[
				'label' => esc_html__( 'Muted Autoplay', 'jupiterx-core' ),
				'condition' => [
					'show_image_overlay!' => 'yes',
				],
			]
		);

		$this->add_control(
			'muted_autoplay_preview',
			[
				'label' => esc_html__( 'Muted Autoplay Preview', 'jupiterx-core' ),
				'description' => esc_html__( 'Shows a muted preview of the video with a play button that allows viewer start the video with sound.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'muted_preview_overlay',
			[
				'label' => esc_html__( 'Muted Autoplay Overlay', 'jupiterx-core' ),
				'description' => esc_html__( 'During muted autoplay, show an image over the video, if the user plays the video, the image will disappear.', 'jupiterx-core' ),
				'type' => 'switcher',
				'return_value' => 'yes',
				'default' => '',
				'condition' => [
					'muted_autoplay_preview' => 'yes',
				],
			]
		);

		$this->add_control(
			'image_muted_preview_overlay',
			[
				'label' => esc_html__( 'Image', 'jupiterx-core' ),
				'type' => 'media',
				'default' => [
					'url' => '',
				],
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_group_control(
			'image-size',
			[
				'name' => 'image_muted_preview_overlay',
				'default' => 'full',
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
					'image_muted_preview_overlay[id]!' => '',
				],
			]
		);

		$this->add_control(
			'size',
			[
				'label' => esc_html__( 'Max Width', 'jupiterx-core' ),
				'type' => 'slider',
				'default' => [
					'unit' => '%',
				],
				'size_units' => [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
					'image_muted_preview_overlay[id]!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-muted-overlay' => 'max-width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'image_muted_position_heading',
			[
				'label' => esc_html__( 'Overlay Position', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
			]
		);

		$this->add_control(
			'image_muted_horizontal',
			[
				'label' => esc_html__( 'Horizontal Orientation', 'jupiterx-core' ),
				'type' => 'choose',
				'default' => is_rtl() ? 'right' : 'left',
				'options' => [
					'left' => [
						'title' => esc_html__( 'Left', 'jupiterx-core' ),
						'icon' => 'eicon-h-align-left',
					],
					'right' => [
						'title' => esc_html__( 'Right', 'jupiterx-core' ),
						'icon' => 'eicon-h-align-right',
					],
				],
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
				'toggle' => false,
			]
		);

		$this->add_responsive_control(
			'image_muted_offset_x',
			[
				'label' => esc_html__( 'Offset', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%', 'vh', 'vw' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1000,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => '0',
				],
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-muted-overlay' => '{{image_muted_horizontal.VALUE}}: {{SIZE}}{{UNIT}}; --raven-video-muted-overlay-translate-x: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'image_muted_vertical',
			[
				'label' => esc_html__( 'Vertical Orientation', 'jupiterx-core' ),
				'type' => 'choose',
				'options' => [
					'top' => [
						'title' => esc_html__( 'Top', 'jupiterx-core' ),
						'icon' => 'eicon-v-align-top',
					],
					'bottom' => [
						'title' => esc_html__( 'Bottom', 'jupiterx-core' ),
						'icon' => 'eicon-v-align-bottom',
					],
				],
				'default' => 'top',
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
				'toggle' => false,
			]
		);

		$this->add_responsive_control(
			'image_muted_offset_y',
			[
				'label' => esc_html__( 'Offset', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%', 'vh', 'vw' ],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1000,
					],
				],
				'default' => [
					'unit' => 'px',
					'size' => '0',
				],
				'condition' => [
					'muted_preview_overlay' => 'yes',
					'muted_autoplay_preview' => 'yes',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-muted-overlay' => '{{image_muted_vertical.VALUE}}: {{SIZE}}{{UNIT}}; --raven-video-muted-overlay-translate-y: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	private function register_section_video_controls() {
		$this->start_controls_section(
			'section_video_controls',
			[
				'label' => esc_html__( 'Video Controls', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'large_play_button',
			[
				'label' => esc_html__( 'Large Play Button', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => '',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'progress_bar',
			[
				'label' => esc_html__( 'Progress Bar', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'current_time',
			[
				'label' => esc_html__( 'Current Time', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'fullscreen',
			[
				'label' => esc_html__( 'Fullscreen', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'speed_options',
			[
				'label' => esc_html__( 'Speed Options', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'condition' => [
					'video_type' => 'hosted',
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'rewind',
			[
				'label' => esc_html__( 'Rewind', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'fast_forward',
			[
				'label' => esc_html__( 'Fast Forward', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->end_controls_section();
	}

	private function register_section_image_overlay() {
		$this->start_controls_section(
			'section_image_overlay',
			[
				'label' => esc_html__( 'Video Cover', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'show_image_overlay',
			[
				'label' => esc_html__( 'Image Overlay', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'image_overlay',
			[
				'label' => esc_html__( 'Image', 'jupiterx-core' ),
				'type' => 'media',
				'default' => [
					'url' => \Elementor\Utils::get_placeholder_image_src(),
				],
				'condition' => [
					'show_image_overlay' => 'yes',
				],
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_responsive_control(
			'media_position',
			[
				'label' => esc_html__( 'Media Position', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'center center',
				'options' => [
					'center center' => esc_html__( 'Center Center', 'jupiterx-core' ),
					'center left' => esc_html__( 'Center Left', 'jupiterx-core' ),
					'center right' => esc_html__( 'Center Right', 'jupiterx-core' ),
					'top center' => esc_html__( 'Top Center', 'jupiterx-core' ),
					'top left' => esc_html__( 'Top Left', 'jupiterx-core' ),
					'top right' => esc_html__( 'Top Right', 'jupiterx-core' ),
					'bottom center' => esc_html__( 'Bottom Center', 'jupiterx-core' ),
					'bottom left' => esc_html__( 'Bottom Left', 'jupiterx-core' ),
					'bottom right' => esc_html__( 'Bottom Right', 'jupiterx-core' ),
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-thumbnail' => 'background-position: {{VALUE}};',
				],
				'condition' => [
					'show_image_overlay' => 'yes',
					'image_overlay[id]!' => '',
				],
			]
		);

		$this->add_group_control(
			'image-size',
			[
				'name' => 'image_overlay',
				'default' => 'full',
				'condition' => [
					'show_image_overlay' => 'yes',
					'image_overlay[id]!' => '',
				],
			]
		);

		$this->add_control(
			'show_play_icon',
			[
				'label' => esc_html__( 'Play Icon', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'label_off' => esc_html__( 'No', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Yes', 'jupiterx-core' ),
				'condition' => [
					'show_image_overlay' => 'yes',
					'image_overlay[url]!' => '',
				],
			]
		);

		$this->add_control(
			'play_icon_new',
			[
				'label' => esc_html__( 'Icon', 'jupiterx-core' ),
				'type' => 'icons',
				'fa4compatibility' => 'play_icon',
				'default' => [
					'value' => 'fas fa-play',
					'library' => 'fa-solid',
				],
				'condition' => [
					'show_image_overlay' => 'yes',
					'show_play_icon' => 'yes',
				],
			]
		);

		$this->add_control(
			'use_lightbox',
			[
				'label' => esc_html__( 'Lightbox', 'jupiterx-core' ),
				'type' => 'switcher',
				'frontend_available' => true,
				'label_off' => esc_html__( 'Off', 'jupiterx-core' ),
				'label_on' => esc_html__( 'On', 'jupiterx-core' ),
				'prefix_class' => 'use-lightbox-',
				'render_type' => 'template',
				'condition' => [
					'show_image_overlay' => 'yes',
					'image_overlay[url]!' => '',
				],
			]
		);

		$this->end_controls_section();
	}

	private function register_section_device_frame() {
		$this->start_controls_section(
			'section_device_frame',
			[
				'label' => esc_html__( 'Device Mockup Frame', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'show_device_frame',
			[
				'label' => esc_html__( 'Frame this video in Device Mockup', 'jupiterx-core' ),
				'type' => 'switcher',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'prefix_class' => 'raven-video-frame-',
				'render_type' => 'template',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'device_frame',
			[
				'label' => esc_html__( 'Device Type', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'desktop',
				'options' => [
					'desktop' => esc_html__( 'Desktop', 'jupiterx-core' ),
					'laptop' => esc_html__( 'Laptop', 'jupiterx-core' ),
				],
				'render_type' => 'template',
				'condition' => [
					'show_device_frame' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	private function register_section_style() {
		$this->start_controls_section(
			'section_video_style',
			[
				'label' => esc_html__( 'Video', 'jupiterx-core' ),
				'tab' => 'style',
			]
		);

		$this->add_control(
			'player_style',
			[
				'label' => esc_html__( 'Player Style', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'style1',
				'options' => [
					'style1' => esc_html__( 'Style 1', 'jupiterx-core' ),
					'style2' => esc_html__( 'Style 2', 'jupiterx-core' ),
					'style3' => esc_html__( 'Style 3', 'jupiterx-core' ),
				],
				'prefix_class' => 'raven-player-',
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'skin_color',
			[
				'label' => esc_html__( 'Skin Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-video-play i' => 'color: {{VALUE}};',
					'{{WRAPPER}} .raven-video-play > svg' => 'fill: {{VALUE}};',
					'{{WRAPPER}} .raven-video-play-button-preview' => 'color: {{VALUE}};',
					'{{WRAPPER}} .mejs-overlay-button' => 'background: {{VALUE}};',
					'{{WRAPPER}} .raven-video-mejs-player .mejs-controls .mejs-horizontal-volume-slider .mejs-horizontal-volume-current' => 'background: {{VALUE}};',
					'{{WRAPPER}} .mejs__speed-selected, .mejs-speed-selected' => 'color: {{VALUE}} !important;',
					'{{WRAPPER}}.raven-player-style2 .mejs-controls' => 'background: {{VALUE}} !important;',
				],
			]
		);

		$this->add_group_control(
			'background',
			[
				'name'      => 'video_controls_gradient',
				'types'     => [ 'gradient' ],
				'fields_options' => [
					'background' => [
						'label' => esc_html__( 'Controls Gradient', 'jupiterx-core' ),
					],
					'gradient_angle' => [
						'selectors' => [
							'{{WRAPPER}}.raven-player-style2 .mejs-controls, {{WRAPPER}} .mejs-overlay-button, {{WRAPPER}}.raven-player-style1 .mejs-horizontal-volume-current, {{WRAPPER}}.raven-player-style3 .mejs-horizontal-volume-current, {{WRAPPER}}.raven-player-style1 .mejs-time-current, {{WRAPPER}}.raven-player-style3 .mejs-time-current' => 'background-color: transparent !important; background-image: linear-gradient({{SIZE}}{{UNIT}}, {{color.VALUE}} {{color_stop.SIZE}}{{color_stop.UNIT}}, {{color_b.VALUE}} {{color_b_stop.SIZE}}{{color_b_stop.UNIT}}) !important;',
						],
					],
					'gradient_position' => [
						'selectors' => [
							'{{WRAPPER}}.raven-player-style2 .mejs-controls, {{WRAPPER}} .mejs-overlay-button, {{WRAPPER}}.raven-player-style1 .mejs-horizontal-volume-current, {{WRAPPER}}.raven-player-style3 .mejs-horizontal-volume-current, {{WRAPPER}}.raven-player-style1 .mejs-time-current, {{WRAPPER}}.raven-player-style3 .mejs-time-current' => 'background-color: transparent !important; background-image: radial-gradient(at {{VALUE}}, {{color.VALUE}} {{color_stop.SIZE}}{{color_stop.UNIT}}, {{color_b.VALUE}} {{color_b_stop.SIZE}}{{color_b_stop.UNIT}}) !important;',
						],
					],
				],
				'selector'  => '{{WRAPPER}}.raven-player-style2 .mejs-controls',
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name' => 'video_css_filters',
				'separator' => 'after',
				'selector' => '{{WRAPPER}} .raven-video, {{WRAPPER}} .modal-content',
			]
		);

		$this->add_control(
			'video_border_type',
			[
				'label'     => esc_html__( 'Border Type', 'jupiterx-core' ),
				'type'      => 'select',
				'options'   => [
					'none'   => esc_html__( 'None', 'jupiterx-core' ),
					'solid'  => esc_html__( 'Solid', 'jupiterx-core' ),
					'double' => esc_html__( 'Double', 'jupiterx-core' ),
					'dotted' => esc_html__( 'Dotted', 'jupiterx-core' ),
					'dashed' => esc_html__( 'Dashed', 'jupiterx-core' ),
					'groove' => esc_html__( 'Groove', 'jupiterx-core' ),
				],
				'default'   => 'none',
				'selectors' => [
					'{{WRAPPER}} .raven-video-inline, {{WRAPPER}} #raven-video-modal .modal-content' => 'border-style: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'video_border_width',
			[
				'label'      => esc_html__( 'Width', 'jupiterx-core' ),
				'type'       => 'dimensions',
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .raven-video-inline, {{WRAPPER}} #raven-video-modal .modal-content' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'video_border_color',
			[
				'label'     => esc_html__( 'Color', 'jupiterx-core' ),
				'type'      => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-video-inline, {{WRAPPER}} #raven-video-modal .modal-content' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'video_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'jupiterx-core' ),
				'type'       => 'dimensions',
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .raven-video-inline, {{WRAPPER}} #raven-video-modal .modal-content' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'video_box_shadow',
				'label' => esc_html__( 'Box Shadow', 'jupiterx-core' ),
				'selector' => '{{WRAPPER}} .raven-video-inline, {{WRAPPER}} #raven-video-modal .modal-content',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			[
				'label' => esc_html__( 'Icon', 'jupiterx-core' ),
				'tab' => 'style',
				'condition' => [
					'show_image_overlay' => 'yes',
					'show_play_icon' => 'yes',
				],
			]
		);

		$this->add_control(
			'play_icon_background_color',
			[
				'label' => esc_html__( 'Background Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-video-play' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'play_icon_color',
			[
				'label' => esc_html__( 'Icon Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-video-play i' => 'color: {{VALUE}};',
					'{{WRAPPER}} .raven-video-play > svg' => 'fill: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'play_icon_container_spacing',
			[
				'label' => esc_html__( 'Container Spacing', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-play' => 'padding: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'play_icon_size',
			[
				'label' => esc_html__( 'Icon Size', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-play i' => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .raven-video-play > svg' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'play_icon_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px' ],
				'range' => [
					'px' => [
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-video-play' => 'border-radius: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'text-shadow',
			[
				'name' => 'play_icon_shadow',
				'fields_options' => [
					'text_shadow_type' => [
						'label' => esc_html__( 'Shadow', 'jupiterx-core' ),
					],
					'text_shadow' => [
						'selectors' => [
							'{{WRAPPER}} .raven-video-play i' => 'text-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
							'{{WRAPPER}} .raven-video-play > svg' => 'filter: drop-shadow({{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}});',
						],
					],
				],
			]
		);

		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings_for_display();

		$migration_allowed = Elementor::$instance->icons_manager->is_migration_allowed();
		$migrated          = isset( $settings['__fa4_migrated']['icon_new'] );
		$is_new            = empty( $settings['icon'] ) && $migration_allowed;

		$video_link    = '';
		$video_html    = '';
		$embed_params  = [];
		$embed_options = [];

		$video_link = $this->get_video_link();

		if ( empty( $video_link ) ) {
			return;
		}

		if ( 'hosted' === $settings['video_type'] ) {
			$video_html = $this->get_hosted_shortcode( $settings );
		} else {
			$embed_params  = $this->get_embed_params();
			$embed_options = [
				'privacy' => $settings['youtube_privacy'],
				'lazy_load' => ! empty( $settings['lazyload'] ),
			];

			$embed_attrs = [
				'class' => 'raven-video-mejs-player',
			];

			$video_html = \Elementor\Embed::get_embed_html( $video_link, $embed_params, $embed_options, $embed_attrs );
		}

		if ( empty( $video_html ) ) {
			echo esc_url( $video_link );
			return;
		}

		// Validate device_frame option
		$valid_device_frames = [ 'desktop', 'laptop' ];
		if ( ! in_array( $settings['device_frame'], $valid_device_frames, true ) ) {
			$settings['device_frame'] = 'desktop';
		}

		$this->add_render_attribute( 'video', 'class', 'raven-video raven-video-' . ( $settings['use_lightbox'] ? 'lightbox' : 'inline' ) );

		$this->add_render_attribute( 'video-wrapper', 'class', 'raven-widget-wrapper' . ( 'yes' !== $settings['sticky_on_scroll'] ? ' sticky-close' : '' ) . ' raven-video-mejs-player' );
		?>
		<div <?php echo $this->get_render_attribute_string( 'video-wrapper' ); ?>>
			<?php if ( 'yes' === $settings['muted_preview_overlay'] ) : ?>
				<?php if ( $settings['image_muted_preview_overlay']['url'] ) :
						// WPML compatibility.
						$settings['image_muted_preview_overlay']['id'] = apply_filters( 'wpml_object_id', $settings['image_muted_preview_overlay']['id'], 'attachment', true );

						$muted_autoplay_image           = Group_Control_Image_Size::get_attachment_image_src( $settings['image_muted_preview_overlay']['id'], 'image_muted_preview_overlay', $settings );
						$muted_image_overlay_position_x = 'raven-video-muted--position-' . $settings['image_muted_horizontal'];
						$muted_image_overlay_position_y = 'raven-video-muted--position-' . $settings['image_muted_vertical'];

						$this->add_render_attribute(
							'muted-overlay', [
								'class' => [
									'raven-video-muted-overlay',
									$muted_image_overlay_position_x,
									$muted_image_overlay_position_y,
								],
							]
						);
				?>
					<img <?php echo $this->get_render_attribute_string( 'muted-overlay' ); ?> src="<?php echo esc_url( $muted_autoplay_image ); ?>">
				<?php endif; ?>
			<?php endif; ?>

			<?php if ( 'yes' === $settings['muted_autoplay_preview'] ) : ?>
				<div class="mejs-overlay mejs-layer mejs-overlay-play raven-video-play-button-preview">
					<div class="mejs-overlay-button"></div>
				</div>
			<?php endif; ?>

			<?php if ( 'yes' === $settings['sticky_on_scroll'] && ! $settings['use_lightbox'] ) : ?>
				<span class="raven-video-close" style="display: none;">
					<i class="fas fa-times"></i>
				</span>
			<?php endif; ?>
			<?php if ( $settings['show_device_frame'] ) : ?>
				<div class="raven-frame raven-frame-<?php echo esc_attr( $settings['device_frame'] ); ?>">
					<div class="raven-frame-image">
						<?php include Utils::get_svg( 'frame-' . $settings['device_frame'] ); ?>
					</div>
			<?php endif; ?>

					<div <?php echo $this->get_render_attribute_string( 'video' ); ?>>
						<?php
						if ( ! $settings['use_lightbox'] && class_exists( '\Elementor\Utils' ) ) {
							\Elementor\Utils::print_unescaped_internal_string( $video_html ); // XSS ok.
						}

						if ( $this->has_image_overlay() ) {
							// WPML compatibility.
							$settings['image_overlay']['id'] = apply_filters( 'wpml_object_id', $settings['image_overlay']['id'], 'attachment', true );

							$bg_image = Group_Control_Image_Size::get_attachment_image_src( $settings['image_overlay']['id'], 'image_overlay', $settings );

							if ( empty( $bg_image ) ) {
								$bg_image = \Elementor\Utils::get_placeholder_image_src();
							}

							$this->add_render_attribute( 'image-overlay', 'class', 'raven-video-thumbnail' );

							if ( ! $settings['use_lightbox'] ) {
								$this->add_render_attribute( 'image-overlay', 'style', 'background-image: url(' . $bg_image . ');' );
							}
							?>
							<div <?php echo $this->get_render_attribute_string( 'image-overlay' ); ?>>
								<?php if ( $settings['use_lightbox'] ) : ?>
									<img class="raven-video-thumbnail-image" src="<?php echo esc_url( $bg_image ); ?>">

									<div id="raven-video-modal" class="raven-modal">
										<span class="close">&times;</span>
										<div class="modal-content">
											<?php \Elementor\Utils::print_unescaped_internal_string( $video_html ); // XSS ok. ?>
										</div>
									</div>
								<?php endif; ?>
								<?php if ( 'yes' === $settings['show_play_icon'] && ( ! empty( $settings['play_icon'] ) || $is_new || $migrated ) ) : ?>
									<div class="raven-video-play">
									<?php
									if ( $is_new || $migrated ) :
										Elementor::$instance->icons_manager->render_icon( $settings['play_icon_new'], [ 'aria-hidden' => 'true' ] );
									else :
										?>
										<i <?php echo $this->get_render_attribute_string( 'play_icon' ); ?>></i>
									<?php endif; ?>
									</div>
								<?php endif; ?>
							</div>
						<?php } ?>
					</div>

			<?php if ( $settings['show_device_frame'] ) : ?>
				</div>
			<?php endif; ?>
		</div>
		<?php
	}

	public function render_plain_content() {
		echo esc_url( $this->get_video_link() );
	}

	private function get_video_link() {
		$settings = $this->get_active_settings();
		$url      = '';

		switch ( $settings['video_type'] ) {
			case 'youtube':
				$url = $settings['youtube_link'];
				break;

			case 'vimeo':
				$url = $settings['vimeo_link'];
				break;

			case 'hosted':
				// WPML Compatibility.
				$settings['hosted_link']['id']  = apply_filters( 'wpml_object_id', $settings['hosted_link']['id'], 'attachment', true );
				$settings['hosted_link']['url'] = wp_get_attachment_url( $settings['hosted_link']['id'] );

				$settings['hosted_link_webm']['id']  = apply_filters( 'wpml_object_id', $settings['hosted_link_webm']['id'], 'attachment', true );
				$settings['hosted_link_webm']['url'] = wp_get_attachment_url( $settings['hosted_link_webm']['id'] );

				$url = $settings['hosted_link']['url'] ?: $settings['hosted_link_webm']['url'];

				if ( $settings['start_time'] || $settings['end_time'] ) {
					$url .= '#t=';
				}

				if ( $settings['start_time'] ) {
					$url .= $settings['start_time'];
				}

				if ( $settings['end_time'] ) {
					$url .= ',' . $settings['end_time'];
				}

				break;
		}

		return $url;
	}

	private function get_embed_params() {
		$settings = $this->get_active_settings();
		$type     = $settings['video_type'];
		$options  = [ 'autoplay', 'loop', 'title', 'portrait', 'byline', 'rel', 'controls', 'showinfo', 'mute', 'muted' ];
		$params   = [];

		foreach ( $options as $option ) {
			if ( 'autoplay' === $option && $this->has_image_overlay() ) {
				$params['autoplay'] = '0';
				continue;
			}

			$key = $type . '_' . $option;

			if ( isset( $settings[ $key ] ) && ! is_null( $settings[ $key ] ) ) {
				$value             = ( 'yes' === $settings[ $key ] ) ? '1' : '0';
				$params[ $option ] = $value;
			}
		}

		if ( 'youtube' === $type ) {
			$params['wmode']       = 'opaque';
			$params['enablejsapi'] = '1';
			$params['autoplay']    = '0';

			if ( $settings['youtube_loop'] ) {
				$video_properties = \Elementor\Embed::get_video_properties( $settings['youtube_link'] );

				$params['playlist'] = $video_properties['video_id'];
			}
		}

		if ( 'vimeo' === $type ) {
			$params['color']     = str_replace( '#', '', $settings['vimeo_color'] );
			$params['autopause'] = '0';
			$params['controls']  = 0;
			$params['muted']     = 0;

			if ( $settings['vimeo_mute'] || $settings['vimeo_autoplay'] ) {
				$params['muted'] = 1;
			}

			if ( $settings['use_lightbox'] ) {
				$params['controls'] = 1;
			}

			if ( $settings['start_time'] ) {
				$params['#t'] = $settings['start_time'];
			}
		}

		if ( 'hosted' === $type ) {
			// WPML Compatibility.
			$settings['hosted_link']['id']  = apply_filters( 'wpml_object_id', $settings['hosted_link']['id'], 'attachment', true );
			$settings['hosted_link']['url'] = wp_get_attachment_url( $settings['hosted_link']['id'] );

			$settings['hosted_link_webm']['id']  = apply_filters( 'wpml_object_id', $settings['hosted_link_webm']['id'], 'attachment', true );
			$settings['hosted_link_webm']['url'] = wp_get_attachment_url( $settings['hosted_link_webm']['id'] );

			$params['muted']  = '0';
			$params['width']  = '0';
			$params['height'] = '0';
			$params['src']    = $settings['hosted_link']['url'];
			$params['webm']   = $settings['hosted_link_webm']['url'];
			$params['style']  = 'max-width: 100%; height: 100% !important; width: 100% !important;';

			if ( $settings['hosted_autoplay'] ) {
				$params['muted'] = '1';
			}
		}

		return $params;
	}

	private function get_hosted_shortcode( $settings ) {
		$hosted_params = $this->get_embed_params();
		$params        = '';

		foreach ( $hosted_params as $param => $setting ) {
			if ( in_array( $param, [ 'src', 'webm' ], true ) ) {
				continue;
			}

			if ( empty( $setting ) ) {
				continue;
			}

			$params .= ' ' . $param;
		}

		if ( $settings['start_time'] || $settings['end_time'] ) {
			$hosted_params['src']  .= '#t=';
			$hosted_params['webm'] .= '#t=';
		}

		if ( $settings['start_time'] ) {
			$hosted_params['src']  .= $settings['start_time'];
			$hosted_params['webm'] .= $settings['start_time'];
		}

		if ( $settings['end_time'] ) {
			$hosted_params['src']  .= ',' . $settings['end_time'];
			$hosted_params['webm'] .= ',' . $settings['end_time'];
		}

		$source_mp4  = '';
		$source_webm = '';

		if ( $hosted_params['src'] ) {
			$source_mp4 = '<source src="' . esc_url( $hosted_params['src'] ) . '" type="video/mp4">';
		}

		if ( $hosted_params['webm'] ) {
			$source_webm = '<source src="' . esc_url( $hosted_params['webm'] ) . '" type="video/webm">';
		}

		return '<video width="100%" height="100%" class="raven-video-mejs-player raven-video-mejs-hosted" ' . esc_attr( $params ) . '>' . $source_mp4 . $source_webm . '
			Your browser does not support the video tag.
		</video>';
	}

	protected function has_image_overlay() {
		$settings = $this->get_settings_for_display();

		return ! empty( $settings['image_overlay']['url'] ) && 'yes' === $settings['show_image_overlay'];
	}
}
