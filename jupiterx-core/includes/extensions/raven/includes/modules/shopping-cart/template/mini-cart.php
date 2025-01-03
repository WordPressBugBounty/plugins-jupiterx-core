<?php
/**
 * Override WooCommerce mini cart.
 *
 * @version NEXT
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_mini_cart' ); ?>

<?php
	function raven_shopping_cart_subtotal() {
		echo '<span>' . esc_html__( 'Subtotal', 'jupiterx-core' ) . '</span> ' . WC()->cart->get_cart_subtotal(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	remove_action( 'woocommerce_widget_shopping_cart_total', 'woocommerce_widget_shopping_cart_subtotal', 10 );
	add_action( 'woocommerce_widget_shopping_cart_total', 'raven_shopping_cart_subtotal', 10 );
?>
<?php if ( ! WC()->cart->is_empty() ) : ?>
	<ul class="woocommerce-mini-cart cart_list product_list_widget">
		<?php
		do_action( 'woocommerce_before_mini_cart_contents' );

		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
			$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

			if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_widget_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
				$product_data       = $_product->get_data();
				$product_name_value = $_product->get_name();

				if ( ! empty( $product_data['parent_id'] ) ) {
					$parent_data        = $_product->get_parent_data();
					$product_name_value = ! empty( $parent_data['title'] ) ? $parent_data['title'] : $product_name_value;
				}

				$product_name      = apply_filters( 'woocommerce_cart_item_name', $product_name_value, $cart_item, $cart_item_key );
				$thumbnail         = apply_filters( 'woocommerce_cart_item_thumbnail', $_product->get_image(), $cart_item, $cart_item_key );
				$product_price     = apply_filters( 'woocommerce_cart_item_price', WC()->cart->get_product_price( $_product ), $cart_item, $cart_item_key );
				$product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
				?>
				<li class="woocommerce-mini-cart-item <?php echo esc_attr( apply_filters( 'woocommerce_mini_cart_item_class', 'mini_cart_item', $cart_item, $cart_item_key ) ); ?>">
					<div class="woocommerce-mini-cart-item-content-wrapper" >
						<a class="woocommerce-mini-cart-item-image" href="<?php echo esc_url( $product_permalink ); ?>">
							<?php echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</a>
						<div class="woocommerce-mini-cart-item-content">
							<div class="woocommerce-mini-cart-item-content-heading">
								<?php if ( empty( $product_permalink ) ) : ?>
									<?php echo wp_kses_post( $product_name ); ?>
								<?php else : ?>
									<a class="woocommerce-mini-cart-item-link" href="<?php echo esc_url( $product_permalink ); ?>">
										<?php echo wp_kses_post( $product_name ); ?>
									</a>
								<?php endif; ?>
								<?php
								echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
									'woocommerce_cart_item_remove_link',
									sprintf(
										'<a href="%s" class="remove jupiterx_remove_from_cart" aria-label="%s" data-product_id="%s" data-cart_item_key="%s" data-product_sku="%s"></a>',
										esc_url( wc_get_cart_remove_url( $cart_item_key ) ),
										esc_attr__( 'Remove this item', 'woocommerce' ),
										esc_attr( $product_id ),
										esc_attr( $cart_item_key ),
										esc_attr( $_product->get_sku() )
									),
									$cart_item_key
								);
								?>
							</div>
							<?php if ( ! empty( $cart_item['variation_id'] ) ) : ?>
								<ul class="woocommerce-mini-cart-item-attributes">
								<?php foreach ( $cart_item['variation'] as $key => $attribute ) : ?>
									<?php
										$attribute_taxonomy = str_replace( 'attribute_', '', $key );
										$product_terms      = wc_get_product_terms( $cart_item['product_id'], $attribute_taxonomy, [ 'fields' => 'all' ] );
										$label              = wc_attribute_label( $attribute_taxonomy );

										foreach ( $product_terms as $product_term ) {
											if ( $product_term->slug === $attribute && $product_term->taxonomy === $attribute_taxonomy ) {
												echo '<li><span>' . esc_attr( $label ) . ': ' . esc_attr( $product_term->name ) . '</span></li>';
											}
										}
									?>
								<?php endforeach; ?>
								</ul>
							<?php endif; ?>
							<?php echo apply_filters( 'woocommerce_widget_cart_item_quantity', '<span class="quantity">' . sprintf( '%s &times; %s', $cart_item['quantity'], $product_price ) . '</span>', $cart_item, $cart_item_key ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</div>
					</div>
				</li>
				<?php
			}
		}

		do_action( 'woocommerce_mini_cart_contents' );
		?>
	</ul>

	<p class="woocommerce-mini-cart__total raven-shopping-cart-total total">
		<?php
		/**
		 * Hook: woocommerce_widget_shopping_cart_total.
		 *
		 * @hooked woocommerce_widget_shopping_cart_subtotal - 10
		 */
		do_action( 'woocommerce_widget_shopping_cart_total' );
		?>
	</p>

	<?php do_action( 'woocommerce_widget_shopping_cart_before_buttons' ); ?>

	<p class="woocommerce-mini-cart__buttons buttons"><?php do_action( 'woocommerce_widget_shopping_cart_buttons' ); ?></p>

	<?php do_action( 'woocommerce_widget_shopping_cart_after_buttons' ); ?>

<?php else : ?>

	<p class="woocommerce-mini-cart__empty-message"><?php esc_html_e( 'No products in the cart.', 'woocommerce' ); ?></p>

<?php endif; ?>

<?php do_action( 'woocommerce_after_mini_cart' ); ?>
<?php
	add_action( 'woocommerce_widget_shopping_cart_total', 'woocommerce_widget_shopping_cart_subtotal', 10 );
	remove_action( 'woocommerce_widget_shopping_cart_total', 'raven_shopping_cart_subtotal', 10 );
?>
