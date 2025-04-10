<?php
namespace JupiterX_Core\Raven\Modules\Carousel\Widgets;

use JupiterX_Core\Raven\Base\Base_Widget;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Image_Size;
use Elementor\Icons_Manager;
use Elementor\Repeater;
use Elementor\Plugin as Elementor;
use JupiterX_Core\Raven\Utils;

defined( 'ABSPATH' ) || die();

abstract class Base extends Base_Widget {

	private $slide_prints_count = 0;

	public function get_script_depends() {
		return [ 'imagesloaded' ];
	}

	abstract protected function add_repeater_controls( Repeater $repeater );

	abstract protected function get_repeater_defaults();

	abstract protected function print_slide( array $slide, array $settings, $element_key );

	protected function register_controls() {
		$this->register_controls_section_slides();
		$this->register_controls_section_additional_options();
		$this->register_controls_section_slides_style();
		$this->register_controls_section_navigation();
	}

	protected function register_controls_section_slides() {
		$this->start_controls_section(
			'section_slides',
			[
				'label' => esc_html__( 'Slides', 'jupiterx-core' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$repeater = new Repeater();

		$this->add_repeater_controls( $repeater );

		$this->add_control(
			'slides',
			[
				'label' => esc_html__( 'Slides', 'jupiterx-core' ),
				'type' => Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'default' => $this->get_repeater_defaults(),
				'separator' => 'after',
			]
		);

		$this->add_control(
			'effect',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Effect', 'jupiterx-core' ),
				'default' => 'slide',
				'options' => [
					'slide' => esc_html__( 'Slide', 'jupiterx-core' ),
					'fade' => esc_html__( 'Fade', 'jupiterx-core' ),
					'cube' => esc_html__( 'Cube', 'jupiterx-core' ),
				],
				'frontend_available' => true,
			]
		);

		$slides_per_view = range( 1, 10 );
		$slides_per_view = array_combine( $slides_per_view, $slides_per_view );

		$this->add_responsive_control(
			'slides_per_view',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Slides Per View', 'jupiterx-core' ),
				'options' => [ '' => esc_html__( 'Default', 'jupiterx-core' ) ] + $slides_per_view,
				'inherit_placeholders' => false,
				'condition' => [
					'effect' => 'slide',
				],
				'frontend_available' => true,
			]
		);

		$this->add_responsive_control(
			'slides_to_scroll',
			[
				'type' => Controls_Manager::SELECT,
				'label' => esc_html__( 'Slides to Scroll', 'jupiterx-core' ),
				'description' => esc_html__( 'Set how many slides are scrolled per swipe.', 'jupiterx-core' ),
				'options' => [ '' => esc_html__( 'Default', 'jupiterx-core' ) ] + $slides_per_view,
				'inherit_placeholders' => false,
				'condition' => [
					'effect' => 'slide',
				],
				'frontend_available' => true,
			]
		);

		$this->add_responsive_control(
			'height',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Height', 'jupiterx-core' ),
				'size_units' => [ 'px', 'vh' ],
				'range' => [
					'px' => [
						'min' => 100,
						'max' => 1000,
					],
					'vh' => [
						'min' => 20,
					],
				],
				'render_type' => 'template',
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper' => 'height: {{SIZE}}{{UNIT}} !important;',
				],
			]
		);

