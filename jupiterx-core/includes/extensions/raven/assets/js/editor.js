(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = require("@wordpress/i18n");

/* eslint no-undef: 0 */
var JupiterxConditionManager = function JupiterxConditionManager() {
  var $ = jQuery;
  var checker = false;
  var modal = '';
  var helper = {};
  helper.defaultList = $('#jupiterx-editor-conditions-response-list-default-items').html();
  helper.theme = 'light';

  function loadSectionTemplates() {
    wp.ajax.post({
      action: 'jupiterx_layout_builder',
      sub_action: 'get_posts',
      type: elementor.config.jx_layout,
      page: 1,
      nonce: elementor.config.jx_nonce
    }).done(function (response) {
      helper.posts = response;
    });
  }

  function addButton() {
    // Jupiterx condition button.
    var btn = $('#jupiterx-editor-condition-show-conditions-button').html();

    if ('active' === elementor.config.jx_editor_top_bar || 'default' === elementor.config.jx_editor_top_bar) {
      var editorHeader = $('.MuiBox-root'),
          trigger = editorHeader.find('button[aria-label="Save Options"]');
      trigger.parent().prev().addClass('layout_builder_publish_button');
      var btnClass = 'jx-editor-modal-trigger-top jx-editor-modal-trigger-top-light';

      if ('dark' === elementor.config.settings.editorPreferences.settings.ui_theme) {
        btnClass = 'jx-editor-modal-trigger-top jx-editor-modal-trigger-top-dark';
      }

      trigger.on('click', function () {
        setTimeout(function () {
          var span = $('.MuiMenu-list[role="menu"]').find('span').filter(function () {
            return $(this).text() === 'Display Conditions';
          });

          if (0 < span.length) {
            span.parent().parent().remove();
          }

          var divider = $('.MuiMenu-list[role="menu"]').find('hr').first().clone();
          $('.MuiMenu-list[role="menu"]').children().first().after(btn);
          $('.MuiMenu-list[role="menu"]').find('#jupiterx-editor-conditions-trigger').attr('class', btnClass);
          $('#jupiterx-editor-conditions-trigger').on('click', openModal);
          $('.MuiMenu-list[role="menu"]').children().first().after(divider);
        }, 300);
      });
    }

    if ('inactive' === elementor.config.jx_editor_top_bar) {
      // Place button in menu.
      $(btn).insertBefore('#elementor-panel-footer-sub-menu-item-save-template');
      $('#jupiterx-editor-conditions-trigger').on('click', openModal);
    }
  }

  function openModal() {
    // Create modal if isn't created already.
    if (false === checker) {
      modal = createModal();
      loadSectionTemplates();
    }

    modal.show();
    document.querySelector('.jupiterx-conditions-modal').setAttribute('id', 'jupiterx-conditions-modal');
    $('.dialog-jx_save_conditions').addClass('elementor-button elementor-button-success');
    checkDarkMode();
    checkToAddClearForth();
  }

  function checkDarkMode() {
    helper.theme = 'light';

    if ($('#elementor-editor-wrapper').hasClass('raven-icon-theme-dark')) {
      helper.theme = 'dark';
    }

    var checkClass = $('.jupiterx-editor-condition-single-row-wrapper').hasClass('jupiterx-editor-condition-single-row-wrapper-dark');

    if ('dark' === helper.theme) {
      if (checkClass) {
        return;
      }

      $('.jupiterx-editor-condition-single-row-wrapper').addClass('jupiterx-editor-condition-single-row-wrapper-dark');
      $('.jupiterx-conditions-modal').addClass('jupiterx-conditions-modal-dark');
    } else {
      $('.jupiterx-editor-condition-single-row-wrapper').removeClass('jupiterx-editor-condition-single-row-wrapper-dark');
      $('.jupiterx-conditions-modal').removeClass('jupiterx-conditions-modal-dark');
    }
  }

  function checkToAddClearForth() {
    $('.jx-fourth-condition').each(function () {
      var value = $(this).val();

      if ('all' === value) {
        return;
      }

      $(this).parent().find('.eicon-editor-close').css('display', 'inline-block');
    });
  }

  function createModal() {
    checker = true;
    modal = elementorCommon.dialogsManager.createWidget('lightbox', {
      className: 'jupiterx-conditions-modal elementor-templates-modal',
      headerMessage: $('#jupiterx-conditions-modal-header').html(),
      message: $('#jupiterx-condition-modal-description').html(),
      closeButton: true,
      draggable: false,
      hide: {
        onOutsideClick: false,
        onEscKeyPress: false
      }
    });
    modal.addButton({
      name: 'jx_save_conditions',
      text: (0, _i18n.__)('Save & close', 'jupiterx-core'),
      callback: function callback() {
        var conditions = createConditionArray();
        callAjaxToSave(conditions);
        $e.run('document/save/update');
      }
    });
    return modal;
  }

  function createConditionArray() {
    var rows = document.querySelectorAll('.jupiterx-editor-condition-single-row-wrapper');
    var conditions = [];
    rows.forEach(function (item) {
      var itemObj = $(item);
      var condition = {};
      condition.conditionA = itemObj.find('.jx-first-condition').val();
      condition.conditionB = itemObj.find('.jx-second-condition').val();
      condition.conditionC = '';

      if (true !== itemObj.find('.jupiterx-editor-conditions-third-condition-wrapper').hasClass('jx-condition-hide')) {
        condition.conditionC = itemObj.find('.jx-third-condition').val();
      }

      condition.conditionD = ''; // Fourth item is array always, and it includes value & label.

      if (true !== itemObj.find('.jupiterx-editor-conditions-fourth-condition-wrapper').hasClass('jx-condition-hide')) {
        condition.conditionD = [itemObj.find('.jx-fourth-condition').val(), itemObj.find('.jx-fourth-condition option:selected').text()];
      }

      conditions.push(condition);
    });
    return conditions;
  }

  function callAjaxToSave(conditionsArray) {
    wp.ajax.post({
      action: 'jupiterx_editor_save_conditions',
      conditions: conditionsArray,
      post: elementor.ajax.requestConstants.initial_document_id,
      nonce: elementor.ajax.requestConstants._nonce
    });
  }

  function addRow() {
    $(document).on('click', '#jupiterx-editor-condition-add-new-btn', function () {
      var row = $('#jupiterx-conditions-editor-row').html();
      var classes = 'jupiterx-editor-condition-single-row-wrapper';

      if ('dark' === helper.theme) {
        classes = classes + ' jupiterx-editor-condition-single-row-wrapper-dark';
        row = row.replace('jupiterx-editor-condition-single-row-wrapper', classes);
      }

      $('#jupiterx-editor-conditions-list').append(row);
    });
  }

  function removeRow() {
    $(document).on('click', '.jupiterx-editor-conditions-remove-row', function () {
      $(this).parent().remove();
    });
  }

  function closeModal() {
    $(document).on('click', '#jupiterx-conditions-close-modal', function () {
      $('.jupiterx-conditions-modal').css('display', 'none');
    });
  }

  function onFirstConditionChange() {
    $(document).on('change', '.jx-first-condition', function () {
      var value = $(this).val();
      $(this).attr('data-selected', value);

      if ('include' === value) {
        $(this).parent().find('.left-icon').removeClass('eicon-minus-square').addClass('eicon-plus-square');
      } else {
        $(this).parent().find('.left-icon').removeClass('eicon-plus-square').addClass('eicon-minus-square');
      }
    });
  }

  function onSecondConditionChange() {
    $(document).on('change', '.jx-second-condition', function () {
      var parent = $(this).parent().parent().parent();
      var $value = $(this).val();
      var $options = $('#jupiterx-editor-conditions-' + $value).html();
      decideToShowThirdCondition(parent, $value, $options);
      triggerConflict(parent);
    });
  }

  function decideToShowThirdCondition(parent, $value, $options) {
    if ('entire' === $value || 'maintenance' === $value || _.isEmpty($value)) {
      parent.find('.jupiterx-editor-conditions-third-condition-wrapper').addClass('jx-condition-hide');
      parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper').addClass('jx-condition-hide');
      return;
    }

    parent.find('.jupiterx-editor-conditions-third-condition-wrapper').removeClass('jx-condition-hide');
    parent.find('.jx-third-condition').empty().html($options).trigger('change');
  }

  function onThirdConditionChange() {
    $(document).on('change', '.jx-third-condition', function () {
      var parent = $(this).parent().parent().parent();
      var $value = $(this).val();
      decideToShowFourthCondition(parent, $value);
      triggerConflict(parent);
    });
  }

  function decideToShowFourthCondition(parent, $value) {
    var exclude = ['all', 'front_page', 'error_404', 'date', 'search', 'woo_search', 'all_product_archive', 'shop_archive', 'shop_manager'];

    if (exclude.includes($value) || !$value.includes('_')) {
      parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper').addClass('jx-condition-hide');
      return;
    }

    var $html = '<option value="all">' + (0, _i18n.__)('All', 'jupiterx-core') + '</option>';
    parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper').removeClass('jx-condition-hide');
    parent.find('.jx-fourth-condition').empty().html($html);
    parent.find('.item-4th-special-select2').text((0, _i18n.__)('All', 'jupiterx-core'));
  }

  function openSearchForm() {
    // Start process onkeyup.
    $(document).on('mouseup', '.jupiterx-conditions-modal .dialog-lightbox-message', function (e) {
      var container = $('.jx-condition-search');
      var trigger1 = $('.item-4th-special-select2');
      var trigger2 = $('.jx-editor-condition-fourth-dropdown-icon');
      var cancel = ['LI', 'UL'];

      if (cancel.includes(e.target.nodeName)) {
        return;
      } // Set default list on each time click


      $('.jx-editor-conditions-4th-search-box').val('');
      container.find('ul').html(helper.defaultList); // Toggle dropdown using its triggers.

      if (trigger1.is(e.target) || trigger2.is(e.target)) {
        $(e.target).parent().find('.jx-condition-search').toggle();
        return;
      } // Close dropdown if clicked outside of it.


      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
      }
    });
  }

  function onSearchForFourth() {
    $(document).on('keyup', '.jx-editor-conditions-4th-search-box', function () {
      helper.parent = $(this).parent().parent().parent().parent();
      helper.value = $(this).val();
      helper.type = helper.parent.find('.jupiterx-editor-conditions-second-condition-wrapper select').val();
      helper.sub = helper.parent.find('.jupiterx-editor-conditions-third-condition-wrapper select').val(); // If empty value set default list.

      if (_.isEmpty(helper.value)) {
        $(this).next().html(helper.defaultList);
        return;
      } // Remove default and show searching... text.


      $(this).next().find('.jx-ec-hidden-item').removeClass('jx-ec-hidden-item');
      $(this).next().find('.jx-ec-default-visible').addClass('jx-ec-hidden-item'); // Call ajax to get data.

      callAjaxToFind();
    });
  }

  function callAjaxToFind() {
    wp.ajax.post({
      action: 'jupiterx_conditional_manager',
      sub_action: 'retrieve_select_options',
      value: helper.value,
      type: helper.type,
      sub: helper.sub,
      nonce: elementor.config.jx_nonce
    }).done(function (response) {
      if (response.length < 1) {
        return;
      } // Manage data if there is any.


      displaySearchResult(response);
    });
  }

  function displaySearchResult(response) {
    var list = helper.parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper ul'); // Empty list at first.

    list.empty(); // Attach data to list.

    response.forEach(function (item) {
      if (!item.value) {
        return;
      }

      var listItem = '<li class="jx-ec-item" data-id="' + item.value + '">' + item.label + '</li>';
      list.append(listItem);
    }); // Manage on list clic.

    manageItemSelection();
  }

  function manageItemSelection() {
    $(document).on('click', '.jx-ec-item', function () {
      var value = $(this).attr('data-id');
      var text = $(this).text();
      var option = '<option value="' + value + '">' + text + '</option>';
      var select = helper.parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper select');
      var container = $('.jx-condition-search');
      $(this).parent().find('.jx-ec-item').removeClass('jx-ec-active');
      $(this).addClass('jx-ec-active'); // Set hidden select value.

      select.empty();
      select.append(option);
      select.val(value);
      triggerConflict(helper.parent); // Set simulated select text.

      helper.parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper .item-4th-special-select2').text(text); // Close list.

      container.hide(); // Display clear icon if 'all' isn't value.

      if ('all' === value) {
        return;
      }

      helper.parent.find('.jupiterx-editor-conditions-fourth-condition-wrapper .jx-editor-condition-clear-forth').css('display', 'inline-block');
    });
  }

  function onForthClear() {
    $(document).on('click', '.jx-editor-condition-clear-forth', function () {
      var $html = '<option value="all">' + (0, _i18n.__)('All', 'jupiterx-core') + '</option>';
      $(this).parent().find('select').empty().html($html).val('all');
      $(this).parent().find('.item-4th-special-select2').text((0, _i18n.__)('All', 'jupiterx-core'));
      $(this).css('display', 'none');
    });
  }

  function openModalOnSave() {
    $(document).on('click', '#elementor-panel-saver-button-publish', function () {
      if (false === elementor.config.jx_conditions) {
        $('#jupiterx-editor-conditions-trigger').trigger('click');
        elementor.config.jx_conditions = true;
      }
    });

    if ('active' === elementor.config.jx_editor_top_bar || 'default' === elementor.config.jx_editor_top_bar) {
      var editorHeader = $('.MuiBox-root'),
          trigger = editorHeader.find('.MuiButtonGroup-root').last().find('button').first();
      trigger.on('click', function () {
        if (false === elementor.config.jx_conditions) {
          $('#jupiterx-editor-conditions-trigger').trigger('click');
          elementor.config.jx_conditions = true;
          openModal();
        }
      });
    }
  } // Adding conflict check after adding& changing each select.


  function triggerConflict(parent) {
    var toCheck = {
      conditionA: parent.find('.jx-first-condition').val(),
      conditionB: parent.find('.jx-second-condition').val()
    };
    var conditionC = parent.find('.jx-third-condition').val();
    toCheck.conditionC = conditionC;

    if (_.isEmpty(conditionC)) {
      toCheck.conditionC = '';
    }

    var conditionD = [parent.find('.jx-fourth-condition').val(), parent.find('.jx-fourth-condition option:selected').text()];
    toCheck.conditionD = conditionD; // to sync with control panel rules if it's empty we set all as default.

    if (_.isEmpty(conditionD[0])) {
      toCheck.conditionD = ['all', 'All'];
    }

    if ('entire' === toCheck.conditionB || 'maintenance' === toCheck.conditionB) {
      toCheck.conditionD = '';
    }

    var posts = helper.posts.posts;
    var conflict = false;

    if (1 > posts.length) {
      return;
    }

    posts.forEach(function (object) {
      var id = object.ID;
      var currentPost = elementor.config.initial_document.id;

      if (id === currentPost) {
        return;
      }

      var conditions = object.conditions;

      if (!Array.isArray(conditions)) {
        return;
      }

      conditions.forEach(function (condition) {
        if (_.isEqual(toCheck, condition)) {
          var text = (0, _i18n.__)('JupiterX recognized that you have set this condition for other templates', 'jupiterx-core') + ' : ' + object.post_title;
          parent.find('.jx-editor-row-show-conflict-error').css('display', 'block').text(text);
          parent.find('.jupiterx-editor-single-row-inner-wrapper').addClass('jupiterx-row-has-error');
          conflict = true;
        }
      });
    });

    if (true === conflict) {
      return;
    }

    parent.find('.jx-editor-row-show-conflict-error').css('display', 'none');
    parent.find('.jupiterx-editor-single-row-inner-wrapper').removeClass('jupiterx-row-has-error');
  }

  function initializeFunctions() {
    checkDarkMode();
    addButton();
    addRow();
    removeRow();
    closeModal();
    onFirstConditionChange();
    onSecondConditionChange();
    openSearchForm();
    onThirdConditionChange();
    onSearchForFourth();
    onForthClear();
    openModalOnSave();
    disableElementorProPopup();
  }

  function disableElementorProPopup() {
    $('#elementor-panel-footer-saver-publish, .layout_builder_publish_button').on('click', function () {
      var checkerEpro = setTimeout(function () {
        if ($('#elementor-publish__modal').length > 0) {
          $('#elementor-publish__modal').find('.dialog-lightbox-publish').trigger('click');
          clearTimeout(checkerEpro);
        }
      }, 50);
    });
  }

  function displayTemplatesPopup() {
    if ('1' === elementor.config.jx_editor_first_load) {
      return;
    }

    var loaded = setInterval(function () {
      if (elementor.hasOwnProperty('elements')) {
        clearInterval(loaded); // If there is any element (old posts), we don't need to display templates popup.

        if (elementor.elements.length > 0) {
          return;
        } // Show the popup after 1 second that iframe is loaded.


        var iframe = setInterval(function () {
          if ($('#elementor-preview-iframe').length > 0) {
            clearInterval(iframe);
            setTimeout(function () {
              $e.run('library/open');
            }, 1000);
            elementor.config.jx_editor_first_load = '1';
          }
        }, 300);
      }
    }, 50);
  }

  function removeElementorBtn() {
    // Remove elementor pro condition btn if exists.
    $('#elementor-panel-footer-sub-menu-item-conditions').remove();
  }

  function onPreviewLoaded() {
    removeElementorBtn(); // Display templates popup on first load.

    displayTemplatesPopup();
  }

  function init() {
    // Just run this if it's layout builder.
    if ('none' === elementor.config.jx_layout) {
      return;
    }

    var urlParams = new URLSearchParams(window.location.search);
    var isLayoutBuilder = urlParams.get('layout-builder');

    if (null === isLayoutBuilder) {
      return;
    }

    $('body').addClass('layout-builder-environment');
    elementor.on('panel:init', initializeFunctions);
    elementor.on('document:loaded', onPreviewLoaded);
  }

  return {
    init: init
  };
};

var _default = JupiterxConditionManager();

exports["default"] = _default;

},{"@wordpress/i18n":96}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var CustomCSSWIDGET = function CustomCSSWIDGET() {
  function addCustomCss(css, context) {
    if (!context) {
      return;
    }

    var model = context.model,
        customCSS = model.get('settings').get('raven_custom_css_widget');
    var selector = '.elementor-element.elementor-element-' + model.get('id');

    if ('document' === model.get('elType')) {
      selector = elementor.config.document.settings.cssWrapperSelector;
    }

    if (customCSS) {
      css += customCSS.replace(/selector/g, selector);
    }

    return css;
  }

  function onNavigatorInit() {
    elementor.navigator.indicators.customCSS = {
      icon: 'code-bold',
      settingKeys: ['raven_custom_css_widget'],
      title: 'Custom CSS',
      section: 'section_custom_css'
    };
  }

  function init() {
    elementor.hooks.addFilter('editor/style/styleText', addCustomCss);
    elementor.on('navigator:init', onNavigatorInit);
  }

  return {
    init: init
  };
};

var _default = CustomCSSWIDGET();

exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var CustomCSS = function CustomCSS() {
  function customCSS() {
    var pageCSS = elementor.settings.page.model.get('raven_custom_css');

    if (pageCSS) {
      pageCSS = pageCSS.replace(/selector/g, '.elementor-page-' + elementor.config.document.id);
      elementor.settings.page.getControlsCSS().elements.$stylesheetElement.append(pageCSS);
    }
  }

  function init() {
    elementor.on('preview:loaded', customCSS);
    elementor.settings.page.model.on('change', customCSS);
  }

  return {
    init: init
  };
};

var _default = CustomCSS();

exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint no-undef: 0 */
var PreviewSettings = function PreviewSettings() {
  var $ = jQuery;

  function previewSettings() {
    var result = $e.run('document/save/update');
    result.done(function () {
      elementor.dynamicTags.cleanCache();
      elementor.reloadPreview();
    });
  }

  function assignExtraClass() {
    if ('none' !== elementor.config.jx_layout) {
      $('#elementor-panel').addClass('jupiterx-template-type-' + elementor.config.jx_layout);
    }

    if ('product' === elementor.config.jx_post_type) {
      $('#elementor-panel').addClass('jupiterx-editor-post-type-' + elementor.config.jx_post_type);
    }
  }

  function removeThemeBuilderEditor() {
    /** Remove Elementor theme builder in editor. */
    $(document).on('click', '#elementor-panel-header-menu-button', function () {
      $('.elementor-panel-menu-item-site-editor').remove();
    });
  }

  function previewLoaded() {
    assignExtraClass();

    if ('pro' === elementor.config.jx_elementor) {
      return;
    }

    removeThemeBuilderEditor();
  }

  function init() {
    elementor.channels.editor.on('jupiterXApplyPreview', previewSettings);
    elementor.on('preview:loaded', previewLoaded);
  }

  return {
    init: init
  };
};

var _default = PreviewSettings();

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = require("@wordpress/i18n");

var $ = jQuery;

var sellkitPreview = function sellkitPreview() {
  function lock() {
    $('.raven-sellkit-widgets-preview').parent().parent().attr('draggable', false).css('cursor', 'pointer').addClass('raven-sellkit-preview-widget-parent');
  }

  function onTouch() {
    $(document).on('click', '.raven-sellkit-widgets-preview, #elementor-panel-header-menu-button, #elementor-panel-header-add-button', function () {
      lock();
    });
    elementor.elements.on('remove', function () {
      lock();
    });
    $(document).on('click', function (event) {
      if ($('#jupiterx-sellkit-widgets-preview-dialog').length === 0) {
        return;
      }

      if ($(event.target).closest('#jupiterx-sellkit-widgets-preview-dialog').length === 0) {
        $('#jupiterx-sellkit-widgets-preview-dialog').css('display', 'none');
      }
    });
    $('#elementor-preview-iframe').contents().on('click', function (event) {
      if ($('#jupiterx-sellkit-widgets-preview-dialog').length === 0) {
        return;
      }

      if ($(event.target).closest('#jupiterx-sellkit-widgets-preview-dialog').length === 0) {
        $('#jupiterx-sellkit-widgets-preview-dialog').css('display', 'none');
      }
    });
    $(document).on('click mousedown', '.raven-sellkit-preview-widget-parent, #elementor-panel-category-sellkit .elementor-element', function (event) {
      var _window,
          _this = this;

      var widgetName = $(event.target).parent().parent().find('.title').text();

      if (_.isEmpty((_window = window) === null || _window === void 0 ? void 0 : _window.hasSellkitPro.active) && widgetName !== 'Product Filter' && widgetName !== 'Personalised Coupons') {
        return;
      }

      $(this).off('click').off('dragend').off('dragstart');
      event.preventDefault();
      event.stopPropagation();
      setTimeout(function () {
        var Top = $(_this).offset().top;
        var Left = $(_this).offset().left + 25;
        var widget = $(_this).find('.title').text();
        var header = createHeader(widget);
        var body = createBody();
        var footer = createCtaButton();
        var theme = '';

        if ($('#elementor-editor-wrapper').hasClass('raven-icon-theme-light') || $('#elementor-editor-wrapper').hasClass('raven-icon-theme-auto')) {
          theme = 'jupiterx-sellkit-widgets-preview-dialog-white';
        } else {
          theme = 'jupiterx-sellkit-widgets-preview-dialog-dark';
        }

        $('#jupiterx-sellkit-widgets-preview-dialog').empty().append(header + body + footer).css({
          display: 'block',
          top: Top,
          left: Left + 135 + 'px'
        }).attr('class', theme);
      }, 100);
    });
    $(document).on('click', '.sellkit-preview-close-dialog', function () {
      $('#jupiterx-sellkit-widgets-preview-dialog').css('display', 'none');
    });
    goInstallSellkit();
  }

  function createHeader(title) {
    var closeIcon = '<i class="eicon-close sellkit-preview-close-dialog"></i>';
    return '<div class="sellkit-widget-preview-header"><span>' + title + closeIcon + '</span></div>';
  }

  function createBody() {
    var bodyMessage = (0, _i18n.__)('This widget requires <b>Sellkit Pro</b> to be installed and activated.', 'jupiterx-core');
    return '<div class="sellkit-widget-preview-body">' + bodyMessage + '</div>';
  }

  function createCtaButton() {
    var button = '<button id="jupiterx-sellkit-widget-preview-install">' + (0, _i18n.__)('INSTALL SELLKIT PRO', 'jupiterx-core') + '</button>';
    return '<div class="sellkit-widget-preview-footer">' + button + '</div>';
  }

  function dialog() {
    $(document.body).append('<div id="jupiterx-sellkit-widgets-preview-dialog"></div>');
  }

  function goInstallSellkit() {
    $(document).on('click', '#jupiterx-sellkit-widget-preview-install', function () {
      window.open('https://getsellkit.com/pricing/', '_blank');
    });
  }

  function forceUndraggAble() {
    var onceRun = setInterval(function () {
      if ($('.raven-sellkit-widgets-preview').length > 0) {
        lock();
        onTouch();
        dialog();
        clearInterval(onceRun);
      }
    }, 500);
  }

  function init() {
    if (elementor.config.jx_version >= '2.0.0') {
      elementor.on('panel:init', forceUndraggAble);
    }
  }

  return {
    init: init
  };
};

var _default = sellkitPreview();

exports["default"] = _default;

},{"@wordpress/i18n":96}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = require("@wordpress/i18n");

var Templates = function Templates() {
  // Find Elementor library remote template and prepend Jupiter X badge.
  function prependBadge() {
    var templateRemote = jQuery('#tmpl-elementor-template-library-template-remote'),
        badgeHTML = "<# var ravenId = 'raven_' #>\n        <# if ( String( template_id ).substr( 0, ravenId.length ) === ravenId && typeof templatePro !== 'undefined' && templatePro ) { #>\n          <span class=\"raven-template-library-badge raven-template-library-jx-badge\">\n          </span>\n        <# } else if ( String( template_id ).substr( 0, ravenId.length ) === ravenId && typeof templatePro !== 'undefined' && ! templatePro ) { #>\n          <span class=\"raven-template-library-badge raven-template-pro\">\n            <# if ( typeof jupiterxPremium !== 'undefined' ) { #>\n              Activate to Unlock\n            <# } else { #>\n              Upgrade to Unlock\n            <# } #>\n          </span>\n        <# } #>\n\t  ";
    var template = templateRemote.text();
    template = badgeHTML + template;
    templateRemote.text(template);
  } // Run final init when xhr/ajax action request is by getting the templates library data.


  function onRequestInit() {
    jQuery(document).ajaxComplete(function (event, request, settings) {
      if (typeof settings.data !== 'undefined' && settings.data.indexOf('get_library_data') !== -1 && settings.data.indexOf('action=elementor_ajax') !== -1) {
        setTimeout(actuallyInit, 100);
      }
    });
  }

  function actuallyInit() {
    var layout = elementor.templates.layout;

    if (typeof layout === 'undefined') {
      return;
    }

    var content = layout.modalContent; // Add Jupiter X filter button.

    function addFilter() {
      var filter = content.$el.find('#elementor-template-library-filter-toolbar-remote');

      if (!filter.length || filter.find('.raven-template-library-filter').length) {
        return;
      }

      filter.append("\n        <div class=\"raven-template-library-filter\">\n          <label class=\"raven-template-library-filter-button\">Jupiter X</label>\n        </div>\n      ");
      var button = filter.find('.raven-template-library-filter-button'),
          input = content.$el.find('#elementor-template-library-filter-text'),
          query = 'Jupiter X';
      var isFiltered = false;
      button.on('click', function () {
        isFiltered = !isFiltered;
        button.toggleClass('raven-template-library-filter-active', isFiltered);
        input.trigger('input');
      });
      input.on('input', function (event) {
        if (isFiltered) {
          event.stopPropagation();
          elementor.templates.setFilter('text', "".concat(query, " - ").concat(input.val()));
        }
      });
    } // Initially apply class on initial page display.


    addFilter();
    /**
     * Listen to whenever a library menu item is clicked.
     * Such as Blocks, Pages or My Templates.
     */

    content.listenTo(content, 'show', function () {
      // Whenever modal content is changing.
      addFilter();
    });
  }

  function goProButton() {
    elementor.hooks.addFilter('elementor/editor/template-library/template/action-button', function (viewId, data) {
      var ravenId = 'raven_';

      if (String(data.template_id).substr(0, ravenId.length) === ravenId && !data.templatePro) {
        return '#tmpl-elementor-template-library-get-raven-pro-button';
      }

      return viewId;
    }, 100);
  }

  function init() {
    // Removing default tabs.
    elementor.on('preview:loaded', function () {
      // eslint-disable-next-line no-undef
      if (!elementor.config.library_connect.is_connected && !elementorAppConfig.hasPro) {
        elementor.config.library_connect.is_connected = true;
      } // eslint-disable-next-line no-undef


      $e.components.get('library').defaultRoute = 'library/library/templatesJX'; // eslint-disable-next-line no-undef

      if (!elementorAppConfig.hasPro) {
        if ($e.components.get('library').hasTab('templates/pages')) {
          // eslint-disable-line no-undef
          $e.components.get('library').removeTab('templates/pages'); // eslint-disable-line no-undef
        }

        if ($e.components.get('library').hasTab('templates/blocks')) {
          // eslint-disable-line no-undef
          $e.components.get('library').removeTab('templates/blocks'); // eslint-disable-line no-undef
        }

        if ($e.components.get('library').hasTab('templates/landing-pages')) {
          // eslint-disable-line no-undef
          $e.components.get('library').removeTab('templates/landing-pages'); // eslint-disable-line no-undef
        }
      }
    });
    elementor.on('preview:loaded', function () {
      var title = (0, _i18n.__)('Blocks', 'jupiterx-core');
      var order = 10; //eslint-disable-next-line no-undef

      if (elementorAppConfig.hasPro) {
        title = 'Jupiter X';
        order = 0;
      } // eslint-disable-next-line no-undef


      if ($e.components.get('library').hasTab('library/templatesJX')) {
        return;
      } // eslint-disable-next-line no-undef


      $e.components.get('library').addTab('library/templatesJX', {
        title: title,
        filter: {
          source: function source() {
            elementor.channels.templates.reply('filter:source', 'remote');
            return 'raven';
          },
          type: 'block'
        }
      }, order);
    });
    prependBadge();
    goProButton();
    onRequestInit();
  }

  return {
    init: init
  };
};

