<?php
namespace JupiterX_Core\Raven\Modules\Categories\Skins;

use Elementor\Group_Control_Image_Size;

defined( 'ABSPATH' ) || die();

class Skin_Outer_Content extends Skin_Base {
	public function get_id() {
		return 'outer_content';
	}

	public function get_title() {
		return __( 'Outer Content', 'jupiterx-core' );
	}

	protected function register_image_controls() {
		$this->start_controls_section(
			'section_image',
			[
				'label' => __( 'Featured Image', 'jupiterx-core' ),
				'tab' => 'style',
			]
		);

		$this->add_responsive_control(
			'image_ratio',
			[
				'label' => __( 'Image Ratio', 'jupiterx-core' ),
				'type' => 'slider',
				'range' => [
					'px' => [
						'min' => 0.1,
						'max' => 10,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-img img' => 'height: calc( {{SIZE}} * 100px );',
				],
				'condition' => [
					$this->get_control_id( 'layout' ) => 'grid',
				],
			]
		);

		$this->add_responsive_control(
			'image_spacing',
			[
				'label' => __( 'Spacing', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'image_hover_effect',
			[
				'label' => __( 'Hover Effect', 'jupiterx-core' ),
				'type' => 'select',
				'default' => '',
				'options' => [
					'' => __( 'None', 'jupiterx-core' ),
					'slide-right' => __( 'Slide Right', 'jupiterx-core' ),
					'slide-down' => __( 'Slide Down', 'jupiterx-core' ),
					'scale-down' => __( 'Scale Down', 'jupiterx-core' ),
					'scale-up' => __( 'Scale Up', 'jupiterx-core' ),
					'blur' => __( 'Blur', 'jupiterx-core' ),
					'grayscale-reverse' => __( 'Grayscale to Color', 'jupiterx-core' ),
					'grayscale' => __( 'Color to Grayscale', 'jupiterx-core' ),
					'swap' => __( 'Swap Image', 'jupiterx-core' ),
				],
				'prefix_class' => 'raven-hover-',
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'image_hover_swap_animation',
			[
				'label' => __( 'Swap Animation', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'zoom-in',
				'options' => [
					'' => __( 'None', 'jupiterx-core' ),
					'zoom-in' => __( 'Zoom In', 'jupiterx-core' ),
					'zoom-out' => __( 'Zoom Out', 'jupiterx-core' ),
				],
				'prefix_class' => 'raven-hover-swap-animation-',
				'render_type' => 'template',
				'condition' => [
					$this->get_control_id( 'image_hover_effect' ) => 'swap',
				],
			]
		);

		$this->add_control(
			'image_hover_swap_duration',
			[
				'label' => __( 'Transition Duration (s)', 'jupiterx-core' ),
				'type' => 'number',
				'default' => 0.35,
				'min' => 0.1,
				'max' => 2,
				'step' => 0.05,
				'selectors' => [
					'{{WRAPPER}} .raven-categories-img-has-hover' => '--raven-categories-image-swap-duration: {{VALUE}}s;',
				],
				'condition' => [
					$this->get_control_id( 'image_hover_effect' ) => 'swap',
				],
			]
		);

		$this->start_controls_tabs( 'image_tabs' );

		$this->start_controls_tab(
			'image_tab_normal',
			[
				'label' => __( 'Normal', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'image_opacity_normal',
			[
				'label' => __( 'Opacity', 'jupiterx-core' ),
				'type' => 'slider',
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-item img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'overlay_tab_background_normal',
				'types' => [ 'classic', 'gradient' ],
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Overlay Color Type', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-categories-img::before',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'image_tab_hover',
			[
				'label' => __( 'Hover', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'image_opacity_hover',
			[
				'label' => __( 'Opacity', 'jupiterx-core' ),
				'type' => 'slider',
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 1,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-item:hover img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'overlay_tab_background_hover',
				'types' => [ 'classic', 'gradient' ],
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Overlay Color Type', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-categories-img:hover::before',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	protected function render_skin_image( $settings ) {
		$has_hover_image = ! empty( $settings['hover_image']['id'] );
		$image_classes   = [ 'raven-categories-img' ];

		if ( $has_hover_image ) {
			$image_classes[] = 'raven-categories-img-has-hover';
		}
		?>
		<a href="<?php echo esc_url( get_term_link( $this->term->term_id ) ); ?>" class="<?php echo esc_attr( implode( ' ', $image_classes ) ); ?>">
			<?php echo wp_kses_post( Group_Control_Image_Size::get_attachment_image_html( $settings ) ); ?>
			<?php if ( $has_hover_image ) : ?>
				<span class="raven-categories-img-hover">
					<?php echo wp_kses_post( Group_Control_Image_Size::get_attachment_image_html( $settings, 'hover_image' ) ); ?>
				</span>
			<?php endif; ?>
		</a>
		<?php
	}
}
