<?php
/**
 * Compatibility patches applied after Strauss prefixes vendors.
 *
 * RtlCss 2.0 is abandoned and still uses implicit nullable types, which PHP 8.4 deprecates.
 *
 * @package JupiterX_Core\Parse_CSS
 */

$rtlcss = dirname( __DIR__ ) . '/vendors/prestashop/rtlcss-php/src/RtlCss.php';

if ( ! is_file( $rtlcss ) ) {
	fwrite( STDERR, "parse-css: RtlCss.php not found, skip PHP 8.4 patch.\n" );
	exit( 0 );
}

$contents = file_get_contents( $rtlcss );
$updated  = str_replace( 'FlipOptions $options = null', '?FlipOptions $options = null', $contents );

if ( $updated !== $contents ) {
	file_put_contents( $rtlcss, $updated );
}