var _default = Templates();

exports["default"] = _default;

},{"@wordpress/i18n":96}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var WooCommerceSettingsModule = elementorModules.editor.utils.Module.extend({
  onInit: function onInit() {
    var _this = this;

    elementor.channels.editor.on('kit_settings:section_woocommerce_notices:activated', function (e) {
      _this.onSelect2DropdownChange(e);
    });
    elementor.channels.editor.on('kit_settings:woocommerce_error_notices:activated', function () {
      _this.onOpenErrorNotice();
    });
    elementor.channels.editor.on('kit_settings:woocommerce_message_notices:activated', function () {
      _this.onOpenMessageNotice();
    });
    elementor.channels.editor.on('kit_settings:woocommerce_info_notices:activated', function () {
      _this.onOpenInfoNotice();
    });
    elementor.channels.editor.on('jupiterXGoToWooCommerceSettings', function () {
      // eslint-disable-next-line no-undef
      $e.run('editor/documents/switch', {
        id: elementor.config.kit_id,
        mode: 'autosave'
      }).then(function () {
        // eslint-disable-next-line no-undef
        $e.route('panel/global/raven-settings-woocommerce');
        elementor.$previewContents.find('.elementor-editor-preview .jupiterx-demo-woocommerce-notices').remove();
      });
    }); // eslint-disable-next-line no-undef

    $e.routes.on('run:before', function (event, panelName) {
      if ('panel/global/menu' === panelName) {
        elementor.$previewContents.find('.elementor-editor-preview .jupiterx-demo-woocommerce-notices').remove();
      }
    });
  },
  onSelect2DropdownChange: function onSelect2DropdownChange(e) {
    var selected = [];
    var $ = jQuery,
        wrapper = e.el,
        select2 = $(wrapper).find('.elementor-select2'),
        defaultValue = select2.val(),
        self = this;
    this.onChangeAndDefault(defaultValue);
    select2.on('change', function () {
      selected = $(this).val();
      self.onChangeAndDefault(selected);
    });
  },
  onChangeAndDefault: function onChangeAndDefault(selected) {
    // Remove it after it is added, in case user removed it from values.
    var options = ['wc_error', 'wc_message', 'wc_info'];

    for (var type in options) {
      if (!selected.includes(options[type])) {
        var prefix = options[type].replace('wc_', '');
        elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-".concat(prefix)).remove();
      }
    }

    for (var i in selected) {
      if ('wc_error' === selected[i]) {
        if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-error").length < 1) {
          this.getNoticeHtmlByAjax('error', 'error');
        }
      }

      if ('wc_message' === selected[i]) {
        if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-message").length < 1) {
          this.getNoticeHtmlByAjax('message', 'success');
        }
      }

      if ('wc_info' === selected[i]) {
        if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-info").length < 1) {
          this.getNoticeHtmlByAjax('info', 'notice');
        }
      }
    }
  },
  onOpenErrorNotice: function onOpenErrorNotice() {
    if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-error").length < 1) {
      this.getNoticeHtmlByAjax('error', 'error');
    }
  },
  onOpenMessageNotice: function onOpenMessageNotice() {
    if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-message").length < 1) {
      this.getNoticeHtmlByAjax('message', 'success');
    }
  },
  onOpenInfoNotice: function onOpenInfoNotice() {
    if (elementor.$previewContents.find(".elementor-editor-preview .jupiterx-woocommerce-notice-settings-wrapper-info").length < 1) {
      this.getNoticeHtmlByAjax('info', 'notice');
    }
  },
  getNoticeHtmlByAjax: function getNoticeHtmlByAjax(noticeType, real) {
    wp.ajax.post({
      action: 'jupiterx_woocommerce_settings_notice_html',
      nonce: elementor.config.jx_nonce,
      type: noticeType,
      real_type: real
    }).done(function (data) {
      elementor.$previewContents.find('.elementor-editor-preview').prepend(data);
    }).fail(function (data) {
      // eslint-disable-next-line
      console.error(data);
    });
  }
});
var WooCommerceSettings = new WooCommerceSettingsModule();
var _default = WooCommerceSettings;
exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Checkbox = elementor.modules.controls.BaseData.extend({
  ui: function ui() {
    var ui = elementor.modules.controls.BaseData.prototype.ui.apply(this, arguments);
    ui.controlCheckbox = '.raven-control-checkbox';
    ui.mainInput = 'input[type=hidden]';
    return ui;
  },
  onReady: function onReady() {
    var self = this,
        initialValue = self.ui.mainInput.val() || '';
    var arr = initialValue.split(',');

    if (arr.length) {
      self.ui.controlCheckbox.each(function () {
        if (this.checked) {
          arr.push(this.value);
        }
      });
      arr = arr.filter(function (item, pos) {
        return arr.indexOf(item) === pos;
      });
      self.ui.mainInput.val(arr.join(','));
    }

    self.ui.controlCheckbox.on('click', function () {
      var oldVal = self.ui.mainInput.val() || '';
      var oldArr = oldVal.split(',');

      if (oldArr.length) {
        if (this.checked) {
          oldArr.push(this.value);
        } else {
          var index = oldArr.indexOf(this.value);
          oldArr.splice(index, 1);
        }

        self.ui.mainInput.val(oldArr.join(','));
        self.ui.mainInput.trigger('input');
      }
    });
  }
});
var _default = Checkbox;
exports["default"] = _default;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var FileUploader = elementor.modules.controls.BaseMultiple.extend({
  ui: function ui() {
    var ui = elementor.modules.controls.BaseMultiple.prototype.ui.apply(this, arguments);
    ui.fileUploader = 'raven-control-file-uploader';
    ui.fileUploaderInput = '.raven-control-file-uploader-input';
    ui.fileUploaderBtn = '.raven-control-file-uploader-button';
    ui.fileUploaderValue = '.raven-control-file-uploader-value';
    ui.fileUploaderRemoveBtn = '.raven-control-file-uploader-value .fa';
    ui.fileUploaderProgress = '.raven-control-file-uploader-progress';
    ui.fileUploaderWarning = '.raven-control-file-uploader-warning';
    ui.fileUploaderSizeWarning = '.raven-control-file-uploader-warning-size';
    return ui;
  },
  events: function events() {
    return _.extend(elementor.modules.controls.BaseMultiple.prototype.events.apply(this, arguments), {
      'change @ui.fileUploaderInput': 'onFileInputChange',
      'click @ui.fileUploaderRemoveBtn': 'onFileRemove'
    });
  },
  onFileInputChange: function onFileInputChange(event) {
    var self = this;
    this.hideWarnings();

    if (event.target.files.length === 0) {
      return;
    }

    if (!this.checkFileSize(event.target.files[0])) {
      return;
    }

    var formData = new FormData();
    formData.append('action', 'raven_control_file_upload');
    formData.append('file', event.target.files[0]);
    formData.append('nonce', elementor.config.jx_nonce);
    this.showUploadProgress();
    jQuery.ajax(this.ui.fileUploaderInput.data('ajax-url'), {
      method: 'POST',
      processData: false,
      contentType: false,
      global: false,
      data: formData,
      success: function success(res) {
        if (res.success) {
          self.setValue('files', [res.data]);
          self.showFile(res.data.name);
        } else {
          self.ui.fileUploaderInput.val('');
          self.ui.fileUploaderWarning.find('ul').append("<li class=\"error\">".concat(res.data, "</li>"));
          self.ui.fileUploaderWarning.show();
          self.showUploadBtn();
        }
      },
      error: function error() {
        self.ui.fileUploaderInput.val('');
        self.ui.fileUploaderWarning.find('ul').append("<li class=\"error\">Something went wrong please try again.</li>");
        self.ui.fileUploaderWarning.show();
        self.showUploadBtn();
      }
    });
  },
  onFileRemove: function onFileRemove(event) {
    event.stopPropagation();
    this.setValue('files', []);
    this.ui.fileUploaderValue.hide();
    this.ui.fileUploaderBtn.show();
    this.ui.fileUploaderInput.val('');
  },
  hideWarnings: function hideWarnings() {
    this.ui.fileUploaderWarning.hide();
    this.ui.fileUploaderWarning.find('li').hide();
    this.ui.fileUploaderWarning.find('li.error').remove();
  },
  checkFileSize: function checkFileSize(file) {
    var uploadLimit = parseFloat(this.ui.fileUploaderInput.data('max-upload-limit'));

    if (file.size > uploadLimit) {
      this.ui.fileUploaderWarning.show();
      this.ui.fileUploaderSizeWarning.show();
      return false;
    }

    return true;
  },
  stripHash: function stripHash(filename) {
    var ext = filename.split('.').pop();
    var name = filename.replace('.' + ext, '');
    name = name.split('__').shift();
    return name + '.' + ext;
  },
  shortenFilename: function shortenFilename(filename) {
    return filename.length > 15 ? filename.substr(0, 15) + '...' : filename;
  },
  showFile: function showFile(filename) {
    this.ui.fileUploaderProgress.hide();
    this.ui.fileUploaderBtn.hide();
    filename = this.stripHash(filename);
    this.ui.fileUploaderValue.find('> span:first-child').attr('title', filename).text(this.shortenFilename(filename));
    this.ui.fileUploaderValue.css('display', 'flex');
  },
  showUploadBtn: function showUploadBtn() {
    this.ui.fileUploaderValue.hide();
    this.ui.fileUploaderProgress.hide();
    this.ui.fileUploaderBtn.show();
  },
  showUploadProgress: function showUploadProgress() {
    this.ui.fileUploaderValue.hide();
    this.ui.fileUploaderBtn.hide();
    this.ui.fileUploaderProgress.show();
  },
  onRender: function onRender() {
    _.extend(elementor.modules.controls.BaseMultiple.prototype.onRender.apply(this, arguments));

    var files = this.getControlValue('files');

    if (!files || files.length === 0) {
      return;
    }

    this.showFile(files[0].name);
  }
});
var _default = FileUploader;
exports["default"] = _default;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Media = elementor.modules.controls.Media.extend({
  ui: function ui() {
    var ui = elementor.modules.controls.BaseMultiple.prototype.ui.apply(this, arguments);
    ui.controlMedia = '.raven-control-media';
    ui.mediaInput = '.raven-control-media .elementor-input';
    ui.frameOpeners = '.raven-control-media-upload';
    return ui;
  },
  events: function events() {
    return _.extend(elementor.modules.controls.BaseMultiple.prototype.events.apply(this, arguments), {
      'click @ui.frameOpeners': 'openFrame'
    });
  },
  applySavedValue: function applySavedValue() {
    var url = this.getControlValue('url');
    this.ui.mediaInput.val(url);
  },
  initFrame: function initFrame() {
    var insertMediaText = 'Insert Media';
    this.frame = wp.media({
      button: {
        text: elementor.translate(insertMediaText)
      },
      states: [new wp.media.controller.Library({
        title: elementor.translate(insertMediaText),
        library: wp.media.query(this.model.get('query')),
        multiple: false,
        date: false
      })]
    });
    this.frame.on('insert select', this.select.bind(this));
    this.frame.on('close', this.close.bind(this));
  },
  close: function close() {
    this.setValue({
      url: '',
      id: ''
    });
    this.render();
  }
});
var _default = Media;
exports["default"] = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Presets = elementor.modules.controls.BaseData.extend({
  ui: function ui() {
    var ui = elementor.modules.controls.BaseMultiple.prototype.ui.apply(this, arguments);
    ui.presetItems = '.raven-element-presets';
    ui.presetItem = '.raven-element-presets-item';
    return ui;
  },
  events: function events() {
    return _.extend(elementor.modules.controls.BaseMultiple.prototype.events.apply(this, arguments), {
      'click @ui.presetItem ': 'onPresetClick'
    });
  },
  onReady: function onReady() {
    window.ravenPresets = window.ravenPresets || {};
    this.loadPresets(this.elementSettingsModel.get('widgetType'));
    elementor.channels.data.bind('raven:element:after:reset:style', this.onElementResetStyle.bind(this));
  },
  onElementResetStyle: function onElementResetStyle() {
    if (this.isRendered) {
      this.render();
    }
  },
  onPresetClick: function onPresetClick(e) {
    var $preset = $(e.currentTarget);
    $preset.siblings('.raven-element-presets-item').removeClass('active');
    $preset.addClass('active');

    var preset = _.find(this.getPresets(), {
      id: $preset.data('preset-id')
    });

    this.applyPreset(this.elementDefaultSettings(), preset);
    this.selectPreset(preset.id);
  },
  applyPreset: function applyPreset() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var preset = arguments.length > 1 ? arguments[1] : undefined;

    for (var setting in preset.widget.settings) {
      if (this.model.get('name') === setting) {
        continue;
      }

      var control = this.elementSettingsModel.controls[setting];

      if (typeof control === 'undefined') {
        continue;
      }

      if (control.is_repeater) {
        this.elementSettingsModel.get(setting).reset();
        settings[setting] = new window.Backbone.Collection(preset.widget.settings[setting], {
          model: _.partial(this.createRepeaterItemModel, _, _, this)
        });
        continue;
      }

      settings[setting] = preset.widget.settings[setting];
    }

    this.elementSettingsModel.set(settings);
  },
  createRepeaterItemModel: function createRepeaterItemModel(attrs, options, controlView) {
    options = options || {};
    options.controls = controlView.elementSettingsModel.get('fields');

    if (!attrs._id) {
      attrs._id = elementor.helpers.getUniqueID();
    }

    return new window.elementorModules.editor.elements.models.BaseSettings(attrs, options);
  },
  elementDefaultSettings: function elementDefaultSettings() {
    var self = this,
        controls = self.elementSettingsModel.controls,
        settings = {};
    jQuery.each(controls, function (controlName, control) {
      if (controlName === 'raven_presets') {
        return;
      }

      settings[controlName] = control["default"];
    });
    return settings;
  },
  loadPresets: function loadPresets(widget) {
    var _this = this;

    if (this.isPresetDataLoaded()) {
      if (this.getPresets().length === 0) {
        return;
      }

      this.insertPresets();

      if (this.ui.presetItem.length === 0) {
        this.render();
      }

      return;
    }

    this.ui.presetItems.addClass('loading');
    wp.ajax.post('raven_element_presets', {
      raven_element: widget
    }).done(function (data) {
      _this.ui.presetItems.removeClass('loading');

      _this.setPresets(data);

      _this.insertPresets();

      _this.render();
    }).fail(function () {
      _this.ui.presetItems.removeClass('loading');

      _this.setPresets([]);
    });
  },
  insertPresets: function insertPresets() {
    var value = this.getControlValue();
    this.setValue({
      selectedId: value ? value.selectedId : null,
      presets: this.getPresets()
    });
  },
  selectPreset: function selectPreset(id) {
    var value = this.getControlValue();
    value.selectedId = id;
    this.setValue(value);
  },
  getPresets: function getPresets() {
    if (!window.ravenPresets) {
      return [];
    }

    return window.ravenPresets[this.elementSettingsModel.get('widgetType')] || [];
  },
  setPresets: function setPresets(presets) {
    window.ravenPresets[this.elementSettingsModel.get('widgetType')] = presets;
  },
  isPresetDataLoaded: function isPresetDataLoaded() {
    if (window.ravenPresets[this.elementSettingsModel.get('widgetType')]) {
      return true;
    }

    return false;
  },
  onBeforeDestroy: function onBeforeDestroy() {
    elementor.channels.data.unbind('raven:element:after:reset:style');
  }
});
var _default = Presets;
exports["default"] = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Query = elementor.modules.controls.Select2.extend({
  cache: null,
  isTitlesReceived: false,
  getSelect2Placeholder: function getSelect2Placeholder() {
    var text,
        value = '';

    if (this.model.get('select2options')) {
      text = this.model.get('select2options').placeholder;
    }

    if (this.model.get('default')) {
      value = this.model.get('default');
      text = this.model.get('default_title');
    }

    return {
      id: value,
      text: text
    };
  },
  getSelect2DefaultOptions: function getSelect2DefaultOptions() {
    var self = this;
    return jQuery.extend(elementor.modules.controls.Select2.prototype.getSelect2DefaultOptions.apply(this, arguments), {
      ajax: {
        transport: _.debounce(function (params, success, failure) {
          var action = 'raven_control_query_autocomplete',
              query = _.extend({}, self.model.get('query') || {}),
              settings = self.container.model.get('settings'),
              wooCommerceSettings = ['woocommerce_cart_page_id', 'woocommerce_checkout_page_id', 'woocommerce_myaccount_page_id', 'woocommerce_terms_page_id', 'woocommerce_shop_page_id'];

          var ids = self.getControlValue() || [];

          if (!_.isArray(ids)) {
            ids = [ids];
          }

          var source = query.source,
              controlQuery = query.control_query;
          delete query.source;
          delete query.control_query;

          for (var key in controlQuery) {
            query[key] = settings.get(controlQuery[key]);
          }

          query.s = params.data.q;

          if (_.isEmpty(query.exclude)) {
            query.exclude = [];
          }

          var push = true;

          if (wooCommerceSettings.includes(self.model.get('name'))) {
            for (var item in wooCommerceSettings) {
              if (wooCommerceSettings[item] !== self.model.get('name')) {
                var itemValue = jQuery("select[data-setting=\"".concat(wooCommerceSettings[item], "\"]"));

                if (!_.isEmpty(itemValue.val())) {
                  query.exclude.push(itemValue.val());
                } else {
                  push = false;
                }
              }
            }
          }

          if (!_.isEmpty(ids) && push) {
            query.exclude = ids;
          }

          var data = {
            source: source,
            query: query
          };
          window.elementorCommon.ajax.addRequest(action, {
            data: data,
            success: success,
            error: failure
          });
        }, 500),
        cache: true
      },
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      minimumInputLength: 1
    });
  },
  getValueTitles: function getValueTitles() {
    var self = this,
        wooCommerceSettings = ['woocommerce_cart_page_id', 'woocommerce_checkout_page_id', 'woocommerce_myaccount_page_id', 'woocommerce_terms_page_id', 'woocommerce_shop_page_id'];
    var ids = self.getControlValue() || [];

    if (!ids || _.isArray(ids) && !ids.length) {
      return;
    } else if (!_.isArray(ids)) {
      ids = [ids];
    }

    var settings = self.container.model.get('settings'),
        query = _.extend({}, self.model.get('query') || {}),
        action = 'raven_control_query_autocomplete';

    var source = query.source,
        controlQuery = query.control_query;
    delete query.source;
    delete query.control_query;

    for (var key in controlQuery) {
      query[key] = settings.get(controlQuery[key]);
    }

    query.include = ids;

    if (wooCommerceSettings.includes(this.model.get('name'))) {
      query.model_name = this.model.get('name');
    }

    var data = {
      source: source,
      query: query,
      unique_id: self.model.cid
    };
    window.elementorCommon.ajax.loadObjects({
      action: action,
      ids: ids,
      data: data,
      before: function before() {
        self.addControlSpinner();
      },
      success: function success(_ref) {
        var results = _ref.results;

        if (self.isDestroyed) {
          return;
        }

        var options = {};

        if (!_.isEmpty(results)) {
          results.forEach(function (item) {
            options[item.id] = item.text;
          });
        }

        self.isTitlesReceived = true;
        self.model.set('options', options);
        self.render();

        if (wooCommerceSettings.includes(self.model.get('name')) && results.length > 0) {
          self.$el.find('select').val(results[0].id).trigger('change');
        }
      }
    });
  },
  addControlSpinner: function addControlSpinner() {
    this.ui.select.prop('disabled', true);
    this.$el.find('.elementor-control-title').after('<span class="elementor-control-spinner">&nbsp;<i class="eicon-spinner eicon-animation-spin"></i>&nbsp;</span>');
  },
  onReady: function onReady() {
    setTimeout(elementor.modules.controls.Select2.prototype.onReady.apply(this, arguments));

    if (!this.isTitlesReceived) {
      this.getValueTitles();
    }
  }
});
var _default = Query;
exports["default"] = _default;

},{}],13:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

(function ($, window) {
  var RavenEditor = function RavenEditor() {
    var self = this;

    function initComponents() {
      var components = {
        templates: require('./components/templates')["default"],
        customCSS: require('./components/custom-css')["default"],
        customCSSWidget: require('./components/custom-css-widget')["default"],
        previewSettings: require('./components/preview-settings')["default"],
        sellkitPreview: require('./components/sellkit-preview')["default"],
        JupiterxConditionManager: require('./components/conditions')["default"]
      };

      for (var component in components) {
        components[component].init();
      } // eslint-disable-next-line no-unused-expressions


      require('./global-widget/global-widget')["default"]; // eslint-disable-next-line no-unused-expressions

      require('./components/woocommerce-settings')["default"]; // eslint-disable-next-line no-unused-expressions

      require('./utils/video-playlist/video-playlist')["default"];
    }

    function initControls() {
      self.controls = {
        media: require('./controls/media')["default"],
        checkbox: require('./controls/checkbox')["default"],
        file_uploader: require('./controls/file-uploader')["default"],
        presets: require('./controls/presets')["default"],
        query: require('./controls/query')["default"]
      };

      for (var control in self.controls) {
        elementor.addControlView("raven_".concat(control), self.controls[control]);
      }
    }

    function checkWidgetIsActive(widget) {
      var activeElements = window.jupiterxOptions.activeElements;

      if ((0, _typeof2["default"])(window.jupiterxOptions.activeElements) === 'object') {
        activeElements = Object.values(window.jupiterxOptions.activeElements);
      }

      return !!activeElements.includes(widget);
    }

    function initWidgets() {
      var widgets = {
        'raven-form': checkWidgetIsActive('forms') && require('./widgets/form')["default"],
        'raven-categories': checkWidgetIsActive('categories') && require('./widgets/categories')["default"],
        'raven-posts': checkWidgetIsActive('posts') && require('./widgets/posts')["default"],
        'raven-post-carousel': checkWidgetIsActive('posts') && require('./widgets/posts')["default"],
        'raven-flip-box': checkWidgetIsActive('flip-box') && require('./widgets/flip-box')["default"],
        'raven-my-account': checkWidgetIsActive('my-account') && require('./widgets/my-account')["default"],
        'raven-stripe-button': checkWidgetIsActive('payments') && require('./widgets/stripe-button')["default"],
        'raven-advanced-nav-menu': checkWidgetIsActive('advanced-nav-menu') && require('./widgets/advanced-nav-menu')["default"],
        'raven-media-gallery': checkWidgetIsActive('media-gallery') && require('./widgets/media-gallery')["default"],
        'raven-shopping-cart': checkWidgetIsActive('shopping-cart') && require('./widgets/shopping-cart')["default"],
        'raven-register': checkWidgetIsActive('forms') && require('./widgets/register')["default"]
      };

      for (var widget in widgets) {
        elementor.hooks.addAction("panel/open_editor/widget/".concat(widget), widgets[widget]);
      }
    } // Some widgets require a rerender after preview loaded,
    // to fully sync with their settings recieved after initial load.


    function rerenderWidgets() {
      if (!elementor.previewView || !elementor.previewView._getNestedViews) {
        return;
      }

      var widgets = ['raven-code-highlight', 'raven-my-account', 'raven-product-data-tabs', 'raven-product-add-to-cart', 'raven-product-additional-cart', 'raven-cart', 'raven-shopping-cart'];

      var _loop = function _loop(widget) {
        var views = elementor.previewView._getNestedViews().filter(function (view) {
          return 'widget' === view.model.get('elType') && widgets[widget] === view.model.get('widgetType');
        });

        _.each(views, function (view) {
          return view.renderHTML();
        });
      };

      for (var widget in widgets) {
        _loop(widget);
      }
    }

    function initUtils() {
      self.utils = {
        Module: require('./utils/module')["default"],
        Form: require('./utils/form/form')["default"]
      };
    }

    function onElementorReady() {
      initComponents();
      initControls();
    }

    function onFrontendInit() {
      initWidgets();
    }

    function onPreviewLoaded() {
      $(document).on('click', '#elementor-panel-header-menu-button', function () {
        // eslint-disable-next-line no-undef
        if (!elementorAppConfig.hasPro) {
          $('.elementor-panel-menu-item-notes').remove();
        }

        $('.elementor-panel-menu-item-apps').remove();
      }); // eslint-disable-next-line no-undef

      if (elementorCommon.config.experimentalFeatures.editor_v2) {
        var helpLink = jQuery('a.MuiButtonBase-root[aria-label="Help"]');

        if (helpLink.length > 0) {
          helpLink.parent().remove();
        }
      }

      initUtils();
      setWidgetsDarkIcon();
      addLayoutBuilderButton();
    }

    function onDocumentLoaded() {
      setTimeout(rerenderWidgets, 0);
    }

    function onElementResetStyle(model) {
      if (model.get('elType') !== 'widget') {
        return;
      }

      resetElementPresets(model);
      elementor.channels.data.trigger('raven:element:after:reset:style', model);
    }

    function setWidgetsDarkIcon(value) {
      var uiThemeType = '';

      if (typeof elementor.settings.editorPreferences !== 'undefined') {
        $('#elementor-editor-wrapper').removeClass('raven-icon-theme-dark raven-icon-theme-light raven-icon-theme-auto');
        var uiTheme = typeof value !== 'undefined' ? value.attributes.ui_theme : elementor.settings.editorPreferences.model.get('ui_theme');
        uiThemeType = uiTheme;

        if ('auto' === uiTheme) {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            uiTheme = 'dark';
          }
        }

        $('#elementor-editor-wrapper').addClass('raven-icon-theme-' + uiTheme);
      }

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
        if ('auto' !== uiThemeType) {
          return;
        }

        var uiTheme = event.matches ? 'dark' : 'light',
            elementorEditor = document.getElementById('elementor-editor-wrapper');

        if (!elementorEditor) {
          return;
        }

        elementorEditor.className = '';
        elementorEditor.classList.add("raven-icon-theme-".concat(uiTheme));
      });
    }

    function addLayoutBuilderButton() {
      if (window.elementorCommon.config.experimentalFeatures.editor_v2) {
        var elementorOptionsId = 'header.MuiPaper-root .MuiGrid-root:first-child .eui-stack:first-child';
        $(document).on('click', "".concat(elementorOptionsId, ", ").concat(elementorOptionsId, " > *"), function () {
          var elementorSubMenu = document.getElementsByClassName('MuiMenuItem-root');
          var wrapper = document.getElementsByClassName('MuiList-root');

          if (elementorSubMenu.length > 1) {
            elementorSubMenu = elementorSubMenu[1];
          }

          if (!elementorSubMenu || !wrapper) {
            return;
          }

          if (wrapper[0].querySelector('.MuiMenuItem-root:first-child .MuiListItemText-root').textContent === 'Theme Builder') {
            wrapper[0].querySelector('.MuiMenuItem-root:first-child .MuiListItemText-root').innerHTML = '<span class="raven-custom-button-layout-builder">Layout Builder</span>'; // Remove current click event.

            var layoutBuilderButton = wrapper[0].querySelector('.MuiMenuItem-root:first-child');
            var newLayoutBuilderButton = layoutBuilderButton.cloneNode(true);
            layoutBuilderButton.parentNode.replaceChild(newLayoutBuilderButton, layoutBuilderButton); // Add new click event.

            wrapper[0].querySelector('.MuiMenuItem-root:first-child').addEventListener('click', function (event) {
              event.preventDefault();
              window.location.href = window.jupiterXControlPanelURL + '#/layout-builder';
            });
          }
        });
      }
    }

    function resetElementPresets(model) {
      var controls = model.get('settings').controls;

      if (!controls.raven_presets) {
        return;
      }

      model.setSetting('raven_presets', null);
    }

    function destroyElement() {
      var editorBody = elementorFrontend.elements.$body[0];

      if ($(editorBody).find('.raven-adnav-menu-parent-segment').length === 0) {
        return;
      }

      $(editorBody).find('.raven-adnav-menu-parent-segment').removeClass('raven-adnav-menu-parent-segment');

      if ($(editorBody).hasClass('raven-adnav-menu-effect-pushed')) {
        $(editorBody).removeClass('raven-adnav-menu-effect-pushed').removeAttr('style');
      }
    }

    function onElementorInit() {
      onElementorReady();
      elementor.on('frontend:init', onFrontendInit);
      elementor.on('preview:loaded', onPreviewLoaded);
      elementor.on('document:loaded', onDocumentLoaded);
      elementor.channels.data.bind('element:after:reset:style', onElementResetStyle);

      if (typeof elementor.settings.editorPreferences !== 'undefined') {
        elementor.settings.editorPreferences.model.on('change', setWidgetsDarkIcon);
      }

      elementor.channels.data.on('element:destroy', destroyElement); // Remove Elementor Pro dynamic tags teaser.
      // The following is the selector of a Marionette script tag. If we use remove(), Marionette will
      // throw error. So we use empty() to just remove its children while keeping the script tag.

      $('#tmpl-elementor-dynamic-tags-promo').empty(); // eslint-disable-next-line no-undef

      if (!elementorAppConfig.hasPro) {
        var elTypes = ['widget', 'section', 'column', 'container'];
        setTimeout(function () {
          elTypes.forEach(function (type) {
            elementor.hooks.addFilter('elements/'.concat(type, '/contextMenuGroups'), function (groups) {
              var newGroup = groups.filter(function (group) {
                return group.name !== 'notes';
              });
              return newGroup;
            });
          });
        }, 300);
      }
    }

    $(window).on('elementor:init', onElementorInit);
  }; // TODO: It should be removed after fixing the issue by E pro.


  if (_.isUndefined(window.elementorDevTools)) {
    window.elementorDevTools = {
      deprecation: {
        deprecated: function deprecated() {}
      }
    };
  }

  window.ravenEditor = new RavenEditor();
})(jQuery, window);

},{"./components/conditions":1,"./components/custom-css":3,"./components/custom-css-widget":2,"./components/preview-settings":4,"./components/sellkit-preview":5,"./components/templates":6,"./components/woocommerce-settings":7,"./controls/checkbox":8,"./controls/file-uploader":9,"./controls/media":10,"./controls/presets":11,"./controls/query":12,"./global-widget/global-widget":20,"./utils/form/form":36,"./utils/module":41,"./utils/video-playlist/video-playlist":45,"./widgets/advanced-nav-menu":46,"./widgets/categories":47,"./widgets/flip-box":48,"./widgets/form":49,"./widgets/media-gallery":63,"./widgets/my-account":64,"./widgets/posts":65,"./widgets/register":66,"./widgets/shopping-cart":67,"./widgets/stripe-button":68,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/typeof":87}],14:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Templates = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Templates = /*#__PURE__*/function (_window$$e$modules$Co) {
  (0, _inherits2["default"])(Templates, _window$$e$modules$Co);

  var _super = _createSuper(Templates);

  function Templates() {
    (0, _classCallCheck2["default"])(this, Templates);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Templates, [{
    key: "onAfterApply",
    value: function onAfterApply() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var result = arguments.length > 1 ? arguments[1] : undefined;
      window.$e.data.deleteCache(this.component, 'document/global/global-widget/templates', args.query);
      Object.entries(result.data).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            templateID = _ref2[0],
            data = _ref2[1];

        window.$e.data.setCache(_this.component, 'document/global/global-widget/templates/'.concat(templateID), {}, data);
      });
    }
  }], [{
    key: "getEndpointFormat",
    value: function getEndpointFormat() {
      return 'global-widget/templates';
    }
  }]);
  return Templates;
}(window.$e.modules.CommandData);

