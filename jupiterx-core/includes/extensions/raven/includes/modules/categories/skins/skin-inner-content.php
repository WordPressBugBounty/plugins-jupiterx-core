<?php
namespace JupiterX_Core\Raven\Modules\Categories\Skins;

use Elementor\Group_Control_Image_Size;

defined( 'ABSPATH' ) || die();

class Skin_Inner_Content extends Skin_Base {
	public function get_id() {
		return 'inner_content';
	}

	public function get_title() {
		return __( 'Inner Content', 'jupiterx-core' );
	}

	protected function register_image_controls() {
		$this->start_controls_section(
			'section_image',
			[
				'label' => __( 'Featured Image', 'jupiterx-core' ),
				'tab' => 'style',
			]
		);

		$this->add_control(
			'image_background_position',
			[
				'label' => __( 'Background Position', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'center center',
				'options' => [
					'center center' => __( 'Center Center', 'jupiterx-core' ),
					'center left' => __( 'Center Left', 'jupiterx-core' ),
					'center right' => __( 'Center Right', 'jupiterx-core' ),
					'top center' => __( 'Top Center', 'jupiterx-core' ),
					'top left' => __( 'Top Left', 'jupiterx-core' ),
					'top right' => __( 'Top Right', 'jupiterx-core' ),
					'bottom center' => __( 'Bottom Center', 'jupiterx-core' ),
					'bottom left' => __( 'Bottom Left', 'jupiterx-core' ),
					'bottom right' => __( 'Bottom Right', 'jupiterx-core' ),
				],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-img' => 'background-position: {{VALUE}};',
					'{{WRAPPER}} .raven-categories-img-layer' => 'object-position: {{VALUE}};',
				],
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'image_background_size',
			[
				'label' => __( 'Background Size', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'cover',
				'options' => [
					'auto' => __( 'Auto', 'jupiterx-core' ),
					'cover' => __( 'Cover', 'jupiterx-core' ),
					'contain' => __( 'Contain', 'jupiterx-core' ),
				],
				'selectors' => [
					'{{WRAPPER}} .raven-categories-img' => 'background-size: {{VALUE}};',
					'{{WRAPPER}} .raven-categories-img-layer' => 'object-fit: {{VALUE}};',
				],
				'render_type' => 'template',
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
					'{{WRAPPER}} .raven-categories-img' => 'opacity: {{SIZE}};',
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
					'{{WRAPPER}} .raven-categories-item:hover .raven-categories-img' => 'opacity: {{SIZE}};',
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
				'selector' => '{{WRAPPER}} .raven-categories-item:hover .raven-categories-img::before',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}


	protected function render_skin_image( $settings ) {
		if ( empty( $settings['hover_image']['id'] ) ) {
			?>
			<div class="raven-categories-img" style="background-image: url('<?php echo esc_url( Group_Control_Image_Size::get_attachment_image_src( $settings['image']['id'], 'image', $settings ) ); ?>')"></div>
			<?php
			return;
		}

		$normal_image = $this->add_image_layer_attributes(
			Group_Control_Image_Size::get_attachment_image_html( $settings ),
			'raven-categories-img-layer raven-categories-img-layer-normal'
		);

		$hover_image = $this->add_image_layer_attributes(
			Group_Control_Image_Size::get_attachment_image_html( $settings, 'hover_image' ),
			'raven-categories-img-layer raven-categories-img-layer-hover'
		);

		?>
		<div class="raven-categories-img raven-categories-img-has-hover">
			<?php echo wp_kses_post( $normal_image ); ?>
			<?php echo wp_kses_post( $hover_image ); ?>
		</div>
		<?php
	}

	private function add_image_layer_attributes( $image, $class ) {
		$object_position = $this->get_instance_value( 'image_background_position' );
		$object_fit      = $this->get_instance_value( 'image_background_size' );

		if ( empty( $object_position ) ) {
			$object_position = 'center center';
		}

		if ( 'auto' === $object_fit ) {
			$object_fit = 'none';
		}

		if ( ! in_array( $object_fit, [ 'cover', 'contain', 'none' ], true ) ) {
			$object_fit = 'cover';
		}

		$layer_style = sprintf(
			'object-position:%s;object-fit:%s;',
			esc_attr( $object_position ),
			esc_attr( $object_fit )
		);

		$image = preg_replace_callback(
			'/<img\b([^>]*)>/i',
			function( $matches ) use ( $class, $layer_style ) {
				$attributes = $matches[1];
				$closing    = '';

				if ( preg_match( '/\s*\/\s*$/', $attributes ) ) {
					$attributes = preg_replace( '/\s*\/\s*$/', '', $attributes );
					$closing    = ' /';
				}

				if ( preg_match( '/\bclass=(["\'])(.*?)\1/i', $attributes ) ) {
					$attributes = preg_replace(
						'/\bclass=(["\'])(.*?)\1/i',
						'class=$1$2 ' . esc_attr( $class ) . '$1',
						$attributes,
						1
					);
				} else {
					$attributes .= ' class="' . esc_attr( $class ) . '"';
				}

				if ( preg_match( '/\bstyle=(["\'])(.*?)\1/i', $attributes ) ) {
					$attributes = preg_replace(
						'/\bstyle=(["\'])(.*?)\1/i',
						'style=$1$2' . esc_attr( $layer_style ) . '$1',
						$attributes,
						1
					);
				} else {
					$attributes .= ' style="' . esc_attr( $layer_style ) . '"';
				}

				return '<img' . $attributes . $closing . '>';
			},
			$image,
			1
		);

		return null === $image ? '' : $image;
	}
}
