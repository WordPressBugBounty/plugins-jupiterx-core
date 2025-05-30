<?php

namespace JupiterX_Core\Condition;

use Elementor\Plugin as Elementor;
use Elementor\Utils as ElementorUtils;

/**
 * Apply all created condition in frontend.
 *
 * @return void
 * @since 2.0.0
 * @SuppressWarnings(PHPMD.UnusedPrivateMethod)
 * @SuppressWarnings(PHPMD.EvalExpression)
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 * @SuppressWarnings(PHPMD.NPathComplexity)
*/
class Apply_Condition {
	/**
	 * Conditions checker.
	 *
	 * @since 4.0.0
	 * @var Jupiterx_Conditions_Check
	 */
	public $checker;

	/**
	 * Condition meta name.
	 *
	 * @since 4.0.0
	 * @var string
	 */
	public $meta_name;

	/**
	 * Posts option.
	 *
	 * @since 4.0.0
	 * @var string
	 */
	public $posts_option;

	/**
	 * Template id.
	 *
	 * @since 4.0.0
	 * @var integer
	 */
	public $id;

	/**
	 * Required widget.
	 *
	 * @since 4.0.0
	 * @var string
	 */
	public $required_widget;

	/**
	 * Posts from database.
	 *
	 * @since 4.0.0
	 * @var array
	 */
	public $posts;

	/**
	 * Object of query.
	 *
	 * @since 4.0.0
	 * @var Object
	 */
	public $query;

	public function __construct() {
		$this->dependencies();
		$this->data();
		$this->actions();
	}

	/**
	 * Actions.
	 *
	 * @return void
	 * @since 2.0.0
	 */
	private function actions() {
		add_action( 'init', function() {
			if ( isset( $_GET['jupiterx-layout-builder-preview'] ) ) { // phpcs:ignore
				add_action( 'wp', [ $this, 'customize_layout_builder_preview_mode' ] );

				return;
			}

			add_action( 'wp', [ $this, 'run_conditions_check' ], 5 );
		} );

		$this->integrations();
	}

	/**
	 * Load required classes.
	 *
	 * @return void
	 * @since 2.0.0
	 */
	private function dependencies() {
		jupiterx_core()->load_files(
			[
				'condition/classes/conditions',
			]
		);

		$this->checker         = new \Jupiterx_Conditions_Check();
		$this->meta_name       = \JupiterX_Core_Condition_Manager::JUPITERX_CONDITIONS_COMPONENT_META_NAME;
		$this->posts_option    = \JupiterX_Core_Condition_Manager::JUPITERX_POSTS_WITH_CONDITIONS;
		$this->id              = 0;
		$this->required_widget = '';
	}

	/**
	* Data.
	* Here we retrieve Posts that has condition meta from database.
	*
	* @return void
	*/
	private function data() {
		$posts       = get_option( $this->posts_option );
		$this->posts = [];

		if ( empty( $posts ) ) {
			return;
		}

		foreach ( $posts as $post ) {
			$conditions = get_post_meta( $post, $this->meta_name, true );

			if ( empty( $conditions ) && is_int( $post ) ) {
				continue;
			}

			$item            = [];
			$item['id']      = $post;
			$item['include'] = $this->grab_include_and_excludes( 'include', $conditions );
			$item['exclude'] = $this->grab_include_and_excludes( 'exclude', $conditions );

			array_push( $this->posts, $item );
		}

		// TODO : to speed up apply conditions , each time that user add a condition to a post
		// TODO : we can run this method and save $this->posts as cache.
	}

	/**
	 * Grab include and exclude parts from condition. to be used later.
	 *
	 * @param string $type
	 * @param array $conditions
	 * @return array
	 * @since 2.0.0
	 */
	private function grab_include_and_excludes( $type, $conditions ) {
		$item = [];

		if ( ! is_array( $conditions ) ) {
			return;
		}

		foreach ( $conditions as $key => $data ) {
			if ( $type === $data['conditionA'] ) {
				$condition = [ $data['conditionB'], $data['conditionC'], $data['conditionD'] ];
				array_push( $item, $condition );
			}
		}

		return $item;
	}

	public function run_conditions_check() {
		if ( is_admin() ) {
			return;
		}

		$data        = $this->posts;
		$this->query = get_queried_object();

		if ( empty( $data ) ) {
			return;
		}

		foreach ( $data as $post ) {
			// No include condition? just escape it.
			if ( empty( $post['include'] ) ) {
				continue;
			}

			$this->per_post( $post );
		}
	}

