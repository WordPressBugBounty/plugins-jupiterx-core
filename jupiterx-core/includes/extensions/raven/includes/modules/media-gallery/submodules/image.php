<?php

namespace JupiterX_Core\Raven\Modules\Media_Gallery\Submodules;

use Elementor\Group_Control_Image_Size;
use Elementor\Utils;

defined( 'ABSPATH' ) || die();

class Image extends Base {
	public static function render_item( $data, $settings, $widget ) {
		$image_data = self::get_image_item_meta( $data, $settings );
		$link_to    = self::get_item_link_to( $data );
		$lazy       = self::is_lazy_load( $settings ) ? 'loading=lazy' : '';
		$zoom_img   = '';

		if ( 'zoom' === $settings['image_hover_animation'] && ! empty( $data['image']['id'] ) ) {
			// WPML compatibility.
			$data['image']['id'] = apply_filters( 'wpml_object_id', $data['image']['id'], 'attachment', true );

			$full_poster = wp_get_attachment_image_url( $data['image']['id'], 'full' );
			$zoom_img    = sprintf( '<img alt="zoomImg" class="zoom-animation-image" src="%s">', esc_url( $full_poster ) );
		}

		if ( ! empty( $data['url_link_to']['url'] ) && 'custom' === $data['link_to'] ) {
			$widget->add_link_attributes( 'image_link' . $data['_id'], $data['url_link_to'] );
		}

		ob_start();
		?>
		<a
			class="gallery-item"
			<?php if ( 'custom' === $data['link_to'] ) {
				echo $widget->get_render_attribute_string( 'image_link' . esc_attr( $data['_id'] ) );
			} else {
				echo 'href="' . esc_url( $link_to ) . '"';
			}

			if ( 'file' === $data['link_to'] ) {
				?>
				data-elementor-open-lightbox="yes"
				data-elementor-lightbox-slideshow="<?php echo esc_attr( $data['lightbox_id'] ); ?>"
				data-elementor-lightbox-title="<?php echo esc_attr( $image_data['title'] ); ?>"
				<?php
			}
			?>
		>
			<div class="type-image">
				<div class="poster">
					<?php Utils::print_unescaped_internal_string( $zoom_img ); ?>
					<img
						<?php echo esc_attr( $lazy ); ?>
						src="<?php echo esc_url( $image_data['display_image'] ); ?>"
						alt="<?php echo esc_attr( $image_data['alt'] ); ?>"
					>
				</div>
			</div>
			<?php Utils::print_unescaped_internal_string( self::render_overlay( $image_data, $settings ) ); ?>
		</a>
		<?php
		return ob_get_clean();
	}

	private static function get_image_item_meta( $data, $settings ) {
		// WPML compatibility.
		$data['image']['id']  = apply_filters( 'wpml_object_id', $data['image']['id'], 'attachment', true );
		$data['image']['alt'] = get_post_meta( $data['image']['id'], '_wp_attachment_image_alt', true );

		$image_data = [
			'id'            => $data['image']['id'],
			'title'         => '',
			'caption'       => '',
			'description'   => '',
			'url'           => self::get_item_link_to( $data ),
			'alt'           => $data['image']['alt'] ?? '',
			'display_image' => self::get_item_link_to( $data ),
		];

		if ( ! empty( $image_data['id'] ) ) {
			$post = get_post( $image_data['id'] );

			$image_data = [
				'id'            => $data['image']['id'],
				'title'         => isset( $post->post_title ) ? $post->post_title : '',
				'caption'       => isset( $post->post_excerpt ) ? $post->post_excerpt : '',
				'description'   => isset( $post->post_content ) ? $post->post_content : '',
				'url'           => isset( $post->guid ) ? $post->guid : '',
				'alt'           => $data['image']['alt'] ?? '',
				'display_image' => Group_Control_Image_Size::get_attachment_image_src( $image_data['id'], 'thumbnail_image', $settings ),
			];

		}

		if ( 'custom' === $data['link_to'] ) {
			$image_data['url'] = self::get_item_link_to( $data );
		}

		return $image_data;
	}

	/**
	 *
	 * @param $data array
	 *
	 * @return mixed|string
	 * @since 3.0.0
	 */
	private static function get_item_link_to( $data ) {
		if ( 'none' === $data['link_to'] ) {
			return '#';
		}

		if ( 'file' === $data['link_to'] ) {
			return esc_url( $data['image']['url'] );
		}

		return esc_url( $data['url_link_to']['url'] );
	}
}
