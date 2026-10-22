<?php
defined( 'ABSPATH' ) || die();

/**
 * The Jupiter Core Parse CSS component is a wrapper for CSS parser.
 *
 * The bundled Sabberworm PHP CSS Parser and PrestaShop RtlCss libraries use
 * JupiterX_Core-prefixed namespaces so they do not conflict with other plugins.
 * Refresh vendors with `composer parse-css:update` from the plugin root.
 *
 * @package JupiterX_Core\Parse_CSS
 */

/**
 * Parse CSS.
 *
 * @since 1.0.0
 *
 * @param string $content The CSS strings.
 *
 * @return string The parsed CSS content.
 */
function jupiterx_parse_css( $content ) {
	static $loaded = false;

	if ( ! $loaded ) {
		jupiterx_core()->load_files( [ 'parse-css/vendors/autoload', 'parse-css/class' ] );
		$loaded = true;
	}

	$parser = new _JupiterX_Parse_CSS( $content );
	$parser = $parser->parse();

	if ( function_exists( '_jupiterx_is_compiler_dev_mode' ) && _jupiterx_is_compiler_dev_mode() ) {
		return $parser->render( JupiterX_Core\Sabberworm\CSS\OutputFormat::createPretty() );
	}

	return $parser->render();
}