exports.Templates = Templates;
var _default = Templates;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83,"@babel/runtime/helpers/slicedToArray":85}],15:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SaveTemplates = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SaveTemplates = /*#__PURE__*/function (_window$$e$modules$Co) {
  (0, _inherits2["default"])(SaveTemplates, _window$$e$modules$Co);

  var _super = _createSuper(SaveTemplates);

  function SaveTemplates() {
    (0, _classCallCheck2["default"])(this, SaveTemplates);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(SaveTemplates, [{
    key: "apply",
    value: function apply() {
      var self = this;
      var templateModels = this.getCurrentTemplatesModels(this.component.changedContainersId);

      if (!templateModels.length) {
        return;
      }

      return new Promise(function (resolve, reject) {
        window.elementorCommon.ajax.addRequest('update_templates', {
          data: {
            templates: templateModels.map(function (templateModel) {
              // Map it to backend format.
              return {
                id: templateModel.get('id'),
                content: JSON.stringify([templateModel.toJSON()]),
                source: 'local',
                type: 'widget'
              };
            })
          },
          error: reject,
          success: function success() {
            // Clear changed containers.
            self.component.changedContainersId = {};
            templateModels.forEach(function (template) {
              var settings = template.get('settings');
              window.$e.data.setCache(self.component, 'document/global/global-widget/templates/'.concat(template.id), {}, {
                settings: settings
              });
            });
            resolve(templateModels);
          }
        });
      });
    }
  }, {
    key: "getCurrentTemplatesModels",
    value: function getCurrentTemplatesModels(changedContainersId) {
      var self = this;
      var templatesData = [];
      Object.entries(changedContainersId).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            templateID = _ref2[0],
            containerId = _ref2[1];

        var templateData = window.$e.data.getCache(self.component, 'document/global/global-widget/templates/'.concat(templateID));

        if (!templateData) {
          if (window.$e.devTools) {
            window.$e.devTools.log.warn('window.$e.data.getCache( component, `document/global/global-widget/templates/'.concat(templateID, '` ) - not found.'));
          }
        }

        var container = elementor.getContainer(containerId);

        if (!container) {
          return;
        }

        templatesData.push(new window.Backbone.Model({
          id: templateID,
          elType: 'widget',
          widgetType: container.model.get('widgetType'),
          settings: container.settings.toJSON({
            remove: 'default'
          }),
          templateID: templateID
        }));
      });
      return templatesData;
    }
  }]);
  return SaveTemplates;
}(window.$e.modules.CommandInternalBase);

exports.SaveTemplates = SaveTemplates;
var _default = SaveTemplates;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83,"@babel/runtime/helpers/slicedToArray":85}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _link.Link;
  }
});
Object.defineProperty(exports, "Unlink", {
  enumerable: true,
  get: function get() {
    return _unlink.Unlink;
  }
});

var _link = require("./link");

var _unlink = require("./unlink");

},{"./link":17,"./unlink":18}],17:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Link = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _globalWidget = _interopRequireDefault(require("../../global-widget"));

var _i18n = require("@wordpress/i18n");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Link = /*#__PURE__*/function (_window$$e$modules$ed) {
  (0, _inherits2["default"])(Link, _window$$e$modules$ed);

  var _super = _createSuper(Link);

  function Link() {
    (0, _classCallCheck2["default"])(this, Link);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Link, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
      this.requireArgumentConstructor('data', Object, args);
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers;
      containers.forEach(function (container) {
        if ('global' === container.model.get('widgetType')) {
          throw Error("Invalid container, id: '".concat(container.id, "' is already global."));
        }
      });
    }
  }, {
    key: "getHistory",
    value: function getHistory(args) {
      var data = args.data;
      return {
        title: elementor.widgetsCache[data.widgetType].title,
        subTitle: data.title,
        type: (0, _i18n.__)('Linked to Global', 'jupiterx-core')
      };
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _this = this;

      var self = this;
      var data = args.data,
          _args$containers2 = args.containers,
          containers = _args$containers2 === void 0 ? [args.container] : _args$containers2;
      containers.forEach(function (container) {
        var widgetModel = container.model,
            widgetModelIndex = widgetModel.collection.indexOf(widgetModel);
        data.elType = data.type;
        data.settings = widgetModel.get('settings').attributes;
        data.widgetType = widgetModel.get('widgetType');

        var elementModel = _globalWidget["default"].addGlobalWidget.apply(_this, [data.template_id, data]),
            elementModelAttributes = elementModel.attributes;

        window.$e.data.setCache(self.component, 'document/global/global-widget/templates/'.concat(data.template_id), {}, data);
        window.$e.run('document/elements/create', {
          container: container.parent,
          model: {
            id: window.elementorCommon.helpers.getUniqueId(),
            elType: elementModelAttributes.elType,
            widgetType: elementModelAttributes.widgetType,
            templateID: data.template_id
          },
          options: {
            at: widgetModelIndex
          }
        });
        window.$e.run('document/elements/delete', {
          container: container
        });
      });
      window.$e.route('panel/elements/global');
    }
  }]);
  return Link;
}(window.$e.modules.editor.document.CommandHistoryBase);

exports.Link = Link;
var _default = Link;
exports["default"] = _default;

},{"../../global-widget":20,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83,"@wordpress/i18n":96}],18:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Unlink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _globalWidget = _interopRequireDefault(require("../../global-widget"));

var _i18n = require("@wordpress/i18n");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Unlink = /*#__PURE__*/function (_window$$e$modules$ed) {
  (0, _inherits2["default"])(Unlink, _window$$e$modules$ed);

  var _super = _createSuper(Unlink);

  function Unlink() {
    (0, _classCallCheck2["default"])(this, Unlink);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Unlink, [{
    key: "validateArgs",
    value: function validateArgs(args) {
      this.requireContainer(args);
    }
  }, {
    key: "getHistory",
    value: function getHistory(args) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers;
      return {
        title: elementor.helpers.getModelLabel(containers[0].model),
        type: (0, _i18n.__)('Unlink Widget', 'jupiterx-core')
      };
    }
  }, {
    key: "apply",
    value: function () {
      var _apply = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(args) {
        var _args$containers2, containers, ids, data;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _args$containers2 = args.containers, containers = _args$containers2 === void 0 ? [args.container] : _args$containers2;
                ids = containers.map(function (container) {
                  return container.model.get('templateID');
                });
                _context.next = 4;
                return window.$e.data.get('document/global/templates', {
                  ids: ids
                });

              case 4:
                data = _context.sent;
                containers.forEach(function (container) {
                  var id = container.model.get('templateID'),
                      elementModel = _globalWidget["default"].createGlobalModel.apply(this, [id, data.data[id]]);

                  window.$e.run('document/elements/create', {
                    container: container.parent,
                    model: {
                      id: window.elementorCommon.helpers.getUniqueId(),
                      elType: 'widget',
                      widgetType: elementModel.get('widgetType'),
                      settings: window.elementorCommon.helpers.cloneObject(elementModel.get('settings').attributes),
                      defaultEditSettings: window.elementorCommon.helpers.cloneObject(elementModel.get('editSettings').attributes)
                    },
                    options: {
                      at: container.model.collection.indexOf(container.model),
                      edit: true
                    }
                  });
                  window.$e.run('document/elements/delete', {
                    container: container
                  });
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function apply(_x) {
        return _apply.apply(this, arguments);
      }

      return apply;
    }()
  }]);
  return Unlink;
}(window.$e.modules.editor.document.CommandHistoryBase);

exports.Unlink = Unlink;
var _default = Unlink;
exports["default"] = _default;

},{"../../global-widget":20,"@babel/runtime/helpers/asyncToGenerator":72,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83,"@babel/runtime/regenerator":89,"@wordpress/i18n":96}],19:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Component = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var commandsData = _interopRequireWildcard(require("./commands/commands-data/templates"));

var commands = _interopRequireWildcard(require("./commands/commands/"));

var commandsInternal = _interopRequireWildcard(require("./commands/commands-internal/save-templates"));

var hooks = _interopRequireWildcard(require("./hooks/"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Component = /*#__PURE__*/function (_window$$e$modules$Co) {
  (0, _inherits2["default"])(Component, _window$$e$modules$Co);

  var _super = _createSuper(Component);

  function Component() {
    var _this;

    (0, _classCallCheck2["default"])(this, Component);
    _this = _super.call(this);
    _this.notLoadedTemplatesIds = [];
    _this.lastChangedContainers = null;
    _this.changedContainersId = {};
    return _this;
  }

  (0, _createClass2["default"])(Component, [{
    key: "getNamespace",
    value: function getNamespace() {
      return 'document/global';
    }
  }, {
    key: "registerAPI",
    value: function registerAPI() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Component.prototype), "registerAPI", this).call(this);
      var self = this;
      window.$e.routes.on('run:after', function (component, route) {
        if ('panel/elements/global' === route) {
          self.onRoutePanelElementsGlobal();
        }
      });
    }
  }, {
    key: "onRoutePanelElementsGlobal",
    value: function onRoutePanelElementsGlobal() {
      var self = this;

      if (self.notLoadedTemplatesIds.length) {
        window.$e.data.get('document/global/templates', {
          ids: self.notLoadedTemplatesIds
        }).then(function () {
          self.notLoadedTemplatesIds = [];
        });
      }
    }
  }, {
    key: "defaultCommands",
    value: function defaultCommands() {
      return this.importCommands(commands);
    }
  }, {
    key: "defaultCommandsInternal",
    value: function defaultCommandsInternal() {
      return this.importCommands(commandsInternal);
    }
  }, {
    key: "defaultData",
    value: function defaultData() {
      return this.importCommands(commandsData);
    }
  }, {
    key: "defaultHooks",
    value: function defaultHooks() {
      return this.importHooks(hooks);
    }
  }, {
    key: "updateGlobalsRecursive",
    value: function updateGlobalsRecursive(targetContainer) {
      var modelsToUpdate = ['dynamic', 'globals', 'settings'];
      elementor.getPreviewContainer().forEachChildrenRecursive(function (container) {
        if (targetContainer !== container && parseInt(container.model.get('templateID')) === parseInt(targetContainer.model.get('templateID'))) {
          modelsToUpdate.forEach(function (modelName) {
            var model = targetContainer[modelName];

            if (model instanceof window.Backbone.Model) {
              var accordingTo = 'settings' === modelName ? targetContainer.settings.attributes : model.changed;
              Object.entries(accordingTo).forEach(function (_ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                    key = _ref2[0],
                    setting = _ref2[1];

                container[modelName].set(key, setting);
              });
            }
          });
          container.render();
        }
      });
    }
  }]);
  return Component;
}(window.$e.modules.ComponentBase);

exports.Component = Component;
var _default = Component;
exports["default"] = _default;

},{"./commands/commands-data/templates":14,"./commands/commands-internal/save-templates":15,"./commands/commands/":16,"./hooks/":28,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/get":76,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/interopRequireWildcard":80,"@babel/runtime/helpers/possibleConstructorReturn":83,"@babel/runtime/helpers/slicedToArray":85}],20:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _component = _interopRequireDefault(require("./component"));

var _i18n = require("@wordpress/i18n");

var GlobalWidget = elementorModules.editor.utils.Module.extend({
  panelWidgets: new window.Backbone.Collection(),
  isFirst: false,
  onInit: function onInit() {
    var activeElements = window.jupiterxOptions.activeElements;

    if ((0, _typeof2["default"])(window.jupiterxOptions.activeElements) === 'object') {
      activeElements = Object.values(window.jupiterxOptions.activeElements);
    }

    if (elementor.helpers.hasPro() || !activeElements.includes('global-widget')) {
      return;
    }

    this.onElementorInit();
    this.onElementorInitComponents();
    elementor.on('preview:loaded', this.onElementorPreviewLoaded);
  },
  addGlobalWidget: function addGlobalWidget(templateId, templateData) {
    return this.panelWidgets.add(this.createGlobalModel(templateId, templateData));
  },
  createGlobalModel: function createGlobalModel(templateId, templateData) {
    templateData = Object.assign({}, templateData, {
      id: templateId,
      categories: [],
      icon: elementor.widgetsCache[templateData.widgetType].icon,
      widgetType: templateData.widgetType,
      custom: {
        templateID: templateId
      }
    });
    var elementModel = new elementor.modules.elements.models.Element(templateData);
    elementModel.set('id', templateId);
    return elementModel;
  },
  setWidgetType: function setWidgetType() {
    elementor.hooks.addFilter('element/view', function (DefaultView, model) {
      if (model.get('templateID')) {
        return require('./widget/view')["default"];
      }

      return DefaultView;
    });
    elementor.hooks.addFilter('element/model', function (DefaultModel, attrs) {
      if (attrs.templateID) {
        return require('./widget/model')["default"];
      }

      return DefaultModel;
    });
  },
  registerTemplateType: function registerTemplateType() {
    elementor.templates.registerTemplateType('widget', {
      showInLibrary: false,
      saveDialog: {
        title: (0, _i18n.__)('Save your widget as a global widget', 'jupiterx-core'),
        description: (0, _i18n.__)('You\'ll be able to add this global widget to multiple areas on your site, and edit it from one single place.', 'jupiterx-core')
      },
      prepareSavedData: function prepareSavedData(data) {
        data.widgetType = data.content[0].widgetType;
        return data;
      },
      ajaxParams: {
        success: this.onWidgetTemplateSaved.bind(this)
      }
    });
  },
  addPanelPage: function addPanelPage() {
    elementor.getPanelView().addPage('globalWidget', {
      view: require('./views/panel-page')
    });
  },
  getGlobalModels: function getGlobalModels(id) {
    return window.$e.data.getCache(this.component, 'document/global/global-widget/templates/'.concat(id));
  },
  saveTemplates: function saveTemplates() {
    window.$e.internal('document/global/save-templates');
  },
  requestGlobalModelSettings: function requestGlobalModelSettings(globalModel, callback) {
    window.$e.data.get('document/global/templates', {
      ids: globalModel.id
    }).then(function (data) {
      callback(data);
    });
  },
  setWidgetContextMenuSaveAction: function setWidgetContextMenuSaveAction() {
    elementor.hooks.addFilter('elements/widget/contextMenuGroups', function (groups, widget) {
      var saveGroup = _.findWhere(groups, {
        name: 'save'
      });

      if (!saveGroup) {
        return groups;
      }

      var saveAction = _.findWhere(saveGroup.actions, {
        name: 'save'
      });

      saveAction.callback = widget.save.bind(widget);
      delete saveAction.shortcut;
      return groups;
    });
  },
  onElementorInit: function onElementorInit() {
    var self = this;
    elementor.on('panel:init', function () {
      elementor.hooks.addFilter('panel/elements/regionViews', function (regionViews) {
        _.extend(regionViews.global, {
          view: require('./views/global-templates-view'),
          options: {
            collection: self.panelWidgets
          }
        });

        return regionViews;
      });
    });
    this.registerTemplateType();
    this.setWidgetContextMenuSaveAction();
    this.setWidgetType();
  },
  onElementorInitComponents: function onElementorInitComponents() {
    window.$e.components.register(new _component["default"]());
    window.$e.data.get('document/global/templates', {}, {
      refresh: true
    });
  },
  onElementorPreviewLoaded: function onElementorPreviewLoaded() {
    if (this.isFirst) {
      return;
    }

    this.addPanelPage();
    window.$e.routes.register('panel/editor', 'global', function (args) {
      elementor.getPanelView().setPage('globalWidget', 'Global Editing', {
        editedView: args.view
      });
    });
    this.isFirst = true;
  },
  onWidgetTemplateSaved: function onWidgetTemplateSaved(data) {
    elementor.templates.layout.hideModal();
    var container = elementor.getContainer(elementor.templates.layout.modalContent.currentView.model.id);
    window.$e.run('document/global/link', {
      container: container,
      data: data
    });
  }
});
var globalWidgetObject = new GlobalWidget();
var _default = globalWidgetObject;
exports["default"] = _default;

},{"./component":19,"./views/global-templates-view":30,"./views/panel-page":32,"./widget/model":33,"./widget/view":34,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/typeof":87,"@wordpress/i18n":96}],21:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseGlobalWidgetPrepareUpdate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BaseGlobalWidgetPrepareUpdate = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(BaseGlobalWidgetPrepareUpdate, _window$$e$modules$ho);

  var _super = _createSuper(BaseGlobalWidgetPrepareUpdate);

  function BaseGlobalWidgetPrepareUpdate() {
    (0, _classCallCheck2["default"])(this, BaseGlobalWidgetPrepareUpdate);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(BaseGlobalWidgetPrepareUpdate, [{
    key: "getConditions",
    value: function getConditions(args) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers;
      return containers.some(function (container) {
        if (container.renderer && container.renderer.model) {
          return container.renderer.model.get('templateID');
        }

        return undefined;
      });
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _args$containers2 = args.containers,
          containers = _args$containers2 === void 0 ? [args.container] : _args$containers2,
          component = window.$e.components.get('document/global');
      var globalWidgetContainers = containers.filter(function (container) {
        if (container.renderer && container.renderer.model) {
          return container.renderer.model.get('templateID');
        }

        return undefined;
      });
      component.lastChangedContainers = globalWidgetContainers.map(function (container) {
        return container.renderer;
      });
      globalWidgetContainers.forEach(function (container) {
        component.changedContainersId[container.renderer.model.get('templateID')] = container.renderer.id;
      });
    }
  }]);
  return BaseGlobalWidgetPrepareUpdate;
}(window.$e.modules.hookData.After);

exports.BaseGlobalWidgetPrepareUpdate = BaseGlobalWidgetPrepareUpdate;
var _default = BaseGlobalWidgetPrepareUpdate;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],22:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.GlobalWidgetLoadTemplates = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _globalWidget = _interopRequireDefault(require("../../../../global-widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetLoadTemplates = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(GlobalWidgetLoadTemplates, _window$$e$modules$ho);

  var _super = _createSuper(GlobalWidgetLoadTemplates);

  function GlobalWidgetLoadTemplates() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetLoadTemplates);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetLoadTemplates, [{
    key: "initialize",
    value: function initialize() {
      // Since 'initialize' called before the component is registered.
      this.component = window.$e.components.get('document/global');
    }
  }, {
    key: "getCommand",
    value: function getCommand() {
      return 'editor/documents/attach-preview';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-load-templates';
    }
  }, {
    key: "getConditions",
    value: function getConditions() {
      return !GlobalWidgetLoadTemplates.calledOnce;
    }
  }, {
    key: "apply",
    value: function apply() {
      var _this = this;

      GlobalWidgetLoadTemplates.calledOnce = true;
      Object.entries(elementor.config.widget_templates).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            id = _ref2[0],
            data = _ref2[1];

        _globalWidget["default"].addGlobalWidget.apply(_this, [id, data]);

        _this.addTemplateToCache(id);
      });
    }
  }, {
    key: "addTemplateToCache",
    value: function addTemplateToCache(id) {
      this.component = window.$e.components.get('document/global');
      var container = elementor.getPreviewContainer().findChildrenRecursive(function (i) {
        return parseInt(i.model.get('templateID')) === parseInt(id);
      });

      if (!container) {
        return this.component.notLoadedTemplatesIds.push(id);
      }

      var args = {
        id: container.model.get('templateID'),
        elType: 'widget',
        widgetType: container.model.get('widgetType'),
        settings: container.settings.toJSON({
          remove: 'default'
        }),
        templateID: container.model.get('templateID')
      };
      window.$e.data.setCache(this.component, 'document/global/global-widget/templates/'.concat(id), {}, args);
    }
  }]);
  return GlobalWidgetLoadTemplates;
}(window.$e.modules.hookData.After);

exports.GlobalWidgetLoadTemplates = GlobalWidgetLoadTemplates;
var _default = GlobalWidgetLoadTemplates;
exports["default"] = _default;

},{"../../../../global-widget":20,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83,"@babel/runtime/helpers/slicedToArray":85}],23:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetPrepareUpdateElementSetSettings = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseGlobalWidgetPrepareUpdate = _interopRequireDefault(require("../../../base-global-widget-prepare-update"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetPrepareUpdateElementSetSettings = /*#__PURE__*/function (_BaseGlobalWidgetPrep) {
  (0, _inherits2["default"])(GlobalWidgetPrepareUpdateElementSetSettings, _BaseGlobalWidgetPrep);

  var _super = _createSuper(GlobalWidgetPrepareUpdateElementSetSettings);

  function GlobalWidgetPrepareUpdateElementSetSettings() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetPrepareUpdateElementSetSettings);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetPrepareUpdateElementSetSettings, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/elements/set-settings';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-prepare-update-element-set-settings';
    }
  }]);
  return GlobalWidgetPrepareUpdateElementSetSettings;
}(_baseGlobalWidgetPrepareUpdate["default"]);

exports.GlobalWidgetPrepareUpdateElementSetSettings = GlobalWidgetPrepareUpdateElementSetSettings;

},{"../../../base-global-widget-prepare-update":21,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],24:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetDoUpdate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetDoUpdate = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(GlobalWidgetDoUpdate, _window$$e$modules$ho);

  var _super = _createSuper(GlobalWidgetDoUpdate);

  function GlobalWidgetDoUpdate() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetDoUpdate);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetDoUpdate, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/history/end-log';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-do-update';
    }
  }, {
    key: "getConditions",
    value: function getConditions() {
      return window.$e.components.get('document/global').lastChangedContainers;
    }
  }, {
    key: "apply",
    value: function apply() {
      var component = window.$e.components.get('document/global'),
          containers = component.lastChangedContainers;
      containers.forEach(function (container) {
        return component.updateGlobalsRecursive(container);
      });
      component.lastChangedContainers = null;
    }
  }]);
  return GlobalWidgetDoUpdate;
}(window.$e.modules.hookData.After);

exports.GlobalWidgetDoUpdate = GlobalWidgetDoUpdate;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],25:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetPrepareUpdateRepeaterInsert = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseGlobalWidgetPrepareUpdate = _interopRequireDefault(require("../../../base-global-widget-prepare-update"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetPrepareUpdateRepeaterInsert = /*#__PURE__*/function (_BaseGlobalWidgetPrep) {
  (0, _inherits2["default"])(GlobalWidgetPrepareUpdateRepeaterInsert, _BaseGlobalWidgetPrep);

  var _super = _createSuper(GlobalWidgetPrepareUpdateRepeaterInsert);

  function GlobalWidgetPrepareUpdateRepeaterInsert() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetPrepareUpdateRepeaterInsert);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetPrepareUpdateRepeaterInsert, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/repeater/insert';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-prepare-update-repeater-insert';
    }
  }]);
  return GlobalWidgetPrepareUpdateRepeaterInsert;
}(_baseGlobalWidgetPrepareUpdate["default"]);

exports.GlobalWidgetPrepareUpdateRepeaterInsert = GlobalWidgetPrepareUpdateRepeaterInsert;

},{"../../../base-global-widget-prepare-update":21,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],26:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetPrepareUpdateRepeaterRemove = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _baseGlobalWidgetPrepareUpdate = _interopRequireDefault(require("../../../base-global-widget-prepare-update"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetPrepareUpdateRepeaterRemove = /*#__PURE__*/function (_BaseGlobalWidgetPrep) {
  (0, _inherits2["default"])(GlobalWidgetPrepareUpdateRepeaterRemove, _BaseGlobalWidgetPrep);

  var _super = _createSuper(GlobalWidgetPrepareUpdateRepeaterRemove);

  function GlobalWidgetPrepareUpdateRepeaterRemove() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetPrepareUpdateRepeaterRemove);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetPrepareUpdateRepeaterRemove, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/repeater/remove';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-prepare-update-repeater-remove';
    }
  }]);
  return GlobalWidgetPrepareUpdateRepeaterRemove;
}(_baseGlobalWidgetPrepareUpdate["default"]);

exports.GlobalWidgetPrepareUpdateRepeaterRemove = GlobalWidgetPrepareUpdateRepeaterRemove;

},{"../../../base-global-widget-prepare-update":21,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],27:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetSaveTemplates = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetSaveTemplates = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(GlobalWidgetSaveTemplates, _window$$e$modules$ho);

  var _super = _createSuper(GlobalWidgetSaveTemplates);

  function GlobalWidgetSaveTemplates() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetSaveTemplates);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetSaveTemplates, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/save/save';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-save-templates';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      if (!Object.keys(window.$e.components.get('document/global').changedContainersId).length) {
        return false;
      }

      var _args$document = args.document,
          document = _args$document === void 0 ? elementor.documents.getCurrent() : _args$document;
      return document.config.panel.has_elements && args.status && -1 !== ['private', 'publish'].indexOf(args.status);
    }
  }, {
    key: "apply",
    value: function apply() {
      window.$e.internal('document/global/save-templates');
    }
  }]);
  return GlobalWidgetSaveTemplates;
}(window.$e.modules.hookData.After);

exports.GlobalWidgetSaveTemplates = GlobalWidgetSaveTemplates;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GlobalWidgetHistoryUpdate", {
  enumerable: true,
  get: function get() {
    return _globalWidgetHistoryUpdate.GlobalWidgetHistoryUpdate;
  }
});
Object.defineProperty(exports, "GlobalWidgetLoadTemplates", {
  enumerable: true,
  get: function get() {
    return _globalWidgetLoadTemplates.GlobalWidgetLoadTemplates;
  }
});
Object.defineProperty(exports, "GlobalWidgetPrepareUpdateElementSetSettings", {
  enumerable: true,
  get: function get() {
    return _globalWidgetPrepareUpdateElementSetSettings.GlobalWidgetPrepareUpdateElementSetSettings;
  }
});
Object.defineProperty(exports, "GlobalWidgetDoUpdate", {
  enumerable: true,
  get: function get() {
    return _globalWidgetDoUpdate.GlobalWidgetDoUpdate;
  }
});
Object.defineProperty(exports, "GlobalWidgetPrepareUpdateRepeaterInsert", {
  enumerable: true,
  get: function get() {
    return _globalWidgetPrepareUpdateRepeaterInsert.GlobalWidgetPrepareUpdateRepeaterInsert;
  }
});
Object.defineProperty(exports, "GlobalWidgetPrepareUpdateRepeaterRemove", {
  enumerable: true,
  get: function get() {
    return _globalWidgetPrepareUpdateRepeaterRemove.GlobalWidgetPrepareUpdateRepeaterRemove;
  }
});
Object.defineProperty(exports, "GlobalWidgetSaveTemplates", {
  enumerable: true,
  get: function get() {
    return _globalWidgetSaveTemplates.GlobalWidgetSaveTemplates;
  }
});

var _globalWidgetHistoryUpdate = require("./ui/elements/set-settings/global-widget-history-update");

var _globalWidgetLoadTemplates = require("./data/document/attach-preview/global-widget-load-templates");

var _globalWidgetPrepareUpdateElementSetSettings = require("./data/document/elements/set-setting/global-widget-prepare-update-element-set-settings");

var _globalWidgetDoUpdate = require("./data/document/history/end-log/global-widget-do-update");

var _globalWidgetPrepareUpdateRepeaterInsert = require("./data/document/repeater/insert/global-widget-prepare-update-repeater-insert");

var _globalWidgetPrepareUpdateRepeaterRemove = require("./data/document/repeater/remove/global-widget-prepare-update-repeater-remove");

var _globalWidgetSaveTemplates = require("./data/document/save/global-widget-save-templates");

},{"./data/document/attach-preview/global-widget-load-templates":22,"./data/document/elements/set-setting/global-widget-prepare-update-element-set-settings":23,"./data/document/history/end-log/global-widget-do-update":24,"./data/document/repeater/insert/global-widget-prepare-update-repeater-insert":25,"./data/document/repeater/remove/global-widget-prepare-update-repeater-remove":26,"./data/document/save/global-widget-save-templates":27,"./ui/elements/set-settings/global-widget-history-update":29}],29:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalWidgetHistoryUpdate = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var GlobalWidgetHistoryUpdate = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(GlobalWidgetHistoryUpdate, _window$$e$modules$ho);

  var _super = _createSuper(GlobalWidgetHistoryUpdate);

  function GlobalWidgetHistoryUpdate() {
    (0, _classCallCheck2["default"])(this, GlobalWidgetHistoryUpdate);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(GlobalWidgetHistoryUpdate, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/elements/set-settings';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-global-widget-history-update';
    }
  }, {
    key: "getContainerType",
    value: function getContainerType() {
      return 'widget';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers;
      return !elementor.documents.getCurrent().history.getActive() && containers.some(function (container) {
        return container.model.get('templateID');
      });
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _args$containers2 = args.containers,
          containers = _args$containers2 === void 0 ? [args.container] : _args$containers2;
      containers.forEach(function (container) {
        return window.$e.components.get('document/global').updateGlobalsRecursive(container);
      });
    }
  }]);
  return GlobalWidgetHistoryUpdate;
}(window.$e.modules.hookUI.After);

