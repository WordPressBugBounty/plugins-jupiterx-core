<?php

namespace JupiterX_Core\Raven\Modules\Sellkit\Widgets;

defined( 'ABSPATH' ) || die();

use JupiterX_Core\Raven\Base\Base_Widget;

class Sellkit_Order_Cart_Details_Preview extends Base_Widget {
	public function get_name() {
		return 'sellkit-order-cart-details-preview';
	}

	public function get_title() {
		return __( 'Order Cart Details', 'jupiterx-core' );
	}

	public function get_icon() {
		return 'raven-sellkit-widgets-preview sellkit-element-icon-preview sellkit-order-cart-details-preview-icon';
	}

	public function get_categories() {
		return [ 'sellkit' ];
	}
}