		$this->add_responsive_control(
			'width',
			[
				'type' => Controls_Manager::SLIDER,
				'label' => esc_html__( 'Width', 'jupiterx-core' ),
				'range' => [
					'px' => [
						'min' => 100,
						'max' => 1140,
					],
					'%' => [
						'min' => 50,
					],
				],
				'size_units' => [ '%', 'px' ],
				'default' => [
					'unit' => '%',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	protected function register_controls_section_additional_options() {
		$this->start_controls_section(
			'section_additional_options',
			[
				'label' => esc_html__( 'Additional Options', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'show_arrows',
			[
				'type' => Controls_Manager::SWITCHER,
				'label' => esc_html__( 'Arrows', 'jupiterx-core' ),
				'default' => 'yes',
				'label_off' => esc_html__( 'Hide', 'jupiterx-core' ),
				'label_on' => esc_html__( 'Show', 'jupiterx-core' ),
				'prefix_class' => 'raven-arrows-',
				'render_type' => 'template',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'pagination',
			[
				'label' => esc_html__( 'Pagination', 'jupiterx-core' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'bullets',
				'options' => [
					'' => esc_html__( 'None', 'jupiterx-core' ),
					'bullets' => esc_html__( 'Dots', 'jupiterx-core' ),
					'fraction' => esc_html__( 'Fraction', 'jupiterx-core' ),
					'progressbar' => esc_html__( 'Progress', 'jupiterx-core' ),
				],
				'prefix_class' => 'raven-pagination-type-',
				'render_type' => 'template',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'speed',
			[
				'label' => esc_html__( 'Transition Duration', 'jupiterx-core' ),
				'type' => Controls_Manager::NUMBER,
				'default' => 500,
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'autoplay',
			[
				'label' => esc_html__( 'Autoplay', 'jupiterx-core' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'yes',
				'separator' => 'before',
				'render_type' => 'template',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'autoplay_speed',
			[
				'label' => esc_html__( 'Autoplay Speed', 'jupiterx-core' ),
				'type' => Controls_Manager::NUMBER,
				'default' => 5000,
				'condition' => [
					'autoplay' => 'yes',
				],
				'render_type' => 'template',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'loop',
			[
				'label' => esc_html__( 'Infinite Loop', 'jupiterx-core' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'yes',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'pause_on_hover',
			[
				'label' => esc_html__( 'Pause on Hover', 'jupiterx-core' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'yes',
				'condition' => [
					'autoplay' => 'yes',
				],
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'pause_on_interaction',
			[
				'label' => esc_html__( 'Pause on Interaction', 'jupiterx-core' ),
				'type' => Controls_Manager::SWITCHER,
				'default' => 'yes',
				'condition' => [
					'autoplay' => 'yes',
				],
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name' => 'image_size',
				'default' => 'full',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'lazyload',
			[
				'label' => esc_html__( 'Lazyload', 'jupiterx-core' ),
				'type' => Controls_Manager::SWITCHER,
				'separator' => 'before',
				'frontend_available' => true,
			]
		);

		$this->end_controls_section();
	}

	protected function register_controls_section_slides_style() {

		$this->start_controls_section(
			'section_slides_style',
			[
				'label' => esc_html__( 'Slides', 'jupiterx-core' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$space_between_config = [
			'label' => esc_html__( 'Space Between', 'jupiterx-core' ),
			'type' => Controls_Manager::SLIDER,
			'range' => [
				'px' => [
					'max' => 50,
				],
			],
			'render_type' => 'none',
			'frontend_available' => true,
		];

		$active_breakpoint_instances = Elementor::$instance->breakpoints->get_active_breakpoints();
		$active_devices              = array_reverse( array_keys( $active_breakpoint_instances ) );

		// Add desktop in the correct position.
		$active_devices_final = array_merge( [ 'desktop' ], $active_devices );

		if ( in_array( 'widescreen', $active_devices, true ) ) {
			$active_devices_final = array_merge( array_slice( $active_devices, 0, 1 ), [ 'desktop' ], array_slice( $active_devices, 1 ) );
		}

		foreach ( $active_devices_final as $active_device ) {
			$space_between_config[ $active_device . '_default' ] = [
				'size' => 10,
			];
		}

		$this->add_responsive_control(
			'space_between',
			$space_between_config
		);

		$this->add_control(
			'slide_background_color',
			[
				'label' => esc_html__( 'Background Color', 'jupiterx-core' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper .swiper-slide' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'slide_border_size',
			[
				'label' => esc_html__( 'Border Size', 'jupiterx-core' ),
				'type' => Controls_Manager::DIMENSIONS,
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper .swiper-slide' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
			]
		);

		$this->add_responsive_control(
			'slide_border_radius',
			[
				'label' => esc_html__( 'Border Radius', 'jupiterx-core' ),
				'type' => Controls_Manager::SLIDER,
				'size_units' => [ 'px', '%' ],
				'range' => [
					'%' => [
						'max' => 50,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper .swiper-slide' => 'border-radius: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_control(
			'slide_border_color',
			[
				'label' => esc_html__( 'Border Color', 'jupiterx-core' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper .swiper-slide' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'slide_padding',
			[
				'label' => esc_html__( 'Padding', 'jupiterx-core' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors' => [
					'{{WRAPPER}} .raven-main-swiper .swiper-slide' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
				'separator' => 'before',
			]
		);

		$this->end_controls_section();
	}

	protected function register_controls_section_navigation() {

		$this->start_controls_section(
			'section_navigation',
			[
				'label' => esc_html__( 'Navigation', 'jupiterx-core' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'heading_arrows',
			[
				'label' => esc_html__( 'Arrows', 'jupiterx-core' ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'none',
			]
		);

		$this->add_control(
			'arrow_icon_right_new',
			[
				'label' => esc_html__( 'Right Arrow', 'jupiterx-core' ),
				'type' => 'icons',
				'fa4compatibility' => 'arrow_icon_right',
				'default' => [
					'value' => 'fas fa-angle-right',
					'library' => 'fa-solid',
				],
			]
		);

		$this->add_control(
			'arrow_icon_left_new',
			[
				'label' => esc_html__( 'Left Arrow', 'jupiterx-core' ),
				'type' => 'icons',
				'fa4compatibility' => 'arrow_icon_left',
				'default' => [
					'value' => 'fas fa-angle-left',
					'library' => 'fa-solid',
				],
			]
		);

		$this->add_responsive_control(
			'arrows_vertical_offset',
			[
				'label' => esc_html__( 'Vertical Offset', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => -100,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-swiper-button-prev' => 'top: {{SIZE}}{{UNIT}}; --navigation-arrow-prev-translate-y: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .elementor-swiper-button-next' => 'top: {{SIZE}}{{UNIT}}; --navigation-arrow-next-translate-y: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'arrows_horizontal_offset',
			[
				'label' => esc_html__( 'Horizontal Offset', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%' ],
				'range' => [
					'px' => [
						'min' => -500,
						'max' => 500,
					],
					'%' => [
						'min' => -100,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-swiper-button-prev' => 'left: {{SIZE}}{{UNIT}} !important; --navigation-arrow-prev-translate-x: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .elementor-swiper-button-next' => 'right: {{SIZE}}{{UNIT}} !important; --navigation-arrow-next-translate-x: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'arrows_size',
			[
				'label' => esc_html__( 'Size', 'jupiterx-core' ),
				'type' => Controls_Manager::SLIDER,
				'default' => [
					'size' => 20,
				],
				'range' => [
					'px' => [
						'min' => 10,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .elementor-swiper-button' => 'font-size: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_control(
			'arrows_color',
			[
				'label' => esc_html__( 'Color', 'jupiterx-core' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-swiper-button' => 'color: {{VALUE}}',
					'{{WRAPPER}} .elementor-swiper-button svg' => 'fill: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			'text-shadow',
			[
				'name' => 'arrows_shadow',
				'fields_options' => [
					'text_shadow_type' => [
						'label' => esc_html__( 'Shadow', 'jupiterx-core' ),
					],
					'text_shadow' => [
						'selectors' => [
							'{{WRAPPER}} .elementor-swiper-button i' => 'text-shadow: {{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}};',
							'{{WRAPPER}} .elementor-swiper-button > svg' => 'filter: drop-shadow({{HORIZONTAL}}px {{VERTICAL}}px {{BLUR}}px {{COLOR}});',
						],
					],
				],
			]
		);

		$this->add_control(
			'heading_pagination',
			[
				'label' => esc_html__( 'Pagination', 'jupiterx-core' ),
				'type' => Controls_Manager::HEADING,
				'condition' => [
					'pagination!' => '',
				],
			]
		);

		$this->add_control(
			'pagination_position',
			[
				'label' => esc_html__( 'Position', 'jupiterx-core' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'outside',
				'options' => [
					'outside' => esc_html__( 'Outside', 'jupiterx-core' ),
					'inside' => esc_html__( 'Inside', 'jupiterx-core' ),
				],
				'prefix_class' => 'elementor-pagination-position-',
				'condition' => [
					'pagination!' => '',
				],
			]
		);

		$this->add_responsive_control(
			'pagination_size',
			[
				'label' => esc_html__( 'Size', 'jupiterx-core' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 20,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .swiper-pagination-bullet' => 'height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .swiper-container-horizontal .swiper-pagination-progressbar' => 'height: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .swiper-horizontal .swiper-pagination-progressbar' => 'height: {{SIZE}}{{UNIT}}',
					'{{WRAPPER}} .swiper-pagination-fraction' => 'font-size: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'pagination!' => '',
				],
			]
		);

		$this->add_control(
			'pagination_color_inactive',
			[
				'label' => esc_html__( 'Color', 'jupiterx-core' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					// The opacity property will override the default inactive dot color which is opacity 0.2.
					'{{WRAPPER}} .swiper-pagination-bullet:not(.swiper-pagination-bullet-active)' => 'background-color: {{VALUE}}; opacity: 1;',
				],
				'condition' => [
					'pagination!' => '',
				],
			]
		);

		$this->add_control(
			'pagination_color',
			[
				'label' => esc_html__( 'Active Color', 'jupiterx-core' ),
				'type' => Controls_Manager::COLOR,
				'global' => Utils::set_default_value( 'accent' ),
				'selectors' => [
					'{{WRAPPER}} .swiper-pagination-bullet-active, {{WRAPPER}} .swiper-pagination-progressbar-fill' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .swiper-pagination-fraction' => 'color: {{VALUE}}',
				],
				'condition' => [
					'pagination!' => '',
				],
			]
		);

		$this->end_controls_section();
	}

	protected function print_slider( array $settings = null ) {
		if ( null === $settings ) {
			$settings = $this->get_settings_for_display();
		}

		$default_settings = [
			'container_class' => 'raven-main-swiper',
			'video_play_icon' => true,
		];

		$settings = array_merge( $default_settings, $settings );

		$slides_count = count( $settings['slides'] );

		$swiper_class = 'swiper';
		?>
		<div class="raven-swiper">
			<div class="<?php echo esc_attr( $settings['container_class'] ); ?> <?php echo esc_attr( $swiper_class ); ?>">
				<div class="swiper-wrapper">
					<?php
					foreach ( $settings['slides'] as $index => $slide ) :
						$this->slide_prints_count++;
						?>
						<div class="swiper-slide">
							<?php $this->print_slide( $slide, $settings, 'slide-' . $index . '-' . $this->slide_prints_count ); ?>
						</div>
					<?php endforeach; ?>
				</div>
				<?php if ( 1 < $slides_count ) : ?>
					<?php if ( $settings['pagination'] ) : ?>
						<div class="swiper-pagination"></div>
					<?php endif; ?>
					<?php if ( $settings['show_arrows'] ) :
						$this->add_render_attribute(
							'navigation-arrow-prev', [
								'class' => [
									'navigation-arrow-prev--position-left',
									'navigation-arrow-prev--position-top',
									'elementor-swiper-button',
									'elementor-swiper-button-prev',
								],
							]
						);

						$this->add_render_attribute(
							'navigation-arrow-next', [
								'class' => [
									'navigation-arrow-next--position-right',
									'navigation-arrow-next--position-top',
									'elementor-swiper-button',
									'elementor-swiper-button-next',
								],
							]
						);
						?>
						<div <?php echo $this->get_render_attribute_string( 'navigation-arrow-prev' ); ?>>
							<?php $this->render_swiper_button( 'arrow_icon_left_new', 'arrow_icon_left' ); ?>
							<span class="elementor-screen-only"><?php echo esc_html__( 'Previous', 'jupiterx-core' ); ?></span>
						</div>
						<div <?php echo $this->get_render_attribute_string( 'navigation-arrow-next' ); ?>>
							<?php $this->render_swiper_button( 'arrow_icon_right_new', 'arrow_icon_right' ); ?>
							<span class="elementor-screen-only"><?php echo esc_html__( 'Next', 'jupiterx-core' ); ?></span>
						</div>
					<?php endif; ?>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	protected function get_slide_image_url( $slide, array $settings ) {
		// WPML compatibility.
		$slide['image']['id'] = apply_filters( 'wpml_object_id', $slide['image']['id'], 'attachment', true );

		$image_url = Group_Control_Image_Size::get_attachment_image_src( $slide['image']['id'], 'image_size', $settings );

		if ( ! $image_url ) {
			$image_url = $slide['image']['url'];
		}

		return $image_url;
	}

	protected function get_slide_image_alt_attribute( $slide ) {
		if ( ! empty( $slide['name'] ) ) {
			return $slide['name'];
		}

		if ( ! empty( $slide['image']['alt'] ) ) {
			return $slide['image']['alt'];
		}

		return '';
	}

	private function render_swiper_button( $icon_new, $icon ) {
		$settings          = $this->get_settings();
		$migration_allowed = Elementor::$instance->icons_manager->is_migration_allowed();
		$migrated          = isset( $settings['__fa4_migrated'][ $icon_new ] );
		$is_new            = empty( $settings[ $icon ] ) && $migration_allowed;

		if ( empty( $settings[ $icon ] ) && empty( $settings[ $icon_new ]['value'] ) ) {
			return;
		}

		if ( $is_new || $migrated ) :
			Elementor::$instance->icons_manager->render_icon( $settings[ $icon_new ], [ 'aria-hidden' => 'true' ] );
		else :
			?>
			<i class="<?php echo esc_attr( $settings[ $icon ] ); ?>" aria-hidden="true"></i>
		<?php endif;
	}
}