exports.GlobalWidgetHistoryUpdate = GlobalWidgetHistoryUpdate;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],30:[function(require,module,exports){
"use strict";

module.exports = elementor.modules.layouts.panel.pages.elements.views.Elements.extend({
  id: 'raven-global-templates',
  getEmptyView: function getEmptyView() {
    if (this.collection.length) {
      return null;
    }

    return require('./no-templates');
  },
  onFilterEmpty: function onFilterEmpty() {}
});

},{"./no-templates":31}],31:[function(require,module,exports){
"use strict";

var GlobalWidgetsView = elementor.modules.layouts.panel.pages.elements.views.Global;
module.exports = GlobalWidgetsView.extend({
  template: '#tmpl-raven-panel-global-widget-no-templates',
  id: 'raven-panel-global-widget-no-templates',
  className: 'raven-nerd-box raven-panel-nerd-box raven-responsive-panel-stretch'
});

},{}],32:[function(require,module,exports){
"use strict";

var _i18n = require("@wordpress/i18n");

module.exports = window.Marionette.ItemView.extend({
  id: 'raven-panel-global-widget',
  template: '#tmpl-raven-panel-global-widget',
  ui: {
    editButton: '#raven-global-widget-locked-edit .raven-button',
    unlinkButton: '#raven-global-widget-locked-unlink .raven-button',
    loading: '#raven-global-widget-loading'
  },
  events: {
    'click @ui.editButton': 'onEditButtonClick',
    'click @ui.unlinkButton': 'onUnlinkButtonClick'
  },
  initialize: function initialize() {
    this.initUnlinkDialog();
  },
  buildUnlinkDialog: function buildUnlinkDialog() {
    var self = this;
    return window.elementorCommon.dialogsManager.createWidget('confirm', {
      id: 'raven-global-widget-unlink-dialog',
      headerMessage: (0, _i18n.__)('Unlink Widget', 'jupiterx-core'),
      message: (0, _i18n.__)('This will make the widget stop being global. It\'ll be reverted into being just a regular widget.', 'jupiterx-core'),
      position: {
        my: 'center center',
        at: 'center center'
      },
      strings: {
        confirm: (0, _i18n.__)('Unlink', 'jupiterx-core'),
        cancel: (0, _i18n.__)('Cancel', 'jupiterx-core')
      },
      onConfirm: function onConfirm() {
        self.getOption('editedView').unlink();
      }
    });
  },
  initUnlinkDialog: function initUnlinkDialog() {
    var _this = this;

    var dialog;

    this.getUnlinkDialog = function () {
      if (!dialog) {
        dialog = _this.buildUnlinkDialog();
      }

      return dialog;
    };
  },
  editGlobalModel: function editGlobalModel() {
    var editedView = this.getOption('editedView');
    window.$e.run('panel/editor/open', {
      model: editedView.getEditModel(),
      view: editedView
    });
  },
  onEditButtonClick: function onEditButtonClick() {
    this.editGlobalModel();
  },
  onUnlinkButtonClick: function onUnlinkButtonClick() {
    this.getUnlinkDialog().show();
  }
});

},{"@wordpress/i18n":96}],33:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Model = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _globalWidget = _interopRequireDefault(require("../global-widget"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Model = /*#__PURE__*/function (_elementor$modules$el) {
  (0, _inherits2["default"])(Model, _elementor$modules$el);

  var _super = _createSuper(Model);

  function Model() {
    (0, _classCallCheck2["default"])(this, Model);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Model, [{
    key: "initSettings",
    value: function initSettings() {
      // If global widget is created, the settings should come from recent template.
      // The widget that's hold the panel may not have the recent data, the template can be changed during the editing.
      if (window.$e.commands.is('document/elements/create')) {
        return this.initSettingsFromTemplate();
      }

      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Model.prototype), "initSettings", this).call(this);
    }
  }, {
    key: "initEditSettings",
    value: function initEditSettings() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(Model.prototype), "initEditSettings", this).call(this);
      this.get('editSettings').set('editTab', 'global');
    }
  }, {
    key: "initSettingsFromTemplate",
    value: function initSettingsFromTemplate() {
      var id = this.get('templateID'),
          component = window.$e.components.get('document/global'),
          data = window.$e.data.getCache(component, 'document/global/global-widget/templates/'.concat(id)) || this.attributes,
          elementModel = _globalWidget["default"].createGlobalModel.apply(this, [id, data]);

      this.set('settings', elementModel.get('settings'));
      elementorFrontend.config.elements.data[this.cid] = this.get('settings');
    }
  }]);
  return Model;
}(elementor.modules.elements.models.Element);

exports.Model = Model;
var _default = Model;
exports["default"] = _default;

},{"../global-widget":20,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/get":76,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],34:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.View = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var View = /*#__PURE__*/function (_elementor$modules$el) {
  (0, _inherits2["default"])(View, _elementor$modules$el);

  var _super = _createSuper(View);

  function View() {
    (0, _classCallCheck2["default"])(this, View);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(View, [{
    key: "className",
    value: function className() {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(View.prototype), "className", this).call(this) + ' elementor-global-widget elementor-global-' + this.model.get('templateID');
    }
  }, {
    key: "addInlineEditingAttributes",
    value: function addInlineEditingAttributes() {}
  }, {
    key: "unlink",
    value: function unlink() {
      window.$e.run('document/global/unlink', {
        container: this.getContainer()
      });
    }
  }, {
    key: "onEditRequest",
    value: function onEditRequest() {
      window.$e.route('panel/editor/global', {
        view: this
      });
    }
  }, {
    key: "getContextMenuGroups",
    value: function getContextMenuGroups() {
      // Remove 'Save as global' for global widget view.
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(View.prototype), "getContextMenuGroups", this).call(this).filter(function (group) {
        return 'save' !== group.name;
      });
    }
  }, {
    key: "getContainer",
    value: function getContainer() {
      if (this.container) {
        return this.container;
      }

      var container = (0, _get2["default"])((0, _getPrototypeOf2["default"])(View.prototype), "getContainer", this).call(this);
      container.label = container.label + ' (global)';
      return container;
    }
  }, {
    key: "render",
    value: function render() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(View.prototype), "render", this).call(this);
      setTimeout(this.removeInlineAddingAttributes.bind(this));
    }
  }, {
    key: "removeInlineAddingAttributes",
    value: function removeInlineAddingAttributes() {
      var globalWidgetElementDom = this.el.querySelector('.elementor-inline-editing');

      if (globalWidgetElementDom) {
        globalWidgetElementDom.classList.remove('elementor-inline-editing');
      }
    }
  }]);
  return View;
}(elementor.modules.elements.views.Widget);

exports.View = View;
var _default = View;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/get":76,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],35:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Component = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var hooks = _interopRequireWildcard(require("./hooks/"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Component = /*#__PURE__*/function (_window$$e$modules$Co) {
  (0, _inherits2["default"])(Component, _window$$e$modules$Co);

  var _super = _createSuper(Component);

  function Component() {
    (0, _classCallCheck2["default"])(this, Component);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Component, [{
    key: "getNamespace",
    value: function getNamespace() {
      return 'forms';
    }
  }, {
    key: "defaultHooks",
    value: function defaultHooks() {
      return this.importHooks(hooks);
    }
  }]);
  return Component;
}(window.$e.modules.ComponentBase);

exports.Component = Component;
var _default = Component;
exports["default"] = _default;

},{"./hooks/":39,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/interopRequireWildcard":80,"@babel/runtime/helpers/possibleConstructorReturn":83}],36:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _module = _interopRequireDefault(require("../module"));

var _component = _interopRequireDefault(require("./component"));

var Form = _module["default"].extend({
  // TODO: Translation ready.
  selectOptions: {
    "default": {
      '': 'Select one'
    },
    fetching: {
      fetching: 'Fetching...'
    },
    noList: {
      no_list: 'No list found'
    }
  },
  action: null,
  onInit: function onInit() {
    var _this = this;

    elementor.channels.editor.on('section:activated', this.onSectionActivated);

    if (this.onElementChange) {
      elementor.channels.editor.on('change', function (controlView, elementView) {
        _this.onElementChange(controlView.model.get('name'), controlView, elementView);
      });
    }

    this.onElementorInitComponents();
  },
  updateList: function updateList(params) {
    var self = this; // Set fetching option.

    self.setOptions(this.selectOptions.fetching);
    self.setSelectedOption(); // Send AJAX request to fetch list.

    wp.ajax.send('raven_form_editor', {
      data: _.extend({}, {
        params: params
      }, {
        nonce: elementor.config.jx_nonce,
        service: self.action,
        request: 'get_list'
      }),
      success: self.doSuccess
    });
  },
  updateFieldMapping: function updateFieldMapping() {
    var self = this;

    _.each(self.fields, function (field, fieldKey) {
      var control = self.getControl(fieldKey);
      var controlView = self.getControlView(fieldKey);
      var options = {};
      var fieldItems = self.getRepeaterItemsByLabel('fields', field.filter);

      _.extend(options, self.selectOptions["default"], fieldItems);

      self.setOptions(options, control, controlView);
    });
  },
  getListControl: function getListControl() {
    return this.getControl("".concat(this.action, "_list"));
  },
  getListControlView: function getListControlView() {
    return this.getControlView("".concat(this.action, "_list"));
  },
  setOptions: function setOptions(options) {
    var control = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var controlView = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (control === null) {
      control = this.getListControl();
      controlView = this.getListControlView();
    }

    control.set('options', options);
    controlView.render();
  },
  setSelectedOption: function setSelectedOption() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var controlView = this.getListControlView();
    controlView.$el.find('select').prop('selectedIndex', index);
  },
  getRepeaterItemsByLabel: function getRepeaterItemsByLabel(propertyName, filter) {
    var items = {};
    var fieldItems = this.getElementSettings(this.model, propertyName);

    _.filter(fieldItems, function (item) {
      if (filter && item.type !== filter) {
        return;
      }

      if ('step' === item.type) {
        return;
      }

      items[item._id] = item.type;

      if (item.placeholder) {
        items[item._id] = item.placeholder;
      }

      if (item.label) {
        items[item._id] = item.label;
      }
    });

    return items;
  },
  onElementorInitComponents: function onElementorInitComponents() {
    window.$e.components.register(new _component["default"]({
      manager: this
    }));
  }
});

var _default = Form;
exports["default"] = _default;

},{"../module":41,"./component":35,"@babel/runtime/helpers/interopRequireDefault":79}],37:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormFieldsSanitizeCustomId = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormFieldsSanitizeCustomId = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(FormFieldsSanitizeCustomId, _window$$e$modules$ho);

  var _super = _createSuper(FormFieldsSanitizeCustomId);

  function FormFieldsSanitizeCustomId() {
    (0, _classCallCheck2["default"])(this, FormFieldsSanitizeCustomId);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FormFieldsSanitizeCustomId, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/elements/settings';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-forms-fields-sanitize-custom-id';
    }
  }, {
    key: "getContainerType",
    value: function getContainerType() {
      return 'repeater';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      return undefined !== args.settings.field_custom_id;
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers,
          settings = args.settings,
          customId = settings.field_custom_id;

      if (customId.match(/[^\w]/g)) {
        // Re-render with old settings.
        containers.forEach(function (container) {
          var panelView = container.panel.getControlView('fields'),
              currentItemView = panelView.children.findByModel(container.settings),
              idView = currentItemView.children.find(function (view) {
            return 'field_custom_id' === view.model.get('name');
          });
          idView.render();
          idView.$el.find('input').trigger('focus');
        });
        return false;
      }

      return true;
    }
  }]);
  return FormFieldsSanitizeCustomId;
}(window.$e.modules.hookData.Dependency);

exports.FormFieldsSanitizeCustomId = FormFieldsSanitizeCustomId;
var _default = FormFieldsSanitizeCustomId;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],38:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormFieldsSetCustomId = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormFieldsSetCustomId = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(FormFieldsSetCustomId, _window$$e$modules$ho);

  var _super = _createSuper(FormFieldsSetCustomId);

  function FormFieldsSetCustomId() {
    (0, _classCallCheck2["default"])(this, FormFieldsSetCustomId);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FormFieldsSetCustomId, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/repeater/insert';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-forms-fields-set-custom-id';
    }
  }, {
    key: "getContainerType",
    value: function getContainerType() {
      return 'widget';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      return 'fields' === args.name;
    }
  }, {
    key: "apply",
    value: function apply(args, model) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers,
          isDuplicate = window.$e.commands.isCurrentFirstTrace('document/repeater/duplicate');
      containers.forEach(function (container) {
        var itemContainer = container.repeaters.fields.children.find(function (childrenContainer) {
          // Sometimes, one of children is {Empty}.
          if (childrenContainer) {
            return model.get('_id') === childrenContainer.id;
          }

          return false;
        });

        if (!isDuplicate && itemContainer.settings.get('field_custom_id')) {
          return;
        }

        window.$e.run('document/elements/settings', {
          container: itemContainer,
          settings: {
            field_custom_id: 'field_' + itemContainer.id
          },
          options: {
            external: true
          }
        });
      });
      return true;
    }
  }]);
  return FormFieldsSetCustomId;
}(window.$e.modules.hookData.After);

exports.FormFieldsSetCustomId = FormFieldsSetCustomId;
var _default = FormFieldsSetCustomId;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormFieldsSanitizeCustomId", {
  enumerable: true,
  get: function get() {
    return _formFieldsSanitizeCustomId.FormFieldsSanitizeCustomId;
  }
});
Object.defineProperty(exports, "FormFieldsSetCustomId", {
  enumerable: true,
  get: function get() {
    return _formFieldsSetCustomId.FormFieldsSetCustomId;
  }
});
Object.defineProperty(exports, "FormFieldsUpdateShortCode", {
  enumerable: true,
  get: function get() {
    return _formFieldsUpdateShortcode.FormFieldsUpdateShortCode;
  }
});

var _formFieldsSanitizeCustomId = require("./data/form-fields-sanitize-custom-id");

var _formFieldsSetCustomId = require("./data/form-fields-set-custom-id");

var _formFieldsUpdateShortcode = require("./ui/form-fields-update-shortcode");

},{"./data/form-fields-sanitize-custom-id":37,"./data/form-fields-set-custom-id":38,"./ui/form-fields-update-shortcode":40}],40:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormFieldsUpdateShortCode = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormFieldsUpdateShortCode = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(FormFieldsUpdateShortCode, _window$$e$modules$ho);

  var _super = _createSuper(FormFieldsUpdateShortCode);

  function FormFieldsUpdateShortCode() {
    (0, _classCallCheck2["default"])(this, FormFieldsUpdateShortCode);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FormFieldsUpdateShortCode, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/elements/settings';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-forms-fields-update-shortcode';
    }
  }, {
    key: "getContainerType",
    value: function getContainerType() {
      return 'repeater';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      if (!window.$e.routes.isPartOf('panel/editor') || undefined === args.settings.field_custom_id) {
        return false;
      }

      return true;
    }
  }, {
    key: "apply",
    value: function apply(args) {
      var _args$containers = args.containers,
          containers = _args$containers === void 0 ? [args.container] : _args$containers;
      containers.forEach(function (container) {
        var panelView = container.panel.getControlView('fields'),
            currentItemView = panelView.children.find(function (view) {
          return container.id === view.model.get('_id');
        }),
            shortcodeView = currentItemView.children.find(function (view) {
          return 'shortcode' === view.model.get('name');
        });
        shortcodeView.render();
      });
    }
  }]);
  return FormFieldsUpdateShortCode;
}(window.$e.modules.hookUI.After);

exports.FormFieldsUpdateShortCode = FormFieldsUpdateShortCode;
var _default = FormFieldsUpdateShortCode;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Module = elementorModules.editor.utils.Module.extend({
  panel: null,
  getControl: function getControl(propertyName) {
    if (!this.panel) {
      return;
    }

    var control = this.panel.getCurrentPageView().collection.findWhere({
      name: propertyName
    });
    return control;
  },
  getControlView: function getControlView(propertyName) {
    if (!this.panel) {
      return;
    }

    var control = this.getControl(propertyName);
    var view = this.panel.getCurrentPageView().children.findByModelCid(control.cid);
    return view;
  },
  getControlValue: function getControlValue(id) {
    return this.getControlView(id).getControlValue();
  },
  addControlSpinner: function addControlSpinner(name) {
    var $el = this.getControlView(name).$el,
        $input = $el.find(':input');

    if ($input.attr('disabled') || $el.find('.elementor-control-spinner').length > 0) {
      return;
    }

    $input.attr('disabled', true);
    $el.find('.elementor-control-title').after('<span style="display:inline-flex" class="elementor-control-spinner"><span class="fa fa-spinner fa-spin"></span>&nbsp;</span>');
  },
  removeControlSpinner: function removeControlSpinner(name) {
    var $el = this.getControlView(name).$el;
    $el.find(':input').attr('disabled', false);
    $el.find('.elementor-control-spinner').remove();
  },
  getElementSettings: function getElementSettings(model, name) {
    if (!model) {
      return null;
    }

    var value = model.get('settings').get(name);
    return value instanceof window.Backbone.Collection ? value.toJSON() : value;
  }
});
var _default = Module;
exports["default"] = _default;

},{}],42:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Component = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var hooks = _interopRequireWildcard(require("./hooks/"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Component = /*#__PURE__*/function (_window$$e$modules$Co) {
  (0, _inherits2["default"])(Component, _window$$e$modules$Co);

  var _super = _createSuper(Component);

  function Component() {
    (0, _classCallCheck2["default"])(this, Component);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(Component, [{
    key: "getNamespace",
    value: function getNamespace() {
      return 'video-playlist';
    }
  }, {
    key: "defaultHooks",
    value: function defaultHooks() {
      return this.importHooks(hooks);
    }
  }]);
  return Component;
}(window.$e.modules.ComponentBase);

exports.Component = Component;
var _default = Component;
exports["default"] = _default;

},{"./hooks/":43,"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/interopRequireWildcard":80,"@babel/runtime/helpers/possibleConstructorReturn":83}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActiveTab", {
  enumerable: true,
  get: function get() {
    return _activeTab.ActiveTab;
  }
});

var _activeTab = require("./ui/document/elements/settings/active-tab");

},{"./ui/document/elements/settings/active-tab":44}],44:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ActiveTab = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ActiveTab = /*#__PURE__*/function (_window$$e$modules$ho) {
  (0, _inherits2["default"])(ActiveTab, _window$$e$modules$ho);

  var _super = _createSuper(ActiveTab);

  function ActiveTab() {
    (0, _classCallCheck2["default"])(this, ActiveTab);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(ActiveTab, [{
    key: "getCommand",
    value: function getCommand() {
      return 'document/elements/settings';
    }
  }, {
    key: "getId",
    value: function getId() {
      return 'raven-active-tab--document/elements/settings';
    }
  }, {
    key: "getContainerType",
    value: function getContainerType() {
      return 'repeater';
    }
  }, {
    key: "getConditions",
    value: function getConditions(args) {
      return args.settings.inner_tab_content_1 || args.settings.inner_tab_content_2;
    }
  }, {
    key: "apply",
    value: function apply(args) {
      if (args.settings.inner_tab_content_1) {
        args.container.view.model.get('editSettings').set('innerActiveIndex', 0);
      } else if (args.settings.inner_tab_content_2) {
        args.container.view.model.get('editSettings').set('innerActiveIndex', 1);
      }
    }
  }]);
  return ActiveTab;
}(window.$e.modules.hookData.After);

exports.ActiveTab = ActiveTab;
var _default = ActiveTab;
exports["default"] = _default;

},{"@babel/runtime/helpers/classCallCheck":73,"@babel/runtime/helpers/createClass":74,"@babel/runtime/helpers/getPrototypeOf":77,"@babel/runtime/helpers/inherits":78,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/possibleConstructorReturn":83}],45:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _module = _interopRequireDefault(require("../module"));

var _component = _interopRequireDefault(require("./component"));

var VideoPlaylist = _module["default"].extend({
  onInit: function onInit() {
    var activeElements = window.jupiterxOptions.activeElements;

    if ((0, _typeof2["default"])(window.jupiterxOptions.activeElements) === 'object') {
      activeElements = Object.values(window.jupiterxOptions.activeElements);
    }

    if (!activeElements.includes('video-playlist')) {
      return;
    }

    this.onElementorInitComponents();
    elementor.on('document:loaded', this.onElementorLoaded());
  },
  onElementorLoaded: function onElementorLoaded() {
    elementor.channels.editor.on('ravenPlaylistWidget:setVideoData', function (e) {
      window.$e.run('document/elements/settings', {
        container: e.container,
        settings: {
          thumbnail: {
            url: e.currentItem.thumbnail ? e.currentItem.thumbnail.url : ''
          },
          title: e.currentItem.video_title ? e.currentItem.video_title : '',
          duration: e.currentItem.duration ? e.currentItem.duration : ''
        },
        options: {
          external: true
        }
      });
    });
  },
  onElementorInitComponents: function onElementorInitComponents() {
    window.$e.components.register(new _component["default"]());
  }
});

new VideoPlaylist();

},{"../module":41,"./component":42,"@babel/runtime/helpers/interopRequireDefault":79,"@babel/runtime/helpers/typeof":87}],46:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

var _i18n = require("@wordpress/i18n");

