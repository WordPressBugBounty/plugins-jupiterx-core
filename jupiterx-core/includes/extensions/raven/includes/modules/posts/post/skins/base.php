<?php
/**
 * @codingStandardsIgnoreFile
 */

namespace JupiterX_Core\Raven\Modules\Posts\Post\Skins;

defined( 'ABSPATH' ) || die();

use JupiterX_Core\Raven\Utils;
use JupiterX_Core\Raven\Modules\Posts\Classes\Skin_Base;
use JupiterX_Core\Raven\Modules\Posts\Module;

/**
 * @SuppressWarnings(PHPMD.ExcessiveClassLength)
 * @SuppressWarnings(PHPMD.NPathComplexity)
 * @SuppressWarnings(ExcessiveClassComplexity)
 */
abstract class Base extends Skin_Base {

	protected function _register_controls_actions() {
		add_action( 'elementor/element/raven-posts/section_settings/after_section_end', [ $this, 'register_settings_controls' ], 10 );
		add_action( 'elementor/element/raven-posts/section_sort_filter/after_section_end', [ $this, 'register_controls' ], 20 );
	}

	public function register_settings_controls( \Elementor\Widget_Base $widget ) {
		$this->parent = $widget;

		$this->start_injection( [
			'at' => 'before',
			'of' => 'query_posts_per_page',
		] );

		$this->add_control(
			'layout',
			[
				'label' => __( 'Layout', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'grid',
				'options' => [
					'grid' => __( 'Grid', 'jupiterx-core' ),
					'masonry' => __( 'Masonry', 'jupiterx-core' ),
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'mirror_rows',
			[
				'label' => __( 'Mirror Rows', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => '',
				'condition' => [
					$this->get_control_id( 'layout' ) => 'grid',
					$this->get_control_id( 'post_image_position' ) => [ 'left', 'right' ],
				],
				'frontend_available' => true,
			]
		);

		$this->add_responsive_control(
			'columns',
			[
				'label' => __( 'Columns', 'jupiterx-core' ),
				'type' => 'select',
				'default' => '3',
				'tablet_default' => '2',
				'mobile_default' => '1',
				'options' => [
					'1' => __( '1', 'jupiterx-core' ),
					'2' => __( '2', 'jupiterx-core' ),
					'3' => __( '3', 'jupiterx-core' ),
					'4' => __( '4', 'jupiterx-core' ),
					'5' => __( '5', 'jupiterx-core' ),
					'6' => __( '6', 'jupiterx-core' ),
				],
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'equal_height',
			[
				'label' => __( 'Equal Columns Height', 'jupiterx-core' ),
				'type' => 'switcher',
				'selectors' => [
					'{{WRAPPER}} .raven-grid-item' => 'align-items: stretch',
				],
				'condition' => [
					$this->get_control_id( 'layout' ) => 'grid',
				],
			]
		);

		$this->end_injection();

		$this->start_injection( [
			'at' => 'after',
			'of' => 'query_posts_per_page',
		] );

		$this->add_control(
			'show_sortable',
			[
				'label' => __( 'Sortable', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => '',
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'show_all_title',
			[
				'label' => __( 'All Title', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => 'yes',
				'label_on' => __( 'Show', 'jupiterx-core' ),
				'label_off' => __( 'Hide', 'jupiterx-core' ),
				'frontend_available' => true,
				'condition' => [
					$this->get_control_id( 'show_sortable' ) => 'yes',
				]
			]
		);

		$this->add_control(
			'show_pagination',
			[
				'label' => __( 'Pagination', 'jupiterx-core' ),
				'type' => 'switcher',
				'default' => '',
				'label_on' => __( 'Show', 'jupiterx-core' ),
				'label_off' => __( 'Hide', 'jupiterx-core' ),
				'frontend_available' => true,
			]
		);

		$this->add_control(
			'pagination_type',
			[
				'label' => __( 'View Pagination As', 'jupiterx-core' ),
				'type' => 'select',
				'default' => 'page_based',
				'options' => [
					'page_based' => __( 'Page Based', 'jupiterx-core' ),
					'load_more' => __( 'Load More', 'jupiterx-core' ),
					'infinite_load' => __( 'Infinite Load', 'jupiterx-core' ),
				],
				'condition' => [
					$this->get_control_id( 'show_pagination' ) => 'yes',
				],
				'frontend_available' => true,
			]
		);

		$this->end_injection();
	}

	public function register_controls( \Elementor\Widget_Base $widget ) {
		$this->parent = $widget;

		$this->register_pagination_controls();
		$this->register_sortable_controls();
	}

	protected function register_pagination_controls() {
		$this->start_controls_section(
			'section_pagination',
			[
				'label' => __( 'Pagination', 'jupiterx-core' ),
				'tab' => 'style',
				'condition' => [
					$this->get_control_id( 'show_pagination' ) => 'yes',
					$this->get_control_id( 'pagination_type!' ) => [ '', 'infinite_load' ],
				],
			]
		);

		$this->register_page_based_controls();

		$this->register_load_more_controls();

		$this->end_controls_section();
	}

	/**
	 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
	 */
	protected function register_page_based_controls() {
		$this->add_control(
			'page_based_pages_visible',
			[
				'label' => __( 'Pages Visible', 'jupiterx-core' ),
				'type' => 'number',
				'default' => 7,
				'min' => 1,
				'max' => 20,
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'page_based_prev_text',
			[
				'label' => __( 'Previous Label', 'jupiterx-core' ),
				'type' => 'text',
				'default' => __( '&laquo; Prev', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'page_based_next_text',
			[
				'label' => __( 'Next Label', 'jupiterx-core' ),
				'type' => 'text',
				'default' => __( 'Next &raquo;', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_responsive_control(
			'page_based_spacing',
			[
				'label' => __( 'Spacing', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination' => 'margin-top: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'page_based_space_between',
			[
				'label' => __( 'Space Between', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px' ],
				'default' => [
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item' => 'margin-left: calc({{SIZE}}{{UNIT}} / 2); margin-right: calc({{SIZE}}{{UNIT}} / 2);',
					'{{WRAPPER}} .raven-pagination-prev' => 'margin-left: 0;',
					'{{WRAPPER}} .raven-pagination-next' => 'margin-right: 0;',
				],
			]
		);

		$this->add_responsive_control(
			'page_based_padding',
			[
				'label' => __( 'Padding', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'page_based_align',
			[
				'label' => __( 'Alignment', 'jupiterx-core' ),
				'type' => 'choose',
				'default' => '',
				'options' => [
					'left' => [
						'title' => __( 'Left', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-right',
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-items' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_page_based' );

		$this->start_controls_tab(
			'tabs_page_based_normal',
			[
				'label' => __( 'Normal', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'page_based_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'page_based_typography',
				'scheme' => '3',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'page_based_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item',
			]
		);

		$this->add_control(
			'page_based_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'page_based_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'page_based_border_border!' ) => '',
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'page_based_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item',
			]
		);

		$this->add_control(
			'page_based_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'page_based_box_shadow',
				'selector' => '{{WRAPPER}} .raven-pagination-item',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tabs_page_based_active',
			[
				'label' => __( 'Active', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'active_page_based_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'active_page_based_typography',
				'scheme' => '3',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'active_page_based_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled',
			]
		);

		$this->add_control(
			'active_page_based_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'active_page_based_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'active_page_based_border_border!' ) => '',
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'active_page_based_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled',
			]
		);

		$this->add_control(
			'active_page_based_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'active_page_based_box_shadow',
				'selector' => '{{WRAPPER}} a.raven-pagination-active, {{WRAPPER}} a.raven-pagination-disabled',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tabs_page_based_hover',
			[
				'label' => __( 'Hover', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'hover_page_based_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'hover_page_based_typography',
				'scheme' => '3',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'hover_page_based_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover',
			]
		);

		$this->add_control(
			'hover_page_based_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
			]
		);

		$this->add_control(
			'hover_page_based_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'hover_page_based_border_border!' ) => '',
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'hover_page_based_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selector' => '{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover',
			]
		);

		$this->add_control(
			'hover_page_based_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'page_based',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'hover_page_based_box_shadow',
				'selector' => '{{WRAPPER}} .raven-pagination-item:not(.raven-pagination-active):not(.raven-pagination-disabled):hover',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
	}

	/**
	 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
	 */
	protected function register_load_more_controls() {
		$this->add_control(
			'load_more_text',
			[
				'label' => __( 'Button Label', 'jupiterx-core' ),
				'type' => 'text',
				'default' => __( 'Load More', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_width',
			[
				'label' => __( 'Width', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', 'em', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_height',
			[
				'label' => __( 'Height', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', 'em', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'height: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_spacing',
			[
				'label' => __( 'Spacing', 'jupiterx-core' ),
				'type' => 'slider',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'tablet_default' => [
					'unit' => 'px',
				],
				'mobile_default' => [
					'unit' => 'px',
				],
				'range' => [
					'px' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more' => 'margin-top: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_padding',
			[
				'label' => __( 'Padding', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_align',
			[
				'label' => __( 'Alignment', 'jupiterx-core' ),
				'type' => 'choose',
				'default' => '',
				'options' => [
					'left' => [
						'title' => __( 'Left', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-right',
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_load_more' );

		$this->start_controls_tab(
			'tabs_load_more_normal',
			[
				'label' => __( 'Normal', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
			]
		);

		$this->add_control(
			'load_more_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'load_more_typography',
				'scheme' => '3',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'load_more_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button',
			]
		);

		$this->add_control(
			'load_more_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
			]
		);

		$this->add_control(
			'load_more_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'load_more_border_border!' ) => '',
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'load_more_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button',
			]
		);

		$this->add_control(
			'load_more_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'load_more_box_shadow',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tabs_load_more_hover',
			[
				'label' => __( 'Hover', 'jupiterx-core' ),
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
			]
		);

		$this->add_control(
			'hover_load_more_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'hover_load_more_typography',
				'scheme' => '3',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button:hover',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'hover_load_more_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button:hover',
			]
		);

		$this->add_control(
			'hover_load_more_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
			]
		);

		$this->add_control(
			'hover_load_more_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'hover_load_more_border_border!' ) => '',
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'hover_load_more_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button:hover',
			]
		);

		$this->add_control(
			'hover_load_more_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-load-more-button:hover' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'hover_load_more_box_shadow',
				'condition' => [
					$this->get_control_id( 'pagination_type' ) => 'load_more',
				],
				'selector' => '{{WRAPPER}} .raven-load-more-button:hover',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
	}

	/**
	 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
	 */
	protected function register_sortable_controls() {
		$this->start_controls_section(
			'section_sortable',
			[
				'label' => __( 'Sortable', 'jupiterx-core' ),
				'tab' => 'style',
				'condition' => [
					$this->get_control_id( 'show_sortable' ) => 'yes',
				],
			]
		);

		$this->add_responsive_control(
			'sortable_container_spacing',
			[
				'label' => __( 'Container Spacing', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'sortable_spacing',
			[
				'label' => __( 'Spacing', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'sortable_padding',
			[
				'label' => __( 'Padding', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'sortable_align',
			[
				'label' => __( 'Alignment', 'jupiterx-core' ),
				'type' => 'choose',
				'default' => '',
				'options' => [
					'left' => [
						'title' => __( 'Left', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-center',
					],
					'right' => [
						'title' => __( 'Right', 'jupiterx-core' ),
						'icon' => 'eicon-text-align-right',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-items' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->start_controls_tabs( 'tabs_sortable' );

		$this->start_controls_tab(
			'tabs_sortable_normal',
			[
				'label' => __( 'Normal', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'sortable_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'sortable_typography',
				'scheme' => '3',
				'selector' => '{{WRAPPER}} .raven-sortable-item',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'sortable_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-item',
			]
		);

		$this->add_control(
			'sortable_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'sortable_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'sortable_border_border!' ) => '',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'sortable_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-item',
			]
		);

		$this->add_control(
			'sortable_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'sortable_box_shadow',
				'selector' => '{{WRAPPER}} .raven-sortable-item',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tabs_sortable_active',
			[
				'label' => __( 'Active', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'active_sortable_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-active' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'active_sortable_typography',
				'scheme' => '3',
				'selector' => '{{WRAPPER}} .raven-sortable-active',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'active_sortable_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-active',
			]
		);

		$this->add_control(
			'active_sortable_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'active_sortable_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'active_sortable_border_border!' ) => '',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-active' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'active_sortable_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-active',
			]
		);

		$this->add_control(
			'active_sortable_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-active' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'active_sortable_box_shadow',
				'selector' => '{{WRAPPER}} .raven-sortable-active',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tabs_sortable_hover',
			[
				'label' => __( 'Hover', 'jupiterx-core' ),
			]
		);

		$this->add_control(
			'hover_sortable_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'typography',
			[
				'name' => 'hover_sortable_typography',
				'scheme' => '3',
				'selector' => '{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover',
			]
		);

		$this->add_group_control(
			'raven-background',
			[
				'name' => 'hover_sortable_background',
				'exclude' => [ 'image' ],
				'fields_options' => [
					'background' => [
						'label' => __( 'Background Color Type', 'jupiterx-core' ),
					],
					'color' => [
						'label' => __( 'Background Color', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover',
			]
		);

		$this->add_control(
			'hover_sortable_border_heading',
			[
				'label' => __( 'Border', 'jupiterx-core' ),
				'type' => 'heading',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'hover_sortable_border_color',
			[
				'label' => __( 'Color', 'jupiterx-core' ),
				'type' => 'color',
				'condition' => [
					$this->get_control_id( 'hover_sortable_border_border!' ) => '',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			'border',
			[
				'name' => 'hover_sortable_border',
				'placeholder' => '1px',
				'exclude' => [ 'color' ],
				'fields_options' => [
					'width' => [
						'label' => __( 'Border Width', 'jupiterx-core' ),
					],
				],
				'selector' => '{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover',
			]
		);

		$this->add_control(
			'hover_sortable_border_radius',
			[
				'label' => __( 'Border Radius', 'jupiterx-core' ),
				'type' => 'dimensions',
				'size_units' => [ 'px', '%' ],
				'default' => [
					'unit' => 'px',
				],
				'selectors' => [
					'{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			'box-shadow',
			[
				'name' => 'hover_sortable_box_shadow',
				'selector' => '{{WRAPPER}} .raven-sortable-item:not(.raven-sortable-active):hover',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	public function excerpt_length() {
		$excerpt_length = $this->get_instance_value( 'excerpt_length' );

		return intval( $excerpt_length['size'] );
	}

	public function excerpt_more() {
		return '';
	}

	public function render() {
		$wp_query = $this->parent->get_query_posts();

		$this->parent->query = $wp_query;

		if ( $wp_query->have_posts() ) {
			add_filter( 'excerpt_length', [ $this, 'excerpt_length' ], PHP_INT_MAX );

			add_filter( 'excerpt_more', [ $this, 'excerpt_more' ], PHP_INT_MAX );

			$module = Module::get_instance();

			$action_name = 'post_' . $this->get_id() . '_post';

			$action = $module->get_actions( $action_name );

			$this->render_wrapper_before();

			while ( $wp_query->have_posts() ) {
				$wp_query->the_post();

				$action->render_post( $this );
			}

			$this->render_wrapper_after();

			remove_filter( 'excerpt_length', [ $this, 'excerpt_length' ], PHP_INT_MAX );

			remove_filter( 'excerpt_more', [ $this, 'excerpt_more' ], PHP_INT_MAX );
		}

		wp_reset_postdata();
	}

	public function get_queried_posts() {
		$queried_posts = [];

		$wp_query = $this->parent->get_query_posts();

		$this->parent->query = $wp_query;

		if ( $wp_query->have_posts() ) {
			add_filter( 'excerpt_length', [ $this, 'excerpt_length' ], PHP_INT_MAX );

			add_filter( 'excerpt_more', [ $this, 'excerpt_more' ], PHP_INT_MAX );

			$module = Module::get_instance();

			$action_name = 'post_' . $this->get_id() . '_post';

			$action = $module->get_actions( $action_name );

			$queried_posts['max_num_pages'] = $wp_query->max_num_pages;

			while ( $wp_query->have_posts() ) {
				$wp_query->the_post();

				ob_start();

				$action->render_post( $this );

				$queried_posts['posts'][] = ob_get_clean();
			}

			remove_filter( 'excerpt_length', [ $this, 'excerpt_length' ], PHP_INT_MAX );

			remove_filter( 'excerpt_more', [ $this, 'excerpt_more' ], PHP_INT_MAX );
		}

		wp_reset_postdata();

		return $queried_posts;
	}

	protected function render_wrapper_before() {
		global $wp_query;

		$layout = $this->get_instance_value( 'layout' );

		$classes = [
			'raven-posts',
			'raven-' . $layout,
			Utils::get_responsive_class( 'raven-' . $layout . '%s-', $this->get_control_id( 'columns' ), $this->parent->get_settings() ),
		];

		$this->render_sortable();

		$archive_query = '';

		if ( is_archive() ) {
			$archive_query = json_encode( $wp_query->query_vars );
		}

		$polylang_lang = '';

		if ( function_exists( 'pll_the_languages' ) ) {
			$polylang_lang = pll_current_language();
		}
		?>
		<div class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>" data-post-id="<?php echo Utils::get_current_post_id(); ?>" data-archive-query="<?php echo htmlspecialchars( $archive_query ); ?>" data-lang="<?php echo esc_attr( $polylang_lang ); ?>">
		<?php
	}

	protected function render_wrapper_after() {
		?>
		</div>
		<?php

		$this->render_pagination();
	}

	/**
	 * @SuppressWarnings(PHPMD.CyclomaticComplexity)
	 * @SuppressWarnings(PHPMD.NPathComplexity)
	 */
	protected function render_sortable() {
		if ( ! $this->get_instance_value( 'show_sortable' ) || $this->parent->get_settings( 'query_select_ids' ) ) {
			return;
		}

		$post_type = $this->parent->get_settings( 'query_post_type' );

		$sortable_items = [];

		if ( $this->get_instance_value( 'show_all_title' ) ) {
			$sortable_items[-1] = sprintf(
				'<a class="%1$s" data-category="%3$s" href="#">%2$s</a>',
				'raven-sortable-item raven-sortable-active',
				__( 'All', 'jupiterx-core' ),
				'-1'
			);
		}

		$taxonomies = get_object_taxonomies( $post_type, 'names' );

		$category_control_id = '';

		$category_name = '';

		foreach ( $taxonomies as $taxonomy_name ) {
			// Only sort taxonomy that includes `cat` string.
			$validate = false !== strpos( $taxonomy_name, 'cat' );

			$validate_taxonomy = apply_filters( 'jupitex_raven_valid_sortable_taxonomy', $validate, $taxonomy_name, 'posts' );

			if ( $validate_taxonomy ) {
				$category_control_id = 'query_' . $taxonomy_name . '_ids';
				$category_name       = $taxonomy_name;
				break;
			}
		}

		if ( ! empty( $category_name ) ) {
			$query_args = [
				'taxonomy'     => $category_name,
				'hide_empty'   => true,
				'count'        => false,
				'pad_counts'   => false,
				'hierarchical' => false,
			];
			$posts = $this->parent->get_settings( 'query_post_includes' );
			// WP 4.7.0 feature to get post ids' terms.
			if ( ! empty( $posts ) ) {
				$query_args['object_ids'] = $posts;
			} else {
				$categories = $this->parent->get_settings( $category_control_id );
				// Assign categories to include.
				if ( ! empty( $categories ) ) {
					$query_args['hierarchical'] = true;
					$query_args['include']      = $categories;
				}
			}

			$terms_query = get_terms( $query_args );

			if ( ! is_wp_error( $terms_query ) ) {
				$sort_number = 0;

				foreach ( $terms_query as $term ) {
					$order_number = $sort_number;
					if( 'portfolio_category' === $category_name || 'category' === $category_name ) {

						if (
							class_exists( 'acf' ) &&
							! empty( get_field( 'jupiterx_taxonomy_order_number', 'category_'.$term->term_id ) )
						) {
							$order_number = get_field( 'jupiterx_taxonomy_order_number', 'category_'.$term->term_id );
						}

						if ( jupiterx_core()->check_default_settings() && ! empty( get_term_meta( $this->term->term_id, 'jupiterx_taxonomy_order_number', true ) ) ) {
							$order_number = get_term_meta( $this->term->term_id, 'jupiterx_taxonomy_order_number', true );
						}

						if ( array_key_exists( $order_number, $sortable_items ) ) {
							$order_number = $order_number + $sort_number;
						}
					}

					$sortable_items[ $order_number ] = sprintf(
						'<a class="%1$s" data-category="%3$s" href="#">%2$s</a>',
						'raven-sortable-item',
						$term->name,
						$term->term_id
					);

					++$sort_number;
				}

				ksort($sortable_items);
			}
		}

		?>
		<div class="raven-sortable">
			<div class="raven-sortable-items">
				<?php echo wp_kses_post( implode( '', $sortable_items ) ); ?>
			</div>
		</div>
		<?php
	}

	protected function render_pagination() {
		$is_pagination_enabled = $this->get_instance_value( 'show_pagination' );

		if ( ! $is_pagination_enabled ) {
			return;
		}

		$pagination_type = $this->get_instance_value( 'pagination_type' );

		switch ( $pagination_type ) {
			case 'load_more':
				$this->render_load_more();
				break;

			case 'page_based':
				$this->render_page_based();
				break;

			case 'infinite_load':
				$this->render_infinite_load();
				break;
		}
	}

	/**
	 * Render infinite load.
	 *
	 * @since 4.7.8
	 */
	protected function render_infinite_load() {
		echo '<span class="raven-infinite-load"></span>';
	}

	protected function render_load_more() {
		$query = $this->parent->query;

		// Hide load more button in front-end when we have no more posts.
		if ( $query->max_num_pages <= 1 && ! \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
			return;
		}

		$load_more_text = $this->get_instance_value( 'load_more_text' );

		$settings = [
			'maxNumPages' => $query->max_num_pages,
		];

		?>
		<div class="raven-load-more" data-settings="<?php echo esc_attr( wp_json_encode( $settings ) ); ?>">
			<a class="raven-load-more-button" href="#"><span class="raven-post-button-text"><?php \Elementor\Utils::print_unescaped_internal_string( $load_more_text ); ?></span></a>
		</div>
		<?php
	}

	protected function render_page_based() {
		$query = $this->parent->query;

		if ( $query->max_num_pages <= 1 ) {
			return;
		}

		$settings = [
			'posts_per_page' => $this->parent->get_settings( 'query_posts_per_page' ),
			'total_pages' => $query->max_num_pages,
			'pages_visible' => $this->get_instance_value( 'page_based_pages_visible' ),
		];

		$is_archive_template = $this->parent->get_settings( 'is_archive_template' );

		if ( $is_archive_template ) {
			$settings['posts_per_page'] = $query->query_vars['posts_per_page'];
		}

		$page_length = ( $settings['total_pages'] < $settings['pages_visible'] ) ? $settings['total_pages'] : $settings['pages_visible'];

		$render_pages = '';

		for ( $i = 1; $i <= $page_length; $i++ ) {
			$render_pages .= sprintf(
				'<a class="%1$s" href="#" data-page-num="%2$s">%2$s</a>',
				'raven-pagination-num raven-pagination-item' . ( ( 1 === $i ) ? ' raven-pagination-active' : '' ),
				$i
			);
		}

		$prev_button = sprintf(
			'<a class="%1$s" href="#">%2$s</a>',
			'raven-pagination-prev raven-pagination-item raven-pagination-disabled',
			$this->get_instance_value( 'page_based_prev_text' )
		);

		$next_button = sprintf(
			'<a class="%1$s" href="#">%2$s</a>',
			'raven-pagination-next raven-pagination-item',
			$this->get_instance_value( 'page_based_next_text' )
		);

		?>
		<div class="raven-pagination" data-settings="<?php echo esc_attr( wp_json_encode( $settings ) ); ?>">
			<div class="raven-pagination-items">
				<?php echo $prev_button . $render_pages . $next_button; ?>
			</div>
		</div>
		<?php
	}
}