	/**
	 * Per_post.
	 * Checks each post that added to WP hook.
	 *
	 * @param [type] $post
	 * @return void
	 * @since 2.0.0
	 */
	private function per_post( $post ) {
		// Default priority
		$priority = 10;

		// Check if current page excluded. we check excludes first.
		// Because if this page is excluded there is no reason to check if it's included.
		if ( ! empty( $post['exclude'] ) ) {
			foreach ( $post['exclude'] as $condition ) {
				$result = $this->checker->conditions( $condition, $this->query, $post['id'] );

				if ( $result ) {
					// One exclude condition found. return.
					return;
				}
			}
		}

		// Now we check if current page included.
		$match = false;
		foreach ( $post['include'] as $condition ) {
			$result = $this->checker->conditions( $condition, $this->query, $post['id'] );

			if ( true === $result ) {
				// One condition match current page, break.
				$match = true;

				break;
			}
		}

		// There is no match, return.
		if ( ! $match ) {
			return;
		}

		// Finally : condition match found and there is no exclude issue. do something.
		// In case we need matched condition we can grab it before break.
		$this->apply( $post['id'], $priority );
	}

	/**
	 * Apply.
	 * Run when one of post conditions is match for current queried page.
	 *
	 * @param int $id
	 * @return void
	 * @since 2.0.0
	 */
	private function apply( $id, $priority ) {
		$meta_exists = metadata_exists( 'post', $id, '_elementor_template_type' );
		$post_status = get_post_status( $id );

		if ( 'publish' !== $post_status ) {
			return;
		}

		if ( $meta_exists ) {
			$this->render_layout_builder( $id, $priority );
			return;
		}

		$this->render_custom_snippets( $id );
	}

	/**
	 * Integrations for layout builder.
	 * Added to prevent adding extra codes to main function for the third party plugins.
	 *
	 * @since 3.0.0
	 */
	private function integrations() {
		// Sitepress, WPML Integration.
		if ( class_exists( 'SitePress' ) ) {
			add_filter( 'jupiterx-layout-builder-template-id', function( $id ) {
				$post_type = get_post_type( $id );
				return apply_filters( 'wpml_object_id', $id, $post_type, true );
			}, 10 );
		}

		// Rest of integrations goes here.
	}