function _default(panel, model, view) {
  var AdvancedNavMenu = _module["default"].extend({
    panel: panel,
    view: view,
    model: model,
    currentOrder: [],
    pointerOptions: {
      none: (0, _i18n.__)('None', 'jupiterx-core'),
      underline: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        fade: (0, _i18n.__)('Fade', 'jupiterx-core'),
        slide: (0, _i18n.__)('Slide', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        dropin: (0, _i18n.__)('Drop in', 'jupiterx-core'),
        dropout: (0, _i18n.__)('Drop out', 'jupiterx-core')
      },
      overline: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        fade: (0, _i18n.__)('Fade', 'jupiterx-core'),
        slide: (0, _i18n.__)('Slide', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        dropin: (0, _i18n.__)('Drop in', 'jupiterx-core'),
        dropout: (0, _i18n.__)('Drop out', 'jupiterx-core')
      },
      doubleline: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        fade: (0, _i18n.__)('Fade', 'jupiterx-core'),
        slide: (0, _i18n.__)('Slide', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        dropin: (0, _i18n.__)('Drop in', 'jupiterx-core'),
        dropout: (0, _i18n.__)('Drop out', 'jupiterx-core')
      },
      framed: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        fade: (0, _i18n.__)('Fade', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        shrink: (0, _i18n.__)('Shrink', 'jupiterx-core'),
        draw: (0, _i18n.__)('Draw', 'jupiterx-core'),
        corners: (0, _i18n.__)('Corners', 'jupiterx-core')
      },
      background: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        fade: (0, _i18n.__)('Fade', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        shrink: (0, _i18n.__)('Shrink', 'jupiterx-core'),
        sweep_left: (0, _i18n.__)('Sweep Left', 'jupiterx-core'),
        sweep_right: (0, _i18n.__)('Sweep Right', 'jupiterx-core'),
        sweep_up: (0, _i18n.__)('Sweep Up', 'jupiterx-core'),
        sweep_down: (0, _i18n.__)('Sweep Down', 'jupiterx-core'),
        shutter_in_v: (0, _i18n.__)('Shutter In Vertical', 'jupiterx-core'),
        shutter_out_v: (0, _i18n.__)('Shutter Out Vertical', 'jupiterx-core'),
        shutter_in_h: (0, _i18n.__)('Shutter In Horizontal', 'jupiterx-core'),
        shutter_out_h: (0, _i18n.__)('Shutter Out Horizontal', 'jupiterx-core')
      },
      text: {
        none: (0, _i18n.__)('None', 'jupiterx-core'),
        grow: (0, _i18n.__)('Grow', 'jupiterx-core'),
        shrink: (0, _i18n.__)('Shrink', 'jupiterx-core'),
        sink: (0, _i18n.__)('Sink', 'jupiterx-core'),
        "float": (0, _i18n.__)('Float', 'jupiterx-core'),
        skew: (0, _i18n.__)('Skew', 'jupiterx-core'),
        rotate: (0, _i18n.__)('Rotate', 'jupiterx-core')
      }
    },
    onInit: function onInit() {
      this.watchMenuRepeater();
      elementor.channels.editor.on('section:activated', this.onSectionActivated);
      elementor.channels.editor.on('change', this.onElementChange);
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (section.model.id !== model.get('id')) {
        return;
      }

      if ('section_layout' === activeSection) {
        this.populatePointerAnimations();
      }

      if ('section_content' === activeSection) {
        this.watchMenuRepeater();
      }
    },
    onElementChange: function onElementChange(controlView) {
      var controlName = controlView.model.get('name'); // Populate "Pointer Animations" based on "Pointer Type".

      if ('pointer_type' === controlName) {
        this.populatePointerAnimations();
      }
    },
    populatePointerAnimations: function populatePointerAnimations() {
      var pointerType = this.getControlView('pointer_type').$el.find('select').val();
      var pointerAnimView = this.getControlView('pointer_animation');
      var newAnimOptions = this.pointerOptions[pointerType];
      pointerAnimView.model.set('options', newAnimOptions);
      pointerAnimView.render();

      if (!pointerAnimView.$el.find('select').val()) {
        pointerAnimView.$el.find('select').val('none').change();
        pointerAnimView.render();
      }
    },
    watchMenuRepeater: function watchMenuRepeater() {
      var _this$menuRepeater, _this$menuRepeater$$e;

      this.menuRepeater = this.getControlView('menu');

      if (!((_this$menuRepeater = this.menuRepeater) === null || _this$menuRepeater === void 0 ? void 0 : (_this$menuRepeater$$e = _this$menuRepeater.$el) === null || _this$menuRepeater$$e === void 0 ? void 0 : _this$menuRepeater$$e.length)) {
        return;
      }

      this.fixMargins();
      this.menuRepeater.on('add:child', this.onRowAddRemove);
      this.menuRepeater.on('remove:child', this.onRowAddRemove);
      this.menuRepeater.on('childview:childview:input:change', this.onTypeChange);
      this.updateOrders();
      this.menuRepeater.$el.off('sortupdate').on('sortupdate', this.onSortUpdate);
    },
    onRowAddRemove: function onRowAddRemove() {
      this.fixMargins();
      this.updateOrders();
      this.setRowDeleteListeners();
    },
    fixMargins: function fixMargins() {
      this.menuRepeater.children.each(function (row) {
        if ('submenu' !== row.model.get('item_type')) {
          row.$el.css('margin-left', '0');
          return;
        }

        row.$el.css('margin-left', '10px');
      });
    },
    setRowDeleteListeners: function setRowDeleteListeners() {
      this.menuRepeater.$el.find('.elementor-repeater-tool-remove').off('click', this.onRowDelete).on('click', this.onRowDelete);
    },
    onRowDelete: function onRowDelete(event) {
      var rowIndex = jQuery(event.target).closest('.elementor-repeater-fields').index();

      if (0 !== rowIndex || 'menu' === this.currentOrder[1].type) {
        return;
      }

      this.printError();
      event.preventDefault();
      event.stopPropagation();
    },
    updateOrders: function updateOrders() {
      var _this = this;

      this.currentOrder = [];
      this.menuRepeater.children.each(function (row) {
        var index = row.itemIndex - 1;
        var type = row.model.get('item_type');

        _this.currentOrder.push({
          index: index,
          type: type
        });
      });
      return this.currentOrder.sort(function (a, b) {
        return a.index - b.index;
      });
    },
    onSortUpdate: function onSortUpdate(event, data) {
      var _this$currentOrder$;

      this.updateOrders();
      var oldIndex = parseInt(data.item.data('oldIndex'));
      var newIndex = parseInt(data.item.index()); // If resorting results in the first row to be a "Sub Menu", prevent it and print an error.

      if (0 === newIndex && 'submenu' === this.currentOrder[oldIndex].type || 0 === oldIndex && 'submenu' === ((_this$currentOrder$ = this.currentOrder[1]) === null || _this$currentOrder$ === void 0 ? void 0 : _this$currentOrder$.type)) {
        this.printError();
        event.preventDefault();
        return;
      }

      setTimeout(this.menuRepeater.onSortUpdate.apply(this.menuRepeater, arguments), 0);
    },
    // eslint-disable-next-line no-unused-vars
    onTypeChange: function onTypeChange(row, control, event) {
      var changedControl = control.model.get('name');

      if ('item_type' !== changedControl) {
        return;
      }

      this.updateOrders();
      var index = parseInt(row.itemIndex - 1); // If the type of first row is changed to "Sub Menu", change it back to "Menu" and print an error.

      if (0 === index && 'submenu' === row.model.get('item_type')) {
        row.model.set('item_type', 'menu');
        row.render();
        this.printError();
        this.view.renderHTML();
        return;
      }

      this.fixMargins();
    },
    printError: function printError() {
      var _this2 = this;

      this.menuRepeater.$el.prev('.elementor-control-menu-error').remove();
      var message = (0, _i18n.__)('First item must be of type "Menu".', 'jupiterx-core');
      var node = "\n\t\t\t\t<div class=\"elementor-control elementor-control-menu-error elementor-control-type-raw_html elementor-label-inline elementor-control-separator-default\">\n\t\t\t\t\t<div class=\"elementor-control-content\">\n\t\t\t\t\t\t<div class=\"elementor-control-raw-html elementor-panel-alert elementor-panel-alert-danger\">".concat(message, "</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t");
      this.menuRepeater.$el.before(node);
      setTimeout(function () {
        return _this2.menuRepeater.$el.prev('.elementor-control-menu-error').remove();
      }, 5000);
    }
  });

  new AdvancedNavMenu({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79,"@wordpress/i18n":96}],47:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var Categories = _module["default"].extend({
    panel: panel,
    onInit: function onInit() {
      var self = this;
      self.doAjax();
      elementor.channels.editor.on('change', function (controlView) {
        self.onElementChange(controlView.model.get('name'));
      });
    },
    onElementChange: function onElementChange(propertyName) {
      if (propertyName !== 'source') {
        return;
      }

      var specificCategoriesControl = this.getControlView('specific_categories');
      specificCategoriesControl.setValue('');
      specificCategoriesControl.render();
      this.doAjax();
    },
    doAjax: function doAjax() {
      var self = this;
      wp.ajax.send('raven_categories_editor', {
        data: {
          post_type: self.getElementSettings(model, 'source')
        },
        success: self.onSuccess
      });
    },
    onSuccess: function onSuccess(response) {
      var _this = this;

      var options = {};
      var controlIds = ['specific_categories', 'exclude'];

      _.each(response, function (term) {
        options[term.term_id] = term.name;
      });

      _.each(controlIds, function (controlId) {
        var control = _this.getControl(controlId);

        var controlView = _this.getControlView(controlId);

        control.set('options', options);

        if (!controlView) {
          return;
        }

        controlView.render();
      });
    }
  });

  new Categories({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],48:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var FlipBox = _module["default"].extend({
    panel: panel,
    model: model,
    view: view,
    onInit: function onInit() {
      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    onSectionActivated: function onSectionActivated(sectionName, editor) {
      var editedElement = editor.getOption('editedElementView');

      if ('raven-flip-box' !== editedElement.model.get('widgetType')) {
        return;
      }

      var isSideBSection = -1 !== ['section_side_back_content', 'section_style_back'].indexOf(sectionName);
      editedElement.$el.toggleClass('raven-flip-box--flipped', isSideBSection);
      var $backLayer = editedElement.$el.find('.raven-flip-box__back');

      if (isSideBSection) {
        $backLayer.css('transition', 'none');
      }

      if (!isSideBSection) {
        setTimeout(function () {
          $backLayer.css('transition', '');
        }, 10);
      }
    }
  });

  new FlipBox({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(panel, model, view) {
  var formActions = {
    mailchimp: require('./forms/mailchimp')["default"],
    activecampaign: require('./forms/activecampaign')["default"],
    hubspot: require('./forms/hubspot')["default"],
    email: require('./forms/email')["default"],
    email2: require('./forms/email2')["default"],
    drip: require('./forms/drip')["default"],
    convertkit: require('./forms/convertkit')["default"],
    getresponse: require('./forms/getresponse')["default"],
    mailerlite: require('./forms/mailerlite')["default"],
    discord: require('./forms/discord')["default"],
    steps: require('./forms/steps')["default"],
    itiTel: require('./forms/tel-field')["default"]
  };

  for (var action in formActions) {
    formActions[action](panel, model, view);
  }
}

},{"./forms/activecampaign":50,"./forms/convertkit":51,"./forms/discord":53,"./forms/drip":54,"./forms/email":55,"./forms/email2":56,"./forms/getresponse":57,"./forms/hubspot":58,"./forms/mailchimp":59,"./forms/mailerlite":60,"./forms/steps":61,"./forms/tel-field":62}],50:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var ActiveCampaign = _form["default"].extend({
    panel: panel,
    model: model,
    action: 'activecampaign',
    remoteFields: [],
    onSectionActivated: function onSectionActivated(activeSection, section) {
      var _this = this;

      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      this.addControlSpinner('activecampaign_fields_mapping');
      this.updateList({
        activecampaign_api_key_source: this.getControlValue('activecampaign_api_key_source') || 'default',
        activecampaign_api_key: this.getControlValue('activecampaign_api_key'),
        activecampaign_api_url: this.getControlValue('activecampaign_api_url')
      });
      this.getControlView('activecampaign_fields_mapping').on('add:child', function () {
        _this.updateFieldMapping();
      });
    },
    updateFieldMapping: function updateFieldMapping() {
      var _this2 = this;

      var fieldsMapControlView = this.getControlView('activecampaign_fields_mapping');
      fieldsMapControlView.children.each(function (repeaterRow) {
        repeaterRow.children.each(function (repeaterRowField) {
          var fieldName = repeaterRowField.model.get('name');
          var fieldModel = repeaterRowField.model;

          if (fieldName === 'activecampaign_remote_field') {
            fieldModel.set('options', _this2.getRemoteFields());
          } else if (fieldName === 'activecampaign_local_field') {
            fieldModel.set('options', _this2.getFormFields());
          }

          repeaterRowField.render();
        });
      });
      this.removeControlSpinner('activecampaign_fields_mapping');
    },
    clearFieldMapping: function clearFieldMapping() {
      var fieldsMapControlView = this.getControlView('activecampaign_fields_mapping');
      fieldsMapControlView.collection.each(function (modelItem) {
        if (modelItem) {
          modelItem.destroy();
        }
      });
      fieldsMapControlView.render();
    },
    doSuccess: function doSuccess(response) {
      var self = this;
      var options = {};
      var lists = {};
      var activecampaignList = this.getElementSettings(this.model, "".concat(self.action, "_list"));

      if (response.success[0].lists.length === 0) {
        self.setOptions(this.selectOptions.noList);
        self.setSelectedOption();
        return;
      }

      _.each(response.success[0].lists, function (list) {
        lists[list.id] = list.name;
      });

      _.extend(options, {
        0: 'select one'
      }, lists);

      self.setOptions(options);

      if (!activecampaignList.length) {
        self.setSelectedOption();
      }

      this.remoteFields = response.success[0].fields;
      this.updateFieldMapping(this.remoteFields);
    },
    onElementChange: function onElementChange(setting) {
      if (setting === 'activecampaign_api_key_source' || setting === 'activecampaign_api_key' || setting === 'activecampaign_api_url') {
        this.updateList({
          activecampaign_api_key_source: this.getControlValue('activecampaign_api_key_source') || 'default',
          activecampaign_api_key: this.getControlValue('activecampaign_api_key'),
          activecampaign_api_url: this.getControlValue('activecampaign_api_url')
        });
      }

      if (setting === 'mailchimp_list') {
        this.clearFieldMapping();
        this.onListUpdate();
      }
    },
    getRemoteFields: function getRemoteFields() {
      return _.reduce(this.remoteFields, function (carry, remoteField) {
        carry[remoteField.remote_tag] = remoteField.remote_label;
        return carry;
      }, {
        '': '- None -'
      });
    },
    getFormFields: function getFormFields() {
      return _.extend({}, {
        '': '- None -'
      }, this.getRepeaterItemsByLabel('fields'));
    }
  });

  new ActiveCampaign({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],51:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _crmBase = _interopRequireDefault(require("./crm/crm-base"));

function _default(panel, model, view) {
  var ConvertKit = _crmBase["default"].extend({
    panel: panel,
    model: model,
    action: 'convertkit',
    updateAdditionalControls: function updateAdditionalControls() {
      if (!this.additionalData.hasOwnProperty('tags')) {
        return;
      }

      var tagsControl = this.getControlView("".concat(this.action, "_tags"));
      tagsControl.model.set('options', this.additionalData.tags);
      tagsControl.render();
    }
  });

  new ConvertKit({
    $element: view.$el
  });
}

},{"./crm/crm-base":52,"@babel/runtime/helpers/interopRequireDefault":79}],52:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _module = _interopRequireDefault(require("../../../utils/module"));

var _i18n = require("@wordpress/i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = _module["default"].extend({
  panel: null,
  model: null,
  action: null,
  listView: null,
  listOptions: {
    none: {
      none: (0, _i18n.__)('Select...', 'jupiterx-core')
    },
    fetching: {
      fetching: (0, _i18n.__)('Fetching...', 'jupiterx-core')
    },
    noList: {
      noList: (0, _i18n.__)('Nothing found!', 'jupiterx-core')
    }
  },
  fieldNoneOption: {
    '': (0, _i18n.__)('-NONE-', 'jupiterx-core')
  },
  mappingRepeater: null,
  localFields: {},
  additionalData: [],
  onInit: function onInit() {
    elementor.channels.editor.on('section:activated', this.onSectionActivated);
    elementor.channels.editor.on('change', this.onElementChange);
  },
  onDestroy: function onDestroy() {
    elementor.channels.editor.off('change', this.onElementChange);
  },
  onSectionActivated: function onSectionActivated(activeSection, section) {
    if (activeSection !== "section_".concat(this.action) || section.model.id !== this.model.get('id')) {
      return;
    }

    this.init();
  },
  init: function init() {
    this.localFields = _objectSpread(_objectSpread({}, this.fieldNoneOption), this.getFormFields());
    this.listView = this.getControlView("".concat(this.action, "_list"));
    this.mappingRepeater = this.getControlView("".concat(this.action, "_fields_mapping"));
    this.ajaxUpdateList();
    this.updateControls();
    this.mappingRepeater.on('add:child', this.updateControls);
    this.mappingRepeater.on('childview:click:remove', this.updateControls);
  },
  ajaxUpdateList: function ajaxUpdateList() {
    var _this = this;

    var currentValue = this.getControlValue("".concat(this.action, "_list"));
    this.setListOptions(this.listOptions.fetching);
    this.setListSelection('fetching');
    this.addControlSpinner("".concat(this.action, "_list"));
    var params = {};
    params["".concat(this.action, "_api_key_source")] = this.getControlValue("".concat(this.action, "_api_key_source")) || 'default';
    params["".concat(this.action, "_custom_api_key")] = this.getControlValue("".concat(this.action, "_custom_api_key"));
    this.add_additional_api_data(params);
    wp.ajax.send('raven_form_editor', {
      cache: false,
      data: {
        params: params,
        nonce: elementor.config.jx_nonce,
        service: this.action,
        request: 'get_list'
      },
      success: function success(response) {
        _this.removeControlSpinner("".concat(_this.action, "_list"));

        var lists = {};

        if (response.success[0].lists.length === 0) {
          _this.setListOptions(_this.listOptions.noList);

          _this.setListSelection('noList');

          return;
        }

        _.each(response.success[0].lists, function (list, id) {
          lists[id] = list;
        });

        var options = _objectSpread(_objectSpread({}, _this.listOptions.none), lists);

        _this.setListOptions(options);

        if (options[currentValue]) {
          _this.setListSelection(currentValue);

          return;
        }

        if (_.isEmpty(_this.listView.$el.val())) {
          _this.setListSelection('none');
        }
      },
      error: function error() {
        _this.removeControlSpinner("".concat(_this.action, "_list"));

        _this.listView.$el.find('option').text((0, _i18n.__)('Error! nonce mismatch', 'jupiterx-core'));

        _this.listView.$el.find('select').attr('disabled', 'disabled');
      }
    });
  },
  ajaxUpdateAdditionalData: function ajaxUpdateAdditionalData() {
    var _this2 = this;

    var params = {};
    params["".concat(this.action, "_api_key_source")] = this.getControlValue("".concat(this.action, "_api_key_source")) || 'default';
    params["".concat(this.action, "_custom_api_key")] = this.getControlValue("".concat(this.action, "_custom_api_key"));
    params.list_id = this.getListId();
    this.add_additional_api_data(params);
    this.toggleSpinner(true);
    wp.ajax.send('raven_form_editor', {
      data: {
        params: params,
        nonce: elementor.config.jx_nonce,
        service: this.action,
        request: 'get_additional_data'
      },
      success: function success(response) {
        _this2.additionalData = response.success[0];

        _this2.updateControls();
      },
      complete: function complete() {
        return _this2.toggleSpinner(false);
      }
    });
  },
  updateControls: function updateControls() {
    var _this3 = this;

    this.mappingRepeater.children.each(function (row) {
      row.children.each(function (control) {
        var fieldModel = control.model;
        var fieldName = fieldModel.get('name');

        switch (fieldName) {
          case 'remote_field':
            if (!_this3.additionalData.hasOwnProperty('custom_fields')) {
              break;
            }

            var currentOptions = fieldModel.get('options');

            var newOptions = _objectSpread(_objectSpread(_objectSpread({}, _this3.fieldNoneOption), currentOptions), _this3.additionalData.custom_fields);

            fieldModel.set('options', newOptions);
            break;

          case 'local_field':
            fieldModel.set('options', _this3.localFields);
            break;

          default:
            break;
        }

        control.render();
      });

      _this3.fixTitleField(row);
    });
    this.sortSelectOptions();
    this.lockRequiredRemoteFields();
    this.updateAdditionalControls();
  },
  onElementChange: function onElementChange(controlView) {
    var setting = controlView.model.get('name');

    switch (setting) {
      case "".concat(this.action, "_api_key_source"):
      case "".concat(this.action, "_custom_api_key"):
        this.ajaxUpdateList();
        break;

      case "".concat(this.action, "_list"):
        var listId = this.getListId();

        if (listId && !this.listOptions.hasOwnProperty(listId)) {
          this.ajaxUpdateAdditionalData();
        }

        break;
    }
  },
  getListId: function getListId() {
    return this.getControlValue("".concat(this.action, "_list"));
  },
  // Set Options of the "List" select control.
  setListOptions: function setListOptions(options) {
    this.listView.model.set('options', options);
    this.listView.render(); // Sort options so that the "Select..." option comes first.

    var select = this.listView.$el.find('select');
    var firstOption = select.find('option[value="none"]');

    if (!firstOption.length) {
      return;
    }

    var helper = firstOption[0];
    firstOption.remove();
    select.prepend(helper);
  },
  setListSelection: function setListSelection(option) {
    this.listView.$el.find('select').val(option).change();
  },
  // Sort mapping fields options so that the "-NONE-" option comes first.
  sortSelectOptions: function sortSelectOptions() {
    var selects = this.mappingRepeater.$el.find('select');

    _.each(selects, function (select) {
      var firstOption = jQuery(select).find('option[value=""]');

      if (!firstOption.length) {
        return;
      }

      var helper = firstOption[0];
      firstOption.remove();
      select.prepend(helper);
    });
  },
  getFormFields: function getFormFields() {
    var items = {};
    var formFieldsRepeater = this.getElementSettings(this.model, 'fields');

    _.each(formFieldsRepeater, function (item) {
      items[item._id] = item.label;
    });

    return items;
  },
  // Find required remote fields, lock them, remove their repeater row styles, and add a star next to them.
  lockRequiredRemoteFields: function lockRequiredRemoteFields() {
    this.mappingRepeater.children.each(function (row) {
      if (row.model.get('is_required')) {
        var toolbar = row.$el.find('div.elementor-repeater-row-tools');
        var controlWrapper = row.$el.find('div.elementor-repeater-row-controls');
        var remoteField = row.$el.find('div.elementor-control-remote_field');
        var localField = row.$el.find('div.elementor-control-local_field');
        var localLabel = localField.find('label');
        var newLabel = remoteField.find('select option:selected').text();
        var starMark = '<span style="color:red">*</span>';
        toolbar.hide();
        controlWrapper.show();
        controlWrapper.css('border', 'none');
        remoteField.hide();
        localLabel.html(newLabel + starMark);
        localField.css('padding', '0');
      }
    });
  },
  // Set titles of repeater rows so that they show "label" of remote fields instead of their "key".
  fixTitleField: function fixTitleField(rowView) {
    if (rowView.data) {
      rowView = rowView.data.rowView;
    }

    var remoteFieldSelect = rowView.$el.find('select[data-setting="remote_field"]');
    var label = remoteFieldSelect.find("option[value=\"".concat(remoteFieldSelect.val(), "\"]")).first().text();
    rowView.$el.find('div.elementor-repeater-row-item-title').text(label);
    remoteFieldSelect.off('change', this.fixTitleField).change({
      rowView: rowView
    }, this.fixTitleField);
  },
  // While additional data about the selected list is being recieved,
  // toggle a spinner and opaque its corresopnding fields.
  toggleSpinner: function toggleSpinner(state) {
    var containers = jQuery(".elementor-control.elementor-control-".concat(this.action, "_list")).nextAll();
    containers.css('opacity', state ? 0.5 : 1);

    if (state) {
      var spinner = "\n\t\t\t\t<span style=\"position: absolute; top: 15px; right: 15px;\" class=\"elementor-control-spinner\">\n\t\t\t\t\t<span style=\"font-size: 20px\" class=\"fa fa-spinner fa-spin\"></span>\n\t\t\t\t\t&nbsp;\n\t\t\t\t</span>\n\t\t\t";
      containers.first().prepend(spinner);
      return;
    }

    containers.first().find('span.elementor-control-spinner').remove();
  },
  // Placed to be overridden if needed.

  /* eslint-disable no-unused-vars */
  add_additional_api_data: function add_additional_api_data(params) {},

  /* eslint-enable no-unused-vars */
  // Placed to be overridden if needed.
  updateAdditionalControls: function updateAdditionalControls() {}
});

exports["default"] = _default;

},{"../../../utils/module":41,"@babel/runtime/helpers/defineProperty":75,"@babel/runtime/helpers/interopRequireDefault":79,"@wordpress/i18n":96}],53:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var Discord = _form["default"].extend({
    panel: panel,
    model: model,
    action: 'discord',
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      } // Populate the <Form Fields> select2 field with user selected fields.


      var fields = this.getFormFields();
      var discordFormFieldsView = this.getControlView('discord_form_fields');
      discordFormFieldsView.model.set('options', fields);
      discordFormFieldsView.render();
    },
    getFormFields: function getFormFields() {
      var items = {};
      var fieldItems = this.getElementSettings(this.model, 'fields');
      var excludeTypes = ['recaptcha', 'recaptcha_v3', 'file', 'step'];

      _.filter(fieldItems, function (item) {
        if (excludeTypes.includes(item.type)) {
          return;
        }

        items[item._id] = item.type;

        if (item.placeholder) {
          items[item._id] = item.placeholder;
        }

        if (item.label) {
          items[item._id] = item.label;
        }
      });

      return items;
    }
  });

  new Discord({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],54:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _crmBase = _interopRequireDefault(require("./crm/crm-base"));

function _default(panel, model, view) {
  var Drip = _crmBase["default"].extend({
    panel: panel,
    model: model,
    action: 'drip',
    updateAdditionalControls: function updateAdditionalControls() {
      if (!this.additionalData.hasOwnProperty('tags')) {
        return;
      }

      var tagsControl = this.getControlView("".concat(this.action, "_tags"));
      tagsControl.model.set('options', this.additionalData.tags);
      tagsControl.render();
    }
  });

  new Drip({
    $element: view.$el
  });
}

},{"./crm/crm-base":52,"@babel/runtime/helpers/interopRequireDefault":79}],55:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var Email = _form["default"].extend({
    panel: panel,
    model: model,
    action: 'email',
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      var replyToOptionsControl = this.getControlView('email_reply_to_options');

      if (!replyToOptionsControl) {
        return;
      }

      replyToOptionsControl.model.set('options', this.getEmailFields());
      replyToOptionsControl.render();
    },
    getEmailFields: function getEmailFields() {
      return _.extend({}, {
        custom: 'Custom'
      }, this.getRepeaterItemsByLabel('fields', 'email'));
    }
  });

  new Email({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],56:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var Email2 = _form["default"].extend({
    panel: panel,
    model: model,
    action: 'email2',
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      var replyToOptionsControl = this.getControlView('email_reply_to_options2');

      if (!replyToOptionsControl) {
        return;
      }

      replyToOptionsControl.model.set('options', this.getEmailFields());
      replyToOptionsControl.render();
    },
    getEmailFields: function getEmailFields() {
      return _.extend({}, {
        custom: 'Custom'
      }, this.getRepeaterItemsByLabel('fields', 'email'));
    }
  });

  new Email2({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],57:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _crmBase = _interopRequireDefault(require("./crm/crm-base"));

function _default(panel, model, view) {
  var GetResponse = _crmBase["default"].extend({
    panel: panel,
    model: model,
    action: 'getresponse',
    updateAdditionalControls: function updateAdditionalControls() {
      if (!this.additionalData.hasOwnProperty('tags')) {
        return;
      }

      var tagsControl = this.getControlView("".concat(this.action, "_tags"));
      tagsControl.model.set('options', this.additionalData.tags);
      tagsControl.render();
    }
  });

  new GetResponse({
    $element: view.$el
  });
}

},{"./crm/crm-base":52,"@babel/runtime/helpers/interopRequireDefault":79}],58:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("./../../utils/module"));

function _default(panel, model, view) {
  var Hubspot = _module["default"].extend({
    panel: panel,
    action: 'hubspot',
    onInit: function onInit() {
      elementor.channels.editor.on('section:activated', this.onSectionActivated.bind(this));
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      var _this = this;

      if (section.model.id !== model.get('id')) {
        return;
      }

      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      this.updateFieldMapping();
      this.getControlView('hubspot_mapping').on('add:child', function () {
        _this.updateFieldMapping();
      });
    },
    updateFieldMapping: function updateFieldMapping() {
      var _this2 = this;

      var fieldsMapControlView = this.getControlView('hubspot_mapping');
      fieldsMapControlView.children.each(function (repeaterRow) {
        repeaterRow.children.each(function (repeaterRowField) {
          var fieldName = repeaterRowField.model.get('name');
          var fieldModel = repeaterRowField.model;

          if (fieldName === 'hubspot_local_form_field') {
            fieldModel.set('options', _this2.getFormFields());
          }

          repeaterRowField.render();
        });
      });
    },
    getRepeaterItemsByLabel: function getRepeaterItemsByLabel(propertyName, filter) {
      var items = {};
      var fieldItems = this.getElementSettings(model, propertyName);

      _.filter(fieldItems, function (item) {
        if (filter && item.type !== filter) {
          return;
        }

        items[item._id] = item.label;
      });

      return items;
    },
    getFormFields: function getFormFields() {
      return _.extend({}, {
        '': '- None -'
      }, this.getRepeaterItemsByLabel('fields'));
    }
  });

  new Hubspot({
    $element: view.$el
  });
}

},{"./../../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],59:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var Mailchimp = _form["default"].extend({
    panel: panel,
    model: model,
    action: 'mailchimp',
    remoteFields: [],
    onSectionActivated: function onSectionActivated(activeSection, section) {
      var _this = this;

      if (activeSection !== "section_".concat(this.action)) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      this.addControlSpinner('mailchimp_fields_mapping');
      this.addControlSpinner('mailchimp_groups');
      this.updateList({
        mailchimp_api_key_source: this.getControlValue('mailchimp_api_key_source') || 'default',
        mailchimp_api_key: this.getControlValue('mailchimp_api_key')
      });
      this.getControlView('mailchimp_fields_mapping').on('add:child', function () {
        _this.updateFieldMapping();
      });
    },
    updateFieldMapping: function updateFieldMapping() {
      var _this2 = this;

      var fieldsMapControlView = this.getControlView('mailchimp_fields_mapping');
      fieldsMapControlView.children.each(function (repeaterRow) {
        repeaterRow.children.each(function (repeaterRowField) {
          var fieldName = repeaterRowField.model.get('name');
          var fieldModel = repeaterRowField.model;

          if (fieldName === 'mailchimp_remote_field') {
            fieldModel.set('options', _this2.getRemoteFields());
          } else if (fieldName === 'mailchimp_local_field') {
            fieldModel.set('options', _this2.getFormFields());
          }

          repeaterRowField.render();
        });
      });
    },
    clearFieldMapping: function clearFieldMapping() {
      var fieldsMapControlView = this.getControlView('mailchimp_fields_mapping');
      fieldsMapControlView.collection.each(function (modelItem) {
        if (modelItem) {
          modelItem.destroy();
        }
      });
      fieldsMapControlView.render();
    },
    doSuccess: function doSuccess(response) {
      var self = this;
      var options = {};
      var lists = {};
      var mailchimpList = this.getElementSettings(this.model, "".concat(self.action, "_list"));

      if (response.success[0].lists.length === 0) {
        self.setOptions(this.selectOptions.noList);
        self.setSelectedOption();
        return;
      }

      _.each(response.success[0].lists, function (list) {
        lists[list.id] = list.name;
      });

      _.extend(options, self.selectOptions["default"], lists);

      self.setOptions(options);

      if (!mailchimpList.length) {
        self.setSelectedOption();
      }

      this.onListUpdate();
    },
    onElementChange: function onElementChange(setting) {
      switch (setting) {
        case 'mailchimp_api_key_source':
        case 'mailchimp_api_key':
          this.unselectGroups();
          this.updateGroupOptions({});
          this.updateList({
            mailchimp_api_key_source: this.getControlValue('mailchimp_api_key_source') || 'default',
            mailchimp_api_key: this.getControlValue('mailchimp_api_key')
          });
          break;

        case 'mailchimp_list':
          this.clearFieldMapping();
          this.unselectGroups();
          this.onListUpdate();
          break;
      }
    },
    onListUpdate: function onListUpdate() {
      var _this3 = this;

      this.updateGroupOptions(this.selectOptions.fetching);
      this.addControlSpinner('mailchimp_fields_mapping');
      this.addControlSpinner('mailchimp_groups');
      wp.ajax.send('raven_form_editor', {
        data: {
          service: this.action,
          nonce: elementor.config.jx_nonce,
          request: 'get_list_details',
          params: {
            mailchimp_api_key_source: this.getControlValue('mailchimp_api_key_source') || 'default',
            mailchimp_api_key: this.getControlValue('mailchimp_api_key'),
            mailchimp_list: this.getControlValue('mailchimp_list')
          }
        },
        success: function success(response) {
          _this3.updateGroupOptions(response.success[0].list_details.groups);

          _this3.remoteFields = response.success[0].list_details.fields;

          _this3.updateFieldMapping(_this3.remoteFields);

          _this3.removeControlSpinner('mailchimp_fields_mapping');

          _this3.removeControlSpinner('mailchimp_groups');
        }
      });
    },
    updateGroupOptions: function updateGroupOptions(groups) {
      var control = this.getControl('mailchimp_groups');
      var controlView = this.getControlView('mailchimp_groups');
      this.setOptions(groups, control, controlView);
    },
    getRemoteFields: function getRemoteFields() {
      return _.reduce(this.remoteFields, function (carry, remoteField) {
        carry[remoteField.remote_tag] = remoteField.remote_label;
        return carry;
      }, {
        '': '- None -'
      });
    },
    getFormFields: function getFormFields() {
      return _.extend({}, {
        '': '- None -'
      }, this.getRepeaterItemsByLabel('fields'));
    },
    unselectGroups: function unselectGroups() {
      var controlView = this.getControlView('mailchimp_groups');
      controlView.setValue('');
      controlView.render();
    }
  });

  new Mailchimp({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],60:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _crmBase = _interopRequireDefault(require("./crm/crm-base"));

function _default(panel, model, view) {
  var MailerLite = _crmBase["default"].extend({
    panel: panel,
    model: model,
    action: 'mailerlite'
  });

  new MailerLite({
    $element: view.$el
  });
}

},{"./crm/crm-base":52,"@babel/runtime/helpers/interopRequireDefault":79}],61:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var Steps = _form["default"].extend({
    panel: panel,
    model: model,
    sectionName: 'section_form_fields',
    fieldsRepeater: null,
    fieldViews: [],
    totalSteps: null,
    onInit: function onInit() {
      this.init();

      if (this.sectionName !== this.panel.content.currentView.activeSection) {
        return;
      }

      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    // eslint-disable-next-line no-unused-vars
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== this.sectionName) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      this.init();
    },
    init: function init() {
      this.fieldsRepeater = this.getControlView('fields');
      this.fieldsRepeater.on('add:child', this.refresh);
      this.fieldsRepeater.on('childview:click:remove', this.refresh);
      this.refresh();
    },
    refresh: function refresh() {
      this.getRowsView();
      this.toggleFirstStepLock();
      this.styleStepRows();
      this.setChangeListeners();
    },
    getRowsView: function getRowsView() {
      var _this = this;

      this.fieldViews = [];
      this.totalSteps = 0;
      this.fieldsRepeater.children.each(function (repeaterRow) {
        _this.fieldViews.push(repeaterRow);

        if ('step' === repeaterRow.model.get('type')) {
          _this.totalSteps++;
        }
      });
      this.fieldViews.sort(function (a, b) {
        return a.itemIndex - b.itemIndex;
      });
    },
    toggleFirstStepLock: function toggleFirstStepLock() {
      var row1 = this.fieldViews[0];
      var shouldRemoveTools, shouldDisableSort;

      if ('step' !== row1.model.get('type')) {
        shouldRemoveTools = false;
        shouldDisableSort = false;
      } else if (this.totalSteps < 2) {
        shouldRemoveTools = false;
        shouldDisableSort = true;
      } else {
        shouldRemoveTools = true;
        shouldDisableSort = true;
      }

      row1.$el.find('.elementor-repeater-row-tool').css('display', shouldRemoveTools ? 'none' : 'table-cell');
      row1.$el.find('.elementor-repeater-row-tools').toggleClass('ui-sortable-handle', !shouldDisableSort);
      row1.toggleSort(!shouldDisableSort);
      var typeControl = row1.children.find(function (control) {
        return 'type' === control.model.get('name');
      });
      typeControl.$el.find('select').attr('disabled', shouldRemoveTools);
    },
    styleStepRows: function styleStepRows() {
      var className = 'dark' === elementor.getPreferences().ui_theme ? 'raven-step-row dark' : 'raven-step-row';

      _.each(this.fieldViews, function (field) {
        field.$el.toggleClass(className, 'step' === field.model.get('type'));
      });
    },
    setChangeListeners: function setChangeListeners() {
      var _this2 = this;

      _.each(this.fieldViews, function (fieldView) {
        var typeControl = fieldView.children.find(function (option) {
          return 'type' === option.model.get('name');
        }).$el.find('select');
        var eventData = {
          index: fieldView.itemIndex,
          prevType: fieldView.model.get('type')
        };
        typeControl.off('change', _this2.handleTypeChange);
        typeControl.change(eventData, _this2.handleTypeChange);
      });
    },
    handleTypeChange: function handleTypeChange(event) {
      var index = event.data.index;
      var newIsStep = 'step' === event.target.value;
      var prevIsStep = 'step' === event.data.prevType;
      var firstIsStep = 'step' === this.fieldViews[0].model.get('type');

      if (1 !== index && !prevIsStep && newIsStep && !firstIsStep) {
        this.createStep1();
      }

      setTimeout(this.refresh, 0);
    },
    createStep1: function createStep1() {
      this.fieldsRepeater.onButtonAddRowClick();
      window.$e.run('document/repeater/move', {
        container: this.fieldsRepeater.options.container,
        name: this.fieldsRepeater.model.get('name'),
        sourceIndex: this.fieldViews.length - 1,
        targetIndex: 0
      });
      this.fieldViews[0].children.find(function (option) {
        return 'type' === option.model.get('name');
      }).$el.find('select').val('step');
      this.fieldViews[0].model.set('type', 'step');
    }
  });

  new Steps({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79}],62:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _form = _interopRequireDefault(require("../../utils/form/form"));

