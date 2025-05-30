<?php

namespace JupiterX_Core\Raven\Core\Compatibility\Wpml\Modules;

defined( 'ABSPATH' ) || die();

class Navigation_Menu extends \WPML_Elementor_Module_With_Items {
	public function get_items_field() {
		return 'repeater_menu';
	}

	public function get_fields() {
		return [
			'label',
		];
	}

	protected function get_title( $field ) {
		switch ( $field ) {
			case 'label':
				return esc_html__( 'Raven Navigation Menu: Label', 'jupiterx-core' );

			default:
				return '';
		}
	}

	protected function get_editor_type( $field ) {
		switch ( $field ) {
			case 'label':
				return 'LINE';

			default:
				return '';
		}
	}
}