	/**
	 * Render layout builder post type.
	 *
	 * @param int $id
	 * @return void
	 * @since 2.0.0
	 */
	private function render_layout_builder( $id, $priority ) {
		if ( ! defined( 'ELEMENTOR_PATH' ) ) {
			return;
		}

		$old_id = $id;
		$id     = apply_filters( 'jupiterx-layout-builder-template-id', $id );

		// Integrate with jet-woo-builder, while jet-woo-builder is inactive.
		// !TODO : should be removed later when we won't support jet-woo-builder anymore.
		if ( 'jet-woo-builder' === get_post_type( $id ) && ! class_exists( 'Jet_Woo_Builder' ) ) {
			return;
		}

		// Apply Header.
		if ( 'header' === get_post_meta( $id, '_elementor_template_type', true ) ) {
			$this->header( $id );

			return;
		}

		// Apply Footer.
		if ( 'footer' === get_post_meta( $id, '_elementor_template_type', true ) ) {
			$this->footer( $id );

			return;
		}

		// Updates jx-layout-type post meta when page title bar template is created by elementor.
		if ( 'page-title-bar' === get_post_meta( $id, '_elementor_template_type', true ) ) {
			update_post_meta( $id, 'jx-layout-type', 'page-title-bar' );
		}

		// Apply page title bar
		if ( 'page-title-bar' === get_post_meta( $old_id, 'jx-layout-type', true ) ) {
			$this->page_title_bar( $id );

			return;
		}

		// TODO : Prevent to apply template_include ( body ) in Elementor editor mode.
		add_filter( 'jupiterx-conditions-manager-template-id', function ( $arg ) use ( $id ) {
			if ( empty( $arg ) ) {
				return $id;
			}

			return $arg;
		}, 999 );

		// Added by Hooman for adding wrapper to single product widgets.
		add_filter( 'jupiterx-conditions-manager-template', function() use ( $id ) {
			ob_start();
			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

			return ob_get_clean();
		}, $priority );

		// Prevent applying in editor itself. or template itself.
		$post = get_post( get_the_ID() );
		if ( is_object( $post ) && 'elementor_library' === $post->post_type ) {
			return;
		}

		// remove all previous content and make it full width.
		remove_all_actions( 'jupiterx_content' );

		// Set content.
		add_action( 'jupiterx_content', function() use ( $id ) {
			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}, 99 );

		// Prevent template redirect in editor or preview. Also display document without the_content error.
		if ( Elementor::instance()->editor->is_edit_mode() || Elementor::instance()->preview->is_preview_mode() ) {
			$this->check_for_required_widget( $id );
			return;
		}

		// Make it full width template if selected.
		$full_widths = [ 'full-width.php', 'elementor_header_footer', 'elementor_canvas', 'default' ];
		$template    = $this->get_template_name( $id );

		jupiterx_add_filter( 'jupiterx_layout', 'c' ); //! seems not working in some cases. fixed with template redirect.

		if ( 'elementor_canvas' === $template ) {
			$this->header( $id, true );
			$this->page_title_bar( $id, true );
			$this->footer( $id, true );
		}

		add_filter( 'layout_builder_applied_template_id', function() use ( $id ) {
			return $id;
		} );

		$is_thankyou_page = apply_filters( 'jupiterx_determines_main_checkout_using_layout_builder', false );

		if ( $is_thankyou_page ) {
			// Higher priority than default content which applies for all templates at line 357.
			add_filter( 'the_content', function() use ( $id ) {
				echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}, 20 );

			// Prevents infinite loop.
			add_filter( 'jupiterx_determines_main_checkout_using_layout_builder', '__return_false' );
		}

		if ( in_array( $template, $full_widths, true ) ) {
			// Adding our class to wrapper.
			jupiterx_replace_attribute( 'jupiterx_fixed_wrap[_main_content]', 'class', '', 'jupiterx-layout-builder-template' );

			// So far this one was necessary for page post type.
			add_action( 'template_include', [ $this, 'template_include' ], 99 );

			// Extra inline style to remove body padding.
			add_action( 'wp_enqueue_scripts', [ $this, 'inline_style' ] );

			return;
		}

		$content = apply_filters( 'jupiterx-conditions-manager-template', '' );

		add_filter( 'the_content', function() use ( $content ) {
			return $content;
		}, 10 );
	}

	/**
	 * Gets template name.
	 *
	 * @since 2.5.0
	 */
	private function get_template_name( $id ) {
		$template = get_post_meta( $id, '_wp_page_template', true );

		if ( defined( 'ELEMENTOR_PRO_VERSION' ) ) {
			$settings = get_post_meta( $id, '_elementor_page_settings', true );

			if ( ! is_array( $settings ) ) {
				$settings = [];
			}

			$template = ( array_key_exists( 'page_template', $settings ) ) ? $settings['page_template'] : 'default';
		}

		if ( empty( $template ) ) {
			return 'default';
		}

		return $template;
	}

	/**
	 * Render custom snippets post type.
	 *
	 * @param int $id
	 * @return void
	 * @since 2.0.0
	*/
	private function render_custom_snippets( $id ) {
		$location = get_post_meta( $id, 'jupiterx_location', true );
		$priority = get_post_meta( $id, 'jupiterx_priority', true );

		add_action( $location, function() use ( $id ) {
			$snippet = get_post_field( 'post_content', $id );

			// Since it is non-php snippet, we just need to echo that.
			// In case we need to parse snippets include php, we just need to eval what render_php_script method return.
			echo $snippet; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}, $priority );
	}

	/**
	 * Render php snippets.
	 *
	 * @return string
	 * @param string $snippet code.
	 * @since 2.0.0
	 */
	private function render_php_script( $snippet ) {
		/* Remove ?> from end of snippet */
		$snippet = preg_replace( '|\?>[\s]*$|', '', $snippet );

		/* Insert ?> at begining of string to prevent eval errors. */
		$snippet = '?> ' . $snippet;

		return $snippet;
	}