function _default(panel, model, view) {
  var itiTel = _form["default"].extend({
    panel: panel,
    model: model,
    view: view,
    sectionName: 'section_form_fields',
    countries: {},
    onInit: function onInit() {
      this.getCountries();
      this.refresh();
      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== this.sectionName || section.model.id !== model.get('id')) {
        return;
      }

      this.refresh();
    },
    refresh: function refresh() {
      var _this = this;

      var fieldsRepeater = this.getControlView('fields');
      this.select2s = [];
      fieldsRepeater.children.each(function (row) {
        var typeControl = row.children.find(function (option) {
          return 'type' === option.model.get('name');
        }).$el.find('select');
        typeControl.off('change', _this.refresh).change(_this.refresh);

        if ('tel' !== typeControl.val()) {
          return;
        }

        var allowDropdownControl = row.children.find(function (option) {
          return 'iti_tel_allow_dropdown' === option.model.get('name');
        }).$el.find('input');
        allowDropdownControl.off('change', _this.refresh).change(_this.refresh);
        var allowDropdown = allowDropdownControl[0].checked;
        var countrySelect2 = row.children.find(function (option) {
          return 'iti_tel_country_include' === option.model.get('name');
        });
        countrySelect2.model.set('multiple', allowDropdown);
        countrySelect2.model.set('options', _this.countries);
        countrySelect2.render();
      });
      fieldsRepeater.off('add:child', this.refresh).on('add:child', this.refresh);
    },
    getCountries: function getCountries() {
      var _this2 = this;

      require('intl-tel-input');

      _.each(window.intlTelInputGlobals.getCountryData(), function (country) {
        _this2.countries[country.iso2] = country.name;
      });
    }
  });

  new itiTel({
    $element: view.$el
  });
}

},{"../../utils/form/form":36,"@babel/runtime/helpers/interopRequireDefault":79,"intl-tel-input":100}],63:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var Categories = _module["default"].extend({
    panel: panel,
    model: model,
    sectionName: 'media_gallery_settings_section',
    fieldsRepeater: null,
    fieldViews: [],
    totalCategories: null,
    onInit: function onInit() {
      this.init();

      if (this.sectionName !== this.panel.content.currentView.activeSection) {
        return;
      }

      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    // eslint-disable-next-line no-unused-vars
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== this.sectionName) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      this.init();
    },
    init: function init() {
      this.fieldsRepeater = this.getControlView('fields');
      this.fieldsRepeater.on('add:child', this.refresh);
      this.fieldsRepeater.on('childview:click:remove', this.refresh);
      this.refresh();
    },
    refresh: function refresh() {
      this.getRowsView();
      this.toggleFirstCategoryLock();
      this.styleCategoryRows();
      this.setChangeListeners();
    },
    getRowsView: function getRowsView() {
      var _this = this;

      this.fieldViews = [];
      this.totalCategories = 0;
      this.fieldsRepeater.children.each(function (repeaterRow) {
        _this.fieldViews.push(repeaterRow);

        if ('category' === repeaterRow.model.get('item_type')) {
          _this.totalCategories++;
        }
      });
      this.fieldViews.sort(function (a, b) {
        return a.itemIndex - b.itemIndex;
      });
    },
    toggleFirstCategoryLock: function toggleFirstCategoryLock() {
      var row1 = this.fieldViews[0];
      var shouldRemoveTools, shouldDisableSort;

      if ('category' !== row1.model.get('item_type')) {
        shouldRemoveTools = false;
        shouldDisableSort = false;
      } else if (this.totalCategories < 2) {
        shouldRemoveTools = false;
        shouldDisableSort = true;
      } else {
        shouldRemoveTools = true;
        shouldDisableSort = true;
      }

      row1.$el.find('.elementor-repeater-row-tool').css('display', shouldRemoveTools ? 'none' : 'table-cell');
      row1.$el.find('.elementor-repeater-row-tools').toggleClass('ui-sortable-handle', !shouldDisableSort);
      row1.toggleSort(!shouldDisableSort);
      var typeControl = row1.children.find(function (control) {
        return 'item_type' === control.model.get('name');
      });
      typeControl.$el.find('select').attr('disabled', shouldRemoveTools);
    },
    styleCategoryRows: function styleCategoryRows() {
      var className = 'dark' === elementor.getPreferences().ui_theme ? 'raven-category-row dark' : 'raven-category-row';

      _.each(this.fieldViews, function (field) {
        field.$el.toggleClass(className, 'category' === field.model.get('item_type'));
      });
    },
    setChangeListeners: function setChangeListeners() {
      var _this2 = this;

      _.each(this.fieldViews, function (fieldView) {
        var typeControl = fieldView.children.find(function (option) {
          return 'item_type' === option.model.get('name');
        }).$el.find('select');
        var eventData = {
          index: fieldView.itemIndex,
          prevType: fieldView.model.get('item_type')
        };
        typeControl.off('change', _this2.handleTypeChange);
        typeControl.change(eventData, _this2.handleTypeChange);
      });
    },
    handleTypeChange: function handleTypeChange(event) {
      var index = event.data.index;
      var newIsCategory = 'category' === event.target.value;
      var prevIsCategory = 'category' === event.data.prevType;
      var firstIsCategory = 'category' === this.fieldViews[0].model.get('item_type');

      if (1 !== index && !prevIsCategory && newIsCategory && !firstIsCategory) {
        this.createCategory1();
      }

      setTimeout(this.refresh, 0);
    },
    createCategory1: function createCategory1() {
      this.fieldsRepeater.onButtonAddRowClick();
      window.$e.run('document/repeater/move', {
        container: this.fieldsRepeater.options.container,
        name: this.fieldsRepeater.model.get('name'),
        sourceIndex: this.fieldViews.length - 1,
        targetIndex: 0
      });
      this.fieldViews[0].children.find(function (option) {
        return 'item_type' === option.model.get('name');
      }).$el.find('select').val('category');
      this.fieldViews[0].model.set('item_type', 'category');
    }
  });

  new Categories({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],64:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var MyAccount = _module["default"].extend({
    panel: panel,
    view: view,
    repeater: null,
    hideSwitchers: [],
    repeaterTitles: [],
    hideIcon: 'fas fa-eye-slash',
    onInit: function onInit() {
      this.init();
      this.syncTabsWithPlugins();
      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if ('section_content_content' !== activeSection || section.model.id !== model.get('id')) {
        return;
      }

      this.init();
    },
    init: function init() {
      this.repeater = this.getControlView('tabs');
      this.repeater.on('add:child', this.refresh);
      this.refresh();
      this.firstSyncHideIcons();
      this.ChangeButtonName();
    },
    refresh: function refresh() {
      this.getViews();
      this.addChangeListeners();
      this.firstSyncHideIcons();
    },
    getViews: function getViews() {
      var _this = this;

      this.hideSwitchers = [];
      this.repeaterTitles = [];
      this.repeater.children.each(function (row) {
        _this.repeaterTitles.push(row.$el.find('.elementor-repeater-row-item-title'));

        if ('yes' === row.model.get('is_default')) {
          _this.deleteRemoveButton(row);
        }

        row.children.each(function (control) {
          if ('hide_tab' === control.model.get('name')) {
            _this.hideSwitchers.push(control.$el.find('input'));
          }
        });
      });
    },
    firstSyncHideIcons: function firstSyncHideIcons() {
      var _this2 = this;

      _.each(this.hideSwitchers, function (switcher, index) {
        _this2.repeaterTitles[index].toggleClass('raven-my-account-hide-tab', switcher[0].checked);
      });
    },
    addChangeListeners: function addChangeListeners() {
      var _this3 = this;

      _.each(this.hideSwitchers, function (switcher, index) {
        switcher.off('change', _this3.onToggleHide).on('change', {
          index: index
        }, _this3.onToggleHide);
      });
    },
    deleteRemoveButton: function deleteRemoveButton(row) {
      row.$el.find('.elementor-repeater-row-tool.elementor-repeater-tool-remove').remove();
    },
    onToggleHide: function onToggleHide(event) {
      var index = event.data.index;
      var state = event.target.checked;
      this.repeaterTitles[index].toggleClass('raven-my-account-hide-tab', state);
    },
    ChangeButtonName: function ChangeButtonName() {
      this.repeater.$el.find('button.elementor-repeater-add').html('<i class="eicon-plus" aria-hidden="true"></i> Add new tab');
    },
    syncTabsWithPlugins: function syncTabsWithPlugins() {
      wp.ajax.send('raven_my_account_nav_items', {
        success: this.updateTabs
      });
    },
    updateTabs: function updateTabs(navItems) {
      var _this4 = this;

      var endpoints = Object.keys(navItems);
      var labels = Object.values(navItems);

      if (!endpoints.length) {
        return;
      } // Remove tabs of deactivated plugins.


      this.repeater.children.each(function (item) {
        if (item.model && 'yes' === item.model.get('is_default') && !endpoints.includes(item.model.get('field_key'))) {
          _this4.removeTab(item.model.get('_id'));
        }
      });
      this.refresh(); // Add tabs of newly activated plugins.

      if (!this.repeater.children.length) {
        return;
      }

      _.each(endpoints, function (endpoint, index) {
        var hasKey = _this4.repeater.children.some(function (item) {
          return item.model && endpoint === item.model.get('field_key');
        });

        if (!hasKey) {
          _this4.addMissingTab(endpoint, labels[index]);
        }
      });
    },
    removeTab: function removeTab(tabID) {
      window.$e.run('document/repeater/remove', {
        container: this.repeater.options.container,
        name: this.repeater.model.get('name'),
        index: this.repeater.children.find(function (row) {
          return tabID === row.model.get('_id');
        }).itemIndex - 1
      });
      this.repeater.render();
    },
    addMissingTab: function addMissingTab(tabKey, tabLabel) {
      var _this5 = this;

      this.repeater.onButtonAddRowClick();
      var newTab = this.repeater.children.last();
      setTimeout(function () {
        newTab.model.set('is_default', 'yes');
        newTab.model.set('custom_template_enabled', 'no');
        newTab.model.set('field_key', tabKey);
        newTab.model.set('tab_name', tabLabel);
        newTab.render();
        view.renderHTML();

        _this5.refresh();
      }, 200);
    }
  });

  new MyAccount({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],65:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var Posts = _module["default"].extend({
    panel: panel,
    onInit: function onInit() {
      var _this = this;

      if (this.onElementChange) {
        elementor.channels.editor.on('change', function (controlView) {
          _this.onElementChange(controlView.model.get('name'), controlView);
        });
      }
    },
    onElementChange: function onElementChange(name, controlView) {
      switch (name) {
        case 'query_post_type':
          this.onQueryPostTypeChange(controlView);
          break;
      }
    },
    onQueryPostTypeChange: function onQueryPostTypeChange(controlView) {
      controlView.container.settings.set('query_excludes_ids', []);
    }
  });

  new Posts({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],66:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

var _component = _interopRequireDefault(require("../utils/form/component"));

function _default(panel, model, view) {
  var Register = _module["default"].extend({
    panel: panel,
    model: model,
    sectionName: 'section_form_fields',
    fieldsRepeater: null,
    fieldViews: [],
    onInit: function onInit() {
      this.init();

      if (this.sectionName !== this.panel.content.currentView.activeSection) {
        return;
      }

      elementor.channels.editor.on('section:activated', this.onSectionActivated.bind(this));
      this.onElementorInitComponents();
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (activeSection !== this.sectionName) {
        return;
      }

      if (section.model.id !== model.get('id')) {
        return;
      }

      this.init();
    },
    init: function init() {
      this.fieldsRepeater = this.getControlView('fields');
      this.fieldsRepeater.on('add:child', this.refresh.bind(this));
      this.fieldsRepeater.on('childview:click:remove', this.refresh.bind(this));
      this.refresh();
    },
    refresh: function refresh() {
      this.getRowsView();
      this.initialize();
    },
    getRowsView: function getRowsView() {
      var _this = this;

      this.fieldViews = [];
      this.fieldsRepeater.children.each(function (repeaterRow) {
        _this.fieldViews.push(repeaterRow);
      });
      this.fieldViews.sort(function (a, b) {
        return a.itemIndex - b.itemIndex;
      });
    },
    initialize: function initialize() {
      var _this2 = this;

      _.each(this.fieldViews, function (fieldView, index) {
        var typeControl = fieldView.children.find(function (option) {
          return 'type' === option.model.get('name');
        }).$el.find('select');
        var mapToControl = fieldView.children.find(function (option) {
          return 'map_to' === option.model.get('name');
        }).$el.find('select');
        typeControl.off('change', _this2.handleTypeChange.bind(_this2));
        typeControl.on('change', {
          index: index
        }, _this2.handleTypeChange.bind(_this2));
        mapToControl.off('change', _this2.handleMapToChange.bind(_this2));
        mapToControl.on('change', {
          index: index
        }, _this2.handleMapToChange.bind(_this2));
      });

      this.checkInitialStates();
    },
    checkInitialStates: function checkInitialStates() {
      var _this3 = this;

      _.each(this.fieldViews, function (fieldView) {
        _this3.updateFieldCustomIdSettings(fieldView);
      });
    },
    handleTypeChange: function handleTypeChange(event) {
      this.updateFieldCustomIdReadonly(event);
    },
    handleMapToChange: function handleMapToChange(event) {
      this.updateFieldCustomIdReadonly(event);
    },
    updateFieldCustomIdReadonly: function updateFieldCustomIdReadonly(event) {
      var fieldView = this.fieldViews[event.data.index];
      this.updateFieldCustomIdSettings(fieldView);
    },
    updateFieldCustomIdSettings: function updateFieldCustomIdSettings(fieldView) {
      var typeControl = fieldView.children.find(function (option) {
        return 'type' === option.model.get('name');
      }).$el.find('select');
      var mapToControl = fieldView.children.find(function (option) {
        return 'map_to' === option.model.get('name');
      }).$el.find('select');
      var fieldCustomIdControl = fieldView.children.find(function (option) {
        return 'field_custom_id' === option.model.get('name');
      }).$el.find('input');
      var itemContainer = fieldView.children.find(function (option) {
        return 'field_custom_id' === option.model.get('name');
      }).container;
      var type = typeControl.val();
      var mapTo = mapToControl.val();
      var currentFieldCustomId = fieldCustomIdControl.val();

      if (!itemContainer) {
        return;
      }

      if (type === 'acceptance' && mapTo === 'newsletter') {
        fieldCustomIdControl.attr('readonly', true);
        window.$e.run('document/elements/settings', {
          container: itemContainer,
          settings: {
            field_custom_id: 'register_acceptance'
          },
          options: {
            external: true
          }
        });
      } else if (currentFieldCustomId === 'register_acceptance') {
        fieldCustomIdControl.attr('readonly', false);
        window.$e.run('document/elements/settings', {
          container: itemContainer,
          settings: {
            field_custom_id: 'field_' + itemContainer.id
          },
          options: {
            external: true
          }
        });
      }
    },
    onElementorInitComponents: function onElementorInitComponents() {
      window.$e.components.register(new _component["default"]({
        manager: this
      }));
    }
  });

  new Register({
    $element: view.$el
  });
}

},{"../utils/form/component":35,"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],67:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var ShoppingCart = _module["default"].extend({
    panel: panel,
    model: model,
    view: view,
    onInit: function onInit() {
      elementor.channels.editor.on('section:activated', this.onSectionActivated);
    },
    onSectionActivated: function onSectionActivated(activeSection, section) {
      if (section.model.id !== model.get('id')) {
        return;
      }

      var editedElement = section.getOption('editedElementView');
      var overlayColor = this.getElementSettings(model, 'content_effect_blur_content'),
          BlurContent = this.getElementSettings(model, 'content_effect_content_overlay');

      if (['section_cart_quick_view', 'section_cart_quick_view_content'].includes(activeSection)) {
        editedElement.$el.addClass('jupiterx-raven-cart-quick-view-overlay');

        if (overlayColor === 'enabled' || BlurContent === 'enabled') {
          editedElement.$el.find('.jupiterx-shopping-cart-content-effect-enabled-overlay').addClass('jupiterx-shopping-cart-overlay-activated');
        }
      }
    }
  });

  new ShoppingCart({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],68:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _module = _interopRequireDefault(require("../utils/module"));

function _default(panel, model, view) {
  var StripeButton = _module["default"].extend({
    panel: panel,
    model: model,
    view: view,
    onInit: function onInit() {
      this.onSectionActive();
      elementor.channels.editor.on('editor:widget:raven-stripe-button:section_stripe_account:activated', this.onSectionActive);
    },
    onSectionActive: function onSectionActive() {
      var _this = this;

      return elementor.ajax.addRequest('get_stripe_tax_rates', {
        success: function success(data) {
          _this.updateOptions('stripe_test_env_tax_rates_list', data.test_api_key);

          _this.updateOptions('stripe_live_env_tax_rates_list', data.live_api_key);
        }
      }, true);
    },
    updateOptions: function updateOptions(name, options) {
      var control = this.getControl(name);
      control.set('options', options);
      this.getControlView(name).render();
    },
    getControl: function getControl(propertyName) {
      if (!this.panel) {
        return;
      }

      var control = this.panel.getCurrentPageView().collection.findWhere({
        name: propertyName
      });
      return control;
    },
    getControlView: function getControlView(propertyName) {
      if (!this.panel) {
        return;
      }

      var control = this.getControl(propertyName);
      var view = this.panel // eslint-disable-line
      .getCurrentPageView().children.findByModelCid(control.cid);
      return view;
    }
  });

  new StripeButton({
    $element: view.$el
  });
}

},{"../utils/module":41,"@babel/runtime/helpers/interopRequireDefault":79}],69:[function(require,module,exports){
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
},{}],70:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],71:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],72:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],73:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],74:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],75:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],76:[function(require,module,exports){
var superPropBase = require("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"./superPropBase":86}],77:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],78:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":84}],79:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],80:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;
},{"../helpers/typeof":87}],81:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{}],82:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
},{}],83:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":87,"./assertThisInitialized":71}],84:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],85:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var unsupportedIterableToArray = require("./unsupportedIterableToArray");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":70,"./iterableToArrayLimit":81,"./nonIterableRest":82,"./unsupportedIterableToArray":88}],86:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":77}],87:[function(require,module,exports){
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],88:[function(require,module,exports){
var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
},{"./arrayLikeToArray":69}],89:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":103}],90:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var postfix = _interopDefault(require('@tannin/postfix'));
var evaluate = _interopDefault(require('@tannin/evaluate'));

/**
 * Given a C expression, returns a function which can be called to evaluate its
 * result.
 *
 * @example
 *
 * ```js
 * import compile from '@tannin/compile';
 *
 * const evaluate = compile( 'n > 1' );
 *
 * evaluate( { n: 2 } );
 * // ⇒ true
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {(variables?:{[variable:string]:*})=>*} Compiled evaluator.
 */
function compile( expression ) {
	var terms = postfix( expression );

	return function( variables ) {
		return evaluate( terms, variables );
	};
}

module.exports = compile;

},{"@tannin/evaluate":91,"@tannin/postfix":93}],91:[function(require,module,exports){
'use strict';

/**
 * Operator callback functions.
 *
 * @type {Object}
 */
var OPERATORS = {
	'!': function( a ) {
		return ! a;
	},
	'*': function( a, b ) {
		return a * b;
	},
	'/': function( a, b ) {
		return a / b;
	},
	'%': function( a, b ) {
		return a % b;
	},
	'+': function( a, b ) {
		return a + b;
	},
	'-': function( a, b ) {
		return a - b;
	},
	'<': function( a, b ) {
		return a < b;
	},
	'<=': function( a, b ) {
		return a <= b;
	},
	'>': function( a, b ) {
		return a > b;
	},
	'>=': function( a, b ) {
		return a >= b;
	},
	'==': function( a, b ) {
		return a === b;
	},
	'!=': function( a, b ) {
		return a !== b;
	},
	'&&': function( a, b ) {
		return a && b;
	},
	'||': function( a, b ) {
		return a || b;
	},
	'?:': function( a, b, c ) {
		if ( a ) {
			throw b;
		}

		return c;
	},
};

/**
 * Given an array of postfix terms and operand variables, returns the result of
 * the postfix evaluation.
 *
 * @example
 *
 * ```js
 * import evaluate from '@tannin/evaluate';
 *
 * // 3 + 4 * 5 / 6 ⇒ '3 4 5 * 6 / +'
 * const terms = [ '3', '4', '5', '*', '6', '/', '+' ];
 *
 * evaluate( terms, {} );
 * // ⇒ 6.333333333333334
 * ```
 *
 * @param {string[]} postfix   Postfix terms.
 * @param {Object}   variables Operand variables.
 *
 * @return {*} Result of evaluation.
 */
function evaluate( postfix, variables ) {
	var stack = [],
		i, j, args, getOperatorResult, term, value;

	for ( i = 0; i < postfix.length; i++ ) {
		term = postfix[ i ];

		getOperatorResult = OPERATORS[ term ];
		if ( getOperatorResult ) {
			// Pop from stack by number of function arguments.
			j = getOperatorResult.length;
			args = Array( j );
			while ( j-- ) {
				args[ j ] = stack.pop();
			}

			try {
				value = getOperatorResult.apply( null, args );
			} catch ( earlyReturn ) {
				return earlyReturn;
			}
		} else if ( variables.hasOwnProperty( term ) ) {
			value = variables[ term ];
		} else {
			value = +term;
		}

		stack.push( value );
	}

	return stack[ 0 ];
}

module.exports = evaluate;

},{}],92:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compile = _interopDefault(require('@tannin/compile'));

/**
 * Given a C expression, returns a function which, when called with a value,
 * evaluates the result with the value assumed to be the "n" variable of the
 * expression. The result will be coerced to its numeric equivalent.
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Evaluator function.
 */
function pluralForms( expression ) {
	var evaluate = compile( expression );

	return function( n ) {
		return +evaluate( { n: n } );
	};
}

module.exports = pluralForms;

},{"@tannin/compile":90}],93:[function(require,module,exports){
'use strict';

var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;

/**
 * Operator precedence mapping.
 *
 * @type {Object}
 */
PRECEDENCE = {
	'(': 9,
	'!': 8,
	'*': 7,
	'/': 7,
	'%': 7,
	'+': 6,
	'-': 6,
	'<': 5,
	'<=': 5,
	'>': 5,
	'>=': 5,
	'==': 4,
	'!=': 4,
	'&&': 3,
	'||': 2,
	'?': 1,
	'?:': 1,
};

/**
 * Characters which signal pair opening, to be terminated by terminators.
 *
 * @type {string[]}
 */
OPENERS = [ '(', '?' ];

/**
 * Characters which signal pair termination, the value an array with the
 * opener as its first member. The second member is an optional operator
 * replacement to push to the stack.
 *
 * @type {string[]}
 */
TERMINATORS = {
	')': [ '(' ],
	':': [ '?', '?:' ],
};

/**
 * Pattern matching operators and openers.
 *
 * @type {RegExp}
 */
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;

/**
 * Given a C expression, returns the equivalent postfix (Reverse Polish)
 * notation terms as an array.
 *
 * If a postfix string is desired, simply `.join( ' ' )` the result.
 *
 * @example
 *
 * ```js
 * import postfix from '@tannin/postfix';
 *
 * postfix( 'n > 1' );
 * // ⇒ [ 'n', '1', '>' ]
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {string[]} Postfix terms.
 */
function postfix( expression ) {
	var terms = [],
		stack = [],
		match, operator, term, element;

	while ( ( match = expression.match( PATTERN ) ) ) {
		operator = match[ 0 ];

		// Term is the string preceding the operator match. It may contain
		// whitespace, and may be empty (if operator is at beginning).
		term = expression.substr( 0, match.index ).trim();
		if ( term ) {
			terms.push( term );
		}

		while ( ( element = stack.pop() ) ) {
			if ( TERMINATORS[ operator ] ) {
				if ( TERMINATORS[ operator ][ 0 ] === element ) {
					// Substitution works here under assumption that because
					// the assigned operator will no longer be a terminator, it
					// will be pushed to the stack during the condition below.
					operator = TERMINATORS[ operator ][ 1 ] || operator;
					break;
				}
			} else if ( OPENERS.indexOf( element ) >= 0 || PRECEDENCE[ element ] < PRECEDENCE[ operator ] ) {
				// Push to stack if either an opener or when pop reveals an
				// element of lower precedence.
				stack.push( element );
				break;
			}

			// For each popped from stack, push to terms.
			terms.push( element );
		}

		if ( ! TERMINATORS[ operator ] ) {
			stack.push( operator );
		}

		// Slice matched fragment from expression to continue match.
		expression = expression.substr( match.index + operator.length );
	}

	// Push remainder of operand, if exists, to terms.
	expression = expression.trim();
	if ( expression ) {
		terms.push( expression );
	}

	// Pop remaining items from stack into terms.
	return terms.concat( stack.reverse() );
}

module.exports = postfix;

},{}],94:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createI18n = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _tannin = _interopRequireDefault(require("tannin"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef {Record<string,any>} LocaleData
 */

/**
 * Default locale data to use for Tannin domain when not otherwise provided.
 * Assumes an English plural forms expression.
 *
 * @type {LocaleData}
 */
var DEFAULT_LOCALE_DATA = {
  '': {
    /** @param {number} n */
    plural_forms: function plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};
/**
 * An i18n instance
 *
 * @typedef {Object} I18n
 * @property {Function} setLocaleData Merges locale data into the Tannin instance by domain. Accepts data in a
 *                                    Jed-formatted JSON object shape.
 * @property {Function} __            Retrieve the translation of text.
 * @property {Function} _x            Retrieve translated string with gettext context.
 * @property {Function} _n            Translates and retrieves the singular or plural form based on the supplied
 *                                    number.
 * @property {Function} _nx           Translates and retrieves the singular or plural form based on the supplied
 *                                    number, with gettext context.
 * @property {Function} isRTL         Check if current locale is RTL.
 */

/**
 * Create an i18n instance
 *
 * @param {LocaleData} [initialData]    Locale data configuration.
 * @param {string}     [initialDomain]  Domain for which configuration applies.
 * @return {I18n}                       I18n instance
 */

var createI18n = function createI18n(initialData, initialDomain) {
  /**
   * The underlying instance of Tannin to which exported functions interface.
   *
   * @type {Tannin}
   */
  var tannin = new _tannin.default({});
  /**
   * Merges locale data into the Tannin instance by domain. Accepts data in a
   * Jed-formatted JSON object shape.
   *
   * @see http://messageformat.github.io/Jed/
   *
   * @param {LocaleData} [data]   Locale data configuration.
   * @param {string}     [domain] Domain for which configuration applies.
   */

  var setLocaleData = function setLocaleData(data) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
    tannin.data[domain] = _objectSpread({}, DEFAULT_LOCALE_DATA, {}, tannin.data[domain], {}, data); // Populate default domain configuration (supported locale date which omits
    // a plural forms expression).

    tannin.data[domain][''] = _objectSpread({}, DEFAULT_LOCALE_DATA[''], {}, tannin.data[domain]['']);
  };
  /**
   * Wrapper for Tannin's `dcnpgettext`. Populates default locale data if not
   * otherwise previously assigned.
   *
   * @param {string|undefined} domain   Domain to retrieve the translated text.
   * @param {string|undefined} context  Context information for the translators.
   * @param {string}           single   Text to translate if non-plural. Used as
   *                                    fallback return value on a caught error.
   * @param {string}           [plural] The text to be used if the number is
   *                                    plural.
   * @param {number}           [number] The number to compare against to use
   *                                    either the singular or plural form.
   *
   * @return {string} The translated string.
   */


  var dcnpgettext = function dcnpgettext() {
    var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
    var context = arguments.length > 1 ? arguments[1] : undefined;
    var single = arguments.length > 2 ? arguments[2] : undefined;
    var plural = arguments.length > 3 ? arguments[3] : undefined;
    var number = arguments.length > 4 ? arguments[4] : undefined;

    if (!tannin.data[domain]) {
      setLocaleData(undefined, domain);
    }

    return tannin.dcnpgettext(domain, context, single, plural, number);
  };
  /**
   * Retrieve the translation of text.
   *
   * @see https://developer.wordpress.org/reference/functions/__/
   *
   * @param {string} text     Text to translate.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} Translated text.
   */


  var __ = function __(text, domain) {
    return dcnpgettext(domain, undefined, text);
  };
  /**
   * Retrieve translated string with gettext context.
   *
   * @see https://developer.wordpress.org/reference/functions/_x/
   *
   * @param {string} text     Text to translate.
   * @param {string} context  Context information for the translators.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} Translated context string without pipe.
   */


  var _x = function _x(text, context, domain) {
    return dcnpgettext(domain, context, text);
  };
  /**
   * Translates and retrieves the singular or plural form based on the supplied
   * number.
   *
   * @see https://developer.wordpress.org/reference/functions/_n/
   *
   * @param {string} single   The text to be used if the number is singular.
   * @param {string} plural   The text to be used if the number is plural.
   * @param {number} number   The number to compare against to use either the
   *                          singular or plural form.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} The translated singular or plural form.
   */


  var _n = function _n(single, plural, number, domain) {
    return dcnpgettext(domain, undefined, single, plural, number);
  };
  /**
   * Translates and retrieves the singular or plural form based on the supplied
   * number, with gettext context.
   *
   * @see https://developer.wordpress.org/reference/functions/_nx/
   *
   * @param {string} single   The text to be used if the number is singular.
   * @param {string} plural   The text to be used if the number is plural.
   * @param {number} number   The number to compare against to use either the
   *                          singular or plural form.
   * @param {string} context  Context information for the translators.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} The translated singular or plural form.
   */


  var _nx = function _nx(single, plural, number, context, domain) {
    return dcnpgettext(domain, context, single, plural, number);
  };
  /**
   * Check if current locale is RTL.
   *
   * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
   * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
   * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
   * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
   *
   * @return {boolean} Whether locale is RTL.
   */


  var isRTL = function isRTL() {
    return 'rtl' === _x('ltr', 'text direction');
  };

  if (initialData) {
    setLocaleData(initialData, initialDomain);
  }

  return {
    setLocaleData: setLocaleData,
    __: __,
    _x: _x,
    _n: _n,
    _nx: _nx,
    isRTL: isRTL
  };
};

exports.createI18n = createI18n;

},{"@babel/runtime/helpers/defineProperty":75,"@babel/runtime/helpers/interopRequireDefault":79,"tannin":104}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRTL = exports._nx = exports._n = exports._x = exports.__ = exports.setLocaleData = void 0;

var _createI18n = require("./create-i18n");

/**
 * Internal dependencies
 */
var i18n = (0, _createI18n.createI18n)();
/*
 * Comments in this file are duplicated from ./i18n due to
 * https://github.com/WordPress/gutenberg/pull/20318#issuecomment-590837722
 */

/**
 * @typedef {import('./create-i18n').LocaleData} LocaleData
 */

/**
 * Merges locale data into the Tannin instance by domain. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */

var setLocaleData = i18n.setLocaleData.bind(i18n);
/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string} text     Text to translate.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */

exports.setLocaleData = setLocaleData;

var __ = i18n.__.bind(i18n);
/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string} text     Text to translate.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */


exports.__ = __;

var _x = i18n._x.bind(i18n);
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */


exports._x = _x;

var _n = i18n._n.bind(i18n);
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */


exports._n = _n;

var _nx = i18n._nx.bind(i18n);
/**
 * Check if current locale is RTL.
 *
 * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
 * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
 * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
 * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
 *
 * @return {boolean} Whether locale is RTL.
 */


exports._nx = _nx;
var isRTL = i18n.isRTL.bind(i18n);
exports.isRTL = isRTL;

},{"./create-i18n":94}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sprintf: true,
  setLocaleData: true,
  __: true,
  _x: true,
  _n: true,
  _nx: true,
  isRTL: true
};
Object.defineProperty(exports, "sprintf", {
  enumerable: true,
  get: function get() {
    return _sprintf.sprintf;
  }
});
Object.defineProperty(exports, "setLocaleData", {
  enumerable: true,
  get: function get() {
    return _defaultI18n.setLocaleData;
  }
});
Object.defineProperty(exports, "__", {
  enumerable: true,
  get: function get() {
    return _defaultI18n.__;
  }
});
Object.defineProperty(exports, "_x", {
  enumerable: true,
  get: function get() {
    return _defaultI18n._x;
  }
});
Object.defineProperty(exports, "_n", {
  enumerable: true,
  get: function get() {
    return _defaultI18n._n;
  }
});
Object.defineProperty(exports, "_nx", {
  enumerable: true,
  get: function get() {
    return _defaultI18n._nx;
  }
});
Object.defineProperty(exports, "isRTL", {
  enumerable: true,
  get: function get() {
    return _defaultI18n.isRTL;
  }
});

var _sprintf = require("./sprintf");

var _createI18n = require("./create-i18n");

Object.keys(_createI18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _createI18n[key];
    }
  });
});

var _defaultI18n = require("./default-i18n");

},{"./create-i18n":94,"./default-i18n":95,"./sprintf":97}],97:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sprintf = sprintf;

var _memize = _interopRequireDefault(require("memize"));

var _sprintfJs = _interopRequireDefault(require("sprintf-js"));

/**
 * External dependencies
 */

/**
 * Log to console, once per message; or more precisely, per referentially equal
 * argument set. Because Jed throws errors, we log these to the console instead
 * to avoid crashing the application.
 *
 * @param {...*} args Arguments to pass to `console.error`
 */
var logErrorOnce = (0, _memize.default)(console.error); // eslint-disable-line no-console

/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string}    format The format of the string to generate.
 * @param {...*} args Arguments to apply to the format.
 *
 * @see http://www.diveintojavascript.com/projects/javascript-sprintf
 *
 * @return {string} The formatted string.
 */

function sprintf(format) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _sprintfJs.default.sprintf.apply(_sprintfJs.default, [format].concat(args));
  } catch (error) {
    logErrorOnce('sprintf error: \n\n' + error.toString());
    return format;
  }
}

},{"@babel/runtime/helpers/interopRequireDefault":79,"memize":101,"sprintf-js":98}],98:[function(require,module,exports){
/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line

},{}],99:[function(require,module,exports){
/*
 * International Telephone Input v17.0.18
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

// wrap in UMD
(function(factory) {
    if (typeof module === "object" && module.exports) module.exports = factory(); else window.intlTelInput = factory();
})(function(undefined) {
    "use strict";
    return function() {
        // Array of country objects for the flag dropdown.
        // Here is the criteria for the plugin to support a given country/territory
        // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
        // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
        // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
        // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
        // Each country array has the following information:
        // [
        //    Country name,
        //    iso2 code,
        //    International dial code,
        //    Order (if >1 country with same dial code),
        //    Area codes
        // ]
        var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Ascension Island", "ac", "247" ], [ "Australia", "au", "61", 0 ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Christmas Island", "cx", "61", 2, [ "89164" ] ], [ "Cocos (Keeling) Islands", "cc", "61", 1, [ "89162" ] ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Eswatini", "sz", "268" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "North Macedonia (Македонија)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway (Norge)", "no", "47", 0 ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262", 0 ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna (Wallis-et-Futuna)", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
        // loop over all of the countries above, restructuring the data to be objects with named keys
        for (var i = 0; i < allCountries.length; i++) {
            var c = allCountries[i];
            allCountries[i] = {
                name: c[0],
                iso2: c[1],
                dialCode: c[2],
                priority: c[3] || 0,
                areaCodes: c[4] || null
            };
        }
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            if (staticProps) _defineProperties(Constructor, staticProps);
            return Constructor;
        }
        var intlTelInputGlobals = {
            getInstance: function getInstance(input) {
                var id = input.getAttribute("data-intl-tel-input-id");
                return window.intlTelInputGlobals.instances[id];
            },
            instances: {},
            // using a global like this allows us to mock it in the tests
            documentReady: function documentReady() {
                return document.readyState === "complete";
            }
        };
        if (typeof window === "object") window.intlTelInputGlobals = intlTelInputGlobals;
        // these vars persist through all instances of the plugin
        var id = 0;
        var defaults = {
            // whether or not to allow the dropdown
            allowDropdown: true,
            // if there is just a dial code in the input: remove it on blur
            autoHideDialCode: true,
            // add a placeholder in the input with an example number for the selected country
            autoPlaceholder: "polite",
            // modify the parentClass
            customContainer: "",
            // modify the auto placeholder
            customPlaceholder: null,
            // append menu to specified element
            dropdownContainer: null,
            // don't display these countries
            excludeCountries: [],
            // format the input value during initialisation and on setNumber
            formatOnDisplay: true,
            // geoIp lookup function
            geoIpLookup: null,
            // inject a hidden input with this name, and on submit, populate it with the result of getNumber
            hiddenInput: "",
            // initial country
            initialCountry: "",
            // localized country names e.g. { 'de': 'Deutschland' }
            localizedCountries: null,
            // don't insert international dial codes
            nationalMode: true,
            // display only these countries
            onlyCountries: [],
            // number type to use for placeholders
            placeholderNumberType: "MOBILE",
            // the countries at the top of the list. defaults to united states and united kingdom
            preferredCountries: [ "us", "gb" ],
            // display the country dial code next to the selected flag so it's not part of the typed number
            separateDialCode: false,
            // specify the path to the libphonenumber script to enable validation/formatting
            utilsScript: ""
        };
        // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
        var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
        // utility function to iterate over an object. can't use Object.entries or native forEach because
        // of IE11
        var forEachProp = function forEachProp(obj, callback) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                callback(keys[i], obj[keys[i]]);
            }
        };
        // run a method on each instance of the plugin
        var forEachInstance = function forEachInstance(method) {
            forEachProp(window.intlTelInputGlobals.instances, function(key) {
                window.intlTelInputGlobals.instances[key][method]();
            });
        };
        // this is our plugin class that we will create an instance of
        // eslint-disable-next-line no-unused-vars
        var Iti = /*#__PURE__*/
        function() {
            function Iti(input, options) {
                var _this = this;
                _classCallCheck(this, Iti);
                this.id = id++;
                this.telInput = input;
                this.activeItem = null;
                this.highlightedItem = null;
                // process specified options / defaults
                // alternative to Object.assign, which isn't supported by IE11
                var customOptions = options || {};
                this.options = {};
                forEachProp(defaults, function(key, value) {
                    _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
                });
                this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
            }
            _createClass(Iti, [ {
                key: "_init",
                value: function _init() {
                    var _this2 = this;
                    // if in nationalMode, disable options relating to dial codes
                    if (this.options.nationalMode) this.options.autoHideDialCode = false;
                    // if separateDialCode then doesn't make sense to A) insert dial code into input
                    // (autoHideDialCode), and B) display national numbers (because we're displaying the country
                    // dial code next to them)
                    if (this.options.separateDialCode) {
                        this.options.autoHideDialCode = this.options.nationalMode = false;
                    }
                    // we cannot just test screen size as some smartphones/website meta tags will report desktop
                    // resolutions
                    // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
                    // rest of these declarations
                    // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
                    this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (this.isMobile) {
                        // trigger the mobile dropdown css
                        document.body.classList.add("iti-mobile");
                        // on mobile, we want a full screen dropdown, so we must append it to the body
                        if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
                    }
                    // these promises get resolved when their individual requests complete
                    // this way the dev can do something like iti.promise.then(...) to know when all requests are
                    // complete
                    if (typeof Promise !== "undefined") {
                        var autoCountryPromise = new Promise(function(resolve, reject) {
                            _this2.resolveAutoCountryPromise = resolve;
                            _this2.rejectAutoCountryPromise = reject;
                        });
                        var utilsScriptPromise = new Promise(function(resolve, reject) {
                            _this2.resolveUtilsScriptPromise = resolve;
                            _this2.rejectUtilsScriptPromise = reject;
                        });
                        this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
                    } else {
                        // prevent errors when Promise doesn't exist
                        this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
                        this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
                    }
                    // in various situations there could be no country selected initially, but we need to be able
                    // to assume this variable exists
                    this.selectedCountryData = {};
                    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
                    this._processCountryData();
                    // generate the markup
                    this._generateMarkup();
                    // set the initial state of the input value and the selected flag
                    this._setInitialState();
                    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
                    this._initListeners();
                    // utils script, and auto country
                    this._initRequests();
                }
            }, {
                key: "_processCountryData",
                value: function _processCountryData() {
                    // process onlyCountries or excludeCountries array if present
                    this._processAllCountries();
                    // process the countryCodes map
                    this._processCountryCodes();
                    // process the preferredCountries
                    this._processPreferredCountries();
                    // translate countries according to localizedCountries option
                    if (this.options.localizedCountries) this._translateCountriesByLocale();
                    // sort countries by name
                    if (this.options.onlyCountries.length || this.options.localizedCountries) {
                        this.countries.sort(this._countryNameSort);
                    }
                }
            }, {
                key: "_addCountryCode",
                value: function _addCountryCode(iso2, countryCode, priority) {
                    if (countryCode.length > this.countryCodeMaxLen) {
                        this.countryCodeMaxLen = countryCode.length;
                    }
                    if (!this.countryCodes.hasOwnProperty(countryCode)) {
                        this.countryCodes[countryCode] = [];
                    }
                    // bail if we already have this country for this countryCode
                    for (var i = 0; i < this.countryCodes[countryCode].length; i++) {
                        if (this.countryCodes[countryCode][i] === iso2) return;
                    }
                    // check for undefined as 0 is falsy
                    var index = priority !== undefined ? priority : this.countryCodes[countryCode].length;
                    this.countryCodes[countryCode][index] = iso2;
                }
            }, {
                key: "_processAllCountries",
                value: function _processAllCountries() {
                    if (this.options.onlyCountries.length) {
                        var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
                            return country.toLowerCase();
                        });
                        this.countries = allCountries.filter(function(country) {
                            return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
                        });
                    } else if (this.options.excludeCountries.length) {
                        var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
                            return country.toLowerCase();
                        });
                        this.countries = allCountries.filter(function(country) {
                            return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
                        });
                    } else {
                        this.countries = allCountries;
                    }
                }
            }, {
                key: "_translateCountriesByLocale",
                value: function _translateCountriesByLocale() {
                    for (var i = 0; i < this.countries.length; i++) {
                        var iso = this.countries[i].iso2.toLowerCase();
                        if (this.options.localizedCountries.hasOwnProperty(iso)) {
                            this.countries[i].name = this.options.localizedCountries[iso];
                        }
                    }
                }
            }, {
                key: "_countryNameSort",
                value: function _countryNameSort(a, b) {
                    return a.name.localeCompare(b.name);
                }
            }, {
                key: "_processCountryCodes",
                value: function _processCountryCodes() {
                    this.countryCodeMaxLen = 0;
                    // here we store just dial codes
                    this.dialCodes = {};
                    // here we store "country codes" (both dial codes and their area codes)
                    this.countryCodes = {};
                    // first: add dial codes
                    for (var i = 0; i < this.countries.length; i++) {
                        var c = this.countries[i];
                        if (!this.dialCodes[c.dialCode]) this.dialCodes[c.dialCode] = true;
                        this._addCountryCode(c.iso2, c.dialCode, c.priority);
                    }
                    // next: add area codes
                    // this is a second loop over countries, to make sure we have all of the "root" countries
                    // already in the map, so that we can access them, as each time we add an area code substring
                    // to the map, we also need to include the "root" country's code, as that also matches
                    for (var _i = 0; _i < this.countries.length; _i++) {
                        var _c = this.countries[_i];
                        // area codes
                        if (_c.areaCodes) {
                            var rootCountryCode = this.countryCodes[_c.dialCode][0];
                            // for each area code
                            for (var j = 0; j < _c.areaCodes.length; j++) {
                                var areaCode = _c.areaCodes[j];
                                // for each digit in the area code to add all partial matches as well
                                for (var k = 1; k < areaCode.length; k++) {
                                    var partialDialCode = _c.dialCode + areaCode.substr(0, k);
                                    // start with the root country, as that also matches this dial code
                                    this._addCountryCode(rootCountryCode, partialDialCode);
                                    this._addCountryCode(_c.iso2, partialDialCode);
                                }
                                // add the full area code
                                this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
                            }
                        }
                    }
                }
            }, {
                key: "_processPreferredCountries",
                value: function _processPreferredCountries() {
                    this.preferredCountries = [];
                    for (var i = 0; i < this.options.preferredCountries.length; i++) {
                        var countryCode = this.options.preferredCountries[i].toLowerCase();
                        var countryData = this._getCountryData(countryCode, false, true);
                        if (countryData) this.preferredCountries.push(countryData);
                    }
                }
            }, {
                key: "_createEl",
                value: function _createEl(name, attrs, container) {
                    var el = document.createElement(name);
                    if (attrs) forEachProp(attrs, function(key, value) {
                        return el.setAttribute(key, value);
                    });
                    if (container) container.appendChild(el);
                    return el;
                }
            }, {
                key: "_generateMarkup",
                value: function _generateMarkup() {
                    // if autocomplete does not exist on the element and its form, then
                    // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
                    // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
                    // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
                    if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
                        this.telInput.setAttribute("autocomplete", "off");
                    }
                    // containers (mostly for positioning)
                    var parentClass = "iti";
                    if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
                    if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
                    if (this.options.customContainer) {
                        parentClass += " ";
                        parentClass += this.options.customContainer;
                    }
                    var wrapper = this._createEl("div", {
                        "class": parentClass
                    });
                    this.telInput.parentNode.insertBefore(wrapper, this.telInput);
                    this.flagsContainer = this._createEl("div", {
                        "class": "iti__flag-container"
                    }, wrapper);
                    wrapper.appendChild(this.telInput);
                    // selected flag (displayed to left of input)
                    this.selectedFlag = this._createEl("div", {
                        "class": "iti__selected-flag",
                        role: "combobox",
                        "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                        "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                        "aria-expanded": "false"
                    }, this.flagsContainer);
                    this.selectedFlagInner = this._createEl("div", {
                        "class": "iti__flag"
                    }, this.selectedFlag);
                    if (this.options.separateDialCode) {
                        this.selectedDialCode = this._createEl("div", {
                            "class": "iti__selected-dial-code"
                        }, this.selectedFlag);
                    }
                    if (this.options.allowDropdown) {
                        // make element focusable and tab navigable
                        this.selectedFlag.setAttribute("tabindex", "0");
                        this.dropdownArrow = this._createEl("div", {
                            "class": "iti__arrow"
                        }, this.selectedFlag);
                        // country dropdown: preferred countries, then divider, then all countries
                        this.countryList = this._createEl("ul", {
                            "class": "iti__country-list iti__hide",
                            id: "iti-".concat(this.id, "__country-listbox"),
                            role: "listbox",
                            "aria-label": "List of countries"
                        });
                        if (this.preferredCountries.length) {
                            this._appendListItems(this.preferredCountries, "iti__preferred", true);
                            this._createEl("li", {
                                "class": "iti__divider",
                                role: "separator",
                                "aria-disabled": "true"
                            }, this.countryList);
                        }
                        this._appendListItems(this.countries, "iti__standard");
                        // create dropdownContainer markup
                        if (this.options.dropdownContainer) {
                            this.dropdown = this._createEl("div", {
                                "class": "iti iti--container"
                            });
                            this.dropdown.appendChild(this.countryList);
                        } else {
                            this.flagsContainer.appendChild(this.countryList);
                        }
                    }
                    if (this.options.hiddenInput) {
                        var hiddenInputName = this.options.hiddenInput;
                        var name = this.telInput.getAttribute("name");
                        if (name) {
                            var i = name.lastIndexOf("[");
                            // if input name contains square brackets, then give the hidden input the same name,
                            // replacing the contents of the last set of brackets with the given hiddenInput name
                            if (i !== -1) hiddenInputName = "".concat(name.substr(0, i), "[").concat(hiddenInputName, "]");
                        }
                        this.hiddenInput = this._createEl("input", {
                            type: "hidden",
                            name: hiddenInputName
                        });
                        wrapper.appendChild(this.hiddenInput);
                    }
                }
            }, {
                key: "_appendListItems",
                value: function _appendListItems(countries, className, preferred) {
                    // we create so many DOM elements, it is faster to build a temp string
                    // and then add everything to the DOM in one go at the end
                    var tmp = "";
                    // for each country
                    for (var i = 0; i < countries.length; i++) {
                        var c = countries[i];
                        var idSuffix = preferred ? "-preferred" : "";
                        // open the list item
                        tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(c.iso2).concat(idSuffix, "' role='option' data-dial-code='").concat(c.dialCode, "' data-country-code='").concat(c.iso2, "' aria-selected='false'>");
                        // add the flag
                        tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
                        // and the country name and dial code
                        tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
                        tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
                        // close the list item
                        tmp += "</li>";
                    }
                    this.countryList.insertAdjacentHTML("beforeend", tmp);
                }
            }, {
                key: "_setInitialState",
                value: function _setInitialState() {
                    // fix firefox bug: when first load page (with input with value set to number with intl dial
                    // code) and initialising plugin removes the dial code from the input, then refresh page,
                    // and we try to init plugin again but this time on number without dial code so get grey flag
                    var attributeValue = this.telInput.getAttribute("value");
                    var inputValue = this.telInput.value;
                    var useAttribute = attributeValue && attributeValue.charAt(0) === "+" && (!inputValue || inputValue.charAt(0) !== "+");
                    var val = useAttribute ? attributeValue : inputValue;
                    var dialCode = this._getDialCode(val);
                    var isRegionlessNanp = this._isRegionlessNanp(val);
                    var _this$options = this.options, initialCountry = _this$options.initialCountry, nationalMode = _this$options.nationalMode, autoHideDialCode = _this$options.autoHideDialCode, separateDialCode = _this$options.separateDialCode;
                    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
                    // flag, else fall back to the default country
                    if (dialCode && !isRegionlessNanp) {
                        this._updateFlagFromNumber(val);
                    } else if (initialCountry !== "auto") {
                        // see if we should select a flag
                        if (initialCountry) {
                            this._setFlag(initialCountry.toLowerCase());
                        } else {
                            if (dialCode && isRegionlessNanp) {
                                // has intl dial code, is regionless nanp, and no initialCountry, so default to US
                                this._setFlag("us");
                            } else {
                                // no dial code and no initialCountry, so default to first in list
                                this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
                                if (!val) {
                                    this._setFlag(this.defaultCountry);
                                }
                            }
                        }
                        // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
                        if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
                            this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
                        }
                    }
                    // NOTE: if initialCountry is set to auto, that will be handled separately
                    // format - note this wont be run after _updateDialCode as that's only called if no val
                    if (val) this._updateValFromNumber(val);
                }
            }, {
                key: "_initListeners",
                value: function _initListeners() {
                    this._initKeyListeners();
                    if (this.options.autoHideDialCode) this._initBlurListeners();
                    if (this.options.allowDropdown) this._initDropdownListeners();
                    if (this.hiddenInput) this._initHiddenInputListener();
                }
            }, {
                key: "_initHiddenInputListener",
                value: function _initHiddenInputListener() {
                    var _this3 = this;
                    this._handleHiddenInputSubmit = function() {
                        _this3.hiddenInput.value = _this3.getNumber();
                    };
                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
                }
            }, {
                key: "_getClosestLabel",
                value: function _getClosestLabel() {
                    var el = this.telInput;
                    while (el && el.tagName !== "LABEL") {
                        el = el.parentNode;
                    }
                    return el;
                }
            }, {
                key: "_initDropdownListeners",
                value: function _initDropdownListeners() {
                    var _this4 = this;
                    // hack for input nested inside label (which is valid markup): clicking the selected-flag to
                    // open the dropdown would then automatically trigger a 2nd click on the input which would
                    // close it again
                    this._handleLabelClick = function(e) {
                        // if the dropdown is closed, then focus the input, else ignore the click
                        if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus(); else e.preventDefault();
                    };
                    var label = this._getClosestLabel();
                    if (label) label.addEventListener("click", this._handleLabelClick);
                    // toggle country dropdown on click
                    this._handleClickSelectedFlag = function() {
                        // only intercept this event if we're opening the dropdown
                        // else let it bubble up to the top ("click-off-to-close" listener)
                        // we cannot just stopPropagation as it may be needed to close another instance
                        if (_this4.countryList.classList.contains("iti__hide") && !_this4.telInput.disabled && !_this4.telInput.readOnly) {
                            _this4._showDropdown();
                        }
                    };
                    this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
                    // open dropdown list if currently focused
                    this._handleFlagsContainerKeydown = function(e) {
                        var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
                        if (isDropdownHidden && [ "ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter" ].indexOf(e.key) !== -1) {
                            // prevent form from being submitted if "ENTER" was pressed
                            e.preventDefault();
                            // prevent event from being handled again by document
                            e.stopPropagation();
                            _this4._showDropdown();
                        }
                        // allow navigation from dropdown to input on TAB
                        if (e.key === "Tab") _this4._closeDropdown();
                    };
                    this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
                }
            }, {
                key: "_initRequests",
                value: function _initRequests() {
                    var _this5 = this;
                    // if the user has specified the path to the utils script, fetch it on window.load, else resolve
                    if (this.options.utilsScript && !window.intlTelInputUtils) {
                        // if the plugin is being initialised after the window.load event has already been fired
                        if (window.intlTelInputGlobals.documentReady()) {
                            window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
                        } else {
                            // wait until the load event so we don't block any other requests e.g. the flags image
                            window.addEventListener("load", function() {
                                window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
                            });
                        }
                    } else this.resolveUtilsScriptPromise();
                    if (this.options.initialCountry === "auto") this._loadAutoCountry(); else this.resolveAutoCountryPromise();
                }
            }, {
                key: "_loadAutoCountry",
                value: function _loadAutoCountry() {
                    // 3 options:
                    // 1) already loaded (we're done)
                    // 2) not already started loading (start)
                    // 3) already started loading (do nothing - just wait for loading callback to fire)
                    if (window.intlTelInputGlobals.autoCountry) {
                        this.handleAutoCountry();
                    } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
                        // don't do this twice!
                        window.intlTelInputGlobals.startedLoadingAutoCountry = true;
                        if (typeof this.options.geoIpLookup === "function") {
                            this.options.geoIpLookup(function(countryCode) {
                                window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
                                // tell all instances the auto country is ready
                                // TODO: this should just be the current instances
                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
                                // setTimeout means that the current thread of execution will finish before executing
                                // this, which allows the plugin to finish initialising.
                                setTimeout(function() {
                                    return forEachInstance("handleAutoCountry");
                                });
                            }, function() {
                                return forEachInstance("rejectAutoCountryPromise");
                            });
                        }
                    }
                }
            }, {
                key: "_initKeyListeners",
                value: function _initKeyListeners() {
                    var _this6 = this;
                    // update flag on keyup
                    this._handleKeyupEvent = function() {
                        if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
                            _this6._triggerCountryChange();
                        }
                    };
                    this.telInput.addEventListener("keyup", this._handleKeyupEvent);
                    // update flag on cut/paste events (now supported in all major browsers)
                    this._handleClipboardEvent = function() {
                        // hack because "paste" event is fired before input is updated
                        setTimeout(_this6._handleKeyupEvent);
                    };
                    this.telInput.addEventListener("cut", this._handleClipboardEvent);
                    this.telInput.addEventListener("paste", this._handleClipboardEvent);
                }
            }, {
                key: "_cap",
                value: function _cap(number) {
                    var max = this.telInput.getAttribute("maxlength");
                    return max && number.length > max ? number.substr(0, max) : number;
                }
            }, {
                key: "_initBlurListeners",
                value: function _initBlurListeners() {
                    var _this7 = this;
                    // on blur or form submit: if just a dial code then remove it
                    this._handleSubmitOrBlurEvent = function() {
                        _this7._removeEmptyDialCode();
                    };
                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
                    this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
                }
            }, {
                key: "_removeEmptyDialCode",
                value: function _removeEmptyDialCode() {
                    if (this.telInput.value.charAt(0) === "+") {
                        var numeric = this._getNumeric(this.telInput.value);
                        // if just a plus, or if just a dial code
                        if (!numeric || this.selectedCountryData.dialCode === numeric) {
                            this.telInput.value = "";
                        }
                    }
                }
            }, {
                key: "_getNumeric",
                value: function _getNumeric(s) {
                    return s.replace(/\D/g, "");
                }
            }, {
                key: "_trigger",
                value: function _trigger(name) {
                    // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
                    var e = document.createEvent("Event");
                    e.initEvent(name, true, true);
                    // can bubble, and is cancellable
                    this.telInput.dispatchEvent(e);
                }
            }, {
                key: "_showDropdown",
                value: function _showDropdown() {
                    this.countryList.classList.remove("iti__hide");
                    this.selectedFlag.setAttribute("aria-expanded", "true");
                    this._setDropdownPosition();
                    // update highlighting and scroll to active list item
                    if (this.activeItem) {
                        this._highlightListItem(this.activeItem, false);
                        this._scrollTo(this.activeItem, true);
                    }
                    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
                    this._bindDropdownListeners();
                    // update the arrow
                    this.dropdownArrow.classList.add("iti__arrow--up");
                    this._trigger("open:countrydropdown");
                }
            }, {
                key: "_toggleClass",
                value: function _toggleClass(el, className, shouldHaveClass) {
                    if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className); else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
                }
            }, {
                key: "_setDropdownPosition",
                value: function _setDropdownPosition() {
                    var _this8 = this;
                    if (this.options.dropdownContainer) {
                        this.options.dropdownContainer.appendChild(this.dropdown);
                    }
                    if (!this.isMobile) {
                        var pos = this.telInput.getBoundingClientRect();
                        // windowTop from https://stackoverflow.com/a/14384091/217866
                        var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                        var inputTop = pos.top + windowTop;
                        var dropdownHeight = this.countryList.offsetHeight;
                        // dropdownFitsBelow = (dropdownBottom < windowBottom)
                        var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
                        var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
                        // by default, the dropdown will be below the input. If we want to position it above the
                        // input, we add the dropup class.
                        this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
                        // if dropdownContainer is enabled, calculate postion
                        if (this.options.dropdownContainer) {
                            // by default the dropdown will be directly over the input because it's not in the flow.
                            // If we want to position it below, we need to add some extra top value.
                            var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
                            // calculate placement
                            this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
                            this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
                            // close menu on window scroll
                            this._handleWindowScroll = function() {
                                return _this8._closeDropdown();
                            };
                            window.addEventListener("scroll", this._handleWindowScroll);
                        }
                    }
                }
            }, {
                key: "_getClosestListItem",
                value: function _getClosestListItem(target) {
                    var el = target;
                    while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
                        el = el.parentNode;
                    }
                    // if we reached the countryList element, then return null
                    return el === this.countryList ? null : el;
                }
            }, {
                key: "_bindDropdownListeners",
                value: function _bindDropdownListeners() {
                    var _this9 = this;
                    // when mouse over a list item, just highlight that one
                    // we add the class "highlight", so if they hit "enter" we know which one to select
                    this._handleMouseoverCountryList = function(e) {
                        // handle event delegation, as we're listening for this event on the countryList
                        var listItem = _this9._getClosestListItem(e.target);
                        if (listItem) _this9._highlightListItem(listItem, false);
                    };
                    this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
                    // listen for country selection
                    this._handleClickCountryList = function(e) {
                        var listItem = _this9._getClosestListItem(e.target);
                        if (listItem) _this9._selectListItem(listItem);
                    };
                    this.countryList.addEventListener("click", this._handleClickCountryList);
                    // click off to close
                    // (except when this initial opening click is bubbling up)
                    // we cannot just stopPropagation as it may be needed to close another instance
                    var isOpening = true;
                    this._handleClickOffToClose = function() {
                        if (!isOpening) _this9._closeDropdown();
                        isOpening = false;
                    };
                    document.documentElement.addEventListener("click", this._handleClickOffToClose);
                    // listen for up/down scrolling, enter to select, or letters to jump to country name.
                    // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
                    // just hit down and hold it to scroll down (no keyup event).
                    // listen on the document because that's where key events are triggered if no input has focus
                    var query = "";
                    var queryTimer = null;
                    this._handleKeydownOnDropdown = function(e) {
                        // prevent down key from scrolling the whole page,
                        // and enter key from submitting a form etc
                        e.preventDefault();
                        // up and down to navigate
                        if (e.key === "ArrowUp" || e.key === "Up" || e.key === "ArrowDown" || e.key === "Down") _this9._handleUpDownKey(e.key); else if (e.key === "Enter") _this9._handleEnterKey(); else if (e.key === "Escape") _this9._closeDropdown(); else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
                            // jump to countries that start with the query string
                            if (queryTimer) clearTimeout(queryTimer);
                            query += e.key.toLowerCase();
                            _this9._searchForCountry(query);
                            // if the timer hits 1 second, reset the query
                            queryTimer = setTimeout(function() {
                                query = "";
                            }, 1e3);
                        }
                    };
                    document.addEventListener("keydown", this._handleKeydownOnDropdown);
                }
            }, {
                key: "_handleUpDownKey",
                value: function _handleUpDownKey(key) {
                    var next = key === "ArrowUp" || key === "Up" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                    if (next) {
                        // skip the divider
                        if (next.classList.contains("iti__divider")) {
                            next = key === "ArrowUp" || key === "Up" ? next.previousElementSibling : next.nextElementSibling;
                        }
                        this._highlightListItem(next, true);
                    }
                }
            }, {
                key: "_handleEnterKey",
                value: function _handleEnterKey() {
                    if (this.highlightedItem) this._selectListItem(this.highlightedItem);
                }
            }, {
                key: "_searchForCountry",
                value: function _searchForCountry(query) {
                    for (var i = 0; i < this.countries.length; i++) {
                        if (this._startsWith(this.countries[i].name, query)) {
                            var listItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2));
                            // update highlighting and scroll
                            this._highlightListItem(listItem, false);
                            this._scrollTo(listItem, true);
                            break;
                        }
                    }
                }
            }, {
                key: "_startsWith",
                value: function _startsWith(a, b) {
                    return a.substr(0, b.length).toLowerCase() === b;
                }
            }, {
                key: "_updateValFromNumber",
                value: function _updateValFromNumber(originalNumber) {
                    var number = originalNumber;
                    if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                        var useNational = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) !== "+");
                        var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
                        var format = useNational ? NATIONAL : INTERNATIONAL;
                        number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
                    }
                    number = this._beforeSetNumber(number);
                    this.telInput.value = number;
                }
            }, {
                key: "_updateFlagFromNumber",
                value: function _updateFlagFromNumber(originalNumber) {
                    // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
                    // with a +1 so _getDialCode will be able to extract the area code
                    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
                    // from the number), that means we're initialising the plugin with a number that already has a
                    // dial code, so fine to ignore this bit
                    var number = originalNumber;
                    var selectedDialCode = this.selectedCountryData.dialCode;
                    var isNanp = selectedDialCode === "1";
                    if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
                        if (number.charAt(0) !== "1") number = "1".concat(number);
                        number = "+".concat(number);
                    }
                    // update flag if user types area code for another country
                    if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
                        number = "+".concat(selectedDialCode).concat(number);
                    }
                    // try and extract valid dial code from input
                    var dialCode = this._getDialCode(number, true);
                    var numeric = this._getNumeric(number);
                    var countryCode = null;
                    if (dialCode) {
                        var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
                        // check if the right country is already selected. this should be false if the number is
                        // longer than the matched dial code because in this case we need to make sure that if
                        // there are multiple country matches, that the first one is selected (note: we could
                        // just check that here, but it requires the same loop that we already have later)
                        var alreadySelected = countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
                        var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
                        // only update the flag if:
                        // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
                        // AND
                        // B) the right country is not already selected
                        if (!isRegionlessNanpNumber && !alreadySelected) {
                            // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
                            // non-empty index
                            for (var j = 0; j < countryCodes.length; j++) {
                                if (countryCodes[j]) {
                                    countryCode = countryCodes[j];
                                    break;
                                }
                            }
                        }
                    } else if (number.charAt(0) === "+" && numeric.length) {
                        // invalid dial code, so empty
                        // Note: use getNumeric here because the number has not been formatted yet, so could contain
                        // bad chars
                        countryCode = "";
                    } else if (!number || number === "+") {
                        // empty, or just a plus, so default
                        countryCode = this.defaultCountry;
                    }
                    if (countryCode !== null) {
                        return this._setFlag(countryCode);
                    }
                    return false;
                }
            }, {
                key: "_isRegionlessNanp",
                value: function _isRegionlessNanp(number) {
                    var numeric = this._getNumeric(number);
                    if (numeric.charAt(0) === "1") {
                        var areaCode = numeric.substr(1, 3);
                        return regionlessNanpNumbers.indexOf(areaCode) !== -1;
                    }
                    return false;
                }
            }, {
                key: "_highlightListItem",
                value: function _highlightListItem(listItem, shouldFocus) {
                    var prevItem = this.highlightedItem;
                    if (prevItem) prevItem.classList.remove("iti__highlight");
                    this.highlightedItem = listItem;
                    this.highlightedItem.classList.add("iti__highlight");
                    if (shouldFocus) this.highlightedItem.focus();
                }
            }, {
                key: "_getCountryData",
                value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
                    var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
                    for (var i = 0; i < countryList.length; i++) {
                        if (countryList[i].iso2 === countryCode) {
                            return countryList[i];
                        }
                    }
                    if (allowFail) {
                        return null;
                    }
                    throw new Error("No country data for '".concat(countryCode, "'"));
                }
            }, {
                key: "_setFlag",
                value: function _setFlag(countryCode) {
                    var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                    // do this first as it will throw an error and stop if countryCode is invalid
                    this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
                    // update the defaultCountry - we only need the iso2 from now on, so just store that
                    if (this.selectedCountryData.iso2) {
                        this.defaultCountry = this.selectedCountryData.iso2;
                    }
                    this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
                    // update the selected country's title attribute
                    var title = countryCode ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
                    this.selectedFlag.setAttribute("title", title);
                    if (this.options.separateDialCode) {
                        var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                        this.selectedDialCode.innerHTML = dialCode;
                        // offsetWidth is zero if input is in a hidden container during initialisation
                        var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                        // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
                        this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
                    }
                    // and the input's placeholder
                    this._updatePlaceholder();
                    // update the active list item
                    if (this.options.allowDropdown) {
                        var prevItem = this.activeItem;
                        if (prevItem) {
                            prevItem.classList.remove("iti__active");
                            prevItem.setAttribute("aria-selected", "false");
                        }
                        if (countryCode) {
                            // check if there is a preferred item first, else fall back to standard
                            var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode));
                            nextItem.setAttribute("aria-selected", "true");
                            nextItem.classList.add("iti__active");
                            this.activeItem = nextItem;
                            this.selectedFlag.setAttribute("aria-activedescendant", nextItem.getAttribute("id"));
                        }
                    }
                    // return if the flag has changed or not
                    return prevCountry.iso2 !== countryCode;
                }
            }, {
                key: "_getHiddenSelectedFlagWidth",
                value: function _getHiddenSelectedFlagWidth() {
                    // to get the right styling to apply, all we need is a shallow clone of the container,
                    // and then to inject a deep clone of the selectedFlag element
                    var containerClone = this.telInput.parentNode.cloneNode();
                    containerClone.style.visibility = "hidden";
                    document.body.appendChild(containerClone);
                    var flagsContainerClone = this.flagsContainer.cloneNode();
                    containerClone.appendChild(flagsContainerClone);
                    var selectedFlagClone = this.selectedFlag.cloneNode(true);
                    flagsContainerClone.appendChild(selectedFlagClone);
                    var width = selectedFlagClone.offsetWidth;
                    containerClone.parentNode.removeChild(containerClone);
                    return width;
                }
            }, {
                key: "_updatePlaceholder",
                value: function _updatePlaceholder() {
                    var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
                    if (window.intlTelInputUtils && shouldSetPlaceholder) {
                        var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
                        var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
                        placeholder = this._beforeSetNumber(placeholder);
                        if (typeof this.options.customPlaceholder === "function") {
                            placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
                        }
                        this.telInput.setAttribute("placeholder", placeholder);
                    }
                }
            }, {
                key: "_selectListItem",
                value: function _selectListItem(listItem) {
                    // update selected flag and active list item
                    var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
                    this._closeDropdown();
                    this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
                    // focus the input
                    this.telInput.focus();
                    // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
                    // inserting dial code), who try to put the cursor at the beginning the first time
                    var len = this.telInput.value.length;
                    this.telInput.setSelectionRange(len, len);
                    if (flagChanged) {
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "_closeDropdown",
                value: function _closeDropdown() {
                    this.countryList.classList.add("iti__hide");
                    this.selectedFlag.setAttribute("aria-expanded", "false");
                    // update the arrow
                    this.dropdownArrow.classList.remove("iti__arrow--up");
                    // unbind key events
                    document.removeEventListener("keydown", this._handleKeydownOnDropdown);
                    document.documentElement.removeEventListener("click", this._handleClickOffToClose);
                    this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
                    this.countryList.removeEventListener("click", this._handleClickCountryList);
                    // remove menu from container
                    if (this.options.dropdownContainer) {
                        if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
                        if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
                    }
                    this._trigger("close:countrydropdown");
                }
            }, {
                key: "_scrollTo",
                value: function _scrollTo(element, middle) {
                    var container = this.countryList;
                    // windowTop from https://stackoverflow.com/a/14384091/217866
                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
                    var containerHeight = container.offsetHeight;
                    var containerTop = container.getBoundingClientRect().top + windowTop;
                    var containerBottom = containerTop + containerHeight;
                    var elementHeight = element.offsetHeight;
                    var elementTop = element.getBoundingClientRect().top + windowTop;
                    var elementBottom = elementTop + elementHeight;
                    var newScrollTop = elementTop - containerTop + container.scrollTop;
                    var middleOffset = containerHeight / 2 - elementHeight / 2;
                    if (elementTop < containerTop) {
                        // scroll up
                        if (middle) newScrollTop -= middleOffset;
                        container.scrollTop = newScrollTop;
                    } else if (elementBottom > containerBottom) {
                        // scroll down
                        if (middle) newScrollTop += middleOffset;
                        var heightDifference = containerHeight - elementHeight;
                        container.scrollTop = newScrollTop - heightDifference;
                    }
                }
            }, {
                key: "_updateDialCode",
                value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
                    var inputVal = this.telInput.value;
                    // save having to pass this every time
                    var newDialCode = "+".concat(newDialCodeBare);
                    var newNumber;
                    if (inputVal.charAt(0) === "+") {
                        // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
                        var prevDialCode = this._getDialCode(inputVal);
                        if (prevDialCode) {
                            // current number contains a valid dial code, so replace it
                            newNumber = inputVal.replace(prevDialCode, newDialCode);
                        } else {
                            // current number contains an invalid dial code, so ditch it
                            // (no way to determine where the invalid dial code ends and the rest of the number begins)
                            newNumber = newDialCode;
                        }
                    } else if (this.options.nationalMode || this.options.separateDialCode) {
                        // don't do anything
                        return;
                    } else {
                        // nationalMode is disabled
                        if (inputVal) {
                            // there is an existing value with no dial code: prefix the new dial code
                            newNumber = newDialCode + inputVal;
                        } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
                            // no existing value and either they've just selected a list item, or autoHideDialCode is
                            // disabled: insert new dial code
                            newNumber = newDialCode;
                        } else {
                            return;
                        }
                    }
                    this.telInput.value = newNumber;
                }
            }, {
                key: "_getDialCode",
                value: function _getDialCode(number, includeAreaCode) {
                    var dialCode = "";
                    // only interested in international numbers (starting with a plus)
                    if (number.charAt(0) === "+") {
                        var numericChars = "";
                        // iterate over chars
                        for (var i = 0; i < number.length; i++) {
                            var c = number.charAt(i);
                            // if char is number (https://stackoverflow.com/a/8935649/217866)
                            if (!isNaN(parseInt(c, 10))) {
                                numericChars += c;
                                // if current numericChars make a valid dial code
                                if (includeAreaCode) {
                                    if (this.countryCodes[numericChars]) {
                                        // store the actual raw string (useful for matching later)
                                        dialCode = number.substr(0, i + 1);
                                    }
                                } else {
                                    if (this.dialCodes[numericChars]) {
                                        dialCode = number.substr(0, i + 1);
                                        // if we're just looking for a dial code, we can break as soon as we find one
                                        break;
                                    }
                                }
                                // stop searching as soon as we can - in this case when we hit max len
                                if (numericChars.length === this.countryCodeMaxLen) {
                                    break;
                                }
                            }
                        }
                    }
                    return dialCode;
                }
            }, {
                key: "_getFullNumber",
                value: function _getFullNumber() {
                    var val = this.telInput.value.trim();
                    var dialCode = this.selectedCountryData.dialCode;
                    var prefix;
                    var numericVal = this._getNumeric(val);
                    if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
                        // when using separateDialCode, it is visible so is effectively part of the typed number
                        prefix = "+".concat(dialCode);
                    } else {
                        prefix = "";
                    }
                    return prefix + val;
                }
            }, {
                key: "_beforeSetNumber",
                value: function _beforeSetNumber(originalNumber) {
                    var number = originalNumber;
                    if (this.options.separateDialCode) {
                        var dialCode = this._getDialCode(number);
                        // if there is a valid dial code
                        if (dialCode) {
                            // in case _getDialCode returned an area code as well
                            dialCode = "+".concat(this.selectedCountryData.dialCode);
                            // a lot of numbers will have a space separating the dial code and the main number, and
                            // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
                            // rid of it
                            // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
                            var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
                            number = number.substr(start);
                        }
                    }
                    return this._cap(number);
                }
            }, {
                key: "_triggerCountryChange",
                value: function _triggerCountryChange() {
                    this._trigger("countrychange");
                }
            }, {
                key: "handleAutoCountry",
                value: function handleAutoCountry() {
                    if (this.options.initialCountry === "auto") {
                        // we must set this even if there is an initial val in the input: in case the initial val is
                        // invalid and they delete it - they should see their auto country
                        this.defaultCountry = window.intlTelInputGlobals.autoCountry;
                        // if there's no initial value in the input, then update the flag
                        if (!this.telInput.value) {
                            this.setCountry(this.defaultCountry);
                        }
                        this.resolveAutoCountryPromise();
                    }
                }
            }, {
                key: "handleUtils",
                value: function handleUtils() {
                    // if the request was successful
                    if (window.intlTelInputUtils) {
                        // if there's an initial value in the input, then format it
                        if (this.telInput.value) {
                            this._updateValFromNumber(this.telInput.value);
                        }
                        this._updatePlaceholder();
                    }
                    this.resolveUtilsScriptPromise();
                }
            }, {
                key: "destroy",
                value: function destroy() {
                    var form = this.telInput.form;
                    if (this.options.allowDropdown) {
                        // make sure the dropdown is closed (and unbind listeners)
                        this._closeDropdown();
                        this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
                        this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                        // label click hack
                        var label = this._getClosestLabel();
                        if (label) label.removeEventListener("click", this._handleLabelClick);
                    }
                    // unbind hiddenInput listeners
                    if (this.hiddenInput && form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
                    // unbind autoHideDialCode listeners
                    if (this.options.autoHideDialCode) {
                        if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
                        this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
                    }
                    // unbind key events, and cut/paste events
                    this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
                    this.telInput.removeEventListener("cut", this._handleClipboardEvent);
                    this.telInput.removeEventListener("paste", this._handleClipboardEvent);
                    // remove attribute of id instance: data-intl-tel-input-id
                    this.telInput.removeAttribute("data-intl-tel-input-id");
                    // remove markup (but leave the original input)
                    var wrapper = this.telInput.parentNode;
                    wrapper.parentNode.insertBefore(this.telInput, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                    delete window.intlTelInputGlobals.instances[this.id];
                }
            }, {
                key: "getExtension",
                value: function getExtension() {
                    if (window.intlTelInputUtils) {
                        return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
                    }
                    return "";
                }
            }, {
                key: "getNumber",
                value: function getNumber(format) {
                    if (window.intlTelInputUtils) {
                        var iso2 = this.selectedCountryData.iso2;
                        return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
                    }
                    return "";
                }
            }, {
                key: "getNumberType",
                value: function getNumberType() {
                    if (window.intlTelInputUtils) {
                        return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
                    }
                    return -99;
                }
            }, {
                key: "getSelectedCountryData",
                value: function getSelectedCountryData() {
                    return this.selectedCountryData;
                }
            }, {
                key: "getValidationError",
                value: function getValidationError() {
                    if (window.intlTelInputUtils) {
                        var iso2 = this.selectedCountryData.iso2;
                        return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
                    }
                    return -99;
                }
            }, {
                key: "isValidNumber",
                value: function isValidNumber() {
                    var val = this._getFullNumber().trim();
                    var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
                    return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
                }
            }, {
                key: "setCountry",
                value: function setCountry(originalCountryCode) {
                    var countryCode = originalCountryCode.toLowerCase();
                    // check if already selected
                    if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
                        this._setFlag(countryCode);
                        this._updateDialCode(this.selectedCountryData.dialCode, false);
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "setNumber",
                value: function setNumber(number) {
                    // we must update the flag first, which updates this.selectedCountryData, which is used for
                    // formatting the number before displaying it
                    var flagChanged = this._updateFlagFromNumber(number);
                    this._updateValFromNumber(number);
                    if (flagChanged) {
                        this._triggerCountryChange();
                    }
                }
            }, {
                key: "setPlaceholderNumberType",
                value: function setPlaceholderNumberType(type) {
                    this.options.placeholderNumberType = type;
                    this._updatePlaceholder();
                }
            } ]);
            return Iti;
        }();
        /********************
 *  STATIC METHODS
 ********************/
        // get the country data object
        intlTelInputGlobals.getCountryData = function() {
            return allCountries;
        };
        // inject a <script> element to load utils.js
        var injectScript = function injectScript(path, handleSuccess, handleFailure) {
            // inject a new script element into the page
            var script = document.createElement("script");
            script.onload = function() {
                forEachInstance("handleUtils");
                if (handleSuccess) handleSuccess();
            };
            script.onerror = function() {
                forEachInstance("rejectUtilsScriptPromise");
                if (handleFailure) handleFailure();
            };
            script.className = "iti-load-utils";
            script.async = true;
            script.src = path;
            document.body.appendChild(script);
        };
        // load the utils script
        intlTelInputGlobals.loadUtils = function(path) {
            // 2 options:
            // 1) not already started loading (start)
            // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
            // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
            if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                // only do this once
                window.intlTelInputGlobals.startedLoadingUtilsScript = true;
                // if we have promises, then return a promise
                if (typeof Promise !== "undefined") {
                    return new Promise(function(resolve, reject) {
                        return injectScript(path, resolve, reject);
                    });
                }
                injectScript(path);
            }
            return null;
        };
        // default options
        intlTelInputGlobals.defaults = defaults;
        // version
        intlTelInputGlobals.version = "17.0.18";
        // convenience wrapper
        return function(input, options) {
            var iti = new Iti(input, options);
            iti._init();
            input.setAttribute("data-intl-tel-input-id", iti.id);
            window.intlTelInputGlobals.instances[iti.id] = iti;
            return iti;
        };
    }();
});
},{}],100:[function(require,module,exports){
/**
 * Exposing intl-tel-input as a component
 */
module.exports = require("./build/js/intlTelInput");

},{"./build/js/intlTelInput":99}],101:[function(require,module,exports){
(function (process){
/**
 * Memize options object.
 *
 * @typedef MemizeOptions
 *
 * @property {number} [maxSize] Maximum size of the cache.
 */

/**
 * Internal cache entry.
 *
 * @typedef MemizeCacheNode
 *
 * @property {?MemizeCacheNode|undefined} [prev] Previous node.
 * @property {?MemizeCacheNode|undefined} [next] Next node.
 * @property {Array<*>}                   args   Function arguments for cache
 *                                               entry.
 * @property {*}                          val    Function result.
 */

/**
 * Properties of the enhanced function for controlling cache.
 *
 * @typedef MemizeMemoizedFunction
 *
 * @property {()=>void} clear Clear the cache.
 */

/**
 * Accepts a function to be memoized, and returns a new memoized function, with
 * optional options.
 *
 * @template {Function} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {F & MemizeMemoizedFunction} Memoized function.
 */
function memize( fn, options ) {
	var size = 0;

	/** @type {?MemizeCacheNode|undefined} */
	var head;

	/** @type {?MemizeCacheNode|undefined} */
	var tail;

	options = options || {};

	function memoized( /* ...args */ ) {
		var node = head,
			len = arguments.length,
			args, i;

		searchCache: while ( node ) {
			// Perform a shallow equality test to confirm that whether the node
			// under test is a candidate for the arguments passed. Two arrays
			// are shallowly equal if their length matches and each entry is
			// strictly equal between the two sets. Avoid abstracting to a
			// function which could incur an arguments leaking deoptimization.

			// Check whether node arguments match arguments length
			if ( node.args.length !== arguments.length ) {
				node = node.next;
				continue;
			}

			// Check whether node arguments match arguments values
			for ( i = 0; i < len; i++ ) {
				if ( node.args[ i ] !== arguments[ i ] ) {
					node = node.next;
					continue searchCache;
				}
			}

			// At this point we can assume we've found a match

			// Surface matched node to head if not already
			if ( node !== head ) {
				// As tail, shift to previous. Must only shift if not also
				// head, since if both head and tail, there is no previous.
				if ( node === tail ) {
					tail = node.prev;
				}

				// Adjust siblings to point to each other. If node was tail,
				// this also handles new tail's empty `next` assignment.
				/** @type {MemizeCacheNode} */ ( node.prev ).next = node.next;
				if ( node.next ) {
					node.next.prev = node.prev;
				}

				node.next = head;
				node.prev = null;
				/** @type {MemizeCacheNode} */ ( head ).prev = node;
				head = node;
			}

			// Return immediately
			return node.val;
		}

		// No cached value found. Continue to insertion phase:

		// Create a copy of arguments (avoid leaking deoptimization)
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}

		node = {
			args: args,

			// Generate the result from original function
			val: fn.apply( null, args ),
		};

		// Don't need to check whether node is already head, since it would
		// have been returned above already if it was

		// Shift existing head down list
		if ( head ) {
			head.prev = node;
			node.next = head;
		} else {
			// If no head, follows that there's no tail (at initial or reset)
			tail = node;
		}

		// Trim tail if we're reached max size and are pending cache insertion
		if ( size === /** @type {MemizeOptions} */ ( options ).maxSize ) {
			tail = /** @type {MemizeCacheNode} */ ( tail ).prev;
			/** @type {MemizeCacheNode} */ ( tail ).next = null;
		} else {
			size++;
		}

		head = node;

		return node.val;
	}

	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};

	if ( process.env.NODE_ENV === 'test' ) {
		// Cache is not exposed in the public API, but used in tests to ensure
		// expected list progression
		memoized.getCache = function() {
			return [ head, tail, size ];
		};
	}

	// Ignore reason: There's not a clear solution to create an intersection of
	// the function with additional properties, where the goal is to retain the
	// function signature of the incoming argument and add control properties
	// on the return value.

	// @ts-ignore
	return memoized;
}

module.exports = memize;

}).call(this,require('_process'))
},{"_process":102}],102:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],103:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],104:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pluralForms = _interopDefault(require('@tannin/plural-forms'));