	/**
	 * Header.
	 * Replace jupiter default header with user defined header template when condition match.
	 *
	 * @param int $id
	 * @return void
	 * @since 2.0.0
	 *
	 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	private function header( $id, $force_empty = false ) {
		add_filter( 'layout_builder_template_id', function() use ( $id ) {
			return $id;
		} );

		// Customizer integration.
		add_filter( 'theme_mod_jupiterx_header_type', function() {
			return '';
		} );

		// Remove Navbar section.
		jupiterx_remove_action( 'jupiterx_site_navbar' );

		// Remove all previously added hooks.
		remove_all_actions( 'jupiterx_header' );

		// Get more priority than elementor pro theme builder.
		add_filter( 'jupiterx_header_partial_additional_parameter', '__return_false' );

		// For the canvas template.
		if ( true === $force_empty ) {
			return;
		}

		$inline_style = true;

		if ( ! empty( $this->query ) && has_blocks( $this->query ) ) {
			$inline_style = false;
		}

		add_action( 'jupiterx_header', function() use ( $id, $inline_style ) {
			$layout_builder_template_id = apply_filters( 'layout_builder_applied_template_id', 0 );

			if (
				$layout_builder_template_id > 0 &&
				'elementor_canvas' === $this->get_template_name( $layout_builder_template_id )
			) {
				return;
			}

			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, $inline_style ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} );

		add_filter( 'jupiterx_layout_builder_header_id', function() use ( $id ) {
			return $id;
		} );
	}

	/**
	 * Footer
	 * Replace jupiter default footer with user defined footer template when condition match.
	 *
	 * @param [type] $id
	 * @return void
	 * @since 2.0.0
	 */
	private function footer( $id, $force_empty = false ) {
		// Integrate with customizer.
		add_filter( 'theme_mod_jupiterx_footer_type', function() {
			return '';
		} );

		// Remove subfooter section.
		jupiterx_remove_action( 'jupiterx_subfooter' );

		// Remove all previously added hooks.
		remove_all_actions( 'jupiterx_footer' );

		// More priority than elementor pro theme builder.
		add_filter( 'jupiterx_footer_partial_additional_parameter', '__return_False' );

		// For the canvas template.
		if ( true === $force_empty ) {
			return;
		}

		add_action( 'jupiterx_footer', function() use ( $id ) {
			$layout_builder_template_id = apply_filters( 'layout_builder_applied_template_id', 0 );

			if (
				$layout_builder_template_id > 0 &&
				'elementor_canvas' === $this->get_template_name( $layout_builder_template_id )
			) {
				return;
			}

			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} );
	}