/**
 * Tannin constructor options.
 *
 * @typedef {Object} TanninOptions
 *
 * @property {string}   [contextDelimiter] Joiner in string lookup with context.
 * @property {Function} [onMissingKey]     Callback to invoke when key missing.
 */

/**
 * Domain metadata.
 *
 * @typedef {Object} TanninDomainMetadata
 *
 * @property {string}            [domain]       Domain name.
 * @property {string}            [lang]         Language code.
 * @property {(string|Function)} [plural_forms] Plural forms expression or
 *                                              function evaluator.
 */

/**
 * Domain translation pair respectively representing the singular and plural
 * translation.
 *
 * @typedef {[string,string]} TanninTranslation
 */

/**
 * Locale data domain. The key is used as reference for lookup, the value an
 * array of two string entries respectively representing the singular and plural
 * translation.
 *
 * @typedef {{[key:string]:TanninDomainMetadata|TanninTranslation,'':TanninDomainMetadata|TanninTranslation}} TanninLocaleDomain
 */

/**
 * Jed-formatted locale data.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @typedef {{[domain:string]:TanninLocaleDomain}} TanninLocaleData
 */

/**
 * Default Tannin constructor options.
 *
 * @type {TanninOptions}
 */
var DEFAULT_OPTIONS = {
	contextDelimiter: '\u0004',
	onMissingKey: null,
};

/**
 * Given a specific locale data's config `plural_forms` value, returns the
 * expression.
 *
 * @example
 *
 * ```
 * getPluralExpression( 'nplurals=2; plural=(n != 1);' ) === '(n != 1)'
 * ```
 *
 * @param {string} pf Locale data plural forms.
 *
 * @return {string} Plural forms expression.
 */
function getPluralExpression( pf ) {
	var parts, i, part;

	parts = pf.split( ';' );

	for ( i = 0; i < parts.length; i++ ) {
		part = parts[ i ].trim();
		if ( part.indexOf( 'plural=' ) === 0 ) {
			return part.substr( 7 );
		}
	}
}

/**
 * Tannin constructor.
 *
 * @class
 *
 * @param {TanninLocaleData} data      Jed-formatted locale data.
 * @param {TanninOptions}    [options] Tannin options.
 */
function Tannin( data, options ) {
	var key;

	/**
	 * Jed-formatted locale data.
	 *
	 * @name Tannin#data
	 * @type {TanninLocaleData}
	 */
	this.data = data;

	/**
	 * Plural forms function cache, keyed by plural forms string.
	 *
	 * @name Tannin#pluralForms
	 * @type {Object<string,Function>}
	 */
	this.pluralForms = {};

	/**
	 * Effective options for instance, including defaults.
	 *
	 * @name Tannin#options
	 * @type {TanninOptions}
	 */
	this.options = {};

	for ( key in DEFAULT_OPTIONS ) {
		this.options[ key ] = options !== undefined && key in options
			? options[ key ]
			: DEFAULT_OPTIONS[ key ];
	}
}

/**
 * Returns the plural form index for the given domain and value.
 *
 * @param {string} domain Domain on which to calculate plural form.
 * @param {number} n      Value for which plural form is to be calculated.
 *
 * @return {number} Plural form index.
 */
Tannin.prototype.getPluralForm = function( domain, n ) {
	var getPluralForm = this.pluralForms[ domain ],
		config, plural, pf;

	if ( ! getPluralForm ) {
		config = this.data[ domain ][ '' ];

		pf = (
			config[ 'Plural-Forms' ] ||
			config[ 'plural-forms' ] ||
			// Ignore reason: As known, there's no way to document the empty
			// string property on a key to guarantee this as metadata.
			// @ts-ignore
			config.plural_forms
		);

		if ( typeof pf !== 'function' ) {
			plural = getPluralExpression(
				config[ 'Plural-Forms' ] ||
				config[ 'plural-forms' ] ||
				// Ignore reason: As known, there's no way to document the empty
				// string property on a key to guarantee this as metadata.
				// @ts-ignore
				config.plural_forms
			);

			pf = pluralForms( plural );
		}

		getPluralForm = this.pluralForms[ domain ] = pf;
	}

	return getPluralForm( n );
};

/**
 * Translate a string.
 *
 * @param {string}      domain   Translation domain.
 * @param {string|void} context  Context distinguishing terms of the same name.
 * @param {string}      singular Primary key for translation lookup.
 * @param {string=}     plural   Fallback value used for non-zero plural
 *                               form index.
 * @param {number=}     n        Value to use in calculating plural form.
 *
 * @return {string} Translated string.
 */
Tannin.prototype.dcnpgettext = function( domain, context, singular, plural, n ) {
	var index, key, entry;

	if ( n === undefined ) {
		// Default to singular.
		index = 0;
	} else {
		// Find index by evaluating plural form for value.
		index = this.getPluralForm( domain, n );
	}

	key = singular;

	// If provided, context is prepended to key with delimiter.
	if ( context ) {
		key = context + this.options.contextDelimiter + singular;
	}

	entry = this.data[ domain ][ key ];

	// Verify not only that entry exists, but that the intended index is within
	// range and non-empty.
	if ( entry && entry[ index ] ) {
		return entry[ index ];
	}

	if ( this.options.onMissingKey ) {
		this.options.onMissingKey( singular, domain );
	}

	// If entry not found, fall back to singular vs. plural with zero index
	// representing the singular value.
	return index === 0 ? singular : plural;
};

module.exports = Tannin;

},{"@tannin/plural-forms":92}]},{},[13]);