	/**
	 * Apply page title bar.
	 *
	 * @param int $id template id
	 * @since 2.0.0
	 */
	private function page_title_bar( $id, $force_empty = false ) {
		jupiterx_remove_action( 'jupiterx_main_header', 'jupiterx_main_header' );

		if ( true === $force_empty ) {
			return;
		}

		$template = $this->get_template_name( get_the_ID() );

		add_action( 'jupiterx_main_header', function() use ( $id, $template ) {
			$layout_builder_template_id = apply_filters( 'layout_builder_applied_template_id', 0 );

			if ( $layout_builder_template_id > 0 ) {
				$template = $this->get_template_name( $layout_builder_template_id );
			}

			if ( 'elementor_canvas' === $template ) {
				return;
			}

			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} );

		$templates = [ 'default', 'elementor_theme', 'elementor_canvas' ];

		if ( in_array( $template, $templates, true ) ) {
			return;
		}

		/**
		 * Make page title bar compatible with other templates.
		 * We show it right after the header section in the templates that does not support page title bar.
		 * Example template : elementor_header_footer.
		 */
		add_action( 'jupiterx_layout_builder_after_header', function() use ( $id ) {
			echo Elementor::instance()->frontend->get_builder_content_for_display( $id, true ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		} );
	}

	/**
	 * Template redirect.
	 * Last step.
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function template_include( $template ) {
		$run = apply_filters( 'jx-run-layout-condition', true );

		if ( ! $run ) {
			return $template;
		}

		$layout_builder_template = __DIR__ . '/../templates/template.php';

		if ( file_exists( $layout_builder_template ) ) {
			return $layout_builder_template;
		}

		return $template;
	}

	/**
	 * Check if required widget exists for applied template.
	 *
	 * @since 2.5.0
	 * @param int $id template id.
	 */
	private function check_for_required_widget( $id ) {
		$data            = Elementor::instance()->documents->get( $id )->get_elements_data();
		$content_exists  = false;
		$required_widget = Elementor::instance()->widgets_manager->get_widget_types( 'raven-post-content' );

		Elementor::instance()->db->iterate_data( $data, function( $element ) use ( &$content_exists, $required_widget ) {
			if ( isset( $element['widgetType'] ) ) {
				if (
					$required_widget->get_name() === $element['widgetType'] ||
					'theme-post-content' === $element['widgetType']
				) {
					$content_exists = true;
				}
			}
		} );

		if ( ! $content_exists ) {
			$this->id              = $id;
			$this->required_widget = $required_widget->get_title();
			add_action( 'wp_footer', [ $this, 'preview_error_document_without_post_content_widget' ], 9999 );
		}
	}

	/**
	 * Will display an elementor alert if document has no post content widget.
	 *
	 * @since 2.5.0
	 */
	public function preview_error_document_without_post_content_widget() {
		$exclude   = [ 'sellkit_step' ];
		$post_type = get_post_type( get_the_id() );
		$title     = get_the_title( $this->id );
		$widget    = $this->required_widget;
		$edit      = Elementor::instance()->documents->get( $this->id )->get_edit_url();

		// Exclude post types that we do not want to show this warning for.
		if ( in_array( $post_type, $exclude, true ) ) {
			return;
		}

		// phpcs:disable
		$header = sprintf(
			esc_html__( 'The %s Widget was not found in your template.', 'jupiterx-core' ), esc_html(  $widget )
		);
		$message = sprintf(
			esc_html__( 'You must include the %1$s Widget in your template (%2$s), in order for Elementor to work on this page.', 'jupiterx-core' ), esc_html( $widget ), '<strong>' . esc_html( $title ) . '</strong>'
		);
		// phpcs:enable
		?>
			<script>
				const jupiterxParentDocument = window.parent;
				jupiterxParentDocument.elementor.on( 'globals:loaded', function() {
					throw 'error';
				} );

				jupiterxParentDocument.elementorCommon.dialogsManager.createWidget( 'confirm', {
					headerMessage: "<?php ElementorUtils::print_unescaped_internal_string( $header ); ?>",
					className: 'jx-layout-builder-post-content-issue',
					message: "<?php ElementorUtils::print_unescaped_internal_string( $message ); ?>",
					position: {
					my: 'center center',
					at: 'center center'
					},
					strings: {
						confirm: "<?php echo esc_html__( 'Edit Template', 'jupiterx-core' ); ?>",
						cancel: "<?php echo esc_html__( 'Go Back', 'jupiterx-core' ); ?>"
					},
					onConfirm: function onConfirm() {
						return window.open( '<?php ElementorUtils::print_unescaped_internal_string( $edit ); ?>', '_blank' );
					},
					onCancel: function onCancel() {
						return history.back();
					},
					hide: {
						onBackgroundClick: false,
						onButtonClick: false
					}
				} ).show();

			</script>
		<?php
	}

	/**
	 * ِSet body padding to zero when layout builder is applied.
	 *
	 * @since 2.5.0
	 */
	public function inline_style() {
		$custom_css  = '.jupiterx-main-content{ padding: 0px } .jupiterx-main-content > .container { max-width: inherit; padding: 0px }';
		$custom_css .= '.jupiterx-layout-builder-template > .row { margin: 0; } .jupiterx-layout-builder-template > .row > #jupiterx-primary { padding: 0; }';
		wp_add_inline_style( 'jupiterx-core-raven-frontend', $custom_css );
	}

	/**
	 * Customize preview.
	 * Customize preview for layout builder when everything is set.
	 *
	 * @since 2.0.0
	 * @return void
	 */
	public function customize_layout_builder_preview_mode() {
		$jx_var  = filter_input( INPUT_GET, 'jupiterx-layout-builder-preview', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$type    = filter_input( INPUT_GET, 'jupiterx-layout-builder-type', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$preview = filter_input( INPUT_GET, 'preview-id', FILTER_SANITIZE_NUMBER_INT );

		if ( ! empty( $jx_var ) ) {
			add_filter( 'show_admin_bar', '__return_false' );

			jupiterx_remove_action( 'jupiterx_main_header_partial_template' );
			jupiterx_remove_action( 'jupiterx_main_footer_partial_template' );
			jupiterx_remove_action( 'jupiterx_header_partial_template' );
			jupiterx_remove_action( 'jupiterx_footer_partial_template' );

			add_action( 'wp_head', function() {
				?>
					<style>
						body {
							-moz-transform: scale(0.5, 0.5); /* Moz-browsers */
							zoom: 0.5; /* Other non-webkit browsers */
							zoom: 50%; /* Webkit browsers */
						}
					</style>
				<?php
			} );

			/**
			 * This action will fire in layout builder preview.
			 * It will pass template id.
			 *
			 * @since 2.5.0
			 * @param int $preview preview id.
			 */
			do_action( 'jupiterx-layout-builder-preview-' . $type, $preview );
		}
	}
}

new Apply_Condition();
