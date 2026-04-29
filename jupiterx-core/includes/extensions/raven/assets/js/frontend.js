(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function ($) {
  const RavenFrontend = function () {
    const checkWidgetIsActive = function (widget) {
      let activeElements = window.ravenTools.activeElements;
      if (typeof window.ravenTools.activeElements === 'object') {
        activeElements = Object.values(window.ravenTools.activeElements);
      }
      return !!activeElements.includes(widget);
    };
    const addGlobalBodyTypography = function () {
      // Check if ravenTools exists and has globalTypography defined.
      if (!window.ravenTools || !window.ravenTools.globalTypography) {
        return;
      }
      const {
        globalTypography
      } = window.ravenTools;
      if (globalTypography.fontFamily || globalTypography.fontSize?.size || globalTypography.lineHeight?.size || globalTypography.color) {
        $('body .jupiterx-site').addClass('jupiterx-global-style');
      }
    };
    const widgets = {
      'raven-button.default': checkWidgetIsActive('button') && require('./widgets/button').default,
      'raven-product-add-to-cart.default': checkWidgetIsActive('add-to-cart') && require('./widgets/add-to-cart').default,
      'raven-alert.default': checkWidgetIsActive('alert') && require('./widgets/alert').default,
      'raven-advanced-accordion.default': checkWidgetIsActive('advanced-accordion') && require('./widgets/advanced-accordion').default,
      'raven-countdown.default': checkWidgetIsActive('countdown') && require('./widgets/countdown').default,
      'raven-counter.default': checkWidgetIsActive('counter') && require('./widgets/counter').default,
      'raven-code-highlight.default': checkWidgetIsActive('code-highlight') && require('./widgets/code-highlight').default,
      'raven-form.default': checkWidgetIsActive('forms') && require('./widgets/form').default,
      'raven-reset-password.default': checkWidgetIsActive('forms') && require('./widgets/form').default,
      'raven-login.default': checkWidgetIsActive('forms') && require('./widgets/form').default,
      'raven-register.default': checkWidgetIsActive('forms') && require('./widgets/form').default,
      'raven-social-login.default': checkWidgetIsActive('forms') && require('./widgets/social-login').default,
      'raven-photo-roller.default': checkWidgetIsActive('photo-roller') && require('./widgets/photo-roller').default,
      'raven-tabs.default': checkWidgetIsActive('tabs') && require('./widgets/tabs').default,
      'raven-video.default': checkWidgetIsActive('video') && require('./widgets/video').default,
      'raven-video-playlist.default': checkWidgetIsActive('video-playlist') && require('./widgets/video-playlist/handler').default,
      'raven-categories.outer_content': checkWidgetIsActive('categories') && require('./widgets/categories').default,
      'raven-categories.inner_content': checkWidgetIsActive('categories') && require('./widgets/categories').default,
      'raven-posts.classic': checkWidgetIsActive('posts') && require('./widgets/posts').classic,
      'raven-posts.cover': checkWidgetIsActive('posts') && require('./widgets/posts').cover,
      'raven-post-comments.default': checkWidgetIsActive('post-comments') && require('./widgets/post-comments').default,
      'raven-posts-carousel.classic': checkWidgetIsActive('posts') && require('./widgets/posts-carousel').classic,
      'raven-posts-carousel.cover': checkWidgetIsActive('posts') && require('./widgets/posts-carousel').cover,
      'raven-progress-tracker.default': checkWidgetIsActive('progress-tracker') && require('./widgets/progress-tracker').default,
      'raven-photo-album.cover': checkWidgetIsActive('photo-album') && require('./widgets/photo-album').default,
      'raven-photo-album.stack': checkWidgetIsActive('photo-album') && require('./widgets/photo-album').default,
      'raven-product-reviews.default': checkWidgetIsActive('product-reviews') && require('./widgets/product-reviews').default,
      'raven-media-gallery.default': checkWidgetIsActive('media-gallery') && require('./widgets/media-gallery').default,
      'raven-search-form.classic': checkWidgetIsActive('search-form') && require('./widgets/search-form').classic,
      'raven-search-form.full': checkWidgetIsActive('search-form') && require('./widgets/search-form').full,
      'raven-table-of-contents.default': checkWidgetIsActive('table-of-contents') && require('./widgets/table-of-content').default,
      'raven-nav-menu.default': checkWidgetIsActive('nav-menu') && require('./widgets/nav-menu').default,
      'raven-advanced-nav-menu.default': checkWidgetIsActive('advanced-nav-menu') && require('./widgets/advanced-nav-menu').default,
      'raven-sticky-media-scroller.default': checkWidgetIsActive('sticky-media-scroller') && require('./widgets/sticky-media-scroller').default,
      'raven-wc-products.default': checkWidgetIsActive('products') && require('./widgets/wc-products').default,
      'raven-content-switch.default': checkWidgetIsActive('content-switch') && require('./widgets/content-switch').default,
      'raven-product-gallery.default': checkWidgetIsActive('product-gallery') && require('./widgets/product-gallery').default,
      'raven-product-data-tabs.default': checkWidgetIsActive('product-data-tabs') && require('./widgets/product-data-tabs').default,
      'raven-my-account.default': checkWidgetIsActive('my-account') && require('./widgets/my-account').default,
      'raven-image-comparison.default': checkWidgetIsActive('image-comparison') && require('./widgets/image-comparison').default,
      'raven-image-accordion.default': checkWidgetIsActive('image-accordion') && require('./widgets/image-accordion').default,
      'raven-animated-heading.default': checkWidgetIsActive('animated-heading') && require('./widgets/animated-heading').default,
      'raven-hotspot.default': checkWidgetIsActive('hotspot') && require('./widgets/hotspot').default,
      'raven-media-carousel.default': checkWidgetIsActive('carousel') && require('./widgets/carousel/media-carousel').default,
      'raven-testimonial-carousel.default': checkWidgetIsActive('carousel') && require('./widgets/carousel/testimonial-carousel').default,
      'raven-slider.default': checkWidgetIsActive('slider') && require('./widgets/slider').default,
      'raven-social-share.default': checkWidgetIsActive('social-share') && require('./widgets/social-share').default,
      'raven-reviews.default': checkWidgetIsActive('carousel') && require('./widgets/carousel/testimonial-carousel').default,
      'raven-stripe-button.default': checkWidgetIsActive('stripe') && require('./widgets/stripe-button').default,
      'raven-paypal-button.default': checkWidgetIsActive('paypal') && require('./widgets/paypal-button').default,
      'raven-lottie.default': checkWidgetIsActive('lottie') && require('./widgets/lottie').default,
      'raven-cart.default': checkWidgetIsActive('cart') && require('./widgets/cart').default,
      'raven-advanced-posts.default': checkWidgetIsActive('advanced-posts') && require('./widgets/advanced-posts').default,
      'raven-post-navigation.default': checkWidgetIsActive('post-navigation') && require('./widgets/post-navigation').default,
      'raven-products-carousel.default': checkWidgetIsActive('products-carousel') && require('./widgets/products-carousel').default,
      'raven-shopping-cart.default': checkWidgetIsActive('shopping-cart') && require('./widgets/shopping-cart').default,
      'raven-circle-progress.default': checkWidgetIsActive('circle-progress') && require('./widgets/circle-progress').default
    };
    function elementorInit() {
      for (const widget in widgets) {
        elementorFrontend.hooks.addAction(`frontend/element_ready/${widget}`, widgets[widget]);
      }

      // Lunch motion effects.
      new (require('./utils/motion-effects/luncher').default)();
      if (typeof elementorPro === 'undefined' && typeof window.elementor !== 'undefined' && $('.elementor').length > 0) {
        const fullPageEditor = require('./utils/full-page-editor');
        fullPageEditor.handleFullPageEditorBtn();
        fullPageEditor.handleHeaderBtns();
      }

      // Add global body typography.
      addGlobalBodyTypography();
      require('./utils/wrapper-link');
      require('./widgets/column');
      require('./popup/popup').default.init();
      require('./utils/tooltip');
      require('./utils/animated-gradient');
      require('./utils/header');
    }
    this.Module = require('./utils/module');
    this.utils = {
      Masonry: require('./utils/masonry'),
      Sortable: require('./utils/sortable'),
      Pagination: require('./utils/pagination'),
      Detector: require('./utils/detectr'),
      SmoothScroll: require('./utils/smoothscroll-jx-polyfill'),
      GoogleLogin: require('./widgets/social-login')
    };
    this.init = () => {
      $(window).on('elementor/frontend/init', elementorInit);
    };
    this.init();
  };
  window.ravenFrontend = new RavenFrontend();
})(jQuery);

},{"./popup/popup":3,"./utils/animated-gradient":4,"./utils/detectr":5,"./utils/full-page-editor":6,"./utils/header":7,"./utils/masonry":8,"./utils/module":9,"./utils/motion-effects/luncher":16,"./utils/pagination":20,"./utils/smoothscroll-jx-polyfill":21,"./utils/sortable":22,"./utils/tooltip":23,"./utils/wrapper-link":24,"./widgets/add-to-cart":25,"./widgets/advanced-accordion":26,"./widgets/advanced-nav-menu":27,"./widgets/advanced-posts":28,"./widgets/alert":29,"./widgets/animated-heading":30,"./widgets/button":31,"./widgets/carousel/media-carousel":33,"./widgets/carousel/testimonial-carousel":34,"./widgets/cart":35,"./widgets/categories":36,"./widgets/circle-progress":37,"./widgets/code-highlight":38,"./widgets/column":39,"./widgets/content-switch":40,"./widgets/countdown":41,"./widgets/counter":42,"./widgets/form":43,"./widgets/hotspot":44,"./widgets/image-accordion":45,"./widgets/image-comparison":46,"./widgets/lottie":47,"./widgets/media-gallery":48,"./widgets/my-account":49,"./widgets/nav-menu":50,"./widgets/paypal-button":51,"./widgets/photo-album":52,"./widgets/photo-roller":53,"./widgets/post-comments":54,"./widgets/post-navigation":55,"./widgets/posts":57,"./widgets/posts-carousel":56,"./widgets/product-data-tabs":58,"./widgets/product-gallery":59,"./widgets/product-reviews":60,"./widgets/products-carousel":61,"./widgets/progress-tracker":62,"./widgets/search-form":63,"./widgets/shopping-cart":64,"./widgets/slider":65,"./widgets/social-login":66,"./widgets/social-share":67,"./widgets/sticky-media-scroller":68,"./widgets/stripe-button":69,"./widgets/table-of-content":70,"./widgets/tabs":71,"./widgets/video":83,"./widgets/video-playlist/handler":74,"./widgets/wc-products":84}],2:[function(require,module,exports){
const $ = jQuery;
window.jupiterxPopupSettings = function ($popup, settings, triggers) {
  const $window = $(window),
    $document = $(document),
    popupSettings = settings,
    popupTriggers = triggers,
    id = popupSettings.id,
    popupId = popupSettings.jupiterx_popup_id,
    editMode = Boolean(elementorFrontend.isEditMode()),
    validTriggerFunctionList = [];
  let isTriggerValid = false;
  let canPopupDisplayImmediatly = false;
  let isAnyTriggerNotValid = false;
  let triggerRelation = 'or';
  let ajaxContentLoaded = false;
  let inactivityTimeout;
  let isUTMMatch;
  const hasResetTimerRun = []; //used for after inactivity trigger to display popup only once per page load

  this.init = function () {
    if (editMode || $('.jupiterx-popup').length > 1 && this.handleAvoidMultiplePopups()) {
      return false;
    }
    this.handlePopupCloseActionLocalStorage();
    this.handleButtonWidgetClick();
    this.handlePopupLocalStorage();
    if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) === 'true' || window.localStorage.getItem('jupiterx_popup_closed_permanently_' + id) === 'true') {
      return;
    }
    this.handlePopupAction();

    // Custom selector.
    if (popupSettings.custom_selector) {
      this.onCustomSelector(popupSettings.custom_selector);
    }
    this.initOpenEvent();
    this.initCloseEvent();
    if (popupTriggers.length === 0) {
      this.removeEntranceAnimationClass();
    }
    if (popupTriggers.relation_logic) {
      triggerRelation = popupTriggers.relation_logic?.control;
    }

    // On date.
    /* eslint-disable camelcase */
    if (popupTriggers.on_date) {
      const currentDate = new Date();
      const triggerDate = new Date(popupTriggers.on_date.control * 1000);
      if (currentDate.toDateString() !== triggerDate.toDateString()) {
        isAnyTriggerNotValid = true;
      } else {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      }
    }

    // On date range.
    if (popupTriggers?.on_date_range?.control) {
      const currentDate = new Date();
      const startDate = new Date(popupTriggers.on_date_range.control.start_date * 1000);
      const endDate = new Date(popupTriggers.on_date_range.control.end_date * 1000);
      if (!(currentDate >= startDate && currentDate <= endDate)) {
        isAnyTriggerNotValid = true;
      } else {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      }
    }

    // On time range.
    if (popupTriggers?.time_range?.control) {
      // Get the current time in the specified timezone.
      const currentTime = new Date().toLocaleTimeString('en-US', {
        timeZone: popupTriggers.time_range.control.timezone
      });
      // Convert the start time and due time to Date objects with the current date.
      const startDate = new Date(new Date().toLocaleDateString() + ' ' + popupTriggers.time_range.control.start_time).getTime();
      const dueDate = new Date(new Date().toLocaleDateString() + ' ' + popupTriggers.time_range.control.due_time).getTime();
      // Convert the current time to a Unix timestamp.
      const currentTimestamp = new Date(new Date().toLocaleDateString() + ' ' + currentTime).getTime();
      if (!(startDate <= currentTimestamp && currentTimestamp <= dueDate)) {
        isAnyTriggerNotValid = true;
      } else {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      }
    }

    // On Page Exit Intent.
    if (popupTriggers?.on_page_exit_intent) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'on_page_exit_intent',
        value: popupTriggers?.on_page_exit_intent,
        canRun: false
      });
    }

    // On Page load.
    if (popupTriggers?.on_page_load) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'on_page_load',
        value: popupTriggers?.on_page_load,
        canRun: false
      });
    }

    // On Scroll.
    if (popupTriggers?.on_scroll?.control?.direction) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'on_page_scroll',
        value: popupTriggers?.on_scroll,
        canRun: false
      });
    }

    // On Scroll Element.
    if (popupTriggers?.on_scroll_to_element?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'on_scroll_to_element',
        value: popupTriggers?.on_scroll_to_element,
        canRun: false
      });
    }

    // After X Page Views.
    if (popupTriggers?.show_after_x_page_views?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'show_after_x_page_views',
        value: popupTriggers?.show_after_x_page_views,
        canRun: false
      });
    }

    // After X Visits.
    if (popupTriggers?.show_after_x_visits?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'show_after_x_visits',
        value: popupTriggers?.show_after_x_visits,
        canRun: false
      });
    }

    // URL Referrer.
    if (popupTriggers?.url_referrer?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'url_referrer',
        value: popupTriggers?.url_referrer,
        canRun: false
      });
    }

    // User browser language.
    if (popupTriggers?.user_browser_language?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'user_browser_language',
        value: popupTriggers?.user_browser_language,
        canRun: false
      });
    }

    // User browser.
    if (popupTriggers?.user_browser?.control) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'user_browser',
        value: popupTriggers?.user_browser,
        canRun: false
      });
    }

    // User device.
    if (popupTriggers?.user_device?.control) {
      if (this.userDevice(popupTriggers.user_device.control, popupTriggers.user_device.operator)) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // User role.
    if (popupTriggers?.user_role?.result) {
      if (popupTriggers?.user_role?.result === true) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // User type.
    if (popupTriggers?.user_type?.result) {
      if (popupTriggers?.user_type?.result === true) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // UTM Campaign.
    if (popupTriggers?.utm_campaign?.control) {
      isUTMMatch = this.utmUrl(popupTriggers?.utm_campaign, 'utm_campaign');
      if (isUTMMatch) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // UTM Content.
    if (popupTriggers?.utm_content?.control) {
      isUTMMatch = this.utmUrl(popupTriggers?.utm_content, 'utm_content');
      if (isUTMMatch) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // UTM Source.
    if (popupTriggers?.utm_source?.control) {
      isUTMMatch = this.utmUrl(popupTriggers.utm_source, 'utm_source');
      if (isUTMMatch) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // UTM Term.
    if (popupTriggers?.utm_term?.control) {
      isUTMMatch = this.utmUrl(popupTriggers?.utm_term, 'utm_term');
      if (isUTMMatch) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // UTM Medium.
    if (popupTriggers?.utm_medium?.control) {
      isUTMMatch = this.utmUrl(popupTriggers?.utm_medium, 'utm_medium');
      if (isUTMMatch) {
        isTriggerValid = true;
        canPopupDisplayImmediatly = true;
      } else {
        isAnyTriggerNotValid = true;
      }
    }

    // After inactivity.
    if (popupTriggers?.after_inactivity) {
      isTriggerValid = true;
      validTriggerFunctionList.push({
        key: 'after_inactivity',
        value: popupTriggers?.after_inactivity.control,
        canRun: false
      });
    }
    /* eslint-enable camelcase */

    //display popup if trigger be valid
    if (isTriggerValid && 'or' === triggerRelation && validTriggerFunctionList.length === 0) {
      this.showPopup();
    }
    if (isTriggerValid && 'or' === triggerRelation && validTriggerFunctionList.length > 0) {
      if (canPopupDisplayImmediatly) {
        this.showPopup();
      } else {
        this.runTriggerFunction();
      }
    }
    if (!isAnyTriggerNotValid && 'and' === triggerRelation && validTriggerFunctionList.length === 0) {
      this.showPopup();
    }
    if (!isAnyTriggerNotValid && 'and' === triggerRelation && validTriggerFunctionList.length > 0) {
      this.runTriggerFunction();
    }
  };
  this.runTriggerFunction = function () {
    for (const trigger of validTriggerFunctionList) {
      switch (trigger.key) {
        case 'on_page_exit_intent':
          this.removeEntranceAnimationClass();
          $document.mouseleave(() => {
            trigger.canRun = true;
            this.showPopup();
          });
          break;
        case 'on_page_load':
          setTimeout(() => {
            trigger.canRun = true;
            this.showPopup();
          }, trigger.value?.control * 1000);
          break;
        case 'on_page_scroll':
          this.removeEntranceAnimationClass();
          this.onScroll(trigger);
          break;
        case 'on_scroll_to_element':
          this.removeEntranceAnimationClass();
          this.onScrollElement(trigger);
          break;
        case 'show_after_x_page_views':
          this.onAfterXPageViews(trigger);
          break;
        case 'show_after_x_visits':
          this.onAfterXVisits(trigger);
          break;
        case 'url_referrer':
          this.urlReferrer(trigger);
          break;
        case 'user_browser_language':
          this.userBrowserLanguage(trigger);
          break;
        case 'user_browser':
          this.userBrowser(trigger);
          break;
        case 'after_inactivity':
          this.onAfterInactivity(trigger);
          break;
      }
    }
  };
  this.handleButtonWidgetClick = function () {
    $(document).on('popup-button-clicked', (event, eventData) => {
      if (parseInt(eventData.popupId) === id) {
        switch (eventData.actionType) {
          case 'close-popup':
            this.hidePopup({
              constantly: popupSettings.show_once
            });
            break;
          case 'close-all-popups':
            this.closeAllPopups();
            break;
          case 'close-popup-permanently':
            this.hidePopup({
              constantly: popupSettings.show_once
            });
            window.localStorage.setItem('jupiterx_popup_closed_permanently_' + popupId, true);
            break;
          case 'close-all-popups-permanently':
            this.closeAllPopupsPermanently();
            break;
          default:
            break;
        }
      }
    });
  };
  this.handlePopupLocalStorage = function () {
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)');
    $popupList.each(function (index, element) {
      const form = $(element).find('.elementor-widget-raven-form');
      const currentPopup = $(element).data('settings').id;
      if (form.length > 0) {
        // eslint-disable-next-line camelcase
        const {
          popup_action,
          popup_action_do_not_show_again
        } = form.data('settings');

        // eslint-disable-next-line camelcase
        if (currentPopup === id && popup_action === 'close' && _.isEmpty(popup_action_do_not_show_again)) {
          window.localStorage.removeItem('jupiterx_popup_closed_permanently_' + id);
        }
      }
    });
  };
  this.handlePopupAction = function () {
    elementorFrontend.on('components:init', () => {
      elementorFrontend.utils.urlActions.addAction('raven_popup_' + popupSettings.id + ':open', actionSettings => {
        if (parseInt(actionSettings.id) === parseInt(id)) {
          if (!actionSettings.toggle && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + id) !== 'true') {
            this.showPopup();
            return;
          }
          if ($popup.hasClass('jupiterx-popup--hide-state') && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + id) !== 'true') {
            this.showPopup();
            return;
          }
          if ($popup.hasClass('jupiterx-popup--show-state')) {
            this.hidePopup({
              constantly: false
            });
          }
        }
      });
      elementorFrontend.utils.urlActions.addAction('raven_popup:close', (actionSettings, event) => {
        const ravenPopupId = $(event.target).closest('.jupiterx-popup').attr('id');
        let popupNumber = 0;
        if (ravenPopupId) {
          popupNumber = ravenPopupId.split('-').pop();
        }
        if (parseInt(actionSettings.id) === parseInt(popupNumber)) {
          this.hidePopup({
            popupElement: $(event.target).closest('.jupiterx-popup'),
            constantly: false
          });
          if (actionSettings.do_not_show_again) {
            window.localStorage.setItem('jupiterx_popup_closed_permanently_' + popupNumber, true);
          }
        }
      });
    });
  };
  this.handlePopupCloseActionLocalStorage = function () {
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)');
    $popupList.each(function (index, element) {
      const elementWithHref = $(element).find('[href^="#elementor-action%3Aaction%3Draven_popup%3Aclose"]');
      if (elementWithHref.length > 0) {
        const parentElementorId = elementWithHref.closest('[data-elementor-id]').attr('data-elementor-id');

        // eslint-disable-next-line camelcase
        if (window['raven_popup_close_action_' + parentElementorId]?.do_not_show_again === '') {
          window.localStorage.removeItem('jupiterx_popup_closed_permanently_' + parentElementorId);
        }
      }
    });
  };
  this.closeAllPopups = function () {
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)');
    $popupList.each(function () {
      const eventPopupData = {
        popupId: $(this).data('settings').jupiterx_popup_id,
        constantly: $(this).data('settings').show_once
      };
      $(document).trigger('jupiterx-popup-close-trigger', eventPopupData);
    });
  };
  this.closeAllPopupsPermanently = function () {
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)');
    $popupList.each(function () {
      const eventData = {
        popupId: $(this).data('settings').jupiterx_popup_id,
        constantly: false
      };
      $(document).trigger('jupiterx-popup-close-trigger', eventData);
      window.localStorage.setItem('jupiterx_popup_closed_permanently_' + $(this).data('settings').jupiterx_popup_id, true);
    });
  };
  this.handleAvoidMultiplePopups = function () {
    if (!popupSettings.avoid_multiple_popups) {
      return false;
    }
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)'),
      $reversedPopupList = $($popupList.get().reverse());
    let lastPopup, result;
    $reversedPopupList.each(function () {
      if (!$(this).data('settings').avoid_multiple_popups) {
        result = true;
        return false;
      }
      lastPopup = $(this).data('settings');
    });
    if (result) {
      return result;
    }
    return lastPopup.id !== popupSettings.id;
  };
  this.initOpenEvent = function () {
    const self = this;
    $window.on('jupiterx-popup-open-trigger', function (event, eventData = {}) {
      const popupData = event.popupData || {},
        popupUniqId = popupData.popupId || false;
      if (popupUniqId === popupId) {
        self.showPopup(popupData);
      }
      if (!_.isEmpty(eventData) && eventData?.popupId && `jupiterx-popup-${eventData.popupId}` === popupId) {
        if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + eventData.popupId) === 'true') {
          return;
        }
        popupData.popupId = eventData.popupId;
        self.showPopup(popupData);
      }
    });
    $window.on('jupiterx-popup-close-trigger', function (event, eventData) {
      const popupUniqId = eventData.popupId,
        constantly = eventData.constantly;
      if (popupUniqId === popupId) {
        self.hidePopup({
          constantly
        });
      }
    });

    // eslint-disable-next-line
    $window.on('jupiterx-popup-close-form-trigger', function (event, eventData) {
      const constantly = eventData.constantly,
        popupUniqId = eventData.popupId;
      if (constantly && popupUniqId === id) {
        window.localStorage.setItem('jupiterx_popup_closed_permanently_' + id, true);
      }
      if (popupUniqId === id) {
        self.hidePopup({
          constantly
        });
      }
    });
  };
  this.initCloseEvent = function () {
    $popup.on('click', '.jupiterx-popup__close-button', () => {
      this.hidePopup({
        constantly: popupSettings.show_once
      });
    });
    if (!popupSettings.prevent_close_on_background_click) {
      $popup.on('click', '.jupiterx-popup__overlay', () => {
        this.hidePopup({
          constantly: popupSettings.show_once
        });
      });
    }
    if (!popupSettings.prevent_close_on_esc_key) {
      $document.on('keyup.jupiterxPopup', event => {
        const key = event.keyCode;
        if (27 === key) {
          this.hidePopup({
            constantly: popupSettings.show_once
          });
        }
      });
    }
  };
  this.onCustomSelector = function (selector) {
    const $selector = $(selector);
    if ($selector[0]) {
      $('body').on('click', selector, event => {
        event.preventDefault();
        if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          this.showPopup();
        }
      });
    }
  };
  this.onAfterInactivity = function (trigger) {
    if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) === 'true' || window.localStorage.getItem('jupiterx_popup_closed_permanently_' + id) === 'true') {
      return;
    }

    // Start the timer on page load.
    this.resetTimer(trigger);

    // Reset the timer on user activity.
    $document.on('mousemove keydown', () => {
      this.resetTimer(trigger);
    });
  };
  this.resetTimer = function (trigger) {
    clearTimeout(inactivityTimeout);
    if (hasResetTimerRun.includes(popupSettings.id)) {
      return;
    }
    this.removeEntranceAnimationClass();
    inactivityTimeout = setTimeout(() => {
      if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) === 'true' || window.localStorage.getItem('jupiterx_popup_closed_permanently_' + id) === 'true') {
        return;
      }
      const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
      if (triggerItem) {
        triggerItem.canRun = true;
      }
      this.showPopup();
      hasResetTimerRun.push(popupSettings.id);
    }, trigger?.value * 1000);
  };
  this.onScroll = function (trigger) {
    // eslint-disable-next-line camelcase
    if (trigger?.value?.control?.direction === 'up') {
      let previousScroll = $window.scrollTop();
      $window.scroll(() => {
        const currentScroll = $window.scrollTop();
        if (currentScroll < previousScroll && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
          if (triggerItem) {
            triggerItem.canRun = true;
          }
          this.showPopup();
        }
        previousScroll = currentScroll;
      });
    }

    // eslint-disable-next-line camelcase
    if (trigger?.value?.control?.direction === 'down') {
      let isShown = false;
      $window.scroll(() => {
        const scrollPosition = $window.scrollTop(),
          pageHeight = $document.height(),
          windowHeight = $window.height(),
          scrollPercentage = scrollPosition / (pageHeight - windowHeight) * 100;

        // eslint-disable-next-line camelcase
        if (scrollPercentage >= trigger?.value?.control?.value && !isShown && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
          if (triggerItem) {
            triggerItem.canRun = true;
          }
          this.showPopup();
          isShown = true;
        }
      });
    }
  };
  this.onScrollElement = function (trigger) {
    let isShown = false;
    $window.scroll(() => {
      const scrollPosition = $window.scrollTop(),
        targetElementOffset = $(trigger?.value.control).offset().top,
        windowHeight = $window.height();
      if (scrollPosition + windowHeight >= targetElementOffset && !isShown && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
        const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
        if (triggerItem) {
          triggerItem.canRun = true;
        }
        this.showPopup();
        isShown = true;
      }
    });
  };
  this.onAfterXPageViews = function (trigger) {
    if (elementorFrontend.storage.get('pageViews') >= trigger?.value?.control) {
      const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
      if (triggerItem) {
        triggerItem.canRun = true;
      }
      this.showPopup();
    }
  };
  this.onAfterXVisits = function (trigger) {
    if (elementorFrontend.storage.get('sessions') >= trigger?.value?.control) {
      const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
      if (triggerItem) {
        triggerItem.canRun = true;
      }
      this.showPopup();
    }
  };
  this.urlReferrer = function (trigger) {
    const operator = trigger?.value?.operator,
      control = trigger?.value?.control;
    $window.on('load', () => {
      if (operator === 'is' && document.referrer === control || operator === 'is-not' && document.referrer !== control || operator === 'contains' && document.referrer.includes(control) || operator === 'does-not-contains' && !document.referrer.includes(control) || operator === 'starts-with' && document.referrer.startsWith(control) || operator === 'ends-with' && document.referrer.endsWith(control)) {
        if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
          if (triggerItem) {
            triggerItem.canRun = true;
          }
          this.showPopup();
        }
      }
    });
  };
  this.userBrowserLanguage = function (trigger) {
    const operator = trigger?.value?.operator,
      control = trigger?.value?.control;
    let browserLanguage = control;
    if (popupSettings.browser_language.indexOf('-') === -1) {
      browserLanguage = control.split('-')[0];
    }
    $window.on('load', () => {
      if (operator === 'is' && popupSettings.browser_language === browserLanguage || operator === 'is-not' && popupSettings.browser_language !== browserLanguage || operator === 'contains' && popupSettings.browser_language.includes(browserLanguage) || operator === 'does-not-contains' && !popupSettings.browser_language.includes(browserLanguage) || operator === 'starts-with' && popupSettings.browser_language.startsWith(browserLanguage) || operator === 'ends-with' && popupSettings.browser_language.endsWith(browserLanguage)) {
        if (window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
          if (triggerItem) {
            triggerItem.canRun = true;
          }
          this.showPopup();
        }
      }
    });
  };
  this.userBrowser = function (trigger) {
    const operator = trigger?.value?.operator,
      control = trigger?.value?.control;
    const userAgent = $window[0].navigator.userAgent.toLowerCase();
    let browserMatch = false;
    for (let i = 0; i < control.length; i++) {
      const controlValue = control[i].value.toLowerCase();
      if (userAgent.includes(controlValue)) {
        browserMatch = true;
        break;
      }
    }
    if (operator === 'is-any-of' && browserMatch || operator === 'is-none-of' && !browserMatch) {
      const triggerItem = validTriggerFunctionList.find(item => item.key === trigger?.key);
      if (triggerItem) {
        triggerItem.canRun = true;
      }
      this.showPopup();
    }
  };
  this.userDevice = function (control, operator) {
    let deviceMatch = false;
    for (let i = 0; i < control.length; i++) {
      const deviceValue = control[i].value.toLowerCase();
      if (deviceValue === 'mobile') {
        if (this.isMobile()) {
          deviceMatch = true;
          break;
        }
      } else if (deviceValue === 'tablet') {
        if (this.isTablet()) {
          deviceMatch = true;
          break;
        }
      } else if (deviceValue === 'desktop') {
        if (!this.isMobile() && !this.isTablet()) {
          deviceMatch = true;
          break;
        }
      }
    }

    // Check the operator condition.
    if (operator === 'is-any-of' && deviceMatch) {
      return true;
    } else if (operator === 'is-none-of' && !deviceMatch) {
      return true;
    }
    return false;
  };
  this.utmUrl = function (conditions, utmParam) {
    const urlParams = new URLSearchParams(window.location.search.toLowerCase());
    const value = urlParams.get(utmParam);
    if (!value) {
      return false;
    }
    const controlValue = conditions.control.toLowerCase();
    return this.utmCondition(controlValue, value, conditions.operator);
  };
  this.utmCondition = function (controlValue, value, operator) {
    switch (operator) {
      case 'is':
        return value === controlValue;
      case 'is-not':
        return value !== controlValue;
      case 'contains':
        return value.includes(controlValue);
      case 'does-not-contains':
        return !value.includes(controlValue);
      case 'starts-with':
        return value.startsWith(controlValue);
      case 'ends-with':
        return value.endsWith(controlValue);
      default:
        return false;
    }
  };
  this.isMobile = function () {
    const userAgent = window.navigator.userAgent.toLowerCase(),
      mobileKeywords = ['mobile', 'android', 'iphone'];
    for (let i = 0; i < mobileKeywords.length; i++) {
      if (userAgent.indexOf(mobileKeywords[i]) > -1) {
        return true;
      }
    }
    if (window.screen.width < 768) {
      return true;
    }
    return false;
  };
  this.isTablet = function () {
    const userAgent = window.navigator.userAgent.toLowerCase(),
      tabletKeywords = ['ipad', 'tablet'];
    for (let i = 0; i < tabletKeywords.length; i++) {
      if (userAgent.indexOf(tabletKeywords[i]) > -1) {
        return true;
      }
    }
    if (window.screen.width >= 768 && window.screen.width < 1024) {
      return true;
    }
    return false;
  };
  this.handleConvertToolbar = function (action) {
    const containerElement = $('.jupiterx-popup__container', $popup),
      hasAdminBar = $('#wpadminbar').length > 0;
    let height = containerElement.height();
    let animationDuration = 1.2;
    if (hasAdminBar) {
      height += $('#wpadminbar').height();
    }
    if (popupSettings.animation_duration.size) {
      animationDuration = popupSettings.animation_duration.size;
    }
    if (action === 'show') {
      if ($popup.hasClass('jupiterx-popup--hide-state')) {
        $popup.toggleClass('jupiterx-popup--hide-state jupiterx-popup--show-state');
        height = containerElement.height();
        if (hasAdminBar) {
          height += $('#wpadminbar').height();
        }
        $popup.toggleClass('jupiterx-popup--show-state jupiterx-popup--hide-state');
      }
      let currentPopupTop = '0px';
      if (hasAdminBar) {
        currentPopupTop = $('#wpadminbar').height() + 'px';
      }
      containerElement.css('top', `-${height}px`);
      const bodyPaddingTop = parseInt($('body').css('padding-top')) + height;
      $('body').animate({
        'padding-top': bodyPaddingTop
      }, animationDuration * 1000);
      containerElement.animate({
        top: currentPopupTop
      }, animationDuration * 1000);
      return;
    }
    $('body').animate({
      'padding-top': 0
    }, animationDuration * 1000);
    $('.jupiterx-popup__container', $popup).removeClass('animated ' + popupSettings.entrance_animation);
    containerElement.animate({
      top: `-${height}px`
    }, animationDuration * 1000, () => {
      $popup.toggleClass('jupiterx-popup--show-state jupiterx-popup--hide-state');
    });
  };
  this.showPopup = function (data) {
    const popupData = data || {};
    if (editMode) {
      return false;
    }

    // the popup display if all triggers with And logic be valid.
    if (triggerRelation === 'and' && validTriggerFunctionList.find(trigger => trigger.canRun === false)) {
      return false;
    }
    if (popupSettings.show_once) {
      this.handleShowAgainDelay(popupData);
      return;
    }
    this.showPopupContent(popupData);
  };
  this.showContainer = function (data) {
    let popupData = data || {};
    const popupDefaultData = {
        forceLoad: popupSettings.force_loading || false
      },
      $content = $('.jupiterx-popup__container-content', $popup);
    popupData = jQuery.extend(popupDefaultData, popupData);
    if (popupData.forceLoad) {
      ajaxContentLoaded = false;
    }
    if (ajaxContentLoaded) {
      return false;
    }
    popupData = jQuery.extend(popupData, {
      popup_id: id
    });
    $popup.addClass('jupiterx-popup--loading-state');
    wp.ajax.post({
      action: 'jupiterx_popup_get_content',
      data: popupData
    }).always(response => {
      const successType = response.type,
        content = response.content || '';
      $popup.removeClass('jupiterx-popup--loading-state');
      if ('error' === successType) {
        const message = response.message;
        $content.html('<h3>' + message + '</h3>');
      }
      if ('success' === successType) {
        $content.html(content);
        ajaxContentLoaded = true;
      }
    });
  };
  this.showPopupContent = function (popupData) {
    if (popupSettings.convert_to_header_toolbar && popupSettings.vertical_position === 'top') {
      this.handleConvertToolbar('show');
    }
    if ($popup.hasClass('jupiterx-popup--hide-state')) {
      $popup.toggleClass('jupiterx-popup--hide-state jupiterx-popup--show-state');
      if (popupSettings.entrance_animation) {
        $('.jupiterx-popup__container', $popup).addClass('animated ' + popupSettings.entrance_animation);
      }
    }
    if (popupSettings.prevent_scrolling) {
      $('body').addClass('jupiterx-popup-prevent-scroll');
    }

    // Show close button after a delay.
    if (popupSettings.close_button_delay && popupSettings.close_button) {
      $('.jupiterx-popup__close-button', $popup).hide();
      setTimeout(function () {
        $('.jupiterx-popup__close-button', $popup).show();
      }, popupSettings.close_button_delay * 1000);
    }

    // Automatically close after a delay.
    if (popupSettings.close_automatically) {
      setTimeout(() => {
        this.hidePopup({
          constantly: popupSettings.show_once
        });
      }, popupSettings.close_automatically * 1000);
    }
    if (popupSettings.use_ajax) {
      this.showContainer(popupData);
    }
  };
  this.hidePopup = function (data) {
    let popup = $popup;
    if (data.popupElement) {
      popup = data.popupElement;
    }
    const popupData = data || {},
      $content = $('.jupiterx-popup__container-content', popup),
      constantly = popupData.constantly || false,
      ravenPopupSettings = popup.data('settings');
    if (popup.hasClass('jupiterx-popup--show-state')) {
      if (ravenPopupSettings.entrance_animation && !(ravenPopupSettings.convert_to_header_toolbar && ravenPopupSettings.vertical_position === 'top')) {
        this.removeEntranceAnimationClass();
      }
      if (ravenPopupSettings.exit_animation && ravenPopupSettings.exit_animation !== 'none' && !(ravenPopupSettings.convert_to_header_toolbar && ravenPopupSettings.vertical_position === 'top')) {
        // Replace In with Out in animation name.
        const exitAnimation = ravenPopupSettings.exit_animation.replace('In', 'Out');
        $('.jupiterx-popup__container', popup).addClass('animate__animated animate__' + exitAnimation);
        let popupAnimationDuration = 1.2;
        if (ravenPopupSettings.animation_duration.size) {
          popupAnimationDuration = ravenPopupSettings.animation_duration.size;
        }

        // Remove animation class after it's done.
        setTimeout(() => {
          $('.jupiterx-popup__container', popup).removeClass('animate__animated animate__' + exitAnimation);

          // Handle disable page scrolling.
          if (ravenPopupSettings.prevent_scrolling) {
            $('body').removeClass('jupiterx-popup-prevent-scroll');
          }
          popup.toggleClass('jupiterx-popup--show-state jupiterx-popup--hide-state');
          if (ravenPopupSettings.use_ajax && ravenPopupSettings.force_loading) {
            $content.html('');
          }
        }, popupAnimationDuration * 1000);
      } else {
        if (ravenPopupSettings.convert_to_header_toolbar && ravenPopupSettings.vertical_position === 'top') {
          this.handleConvertToolbar('hide');
        } else {
          popup.toggleClass('jupiterx-popup--show-state jupiterx-popup--hide-state');
        }
        if (ravenPopupSettings.use_ajax && ravenPopupSettings.force_loading) {
          $content.html('');
        }
      }
    }
    if (popupSettings.prevent_scrolling && !$('.jupiterx-popup--show-state')[0]) {
      $('body').removeClass('jupiterx-popup-prevent-scroll');
    }
    if (constantly) {
      this.handleShowAgainDelay(popupData, true);
    }
    this.handlePauseVideo();
  };
  this.handleShowAgainDelay = function (popupData, hideAction = false) {
    const nowDate = Date.now(),
      showAgainDelay = popupSettings.show_again_delay;
    let showAgainDate = 0 !== showAgainDelay ? nowDate + showAgainDelay : 'none';
    if ('none' !== showAgainDate) {
      if (window.localStorage.getItem('jupiterx_popup_showed_' + popupId) !== 'true' || +window.localStorage.getItem('jupiterx_popup_show_again_' + popupId) < Date.now()) {
        window.localStorage.setItem('jupiterx_popup_showed_' + popupId, false);
      }
      const showAgainInterval = setInterval(() => {
        if (hideAction) {
          window.localStorage.setItem('jupiterx_popup_show_again_' + popupId, showAgainDate);
          window.localStorage.setItem('jupiterx_popup_showed_' + popupId, true);
        }
        if (!window.localStorage.getItem('jupiterx_popup_show_again_' + popupId) && $popup.hasClass('jupiterx-popup--hide-state')) {
          window.localStorage.setItem('jupiterx_popup_show_again_' + popupId, Date.now());
          window.localStorage.setItem('jupiterx_popup_showed_' + popupId, false);
        }
        if (+window.localStorage.getItem('jupiterx_popup_show_again_' + popupId) < Date.now() && window.localStorage.getItem('jupiterx_popup_showed_' + popupId) === 'false' && window.localStorage.getItem('jupiterx_popup_closed_permanently_' + popupId) !== 'true') {
          clearInterval(showAgainInterval);
          this.showPopupContent(popupData);
          showAgainDate = Date.now() + showAgainDelay;
          window.localStorage.setItem('jupiterx_popup_show_again_' + popupId, showAgainDate);
          window.localStorage.setItem('jupiterx_popup_showed_' + popupId, true);
        }
      }, 1000);
    }
  };
  this.handlePauseVideo = function () {
    let video = $('.jupiterx-popup__container-content video', $popup);
    if (video.length > 0) {
      video.each(function () {
        $(this)[0].pause();
      });
    }
    video = $('.jupiterx-popup__container-content iframe.raven-video-mejs-player', $popup);
    if (video.length > 0) {
      video.each(function () {
        $(this)[0].player.media.pause();
      });
    }
  };
  this.removeEntranceAnimationClass = function () {
    $('.jupiterx-popup__container', $popup).removeClass('animated ' + popupSettings.entrance_animation);
  };
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("./popup-settings");
const $ = jQuery;
const JupiterxPopup = function () {
  function init() {
    const $popupList = $('.jupiterx-popup:not(.jupiterx-popup--edit-mode)'),
      editMode = Boolean(elementorFrontend.isEditMode());
    if (!editMode) {
      $popupList.each(function () {
        const $popup = $(this),
          settings = $popup.data('settings'),
          triggers = $popup.data('trigger');
        elementorFrontend.storage.set(`jupiterx_popup_${settings.id}`, settings);
        let instance = null;
        instance = new window.jupiterxPopupSettings($popup, settings, triggers);
        instance.init();
      });
    }
    if (!elementorFrontend.isEditMode() && !elementorFrontend.isWPPreviewMode()) {
      setViewsAndSessions($(this));
    }
  }
  function setViewsAndSessions() {
    const pageViews = elementorFrontend.storage.get('pageViews') || 0;
    elementorFrontend.storage.set('pageViews', pageViews + 1);
    const activeSession = elementorFrontend.storage.get('activeSession', {
      session: true
    });
    if (!activeSession) {
      elementorFrontend.storage.set('activeSession', true, {
        session: true
      });
      const sessions = elementorFrontend.storage.get('sessions') || 0;
      elementorFrontend.storage.set('sessions', sessions + 1);
    }
  }
  return {
    init
  };
};
var _default = exports.default = JupiterxPopup();

},{"./popup-settings":2}],4:[function(require,module,exports){
const AnimatedGradientBg = {
  // Object literal methods are not constructible; call without `new`.
  RavenAnimatedGradientInstance($scope) {
    if (!$scope.hasClass('raven-animated-gradient-yes')) {
      return;
    }
    if ($scope.hasClass('elementor-widget-raven-button')) {
      $scope = $scope.find('.raven-button-overlay');
    }
    let element = '';
    if ($scope.hasClass('elementor-widget-raven-heading')) {
      element = $scope.find('.raven-heading-title-inner');
      if (!element.hasClass('raven-heading-title-inner')) {
        element = $scope.find('.raven-heading-title');
      }
      $scope = element;
    }
    if ($scope.hasClass('elementor-widget-raven-text-marquee')) {
      $scope = $scope.find('.raven-marquee-text-item');
    }
    const color = $scope.data('color'),
      angle = $scope.data('angle'),
      gradientColor = 'linear-gradient( ' + angle + ',' + color + ' )',
      speed = $scope.data('speed'),
      background = $scope.data('background-size'),
      animation = $scope.data('animation-name');
    $scope.css('background-image', gradientColor);
    $scope.css('animation-duration', speed);
    $scope.css('background-size', background);
    $scope.css('animation-name', animation);
  }
};
elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
  AnimatedGradientBg.RavenAnimatedGradientInstance($scope);
});

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*!
 * Detectr.js
 * @author Rogerio Taques (rogerio.taques@gmail.com)
 * @see http://github.com/rogeriotaques/detectrjs
 *
 * This project is based on the Rafael Lima's work
 * which is called css_browser_selector and seems
 * to be discontinued. (http://rafael.adm.br/css_browser_selector/).
 */

const DetectrJs = function detecterjs($) {
  const version = '1.8.1';

  /**
   * Whenever .trim() isn't supported, makes it be.
   */
  if (typeof String.prototype.trim !== 'function') {
    // eslint-disable-next-line no-extend-native
    String.prototype.trim = function trim() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  const doc = $.document;
  const element = doc.documentElement;
  const detectr = function detectr(userAgent) {
    const ua = userAgent.toLowerCase();
    const winWidth = $.outerWidth || element.clientWidth;
    const winHeight = $.outerHeight || element.clientHeight;
    const gecko = 'gecko';
    const webkit = 'webkit';
    const safari = 'safari';
    const opera = 'opera';
    const mobile = 'mobile';

    /**
     * Checks if given string is present on the userAgent.
     *
     * @param {string} str String to search for in the UA
     * @return {boolean} Returns true when the substring exists in the user agent
     */
    const is = function is(str) {
      return ua.indexOf(str) > -1;
    };

    /**
     * The core feature ...
     */
    let detect = function detect() {
      const rendered = [];
      const {
        implementation
      } = doc;
      const webkitVersion = /applewebkit\/(\d{1,})/.test(ua) ? RegExp.$1 : false;
      let sysVersion = '';

      // *** Detecting browsers ***
      switch (true) {
        // internet explorer
        case is('msie') && !is('opera') && !is('webtv') || is('trident') || is('edge'):
          if (is('edge')) {
            sysVersion = /edge\/(\w+)/.test(ua) ? ' edge ie' + RegExp.$1 : ' ie11';
          } else if (is('msie 8.0') || is('trident/7.0')) {
            sysVersion = ' ie11';
          } else {
            sysVersion = /msie\s(\d+)/.test(ua) ? ' ie' + RegExp.$1 : '';
          }
          rendered.push('ie' + sysVersion);
          break;

        // iron
        case is('iron/') || is('iron'):
          sysVersion = /iron\/(\d+)/.test(ua) ? ' iron' + RegExp.$1 : '';
          rendered.push(webkit + ' iron' + sysVersion);
          break;

        // android
        case is('android') && is('u;') && (!is('chrome') || is('chrome') && webkitVersion && webkitVersion <= 534):
          // according to some researches android stock (native) browsers never went above applewebkit/534.x,
          // then, we can suppose user is using a native browser in android when the UA contains "android",
          // "mobile" and "U;" strings
          // @see: (http://stackoverflow.com/questions/14403766/how-to-detect-the-stock-android-browser)

          rendered.push('android-browser');
          break;

        // google chrome
        case is('chrome/') || is('chrome'):
          sysVersion = /chrome\/(\d+)/.test(ua) ? ' chrome' + RegExp.$1 : '';
          rendered.push(webkit + ' chrome' + sysVersion);
          break;

        // firefox
        case is('firefox/') || is('firefox'):
          sysVersion = /firefox\/(\d+)/.test(ua) ? ' firefox' + RegExp.$1 : '';
          rendered.push(gecko + ' firefox' + sysVersion);
          break;

        // opera
        case is('opera/') || is('opera'):
          sysVersion = /version(\s|\/)(\d+)/.test(ua) || /opera(\s|\/)(\d+)/.test(ua) ? ' ' + opera + RegExp.$2 : '';
          rendered.push(opera + sysVersion);
          break;

        // konqueror
        case is('konqueror'):
          rendered.push(mobile + ' konqueror');
          break;

        // blackberry
        case is('blackberry') || is('bb'):
          rendered.push(mobile + ' blackberry');
          if (is('bb')) {
            sysVersion = /bb(\d{1,2})(;{0,1})/.test(ua) ? 'bb' + RegExp.$1 : '';
            rendered.push(sysVersion);
          }
          break;

        // safari
        case is('safari/') || is('safari'):
          sysVersion = /version\/(\d+)/.test(ua) || /safari\/(\d+)/.test(ua) ? ' ' + safari + RegExp.$1 : '';
          rendered.push(webkit + ' ' + safari + sysVersion);
          break;

        // applewebkit
        case is('applewebkit/') || is('applewebkit'):
          sysVersion = /applewebkit\/(\d+)/.test(ua) ? ' ' + webkit + RegExp.$1 : '';
          rendered.push(webkit + ' ' + sysVersion);
          break;

        // gecko || mozilla
        case is('gecko') || is('mozilla/'):
          rendered.push(gecko);
          break;
        default:
          break;
      }

      // *** Detecting O.S ***
      switch (true) {
        // ios
        case is('iphone') || is('ios'):
          sysVersion = /iphone\sos\s(\d{1,2})/.test(ua) ? ' ios' + RegExp.$1 : '';

          // For some reason when it's iOS8, userAgent comes like OS 10_10
          // what returns a wrong version, then we need to match it against
          // another value
          if (sysVersion === ' ios10') {
            const vv = /(\d{1,2})/.test(sysVersion) ? RegExp.$1 : 0;
            const vd = /\sversion\/(\d{1,2})/.test(ua) ? RegExp.$1 : '';
            if (parseInt(vv, 10) > parseInt(vd, 10)) {
              sysVersion = ' ios' + vd;
            }
          }
          rendered.push('ios' + sysVersion);
          break;

        // macintosh
        case is('mac') || is('macintosh') || is('darwin'):
          sysVersion = /mac\sos\sx\s(\d{1,2}_\d{1,2})/.test(ua) ? ' osx' + RegExp.$1 : '';
          rendered.push('mac' + sysVersion);
          break;

        // windows
        case is('windows') || is('win'):
          sysVersion = /windows\s(nt\s{0,1})(\d{1,2}\.\d)/.test(ua) ? '' + RegExp.$2 : '';

          // defining windows version
          switch (sysVersion) {
            case '5.0':
              sysVersion = ' win2k';
              break;
            case '5.01':
              sysVersion = ' win2k sp1';
              break;
            case '5.1':
            case '5.2':
              sysVersion = ' xp';
              break;
            case '6.0':
              sysVersion = ' vista';
              break;
            case '6.1':
              sysVersion = ' win7';
              break;
            case '6.2':
              sysVersion = ' win8';
              break;
            case '6.3':
              sysVersion = ' win8_1';
              break;
            case '6.4':
              sysVersion = ' win10';
              break;
            default:
              sysVersion = ' nt nt' + sysVersion;
          }
          rendered.push('windows' + sysVersion);
          break;

        // webtv
        case is('webtv'):
          rendered.push('webtv');
          break;

        // freebsd
        case is('freebsd'):
          rendered.push('freebsd');
          break;

        // android
        case is('android') || is('linux') && is('mobile'):
          rendered.push('android');
          break;

        // linux
        case is('linux') || is('x11'):
          rendered.push('linux');
          break;
        default:
          break;
      }

      // *** Detecting platform ***
      switch (true) {
        // 64 bits
        case is('wow64') || is('x64'):
          rendered.push('x64');
          break;

        // arm
        case is('arm'):
          rendered.push('arm');
          break;

        // 32 bits
        default:
          rendered.push('x32');
      }

      // *** Detecting devices ***
      switch (true) {
        case is('j2me'):
          rendered.push(mobile + ' j2me');
          break;
        case /(iphone|ipad|ipod)/.test(ua):
          rendered.push(mobile + ' ' + RegExp.$1);
          break;
        case is('mobile'):
          rendered.push(mobile);
          break;
        default:
          break;
      }

      // *** Detecting touchable devices ***
      if (/touch/.test(ua)) {
        rendered.push('touch');
      }

      // *** Assume that it supports javascript by default ***
      rendered.push('js');

      // *** Detect if SVG images are supported ***
      rendered.push(implementation !== undefined && typeof implementation.hasFeature === 'function' && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1') ? 'svg' : 'no-svg');

      // *** Detect retina display ***
      rendered.push($.devicePixelRatio !== undefined && $.devicePixelRatio > 1 ? 'retina' : 'no-retina');

      // *** Detecting orientation ***
      rendered.push(winWidth < winHeight ? 'portrait' : 'landscape');
      return rendered;
    };

    // retrieve current classes attached
    let currentClassNames = doc.documentElement.className.split(' ');

    // convert 'detect' from function to array
    // and avoid unnecessary processing
    detect = detect();

    // concat all detected classes to the existing ones and make sure they are unique
    // this prevent wiping pre-existing classes attached by different processes.
    currentClassNames = currentClassNames.concat(detect);
    currentClassNames = currentClassNames.filter((v, i) => currentClassNames.indexOf(v) === i);

    // inject the new classes set in the HTML tag.
    element.className = currentClassNames.join(' ').trim();

    // return what was detected
    return {
      detected: detect.join(' ').trim(),
      version
    };
  };

  // execute and exposes detectr.js to the browser
  // eslint-disable-next-line
  $.detectr = detectr($.navigator.userAgent);

  /**
   * The listener engine for resize event ...
   */
  const resizing = function resizing() {
    $.detectr = detectr($.navigator.userAgent); // eslint-disable-line
  };

  // add an event listener for window resize
  // which will asure that references will be
  // updated in case of browser resizing
  if ($.attachEvent) {
    $.attachEvent('onresize', resizing);
  } else if ($.addEventListener) {
    $.addEventListener('resize', resizing, true);
  }
};
DetectrJs(window);
var _default = exports.default = DetectrJs;

},{}],6:[function(require,module,exports){
'use strict';

const fullPageEditor = {};
const $ = jQuery;

// we need this function globally
window.ravenChangeDocument = function changeDocument(elementorId) {
  $('.elementor').find('.raven-document-handle-parent').remove();
  window.elementorCommon.api.internal('panel/state-loading');
  window.elementorCommon.api.run('editor/documents/switch', {
    id: elementorId
  }).finally(function () {
    fullPageEditor.handleFullPageEditorBtn();
    return window.elementorCommon.api.internal('panel/state-ready');
  });
};
fullPageEditor.handleFullPageEditorBtn = function handleFullPageEditorBtn() {
  $('.elementor').each(function () {
    if ($(this).find('.raven-document-handle-parent').length > 0 && $(this).find('.raven-document-handle-parent').children().length > 0) {
      return;
    }
    if ($(this).hasClass('elementor-edit-area-active')) {
      return;
    }
    const currentTargetName = this.dataset.elementorTitle;
    if (typeof currentTargetName === 'undefined') {
      return;
    }
    const newElementorId = $(this).attr('data-elementor-id');
    const ravenDocumentHandler = '<div class="raven-document-handle" onclick="window.ravenChangeDocument( ' + newElementorId + ' )"><i class="fas fa-edit"></i>Edit ' + currentTargetName + '</div>';
    $(this).prepend('<div class="raven-document-handle-parent" style="display:none;"></div>');
    $(this).find('.raven-document-handle-parent').append(ravenDocumentHandler);
  });
};
fullPageEditor.handleHeaderBtns = function () {
  let elementOffset = 0;
  if ($('main').length) {
    elementOffset = $('main').offset().top;
  }
  $(document).on('mouseenter', 'header', function () {
    if (elementOffset > 0) {
      return;
    }
    const clonedMainBtn = $('main .raven-document-handle-parent .raven-document-handle').clone().addClass('fixed-top-btn');
    if (clonedMainBtn.length === 0) {
      return;
    }
    if ($('header .elementor').find('.raven-document-handle-parent').length === 0) {
      $('header .elementor').prepend('<div class="raven-document-handle-parent"></div>');
      $('header .elementor .raven-document-handle-parent').prepend(clonedMainBtn);
    }
    if ($('header .elementor').find('.raven-document-handle-parent').length > 0) {
      $('header .elementor .raven-document-handle-parent').append(clonedMainBtn);
    }
  });
  $(document).on('mouseleave', 'header', function () {
    if ($('main .raven-document-handle-parent .raven-document-handle').length === 0) {
      return;
    }
    if (elementOffset > 0) {
      return;
    }
    $('header .elementor .raven-document-handle-parent .raven-document-handle.fixed-top-btn').remove();
  });
};
module.exports = fullPageEditor;

},{}],7:[function(require,module,exports){
const JupiterxHeader = {
  headerBehavior: false,
  overlayContent: false,
  /**
   * Theme `data-jupiterx-settings` uses keys from `jupiterx_get_header_settings()`
   * (behavior, overlap, offset, position). Elementor documents may use `elementor_*` keys.
   *
   * @param {Object|undefined} raw Raw settings from the header element.
   * @return {Object} Settings shaped for Elementor-style consumers.
   */
  normalizeHeaderSettings: raw => {
    const settings = raw && typeof raw === 'object' ? {
      ...raw
    } : {};
    if (settings.elementor_header_behavior === undefined) {
      const b = settings.behavior;
      settings.elementor_header_behavior = b === undefined || b === 'static' ? 'normal' : b;
    }
    if (settings.elementor_header_overlay_content === undefined) {
      const o = settings.overlap;
      settings.elementor_header_overlay_content = o !== undefined && o !== null && String(o).length > 0 ? 'yes' : 'no';
    }
    if (settings.elementor_header_fixed_position === undefined && settings.position !== undefined) {
      settings.elementor_header_fixed_position = settings.position;
    }
    if (settings.elementor_header_sticky_offset === undefined && settings.offset !== undefined) {
      settings.elementor_header_sticky_offset = settings.offset;
    }
    return settings;
  },
  // Object literal method — not constructible; do not call with `new`.
  headerInstance($scope) {
    const header = $scope.parents('.jupiterx-header'),
      body = $scope.parents('body'),
      rawSettings = header.data('jupiterx-settings'),
      headerSettings = JupiterxHeader.normalizeHeaderSettings(rawSettings);
    if (header.length < 1) {
      return;
    }
    const {
      elementor_header_behavior,
      // eslint-disable-line
      elementor_header_overlay_content // eslint-disable-line
    } = headerSettings;
    if ('normal' !== elementor_header_behavior) {
      // eslint-disable-line
      JupiterxHeader.handleHeaderBehavior(headerSettings, header, body);
    }
    if ('yes' === elementor_header_overlay_content) {
      // eslint-disable-line
      JupiterxHeader.hadnleOverlayContent(body);
    }
  },
  handleHeaderBehavior: (headerSettings, header, body) => {
    const {
      elementor_header_behavior
    } = headerSettings; // eslint-disable-line

    if (JupiterxHeader.headerBehavior) {
      return;
    }
    JupiterxHeader.headerBehavior = true;
    if (elementor_header_behavior === 'sticky') {
      // eslint-disable-line
      // eslint-disable-next-line no-undef
      if (jupiterx) {
        // eslint-disable-next-line no-undef
        jupiterx.pubsub.subscribe('scroll', function (position) {
          JupiterxHeader.handleStickyHeader(position, headerSettings, header, body);
        });
      }
    }
    if (elementor_header_behavior === 'fixed') {
      // eslint-disable-line
      JupiterxHeader.handleFixedHeader(headerSettings, header, body);
    }
  },
  handleFixedHeader: (headerSettings, header, body) => {
    const {
        elementor_header_fixed_position
      } = headerSettings,
      // eslint-disable-line
      jupiterxSite = body.find('.jupiterx-site'),
      outerHeight = header.outerHeight();
    const fixedPosition = elementor_header_fixed_position || 'top'; // eslint-disable-line

    body.addClass('jupiterx-header-fixed');
    header.addClass('jupiterx-header-custom');
    if (fixedPosition === 'bottom') {
      jupiterxSite.css(`padding-${fixedPosition}`, outerHeight);
      body.addClass('jupiterx-header-bottom');
      return;
    }
    header.css('position', 'fixed');
    jupiterxSite.css(`padding-${fixedPosition}`, outerHeight);
    let topValue = outerHeight;
    const offset = body.offset();
    if (body.hasClass('admin-bar')) {
      topValue = offset.top;
    }
    header.css('top', topValue);
  },
  handleStickyHeader: (position, headerSettings, header, body) => {
    const headerHeight = header.height();
    if (position > headerHeight) {
      body.addClass('jupiterx-header-stick');
      const $customHeader = $('.jupiterx-header.jupiterx-header-sticky-custom.jupiterx-header-custom > .elementor:last-of-type:not(:first-of-type)');
      if ($customHeader.length && $customHeader.height() > 0) {
        header.height($customHeader.height());
      }
    } else {
      body.removeClass('jupiterx-header-stick');
      header.attr('style', function (i, style) {
        return style && style.replace(/height[^;]+;?/g, '');
      });
    }
    const offset = JupiterxHeader.getOffset(headerSettings);
    if (position > offset) {
      body.addClass('jupiterx-header-sticked');
    } else {
      body.removeClass('jupiterx-header-sticked');
    }
  },
  getOffset: headerSettings => {
    const currentDevice = elementorFrontend.getCurrentDeviceMode(),
      {
        elementor_header_sticky_offset
      } = headerSettings,
      // eslint-disable-line
      offsetValue = elementor_header_sticky_offset || 0; // eslint-disable-line

    if ('desktop' === currentDevice) {
      return offsetValue;
    }
    if (headerSettings[`elementor_header_sticky_offset_${currentDevice}`]) {
      return headerSettings[`elementor_header_sticky_offset_${currentDevice}`];
    }
    return offsetValue;
  },
  hadnleOverlayContent: body => {
    if (JupiterxHeader.overlayContent) {
      return;
    }
    JupiterxHeader.overlayContent = true;
    body.addClass('jupiterx-header-overlapped');
  }
};
elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
  JupiterxHeader.headerInstance($scope);
});

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _module = _interopRequireDefault(require("./module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Masonry = _module.default.extend({
  getDefaultSettings() {
    return {
      masonryContainer: '.raven-masonry',
      columnClass: 'raven-masonry-column',
      columns: this.getInstanceValue('columns') || 3,
      columnsTablet: this.getInstanceValue('columns_tablet') || 2,
      columnsMobile: this.getInstanceValue('columns_mobile') || 1
    };
  },
  getDefaultElements() {
    return {
      $masonryContainer: this.$element.find(this.getSettings('masonryContainer'))
    };
  },
  run() {
    const settings = this.getSettings();
    const selector = `.elementor-element-${this.getID()} ${settings.masonryContainer}`;
    if (savvior.grids[selector]) {
      delete savvior.grids[selector];
    }
    savvior.init(selector, {
      'screen and (min-width: 1025px)': {
        columnClasses: settings.columnClass,
        columns: settings.columns
      },
      'screen and (max-width: 1024px) and (min-width: 768px)': {
        columnClasses: settings.columnClass,
        columns: settings.columnsTablet
      },
      'screen and (max-width: 767px)': {
        columnClasses: settings.columnClass,
        columns: settings.columnsMobile
      }
    });
  },
  push(items) {
    if (!items) {
      return;
    }
    const settings = this.getSettings();
    const selector = `.elementor-element-${this.getID()} ${settings.masonryContainer}`;
    const itemsNode = [];
    const savviorOptions = {
      method: 'append',
      clone: false
    };
    items.forEach(function (item) {
      const $item = $(item);
      itemsNode.push($item[0]);
    });
    if (savvior.grids[selector]) {
      savvior.addItems(selector, itemsNode, savviorOptions);
    }
  }
});
var _default = exports.default = Masonry;

},{"./module":9}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const Module = elementorModules.frontend.handlers.Base.extend({
  onSectionActivated: null,
  onEditorClosed: null,
  getInstanceValue(key) {
    $ = jQuery;
    return this.getElementSettings(this.getControlID(key));
  },
  getControlID(controlID) {
    const skin = this.getElementSettings('_skin');
    if (!skin) {
      return controlID;
    }
    return `${skin}_${controlID}`;
  },
  scrollToContainer($element) {
    let $top = $element.offset().top - 50;
    const headerHeight = $('header').height();
    const bodySelector = document.querySelector('body');
    if (bodySelector.classList.contains('jupiterx-header-fixed') || bodySelector.classList.contains('jupiterx-header-sticked')) {
      $top = $element.offset().top - headerHeight - 50;
    }
    window.scroll({
      top: $top,
      behavior: 'smooth'
    });
  },
  initEditorListeners() {
    const self = this;
    elementorModules.frontend.handlers.Base.prototype.initEditorListeners.apply(this, arguments);
    if (self.onSectionActivated) {
      self.editorListeners.push({
        event: 'section:activated',
        to: elementor.channels.editor,
        callback(activeSection, section) {
          if (section.model.id !== self.getID()) {
            return;
          }
          self.onSectionActivated(activeSection, section);
        }
      });
    }
    if (self.onEditorClosed) {
      self.editorListeners.push({
        event: 'set:page:editor',
        to: elementor.getPanelView(),
        callback(currentPageView) {
          if (currentPageView.model.id !== self.getID()) {
            return;
          }
          currentPageView.model.once('editor:close', function () {
            self.onEditorClosed();
          });
        }
      });
    }
  },
  onMobile() {
    const windowWidth = jQuery(window).width();
    return windowWidth <= 575.98;
  },
  onTablet() {
    const windowWidth = jQuery(window).width();
    return windowWidth > 575.98 && windowWidth <= 767.98;
  },
  onDesktop() {
    const windowWidth = jQuery(window).width();
    return windowWidth > 767.98;
  },
  isRtl() {
    return jQuery('body').hasClass('rtl');
  }
});
var _default = exports.default = Module;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Gets the action options passed from Effect and calculates changes, then applies them on element style.
 */
class Actions extends elementorModules.Module {
  onInit() {
    this.$element = this.getSettings('$targetElement');
    this.refresh();
  }
  refresh() {
    this.rulesVariables = {};
    this.CSSTransformVariables = [];
    this.$element.css({
      transform: '',
      filter: '',
      opacity: '',
      'will-change': ''
    });
  }

  // Interaction: scroll.
  translateX(actionData, passedPercents) {
    actionData.axis = 'x';
    actionData.unit = 'px';
    this.transform('translateX', passedPercents, actionData);
  }

  // Interaction: scroll.
  translateY(actionData, passedPercents) {
    actionData.axis = 'y';
    actionData.unit = 'px';
    this.transform('translateY', passedPercents, actionData);
  }

  // Interaction: mouseMove ("translateXY" is the alias used for "mouseTrack").
  translateXY(actionData, passedPercentsX, passedPercentsY) {
    this.translateX(actionData, passedPercentsX);
    this.translateY(actionData, passedPercentsY);
  }

  // It is not a direct effect and only used in calculation of "tilt" effect.
  rotateX(actionData, passedPercents) {
    actionData.axis = 'x';
    actionData.unit = 'deg';
    this.transform('rotateX', passedPercents, actionData);
  }

  // It is not a direct effect and only used in calculation of "tilt" effect.
  rotateY(actionData, passedPercents) {
    actionData.axis = 'y';
    actionData.unit = 'deg';
    this.transform('rotateY', passedPercents, actionData);
  }

  // Interaction: scroll.
  rotateZ(actionData, passedPercents) {
    actionData.unit = 'deg';
    this.transform('rotateZ', passedPercents, actionData);
  }

  // Interaction: mouseMove.
  tilt(actionData, passedPercentsX, passedPercentsY) {
    const data = {
      intensity: actionData.intensity / 10,
      direction: actionData.direction
    };
    this.rotateX(data, passedPercentsY);
    this.rotateY(data, 100 - passedPercentsX);
  }

  // Interaction: scroll.
  opacity(actionData, passedPercents) {
    const movePoint = this.getDirectionMovePoint(passedPercents, actionData.direction, actionData.viewport);
    const level = actionData.intensity / 10;
    const opacity = 1 - level + level * movePoint / 100;
    this.$element.css({
      opacity,
      'will-change': 'opacity'
    });
  }

  // Interaction: scroll.
  blur(actionData, passedPercents) {
    const movePoint = this.getDirectionMovePoint(passedPercents, actionData.direction, actionData.viewport);
    const level = actionData.intensity;
    const blur = level - level * movePoint / 100;
    this.updateRulePart('filter', 'blur', blur + 'px');
  }

  // Interaction: scroll.
  scale(actionData, passedPercents) {
    const movePoint = this.getDirectionMovePoint(passedPercents, actionData.direction, actionData.viewport);
    this.updateRulePart('transform', 'scale', 1 + actionData.intensity * movePoint / 1000);
  }
  transform(action, passedPercents, actionData) {
    if (actionData.direction) {
      passedPercents = 100 - passedPercents;
    }
    this.updateRulePart('transform', action, this.getStep(passedPercents, actionData) + actionData.unit);
  }
  getDirectionMovePoint(passedPercents, direction, range) {
    if (passedPercents < range.start) {
      const movePoint = this.getMovePointFromPassedPercents(range.start, passedPercents);
      switch (direction) {
        case 'out-in':
          return 0;
        case 'in-out':
          return 100;
        case 'out-in-out':
          return movePoint;
        case 'in-out-in':
          return 100 - movePoint;
      }
    }
    if (passedPercents < range.end) {
      const movePoint = this.getMovePointFromPassedPercents(range.end - range.start, passedPercents - range.start);
      switch (direction) {
        case 'out-in':
          return movePoint;
        case 'in-out':
          return 100 - movePoint;
        case 'out-in-out':
          return 100;
        case 'in-out-in':
          return 0;
      }
    }
    const movePoint = this.getMovePointFromPassedPercents(100 - range.end, 100 - passedPercents);
    switch (direction) {
      case 'out-in':
        return 100;
      case 'in-out':
        return 0;
      case 'out-in-out':
        return movePoint;
      case 'in-out-in':
        return 100 - movePoint;
    }
  }
  getMovePointFromPassedPercents(movableRange, passedPercents) {
    const movePoint = passedPercents / movableRange * 100;
    return +movePoint.toFixed(2);
  }
  getStep(passedPercents, options) {
    if ('element' === this.getSettings('effectTarget')) {
      return -(passedPercents - 50) * options.intensity;
    }
    const movableRange = this.getSettings('dimensions.movable' + options.axis.toUpperCase());
    return -(movableRange * passedPercents / 100);
  }
  updateRulePart(ruleName, key, value) {
    if (!this.rulesVariables[ruleName]) {
      this.rulesVariables[ruleName] = {};
    }
    if (!this.rulesVariables[ruleName][key]) {
      this.rulesVariables[ruleName][key] = true;
      this.updateRule(ruleName);
    }
    const cssVarKey = `--${key}`;
    this.$element[0].style.setProperty(cssVarKey, value);
  }
  updateRule(ruleName) {
    let value = '';
    value += this.concatTransformCSSProperties(ruleName);
    value += this.concatTransformMotionEffectCSSProperties(ruleName);
    this.$element.css(ruleName, value);
  }
  concatTransformCSSProperties(ruleName) {
    let value = '';
    if ('transform' === ruleName) {
      jQuery.each(this.CSSTransformVariables, (_, variableKey) => {
        const variableName = variableKey;
        if (variableKey.startsWith('flip')) {
          variableKey = variableKey.replace('flip', 'scale');
        }

        // Adding default value because of the hover state. if there is no default the transform will break.
        const defaultUnit = variableKey.startsWith('rotate') || variableKey.startsWith('skew') ? 'deg' : 'px';
        const defaultValue = variableKey.startsWith('scale') ? 1 : 0 + defaultUnit;
        value += `${variableKey}(var(--e-transform-${variableName}, ${defaultValue}))`;
      });
    }
    return value;
  }
  concatTransformMotionEffectCSSProperties(ruleName) {
    let value = '';
    jQuery.each(this.rulesVariables[ruleName], variableKey => {
      value += `${variableKey}(var(--${variableKey}))`;
    });
    return value;
  }
  setCSSTransformVariables(elementSettings) {
    this.CSSTransformVariables = [];
    jQuery.each(elementSettings, (settingKey, settingValue) => {
      const transformKeyMatches = settingKey.match(/_transform_(.+?)_effect/m);
      if (transformKeyMatches && settingValue) {
        if ('perspective' === transformKeyMatches[1]) {
          this.CSSTransformVariables.unshift(transformKeyMatches[1]);
          return;
        }
        if (this.CSSTransformVariables.includes(transformKeyMatches[1])) {
          return;
        }
        this.CSSTransformVariables.push(transformKeyMatches[1]);
      }
    });
  }
  runAction(actionName, actionData, passedPercents, ...args) {
    if (['translateX', 'translateY', 'rotateZ'].includes(actionName)) {
      if (actionData.viewport.start > passedPercents) {
        passedPercents = actionData.viewport.start;
      }
      if (actionData.viewport.end < passedPercents) {
        passedPercents = actionData.viewport.end;
      }
    }
    this[actionName](actionData, passedPercents, ...args);
  }
}
var _default = exports.default = Actions;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Initializes motion effects by retrieving motion effects settings and
 * instantiates Effect class(in motion-effects.js) with those settings.
 */
class EffectsHandler extends elementorModules.frontend.handlers.Base {
  __construct(...args) {
    super.__construct(...args);
    this.normalMotion = 'raven_motion_effects';
    this.backgroundMotion = 'background_' + this.normalMotion;
    this.toggle = elementorFrontend.debounce(this.toggle, 200);
  }
  onInit() {
    super.onInit();
    this.initEffects();
    this.addCSSTransformEvents();
    this.toggle();
  }
  getDefaultSettings() {
    return {
      selectors: {
        container: '.elementor-widget-container'
      },
      // eslint-disable-next-line camelcase
      isOptimizedMarkupEnabled: typeof elementorFrontend !== 'undefined' ? elementorFrontend?.config?.experimentalFeatures?.e_optimized_markup : false,
      isDefaultContainerExist: jQuery(this.$element).find('.elementor-widget-container')?.length > 0
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const $isOptimizedMarkupEnabled = this.getSettings('isOptimizedMarkupEnabled');
    const $isDefaultContainerExist = this.getSettings('isDefaultContainerExist');
    if ($isOptimizedMarkupEnabled && !$isDefaultContainerExist) {
      return {
        $container: jQuery(this.$element)
      };
    }
    return {
      $container: jQuery(this.$element).find(selectors.container)
    };
  }
  bindEvents() {
    elementorFrontend.elements.$window.on('resize', this.toggle);
  }
  unbindEvents() {
    elementorFrontend.elements.$window.off('resize', this.toggle);
  }
  initEffects() {
    this.effects = {
      translateY: {
        interaction: 'scroll',
        actions: ['translateY']
      },
      translateX: {
        interaction: 'scroll',
        actions: ['translateX']
      },
      rotateZ: {
        interaction: 'scroll',
        actions: ['rotateZ']
      },
      scale: {
        interaction: 'scroll',
        actions: ['scale']
      },
      opacity: {
        interaction: 'scroll',
        actions: ['opacity']
      },
      blur: {
        interaction: 'scroll',
        actions: ['blur']
      },
      mouseTrack: {
        interaction: 'mouseMove',
        actions: ['translateXY']
      },
      tilt: {
        interaction: 'mouseMove',
        actions: ['tilt']
      }
    };
  }
  addCSSTransformEvents() {
    // Transform origin is set in two places: <Transform> section and <Motion Effect> section. The former must override the latter.
    // Remove CSS transition variable that assigned from scroll.js in order to allow the transition of the CSS-Transform.
    const motionFxScrolling = this.getElementSettings(this.normalMotion + '_scrolling');
    if (motionFxScrolling && !this.isTransitionEventAdded) {
      this.isTransitionEventAdded = true;
      this.elements.$container.on('mouseenter', () => {
        this.elements.$container.css('--e-transform-transition-duration', '');
      });
    }
  }
  prepareOptions(name) {
    const elementSettings = this.getElementSettings();
    const effectTarget = this.normalMotion === name ? 'element' : 'background';
    const interactions = {};

    // Loop over settings and inspect individual Effects.
    jQuery.each(elementSettings, (key, value) => {
      // Running match() on the following regexp, captures "scale" in "raven_motion_effects_scale_fx" in its second index.
      const keyRegex = new RegExp('^' + name + '_(.+?)_fx');
      const keyMatches = key.match(keyRegex);
      if (!keyMatches || !value) {
        return;
      }
      const options = {};
      const effectName = keyMatches[1];

      // Loop over settings again, and extract settings of this specific Effect.
      jQuery.each(elementSettings, (subKey, subValue) => {
        const subKeyRegex = new RegExp(name + '_' + effectName + '_fx_(.+)');
        const subKeyMatches = subKey.match(subKeyRegex);
        if (!subKeyMatches) {
          return;
        }

        // Will be one of these: "direction"/"viewport"/"intensity".
        const effectSetting = subKeyMatches[1];
        if ('fx' === effectSetting) {
          return;
        }
        if ('object' === typeof subValue) {
          // Both Viewport and Intensity settings are of slider type.
          // But Viewport setting contains 'sizes' key as it is a range, while Intensity setting contains 'size'.
          subValue = Object.keys(subValue.sizes).length ? subValue.sizes : subValue.size;
        }
        options[effectSetting] = subValue;
      });

      // Fill interactions array.
      const effect = this.effects[effectName];
      const interactionName = effect.interaction;
      if (!interactions[interactionName]) {
        interactions[interactionName] = {};
      }
      effect.actions.forEach(action => interactions[interactionName][action] = options);
    });
    let $element = this.$element;
    let $dimensionsElement;
    const elementType = this.getElementType();
    const isContainer = 'section' === elementType || 'container' === elementType || 'column' === elementType;
    if (true === this.getSettings('isOptimizedMarkupEnabled') && !this.getSettings('isDefaultContainerExist') && !isContainer) {
      const excludeClasses = ['.elementor-element-overlay', '.elementor-editor-element-settings', '.elementor-editor-highlighted', '.elementor-editor-section-settings', '.elementor-editor-widget-settings', '.elementor-editor-column-settings', '.elementor-editor-active', '.elementor-editor-lock'];
      const selector = excludeClasses.join(', ');
      $element = $element.children().not(selector).first();
    }
    if ('element' === effectTarget && 'section' !== elementType && 'container' !== elementType) {
      $dimensionsElement = $element;
      let childElementSelector;
      if ('column' === elementType) {
        childElementSelector = elementorFrontend.config.legacyMode.elementWrappers ? '.elementor-column-wrap' : '.elementor-widget-wrap';
      } else {
        childElementSelector = '.elementor-widget-container';
      }
      if (jQuery(this.$element).find(childElementSelector)?.length > 0) {
        $element = $element.find('> ' + childElementSelector);
      }
    }
    const options = {
      effectTarget,
      interactions,
      elementSettings,
      $element,
      $dimensionsElement,
      refreshDimensions: this.isEdit,
      range: elementSettings[name + '_range'],
      classes: {
        element: 'raven-motion-effects-element',
        parent: 'raven-motion-effects-parent',
        perspective: 'raven-motion-effects-perspective',
        // The following classes prefix is kept as "elementor" because they inherit styles from Elementor Free
        backgroundType: 'elementor-motion-effects-element-type-background',
        container: 'elementor-motion-effects-container',
        layer: 'elementor-motion-effects-layer'
      }
    };
    if (!options.range && 'fixed' === this.getCurrentDeviceSetting('_position')) {
      options.range = 'page';
    }
    if ('fixed' === this.getCurrentDeviceSetting('_position')) {
      options.isFixedPosition = true;
    }
    if ('background' === effectTarget && 'column' === this.getElementType()) {
      options.addBackgroundLayerTo = ' > .elementor-element-populated';
    }
    return options;
  }
  activate(name) {
    const options = this.prepareOptions(name);
    if (jQuery.isEmptyObject(options.interactions)) {
      return;
    }
    this[name] = new (require('./motion-effects').default)(options);
  }
  deactivate(name) {
    if (this[name]) {
      this[name].destroy();
      delete this[name];
    }
  }
  toggle() {
    const currentDeviceMode = elementorFrontend.getCurrentDeviceMode();
    const elementSettings = this.getElementSettings();
    [this.normalMotion, this.backgroundMotion].forEach(name => {
      const devices = elementSettings[name + '_devices'];
      const isCurrentModeActive = !devices || -1 !== devices.indexOf(currentDeviceMode);
      const isMotionEffectsSet = elementSettings[name + '_scrolling'] || elementSettings[name + '_mouse'];
      if (isCurrentModeActive && isMotionEffectsSet) {
        if (this[name]) {
          this.refreshInstance(name);
          return;
        }
        this.activate(name);
        return;
      }
      this.deactivate(name);
    });
  }
  refreshInstance(instanceName) {
    const instance = this[instanceName];
    if (!instance) {
      return;
    }
    const preparedOptions = this.prepareOptions(instanceName);
    instance.setSettings(preparedOptions);
    instance.refresh();
  }
  onElementChange(propertyName) {
    if (/raven_motion_effects_((scrolling)|(mouse)|(devices))$/.test(propertyName)) {
      if (this.normalMotion + '_scrolling' === propertyName) {
        this.addCSSTransformEvents();
      }
      this.toggle();
      return;
    }
    const propertyMatches = propertyName.match(`.*?(${this.normalMotion}|_transform)`);
    if (propertyMatches) {
      const instanceName = propertyMatches[0].match('(_transform)') ? this.normalMotion : propertyMatches[0];
      this.refreshInstance(instanceName);
      if (!this[instanceName]) {
        this.activate(instanceName);
      }
    }
    if (/^_position/.test(propertyName)) {
      [this.normalMotion, this.backgroundMotion].forEach(instanceName => {
        this.refreshInstance(instanceName);
      });
    }
  }
  onDestroy() {
    super.onDestroy();
    [this.normalMotion, this.backgroundMotion].forEach(name => {
      this.deactivate(name);
    });
  }
}
var _default = exports.default = EffectsHandler;

},{"./motion-effects":15}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class BaseInteraction extends elementorModules.ViewModule {
  constructor(...args) {
    super(...args);
    (0, _defineProperty)(this, 'onInsideViewport', () => {
      this.run();
      this.animationFrameRequest = window.requestAnimationFrame(this.onInsideViewport);
    });
  }
  __construct(options) {
    this.motionFX = options.motionFX;
    if (!this.intersectionObservers) {
      this.setElementInViewportObserver();
    }
  }
  setElementInViewportObserver() {
    this.intersectionObserver = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          this.onInsideViewport();
          return;
        }
        this.removeAnimationFrameRequest();
      }
    });

    // Determine which element we should observe.
    const observedElement = 'page' === this.motionFX.getSettings('range') ? elementorFrontend.elements.$body[0] : this.motionFX.elements.$parent[0];
    this.intersectionObserver.observe(observedElement);
  }
  runCallback(...args) {
    const callback = this.getSettings('callback');
    callback(...args);
  }
  removeIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.motionFX.elements.$parent[0]);
    }
  }
  removeAnimationFrameRequest() {
    if (this.animationFrameRequest) {
      window.cancelAnimationFrame(this.animationFrameRequest);
    }
  }
  destroy() {
    this.removeAnimationFrameRequest();
    this.removeIntersectionObserver();
  }
  onInit() {
    super.onInit();
  }
}
var _default = exports.default = BaseInteraction;
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MouseMoveInteraction extends _base.default {
  onInit() {
    this.mousePosition = {};
    this.oldMousePosition = {};
    super.onInit();
  }
  bindEvents() {
    if (!MouseMoveInteraction.mouseTracked) {
      elementorFrontend.elements.$window.on('mousemove', this.updateMousePosition);
      MouseMoveInteraction.mouseTracked = true;
    }
  }
  run() {
    const mousePosition = MouseMoveInteraction.mousePosition;
    const oldMousePosition = this.oldMousePosition;
    if (oldMousePosition.x === mousePosition.x && oldMousePosition.y === mousePosition.y) {
      return;
    }
    this.oldMousePosition = {
      x: mousePosition.x,
      y: mousePosition.y
    };
    const passedPercentsX = 100 / window.innerWidth * mousePosition.x;
    const passedPercentsY = 100 / window.innerHeight * mousePosition.y;
    this.runCallback(passedPercentsX, passedPercentsY);
  }
  updateMousePosition(event) {
    MouseMoveInteraction.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }
}
MouseMoveInteraction.mousePosition = {};
var _default = exports.default = MouseMoveInteraction;

},{"./base":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = _interopRequireDefault(require("./base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ScrollInteraction extends _base.default {
  run() {
    if (window.scrollY === this.currentScrollFromTop) {
      return false;
    }
    this.onScrollMovement();
    this.currentScrollFromTop = window.scrollY;
  }
  onScrollMovement() {
    this.updateMotionFxDimensions();
    this.updateAnimation();
    this.resetTransitionVariable();
  }
  resetTransitionVariable() {
    this.motionFX.$element.css('--e-transform-transition-duration', '100ms');
  }
  updateMotionFxDimensions() {
    const motionFXSettings = this.motionFX.getSettings();
    if (motionFXSettings.refreshDimensions) {
      this.motionFX.defineDimensions();
    }
  }
  updateAnimation() {
    let passedRangePercents;
    if ('page' === this.motionFX.getSettings('range')) {
      passedRangePercents = elementorModules.utils.Scroll.getPageScrollPercentage();
      this.runCallback(passedRangePercents);
      return;
    }
    if (this.motionFX.getSettings('isFixedPosition')) {
      passedRangePercents = elementorModules.utils.Scroll.getPageScrollPercentage({}, window.innerHeight);
      this.runCallback(passedRangePercents);
      return;
    }
    passedRangePercents = elementorModules.utils.Scroll.getElementViewportPercentage(this.motionFX.elements.$parent);
    this.runCallback(passedRangePercents);
  }
}
var _default = exports.default = ScrollInteraction;

},{"./base":12}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Gets the options passed from handler, inspects the actions and
 * decides which interaction is * needed to calculate the effect
 * outcome, runs them, then instantiates Actions(action.js) to handle them.
 */
class Effects extends elementorModules.ViewModule {
  getDefaultSettings() {
    return {
      effectTarget: 'element',
      $element: null,
      $dimensionsElement: null,
      addBackgroundLayerTo: null,
      interactions: {},
      refreshDimensions: false,
      range: 'viewport',
      classes: {
        element: 'raven-motion-effects-element',
        parent: 'raven-motion-effects-parent',
        perspective: 'raven-motion-effects-perspective',
        // The following classes prefix is kept as "elementor" because they inherit styles from Elementor Free
        backgroundType: 'elementor-motion-effects-element-type-background',
        container: 'elementor-motion-effects-container',
        layer: 'elementor-motion-effects-layer'
      }
    };
  }
  bindEvents() {
    this.onWindowResize = this.onWindowResize.bind(this);
    elementorFrontend.elements.$window.on('resize', this.onWindowResize);
  }
  unbindEvents() {
    elementorFrontend.elements.$window.off('resize', this.onWindowResize);
  }
  onInit() {
    super.onInit();
    const settings = this.getSettings();
    this.$element = settings.$element;
    this.$element.addClass(settings.classes.element);
    this.elements.$parent = this.$element.parent();
    this.elements.$parent.addClass(settings.classes.parent);
    if ('background' === settings.effectTarget) {
      this.$element.addClass(settings.classes.backgroundType);
      this.addBackgroundLayer();
    }
    this.defineDimensions();
    settings.$targetElement = 'element' === settings.effectTarget ? this.$element : this.elements.$motionFXLayer;
    this.interactions = {};
    this.actions = new (require('./actions').default)(settings);
    this.initInteractionsTypes();
    this.runInteractions();
  }
  defineDimensions() {
    const $dimensionsElement = this.getSettings('$dimensionsElement') || this.$element;
    const elementOffset = $dimensionsElement.offset();
    const dimensions = {
      elementHeight: $dimensionsElement.outerHeight(),
      elementWidth: $dimensionsElement.outerWidth(),
      elementTop: elementOffset.top,
      elementLeft: elementOffset.left,
      elementRange: $dimensionsElement.outerHeight() + window.innerHeight
    };
    this.setSettings('dimensions', dimensions);
    if ('background' === this.getSettings('effectTarget')) {
      this.defineBackgroundLayerDimensions();
    }
  }
  initInteractionsTypes() {
    this.interactionsTypes = {
      scroll: require('./interactions/scroll').default,
      mouseMove: require('./interactions/mouse').default
    };
  }
  runInteractions() {
    const settings = this.getSettings();
    this.actions.setCSSTransformVariables(settings.elementSettings);
    this.prepareSpecialActions();
    jQuery.each(settings.interactions, (interactionName, actions) => {
      this.interactions[interactionName] = new this.interactionsTypes[interactionName]({
        motionFX: this,
        callback: (...args) => {
          jQuery.each(actions, (actionName, actionData) => this.actions.runAction(actionName, actionData, ...args));
        }
      });
      this.interactions[interactionName].run();
    });
  }
  prepareSpecialActions() {
    const settings = this.getSettings();
    const hasTiltEffect = !!(settings.interactions.mouseMove && settings.interactions.mouseMove.tilt);
    this.elements.$parent.toggleClass(settings.classes.perspective, hasTiltEffect);
  }
  cleanSpecialActions() {
    const settings = this.getSettings();
    this.elements.$parent.removeClass(settings.classes.perspective);
  }
  destroyInteractions() {
    this.cleanSpecialActions();
    jQuery.each(this.interactions, (_, interaction) => interaction.destroy());
    this.interactions = {};
  }
  refresh() {
    this.actions.setSettings(this.getSettings());
    if ('background' === this.getSettings('effectTarget')) {
      this.updateBackgroundLayerSize();
      this.defineBackgroundLayerDimensions();
    }
    this.actions.refresh();
    this.destroyInteractions();
    this.runInteractions();
  }
  destroy() {
    this.destroyInteractions();
    this.actions.refresh();
    const settings = this.getSettings();
    this.$element.removeClass(settings.classes.element);
    this.elements.$parent.removeClass(settings.classes.parent);
    if ('background' === settings.effectTarget) {
      this.$element.removeClass(settings.classes.backgroundType);
      this.removeBackgroundLayer();
    }
  }
  onWindowResize() {
    this.defineDimensions();
  }

  // (For Background).
  defineBackgroundLayerDimensions() {
    const dimensions = this.getSettings('dimensions');
    dimensions.layerHeight = this.elements.$motionFXLayer.height();
    dimensions.layerWidth = this.elements.$motionFXLayer.width();
    dimensions.movableX = dimensions.layerWidth - dimensions.elementWidth;
    dimensions.movableY = dimensions.layerHeight - dimensions.elementHeight;
    this.setSettings('dimensions', dimensions);
  }

  // (For Background).
  addBackgroundLayer() {
    const settings = this.getSettings();
    this.elements.$motionFXContainer = jQuery('<div>', {
      class: settings.classes.container
    });
    this.elements.$motionFXLayer = jQuery('<div>', {
      class: settings.classes.layer
    });
    this.updateBackgroundLayerSize();
    this.elements.$motionFXContainer.prepend(this.elements.$motionFXLayer);
    const $addBackgroundLayerTo = settings.addBackgroundLayerTo ? this.$element.find(settings.addBackgroundLayerTo) : this.$element;
    $addBackgroundLayerTo.prepend(this.elements.$motionFXContainer);
  }

  // (For Background).
  removeBackgroundLayer() {
    this.elements.$motionFXContainer.remove();
  }

  // (For Background).
  updateBackgroundLayerSize() {
    const settings = this.getSettings();
    const speed = {
      x: 0,
      y: 0
    };
    const mouseInteraction = settings.interactions.mouseMove;
    const scrollInteraction = settings.interactions.scroll;
    if (mouseInteraction && mouseInteraction.translateXY) {
      speed.x = mouseInteraction.translateXY.intensity * 10;
      speed.y = mouseInteraction.translateXY.intensity * 10;
    }
    if (scrollInteraction) {
      if (scrollInteraction.translateX) {
        speed.x = scrollInteraction.translateX.intensity * 10;
      }
      if (scrollInteraction.translateY) {
        speed.y = scrollInteraction.translateY.intensity * 10;
      }
    }
    this.elements.$motionFXLayer.css({
      width: 100 + speed.x + '%',
      height: 100 + speed.y + '%'
    });
  }
}
var _default = exports.default = Effects;

},{"./actions":10,"./interactions/mouse":13,"./interactions/scroll":14}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class MotionEffectsLuncher extends elementorModules.Module {
  constructor() {
    super();

    // Hook effects handler to all elements.
    elementorFrontend.elementsHandler.attachHandler('global', require('./effects/handler').default, null);

    // Hook sticky handler to section, widget and container elements.
    elementorFrontend.elementsHandler.attachHandler('section', require('./sticky/handler').default, null);
    elementorFrontend.elementsHandler.attachHandler('container', require('./sticky/handler').default, null);
    elementorFrontend.elementsHandler.attachHandler('widget', require('./sticky/handler').default, null);

    // Run sticky script
    require('./sticky/sticky-script-manager');
  }
}
var _default = exports.default = MotionEffectsLuncher;

},{"./effects/handler":11,"./sticky/handler":17,"./sticky/sticky-script-manager":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const StickyHandler = elementorModules.frontend.handlers.Base.extend({
  settingPrefix: 'raven_motion_effects',
  // This constant property value must be equal to the name of function which
  // "sticky-script-manager.js" adds to every element with sticky setting.
  stickyFunction: 'ravenSticky',
  bindEvents() {
    elementorFrontend.addListenerOnce(this.getUniqueHandlerID() + this.stickyFunction, 'resize', this.refresh);
  },
  unbindEvents() {
    elementorFrontend.removeListeners(this.getUniqueHandlerID() + this.stickyFunction + 'Sticky', 'resize', this.refresh);
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if (elementorFrontend.isEditMode()) {
      elementor.listenTo(elementor.channels.deviceMode, 'change', () => this.onDeviceModeChange());
    }
    this.run();
  },
  run(refresh) {
    if (!this.getElementSettings(this.settingPrefix + 'sticky')) {
      this.deactivate();
      return;
    }
    const currentDeviceMode = elementorFrontend.getCurrentDeviceMode();
    const activeDevices = this.getElementSettings(this.settingPrefix + 'sticky_on');
    if (-1 === activeDevices.indexOf(currentDeviceMode)) {
      this.deactivate();
      return;
    }
    if (true === refresh) {
      this.reactivate();
      return;
    }
    if (!this.isStickyInstanceActive()) {
      this.activate();
    }
  },
  activate() {
    const elementSettings = this.getElementSettings();
    const stickyOptions = {
      to: elementSettings[this.settingPrefix + 'sticky'],
      offset: this.getResponsiveSetting(this.settingPrefix + 'sticky_offset'),
      effectsOffset: this.getResponsiveSetting(this.settingPrefix + 'sticky_effects_offset'),
      classes: {
        sticky: 'raven-sticky',
        stickyActive: 'raven-sticky--active raven-section--handles-inside',
        stickyEffects: 'raven-sticky--effects',
        spacer: 'raven-sticky__spacer'
      }
    };
    if (elementSettings[this.settingPrefix + 'sticky_parent']) {
      stickyOptions.parent = '.e-container, .elementor-widget-wrap, .e-con';
    }
    const $wpAdminBar = elementorFrontend.elements.$wpAdminBar;

    // If admin bar in visible, add its height to sticky offset.
    if ($wpAdminBar.length && 'top' === stickyOptions.to && 'fixed' === $wpAdminBar.css('position')) {
      stickyOptions.offset += $wpAdminBar.height();
    }
    this.$element[this.stickyFunction](stickyOptions);
  },
  /**
   * Get the current active setting value for a responsive control.
   *
   * @param {string} setting
   * @return {any} - Setting value.
   */
  getResponsiveSetting(setting) {
    const elementSettings = this.getElementSettings();
    return elementorFrontend.getCurrentDeviceSetting(elementSettings, setting);
  },
  /**
   * Return an array of settings names for responsive control (e.g. `settings`, `setting_tablet`, `setting_mobile` ).
   *
   * @param {string} setting
   * @return {string[]} - List of settings.
   */
  getResponsiveSettingList(setting) {
    const breakpoints = Object.keys(elementorFrontend.config.responsive.activeBreakpoints);
    return ['', ...breakpoints].map(suffix => {
      return suffix ? `${setting}_${suffix}` : setting;
    });
  },
  refresh() {
    this.run(true);
  },
  reactivate() {
    this.deactivate();
    this.activate();
  },
  deactivate() {
    if (this.isStickyInstanceActive()) {
      // The following method on $element is defined in sticky-script-manager.js
      this.$element[this.stickyFunction]('destroy');
    }
  },
  isStickyInstanceActive() {
    return undefined !== this.$element.data(this.stickyFunction);
  },
  onElementChange(settingKey) {
    const activeDevices = this.getElementSettings(this.settingPrefix + 'sticky_on'),
      currentDeviceMode = elementorFrontend.getCurrentDeviceMode();
    if (!activeDevices?.includes(currentDeviceMode)) {
      return;
    }
    if (-1 !== [this.settingPrefix + 'sticky', this.settingPrefix + 'sticky_on'].indexOf(settingKey)) {
      this.run(true);
    }

    // Settings that trigger a re-activation when changed.
    const settings = [...this.getResponsiveSettingList(this.settingPrefix + 'sticky_offset'), ...this.getResponsiveSettingList(this.settingPrefix + 'sticky_effects_offset'), this.settingPrefix + 'sticky_parent'];
    if (-1 !== settings.indexOf(settingKey)) {
      this.reactivate();
    }
  },
  onDeviceModeChange() {
    // setTimeout is used to run refresh() after the call stack gets empty.
    // Because the run() requests the current device mode from the CSS so it's not ready immediately.
    setTimeout(this.refresh);
  },
  onDestroy() {
    elementorModules.frontend.handlers.Base.prototype.onDestroy.apply(this, arguments);
    this.deactivate();
  }
});
var _default = exports.default = StickyHandler;

},{}],18:[function(require,module,exports){
"use strict";

var _stickyScript = _interopRequireDefault(require("./sticky-script"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const functionName = 'ravenSticky';
(function ($) {
  // Add sticky manager function to prototype of every element.
  $.fn[functionName] = function (settings) {
    const isCommand = 'string' === typeof settings;
    this.each(function () {
      // If the "settings" is an object of sticky options, instantiate StickyScript with those options to handle sticky.
      if (!isCommand) {
        $(this).data(functionName, new _stickyScript.default(this, settings));
        return;
      }

      // If the "settings" is a command, retrieve StickyScript instance.
      const instance = $(this).data(functionName);
      if (!instance) {
        throw Error('Trying to perform the `' + settings + '` method prior to initialization');
      }
      if (!instance[settings]) {
        throw ReferenceError('Method `' + settings + '` not found in sticky instance');
      }

      // Apply passed "settings" to the StickyScript instance.
      // Mainly used to call destroy() function from StickyScript.
      instance[settings].apply(instance, Array.prototype.slice.call(arguments, 1));

      // Delete StickyScript instance from the element upon recieving "destroy" command.
      if ('destroy' === settings) {
        $(this).removeData(functionName);
      }
    });
    return this;
  };
  window[functionName] = _stickyScript.default;
})(jQuery);

},{"./sticky-script":19}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Manages sticky effects. For each element with sticky setting,
 * an instance of this class will be created.
 */
class StickyScript {
  constructor(element, userSettings) {
    this.prefix = 'raven';
    this.userSettings = userSettings;
    this.element = element;
    this.$element = null;
    this.isSticky = false;
    this.isFollowingParent = false;
    this.isReachedEffectsPoint = false;
    this.elements = {};
    this.settings = null;
    this.defaultSettings = {
      to: 'top',
      offset: 0,
      effectsOffset: 0,
      parent: false,
      classes: {
        sticky: 'raven-sticky',
        stickyActive: 'raven-sticky--active raven-section--handles-inside',
        stickyEffects: 'raven-sticky--effects',
        spacer: 'raven-sticky__spacer'
      }
    };
    this.init();
  }
  init() {
    this.initSettings();
    this.initElements();
    this.bindEvents();
    this.checkPosition();
  }
  initSettings() {
    this.settings = jQuery.extend(true, this.defaultSettings, this.userSettings);
  }
  initElements() {
    this.$element = jQuery(this.element).addClass(this.settings.classes.sticky);
    this.elements.$window = jQuery(window);
    if (this.settings.parent) {
      this.elements.$parent = this.$element.parent();
      if ('parent' !== this.settings.parent) {
        this.elements.$parent = this.elements.$parent.closest(this.settings.parent);
      }
    }
  }
  checkPosition() {
    const offset = this.settings.offset;
    let distanceFromTriggerPoint;
    if (this.isSticky) {
      const spacerViewportOffset = this.getElementViewportOffset(this.elements.$spacer);
      distanceFromTriggerPoint = 'top' === this.settings.to ? spacerViewportOffset.top.fromTop - offset : -spacerViewportOffset.bottom.fromBottom - offset;
      if (this.settings.parent) {
        this.checkParent();
      }
      if (distanceFromTriggerPoint > 0) {
        this.unstick();
      }
    } else {
      const elementViewportOffset = this.getElementViewportOffset(this.$element);
      distanceFromTriggerPoint = 'top' === this.settings.to ? elementViewportOffset.top.fromTop - offset : -elementViewportOffset.bottom.fromBottom - offset;
      if (distanceFromTriggerPoint <= 0) {
        this.stick();
        if (this.settings.parent) {
          this.checkParent();
        }
      }
    }
    this.checkEffectsPoint(distanceFromTriggerPoint);
  }
  backupCSS($elementBackupCSS, backupState, properties) {
    const elementStyle = $elementBackupCSS[0].style;
    const css = {};
    properties.forEach(property => {
      css[property] = undefined !== elementStyle[property] ? elementStyle[property] : '';
    });
    $elementBackupCSS.data(this.prefix + '-css-backup-' + backupState, css);
  }
  getCSSBackup($elementCSSBackup, backupState) {
    return $elementCSSBackup.data(this.prefix + '-css-backup-' + backupState);
  }
  addSpacer() {
    this.elements.$spacer = this.$element.clone().addClass(this.settings.classes.spacer).css({
      visibility: 'hidden',
      transition: 'none',
      animation: 'none'
    });
    this.$element.after(this.elements.$spacer);
  }
  removeSpacer() {
    this.elements.$spacer.remove();
  }
  stickElement() {
    this.backupCSS(this.$element, 'unsticky', ['position', 'width', 'margin-top', 'margin-bottom', 'top', 'bottom']);
    const css = {
      position: 'fixed',
      width: this.getElementOuterSize(this.$element, 'width'),
      marginTop: 0,
      marginBottom: 0
    };
    css[this.settings.to] = this.settings.offset;
    css['top' === this.settings.to ? 'bottom' : 'top'] = '';
    this.$element.css(css).addClass(this.settings.classes.stickyActive);
  }
  unstickElement() {
    this.$element.css(this.getCSSBackup(this.$element, 'unsticky')).removeClass(this.settings.classes.stickyActive);
  }
  followParent() {
    this.backupCSS(this.elements.$parent, 'childNotFollowing', ['position']);
    this.elements.$parent.css('position', 'relative');
    this.backupCSS(this.$element, 'notFollowing', ['position', 'top', 'bottom']);
    const css = {
      position: 'absolute'
    };
    css[this.settings.to] = '';
    css['top' === this.settings.to ? 'bottom' : 'top'] = 0;
    this.$element.css(css);
    this.isFollowingParent = true;
  }
  unfollowParent() {
    this.elements.$parent.css(this.getCSSBackup(this.elements.$parent, 'childNotFollowing'));
    this.$element.css(this.getCSSBackup(this.$element, 'notFollowing'));
    this.isFollowingParent = false;
  }
  getElementOuterSize($elementOuterSize, dimension, includeMargins) {
    const computedStyle = window.getComputedStyle($elementOuterSize[0]);
    const sides = 'height' === dimension ? ['top', 'bottom'] : ['left', 'right'];
    let elementSize = parseFloat(computedStyle[dimension]);
    const propertiesToAdd = [];
    if ('border-box' !== computedStyle.boxSizing) {
      propertiesToAdd.push('border', 'padding');
    }
    if (includeMargins) {
      propertiesToAdd.push('margin');
    }
    propertiesToAdd.forEach(property => {
      sides.forEach(side => {
        elementSize += parseFloat(computedStyle[property + '-' + side]);
      });
    });
    return elementSize;
  }
  getElementViewportOffset($elementViewportOffset) {
    const windowScrollTop = this.elements.$window.scrollTop();
    const elementHeight = this.getElementOuterSize($elementViewportOffset, 'height');
    const viewportHeight = window.innerHeight;
    const elementOffsetFromTop = $elementViewportOffset.offset().top;
    const distanceFromTop = elementOffsetFromTop - windowScrollTop;
    const topFromBottom = distanceFromTop - viewportHeight;
    return {
      top: {
        fromTop: distanceFromTop,
        fromBottom: topFromBottom
      },
      bottom: {
        fromTop: distanceFromTop + elementHeight,
        fromBottom: topFromBottom + elementHeight
      }
    };
  }
  stick() {
    this.addSpacer();
    this.stickElement();
    this.isSticky = true;
    this.$element.trigger(this.prefix + 'Sticky:stick');
  }
  unstick() {
    this.unstickElement();
    this.removeSpacer();
    this.isSticky = false;
    this.$element.trigger(this.prefix + 'Sticky:unstick');
  }
  checkParent() {
    const elementOffset = this.getElementViewportOffset(this.$element);
    const isTop = 'top' === this.settings.to;
    if (this.isFollowingParent) {
      const isNeedUnfollowing = isTop ? elementOffset.top.fromTop > this.settings.offset : elementOffset.bottom.fromBottom < -this.settings.offset;
      if (isNeedUnfollowing) {
        this.unfollowParent();
      }
      return;
    }
    const parentOffset = this.getElementViewportOffset(this.elements.$parent);
    const parentStyle = window.getComputedStyle(this.elements.$parent[0]);
    const borderWidthToDecrease = parseFloat(parentStyle[isTop ? 'borderBottomWidth' : 'borderTopWidth']);
    const parentViewportDistance = isTop ? parentOffset.bottom.fromTop - borderWidthToDecrease : parentOffset.top.fromBottom + borderWidthToDecrease;
    const isNeedFollowing = isTop ? parentViewportDistance <= elementOffset.bottom.fromTop : parentViewportDistance >= elementOffset.top.fromBottom;
    if (isNeedFollowing) {
      this.followParent();
    }
  }
  checkEffectsPoint(distanceFromTriggerPoint) {
    if (this.isReachedEffectsPoint && -distanceFromTriggerPoint < this.settings.effectsOffset) {
      this.$element.removeClass(this.settings.classes.stickyEffects);
      this.isReachedEffectsPoint = false;
      return;
    }
    if (!this.isReachedEffectsPoint && -distanceFromTriggerPoint >= this.settings.effectsOffset) {
      this.$element.addClass(this.settings.classes.stickyEffects);
      this.isReachedEffectsPoint = true;
    }
  }
  bindEvents() {
    this.scrollHandler = this.onWindowScroll.bind(this);
    this.resizeHandler = this.onWindowResize.bind(this);
    this.elements.$window.on({
      scroll: this.scrollHandler,
      resize: this.resizeHandler
    });
  }
  unbindEvents() {
    this.elements.$window.off('scroll', this.scrollHandler).off('resize', this.resizeHandler);
  }
  onWindowScroll() {
    this.checkPosition();
  }
  onWindowResize() {
    if (!this.isSticky) {
      return;
    }
    this.unstickElement();
    this.stickElement();
    if (this.settings.parent) {
      // Force recalculation of the relation between the element and its parent
      this.isFollowingParent = false;
      this.checkParent();
    }
  }
  destroy() {
    if (this.isSticky) {
      this.unstick();
    }
    this.unbindEvents();
    this.$element.removeClass(this.settings.classes.sticky);
  }
}
var _default = exports.default = StickyScript;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _module = _interopRequireDefault(require("./module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PaginationModule = _module.default.extend({
  $clickedItem: null,
  getDefaultSettings() {
    return {
      classes: {
        fetching: 'raven-pagination-fetching',
        disabled: 'raven-pagination-disabled',
        reading: 'raven-pagination-reading',
        spinner: 'raven-pagination-spinner',
        activePage: 'raven-pagination-active',
        item: 'raven-pagination-item',
        pageNum: 'raven-pagination-num',
        prevButton: 'raven-pagination-prev',
        nextButton: 'raven-pagination-next'
      },
      selectors: {
        activePage: '.raven-pagination-active',
        pageNum: '.raven-pagination-num',
        prevButton: '.raven-pagination-prev',
        nextButton: '.raven-pagination-next',
        spinner: '.raven-pagination-spinner'
      },
      isEnabled: true,
      activePage: 1,
      totalPages: this.getElementSettings('total_pages'),
      pagesVisible: this.getElementSettings('pages_visible')
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $prevButton: this.$element.find(selectors.prevButton),
      $nextButton: this.$element.find(selectors.nextButton)
    };
  },
  bindEvents() {
    const self = this;
    this.$element.on('click', this.getSettings('selectors.pageNum'), this.handlePageNum);
    self.elements.$prevButton.on('click', this.handlePrev);
    self.elements.$nextButton.on('click', this.handleNext);
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
  },
  getTotalPages() {
    return parseInt(this.getSettings('totalPages'));
  },
  setTotalPages(totalPages) {
    this.setSettings('totalPages', parseInt(totalPages));
  },
  getPagesVisible() {
    return parseInt(this.getSettings('pagesVisible'));
  },
  getActivePage() {
    return parseInt(this.getSettings('activePage'));
  },
  setActivePage(pageNum) {
    this.setSettings('activePage', parseInt(pageNum));
  },
  setEnabled(isEnabled) {
    this.setSettings('isEnabled', isEnabled);
  },
  isEnabled() {
    return this.getSettings('isEnabled');
  },
  recreatePagination(totalPages, activePage = 1) {
    this.setTotalPages(totalPages);
    this.setActivePage(activePage);
    this.renderUpdate();
  },
  renderUpdate() {
    const classes = this.getSettings('classes');
    const selectors = this.getSettings('selectors');
    this.$element.removeClass(classes.fetching);
    if (this.$clickedItem) {
      this.$clickedItem.find(selectors.spinner).remove();
      this.$clickedItem.removeClass(classes.reading);
      this.$clickedItem = null;
    }
    this.setEnabled(true);
    this.renderNumbers();
    this.updatePrevNext();
  },
  renderNumbers() {
    const pages = this.getPages();
    if (!pages.length) {
      return;
    }
    const selectors = this.getSettings('selectors');
    const items = [];
    pages.forEach(pageNum => {
      items.push(this.numberTemplate(pageNum));
    });
    this.$element.find(selectors.pageNum).remove();
    this.elements.$prevButton.after(items);
  },
  numberTemplate(pageNum) {
    const classes = this.getSettings('classes');
    const item = $('<a></a>');
    item.addClass(classes.pageNum);
    item.addClass(classes.item);
    item.toggleClass(classes.activePage, pageNum === this.getActivePage());
    item.attr('href', '#');
    item.attr('data-page-num', pageNum);
    item.html(pageNum);
    return item;
  },
  updateActivePage(pageNum) {
    const classes = this.getSettings('classes');
    this.$element.addClass(classes.fetching);
    if (this.$clickedItem) {
      this.$clickedItem.addClass(classes.reading);
      this.$clickedItem.append(`<span class="${classes.spinner}"></span>`);
    }
    this.setEnabled(false);
    this.setActivePage(pageNum);
  },
  updatePrevNext() {
    const pages = this.getPages();
    if (!pages.length) {
      return;
    }
    const classes = this.getSettings('classes');
    const activePage = this.getActivePage();
    const totalPages = this.getTotalPages();
    this.elements.$prevButton.toggleClass(classes.disabled, activePage <= 1);
    this.elements.$nextButton.toggleClass(classes.disabled, activePage >= totalPages);
  },
  handlePageNum(event) {
    event.preventDefault();
    const $this = $(event.target);
    const pageNum = parseInt($this.data('page-num'));
    if (this.getActivePage() !== pageNum) {
      this.triggerPagination($this, pageNum);
    }
  },
  handlePrev(event) {
    event.preventDefault();
    const classes = this.getSettings('classes');
    const $this = $(event.target);
    const pageNum = this.getActivePage() - 1;
    if (pageNum >= 1 && !$this.hasClass(classes.disabled)) {
      this.triggerPagination($this, pageNum);
    }
  },
  handleNext(event) {
    event.preventDefault();
    const classes = this.getSettings('classes');
    const $this = $(event.target);
    const totalPages = this.getTotalPages();
    const pageNum = this.getActivePage() + 1;
    if (pageNum <= totalPages && !$this.hasClass(classes.disabled)) {
      this.triggerPagination($this, pageNum);
    }
  },
  triggerPagination($element, pageNum) {
    if (this.isEnabled()) {
      this.$clickedItem = $element;
      this.updateActivePage(pageNum);
      this.handlePagination(pageNum);
    }
  },
  getPages() {
    const activePage = this.getActivePage();
    const pagesVisible = this.getPagesVisible();
    const totalPages = this.getTotalPages();
    const pages = [];
    const half = Math.floor(pagesVisible / 2);
    let start = activePage - half;
    let end = activePage + half;
    if (start <= 0) {
      start = 1;
      end = pagesVisible;
    }
    if (end > totalPages) {
      end = totalPages;
    }
    let i = start;
    while (i <= end) {
      pages.push(i);
      i++;
    }
    return pages;
  },
  handlePagination() {
    this.renderUpdate();
  }
});
var _default = exports.default = PaginationModule;

},{"./module":9}],21:[function(require,module,exports){
// Jupiter X Raven bundle: smoothscroll polyfill (see gulp/webpack build).
// https://iamdustan.github.io/smoothscroll
/* eslint-disable */
'use strict';

// polyfill
function polyfill() {
  // aliases
  var w = window;
  var d = document;

  // return if scroll behavior is supported and polyfill is not forced
  if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
    return;
  }

  // globals
  var Element = w.HTMLElement || w.Element;
  var SCROLL_TIME = 468;

  // object gathering original scroll methods
  var original = {
    scroll: w.scroll || w.scrollTo,
    scrollBy: w.scrollBy,
    elementScroll: Element.prototype.scroll || scrollElement,
    scrollIntoView: Element.prototype.scrollIntoView
  };

  // define timing method
  var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

  /**
   * indicates if a the current browser is made by Microsoft
   * @method isMicrosoftBrowser
   * @param {String} userAgent
   * @returns {Boolean}
   */
  function isMicrosoftBrowser(userAgent) {
    var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];
    return new RegExp(userAgentPatterns.join('|')).test(userAgent);
  }

  /*
   * IE has rounding bug rounding down clientHeight and clientWidth and
   * rounding up scrollHeight and scrollWidth causing false positives
   * on hasScrollableSpace
   */
  var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

  /**
   * changes scroll position inside an element
   * @method scrollElement
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function scrollElement(x, y) {
    this.scrollLeft = x;
    this.scrollTop = y;
  }

  /**
   * returns result of applying ease math function to a number
   * @method ease
   * @param {Number} k
   * @returns {Number}
   */
  function ease(k) {
    return 0.5 * (1 - Math.cos(Math.PI * k));
  }

  /**
   * indicates if a smooth behavior should be applied
   * @method shouldBailOut
   * @param {Number|Object} firstArg
   * @returns {Boolean}
   */
  function shouldBailOut(firstArg) {
    if (firstArg === null || typeof firstArg !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
      // first argument is not an object/null
      // or behavior is auto, instant or undefined
      return true;
    }
    if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
      // first argument is an object and behavior is smooth
      return false;
    }

    // throw error when behavior is not supported
    throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
  }

  /**
   * indicates if an element has scrollable space in the provided axis
   * @method hasScrollableSpace
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function hasScrollableSpace(el, axis) {
    if (axis === 'Y') {
      return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
    }
    if (axis === 'X') {
      return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
    }
  }

  /**
   * indicates if an element has a scrollable overflow property in the axis
   * @method canOverflow
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function canOverflow(el, axis) {
    var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];
    return overflowValue === 'auto' || overflowValue === 'scroll';
  }

  /**
   * indicates if an element can be scrolled in either axis
   * @method isScrollable
   * @param {Node} el
   * @param {String} axis
   * @returns {Boolean}
   */
  function isScrollable(el) {
    var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
    var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');
    return isScrollableY || isScrollableX;
  }

  /**
   * finds scrollable parent of an element
   * @method findScrollableParent
   * @param {Node} el
   * @returns {Node} el
   */
  function findScrollableParent(el) {
    var isBody;
    do {
      el = el.parentNode;
      isBody = el === d.body;
    } while (isBody === false && isScrollable(el) === false);
    isBody = null;
    return el;
  }

  /**
   * self invoked function that, given a context, steps through scrolling
   * @method step
   * @param {Object} context
   * @returns {undefined}
   */
  function step(context) {
    var time = now();
    var value;
    var currentX;
    var currentY;
    var elapsed = (time - context.startTime) / SCROLL_TIME;

    // avoid elapsed times higher than one
    elapsed = elapsed > 1 ? 1 : elapsed;

    // apply easing to elapsed time
    value = ease(elapsed);
    currentX = context.startX + (context.x - context.startX) * value;
    currentY = context.startY + (context.y - context.startY) * value;
    context.method.call(context.scrollable, currentX, currentY);

    // scroll more if we have not reached our destination
    if (currentX !== context.x || currentY !== context.y) {
      w.requestAnimationFrame(step.bind(w, context));
    }
  }

  /**
   * scrolls window or element with a smooth behavior
   * @method smoothScroll
   * @param {Object|Node} el
   * @param {Number} x
   * @param {Number} y
   * @returns {undefined}
   */
  function smoothScroll(el, x, y) {
    var scrollable;
    var startX;
    var startY;
    var method;
    var startTime = now();

    // define scroll context
    if (el === d.body) {
      scrollable = w;
      startX = w.scrollX || w.pageXOffset;
      startY = w.scrollY || w.pageYOffset;
      method = original.scroll;
    } else {
      scrollable = el;
      startX = el.scrollLeft;
      startY = el.scrollTop;
      method = scrollElement;
    }

    // scroll looping over a frame
    step({
      scrollable: scrollable,
      method: method,
      startTime: startTime,
      startX: startX,
      startY: startY,
      x: x,
      y: y
    });
  }

  // ORIGINAL METHODS OVERRIDES
  // w.scroll and w.scrollTo
  w.scroll = w.scrollTo = function () {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset,
      // use top prop, second argument if present or fallback to scrollY
      arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);
      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
  };

  // w.scrollBy
  w.scrollBy = function () {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0])) {
      original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);
      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
  };

  // Element.prototype.scroll and Element.prototype.scrollTo
  Element.prototype.scroll = Element.prototype.scrollTo = function () {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      // if one number is passed, throw error to match Firefox implementation
      if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
        throw new SyntaxError('Value could not be converted');
      }
      original.elementScroll.call(this,
      // use left prop, first number argument or fallback to scrollLeft
      arguments[0].left !== undefined ? ~~arguments[0].left : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
      // use top prop, second argument or fallback to scrollTop
      arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);
      return;
    }
    var left = arguments[0].left;
    var top = arguments[0].top;

    // LET THE SMOOTHNESS BEGIN!
    smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
  };

  // Element.prototype.scrollBy
  Element.prototype.scrollBy = function () {
    // avoid action when no arguments are passed
    if (arguments[0] === undefined) {
      return;
    }

    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
      return;
    }
    this.scroll({
      left: ~~arguments[0].left + this.scrollLeft,
      top: ~~arguments[0].top + this.scrollTop,
      behavior: arguments[0].behavior
    });
  };

  // Element.prototype.scrollIntoView
  Element.prototype.scrollIntoView = function () {
    // avoid smooth behavior if not required
    if (shouldBailOut(arguments[0]) === true) {
      original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
      return;
    }

    // LET THE SMOOTHNESS BEGIN!
    var scrollableParent = findScrollableParent(this);
    var parentRects = scrollableParent.getBoundingClientRect();
    var clientRects = this.getBoundingClientRect();
    if (scrollableParent !== d.body) {
      // reveal element inside parent
      smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top);

      // reveal parent in viewport unless is fixed
      if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
        w.scrollBy({
          left: parentRects.left,
          top: parentRects.top,
          behavior: 'smooth'
        });
      }
    } else {
      // reveal element in viewport
      w.scrollBy({
        left: clientRects.left,
        top: clientRects.top,
        behavior: 'smooth'
      });
    }
  };
}
if (typeof exports === 'object' && typeof module !== 'undefined') {
  // commonjs
  module.exports = {
    polyfill: polyfill
  };
  polyfill();
} else {
  // global
  polyfill();
}
; /* jupiterx-core fingerprint: not a core verbatim copy */

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _module = _interopRequireDefault(require("./module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SortableModule = _module.default.extend({
  $clickedItem: null,
  getDefaultSettings() {
    return {
      classes: {
        fetching: 'raven-sortable-fetching',
        reading: 'raven-sortable-reading',
        spinner: 'raven-sortable-spinner',
        activeItem: 'raven-sortable-active'
      },
      selectors: {
        item: '.raven-sortable-item',
        activeItem: '.raven-sortable-active',
        spinner: '.raven-sortable-spinner'
      },
      activeID: -1,
      isEnabled: true
    };
  },
  getDefaultElements() {
    return {};
  },
  bindEvents() {
    this.$element.on('click', this.getSettings('selectors.item'), this.handleItemClick);
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
  },
  getActiveID() {
    return parseInt(this.getSettings('activeID'));
  },
  setActiveID(activeID) {
    this.setSettings('activeID', parseInt(activeID));
  },
  setEnabled(isEnabled) {
    this.setSettings('isEnabled', isEnabled);
  },
  isEnabled() {
    return this.getSettings('isEnabled');
  },
  renderUpdate() {
    const classes = this.getSettings('classes');
    const selectors = this.getSettings('selectors');
    this.$element.removeClass(classes.fetching);
    this.$element.find(selectors.activeItem).removeClass(classes.activeItem);
    if (this.$clickedItem) {
      this.$clickedItem.find(selectors.spinner).remove();
      this.$clickedItem.removeClass(classes.reading);
      this.$clickedItem.addClass(classes.activeItem);
      this.$clickedItem = null;
    }
    this.setEnabled(true);
  },
  updateActiveItem(category) {
    const classes = this.getSettings('classes');
    this.$element.addClass(classes.fetching);
    if (this.$clickedItem) {
      this.$clickedItem.addClass(classes.reading);
      this.$clickedItem.append(`<span class="${classes.spinner}"></span>`);
    }
    this.setEnabled(false);
    this.setActiveID(category);
  },
  handleItemClick(event) {
    event.preventDefault();
    const $this = $(event.target);
    const category = parseInt($this.data('category'));
    const activeCategory = this.getActiveID();
    const urlAnalyze = this.urlAnalyze();
    if (activeCategory !== category) {
      this.triggerSort($this, category);
    }
    if (activeCategory === -1 && urlAnalyze.category && urlAnalyze.category !== -1) {
      this.triggerSort($this, category);
    }
  },
  triggerSort($element, category) {
    if (this.isEnabled()) {
      this.$clickedItem = $element;
      this.updateActiveItem(category);
      this.handleSort(category);
    }
  },
  handleSort() {
    this.renderUpdate();
  },
  urlAnalyze() {
    const url = new URL(window.location.href);
    if ('1' !== url.searchParams.get('jupiterx_filters')) {
      return false;
    }
    return {
      paged: url.searchParams.get('jupiterx_page') ? Number(url.searchParams.get('jupiterx_page')) : 1,
      category: url.searchParams.get('category') ? Number(url.searchParams.get('category')) : -1
    };
  }
});
var _default = exports.default = SortableModule;

},{"./module":9}],23:[function(require,module,exports){
"use strict";

var _tippy = _interopRequireDefault(require("tippy.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const JupiterTooltip = {
  widgetEditorSettings: widgetId => {
    let editorElements = null,
      widgetData = {};
    if (!window.elementor.hasOwnProperty('elements')) {
      return false;
    }
    editorElements = window.elementor.elements;
    if (!editorElements.models) {
      return false;
    }
    let isContainer = false;
    $.each(editorElements.models, function (indexLevelOne, objLevelOne) {
      if (objLevelOne.attributes.elType === 'container') {
        isContainer = true;
      }
      $.each(objLevelOne.attributes.elements.models, function (indexLevelTwo, objLevelTwo) {
        $.each(objLevelTwo.attributes.elements.models, function (index, obj) {
          if (widgetId === obj.id) {
            widgetData = obj.attributes.settings.attributes;
          }
        });
      });
    });
    if (isContainer) {
      $.each(editorElements.models, function (indexLevelOne, objLevelOne) {
        $.each(objLevelOne.attributes.elements.models, function (index, obj) {
          if (widgetId === obj.id) {
            widgetData = obj.attributes.settings.attributes;
          }
        });
      });
    }
    return {
      tooltip: widgetData.jupiter_widget_tooltip || 'false',
      tooltipDescription: widgetData.jupiter_widget_tooltip_description || 'Lorem Ipsum',
      tooltipPlacement: widgetData.jupiter_widget_tooltip_placement || 'top',
      tooltipArrow: 'yes' === widgetData.jupiter_widget_tooltip_arrow,
      xOffset: widgetData.jupiter_widget_tooltip_x_offset || 0,
      yOffset: widgetData.jupiter_widget_tooltip_y_offset || 0,
      tooltipAnimation: widgetData.jupiter_widget_tooltip_animation || 'shift-toward',
      tooltipTrigger: widgetData.jupiter_widget_tooltip_trigger || 'mouseenter',
      customSelector: widgetData.jupiter_widget_tooltip_custom_selector || '',
      zIndex: widgetData.jupiter_widget_tooltip_z_index || '999',
      delay: widgetData.jupiter_widget_tooltip_delay || '0',
      triggerTarget: $(widgetData.jupiter_widget_tooltip_custom_selector)
    };
  },
  // Object literal method — not constructible; do not call with `new`.
  jupiterTooltipInstance($scope) {
    const widgetId = $scope.data('id'),
      widgetSelector = $scope[0],
      editMode = Boolean(elementorFrontend.isEditMode());
    const tooltipSelector = widgetSelector;
    let settings = {},
      customSelector = [];

    // Compatibility with jet tooltip.
    if ($(widgetSelector).hasClass('jet-tooltip-widget')) {
      return;
    }
    if (!editMode) {
      settings = $scope.data('jupiter-tooltip-settings');
    } else {
      settings = JupiterTooltip.widgetEditorSettings(widgetId);
    }
    if (widgetSelector._tippy) {
      widgetSelector._tippy.destroy();
    }
    if (!settings) {
      return false;
    }
    if ('undefined' === typeof settings) {
      return false;
    }
    if ('true' !== settings.tooltip || 'undefined' === typeof settings.tooltip || '' === settings.tooltipDescription) {
      return false;
    }
    $scope.addClass('jupiter-tooltip-widget');
    if (settings.customSelector) {
      customSelector = $(settings.customSelector);
    }
    if (editMode && !$('#jupiter-tooltip-content-' + widgetId)[0]) {
      const template = $('<div>', {
        id: 'jupiter-tooltip-content-' + widgetId,
        class: 'jupiter-tooltip-widget__content'
      });
      template.html(settings.tooltipDescription);
      $scope.append(template);
    }
    (0, _tippy.default)([tooltipSelector], {
      content: $scope.find('.jupiter-tooltip-widget__content')[0]?.innerHTML,
      allowHTML: true,
      appendTo: widgetSelector,
      arrow: !!settings.tooltipArrow,
      placement: settings.tooltipPlacement,
      offset: [settings.xOffset, settings.yOffset],
      animation: settings.tooltipAnimation,
      trigger: settings.tooltipTrigger,
      triggerTarget: customSelector.length > 0 ? [...customSelector] : null,
      interactive: true,
      zIndex: settings.zIndex,
      maxWidth: 'none',
      delay: settings.delay.size ? settings.delay.size : 0,
      popperOptions: {
        strategy: 'fixed'
      },
      onMount(instance) {
        const tippyBottomArrow = $('#tippy-' + instance.id + ' .tippy-box[data-placement^=top]>.tippy-arrow');
        const tippyTopArrow = $('#tippy-' + instance.id + ' .tippy-box[data-placement^=bottom]>.tippy-arrow');
        const tippyRightArrow = $('#tippy-' + instance.id + ' .tippy-box[data-placement^=left]>.tippy-arrow');
        const tippyLeftArrow = $('#tippy-' + instance.id + ' .tippy-box[data-placement^=right]>.tippy-arrow');
        const tippyBox = $('#tippy-' + instance.id + ' .tippy-box');
        switch (settings.tooltipPlacement) {
          case 'top-start':
          case 'top':
          case 'top-end':
            tippyBottomArrow.css('bottom', '-' + tippyBox.css('border-bottom-width'));
            break;
          case 'right-start':
          case 'right':
          case 'right-end':
            tippyLeftArrow.css('left', '-' + tippyBox.css('border-left-width'));
            break;
          case 'bottom-start':
          case 'bottom':
          case 'bottom-end':
            tippyTopArrow.css('top', '-' + tippyBox.css('border-top-width'));
            break;
          case 'left-start':
          case 'left':
          case 'left-end':
            tippyRightArrow.css('right', '-' + tippyBox.css('border-right-width'));
            break;
        }
      }
    });
    if (editMode && widgetSelector._tippy) {
      widgetSelector._tippy.show();
    }
  }
};
elementorFrontend.hooks.addAction('frontend/element_ready/widget', function ($scope) {
  JupiterTooltip.jupiterTooltipInstance($scope);
});

},{"tippy.js":112}],24:[function(require,module,exports){
const WrapperLink = {
  // Object literal methods are not constructible; call without `new` (see MDN method definitions).
  RavenWrapperLinkInstance($scope) {
    if ($scope.data('raven-element-link')) {
      $scope.on('click.onWrapperLink', () => {
        const data = $scope.data('raven-element-link'),
          id = $scope.data('id'),
          anchor = document.createElement('a');
        if (!/^https?:\/\//i.test(data.url)) {
          data.url = 'http://' + data.url;
        }
        anchor.id = 'raven-wrapper-link-' + id;
        anchor.href = data.url;
        anchor.target = data.is_external ? '_blank' : '_self';
        anchor.rel = data.nofollow ? 'nofollow noreferer' : '';
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        const anchorReal = document.getElementById(anchor.id);
        anchorReal.click();
        const timeout = setTimeout(() => {
          document.body.removeChild(anchorReal);
          clearTimeout(timeout);
        });
      });
    }
  }
};
elementorFrontend.hooks.addAction('frontend/element_ready/global', function ($scope) {
  WrapperLink.RavenWrapperLinkInstance($scope);
});

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
$ = jQuery;
const AddToCart = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        wrapper: '.raven-product-add-to-cart',
        cartForm: 'form.cart',
        tableBody: 'tbody',
        singleVariationWrapper: '.single_variation_wrap',
        variationFormHolder: '.raven-variations-form-holder',
        qty: '.quantity > div',
        plusMinus: '.plus-minus-btn',
        qtyInput: '.quantity .raven-qty-button-holder-inner input[type=number]',
        qtyInputText: '.quantity input[type=text]',
        formResetButton: '.artbees-was-reset-options'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $wrapper: this.$element.find(selectors.wrapper),
      $cartForm: this.$element.find(selectors.cartForm),
      $tableBody: this.$element.find(selectors.tableBody),
      $singleVariationWrapper: this.$element.find(selectors.singleVariationWrapper),
      $variationFormHolder: this.$element.find(selectors.variationFormHolder),
      $qty: this.$element.find(selectors.qty),
      $plusMinus: this.$element.find(selectors.plusMinus),
      $qtyInput: this.$element.find(selectors.qtyInput),
      $qtyInputText: this.$element.find(selectors.qtyInputText),
      $formResetButton: this.$element.find(selectors.formResetButton)
    };
  },
  bindEvents() {
    this.detectSellKitSwatch();
    this.detectPlusMinus();
    this.detectInputFocused();
    this.removeInputSpinner();
    this.moveResetButtonToTableBody();
    this.onResetClearButton();
    this.addDummyPriceToEditor();
    if (this.$element.find('.sellkit-pro-deactive').length > 0) {
      this.fixResetButtonIcon();
    }
  },
  detectSellKitSwatch() {
    if (this.isElementorEditor()) {
      // eslint-disable-next-line no-undef
      const swatchesEvents = new CustomEvent('sellkitpro:swatches');
      document.dispatchEvent(swatchesEvents);
    }
  },
  detectPlusMinus() {
    this.elements.$plusMinus.on('click', event => {
      const $target = $(event.currentTarget);
      const qty = $target.closest('form.cart').find('.qty');
      const max = parseFloat(qty.attr('max'));
      const min = parseFloat(qty.attr('min'));
      const step = parseFloat(qty.attr('step'));
      let val = parseFloat(qty.val());
      if (this.elements.$wrapper.hasClass('raven-product-grouped') && isNaN(val)) {
        val = 0;
      }
      if ($target.is('.plus')) {
        if (max && max <= val) {
          qty.val(max);
        } else {
          qty.val(val + step);
        }
      } else if ($target.is('.minus')) {
        if (min && min >= val) {
          qty.val(min);
        } else if (val > 1) {
          qty.val(val - step);
        }
      }
    });
  },
  detectInputFocused() {
    this.elements.$qtyInput.on('focus', event => {
      const $target = $(event.currentTarget);
      const $btnHolder = $target.closest('.raven-qty-button-holder-inner');
      $btnHolder.addClass('focused');
    });
    this.elements.$qtyInput.on('focusout', event => {
      const $target = $(event.currentTarget);
      const $btnHolder = $target.closest('.raven-qty-button-holder-inner');
      $btnHolder.removeClass('focused');
    });
  },
  removeInputSpinner() {
    this.elements.$qty.removeClass('input-group');
    this.elements.$qty.removeClass('qty');
    this.elements.$qty.find('.input-group-prepend').remove();
    this.elements.$qty.find('.input-group-append').remove();
    this.elements.$qtyInputText.attr('type', 'number');
  },
  moveResetButtonToTableBody() {
    const resetButton = this.elements.$formResetButton;
    this.elements.$formResetButton.remove();
    this.elements.$tableBody.append(resetButton);
  },
  onResetClearButton() {
    if (this.elements.$formResetButton.length === 0) {
      return;
    }
    this.elements.$formResetButton[0].addEventListener('click', () => {
      const $swatches = document.getElementsByClassName('artbees-was-content');
      if (!$swatches) {
        return;
      }
      Object.entries($swatches).forEach(swatch => {
        swatch[1].classList.remove('selected-attribute');
      });
    });
  },
  addDummyPriceToEditor() {
    if (this.isVariableProduct()) {
      $('form.variations_form.cart').wc_variation_form();
    }
    if (!this.isElementorEditor() || !this.isVariableProduct() || this.hasDefaultAttributes()) {
      return;
    }
    let price = '';
    if (this.elements.$wrapper.data('price')) {
      price = parseFloat(this.elements.$wrapper.data('price')).toFixed(2);
    }
    if (!price) {
      price = 20.00;
    }
    const dummyPriceHTML = '<div class="raven-dummy-price woocommerce-variation-price"><span class="price"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">$</span>' + price + '</bdi></span></span></div>';
    this.elements.$singleVariationWrapper.prepend(dummyPriceHTML);
    this.elements.$variationFormHolder.change(() => {
      this.$element.find('.raven-dummy-price').hide();
    });
  },
  fixResetButtonIcon() {
    // Get the clear text link.
    const clearLink = this.$element.find('#jupiterx-clear-variable-button-single-page');

    // Get the text content.
    const clearText = clearLink.text();

    // Wrap the clear text with a span tag.
    clearLink.wrapInner('<span>');

    // Add an i tag before the span tag.
    clearLink.find('span').before('<i class="fa fa-refresh"></i>');

    // Set the text content back.
    clearLink.find('span').text(clearText);
  },
  isElementorEditor() {
    return document.body.classList.contains('elementor-editor-active');
  },
  isVariableProduct() {
    if (this.elements.$cartForm.length === 0) {
      return;
    }
    return this.elements.$cartForm[0].classList.contains('variations_form');
  },
  hasDefaultAttributes() {
    if (this.$element.find('.has-default-attributes').length === 0) {
      return false;
    }
    return true;
  }
});
function _default($scope) {
  new AddToCart({
    $element: $scope
  });
}

},{"../utils/module":9}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const AdvancedAccordion = _module.default.extend({
  onInit() {
    this.accordionOnClick();
  },
  accordionOnClick() {
    let collapsible = false;
    const settings = this.getElementSettings(),
      self = this;
    if (settings.collapsible && 'yes' === settings.collapsible) {
      collapsible = true;
    }
    $('.jx-single-accordion-header').off().on('click', function () {
      const parent = $(this).parents('.jupiterx-single-advanced-accordion-wrapper'),
        body = parent.find('.jx-single-accordion-body'),
        display = body.css('display'),
        items = $(this).parents('.jupiterx-advanced-accordion-wrapper').find('.jx-single-accordion-body');
      let closed;
      if ('' === display || 'none' === display) {
        if (collapsible) {
          items.slideUp('fast').addClass('jx-ac-body-none').removeClass('jx-ac-body-block').parent().addClass('jx-ac-inactive').removeClass('jx-ac-active');
        }
        body.slideDown('fast');
        parent.addClass('jx-ac-active').removeClass('jx-ac-inactive');
        closed = false;
      }
      if ('block' === display && !collapsible) {
        body.slideUp('fast');
        parent.addClass('jx-ac-inactive').removeClass('jx-ac-active');
        closed = true;
      }
      if (!closed) {
        self.handleScrollToContent(body);
      }
      if (!parent.hasClass('jx-ac-last')) {
        return;
      }
      if (closed) {
        parent.find('.jx-single-accordion-header').removeClass('border-not-radius');
      }
      if (!closed) {
        parent.find('.jx-single-accordion-header').addClass('border-not-radius');
        parent.find('.jx-single-accordion-body').addClass('border-is-radius');
      }
    });
  },
  handleScrollToContent(selectedItem) {
    if (this.getElementSettings('scroll_to_content') !== 'yes') {
      return;
    }
    let adminBarHeight = 0;
    if ($('#wpadminbar').length > 0) {
      adminBarHeight = $('#wpadminbar').height();
    }
    const delay = this.getElementSettings('scrolling_delay'),
      offset = this.getElementSettings('content_offset');
    setTimeout(() => {
      $('html, body').animate({
        scrollTop: selectedItem.offset().top - offset.size - adminBarHeight
      }, delay);
    }, 200);
  }
});
function _default($scope) {
  new AdvancedAccordion({
    $element: $scope
  });
}

},{"../utils/module":9}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const AdvancedNavMenu = _module.default.extend({
  mainLayout: null,
  mobileLayout: null,
  isRtl: false,
  widgetParents: {},
  getDefaultSettings() {
    return {
      selectors: {
        menus: 'ul.raven-adnav-menu',
        mainNav: 'nav.raven-adnav-menu-main',
        mainMenu: 'nav.raven-adnav-menu-main ul.raven-adnav-menu',
        mobileNav: 'nav.raven-adnav-menu-mobile',
        mobileMenu: 'nav.raven-adnav-menu-mobile ul.raven-adnav-menu',
        inPageMenuItems: 'a[href*="#"]',
        toggleButton: '.raven-adnav-menu-toggle-button',
        closeButton: '.raven-adnav-menu-close-button',
        rootListItems: 'ul.raven-adnav-menu > li',
        submenuLinks: 'ul.raven-adnav-menu .submenu a'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $body: $('body'),
      $menus: this.$element.find(selectors.menus),
      $mainNav: this.$element.find(selectors.mainNav),
      $mainMenu: this.$element.find(selectors.mainMenu),
      $mobileNav: this.$element.find(selectors.mobileNav),
      $mobileMenu: this.$element.find(selectors.mobileMenu),
      $inPageMenuItems: this.$element.find(selectors.inPageMenuItems),
      $toggleButton: this.$element.find(selectors.toggleButton),
      $closeButton: this.$element.find(selectors.closeButton),
      $rootListItems: this.$element.find(selectors.rootListItems),
      $submenuLinks: this.$element.find(selectors.submenuLinks),
      $elementorElement: this.$element.closest('.elementor-element'),
      // $parentSegment is only for handling z-indices during side menus push/overlay effects.
      // Possible values: page's header\main\footer.
      $parentSegment: this.$element.parentsUntil('div.jupiterx-site').last()
    };
    return elements;
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.mainLayout = this.elements.$mainNav.attr('data-layout');
    this.mobileLayout = this.elements.$mobileNav.length ? this.elements.$mobileNav.attr('data-layout') : false;
    this.isRtl = $('body').hasClass('rtl');
    this.initWidth = window.orientation === 0 || window.screen.orientation.angle === 0 ? $(window).width() : $(window).height();

    // This editor check is placed to trigger "Submenu" section activation when the section is
    // already open, but the widget rerenders without firing of 'section:activated' event.
    if (this.isEdit && 'section_submenu' === elementor.panel.currentView.currentPageView.activeSection) {
      this.onSectionActivated('section_submenu');
    }

    // Reset styles of push effects.
    this.deactivateMenu();
    $(window).off('resize', this.deactivateMenu.bind(this)).on('resize', this.deactivateMenu.bind(this));
    this.widgetParents = {
      widget: this.$element,
      column: this.getParentColumn(),
      section: this.getParentSection(),
      container: this.getParentContainer()
    };
    this.initMainSmartMenu();
    this.initMobileSmartMenu();
    this.updateActiveListItems();
    this.inPageMenuClick();
    this.mobileMenuScroll();
    this.handleLinksOnSubmenu();
    this.bindEmptyHrefGuard();
  },
  bindEvents() {
    // Main menu events.
    const mainLayout = this.elements.$mainNav.attr('data-layout');
    if ('dropdown' === mainLayout) {
      this.elements.$toggleButton.on('click', this.toggleDropdown.bind(this));
    }
    if ('offcanvas' === mainLayout) {
      this.elements.$toggleButton.on('click', this.toggleMenu.bind(this));
      this.elements.$closeButton.on('click', this.toggleMenu.bind(this));
      this.elements.$menus.on('select.smapi', this.onSideMenuItemClick.bind(this));
      const effect = this.getElementSettings('offcanvas_appear_effect');
      this.elements.$body.addClass(`raven-adnav-menu-effect-${effect}`);
      this.elements.$toggleButton.on('click', this.doSideMenuEffects.bind(this));
      this.elements.$closeButton.on('click', this.doSideMenuEffects.bind(this));
    }

    // Mobile menu events
    const mobileLayout = this.elements.$mobileNav.attr('data-layout');
    if ('dropdown' === mobileLayout) {
      this.elements.$toggleButton.on('click', this.toggleDropdown.bind(this));
      return;
    }
    if ('side' === mobileLayout) {
      this.elements.$toggleButton.on('click', this.toggleMenu.bind(this));
      this.elements.$closeButton.on('click', this.toggleMenu.bind(this));
      this.elements.$menus.on('select.smapi', this.onSideMenuItemClick.bind(this));
      const effect = this.getElementSettings('side_menu_effect');
      this.elements.$body.addClass(`raven-adnav-menu-effect-${effect}`);
      this.elements.$toggleButton.on('click', this.doSideMenuEffects.bind(this));
      this.elements.$closeButton.on('click', this.doSideMenuEffects.bind(this));
      return;
    }
    if ('full-screen' === mobileLayout) {
      this.elements.$toggleButton.on('click', this.toggleMenu.bind(this));
      this.elements.$closeButton.on('click', this.toggleMenu.bind(this));
    }

    // Ensure only the currently opened submenu arrow rotates on mobile by toggling a dedicated class.
    // Hook into SmartMenus show/hide events to mark the parent link of the submenu.
    this.elements.$menus.on('show.smapi', (event, submenu) => {
      const $sub = $(submenu);
      const $parentLink = $sub.dataSM ? $sub.dataSM('parent-a') : null;
      if ($parentLink && $parentLink.length) {
        $parentLink.addClass('submenu-opened');
        $parentLink.closest('li').addClass('submenu-opened');
      }
    });
    this.elements.$menus.on('hide.smapi', (event, submenu) => {
      const $sub = $(submenu);
      const $parentLink = $sub.dataSM ? $sub.dataSM('parent-a') : null;
      if ($parentLink && $parentLink.length) {
        $parentLink.removeClass('submenu-opened');
        $parentLink.closest('li').removeClass('submenu-opened');
      }
    });
  },
  initMainSmartMenu() {
    // Options common between all layout.
    let options = {
      subIndicators: false,
      rightToLeftSubMenus: this.isRtl
    };

    // eslint-disable-next-line no-undef
    const spaceBetween = getComputedStyle(this.$element[0]).getPropertyValue('--submenu-spacing') && this.$element?.css('--submenu-spacing') ? parseInt(this.$element?.css('--submenu-spacing')) : 0;

    // Options specific to Horizontal AND Vertical layouts.
    if ('horizontal' === this.mainLayout || 'vertical' === this.mainLayout) {
      const currentNav = this.elements.$elementorElement,
        overlayColor = this.getElementSettings('content_effect_content_overlay');
      if ($(currentNav[0]).parents('.jupiterx-header') !== 0 && overlayColor === 'enabled' && 'horizontal' === this.mainLayout) {
        if ($('.jupiterx-main').find('.jupiterx-advanced-nav-content-effect-enabled-overlay').length === 0) {
          $('.jupiterx-main').append('<div class="jupiterx-advanced-nav-content-effect-enabled-overlay"></div>');
        }
      }
      options = {
        ...options,
        hideTimeout: 300,
        // To prevent submenus from disappearing right upon mouseout event.
        hideFunction: $ul => {
          $ul.removeClass('submenu-shown');
          setTimeout(() => {
            $ul.css('display', 'none');
            if ('horizontal' === this.mainLayout) {
              this.handleContentEffectsBlur('remove');
              this.handleContentEffectsOverlay('remove');
            }
          }, 0);
        },
        showTimeout: 0,
        showFunction: $ul => {
          this.setSubmenuWidth($ul, spaceBetween);
          this.setSubmenuPosition($ul);
          $ul.css('display', 'block');
          if ('horizontal' === this.mainLayout) {
            const BlurContent = this.getElementSettings('content_effect_blur_content');
            if ($(currentNav[0]).parents('.jupiterx-header') !== 0 && (overlayColor === 'enabled' || BlurContent === 'enabled')) {
              if ($('.jupiterx-main').find('.jupiterx-advanced-nav-content-effect-enabled-overlay').length === 0) {
                $('.jupiterx-main').append('<div class="jupiterx-advanced-nav-content-effect-enabled-overlay"></div>');
              }
            }
            if (overlayColor === 'enabled' || BlurContent === 'enabled') {
              this.elements.$body[0].classList.add('jupiterx-advanced-nav-content-effect-enabled');
            }
          }
          setTimeout(() => {
            $ul.addClass('submenu-shown');
            if ('horizontal' === this.mainLayout) {
              this.handleContentEffectsBlur('add');
              this.handleContentEffectsOverlay('add');
            }
          });
        },
        showOnClick: 'click' === this.getElementSettings('submenu_trigger'),
        subMenusMinWidth: '0',
        subMenusMaxWidth: '110vw'
      };
    }

    // Options specific to Horizontal layout.
    if ('horizontal' === this.mainLayout) {
      options = {
        ...options,
        bottomToTopSubMenus: 'top' === this.getElementSettings('submenu_opening_position'),
        mainMenuSubOffsetY: spaceBetween
      };
    }

    // Vertical layout.
    if ('vertical' === this.mainLayout) {
      this.elements.$mainMenu.addClass('sm-vertical');
    }
    this.elements.$mainMenu.smartmenus(options);
  },
  handleContentEffectsOverlay(type) {
    const currentNav = this.elements.$elementorElement;
    if (!currentNav[0].classList.contains('raven-blur-content-overlay-enabled') || $(currentNav[0]).parents('.jupiterx-header').length === 0) {
      return;
    }
    const overlayColor = this.getElementSettings('content_effect_content_overlay');
    if ($(currentNav[0]).parents('.jupiterx-header') !== 0 && overlayColor === 'enabled') {
      this.elements.$body[0].classList.add('jupiterx-advanced-nav-overlay-enabled');
    }
    if (type === 'remove') {
      this.elements.$body[0].classList.remove('jupiterx-advanced-nav-overlay-enabled');
      $('.jupiterx-advanced-nav-content-effect-enabled-overlay').removeClass('jupiterx-advanced-nav-overlay-activated');
      return;
    }
    $('.jupiterx-advanced-nav-content-effect-enabled-overlay').addClass('jupiterx-advanced-nav-overlay-activated');
  },
  handleContentEffectsBlur(type) {
    const currentNav = this.elements.$elementorElement;
    if (!currentNav[0].classList.contains('raven-blur-content-enabled') || $(currentNav[0]).parents('.jupiterx-header').length === 0) {
      return;
    }
    const blurIntensity = this.getElementSettings('content_effect_blur_intensity')?.size || 5;
    if (type === 'remove') {
      $('.jupiterx-advanced-nav-content-effect-enabled-overlay').css('backdrop-filter', '');
      $('.jupiterx-advanced-nav-content-effect-enabled-overlay').removeClass('jupiterx-advanced-nav-overlay-activated');
      return;
    }
    $('.jupiterx-advanced-nav-content-effect-enabled-overlay').addClass('jupiterx-advanced-nav-overlay-activated');
    $('.jupiterx-advanced-nav-content-effect-enabled-overlay').css('backdrop-filter', `blur(${blurIntensity}px)`);
  },
  initMobileSmartMenu() {
    if (!this.elements.$mobileMenu.length) {
      return;
    }
    const options = {
      subIndicators: false,
      subMenusMaxWidth: '1500px',
      rightToLeftSubMenus: this.isRtl,
      // Prevent document-level click handler from closing all submenus when tapping
      // on a parent link; allows multiple submenus to remain open simultaneously.
      hideOnClick: false,
      // Enable showOnClick for mobile menu toggling
      showOnClick: true,
      // Must be `default`: `toggle` makes SmartMenus' itemClick hit the collapsible branch for
      // items without a submenu (`$sub`), which returns false and blocks all leaf link clicks.
      collapsibleBehavior: 'default'
    };
    this.elements.$mobileMenu.smartmenus(options);
  },
  toggleDropdown() {
    this.elements.$toggleButton.find('.hamburger').toggleClass('is-active');
    if ('dropdown' === this.mainLayout) {
      this.elements.$mainNav.slideToggle(250);
      return;
    }
    this.dropdownFullWidth();
    this.elements.$mobileNav.slideToggle(250);
    this.dropdownFullWidth();
  },
  dropdownFullWidth() {
    const mobileNav = this.elements.$mobileNav;
    if (this.getElementSettings('full_width') !== 'stretch') {
      return;
    }
    const navLeftToBodyDist = mobileNav[0]?.getBoundingClientRect().x;
    this.elements.$mobileNav.css('width', `${this.$element.closest('body')[0].getBoundingClientRect().width}px`).css('left', `${-navLeftToBodyDist}px`);
    const elementorElement = this.elements.$elementorElement;
    const mobileToggle = this.elements.$toggleButton;
    const offset = elementorElement.offset().top + elementorElement.outerHeight() - mobileToggle.offset().top;
    mobileNav.css('top', offset);
  },
  doSideMenuEffects() {
    const isOffCanvas = 'offcanvas' === this.mainLayout;
    const effect = this.getElementSettings(isOffCanvas ? 'offcanvas_appear_effect' : 'side_menu_effect');

    // If the effect is "Overlay".
    if ('overlay' === effect) {
      const overlayed = this.elements.$body.hasClass('raven-adnav-menu-effect-overlayed');
      if (!overlayed) {
        this.elements.$body.addClass('raven-adnav-menu-effect-overlayed');
        this.togglePrepareParentForPushEffect();
      } else {
        this.elements.$body.toggleClass('raven-adnav-menu-effect-overlayed');
        this.togglePrepareParentForPushEffect(false);
      }
      return;
    }

    // If the effect is "Push"
    const sideMenuOpenPosition = this.getElementSettings(isOffCanvas ? 'offcanvas_position' : 'side_menu_alignment');
    let width = parseInt(this.$element.css(isOffCanvas ? '--offcanvas-box-width' : '--menu-container-width')) || 250;
    if (sideMenuOpenPosition === 'right') {
      width = `-${width}px`;
    }
    const isPushed = this.elements.$body.hasClass('raven-adnav-menu-effect-pushed');
    if (!isPushed) {
      const marginProp = this.isRtl ? 'margin-right' : 'margin-left';
      this.elements.$body.addClass('raven-adnav-menu-effect-pushed').css(marginProp, width);
      this.togglePrepareParentForPushEffect();
      return;
    }
    this.elements.$body.removeClass('raven-adnav-menu-effect-pushed').removeAttr('style');
    this.togglePrepareParentForPushEffect(false);
  },
  togglePrepareParentForPushEffect(state = true) {
    if (state) {
      this.elements.$parentSegment.addClass('raven-adnav-menu-parent-segment').css('--adnav-menu-overlay-color', this.getElementSettings('offcanvas_overlay_color'));
      return;
    }
    this.elements.$parentSegment.removeClass('raven-adnav-menu-parent-segment');
  },
  toggleMenu() {
    const nav = 'offcanvas' === this.mainLayout ? this.elements.$mainNav : this.elements.$mobileNav;
    nav.toggleClass('raven-adnav-menu-active');
    if ('full-screen' === this.mobileLayout) {
      this.elements.$body.toggleClass('raven-adnav-menu-effect-overlayed');
    }
    if (nav.hasClass('raven-adnav-menu-active')) {
      nav.parents('.animated').addClass('raven-adnav-menu-parents-animation');
    } else {
      nav.parents('.animated').removeClass('raven-adnav-menu-parents-animation');
    }
    if (this.elements.$toggleButton.find('.hamburger').length !== 0) {
      this.elements.$toggleButton.find('.hamburger').toggleClass('is-active');
    }
  },
  mobileMenuScroll() {
    const overlays = document.querySelectorAll('.raven-adnav-menu-mobile.raven-adnav-menu-full-screen');
    let _clientY = null;
    for (let i = 0; i < overlays.length; i++) {
      overlays[i].addEventListener('touchstart', function (event) {
        if (event.targetTouches.length === 1) {
          _clientY = event.targetTouches[0].clientY;
        }
      }, {
        capture: false,
        passive: true
      });
      overlays[i].addEventListener('touchmove', function (event) {
        if (event.targetTouches.length === 1) {
          const clientY = event.targetTouches[0].clientY - _clientY;
          if (overlays[i].scrollTop === 0 && clientY > 0 && event.cancelable && $(event.target).parents('.raven-container').length === 0) {
            event.preventDefault();
          }
          if (overlays[i].scrollHeight - overlays[i].scrollTop <= overlays[i].clientHeight && clientY < 0 && event.cancelable && $(event.target).parents('.raven-container').length === 0) {
            event.preventDefault();
          }
        }
      }, {
        capture: false,
        passive: true
      });
    }
  },
  handleLinksOnSubmenu() {
    this.elements.$submenuLinks.on('click', event => {
      event.stopPropagation();
    });
  },
  bindEmptyHrefGuard() {
    const $mobileMenu = this.elements.$mobileMenu;
    if (!$mobileMenu.length) {
      return;
    }

    // Prevent placeholder-only parent anchors from navigating; submenu toggling is handled by SmartMenus.
    $mobileMenu.off('click.adnavGuard').on('click.adnavGuard', 'a.raven-menu-item.has-submenu', function (event) {
      const $link = $(event.currentTarget);
      const href = ($link.attr('href') || '').trim().toLowerCase();
      const isPlaceholder = href === '' || href === '#' || href === 'javascript:void(0)' || href === 'javascript:;';

      // Only block default navigation for placeholder parents so SmartMenus can toggle submenus.
      // Real URLs follow SmartMenus `collapsibleBehavior: default` (expand on first tap, navigate on second).
      if (isPlaceholder) {
        event.preventDefault();
      }
    });
  },
  /** Handle clicking on menu links that contian a hash ID to an element inside page */
  inPageMenuClick() {
    const self = this;
    this.elements.$inPageMenuItems.on('click', e => {
      const href = $(e.currentTarget).prop('href');
      let url = null;

      // URL interface throws error if constructed with incorrect URL.
      try {
        url = new window.URL(href);
      } catch (err) {
        return;
      }

      // Do nothing if the URL has no hash segment, or its unhashed segment points to another page.
      if (!url.hash || url.pathname !== window.location.pathname) {
        return;
      }
      e.preventDefault();

      // Reset menu active states (side push, overlay, etc.).
      self.deactivateMenu();
      self.changeHamburgerState(false);
      window.history.pushState(null, null, url.hash);
      const anchorTarget = $(url.hash);

      // If the target element of the hash is not present in current document, close the menu and return.
      if (anchorTarget.length === 0) {
        return;
      }

      // Otherwise, scroll to the target element of the hash (with caution about sticky header, admin bar, etc.).
      const headerSettings = $('.jupiterx-header').data('jupiterx-settings');
      const {
        behavior,
        overlap,
        position,
        template,
        stickyTemplate
      } = headerSettings;
      const hasCustomStickyHeader = 'sticky' === behavior && (!stickyTemplate || stickyTemplate !== template);
      const isHeaderSticked = $('.jupiterx-header-sticked').length > 0;
      const tbarHieght = $('.jupiterx-tbar').outerHeight() || 0;
      const adminBarHeight = $('#wpadminbar').height() || 0;
      const bodyBorderWidth = parseInt($('.jupiterx-site-body-border').css('border-width')) || 0;
      let scrollPosition = anchorTarget.offset().top;
      scrollPosition -= adminBarHeight;
      scrollPosition -= bodyBorderWidth;
      scrollPosition -= tbarHieght;
      if (!isHeaderSticked && (!behavior || 'sticky' === behavior && overlap)) {
        scrollPosition -= tbarHieght;
      }
      if (hasCustomStickyHeader) {
        const stickyHeaderHeight = $('.jupiterx-header-custom .elementor:last-of-type').outerHeight() || 0;
        scrollPosition -= stickyHeaderHeight;
      }
      if (!hasCustomStickyHeader && ('sticky' === behavior || 'fixed' === behavior && 'top' === position)) {
        scrollPosition -= self.getHeaderHeight();
      }
      $('html, body').stop().animate({
        scrollTop: scrollPosition
      }, 500, 'swing');
    });
  },
  getHeaderHeight() {
    const header = $('.jupiterx-header');
    if (header.length === 0) {
      return 0;
    }
    const {
      behavior
    } = header.data('jupiterx-settings');
    if (behavior === 'fixed' || behavior === 'sticky' || window.pageYOffset < header.height()) {
      return header.height();
    }
    return 0;
  },
  onElementChange(propertyName) {
    if ('full_width' === propertyName) {
      this.dropdownFullWidth();
    }
    if ((propertyName.startsWith('menu_container_width') || propertyName.startsWith('offcanvas_box_width')) && this.elements.$body.hasClass('raven-adnav-menu-effect-pushed')) {
      const isOffCanvas = 'offcanvas' === this.mainLayout;
      const sideMenuOpenPosition = this.getElementSettings(isOffCanvas ? 'offcanvas_position' : 'side_menu_alignment');
      let width = parseInt(this.$element.css(isOffCanvas ? '--offcanvas-box-width' : '--menu-container-width')) || 250;
      if (sideMenuOpenPosition === 'right') {
        width = `-${width}px`;
      }
      const marginProp = this.isRtl ? 'margin-right' : 'margin-left';
      this.elements.$body.css(marginProp, width);
    }
    if (propertyName === 'submenu_space_between') {
      this.elements.$menus.smartmenus('destroy');
      this.initMainSmartMenu();
    }
  },
  onSectionActivated(activeSection) {
    if (activeSection === 'section_submenu') {
      this.forceShowSubmenu();
      this.showSubMenuInterval = setInterval(this.forceShowSubmenu, 1000);
      return;
    }
    clearInterval(this.showSubMenuInterval);
  },
  forceShowSubmenu() {
    const allSubMenus = this.elements.$mainMenu.find('li ul.submenu');
    let subMenuLink;
    allSubMenus.each(function () {
      if (!$(this).find('li:not(.submenu-template)').length) {
        return;
      }
      subMenuLink = $(this).prev('a.raven-menu-item');
    });
    if (!subMenuLink?.length || 'none' !== subMenuLink.next('ul').css('display')) {
      return;
    }
    this.elements.$menus.smartmenus('itemActivate', subMenuLink);
  },
  onSideMenuItemClick(e, item) {
    const $el = $(item);
    if ($el.closest('.raven-adnav-menu-side,.raven-adnav-menu-offcanvas').length === 0) {
      return;
    }
    const href = $el.attr('href');
    if (href.search(/^#/) !== -1 || href.trim().length === 0) {
      return;
    }
    this.elements.$closeButton.trigger('click');
  },
  changeHamburgerState(active) {
    const $hamburger = this.elements.$toggleButton.find('.hamburger');
    if ($hamburger.length === 0) {
      return;
    }
    if (!active) {
      $hamburger.removeClass('is-active');
      return;
    }
    $hamburger.addClass('is-active');
  },
  updateActiveListItems() {
    this.elements.$rootListItems.each(function () {
      const hasActiveLink = $(this).children('a.active-link').length > 0;
      $(this).toggleClass('current-menu-item', hasActiveLink);
    });
  },
  setSubmenuWidth($ul, spaceBetween) {
    const parentList = $ul.closest('li.menu-item');
    const widthSource = parentList.data('width_type');

    // If width type is set to Custom, calculate it and bail out.
    if ('custom' === widthSource) {
      const customWidth = parentList.data('custom_width');
      $ul.css('width', customWidth);
      return;
    }

    // In vertical layout.
    if ('vertical' === this.mainLayout) {
      if ('default' === widthSource) {
        $ul.css({
          width: 'fit-content',
          'max-width': this.widgetParents.widget.get(0).getBoundingClientRect().width - this.elements.$mainMenu.get(0).getBoundingClientRect().width - spaceBetween + 'px'
        });
        return;
      }
      const width = this.widgetParents[widthSource].get(0).getBoundingClientRect().width - this.elements.$mainMenu.get(0).getBoundingClientRect().width - spaceBetween;
      $ul.css('width', `${width}px`);
      return;
    }

    // In horizontal layout.
    if ('default' === widthSource) {
      $ul.css({
        width: 'fit-content',
        'max-width': this.widgetParents.widget.get(0).getBoundingClientRect().width + 'px'
      });
      return;
    }
    const width = this.widgetParents[widthSource].get(0).getBoundingClientRect().width;
    $ul.css('width', `${width}px`);
  },
  setSubmenuPosition($ul) {
    const parentList = $ul.closest('li.menu-item');

    // In vertical layout.
    if ('vertical' === this.mainLayout) {
      let posType = parentList.data('submenu_pos');
      if (!posType || 'center' === posType) {
        posType = this.isRtl ? 'left' : 'right';
      }

      // eslint-disable-next-line no-undef
      const subMenuSpacing = getComputedStyle(this.$element[0]).getPropertyValue('--submenu-spacing') && this.$element?.css('--submenu-spacing') ? parseInt(this.$element?.css('--submenu-spacing')) : 0;
      const parentListWidth = parentList.get(0).getBoundingClientRect().width + subMenuSpacing;
      const cssRight = 'right' === posType ? 'unset' : parentListWidth;
      const cssLeft = 'right' === posType ? parentListWidth : 'unset';
      $ul.css({
        left: cssLeft,
        right: cssRight
      });
      return;
    }

    // In horizontal layout.
    const widthSource = parentList.data('width_type');
    if (!['default', 'custom'].includes(widthSource)) {
      const parentX = this.widgetParents[widthSource].get(0).getBoundingClientRect().x;
      const listItemX = parentList.get(0).getBoundingClientRect().x;
      $ul.css('left', `${parentX - listItemX}px`);
      return;
    }
    const posType = parentList.data('submenu_pos');
    let cssRight = 'unset',
      cssLeft = '0';
    if ('right' === posType) {
      cssRight = '0';
      cssLeft = 'unset';
    }
    if ('center' === posType) {
      const listItemWidth = parentList.get(0).getBoundingClientRect().width;
      const submenuWidth = parseInt($ul.css('width'));
      const offset = (listItemWidth - submenuWidth) / 2;
      cssLeft = `${offset}px`;
    }
    $ul.css({
      left: cssLeft,
      right: cssRight
    });
  },
  getParentSection() {
    const parentSection = this.$element.closest('section[data-element_type="section"]');
    if (parentSection.length) {
      return parentSection;
    }
    const parentRootContainer = this.$element.parents('[data-element_type="container"]').last();
    if (parentRootContainer.length) {
      return parentRootContainer;
    }
    return undefined;
  },
  getParentColumn() {
    const parentColumn = this.$element.closest('div[data-element_type="column"]');
    if (parentColumn.length) {
      return parentColumn;
    }
    const nearestParentContainer = this.$element.closest('[data-element_type="container"]');
    if (nearestParentContainer.length) {
      return nearestParentContainer;
    }
    return undefined;
  },
  getParentContainer() {
    const parentContainer = this.$element.closest('[data-element_type="container"]');
    if (parentContainer.length) {
      return parentContainer;
    }
    const parentSection = this.$element.closest('section[data-element_type="section"]');
    if (parentSection.length) {
      return parentSection;
    }
    return undefined;
  },
  deactivateMenu() {
    const currentWidth = window.orientation === 0 || window.screen.orientation.angle === 0 ? $(window).width() : $(window).height();

    // If width is the same, this was likely a scroll happen on mobile device
    if ('yes' !== this.getElementSettings('close_menu_on_scroll') && currentWidth === this.initWidth) {
      return;
    }
    const mobileDropdown = this.elements.$mobileNav.hasClass('raven-adnav-menu-dropdown'),
      mainMenu = this.elements.$mainNav.css('display');
    if (mobileDropdown && mainMenu === 'none') {
      this.elements.$toggleButton.find('.hamburger').removeClass('is-active');
      this.elements.$mobileNav.slideUp(250);
      return;
    }
    this.elements.$body.removeClass(['raven-adnav-menu-effect-pushed', 'raven-adnav-menu-effect-overlayed']).removeAttr('style');
    this.elements.$parentSegment.removeClass('raven-adnav-menu-parent-segment');
    this.elements.$mainNav.removeClass('raven-adnav-menu-active');
    this.elements.$mobileNav.removeClass('raven-adnav-menu-active');
    this.elements.$toggleButton.find('.hamburger').removeClass('is-active');
    // Reset any submenu-opened state on full deactivation.
    this.elements.$menus.find('a.raven-menu-item').removeClass('submenu-opened');
    if ('dropdown' === this.mobileLayout) {
      this.elements.$mobileNav.slideUp(250);
    }
    if ('dropdown' === this.mainLayout) {
      this.elements.$mainNav.slideUp(250);
    }
  }
});
function _default($scope) {
  new AdvancedNavMenu({
    $element: $scope
  });
}

},{"../utils/module":9}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
var _pagination = _interopRequireDefault(require("../utils/pagination"));
var _sortable = _interopRequireDefault(require("../utils/sortable"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AdvancedPosts = _module.default.extend({
  Pagination: null,
  Sortable: null,
  getDefaultSettings() {
    return {
      classes: {
        postMirrored: 'data-mirrored'
      },
      selectors: {
        posts: '.advanced-posts-content',
        postItem: '.raven-posts-item',
        postImage: '.raven-post-image',
        pagination: '.raven-pagination',
        loadMore: '.raven-load-more',
        loadMoreButton: '.raven-load-more-button',
        postImageFit: '.raven-image-fit img',
        postMirrored: '[data-mirrored]',
        sortable: '.raven-sortable',
        preLoader: '.raven-posts-preloader',
        sortPreLoader: '.raven-posts-sortable-preloader',
        postOverlay: '.content-layout-overlay',
        infinteLoadIndicator: '.raven-infinite-load'
      },
      state: {
        paged: 1,
        category: -1,
        maxNumPages: 1,
        isLoading: false,
        renderedPosts: []
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $postsWrapper: this.$element,
      $postsContainer: this.$element.find(selectors.posts),
      $postsImages: this.$element.find(selectors.postImage),
      $pagination: this.$element.find(selectors.pagination),
      $loadMore: this.$element.find(selectors.loadMore),
      $loadMoreButton: this.$element.find(selectors.loadMoreButton),
      $preLoader: this.$element.find(selectors.preLoader),
      $sortPreLoader: this.$element.find(selectors.sortPreLoader),
      $sortable: this.$element.find(selectors.sortable),
      $postOverlay: this.$element.find(selectors.postOverlay),
      $infinteLoadIndicator: this.$element.find(selectors.infinteLoadIndicator),
      $showedItems: 0
    };
  },
  bindEvents() {
    this.handleQueryOnLoad();
    this.handlePopstate();
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      elementorFrontend.addListenerOnce(this.$element.data('model-cid'), 'resize', this.mirrorRows.bind(this));
    }
    const self = this;
    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (self.getInstanceValue('general_layout') === 'masonry') {
          self.masonryRun();
        }
        if (self.getInstanceValue('general_layout') === 'matrix') {
          self.matrixRun(500);
        }
        if (self.getInstanceValue('general_layout') === 'metro') {
          self.metroRun(500);
        }
      }, 500);
    });
  },
  onDeviceModeChange() {
    setTimeout(this.initialize(), 0);
  },
  onElementChange(propertyName) {
    if (propertyName === 'metro_matrix_rows_gap') {
      if (this.getInstanceValue('general_layout') === 'metro') {
        this.metroRun(0);
      }
      if (this.getInstanceValue('general_layout') === 'matrix') {
        this.matrixRun(0);
      }
    }
    if (propertyName === 'stroke_width') {
      setTimeout(() => {
        if (this.getInstanceValue('general_layout') === 'masonry') {
          this.masonryRun();
        }
      }, 0);
    }
    if (propertyName === 'metro_matrix_large_aspect_ratio' || propertyName === 'metro_matrix_small_aspect_ratio') {
      setTimeout(() => {
        if (this.getInstanceValue('general_layout') === 'metro') {
          this.metroRun(0);
        }
        if (this.getInstanceValue('general_layout') === 'matrix') {
          this.matrixRun(0);
        }
      }, 0);
    }
    if (propertyName === 'rows_spacing' || propertyName === 'block_column_spacing') {
      if (this.getInstanceValue('general_layout') === 'masonry') {
        setTimeout(() => {
          this.masonryRun();
        }, 500);
      }
    }
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.initializeOnce();
    this.initialize();
    if (elementorFrontend.isEditMode()) {
      elementor.listenTo(elementor.channels.deviceMode, 'change', () => this.onDeviceModeChange());
    }
  },
  initialize() {
    if (this.getInstanceValue('general_layout') === 'masonry') {
      this.masonryRun();
    }
    if (this.getInstanceValue('general_layout') === 'metro') {
      this.elements.$postsContainer.imagesLoaded().progress(() => {
        this.metroRun(0);
      });
    }
    if (this.getInstanceValue('general_layout') === 'matrix') {
      this.matrixRun(0);
    }
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      this.mirrorRows();
    }
    this.handleAnitmation();
    this.handleFeaturedIamageEffect();
    objectFitPolyfill(this.$element.find(this.getSettings('selectors.postImageFit')));
  },
  initializeOnce() {
    if (this.getInstanceValue('show_sortable') === 'yes') {
      this.sortableModule();
    }
    if (this.getInstanceValue('pagination_type') === 'page_based') {
      this.paginationModule();
    }
    if (this.getInstanceValue('pagination_type') === 'load_more' && this.elements.$loadMore.length) {
      this.loadMore();
    }
    if (this.getInstanceValue('pagination_type') === 'infinite_load') {
      this.infiniteLoadObserver();
    }
  },
  handlePostsOrder(items) {
    if (this.getInstanceValue('general_layout') === 'metro' && items[0].classList.contains('raven-posts-full-width')) {
      return [...items.slice(1, 3).reverse(), items[0], ...items.slice(3, items.length)];
    }
    if (items[0].classList.contains('raven-posts-full-width')) {
      return [items[0], ...items.slice(1, items.length).reverse()];
    }
    if (this.getInstanceValue('general_layout') === 'matrix') {
      return [...items];
    }
    return [...items.reverse()];
  },
  createAnimationObserver(self, item, options, index, effect) {
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (item.classList.contains('raven-advanced-posts-loaded')) {
            return;
          }
          let delay = self.elements.$showedItems > 0 ? index - self.elements.$showedItems : index;
          if (effect === 'slide-right') {
            if (delay > self.elements.$showedItems) {
              delay -= self.elements.$showedItems;
            }
            if (self.elements.$showedItems > delay) {
              delay = self.elements.$showedItems - delay;
            }
          }
          setTimeout(() => {
            item.classList.add('raven-advanced-posts-loaded');
            self.elements.$showedItems = index;
            observer.unobserve(item);
          }, 100 * delay);
        }
      });
    }, options);
    observer.observe(item);
  },
  handleAnitmation() {
    let items = [...this.elements.$postsContainer[0].querySelectorAll('.raven-posts-item:not(.raven-advanced-posts-loaded)')];
    const effect = this.getInstanceValue('load_effect'),
      self = this;
    this.elements.$postsContainer.imagesLoaded().done(() => {
      let increment = 0;
      if (effect === 'slide-right') {
        this.setColumnsCount();
        const settings = this.getSettings();
        let columnsCount = settings.columnsCount;
        if (!columnsCount) {
          if (this.getInstanceValue('general_layout') === 'metro') {
            columnsCount = 3;
          }
          if (this.getInstanceValue('general_layout') === 'matrix') {
            columnsCount = 4;
          }
        }
        const rows = parseInt(items.length / columnsCount),
          itemsLeft = items.length % columnsCount;
        if (items.length / columnsCount <= 1) {
          items = [...this.handlePostsOrder(items)];
        } else {
          const itemsToRight = [];
          let tempItems = [];
          for (let row = 1; row <= rows; ++row) {
            tempItems = [];
            for (let i = itemsToRight.length; i < row * columnsCount; ++i) {
              tempItems.push(items[i]);
            }
            itemsToRight.push(...this.handlePostsOrder(tempItems));
          }
          if (itemsLeft > 0) {
            itemsToRight.push(...items.slice(-itemsLeft).reverse());
          }
          items = itemsToRight;
        }
      }

      // eslint-disable-next-line no-unused-vars
      items.forEach((event, index) => {
        if (!effect || document.body.classList.contains('elementor-editor-active')) {
          if (!event.classList.contains('raven-advanced-posts-loaded')) {
            ++increment;
            setTimeout(() => {
              event.classList.add('raven-advanced-posts-loaded');
            }, 200 + 100 * increment);
          }
        }
        if (effect) {
          const options = {
            threshold: 0.4
          };
          self.createAnimationObserver(self, event, options, index, effect);
        }
      });
    });
  },
  addPosts(data, queryLoad = false) {
    const state = this.getSettings('state');
    if (state.isLoading || state.paged < 1) {
      return false;
    }
    this.ajaxPosts(data, this.appendPosts, queryLoad);
    return true;
  },
  setPosts(data, queryLoad = false, isPopState = false) {
    const state = this.getSettings('state');
    if (state.isLoading) {
      return false;
    }
    this.ajaxPosts(data, this.renderPosts, queryLoad, isPopState);
    return true;
  },
  handleSort(category) {
    const postOk = this.setPosts({
      paged: 1,
      category
    });
    if (postOk) {
      this.setSettings('state.category', category);
    }
  },
  sortableModule() {
    if (document.body.classList.contains('elementor-editor-active')) {
      return;
    }
    const _Sortable = _sortable.default.extend({
      handleSort: this.handleSort.bind(this)
    });
    this.Sortable = new _Sortable({
      $element: this.$element.find(this.getSettings('selectors.sortable'))
    });
    this.elements.$sortable.on('click', '.raven-sortable-item', event => {
      if (event.currentTarget.classList.contains('raven-sortable-active')) {
        return;
      }
      this.elements.$sortPreLoader[0].classList.add('active-preloader');
      this.elements.$postsContainer.find('.raven-posts-item').delay('100').addClass('raven-posts-remove-animation');
    });
  },
  paginationModule() {
    if (document.body.classList.contains('elementor-editor-active')) {
      return;
    }
    const _Pagination = _pagination.default.extend({
      handlePagination: this.handlePagination.bind(this)
    });
    this.Pagination = new _Pagination({
      $element: this.$element.find(this.getSettings('selectors.pagination'))
    });
    this.elements.$pagination.on('click', '.raven-pagination-item', event => {
      if (event.currentTarget.classList.contains('raven-pagination-active')) {
        return;
      }
      this.elements.$showedItems = 0;
      this.elements.$preLoader[0].classList.add('active-preloader');
    });
  },
  loadMore() {
    const state = this.getSettings('state'),
      settings = this.elements.$loadMore.data('settings');
    this.setPaged({
      paged: state.paged,
      maxNumPages: settings.maxNumPages,
      renderedPosts: state.renderedPosts
    });
    this.elements.$loadMoreButton.on('click', event => {
      event.preventDefault();
      if (document.body.classList.contains('elementor-editor-active')) {
        return;
      }
      this.elements.$preLoader[0].classList.add('active-preloader');
      if (state.renderedPosts.length === 0 && this.getInstanceValue('query_orderby') === 'rand' && this.getInstanceValue('ignore_repetitive') === 'yes') {
        this.setRenderedPost();
      }
      const loadMorestate = this.getSettings('state'),
        newPaged = loadMorestate.paged + 1;
      this.addPosts({
        paged: newPaged,
        category: loadMorestate.category,
        is_appended: true,
        renderedPosts: this.getSettings('state.renderedPosts')
      });
    });
  },
  createObserver($indicator, callback, options) {
    if ($indicator.length < 1) {
      return;
    }
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    }, options);
    observer.observe($indicator[0]);
  },
  infiniteLoadObserver() {
    const self = this;
    self.elements.$postsContainer.imagesLoaded().always(() => {
      if (document.body.classList.contains('elementor-editor-active')) {
        return;
      }
      if (self.getSettings('state.renderedPosts').length === 0 && self.getInstanceValue('query_orderby') === 'rand' && self.getInstanceValue('ignore_repetitive') === 'yes') {
        self.setRenderedPost();
      }
      const options = {
        threshold: 1.0
      };
      self.createObserver(self.elements.$infinteLoadIndicator, () => {
        const state = self.getSettings('state');
        const newPaged = state.paged + 1;
        self.addPosts({
          paged: newPaged,
          category: state.category,
          is_appended: true,
          renderedPosts: state.renderedPosts
        });
      }, options);
    });
  },
  handlePagination(pageNum) {
    this.scrollToContainer(this.elements.$postsContainer);
    if (this.getSettings('state.renderedPosts').length === 0 && this.getInstanceValue('query_orderby') === 'rand' && this.getInstanceValue('ignore_repetitive') === 'yes') {
      this.setRenderedPost();
    }
    this.elements.$postsContainer.find('.raven-posts-item').delay('100').addClass('raven-posts-remove-animation');
    this.setPosts({
      paged: pageNum,
      category: this.getSettings('state.category'),
      renderedPosts: this.getSettings('state.renderedPosts')
    });
  },
  renderPosts(res, queryLoad = false) {
    this.elements.$postsContainer.empty();
    this.elements.$postsContainer.append(res.posts);
    if (this.Sortable && !this.Sortable.isEnabled()) {
      this.Sortable.renderUpdate();
      if (this.Pagination && this.Pagination.isEnabled()) {
        this.Pagination.recreatePagination(res.max_num_pages);
      }
    }
    if (this.Pagination && !this.Pagination.isEnabled()) {
      this.Pagination.renderUpdate();
    }
    this.setPaged({
      paged: 1,
      maxNumPages: res.max_num_pages,
      renderedPosts: res.rendered_posts
    });
    if (queryLoad) {
      const data = this.urlAnalyze();
      if (this.getInstanceValue('pagination_type') === 'page_based') {
        this.Pagination.recreatePagination(res.max_num_pages, data.paged);
      }
      this.setPaged({
        paged: data.paged,
        maxNumPages: res.max_num_pages,
        renderedPosts: res.rendered_posts
      });
    }

    // eslint-disable-next-line no-unused-expressions
    this.elements.$preLoader[0]?.classList?.remove('active-preloader');
    // eslint-disable-next-line no-unused-expressions
    this.elements.$sortPreLoader[0]?.classList?.remove('active-preloader');
    this.initialize();
  },
  appendPosts(res, queryLoad = false) {
    const state = this.getSettings('state');
    this.elements.$postsContainer.append(res.posts);
    const data = {
      paged: state.paged + 1,
      maxNumPages: res.max_num_pages,
      renderedPosts: res.rendered_posts
    };
    if (queryLoad) {
      data.paged = state.paged;
    }
    this.setPaged(data);
    this.afterAppend();
  },
  afterAppend() {
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      this.mirrorRows();
    }
    if (this.getInstanceValue('pagination_type') === 'infinite_load') {
      this.infiniteLoadObserver();
    }
    if (this.getInstanceValue('general_layout') === 'masonry') {
      this.masonryRun();
    }
    if (this.getInstanceValue('general_layout') === 'metro') {
      this.metroRun(0);
    }
    if (this.getInstanceValue('general_layout') === 'matrix') {
      this.matrixRun(0);
    }
    if (!['metro', 'matrix'].includes(this.getInstanceValue('general_layout'))) {
      this.handleAnitmation();
    }
    this.handleFeaturedIamageEffect();

    // eslint-disable-next-line no-unused-expressions
    this.elements.$preLoader[0]?.classList?.remove('active-preloader');
    // eslint-disable-next-line no-unused-expressions
    this.elements.$sortPreLoader[0]?.classList?.remove('active-preloader');
  },
  ajaxPosts(data, callback, queryLoad = false, isPopState = false) {
    const archiveQuery = this.elements.$postsContainer.data('archive-query'),
      self = this;
    const ajaxData = {
      action: 'raven_render_advanced_posts',
      post_id: this.getCurrentPostId(),
      model_id: this.getID(),
      paged: data.paged,
      category: data.category,
      renderedPosts: JSON.stringify(data.renderedPosts),
      // eslint-disable-next-line no-undef
      nonce: ravenTools.nonce,
      // eslint-disable-next-line no-undef
      main_post_id: elementorFrontendConfig?.post?.id
    };
    if (data.should_append) {
      ajaxData.should_append = true;
    }
    if (archiveQuery) {
      ajaxData.archive_query = JSON.stringify(archiveQuery);
    }
    const ajaxSuccess = function (response) {
      if (!response.posts) {
        return;
      }
      if (queryLoad) {
        callback(response, queryLoad);
      } else {
        callback(response);
      }
    };
    const addParametersToUrl = function (url, params) {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);

      // Add new parameters
      for (const [key, value] of Object.entries(params)) {
        searchParams.set(key, value);
      }

      // Update the URL with new search parameters
      urlObj.search = searchParams.toString();
      const currentUrl = urlObj.toString();
      if (!isPopState) {
        window.history.pushState({
          path: currentUrl
        }, '', currentUrl);
      }
    };
    this.setSettings('state.isLoading', true);
    wp.ajax.post(ajaxData).done(function (response) {
      ajaxSuccess(response);
      self.setSettings('state.isLoading', false);
      const params = {
        jupiterx_filters: 1,
        jupiterx_page: data.paged
      };
      if (data.category) {
        params.category = data.category;
      }
      if (data.is_appended) {
        params.is_appended = data.is_appended;
      }
      addParametersToUrl(window.location.href, params);
    });
  },
  getCurrentPostId() {
    return parseInt(this.elements.$postsContainer.data('post-id'));
  },
  setPaged(params) {
    let {
      paged,
      maxNumPages,
      renderedPosts
    } = params;
    this.elements.$loadMore.attr('data-paged', paged);
    if (paged >= maxNumPages) {
      paged = -1;
    }
    this.elements.$loadMore.attr('data-paged-next', paged);
    this.elements.$loadMore.show();
    if (paged === -1) {
      this.elements.$loadMore.hide();
    }
    this.setSettings('state.paged', paged);
    this.setSettings('state.maxNumPages', maxNumPages);
    this.setSettings('state.renderedPosts', renderedPosts);
  },
  mirrorRows() {
    this.setColumnsCount();
    const settings = this.getSettings(),
      $postsItems = this.$element.find(settings.selectors.postItem);
    $postsItems.filter(settings.selectors.postMirrored).removeAttr(settings.classes.postMirrored);
    if ($postsItems.length && $postsItems.length > settings.columnsCount) {
      const totalRows = $postsItems.length / settings.columnsCount;
      for (let i = 1; i < totalRows; i += 2) {
        const startIndex = i * settings.columnsCount;
        $postsItems.slice(startIndex, startIndex + settings.columnsCount).attr(settings.classes.postMirrored, true);
      }
    }
  },
  setColumnsCount() {
    const curDevice = elementorFrontend.getCurrentDeviceMode();
    let columnsKey = `columns_${curDevice}`;
    if (curDevice === 'desktop') {
      columnsKey = 'columns';
    }
    this.setSettings('columnsCount', parseInt(this.getInstanceValue(columnsKey)));
  },
  setGapSize() {
    const curDevice = elementorFrontend.getCurrentDeviceMode();
    let gapKey = `metro_matrix_rows_gap_${curDevice}`;
    if (curDevice === 'desktop') {
      gapKey = 'metro_matrix_rows_gap';
    }
    this.setSettings('gapSize', parseInt(this.getInstanceValue(gapKey)?.size));
  },
  masonryRun() {
    const self = this,
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$postsContainer.data('isotope')) {
      self.elements.$postsContainer.isotope('reloadItems').isotope();
    }
    self.elements.$postsContainer.isotope({
      itemSelector: '.raven-masonry-item',
      masonry: {
        layoutMode: 'fitRows'
      },
      transitionDuration: 0,
      sortBy: 'original-order',
      isOriginLeft
    });
  },
  metroRun(delayTime) {
    this.setGapSize();
    const self = this,
      gap = this.getSettings().gapSize ? this.getSettings().gapSize : 0,
      currentDevice = elementorFrontend.getCurrentDeviceMode(),
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$postsContainer.data('isotope')) {
      self.elements.$postsContainer.isotope('reloadItems').isotope();
    }
    let normalSize = Math.floor((self.elements.$postsContainer.parent().width() + gap) / 4),
      doubleSize = normalSize * 2;
    if (currentDevice === 'tablet') {
      normalSize = normalSize * 2;
      doubleSize = normalSize * 2;
    }
    if (currentDevice === 'mobile') {
      normalSize = normalSize * 4;
      doubleSize = normalSize;
    }
    self.elements.$postsContainer.find('.raven-metro-item').each((index, event) => {
      let setWidth = normalSize,
        setHeight = normalSize;
      if (event.classList.contains('raven-posts-full-width')) {
        setWidth = doubleSize;
        setHeight = doubleSize;
      }
      if (setWidth) {
        event.style.width = setWidth + 'px';
      }
      if (!self.elements.$postsContainer[0].classList.contains('content-layout-under-image')) {
        event.style.height = setHeight + 'px';
      }
    });
    setTimeout(() => {
      self.elements.$postsContainer.isotope({
        itemSelector: '.raven-metro-item',
        layoutMode: 'packery',
        percentPosition: true,
        sortBy: 'original-order',
        transitionDuration: 0,
        gutter: 10,
        isOriginLeft
      });
      self.elements.$postsContainer.isotope('once', 'arrangeComplete', () => {
        setTimeout(() => self.handleAnitmation(), 100);
      });
    }, delayTime);
  },
  matrixRun(delayTime) {
    const self = this,
      currentDevice = elementorFrontend.getCurrentDeviceMode(),
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$postsContainer.data('isotope')) {
      self.elements.$postsContainer.isotope('reloadItems').isotope();
    }
    let normalSize = Math.floor(self.elements.$postsContainer.width() / 3),
      tripleSize = normalSize * 3;
    if (currentDevice === 'mobile') {
      normalSize = normalSize * 3;
      tripleSize = normalSize;
    }
    self.elements.$postsContainer.find('.raven-matrix-item').each((index, event) => {
      let setWidth = normalSize;
      if (event.classList.contains('raven-posts-full-width')) {
        setWidth = tripleSize;
      }
      if (setWidth) {
        event.style.width = setWidth + 'px';
      }
      if (currentDevice === 'mobile') {
        event.style.paddingRight = 0;
      }
    });
    setTimeout(() => {
      self.elements.$postsContainer.isotope({
        itemSelector: '.raven-matrix-item',
        layoutMode: 'packery',
        packery: {
          isFitWidth: true
        },
        percentPosition: true,
        sortBy: 'original-order',
        transitionDuration: 0,
        isOriginLeft
      });
      self.elements.$postsContainer.isotope('once', 'arrangeComplete', () => {
        setTimeout(() => self.handleAnitmation(), 100);
      });
    }, delayTime);
  },
  handleFeaturedIamageEffect() {
    const effect = this.getInstanceValue('featured_image_hover');
    if (!effect || effect !== 'zoom-move' || this.elements.$postsImages.length < 1) {
      return;
    }
    let items = this.elements.$postsContainer.find('.raven-posts-item:not(.raven-advanced-posts-loaded)').find('.raven-post-image');
    if (this.elements.$postOverlay.length > 0) {
      items = this.elements.$postOverlay.find('.raven-posts-item:not(.raven-advanced-posts-loaded)').find('.raven-post-wrapper');
    }
    items.on('mouseout', event => {
      const zoomMove = event.currentTarget.querySelector('.raven-posts-zoom-move-wrapper');
      if (!zoomMove) {
        return;
      }
      zoomMove.style.transform = 'perspective(900px) translate3d( 0px, 0px, 0px ) scale(1)';
    });
    items.on('mousemove', event => {
      const bound = event.currentTarget.getBoundingClientRect(),
        scaleX = ((bound.width + 35) / bound.width).toFixed(2),
        scaleY = ((bound.height + 35) / bound.height).toFixed(2),
        zoomMove = event.currentTarget.querySelector('.raven-posts-zoom-move-wrapper');
      let pageX = bound.width / 2 - (event.clientX - bound.left),
        pageY = bound.height / 2 - (event.clientY - bound.top);
      pageX = pageX / bound.width * 30;
      pageY = pageY / bound.height * 30;
      if (!zoomMove) {
        return;
      }
      zoomMove.style.transform = `perspective(900px) translate3d( ${pageX}px, ${pageY}px, 0px ) scale(${Math.max(scaleX, scaleY)})`;
    });
    if (this.elements.$postOverlay.length < 1 || document.body.classList.contains('elementor-editor-active')) {
      return;
    }
    items.on('click', event => {
      const postLink = event.currentTarget.querySelector('.raven-post-image').href;
      if (!postLink) {
        return;
      }
      window.location.assign(postLink);
    });
  },
  handleQueryOnLoad() {
    const data = this.urlAnalyze();
    if (!data) {
      return;
    }
    this.setSettings('state.paged', data.paged);
    this.setSettings('state.category', data.category);
    this.elements.$postsContainer.find('.raven-posts-item').delay('100').addClass('raven-posts-remove-animation');
    if (this.getInstanceValue('show_sortable') === 'yes') {
      this.elements.$sortable.find('.raven-sortable-item').removeClass('raven-sortable-active');
      const sortableItem = this.elements.$sortable.find(`.raven-sortable-item[data-category="${data.category}"]`);
      sortableItem.addClass('raven-sortable-active');
    }
    if (data.should_append === true && this.elements.$infinteLoadIndicator.length) {
      this.elements.$postsContainer.empty();
      this.addPosts(data, true);
      this.afterAppend();
    } else {
      this.setPosts(data, true);
    }
  },
  handlePopstate() {
    if (this.getInstanceValue('pagination_type') === 'page_based' || this.urlAnalyze()) {
      window.addEventListener('popstate', () => {
        let urlData = this.urlAnalyze();
        if (!urlData) {
          urlData = {
            paged: 1,
            category: -1
          };
        }
        this.elements.$postsContainer.empty();
        this.setPosts(urlData, true, true);
      });
    }
  },
  urlAnalyze() {
    const url = new URL(window.location.href);
    if ('1' !== url.searchParams.get('jupiterx_filters')) {
      return false;
    }
    const data = {
      paged: url.searchParams.get('jupiterx_page') ? Number(url.searchParams.get('jupiterx_page')) : 1,
      category: url.searchParams.get('category') ? Number(url.searchParams.get('category')) : -1
    };
    if (url.searchParams.get('is_appended')) {
      data.should_append = true;
    }
    return data;
  },
  setRenderedPost() {
    const posts = this.$element.find('.raven-post-content');
    const renderedPosts = {};
    const postIds = [];
    posts.each(function () {
      const postId = $(this).data('id');
      postIds.push(postId);
    });
    renderedPosts.page = '1';
    renderedPosts.ids = postIds;
    this.setSettings('state.renderedPosts', [renderedPosts]);
  }
});
function _default($scope) {
  new AdvancedPosts({
    $element: $scope
  });
}

},{"../utils/module":9,"../utils/pagination":20,"../utils/sortable":22}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default($scope) {
  $scope.find('.raven-alert-dismiss').on('click', event => {
    event.preventDefault();
    $scope.fadeOut();
  });
}

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const AnimatedHeading = _module.default.extend({
  svgPaths: {
    circle: ['M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7'],
    underline_zigzag: ['M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139 c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9'],
    x: ['M497.4,23.9C301.6,40,155.9,80.6,4,144.4', 'M14.1,27.6c204.5,20.3,393.8,74,467.3,111.7'],
    strikethrough: ['M3,75h493.5'],
    curly: ['M3,146.1c17.1-8.8,33.5-17.8,51.4-17.8c15.6,0,17.1,18.1,30.2,18.1c22.9,0,36-18.6,53.9-18.6 c17.1,0,21.3,18.5,37.5,18.5c21.3,0,31.8-18.6,49-18.6c22.1,0,18.8,18.8,36.8,18.8c18.8,0,37.5-18.6,49-18.6c20.4,0,17.1,19,36.8,19 c22.9,0,36.8-20.6,54.7-18.6c17.7,1.4,7.1,19.5,33.5,18.8c17.1,0,47.2-6.5,61.1-15.6'],
    diagonal: ['M13.5,15.5c131,13.7,289.3,55.5,475,125.5'],
    double: ['M8.4,143.1c14.2-8,97.6-8.8,200.6-9.2c122.3-0.4,287.5,7.2,287.5,7.2', 'M8,19.4c72.3-5.3,162-7.8,216-7.8c54,0,136.2,0,267,7.8'],
    double_underline: ['M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6', 'M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4'],
    underline: ['M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7']
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.intersectionObservers = {
      startAnimation: {
        observer: null,
        element: null
      }
    };
    this.isLoopMode = 'yes' === this.getElementSettings('loop');
    this._headingInitialized = false;
    this._clipLoopToken = 0;
    // noop
    this.activateScrollListener();
  },
  applyBaseStyles() {
    // Ensure inline flow by default; for clip, use inline-block so width affects layout.
    const animType = this.getElementSettings('animation_type');
    const isClip = animType === 'clip';
    const overlayAnimations = ['flip', 'slide', 'slide-down', 'drop-in'];
    const isOverlay = overlayAnimations.indexOf(animType) !== -1;
    this.elements.$dynamicWrapper.css({
      display: 'inline-block',
      overflow: isClip ? 'hidden' : 'visible',
      whiteSpace: 'normal',
      width: '',
      minWidth: '',
      height: '',
      minHeight: '',
      position: isClip ? 'relative' : 'static',
      verticalAlign: 'baseline'
    });
    // Ensure the surrounding text wrapper aligns to baseline too
    this.$element.find('.raven-heading-text-wrapper').css({
      verticalAlign: 'baseline'
    });
    // Do not override display/position for overlay animations so SCSS can
    // apply inline-block + 3D transform rules correctly.
    if (isOverlay) {
      this.elements.$dynamicText.css({
        display: '',
        position: '',
        whiteSpace: 'inherit',
        lineHeight: 'inherit',
        verticalAlign: 'baseline'
      });
    } else {
      this.elements.$dynamicText.css({
        display: 'inline',
        position: 'static',
        whiteSpace: 'inherit',
        lineHeight: 'inherit',
        verticalAlign: 'baseline'
      });
    }
  },
  getDefaultSettings() {
    const iterationDelay = this.getElementSettings('rotate_iteration_delay'),
      settings = {
        animationDelay: iterationDelay || 2500,
        // Letters effect.
        lettersDelay: iterationDelay * 0.02 || 50,
        // Typing/Clip effect unified timings.
        typeLettersDelay: iterationDelay * 0.06 || 150,
        selectionDuration: iterationDelay * 0.2 || 500,
        revealDuration: iterationDelay * 0.24 || 600,
        revealAnimationDelay: iterationDelay * 0.6 || 1500,
        // Highlighted heading.
        highlightAnimationDuration: this.getElementSettings('highlight_animation_duration') || 1200,
        highlightAnimationDelay: this.getElementSettings('highlight_iteration_delay') || 8000
      };
    settings.typeAnimationDelay = settings.selectionDuration + 800;
    settings.selectors = {
      heading: '.raven-heading',
      dynamicWrapper: '.raven-heading-dynamic-wrapper',
      dynamicText: '.raven-heading-dynamic-text'
    };
    settings.classes = {
      dynamicText: 'raven-heading-dynamic-text',
      dynamicLetter: 'raven-heading-dynamic-letter',
      textActive: 'raven-heading-text-active',
      textInactive: 'raven-heading-text-inactive',
      letters: 'raven-heading-letters',
      animationIn: 'raven-heading-animation-in',
      typeSelected: 'raven-heading-typing-selected',
      activateHighlight: 'raven-animated',
      hideHighlight: 'raven-hide-highlight',
      typingCursor: 'raven-heading-typing-cursor',
      clipRail: 'raven-heading-clip-rail',
      clipCursor: 'raven-heading-clip-cursor'
    };
    return settings;
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $heading: this.$element.find(selectors.heading),
      $dynamicWrapper: this.$element.find(selectors.dynamicWrapper),
      $dynamicText: this.$element.find(selectors.dynamicText)
    };
  },
  // Ensure an inner wrapper for clip effect that animates width smoothly while
  // keeping natural inline flow and multiline support.
  ensureClipInner($word) {
    let $inner = $word.children('.raven-clip-inner');
    if (!$inner.length) {
      $inner = $('<span>', {
        class: 'raven-clip-inner'
      });
      $inner.append($word.contents());
      $word.append($inner);
      $inner.css({
        display: 'inline-block',
        whiteSpace: 'inherit',
        overflow: 'visible',
        verticalAlign: 'baseline',
        position: 'relative'
      });
    }
    return $inner;
  },
  ensureClipOverlay($inner) {
    let $overlay = $inner.children('.raven-clip-overlay');
    if (!$overlay.length) {
      $overlay = $('<span>', {
        class: 'raven-clip-overlay'
      });
      $inner.append($overlay);
      $overlay.css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderRight: 'none',
        borderLeft: 'none',
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'left,width,right'
      });
      $inner.css({
        position: 'relative',
        zIndex: 1
      });
    }
    // Ensure a visible caret at the moving edge with solid border for consistent visibility
    $overlay.css({
      boxShadow: 'none',
      borderLeft: '2px solid currentColor',
      borderRight: '0'
    });
    return $overlay;
  },
  // Helper veil to hide lines below current line so next line does not show early
  ensureClipVeil($inner, $word) {
    let $veil = $inner.children('.raven-clip-veil');
    if (!$veil.length) {
      $veil = $('<span>', {
        class: 'raven-clip-veil'
      });
      $inner.append($veil);
      const bg = this.getEffectiveBackgroundColor($word[0]);
      $veil.css({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 0,
        backgroundColor: bg,
        pointerEvents: 'none',
        zIndex: 1
      });
      $inner.css({
        position: 'relative'
      });
    }
    return $veil;
  },
  ensureClipCustomCss() {
    if (document.getElementById('raven-clip-custom-style')) {
      return;
    }
    const style = document.createElement('style');
    style.id = 'raven-clip-custom-style';
    style.textContent = '.raven-heading-animation-type-clip .raven-heading-dynamic-wrapper.raven-clip-custom::after{display:none!important;content:none!important;}';
    document.head.appendChild(style);
  },
  getLineRectsRelative($inner) {
    const rects = [];
    const el = $inner[0];
    if (!el || !el.firstChild) {
      return rects;
    }
    // Temporarily hide helper overlays so they don't affect measurements
    const $helpers = $inner.children('.raven-clip-overlay, .raven-clip-veil');
    const previousDisplays = [];
    $helpers.each(function () {
      previousDisplays.push(this.style.display);
      this.style.display = 'none';
    });
    const range = document.createRange();
    range.selectNodeContents(el);
    const clientRects = range.getClientRects();
    const base = el.getBoundingClientRect();
    for (let i = 0; i < clientRects.length; i++) {
      const r = clientRects[i];
      rects.push({
        top: r.top - base.top,
        bottom: r.bottom - base.top,
        left: r.left - base.left,
        right: r.right - base.left,
        width: r.width,
        height: r.height
      });
    }
    range.detach();

    // Restore helper overlays visibility
    $helpers.each(function (idx) {
      this.style.display = previousDisplays[idx] || '';
    });
    return rects;
  },
  // Merge fragmented rects per visual line (caused by inline elements) into one rect per line
  normalizeLineRects(rects) {
    if (!rects || !rects.length) {
      return [];
    }
    const epsilon = 0.75; // px tolerance to consider the same line
    const byTop = rects.slice().filter(r => r.width > 0.5 && r.height > 0.5).sort((a, b) => a.top - b.top || a.left - b.left);
    const groups = [];
    byTop.forEach(r => {
      const rMid = r.top + r.height / 2;
      let found = null;
      for (let i = 0; i < groups.length; i++) {
        const g = groups[i];
        const gMid = g.top + g.height / 2;
        if (Math.abs(rMid - gMid) <= epsilon) {
          found = g;
          break;
        }
      }
      if (found) {
        found.left = Math.min(found.left, r.left);
        found.right = Math.max(found.right, r.right);
        found.width = found.right - found.left;
        found.top = Math.min(found.top, r.top);
        found.bottom = Math.max(found.bottom, r.bottom);
        found.height = found.bottom - found.top;
      } else {
        groups.push({
          top: r.top,
          bottom: r.bottom,
          left: r.left,
          right: r.right,
          width: r.width,
          height: r.height
        });
      }
    });
    return groups.sort((a, b) => a.top - b.top);
  },
  getInlineDirection($el) {
    try {
      const dir = window.getComputedStyle($el[0]).direction;
      return 'rtl' === dir ? 'rtl' : 'ltr';
    } catch (e) {
      return 'ltr';
    }
  },
  // Resolve an effective non-transparent background color for overlay masking
  getEffectiveBackgroundColor(el) {
    let node = el;
    const isTransparent = color => {
      if (!color) {
        return true;
      }
      const c = String(color).trim().toLowerCase();
      if (c === 'transparent') {
        return true;
      }
      return /^rgba\([^,]+,[^,]+,[^,]+,\s*0\s*\)$/.test(c);
    };
    while (node) {
      try {
        const bg = window.getComputedStyle(node).backgroundColor;
        if (!isTransparent(bg)) {
          return bg;
        }
      } catch (e) {}
      node = node.parentElement;
    }
    try {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      if (!isTransparent(bodyBg)) {
        return bodyBg;
      }
    } catch (e) {}
    return '#ffffff';
  },
  animateClip($inner, fromPercent, toPercent, duration, onStep, done) {
    const start = Date.now();
    const step = () => {
      const now = Date.now();
      const t = Math.min(1, (now - start) / duration);
      const delta = toPercent - fromPercent;
      const val = fromPercent + delta * t;
      const inset = 'inset(0 ' + (100 - val) + '% 0 0)';
      $inner.css({
        clipPath: inset,
        WebkitClipPath: inset
      });
      if (onStep) {
        onStep(val);
      }
      if (t < 1) {
        setTimeout(step, 16);
      } else if (done) {
        done();
      }
    };
    // Initialize
    const initInset = 'inset(0 ' + (100 - fromPercent) + '% 0 0)';
    $inner.css({
      clipPath: initInset,
      WebkitClipPath: initInset
    });
    setTimeout(step, 0);
  },
  getNaturalOuterWidth($el) {
    const $clone = $el.clone();
    $clone.css({
      position: 'absolute',
      visibility: 'hidden',
      left: '-9999px',
      top: '-9999px',
      display: 'inline-block',
      whiteSpace: 'normal',
      width: 'auto'
    });
    $(document.body).append($clone);
    const w = $clone.outerWidth();
    $clone.remove();
    return w;
  },
  // Measure the word's width inline within the wrapper flow without affecting layout.
  getInlineFlowWidth($word) {
    if (!$word || !$word.length) {
      return 0;
    }
    const prev = {
      display: $word[0].style.display,
      visibility: $word[0].style.visibility,
      position: $word[0].style.position,
      left: $word[0].style.left,
      top: $word[0].style.top
    };
    $word.css({
      display: 'inline',
      visibility: 'hidden',
      position: 'static',
      left: '',
      top: ''
    });
    const w = $word.outerWidth();
    $word[0].style.display = prev.display || '';
    $word[0].style.visibility = prev.visibility || '';
    $word[0].style.position = prev.position || '';
    $word[0].style.left = prev.left || '';
    $word[0].style.top = prev.top || '';
    return w;
  },
  // Measure the wrapper's width with width:auto while the given word would be active,
  // so line breaks are computed as if the dynamic text is part of the whole text.
  getWrapperAutoWidthForWord($word) {
    const $wrapper = this.elements.$dynamicWrapper;
    if (!$wrapper || !$wrapper.length) {
      return 0;
    }
    const target = $word && $word.length ? $word : this.elements.$dynamicText.filter('.' + this.getSettings('classes').textActive).eq(0);
    if (!target.length) {
      const fallback = Math.max(0, $wrapper.outerWidth() || 0);
      return fallback;
    }

    // Save previous inline styles to restore later.
    const prevWrapperStyle = {
      width: $wrapper[0].style.width,
      visibility: $wrapper[0].style.visibility,
      position: $wrapper[0].style.position,
      display: $wrapper[0].style.display
    };
    const prevTargetDisplay = target[0].style.display;
    try {
      // Keep wrapper in flow but prevent visual flicker during the synchronous measure.
      $wrapper.css({
        width: 'auto',
        visibility: 'hidden',
        display: 'inline-block'
      });
      // Ensure target word participates in layout as inline content.
      target.css({
        display: 'inline'
      });
      // Force reflow, then read width.
      // eslint-disable-next-line no-unused-expressions
      $wrapper[0].offsetWidth;
      const rect = $wrapper[0].getBoundingClientRect();
      const measured = Math.max(0, Math.ceil(rect.width) + 1);
      return measured;
    } finally {
      // Restore previous styles.
      $wrapper[0].style.width = prevWrapperStyle.width || '';
      $wrapper[0].style.visibility = prevWrapperStyle.visibility || '';
      $wrapper[0].style.position = prevWrapperStyle.position || '';
      $wrapper[0].style.display = prevWrapperStyle.display || '';
      target[0].style.display = prevTargetDisplay || '';
    }
  },
  // Promise helpers for precise chronology
  sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  },
  waitForAnimationEnd($el, fallbackMs) {
    return new Promise(function (resolve) {
      let done = false;
      const finish = function () {
        if (done) {
          return;
        }
        done = true;
        $el.off('animationend.ravenEngine animationcancel.ravenEngine');
        resolve();
      };
      $el.off('animationend.ravenEngine animationcancel.ravenEngine').one('animationend.ravenEngine animationcancel.ravenEngine', finish);
      if (fallbackMs) {
        setTimeout(finish, fallbackMs + 50);
      }
    });
  },
  waitForWidthTransition($el, fallbackMs) {
    return new Promise(function (resolve) {
      let done = false;
      const handler = function (e) {
        if (done) {
          return;
        }
        if (!e || e.propertyName === 'width') {
          done = true;
          $el.off('transitionend.ravenEngine');
          resolve();
        }
      };
      $el.off('transitionend.ravenEngine').one('transitionend.ravenEngine', handler);
      if (fallbackMs) {
        setTimeout(handler, fallbackMs + 50);
      }
    });
  },
  // Clip animation: reveal forward line-by-line, then hide backward, then swap.
  showClipWord($word) {
    const settings = this.getSettings();
    // noop

    $word.addClass(settings.classes.textActive).removeClass(settings.classes.textInactive);
    $word.css({
      display: 'inline',
      position: 'static',
      opacity: 1,
      verticalAlign: 'baseline'
    });
    $word.siblings(this.getSettings('selectors').dynamicText).css({
      display: 'none'
    });
    const $inner = this.ensureClipInner($word);
    const $overlay = this.ensureClipOverlay($inner);
    $overlay.stop(true);
    $overlay.css({
      display: 'block',
      height: '100%'
    });

    // Transparent, flowing clip-path engine (single horizontal rail like typing)
    const inlineDir = this.getInlineDirection($word);
    const rtl = 'rtl' === inlineDir;
    const naturalWidth = this.getNaturalOuterWidth($word);
    $inner.css({
      willChange: 'clip-path, -webkit-clip-path',
      display: 'inline-block'
    });
    const onStep = percent => {
      const innerRect = $inner[0] ? $inner[0].getBoundingClientRect() : null;
      const innerWidthNow = innerRect ? innerRect.width : naturalWidth;
      const edge = Math.max(0, innerWidthNow * percent / 100);
      const visualEdgePx = Math.round(edge);
      const caretOffset = 1;
      const targetWidth = Math.max(2, visualEdgePx + 2);
      this.elements.$dynamicWrapper.width(targetWidth);
      if (rtl) {
        const rightPos = Math.max(0, Math.round(innerWidthNow - edge) - caretOffset);
        $overlay.css({
          left: 'auto',
          right: rightPos,
          width: 0
        });
      } else {
        const leftPos = Math.max(0, visualEdgePx - caretOffset);
        $overlay.css({
          left: leftPos,
          right: 'auto',
          width: 0
        });
      }
    };
    const playForward = () => {
      this.animateClip($inner, 0, 100, settings.revealDuration, onStep, () => {
        setTimeout(() => playBackward(), settings.selectionDuration);
      });
    };
    const playBackward = () => {
      this.animateClip($inner, 100, 0, settings.revealDuration, onStep, () => {
        const nextWord = this.getNextWord($word);
        $word.css({
          display: 'none'
        });
        this.switchWord($word, nextWord);
        this.showClipWord(nextWord);
      });
    };
    this.elements.$dynamicWrapper.width(2);
    playForward();
  },
  // Debug removed in production
  debugLog() {},
  // Debug removed in production
  getComputedSnapshot($el) {
    try {
      if (!$el || !$el[0]) {
        return {
          exists: false
        };
      }
      const node = $el[0];
      const rect = node.getBoundingClientRect();
      return {
        exists: true,
        tag: node.tagName,
        className: node.className,
        rect: {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        }
      };
    } catch (e) {
      return {
        exists: false
      };
    }
  },
  forceReflow($el) {
    try {
      if ($el && $el[0]) {
        // eslint-disable-next-line no-unused-expressions
        $el[0].offsetWidth;
      }
    } catch (e) {}
  },
  getWordsSnapshot() {
    return [];
  },
  logOverlayState() {
    // Debug removed in production
  },
  // Measure natural sizes of each rotating item, accounting for multiline content.
  computeNaturalSizes() {
    const classes = this.getSettings('classes');
    let maxHeight = 0;
    let maxWidth = 0;
    this.elements.$dynamicText.each(function () {
      const $word = $(this);
      const $clone = $word.clone();
      $clone.removeClass(classes.textActive + ' ' + classes.textInactive + ' ' + classes.animationIn);
      $clone.find('.' + classes.dynamicLetter).removeClass(classes.animationIn);
      $clone.css({
        position: 'absolute',
        visibility: 'hidden',
        left: '-9999px',
        top: '-9999px',
        width: 'auto',
        height: 'auto',
        whiteSpace: 'normal',
        display: 'inline-block'
      });
      $(document.body).append($clone);
      const naturalWidth = $clone.outerWidth();
      const naturalHeight = $clone.outerHeight();
      $word.data('natural-width', naturalWidth);
      $word.data('natural-height', naturalHeight);
      if (naturalHeight > maxHeight) {
        maxHeight = naturalHeight;
      }
      if (naturalWidth > maxWidth) {
        maxWidth = naturalWidth;
      }
      $clone.remove();
    });

    // Restore wrapper overflow rules per animation type; for clip keep wrapper inline
    // so it can blend and line-break with surrounding text. The inner rail handles clip.
    const animType = this.getElementSettings('animation_type');
    if (animType === 'clip') {
      this.elements.$dynamicWrapper.css({
        display: 'inline',
        minWidth: '',
        width: '',
        overflow: 'visible'
      });
    } else {
      this.elements.$dynamicWrapper.css({
        display: 'inline-block',
        minWidth: '',
        width: '',
        overflow: 'visible'
      });
    }
    this.maxWordHeight = maxHeight;
  },
  getNextWord($word) {
    return $word.is(':last-child') ? $word.parent().children().eq(0) : $word.next();
  },
  switchWord($oldWord, $newWord) {
    $oldWord.removeClass('raven-heading-text-active').addClass('raven-heading-text-inactive');
    $newWord.removeClass('raven-heading-text-inactive').addClass('raven-heading-text-active');
    const isLetters = this.elements.$heading.hasClass(this.getSettings('classes').letters);
    const animationType = this.getElementSettings('animation_type');
    const overlayAnimations = ['flip', 'slide', 'slide-down', 'drop-in'];
    if (isLetters || overlayAnimations.indexOf(animationType) !== -1) {
      // Overlap words to allow out/in animations to play
      $oldWord.css({
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'inline',
        pointerEvents: 'none'
      });
      $newWord.css({
        position: 'static',
        display: 'inline',
        pointerEvents: ''
      });
    } else {
      $oldWord.css({
        display: 'none',
        position: '',
        visibility: ''
      });
      $newWord.css({
        display: 'inline',
        position: '',
        visibility: ''
      });
    }

    // Animate wrapper width between words for non-overlay/non-letters excluding clip/typing
    const shouldAnimateWidth = !isLetters && overlayAnimations.indexOf(animationType) === -1 && animationType !== 'clip' && animationType !== 'typing';
    if (shouldAnimateWidth) {
      this.setDynamicWrapperWidth($newWord, true);
    }

    // Force reflow so the browser recalculates layout with the new active item
    if ($newWord && $newWord[0]) {
      // eslint-disable-next-line no-unused-expressions
      $newWord[0].offsetWidth;
    }
    if (this.elements.$dynamicWrapper && this.elements.$dynamicWrapper[0]) {
      // eslint-disable-next-line no-unused-expressions
      this.elements.$dynamicWrapper[0].offsetWidth;
    }
    this.debugLog('switchWord', {
      from: $oldWord && $oldWord.text && $oldWord.text(),
      to: $newWord && $newWord.text && $newWord.text()
    });
    this.setDynamicWrapperWidth($newWord);
  },
  // Split text nodes into per-letter spans while preserving <br> and any nested markup.
  singleLetters() {
    const classes = this.getSettings('classes');
    this.elements.$dynamicText.each(function () {
      const $word = $(this),
        isActive = $word.hasClass(classes.textActive),
        originalNodes = $word.contents().toArray();
      $word.empty();
      originalNodes.forEach(node => {
        if (node.nodeType === 3) {
          // Text node
          const text = node.nodeValue;
          text.split('').forEach(ch => {
            const $letter = $('<span>', {
              class: classes.dynamicLetter
            });
            if (ch === ' ') {
              $letter.html('&nbsp;');
            } else {
              $letter.text(ch);
            }
            if (isActive) {
              $letter.addClass(classes.animationIn);
            }
            $word.append($letter);
          });
        } else if (node.nodeType === 1 && node.nodeName === 'BR') {
          $word.append('<br>');
        } else if (node.nodeType === 1) {
          $word.append($(node).clone());
        }
      });
      $word.css('opacity', 1);
    });

    // Create cursor for typing animation
    if ('typing' === this.getElementSettings('animation_type')) {
      this.createTypingCursor();
    }
  },
  createTypingCursor() {
    const classes = this.getSettings('classes');

    // Remove any existing cursor
    this.elements.$dynamicWrapper.find('.' + classes.typingCursor).remove();

    // Create new cursor element (uses text caret)
    this.$cursor = $('<span>', {
      class: classes.typingCursor,
      'aria-hidden': 'true'
    }).text('|');

    // Position cursor after the first active word
    this.positionCursor();
  },
  positionCursor() {
    const classes = this.getSettings('classes');
    const $activeWord = this.elements.$dynamicText.filter('.' + classes.textActive);
    if (!this.$cursor || !$activeWord.length) {
      return;
    }

    // Remove cursor from current position
    this.$cursor.detach();

    // Find the last visible letter in the active word
    const $visibleLetters = $activeWord.find('.' + classes.dynamicLetter + '.' + classes.animationIn);
    if ($visibleLetters.length > 0) {
      // Insert cursor after the last visible letter
      $visibleLetters.last().after(this.$cursor);
    } else {
      // No letters visible yet, insert at the beginning of the word
      $activeWord.prepend(this.$cursor);
    }
  },
  // Find next dynamic letter sibling, skipping non-letter nodes (e.g., cursor or <br>).
  getNextLetter($letter) {
    const classes = this.getSettings('classes');
    return $letter.nextAll('.' + classes.dynamicLetter).eq(0);
  },
  showLetter($letter, $word, thisWordHasBiggerLength, duration) {
    const self = this,
      classes = this.getSettings('classes');
    $letter.addClass(classes.animationIn);

    // Update cursor position for typing animation
    if ('typing' === this.getElementSettings('animation_type')) {
      this.positionCursor();
    }
    const $nextLetter = this.getNextLetter($letter);
    if ($nextLetter && $nextLetter.length) {
      setTimeout(function () {
        self.showLetter($nextLetter, $word, thisWordHasBiggerLength, duration);
      }, duration);
      return;
    }
    if (!thisWordHasBiggerLength) {
      setTimeout(function () {
        self.hideWord($word);
      }, self.getSettings('animationDelay'));
    }
  },
  hideLetter($letter, $word, thisWordHasBiggerLength, duration) {
    const self = this,
      settings = this.getSettings();
    $letter.removeClass(settings.classes.animationIn);

    // Update cursor position for typing animation
    if ('typing' === this.getElementSettings('animation_type')) {
      this.positionCursor();
    }
    const $nextLetter = this.getNextLetter($letter);
    if ($nextLetter && $nextLetter.length) {
      setTimeout(function () {
        self.hideLetter($nextLetter, $word, thisWordHasBiggerLength, duration);
      }, duration);
      return;
    }
    if (thisWordHasBiggerLength) {
      setTimeout(function () {
        self.hideWord(self.getNextWord($word));
      }, self.getSettings('animationDelay'));
    }

    // After finishing hiding this word's letters, ensure it doesn't occupy space.
    $word.css({
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0,
      display: 'inline',
      pointerEvents: 'none'
    });
  },
  showWord($word, $duration) {
    const self = this,
      settings = self.getSettings(),
      animationType = self.getElementSettings('animation_type');

    // noop

    if ('typing' === animationType) {
      // Ensure the word is visible and in the flow before typing begins
      $word.css({
        display: 'inline',
        position: 'static',
        opacity: 1,
        pointerEvents: ''
      });
      // Unlock wrapper width so it can expand with letters
      this.elements.$dynamicWrapper.css('width', '');
      // Hide other variants so they don't interfere
      $word.siblings(settings.selectors && settings.selectors.dynamicText ? settings.selectors.dynamicText : '.' + settings.classes.dynamicText).css({
        display: 'none'
      });
      self.showLetter($word.find('.' + settings.classes.dynamicLetter).eq(0), $word, false, $duration);
      $word.addClass(settings.classes.textActive).removeClass(settings.classes.textInactive);
      return;
    }
    if ('clip' === animationType) {
      return this.showClipWord($word);
    }
  },
  hideWord($word) {
    const self = this,
      settings = self.getSettings(),
      classes = settings.classes,
      letterSelector = '.' + classes.dynamicLetter,
      animationType = self.getElementSettings('animation_type'),
      nextWord = self.getNextWord($word);

    // noop

    if (!this.isLoopMode && $word.is(':last-child')) {
      return;
    }
    if ('typing' === animationType) {
      // Prepare next word to be visible before typing it in
      nextWord.css({
        display: 'inline',
        position: 'static',
        opacity: 1,
        pointerEvents: ''
      });
      // Allow wrapper to naturally resize during selection and next typing
      this.elements.$dynamicWrapper.css('width', '');
      // Hide cursor during selection
      if (self.$cursor) {
        self.$cursor.hide();
      }
      self.elements.$dynamicWrapper.addClass(classes.typeSelected);
      setTimeout(function () {
        self.elements.$dynamicWrapper.removeClass(classes.typeSelected);
        $word.addClass(settings.classes.textInactive).removeClass(classes.textActive).children(letterSelector).removeClass(classes.animationIn);

        // Show cursor again
        if (self.$cursor) {
          self.$cursor.show();
        }
      }, settings.selectionDuration);
      setTimeout(function () {
        self.showWord(nextWord, settings.typeLettersDelay);
      }, settings.typeAnimationDelay);
      return;
    }
    if (self.elements.$heading.hasClass(classes.letters)) {
      // Toggle active/inactive classes for consistency
      $word.removeClass(classes.textActive).addClass(classes.textInactive);
      nextWord.removeClass(classes.textInactive).addClass(classes.textActive);

      // Ensure next word is visible and current word is removed from flow immediately.
      nextWord.css({
        position: 'static',
        opacity: 1,
        display: 'inline',
        pointerEvents: ''
      });
      $word.css({
        display: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        pointerEvents: 'none'
      });
      const thisWordHasBiggerLength = $word.children(letterSelector).length >= nextWord.children(letterSelector).length;
      // Continue both paths: hide letters of current (works even when hidden) and show letters of next
      self.hideLetter($word.find(letterSelector).eq(0), $word, thisWordHasBiggerLength, settings.lettersDelay);
      self.showLetter(nextWord.find(letterSelector).eq(0), nextWord, thisWordHasBiggerLength, settings.lettersDelay);
      self.setDynamicWrapperWidth(nextWord);
      // noop

      return;
    }
    if ('clip' === animationType) {
      // For clip, old word is removed, show next after rail animation ends
      $word.css({
        display: 'none'
      });
      self.switchWord($word, nextWord);
      self.showWord(nextWord);
      return;
    }

    // For overlay-based animations (flip/slide/slide-down/drop-in), animate old inline, swap on animationend.
    const overlayAnimations = ['flip', 'slide', 'slide-down', 'drop-in'];
    if (overlayAnimations.indexOf(animationType) !== -1) {
      const oldWidth = $word.data('natural-width') || self.getNaturalOuterWidth($word);
      const newWidth = nextWord.data('natural-width') || self.getNaturalOuterWidth(nextWord);
      // Lock wrapper to current word's width during out animation
      self.elements.$dynamicWrapper.css('width', Math.max(2, oldWidth));
      // Ensure only current word is inline; prepare next as hidden and inactive
      nextWord.removeClass(classes.textActive).addClass(classes.textInactive);
      nextWord.css({
        display: 'none',
        position: 'static',
        opacity: 1,
        pointerEvents: ''
      });
      // Trigger out by toggling classes only on current word
      $word.removeClass(classes.textActive).addClass(classes.textInactive);
      // Clean old handlers and listen for out animation end
      $word.off('animationend.ravenAH').one('animationend.ravenAH', function () {
        // Hide old from layout
        $word.css({
          display: 'none'
        });
        // Show next inline first, then force reflow, then activate to trigger animation
        nextWord.css({
          display: 'inline'
        });
        // Force reflow so flip-in keyframes start from base state
        if (nextWord[0]) {
          /* eslint-disable no-unused-expressions */
          nextWord[0].offsetWidth;
          /* eslint-enable no-unused-expressions */
        }
        nextWord.removeClass(classes.textInactive).addClass(classes.textActive);
        // Transition wrapper to new width
        self.elements.$dynamicWrapper.css('width', Math.max(2, newWidth));
        // After width transition, continue cycle
        setTimeout(function () {
          self.hideWord(nextWord);
        }, 500); // matches SCSS width transition
      });
      return;
    }
    self.switchWord($word, nextWord);
    setTimeout(function () {
      self.hideWord(nextWord);
    }, settings.animationDelay);
  },
  setDynamicWrapperWidth($word, animate = false) {
    const animationType = this.getElementSettings('animation_type');
    if ('clip' === animationType || 'typing' === animationType) {
      // Clip updates width continuously during reveal; skip here.
      return;
    }
    if (!this.elements.$dynamicWrapper || !this.elements.$dynamicWrapper[0]) {
      return;
    }
    const $wrapper = this.elements.$dynamicWrapper;
    const $target = $word && $word.length ? $word : this.elements.$dynamicText.filter('.' + this.getSettings('classes').textActive).eq(0);
    const isLetters = this.elements.$heading.hasClass(this.getSettings('classes').letters);
    const targetWidth = Math.max(2, this.getWrapperAutoWidthForWord($target) + (isLetters ? 2 : 0));
    const styleWidth = parseFloat($wrapper[0].style.width) || 0;
    const computedWidth = Math.max(2, Math.round($wrapper[0].getBoundingClientRect().width || 0));
    if (animate && !isLetters) {
      // If style width isn't set, set it to current computed first to avoid auto->px jump
      if (!styleWidth) {
        $wrapper.css('width', computedWidth);
        // eslint-disable-next-line no-unused-expressions
        $wrapper[0].offsetWidth;
      }
      $wrapper.off('transitionend.ahWidth').on('transitionend.ahWidth', e => {
        if (!e || e.propertyName === 'width') {
          $wrapper.off('transitionend.ahWidth');
        }
      });
      (window.requestAnimationFrame || window.setTimeout)(() => {
        $wrapper.css('width', targetWidth);
      }, 16);
    } else {
      $wrapper.css('width', targetWidth);
    }
  },
  animateHeading() {
    const self = this,
      animationType = self.getElementSettings('animation_type'),
      $dynamicWrapper = self.elements.$dynamicWrapper;

    // Measure natural sizes for all items (handles multiline & variable sizes)
    self.computeNaturalSizes();

    // For non-clip & non-typing animations, set wrapper to active word width so flow isn't broken
    if ('clip' !== animationType && 'typing' !== animationType) {
      const $active = self.elements.$dynamicText.filter('.' + self.getSettings('classes').textActive);
      self.setDynamicWrapperWidth($active.length ? $active : self.elements.$dynamicText.eq(0));
    } else if ('clip' === animationType) {
      // Clip uses width animation; seed with measured natural width of first word
      const firstWidth = self.elements.$dynamicText.eq(0).data('natural-width') || self.elements.$dynamicText.eq(0).outerWidth();
      self.elements.$dynamicWrapper.width(Math.max(2, firstWidth + 10));
    } else {
      // typing
      // Let typing grow/shrink naturally with visible letters
      self.elements.$dynamicWrapper.css('width', '');
    }
    if ('clip' === animationType) {
      // Ensure clip rail has a bit of extra space to prevent line wrap jitter
      $dynamicWrapper.width(Math.max(2, $dynamicWrapper.width() + 10));
    }

    // Trigger animation: for clip start revealing immediately; others follow legacy flow
    const $first = self.elements.$dynamicText.eq(0);
    const $next = self.getNextWord($first);
    // Ensure a clean initial state for overlay: only first is active, others have no state class
    if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animationType) !== -1) {
      self.elements.$dynamicText.not($first).removeClass(self.getSettings('classes').textActive + ' ' + self.getSettings('classes').textInactive);
    }
    $next.addClass(self.getSettings('classes').textInactive).removeClass(self.getSettings('classes').textActive);
    if ('clip' === animationType) {
      self.elements.$dynamicText.not($first).css({
        display: 'none'
      });
      self.showWord($first);
      return;
    }
    $first.addClass(self.getSettings('classes').textActive).removeClass(self.getSettings('classes').textInactive);
    if (self.elements.$heading.hasClass(self.getSettings('classes').letters)) {
      $first.find('.' + self.getSettings('classes').dynamicLetter).addClass(self.getSettings('classes').animationIn);
    }
    setTimeout(function () {
      self.hideWord($first);
    }, self.getSettings('animationDelay'));
  },
  getSvgPaths(pathName) {
    const pathsInfo = this.svgPaths[pathName];
    let $paths = $();
    pathsInfo.forEach(function (pathInfo) {
      $paths = $paths.add($('<path>', {
        d: pathInfo
      }));
    });
    return $paths;
  },
  addHighlight() {
    const elementSettings = this.getElementSettings(),
      $svg = $('<svg>', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 500 150',
        preserveAspectRatio: 'none'
      }).html(this.getSvgPaths(elementSettings.marker));
    this.elements.$dynamicWrapper.append($svg[0].outerHTML);
  },
  rotateHeading() {
    const settings = this.getSettings();
    // noop

    // Insert <span> for each letter of a changing word.
    if (this.elements.$heading.hasClass(settings.classes.letters)) {
      this.singleLetters();
    }

    // Ensure base inline styles and visibility.
    this.applyBaseStyles();
    if (this.elements.$heading.hasClass(settings.classes.letters)) {
      // Letter-based animations need next word present but not occupying space.
      this.elements.$dynamicWrapper.css({
        position: 'relative'
      });
      this.elements.$dynamicText.not('.' + settings.classes.textActive).css({
        display: 'inline',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        pointerEvents: 'none'
      });
      this.elements.$dynamicText.filter('.' + settings.classes.textActive).css({
        display: 'inline',
        position: 'static',
        opacity: 1,
        whiteSpace: 'normal',
        maxWidth: '100%',
        overflow: 'visible'
      });
    } else {
      // Non-letter: only show the active word initially.
      this.elements.$dynamicText.not('.' + settings.classes.textActive).css({
        display: 'none',
        position: '',
        visibility: ''
      });
      this.elements.$dynamicText.filter('.' + settings.classes.textActive).css({
        display: 'inline',
        position: 'static',
        visibility: '',
        whiteSpace: 'normal',
        maxWidth: '100%',
        overflow: 'visible'
      });

      // For overlay animations (flip/slide/slide-down/drop-in), overlap words to allow in/out animations on multiline.
      const overlayAnimations = ['flip', 'slide', 'slide-down', 'drop-in'];
      if (overlayAnimations.indexOf(this.getElementSettings('animation_type')) !== -1) {
        this.elements.$dynamicWrapper.css({
          position: 'relative'
        });
        let $active = this.elements.$dynamicText.filter('.' + settings.classes.textActive);
        if (!$active.length) {
          $active = this.elements.$dynamicText.eq(0).addClass(settings.classes.textActive);
        }
        // Ensure only current has the active class; remove inactive from others so they stay hidden (base state)
        this.elements.$dynamicText.not($active).removeClass(settings.classes.textActive + ' ' + settings.classes.textInactive);
        this.elements.$dynamicText.not($active).css({
          // Let SCSS control display (inline-block for flip), only stack for overlap
          display: '',
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none'
        });
        $active.css({
          display: '',
          position: 'static',
          pointerEvents: ''
        });
      }
    }

    // Disable default caret pseudo-element for clip to avoid double cursor
    if (this.getElementSettings('animation_type') === 'clip') {
      this.elements.$dynamicWrapper.addClass('raven-clip-custom');
      this.ensureClipCustomCss();
    }

    // Choose engine by animation type
    const animType = this.getElementSettings('animation_type');
    const overlayAnimations = ['flip', 'slide', 'slide-down', 'drop-in'];
    if (overlayAnimations.indexOf(animType) !== -1) {
      return this.runOverlayLoop();
    }

    // Initialise heading animation for typing/clip and letter-based (swirl/blinds/wave)
    this.animateHeading();
  },
  // Duration map for overlay animations' hide phase (ms)
  getOverlayOutDurationMs() {
    switch (this.getElementSettings('animation_type')) {
      case 'flip':
        return 1200;
      case 'slide':
      case 'slide-down':
        return 600;
      case 'drop-in':
        return 800;
      default:
        return 800;
    }
  },
  // Rotation engine with explicit show/hide phases and inline width transitions
  async runOverlayLoop() {
    const settings = this.getSettings();
    const classes = settings.classes;
    // Read animation type where needed to avoid unused variable
    const animType = this.getElementSettings('animation_type');
    const $words = this.elements.$dynamicText;
    let $current = $words.filter('.' + classes.textActive).eq(0);
    if (!$current.length) {
      $current = $words.eq(0);
      $current.addClass(classes.textActive).removeClass(classes.textInactive);
    }
    // For overlay animations, stack non-active words absolutely so only the
    // active word participates in inline flow; let SCSS control display.
    if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animType) !== -1) {
      $words.not($current).css({
        position: 'absolute',
        left: 0,
        top: 0,
        pointerEvents: 'none'
      });
      $current.css({
        position: 'static',
        pointerEvents: ''
      });
    } else {
      $words.not($current).css({
        display: 'none',
        position: 'static',
        opacity: 1
      });
      $current.css({
        display: 'inline',
        position: 'static',
        opacity: 1
      });
    }
    // Keep wrapper natural so dynamic text stays inline with before/after
    this.elements.$dynamicWrapper.css('width', '');
    const outMs = this.getOverlayOutDurationMs();
    // noop

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const $next = this.getNextWord($current);
      if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animType) !== -1) {
        // Reset any previous state leakage
        this.elements.$dynamicText.not($current).removeClass(classes.textActive + ' ' + classes.textInactive);
        $next.removeClass(classes.textActive + ' ' + classes.textInactive);
        // Keep next out of flow initially to avoid width inflation; we'll place it inline at reveal time
        $next.css({
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none'
        });
      } else {
        $next.removeClass(classes.textActive).addClass(classes.textInactive).css({
          display: 'none',
          position: 'static',
          opacity: 1
        });
      }
      await this.sleep(this.getSettings('animationDelay'));
      // noop

      $current.removeClass(classes.textActive).addClass(classes.textInactive);
      await this.waitForAnimationEnd($current, outMs);
      // noop
      // Do not forcibly hide for overlay types; SCSS keyframes handle visibility.
      if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animType) === -1) {
        $current.css({
          display: 'none'
        });
      }

      // Reveal next inline and trigger its in-keyframe
      if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animType) !== -1) {
        // Prepare next for animation while kept out of flow
        this.forceReflow($next);
      } else {
        $next.css({
          display: 'inline',
          position: 'static',
          opacity: 1,
          pointerEvents: ''
        });
      }
      // noop
      if ($next[0]) {
        /* eslint-disable no-unused-expressions */
        $next[0].offsetWidth;
        /* eslint-enable no-unused-expressions */
      }
      $next.removeClass(classes.textInactive).addClass(classes.textActive);
      if (['flip', 'slide', 'slide-down', 'drop-in'].indexOf(animType) !== -1) {
        // Force keyframes to start; then take current out of flow and place next inline
        this.forceReflow($next);
        $current.css({
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none'
        });
        $next.css({
          position: 'static',
          pointerEvents: ''
        });
      }
      // noop
      $current = $next;
      if (!this.isLoopMode && $current.is(':last-child')) {
        break;
      }
    }
  },
  initHeading() {
    const headingStyle = this.getElementSettings('heading_style');
    if (this._headingInitialized) {
      return;
    }
    if ('rotate' === headingStyle) {
      try {
        // noop
      } catch (e) {}
      this.rotateHeading();
    } else if ('highlight' === headingStyle) {
      try {
        // noop
      } catch (e) {}
      this.addHighlight();
      this.activateHighlightAnimation();
    }
    this.deactivateScrollListener();
    this._headingInitialized = true;
  },
  activateHighlightAnimation() {
    const settings = this.getSettings(),
      classes = settings.classes,
      $heading = this.elements.$heading;
    $heading.removeClass(classes.hideHighlight).addClass(classes.activateHighlight);
    if (!this.isLoopMode) {
      return;
    }
    setTimeout(() => {
      $heading.removeClass(classes.activateHighlight).addClass(classes.hideHighlight);
    }, settings.highlightAnimationDuration + settings.highlightAnimationDelay * .8);
    setTimeout(() => {
      this.activateHighlightAnimation(false);
    }, settings.highlightAnimationDuration + settings.highlightAnimationDelay);
  },
  activateScrollListener() {
    const scrollBuffer = -100;
    if (!this.elements.$heading || !this.elements.$heading.length) {
      return;
    }
    this.intersectionObservers.startAnimation.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `0px 0px ${scrollBuffer}px`,
      callback: event => {
        try {
          // noop
        } catch (e) {}
        if (event.isInViewport) {
          this.initHeading();
        }
      }
    });
    this.intersectionObservers.startAnimation.element = this.elements.$heading[0];
    if (this.intersectionObservers.startAnimation.element) {
      this.intersectionObservers.startAnimation.observer.observe(this.intersectionObservers.startAnimation.element);
    }
  },
  deactivateScrollListener() {
    const obs = this.intersectionObservers.startAnimation && this.intersectionObservers.startAnimation.observer;
    const el = this.intersectionObservers.startAnimation && this.intersectionObservers.startAnimation.element;
    if (obs && el) {
      obs.unobserve(el);
    }
  }
});
function _default($scope) {
  new AnimatedHeading({
    $element: $scope
  });
}

},{"../utils/module":9}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Button = _module.default.extend({
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if (this.getInstanceValue('turn_to_popup_action_button') === 'yes') {
      this.registerEventForPopup();
    }
  },
  registerEventForPopup() {
    const self = this;
    this.$element.find('.raven-button').on('click', function () {
      const eventData = {
        actionType: self.getInstanceValue('popup_action_type'),
        popupId: $(this).closest('[data-elementor-type="jupiterx-popups"]').attr('data-elementor-id')
      };
      $(document).trigger('popup-button-clicked', eventData);
    });
  }
});
function _default($scope) {
  new Button({
    $element: $scope
  });
}

},{"../utils/module":9}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class CarouselBase extends elementorModules.frontend.handlers.SwiperBase {
  async onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const elementSettings = this.getElementSettings();
    if (1 >= this.getSlidesCount()) {
      return;
    }
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper(this.elements.$swiperContainer, this.getSwiperOptions());
    if ('yes' === elementSettings.pause_on_hover) {
      this.togglePauseOnHover(true);
    }

    // Expose the swiper instance in the frontend
    this.elements.$swiperContainer.data('swiper', this.swiper);
  }
  getDefaultSettings() {
    return {
      selectors: {
        swiperContainer: '.raven-main-swiper',
        swiperSlide: '.swiper-slide'
      },
      slidesPerView: {
        widescreen: 3,
        desktop: 3,
        laptop: 3,
        tablet_extra: 3,
        tablet: 2,
        mobile_extra: 2,
        mobile: 1
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors'),
      elements = {
        $swiperContainer: this.$element.find(selectors.swiperContainer)
      };
    elements.$slides = elements.$swiperContainer.find(selectors.swiperSlide);
    return elements;
  }
  getEffect() {
    return this.getElementSettings('effect');
  }
  getDeviceSlidesPerView(device) {
    const slidesPerViewKey = 'slides_per_view' + ('desktop' === device ? '' : '_' + device);
    if (this.getElementSettings(slidesPerViewKey)?.size) {
      return Math.min(this.getSlidesCount(), +this.getElementSettings(slidesPerViewKey)?.size || this.getSettings('slidesPerView')[device]);
    }
    return Math.min(this.getSlidesCount(), +this.getElementSettings(slidesPerViewKey) || this.getSettings('slidesPerView')[device]);
  }
  getSlidesPerView(device) {
    if ('slide' === this.getEffect()) {
      return this.getDeviceSlidesPerView(device);
    }
    return 1;
  }
  getDeviceSlidesToScroll(device) {
    const slidesToScrollKey = 'slides_to_scroll' + ('desktop' === device ? '' : '_' + device);
    return Math.min(this.getSlidesCount(), +this.getElementSettings(slidesToScrollKey) || 1);
  }
  getSlidesToScroll(device) {
    if ('slide' === this.getEffect() || 'coverflow' === this.getElementSettings('skin')) {
      return this.getDeviceSlidesToScroll(device);
    }
    return 1;
  }
  getSpaceBetween(device) {
    let propertyName = 'space_between';
    if (device && 'desktop' !== device) {
      propertyName += '_' + device;
    }
    return Number(this.getElementSettings(propertyName).size) || 0;
  }
  getSwiperOptions() {
    const elementSettings = this.getElementSettings();
    const swiperOptions = {
      grabCursor: true,
      initialSlide: this.getInitialSlide(),
      slidesPerView: this.getSlidesPerView('desktop'),
      slidesPerGroup: this.getSlidesToScroll('desktop'),
      spaceBetween: this.getSpaceBetween(),
      loop: 'yes' === elementSettings.loop,
      loopedSlides: elementSettings.loopedSlides,
      speed: elementSettings.speed,
      effect: this.getEffect(),
      preventClicksPropagation: false,
      slideToClickedSlide: true,
      handleElementorBreakpoints: true,
      centeredSlides: 'yes' === elementSettings.overflow_visible || 'yes' === elementSettings.centered_slides
    };
    if ('yes' === elementSettings.lazyload || this.elements.$swiperContainer.find('img').hasClass('swiper-lazy')) {
      swiperOptions.lazy = {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      };
    }
    if (elementSettings.show_arrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }
    if (elementSettings.pagination) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: elementSettings.pagination,
        clickable: true
      };
    }
    if ('cube' !== this.getEffect()) {
      const breakpointsSettings = {},
        breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      Object.keys(breakpoints).forEach(breakpointName => {
        breakpointsSettings[breakpoints[breakpointName].value] = {
          slidesPerView: this.getSlidesPerView(breakpointName),
          slidesPerGroup: this.getSlidesToScroll(breakpointName),
          spaceBetween: this.getSpaceBetween(breakpointName)
        };
      });
      swiperOptions.breakpoints = breakpointsSettings;
    }
    if (elementSettings.autoplay) {
      swiperOptions.autoplay = {
        delay: elementSettings.autoplay_speed,
        disableOnInteraction: !!elementSettings.pause_on_interaction
      };
    }
    const swiperWrapper = this.findElement('.raven-swiper');
    if (this.$element[0]?.classList?.contains('elementor-widget-raven-media-carousel')) {
      swiperOptions.on = {
        init: () => {
          swiperWrapper[0].classList.add('media-carousel-initiated');
          if (swiperWrapper[1]) {
            swiperWrapper[1].classList.add('media-carousel-initiated');
          }
        }
      };
    }
    return swiperOptions;
  }
  getDeviceBreakpointValue(device) {
    if (!this.breakpointsDictionary) {
      const breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      this.breakpointsDictionary = {};
      Object.keys(breakpoints).forEach(breakpointName => {
        this.breakpointsDictionary[breakpointName] = breakpoints[breakpointName].value;
      });
    }
    return this.breakpointsDictionary[device];
  }
  updateSpaceBetween(propertyName) {
    const deviceMatch = propertyName.match('space_between_(.*)'),
      device = deviceMatch ? deviceMatch[1] : 'desktop',
      newSpaceBetween = this.getSpaceBetween(device);
    if ('desktop' !== device) {
      this.swiper.params.breakpoints[this.getDeviceBreakpointValue(device)].spaceBetween = newSpaceBetween;
    }
    this.swiper.params.spaceBetween = newSpaceBetween;
    this.swiper.update();
  }
  getChangeableProperties() {
    return {
      autoplay: 'autoplay',
      pause_on_hover: 'pauseOnHover',
      pause_on_interaction: 'disableOnInteraction',
      autoplay_speed: 'delay',
      speed: 'speed',
      width: 'width'
    };
  }
  updateSwiperOption(propertyName) {
    if (0 === propertyName.indexOf('width')) {
      this.swiper.update();
      return;
    }
    const elementSettings = this.getElementSettings(),
      newSettingValue = elementSettings[propertyName],
      changeableProperties = this.getChangeableProperties();
    let propertyToUpdate = changeableProperties[propertyName],
      valueToUpdate = newSettingValue;

    // Handle special cases where the value to update is not the value that the Swiper library accepts
    switch (propertyName) {
      case 'autoplay':
        valueToUpdate = false;
        if (newSettingValue) {
          valueToUpdate = {
            delay: elementSettings.autoplay_speed,
            disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
          };
        }
        break;
      case 'autoplay_speed':
        propertyToUpdate = 'autoplay';
        valueToUpdate = {
          delay: newSettingValue,
          disableOnInteraction: 'yes' === elementSettings.pause_on_interaction
        };
        break;
      case 'pause_on_hover':
        this.togglePauseOnHover('yes' === newSettingValue);
        break;
      case 'pause_on_interaction':
        valueToUpdate = 'yes' === newSettingValue;
        break;
    }

    // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library
    if ('pause_on_hover' !== propertyName) {
      this.swiper.params[propertyToUpdate] = valueToUpdate;
    }
    this.swiper.update();
  }
  onElementChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }
    if (0 === propertyName.indexOf('width')) {
      this.swiper.update();

      // If there is another thumbs slider, like in the Media Carousel widget.
      if (this.thumbsSwiper) {
        this.thumbsSwiper.update();
      }
      return;
    }

    // This is for handling the responsive control 'space_between'.
    if (0 === propertyName.indexOf('space_between')) {
      this.updateSpaceBetween(propertyName);
      return;
    }
    if (0 === propertyName.indexOf('pagination_gap')) {
      // See block comment above paginationGapPx().
      this.handlePaginationGap();
      if (this.swiper) {
        this.swiper.update();
      }
      return;
    }
    const changeableProperties = this.getChangeableProperties();
    if (changeableProperties.hasOwnProperty(propertyName)) {
      this.updateSwiperOption(propertyName);
    }
  }
  onEditSettingsChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }
    if ('activeItemIndex' === propertyName) {
      this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  }

  /*
   * --- Style › Pagination › Gap (outside dots / fraction) ---------------------------------
   *
   * What we inject
   *   One <style id="raven-pagination-gap-{elementId}"> on the main Swiper node. It only
   *   sets padding-bottom (plus optional box-sizing); we never set height from outerHeight+gap.
   *
   * Why not height (legacy)
   *   `height: outerHeight + gap` enlarged the Swiper viewport so slides with height:100%
   *   (media carousel) scaled up. Padding alone reserves space for bullets without that.
   *
   * Why parseFloat on .size (legacy)
   *   Elementor sliders often return a string. `outerHeight() + "6"` concatenates in JS and
   *   produced absurd values (e.g. 167772006px).
   *
   * Baseline cache (instance._ravenPaginationPaddingBasePx)
   *   Measured once from computed padding-bottom before our !important rule (e.g. 40px from
   *   SCSS). Totals are always baseline + gap so editor tweaks do not compound (re-reading
   *   computed padding after inject would add gap twice).
   *
   * Media carousel + box-sizing
   *   Skins use fixed height on .raven-main-swiper. With border-box, padding-bottom eats the
   *   slide box and squeezes images; we add content-box for this rule only.
   *
   * Editor
   *   Any control name starting with pagination_gap* triggers handlePaginationGap + update().
   *
   * Sanity cap
   *   Totals above PAGINATION_GAP_MAX_PADDING_PX in handlePaginationGap are skipped.
   */

  /**
   * Numeric px from an Elementor dimension control (slider).
   *
   * @param {Object|undefined} dimensionSetting Control value, e.g. { size: '12', unit: 'px' }.
   * @return {number} Non-negative px; NaN/empty → 0.
   */
  paginationGapPx(dimensionSetting) {
    if (!dimensionSetting || '' === dimensionSetting.size || undefined === dimensionSetting.size || null === dimensionSetting.size) {
      return 0;
    }
    const parsed = parseFloat(dimensionSetting.size);
    return isFinite(parsed) ? parsed : 0;
  }

  /**
   * @param {number} totalPaddingBottomPx baseline + gap
   * @param {number} maxPx sanity ceiling
   * @return {boolean} Whether the total is a finite positive value within maxPx.
   */
  isPaginationGapTotalAllowed(totalPaddingBottomPx, maxPx) {
    return isFinite(totalPaddingBottomPx) && totalPaddingBottomPx > 0 && totalPaddingBottomPx <= maxPx;
  }

  /**
   * CSS selector for this widget's main Swiper element (matches injected style specificity).
   *
   * @return {string} Selector beginning with .elementor-element-{id}.
   */
  getMainSwiperGapSelector() {
    const elementId = this.getID();
    const mainSwiperSelector = elementorFrontend.config.experimentalFeatures?.e_swiper_latest ? '.raven-main-swiper.swiper' : '.raven-main-swiper';
    return '.elementor-element-' + elementId + ' ' + mainSwiperSelector;
  }

  /**
   * Media carousel skins: fixed height + border-box ⇒ padding shrinks slides; content-box fixes.
   *
   * @return {boolean} True when this handler backs the Media Carousel widget.
   */
  shouldApplyContentBoxForPaginationGap() {
    return this.$element.hasClass('elementor-widget-raven-media-carousel');
  }

  /**
   * Single rule block: padding-bottom !important, optional box-sizing for media carousel.
   *
   * @param {string} selector Full selector from getMainSwiperGapSelector().
   * @param {number} totalPaddingBottomPx baseline + gap for this breakpoint.
   * @return {string} One CSS rule including trailing brace.
   */
  formatPaginationGapRule(selector, totalPaddingBottomPx) {
    const pieces = ['padding-bottom: ' + totalPaddingBottomPx + 'px !important'];
    if (this.shouldApplyContentBoxForPaginationGap()) {
      pieces.push('box-sizing: content-box !important');
    }
    return selector + '{ ' + pieces.join('; ') + '; }';
  }

  /**
   * Read theme / widget padding-bottom once per handler instance (before our inject changes it).
   *
   * @param {jQuery} $swiperContainer Main Swiper container.
   * @return {void}
   */
  cachePaginationPaddingBaseline($swiperContainer) {
    if (undefined !== this._ravenPaginationPaddingBasePx) {
      return;
    }
    const raw = parseInt($swiperContainer.css('padding-bottom'), 10);
    this._ravenPaginationPaddingBasePx = isNaN(raw) ? 0 : raw;
  }

  /**
   * Append responsive wrapper around a rule for Elementor breakpoints (largest max-width first).
   *
   * @param {string} ruleCss e.g. ".elementor-element-1 .raven-main-swiper{ ... }"
   * @param {number} maxWidthPx viewport max-width for this media query
   * @return {string} Media query wrapping ruleCss.
   */
  wrapPaginationGapMediaQuery(ruleCss, maxWidthPx) {
    return ' @media screen and (max-width:' + maxWidthPx + 'px) { ' + ruleCss + ' }';
  }

  /**
   * Writes or removes the gap stylesheet; id is stable so live edits replace content.
   *
   * @param {string} css Full stylesheet body (may be empty).
   * @return {void}
   */
  persistPaginationGapStyles(css) {
    const $container = this.elements.$swiperContainer;
    const styleId = 'raven-pagination-gap-' + this.getID();
    const $tag = $container.find('#' + styleId);
    if (!css) {
      $tag.remove();
      return;
    }
    if ($tag.length) {
      $tag.text(css);
    } else {
      $container.append('<style id="' + styleId + '">' + css + '</style>');
    }
  }

  /**
   * Sync padding under slides when "Gap" or responsive gap controls change (see section comment above).
   *
   * @return {void}
   */
  handlePaginationGap() {
    const $container = this.elements && this.elements.$swiperContainer;
    if (!$container || !$container.length) {
      return;
    }
    this.cachePaginationPaddingBaseline($container);

    // Reject runaway or corrupt totals (px).
    const PAGINATION_GAP_MAX_PADDING_PX = 8000;
    const selector = this.getMainSwiperGapSelector();
    const settings = this.getElementSettings();
    const baselinePx = this._ravenPaginationPaddingBasePx;
    const breakpoints = elementorFrontend.config.responsive.activeBreakpoints;
    let css = '';
    const desktopGapPx = this.paginationGapPx(settings.pagination_gap);
    if (settings.pagination_gap && desktopGapPx > 0) {
      const totalPx = baselinePx + desktopGapPx;
      if (this.isPaginationGapTotalAllowed(totalPx, PAGINATION_GAP_MAX_PADDING_PX)) {
        css += this.formatPaginationGapRule(selector, totalPx);
      }
    }
    Object.keys(breakpoints).reverse().forEach(deviceKey => {
      const responsiveControl = settings['pagination_gap_' + deviceKey];
      const gapPx = this.paginationGapPx(responsiveControl);
      if (!responsiveControl || gapPx <= 0) {
        return;
      }
      const totalPx = baselinePx + gapPx;
      if (!this.isPaginationGapTotalAllowed(totalPx, PAGINATION_GAP_MAX_PADDING_PX)) {
        return;
      }
      const rule = this.formatPaginationGapRule(selector, totalPx);
      const maxWidth = breakpoints[deviceKey].value;
      css += this.wrapPaginationGapMediaQuery(rule, maxWidth);
    });
    this.persistPaginationGapStyles(css);
  }
}
var _default = exports.default = CarouselBase;

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _base = _interopRequireDefault(require("../carousel/base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MediaCarousel extends _base.default {
  async onInit() {
    await super.onInit();
    const slidesCount = this.getSlidesCount();
    this.handlePaginationGap();
    if (!this.isSlideshow() || 1 >= slidesCount) {
      return;
    }
    const elementSettings = this.getElementSettings(),
      loop = 'yes' === elementSettings.loop,
      breakpointsSettings = {},
      breakpoints = elementorFrontend.config.responsive.activeBreakpoints,
      desktopSlidesPerView = this.getDeviceSlidesPerView('desktop');
    Object.keys(breakpoints).forEach(breakpointName => {
      breakpointsSettings[breakpoints[breakpointName].value] = {
        slidesPerView: this.getDeviceSlidesPerView(breakpointName),
        spaceBetween: this.getSpaceBetween(breakpointName)
      };
    });
    const thumbsSliderOptions = {
      slidesPerView: desktopSlidesPerView,
      initialSlide: this.getInitialSlide(),
      centeredSlides: elementSettings.centered_slides,
      slideToClickedSlide: true,
      spaceBetween: this.getSpaceBetween(),
      loopedSlides: slidesCount,
      loop,
      breakpoints: breakpointsSettings,
      handleElementorBreakpoints: true
    };
    if ('yes' === elementSettings.lazyload) {
      thumbsSliderOptions.lazy = {
        loadPrevNext: true,
        loadPrevNextAmount: 1
      };
    }
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper.controller.control = this.thumbsSwiper = await new Swiper(this.elements.$thumbsSwiper, thumbsSliderOptions);

    // Expose the swiper instance in the frontend
    this.elements.$thumbsSwiper.data('swiper', this.thumbsSwiper);
    this.thumbsSwiper.controller.control = this.swiper;
  }
  isSlideshow() {
    return 'slideshow' === this.getElementSettings('skin');
  }
  getDefaultSettings(...args) {
    const defaultSettings = super.getDefaultSettings(...args);
    if (this.isSlideshow()) {
      defaultSettings.selectors.thumbsSwiper = '.raven-thumbnails-swiper';
      defaultSettings.slidesPerView = {
        widescreen: 5,
        desktop: 5,
        laptop: 5,
        tablet_extra: 5,
        tablet: 4,
        mobile_extra: 4,
        mobile: 3
      };
    }
    return defaultSettings;
  }
  getSlidesPerViewSettingNames() {
    if (!this.slideshowElementSettings) {
      this.slideshowElementSettings = ['slides_per_view'];
      const activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints;
      Object.keys(activeBreakpoints).forEach(breakpointName => {
        this.slideshowElementSettings.push('slides_per_view_' + breakpointName);
      });
    }
    return this.slideshowElementSettings;
  }
  getElementSettings(setting) {
    if (-1 !== this.getSlidesPerViewSettingNames().indexOf(setting) && this.isSlideshow()) {
      setting = 'slideshow_' + setting;
    }
    return super.getElementSettings(setting);
  }
  getDefaultElements(...args) {
    const selectors = this.getSettings('selectors'),
      defaultElements = super.getDefaultElements(...args);
    if (this.isSlideshow()) {
      defaultElements.$thumbsSwiper = this.$element.find(selectors.thumbsSwiper);
    }
    return defaultElements;
  }
  getEffect() {
    if ('coverflow' === this.getElementSettings('skin')) {
      return 'coverflow';
    }
    return super.getEffect();
  }
  getSlidesPerView(device) {
    if (this.isSlideshow()) {
      return 1;
    }
    if ('coverflow' === this.getElementSettings('skin')) {
      return this.getDeviceSlidesPerView(device);
    }
    if ('carousel' === this.getElementSettings('skin') && 'slide' === this.getElementSettings('effect') && 'yes' === this.getElementSettings('overflow_visible')) {
      return this.getDeviceSlidesPerView(device) + 0.5;
    }
    return super.getSlidesPerView(device);
  }
  getSwiperOptions() {
    const options = super.getSwiperOptions();
    if (this.isSlideshow()) {
      options.loopedSlides = this.getSlidesCount();
      delete options.pagination;
      delete options.breakpoints;
    }
    return options;
  }
}
function _default($scope) {
  new MediaCarousel({
    $element: $scope
  });
}

},{"../carousel/base":32}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _base = _interopRequireDefault(require("../carousel/base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TestimonialCarousel extends _base.default {
  async onInit() {
    await super.onInit();
    this.handlePaginationGap();
  }
  getDefaultSettings() {
    const defaultSettings = super.getDefaultSettings();
    defaultSettings.slidesPerView = {
      desktop: 1
    };
    Object.keys(elementorFrontend.config.responsive.activeBreakpoints).forEach(breakpointName => {
      defaultSettings.slidesPerView[breakpointName] = 1;
    });
    if (defaultSettings.loop) {
      defaultSettings.loopedSlides = this.getSlidesCount();
    }
    return defaultSettings;
  }
  getEffect() {
    return 'slide';
  }
}
function _default($scope) {
  new TestimonialCarousel({
    $element: $scope
  });
}

},{"../carousel/base":32}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
$ = jQuery;
const Cart = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        shippingMethods: 'ul.woocommerce-shipping-methods li',
        productName: '.cart_item .product-name',
        productQuantity: '.cart_item .product-quantity'
      }
    };
  },
  bindEvents() {
    this.fixVariationStyle();
    this.fixDividerStyle();
    this.fixShippingAjaxStyle();
    this.handleShippingMethodList();
    this.handleQuantityInput();
    this.fixQuantityStyle();
    this.addClassToWooWrapper();
    jQuery(document.body).on('updated_wc_div', this.handleShippingMethodList);
    jQuery(document.body).on('updated_cart_totals', this.handleShippingMethodList);
    jQuery(document.body).on('updated_cart_totals', this.handleQuantityInput);
  },
  onElementChange(propertyName) {
    if (propertyName === 'sections_titles_typography_font_size') {
      this.fixVariationStyle();
    }
    if (propertyName === 'cart_divider_weight' || propertyName === 'cart_divider_gap') {
      this.fixDividerStyle();
    }
    if (propertyName === 'cart_quantity_width') {
      this.fixQuantityStyle();
    }
  },
  addClassToWooWrapper() {
    if (!document.body.classList.contains('woocommerce-cart')) {
      return;
    }
    document.body.classList.add('raven-cart-wiget-cart-page');
  },
  fixVariationStyle() {
    const selectors = this.getSettings('selectors');
    const productNameFontSize = this.$element.find(selectors.productName).find('a').css('font-size');
    const productVariations = this.$element.find(selectors.productName).find('.product-variations');
    if (productNameFontSize) {
      productVariations.find('div').css('font-size', 'calc(' + productNameFontSize + ' * 0.7)');
      productVariations.find('span').css('font-size', 'calc(' + productNameFontSize + ' * 0.7)');
    }
  },
  fixDividerStyle() {
    const currentPaddingTop = parseFloat(this.$element.find('.cart_item').find('td').css('padding-top'));
    const dividerWeight = this.getInstanceValue('cart_divider_weight');
    if (dividerWeight.size) {
      this.$element.find('.woocommerce-cart-form__contents').find('tbody').find('.cart_item:not(:first-child)').find('td').css('padding-top', dividerWeight.size + currentPaddingTop);
      this.$element.find('.woocommerce-cart-form__contents').find('tbody').find('.actions').css('padding-top', dividerWeight.size + currentPaddingTop);
    }
  },
  fixQuantityStyle() {
    const selectors = this.getSettings('selectors');
    if (!this.getInstanceValue('cart_quantity_width')) {
      return;
    }
    if (this.getInstanceValue('cart_quantity_width')?.unit === 'px') {
      this.$element.find(selectors.productQuantity).find('input').css('width', this.getInstanceValue('cart_quantity_width')?.size + 'px');
      return;
    }
    const parentWidth = parseFloat(this.$element.find(selectors.productQuantity).css('width'));
    const unit = this.getInstanceValue('cart_quantity_width').unit;
    const value = this.getInstanceValue('cart_quantity_width').size;
    let pixelValue = 0;
    if (unit === '%') {
      pixelValue = value / 100 * parentWidth;
    } else if (unit === 'em') {
      pixelValue = value * parentWidth;
    }
    if (pixelValue !== 0) {
      if (this.getInstanceValue('cart_quantity_view') === 'plus_minus') {
        const plusMinusWidth = parseFloat(this.$element.find(selectors.productQuantity).find('.input-group-prepend').css('width'));
        pixelValue = pixelValue - plusMinusWidth * 2;
        this.$element.find(selectors.productQuantity).find('input').css('flex', 'inherit');
      }
      this.$element.find(selectors.productQuantity).find('input').css('width', pixelValue + 'px');
    }
  },
  fixShippingAjaxStyle() {
    $(document).ajaxComplete((event, xhr, settings) => {
      if (settings.url.indexOf('wc-ajax=update_shipping_method') !== -1) {
        if (!this.getInstanceValue('cart_items_continue_shopping')) {
          $('.elementor-widget-raven-cart.elementor-element-' + this.getID() + ' .jupiterx-continue-shopping').hide();
        }
        $('.elementor-widget-raven-cart.elementor-element-' + this.getID() + ' .checkout-button').text(this.getInstanceValue('checkout_button_text'));
        $('.elementor-widget-raven-cart.elementor-element-' + this.getID() + ' .cart_totals h2').text(this.getInstanceValue('totals_section_title'));
      }
    });
  },
  handleShippingMethodList() {
    const selectors = this.getSettings('selectors');
    if (this.$element.find(selectors.shippingMethods).length < 1) {
      return;
    }
    this.$element.find(selectors.shippingMethods).each((index, item) => {
      // eslint-disable-line no-unused-vars
      const radioSpan = $(item).find('.raven-cart-shipping-method-radio');
      if (radioSpan.length < 1) {
        $(item).find('input').after('<span class="raven-cart-shipping-method-radio"></span>');
      }
    });
    this.handleRadioSpan();
  },
  handleQuantityInput() {
    if (this.getInstanceValue('cart_quantity_view') === 'plus_minus') {
      this.$element.find('.cart_item').each((index, element) => {
        if ($(element).find('.input-group-prepend').length === 0) {
          $(element).find('.input-text.qty').hide();
          $(element).find('.input-text.qty').after('<div class=\"input-group input-text qty text custom-qty-input \"><div class=\"input-group-prepend\"><button style=\"min-width: 0; box-shadow: none;\" class=\"btn btn-decrement btn-sm btn-outline-secondary\" type=\"button\" tabindex=\"-1\"><span>-</span></button></div><input type=\"text\" value="" style=\"text-align: center\" class=\"form-control input-text qty text\" placeholder=\"\" tabindex=\"-1\"><div class=\"input-group-append\"><button style=\"min-width: 0; box-shadow: none;\" class=\"btn btn-increment btn-sm btn-outline-secondary\" type=\"button\" tabindex=\"-1\"><span>+</span></button></div></div>');
          $(element).find('.custom-qty-input').find('.input-text.qty').val($(element).find('.input-text.qty').val());

          // Change quantity value on input change.
          $(element).on('paste change', '.custom-qty-input .qty', () => {
            $(element).find('.input-text.qty').val($(element).find('.custom-qty-input').find('.input-text.qty').val());
          });

          // Increment quantity.
          $(element).on('click', '.btn-increment', () => {
            $(element).find('.input-text.qty').val((i, oldVal) => {
              return parseInt(oldVal, 10) + 1;
            }).trigger('change');
          });

          // Decrement quantity.
          $(element).on('click', '.btn-decrement', () => {
            $(element).find('.input-text.qty').val((i, oldVal) => {
              if (parseInt(oldVal, 10) > 1) {
                return parseInt(oldVal, 10) - 1;
              }
              return parseInt(oldVal, 10);
            }).trigger('change');
          });
        }
      });
    }
  },
  handleRadioSpan() {
    const radioSpan = document.getElementsByClassName('raven-cart-shipping-method-radio');
    Object.values(radioSpan).forEach((sapn, index) => {
      // eslint-disable-line no-unused-vars
      sapn.addEventListener('click', event => {
        event.currentTarget.previousElementSibling.click();
      });
    });
  }
});
function _default($scope) {
  new Cart({
    $element: $scope
  });
}

},{"../utils/module":9}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
var _masonry = _interopRequireDefault(require("../utils/masonry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Categories = _module.default.extend({
  Masonry: null,
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if (this.getInstanceValue('layout') === 'masonry') {
      this.createMasonry();
    }
  },
  createMasonry() {
    this.Masonry = new _masonry.default({
      $element: this.$element
    });
    this.Masonry.run();
  }
});
function _default($scope) {
  new Categories({
    $element: $scope
  });
}

},{"../utils/masonry":8,"../utils/module":9}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CircleProgress = _module.default.extend({
  breakpoints: {},
  animation: false,
  progress: 0,
  value: 0,
  circumference: 0,
  getDefaultSettings() {
    return {
      selectors: {
        wrapper: '.raven-circle-progress-container',
        counterNumber: '.raven-circle-progress-counter-number',
        bar: '.raven-circle-progress-bar',
        meter: '.raven-circle-progress-meter',
        value: '.raven-circle-progress-value'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $wrapper: this.$element.find(selectors.wrapper),
      $counterNumber: this.$element.find(selectors.counterNumber),
      $bar: this.$element.find(selectors.bar),
      $meter: this.$element.find(selectors.meter),
      $value: this.$element.find(selectors.value)
    };
  },
  bindEvents() {
    this.setValues();
    if (parseInt(this.value) === 0) {
      return;
    }
    this.handleBar();
    this.handleCounter();
    this.handleResize();
  },
  setValues() {
    this.progress = this.elements.$bar[0].getAttribute('value') / 100;
    this.value = this.elements.$value[0].getAttribute('data-value');
    this.circumference = parseInt(this.elements.$bar[0].getAttribute('circumference'));
  },
  createObserver($wrapper, data) {
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          data.fromValue = 0;
          data.toValue = this.value;
          data.duration = this.getInstanceValue('duration');
          this.elements.$counterNumber.numerator(data);

          // animate progress
          this.animation = true;
          const dashOffset = this.circumference * (1 - this.progress);
          this.elements.$value.css({
            transitionDuration: data.duration + 'ms',
            strokeDashoffset: dashOffset
          });
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.8
    });
    observer.observe($wrapper[0]);
  },
  handleCounter() {
    const data = {};
    data.fromValue = 0;
    if (this.getInstanceValue('separate_Ttousands') === 'yes') {
      data.delimiter = ',';
    }
    this.createObserver(this.elements.$wrapper, data);
  },
  handleBar() {
    const activeBreakpoints = elementorFrontend.config.responsive.activeBreakpoints,
      currentDeviceMode = elementorFrontend.getCurrentDeviceMode(),
      settings = this.getElementSettings(),
      self = this;
    activeBreakpoints.desktop = [];
    if (activeBreakpoints[currentDeviceMode]) {
      Object.keys(activeBreakpoints).reverse().forEach(breakpointName => {
        let size = 'desktop' === breakpointName ? settings.circle_size.size : settings[`circle_size_${breakpointName}`].size,
          meter = 'desktop' === breakpointName ? settings.progress_circle_thickness.size : settings[`progress_circle_thickness_${breakpointName}`].size,
          value = 'desktop' === breakpointName ? settings.progress_indicator_thickness.size : settings[`progress_indicator_thickness_${breakpointName}`].size;
        size = self.handleEmptyValues(size, 'size');
        meter = self.handleEmptyValues(meter, 'meter');
        value = self.handleEmptyValues(value, 'value');
        const viewBox = `0 0 ${size} ${size}`,
          center = size / 2,
          thickness = value >= meter ? value : meter,
          radius = center - thickness / 2,
          circumference = 2 * Math.PI * radius;
        self.breakpoints[breakpointName] = {
          size,
          meter,
          value,
          viewBox,
          center,
          thickness,
          radius,
          circumference
        };
      });
    }
    self.updateSvg(self.breakpoints[currentDeviceMode].size, self.breakpoints[currentDeviceMode].viewBox, self.breakpoints[currentDeviceMode].center, self.breakpoints[currentDeviceMode].radius, self.breakpoints[currentDeviceMode].value, self.breakpoints[currentDeviceMode].meter, self.breakpoints[currentDeviceMode].circumference);
  },
  handleEmptyValues(value, name) {
    if (!!value) {
      return value;
    }
    const lastIndex = Object.keys(this.breakpoints).length - 1;
    if (lastIndex < 0) {
      return value;
    }
    const key = Object.keys(this.breakpoints)[lastIndex];
    return this.breakpoints[key][name];
  },
  handleResize() {
    const self = this;
    $(window).on('resize orientationchange', () => {
      const currentDeviceMode = elementorFrontend.getCurrentDeviceMode();
      if (document.body.classList.contains('elementor-editor-active')) {
        self.breakpoints = {};
        setTimeout(() => self.handleBar());
        return;
      }
      self.updateSvg(self.breakpoints[currentDeviceMode].size, self.breakpoints[currentDeviceMode].viewBox, self.breakpoints[currentDeviceMode].center, self.breakpoints[currentDeviceMode].radius, self.breakpoints[currentDeviceMode].value, self.breakpoints[currentDeviceMode].meter, self.breakpoints[currentDeviceMode].circumference);
    });
  },
  updateSvg(size, viewBox, center, radius, value, meter, circumference) {
    const dashOffset = circumference * (1 - this.progress);
    this.elements.$bar.attr({
      width: size,
      height: size,
      'data-radius': radius,
      'data-circumference': circumference
    });
    this.elements.$bar[0].setAttribute('viewBox', viewBox);
    this.elements.$meter.attr({
      cx: center,
      cy: center,
      r: radius,
      'stroke-width': meter
    });
    if (this.animation) {
      this.elements.$value.css({
        transitionDuration: ''
      });
    }
    this.elements.$value.attr({
      cx: center,
      cy: center,
      r: radius,
      'stroke-width': value
    });
    this.elements.$value.css({
      strokeDasharray: circumference,
      strokeDashoffset: this.animation ? dashOffset : circumference
    });
  }
});
function _default($scope) {
  new CircleProgress({
    $element: $scope
  });
}

},{"../utils/module":9}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint no-undef: 0 */
const $ = jQuery;
const CodeHighlight = _module.default.extend({
  onInit() {
    Prism.highlightAllUnder(this.$element[0], false);

    // Advanced tabs widget compatibility.
    this.changeActiveTabEvent();
  },
  onElementChange(propertyName) {
    if ('code' === propertyName || 'height' === propertyName) {
      return;
    }
    if ('src' === propertyName) {
      const language = this.getElementSettings('src');
      this.addRelatedJs(language);
    }
    setTimeout(() => {
      Prism.highlightAllUnder(this.$element[0], false);
    }, 1500);
  },
  addRelatedJs(language) {
    const id = 'div[data-id="' + this.getID() + '"]';
    const wrapper = $(id);
    wrapper.empty();
    if ('cpp' === language || 'objectivec' === language) {
      wrapper.append('<script src="' + elementor.config.jx_assets_url + '/lib/code-highlight/prism-c.min.js" ></script>');
    }
    if ('scala' === language) {
      wrapper.append('<script src="' + elementor.config.jx_assets_url + '/lib/code-highlight/prism-java.min.js" ></script>');
    }
    if ('scss' === language || 'sass' === language) {
      wrapper.append('<script src="' + elementor.config.jx_assets_url + '/lib/code-highlight/prism-css.min.js" ></script>');
    }
  },
  changeActiveTabEvent() {
    document.addEventListener('jupiterxcore:advancedtabs:changeactivetab', () => {
      Prism.highlightAllUnder(this.$element[0], false);
    });
  }
});
function _default($scope) {
  new CodeHighlight({
    $element: $scope
  });
}

},{"../utils/module":9}],39:[function(require,module,exports){
(function ($) {
  $(document).on('click', '.raven-column-link', function (event) {
    const url = $(this).data('ravenLink');
    const target = $(this).data('ravenLinkTarget');
    handleLink($(this), url, target, event);
  });
  function handleLink($element, url, target, event) {
    if ($(event.target).filter('a, a *, .no-link, .no-link *').length) {
      return true;
    }

    /**
     * Handle popup & lightbox.
     *
     * @todo Find a proper way via Elementor Pro Javascript API.
     */
    if (url.match(/^#elementor-action/)) {
      if (!$element.find('.raven-column-link-dynamic').length) {
        $element.append(`<a class="raven-column-link-dynamic" href="${url}"></a>`);
      }
      return $element.find('.raven-column-link-dynamic').trigger('click');
    }

    // Handle hash (e.g. #section-id).
    if (url.match(/^#/)) {
      if ($(url).length) {
        return document.querySelector(url).scrollIntoView({
          behavior: 'smooth'
        });
      }
      return;
    }

    // Handle full url.
    window.open(url, target);
  }
})(jQuery);

},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default($scope) {
  const ravenContentSwitch = $scope.find('.raven-content-switch-container'),
    radioSwitch = ravenContentSwitch.find('.raven-content-switch-input'),
    contentList = ravenContentSwitch.find('.raven-content-switch-two-content'),
    defaultState = ravenContentSwitch.data('default_state'),
    primaryContentSide = contentList.find('li[data-type="raven-content-switch-monthly"]'),
    secondaryContentSide = contentList.find('li[data-type="raven-content-switch-yearly"]'),
    primaryLabel = $scope.find('.raven-content-switch-primary-label'),
    secondaryLabel = $scope.find('.raven-content-switch-secondary-label'),
    swtichButton = $scope.find('.raven-content-switch-button'),
    sides = {};
  radioSwitch.prop('checked', defaultState === 'primary');
  sides[0] = primaryContentSide;
  sides[1] = secondaryContentSide;
  radioSwitch.on('click', function (event) {
    let selectedFilter = $(event.target).val();
    if ($(this).hasClass('raven-content-switch-input-active')) {
      selectedFilter = 1;
      secondaryLabel.toggleClass('selected');
      primaryLabel.toggleClass('selected');
      $(this).toggleClass('raven-content-switch-input-normal raven-content-switch-input-active');
      swtichButton.toggleClass('primary secondary');
      hideNotSelectedItems(sides, selectedFilter);
    } else if ($(this).hasClass('raven-content-switch-input-normal')) {
      selectedFilter = 0;
      secondaryLabel.toggleClass('selected');
      primaryLabel.toggleClass('selected');
      $(this).toggleClass('raven-content-switch-input-normal raven-content-switch-input-active');
      swtichButton.toggleClass('primary secondary');
      hideNotSelectedItems(sides, selectedFilter);
    }
  });
  function hideNotSelectedItems(contentSides, filter) {
    $.each(contentSides, function (key) {
      if (Number.parseInt(key) !== Number.parseInt(filter)) {
        $(this).removeClass('raven-content-switch-is-visible').addClass('raven-content-switch-is-hidden');
      } else {
        $(this).addClass('raven-content-switch-is-visible').removeClass('raven-content-switch-is-hidden');
      }
    });
  }
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default($scope) {
  const $el = $scope.find('[data-raven-countdown]');
  const finalDate = $el.data('raven-countdown');
  const daysLabel = $el.data('raven-days') !== undefined ? $el.data('raven-days') : 'Day%!D';
  const hoursLabel = $el.data('raven-hours') !== undefined ? $el.data('raven-hours') : 'Hour%!H';
  const minutesLabel = $el.data('raven-minutes') !== undefined ? $el.data('raven-minutes') : 'Minute%!M';
  const secondsLabel = $el.data('raven-seconds') !== undefined ? $el.data('raven-seconds') : 'Second%!S';
  $el.countdown(finalDate, event => {
    $el.html(event.strftime(event.strftime(`
      <div class="raven-countdown-box raven-flex-1">
        <span class="raven-countdown-number">%D</span>
        <span class="raven-countdown-title"> ${daysLabel}</span>
      </div>
      <div class="raven-countdown-box raven-flex-1">
        <span class="raven-countdown-number">%H</span>
        <span class="raven-countdown-title"> ${hoursLabel}</span>
      </div>
      <div class="raven-countdown-box raven-flex-1">
        <span class="raven-countdown-number">%M</span>
        <span class="raven-countdown-title"> ${minutesLabel}</span>
      </div>
      <div class="raven-countdown-box raven-flex-1">
        <span class="raven-countdown-number">%S</span>
        <span class="raven-countdown-title"> ${secondsLabel}</span>
      </div>
    `)));
  });
}

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
function _default($scope) {
  $ = jQuery;
  const $counters = $scope.find('[data-raven-counter]');
  const createObserver = $counter => {
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const data = $counter.data();
          const decimalDigits = data.toValue.toString().match(/\.(.*)/);
          if (decimalDigits) {
            data.rounding = decimalDigits[1].length;
          }
          data.fromValue = $.trim($counter.text());
          $counter.numerator(data);
          observer.disconnect();
        }
      });
    });
    observer.observe($counter[0]);
  };
  $counters.each(function () {
    const $counter = $(this);
    createObserver($counter);
  });
}

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
var _i18n = require("@wordpress/i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Calculate safe scroll position for an element, centering it in the visible viewport area.
 * Accounts for sticky headers, admin bar, and other fixed UI elements.
 *
 * @param {HTMLElement} target The target element to scroll to.
 * @return {number} The calculated scroll top position.
 */
const getSafeScrollTop = target => {
  const $target = $(target);
  const header = $('.jupiterx-header');
  const headerSettings = header.data('jupiterx-settings') || {};
  const isHeaderSticked = $('.jupiterx-header-sticked').length > 0;
  const bodySelector = document.body;
  const adminBarHeight = $('#wpadminbar').height() || 0;
  const tbarHeight = $('.jupiterx-tbar').outerHeight() || 0;
  const bodyBorderWidth = parseInt($('.jupiterx-site-body-border').css('border-width'), 10) || 0;
  const initialOffsetTop = $target.offset().top;
  const targetHeight = $target.outerHeight() || 0;

  // Calculate the total height of fixed elements at the top.
  let fixedTopOffset = adminBarHeight + bodyBorderWidth + tbarHeight;

  // Check if header is sticky and overlaps or is currently sticked.
  const isStickyBehavior = 'sticky' === headerSettings.behavior;
  const isFixedBehavior = 'fixed' === headerSettings.behavior;

  // Case 1: Header is not sticked yet, but will stick (overlap behavior check).
  if (!isHeaderSticked && (!headerSettings.behavior || isStickyBehavior && headerSettings.overlap)) {
    fixedTopOffset += tbarHeight;
  }

  // Case 2: Custom sticky header template.
  const hasCustomStickyHeader = isStickyBehavior && (!headerSettings.stickyTemplate || headerSettings.stickyTemplate !== headerSettings.template);
  if (hasCustomStickyHeader) {
    const stickyHeaderHeight = $('.jupiterx-header-custom .elementor:last-of-type').outerHeight() || 0;
    fixedTopOffset += stickyHeaderHeight;
  }

  // Case 3: Standard sticky/fixed header.
  if (!hasCustomStickyHeader && (isStickyBehavior || isFixedBehavior && 'top' === headerSettings.position)) {
    fixedTopOffset += header.height() || 0;
  }

  // Fallback: Check body classes if settings aren't available (e.g. non-Elementor headers or legacy).
  if (!headerSettings.behavior && (bodySelector.classList.contains('jupiterx-header-fixed') || bodySelector.classList.contains('jupiterx-header-sticked'))) {
    fixedTopOffset += header.height() || 0;
  }

  // Calculate visible viewport height (excluding fixed elements).
  const viewportHeight = window.innerHeight;
  const visibleHeight = viewportHeight - fixedTopOffset;

  // Center the target in the visible area.
  // scrollTop = element position - fixed offset - half of remaining space + half of element height
  const centerOffset = (visibleHeight - targetHeight) / 2;
  let scrollTop = initialOffsetTop - fixedTopOffset - centerOffset;

  // Ensure we don't scroll above the document.
  scrollTop = Math.max(scrollTop, 0);
  return scrollTop;
};

// Track active scroll to prevent race conditions when multiple fields are invalid.
// The first invalid field to reach the scroll wins; others are skipped.
let activeScrollTarget = null;
const Form = _module.default.extend({
  form: null,
  captchaV3Ids: [],
  reCaptchaCheckTimeout: null,
  isMultiStep: false,
  itiCountry: null,
  onInit() {
    this.form = this.$element.find('.raven-form');
    this.isMultiStep = undefined !== this.form.attr('data-step');
    if (this.isMultiStep) {
      this.handleMultiStep(this.form);
    }
    this.initializeITI();
    const dateField = this.form.find('.flatpickr[type=text]');
    let locale = {
      firstDayOfWeek: 1
    };
    const customLocale = dateField.data('locale');
    if (customLocale !== undefined && customLocale !== 'default') {
      locale = customLocale;
    }
    dateField.flatpickr({
      locale,
      minuteIncrement: 1,
      disableMobile: 'true'
    });
    this.initCaptcha();
    this.onSubmit();
    window.onInvalidRavenFormField = this.onInvalidRavenFormField;
  },
  onSubmit() {
    const self = this;
    const form = self.form;
    form.on('submit', event => {
      event.preventDefault();
      if (!this.checkSaveState()) {
        return;
      }
      form.css('opacity', 0.5);
      this.fixTelBeforeSubmit();

      // Prepare form data.
      const formData = new FormData(form[0]);
      const validFormData = this.validateFormData(formData, form);
      if (!validFormData) {
        form.css('opacity', 1);
        return;
      }
      formData.append('action', 'raven_form_frontend');
      formData.append('referrer', location.toString());

      // Send request.
      jQuery.ajax({
        url: _wpUtilSettings.ajax.url,
        type: 'POST',
        dataType: 'json',
        data: formData,
        processData: false,
        contentType: false,
        success: self.doSuccess
      });
    });
  },
  validateFormData(formData, form) {
    const {
      maxFileUploadSize
    } = window.ravenTools;
    if (_.isEmpty(maxFileUploadSize)) {
      return true;
    }
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > maxFileUploadSize) {
        // eslint-disable-line no-undef
        const target = form.find(`input[name="${key}"]`),
          field = target.parents('.raven-field-group');
        field.find('small').remove();
        field.removeClass('raven-field-invalid');
        field.addClass('raven-field-invalid');
        field.append(`<small class="raven-form-text">${(0, _i18n.__)('This file size is not allowed.', 'jupiterx-core')}</small>`);
        return false;
      }
    }
    return true;
  },
  checkSaveState() {
    if (!this.isEdit) {
      return true;
    }
    const btn = jQuery(elementor.panel.el).find('button#elementor-panel-saver-button-publish');
    if (!btn.length || btn.hasClass('elementor-disabled')) {
      this.form.prev('div.elementor-alert.elementor-alert-info').remove();
      return true;
    }
    const adminErrorsNode = `
			<div class="elementor-alert elementor-alert-info" role="alert">
				<span class="elementor-alert-title">
					${(0, _i18n.__)('Please first update/publish the changes.', 'jupiterx-core')}
				</span>
			</div>
		`;
    this.form.before(adminErrorsNode);
    return false;
  },
  doSuccess(response) {
    // Message.
    this.showMessage(response);

    // Download.
    if (response.data.download_url) {
      window.open(response.data.download_url, '_blank');
    }

    // Redirect.
    if (!$.isEmptyObject(response.data.redirect_to)) {
      window.location.href = response.data.redirect_to;
    }
    if (!$.isEmptyObject(response.data.popup)) {
      const popupData = {};
      const popupParent = this.form.parents('.jupiterx-popup');
      if (response.data.popup[0].type === 'close' && popupParent.length !== 0) {
        popupData.constantly = response.data.popup[0].constantly === 'yes' ? true : false;
        const popupId = popupParent?.data('settings')?.id;
        if (popupId) {
          popupData.popupId = popupId;
        }
        $(document).trigger('jupiterx-popup-close-form-trigger', popupData);
        return;
      }
      popupData.popupId = response.data.popup[0].popupId;
      $(document).trigger('jupiterx-popup-open-trigger', popupData);
    }

    // Admin errors.
    if (!$.isEmptyObject(response.data.admin_errors)) {
      this.showAdminErrors(response.data.admin_errors);
    }

    // Reset recaptcha to initial state.
    this.captchaV3Ids.forEach(function (id) {
      return window.grecaptcha.reset(id);
    });
  },
  onInvalidRavenFormField(event) {
    const target = event.target;
    const type = target.dataset.type;
    const validity = target.validity;
    const i18n = window.ravenFormsTranslations.validation;
    if (validity.valueMissing) {
      target.setCustomValidity(i18n.required);

      // Claim the scroll slot immediately (synchronously) - first field wins.
      // If another field already claimed it, skip scrolling for this field.
      if (activeScrollTarget !== null) {
        return;
      }

      // Claim the scroll slot for this target.
      activeScrollTarget = target.id;

      // Use requestAnimationFrame to scroll AFTER the browser's native validation scroll completes.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const scrollTop = getSafeScrollTop(target);
          window.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });

          // Reset the scroll slot after a short delay to allow for new validation cycles.
          setTimeout(() => {
            activeScrollTarget = null;
          }, 100);
        });
      });
      return;
    }
    let message = '';
    switch (type) {
      case 'email':
        if (validity.typeMismatch || validity.patternMismatch) {
          message = i18n.invalidEmail;
        }
        break;
      case 'tel':
        const isITI = target.hasAttribute('data-iti-tel');
        if (isITI) {
          const validationMessages = window.ravenFormsTranslations.itiValidation;
          const inputItiInstance = window.intlTelInputGlobals.getInstance(target);
          const itiValidationCode = inputItiInstance.getValidationError();
          const areaCodeRequired = target.hasAttribute('data-iti-area-required');
          const mustBeTelType = target.getAttribute('data-iti-tel-type');
          const telType = `${inputItiInstance.getNumberType()}`;
          switch (itiValidationCode) {
            case 1:
              message = validationMessages.invalidCountryCode;
              break;
            case 2:
              message = validationMessages.tooShort;
              break;
            case 3:
              message = validationMessages.tooLong;
              break;
            case 4:
              message = areaCodeRequired ? validationMessages.areaCodeMissing : '';
              break;
            case 5:
              message = validationMessages.invalidLength;
              break;
            case -99:
              message = validationMessages.invalidGeneral;
              break;
            case 0:
            default:
              if ('all' !== mustBeTelType && telType !== mustBeTelType) {
                message = validationMessages.typeMismatch[mustBeTelType];
              }
          }
          break;
        }
        if (validity.typeMismatch || validity.patternMismatch) {
          message = i18n.invalidPhone;
        }
        break;
      case 'number':
        if (validity.typeMismatch || validity.patternMismatch) {
          message = i18n.invalidNumber;
        } else if (validity.rangeOverflow) {
          message = i18n.invalidMaxValue.replace('MAX_VALUE', target.max);
        } else if (validity.rangeUnderflow) {
          message = i18n.invalidMinValue.replace('MIN_VALUE', target.min);
        }
        break;
    }
    target.setCustomValidity(message);
  },
  showMessage(response) {
    const form = this.form;
    form.css('opacity', 1);
    $('.raven-form-response').remove();
    form.parent().find('.elementor-alert').remove();
    form.find('small').remove();
    form.find('.raven-field-group').removeClass('raven-field-invalid');
    form.parent().removeClass('raven-form-success');
    form.parent().addClass('raven-form-error');
    if (response.success) {
      form.trigger('reset');
      form.parent().removeClass('raven-form-error');
      form.parent().addClass('raven-form-success');
      form.trigger('submit_success', response.data);
    }
    $.each(response.data.errors, function (key, value) {
      const field = $('#raven-field-group-' + key);
      field.addClass('raven-field-invalid');
      field.append('<small class="raven-form-text">' + value + '</small>');
    });
    form.after('<div class="raven-form-response">' + response.data.message + '</div>');
  },
  showAdminErrors(adminErrors) {
    let errors = '';
    $.each(adminErrors, function (key, value) {
      errors += `<li>${value}</li>`;
    });
    this.form.before(`
			<div class="elementor-alert elementor-alert-info" role="alert">
				<span class="elementor-alert-title">
					${(0, _i18n.__)('Following messages are visible only for admin users.', 'jupiterx-core')}
				</span>
				<div class="elementor-alert-description">
					<ul>${errors}</ul>
				</div>
			</div>
		`);
  },
  initCaptcha() {
    const captchav3 = this.form.find('.raven-g-recaptcha:last');
    if (!captchav3.length) {
      return;
    }

    // If Google Recaptcha API is ready, run addRecaptcha().
    if (window.grecaptcha?.render) {
      this.addRecaptcha(captchav3);
      clearTimeout(this.reCaptchaCheckTimeout);
      return;
    }

    // Otherwise, recheck API availability frequently.
    this.reCaptchaCheckTimeout = setTimeout(this.initCaptcha, 350);
  },
  addRecaptcha(elementRecaptcha) {
    const settings = elementRecaptcha.data();
    const isV3 = 'v3' === settings.type;
    this.captchaV3Ids.forEach(id => window.grecaptcha.reset(id));
    const widgetId = window.grecaptcha.render(elementRecaptcha[0], settings);
    this.form.on('reset error', () => window.grecaptcha.reset(widgetId));
    if (!isV3) {
      elementRecaptcha.data('widgetId', widgetId);
      return;
    }
    this.captchaV3Ids.push(widgetId);
    this.form.find('button[type="submit"]').on('click', e => {
      e.preventDefault();
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(widgetId, {
          action: elementRecaptcha.data('action')
        }).then(token => {
          this.form.find('[name="g-recaptcha-response"]').remove();
          this.form.append(jQuery('<input>', {
            type: 'hidden',
            value: token,
            name: 'g-recaptcha-response'
          }));
          this.form.submit();
        });
      });
    });
  },
  // Multi step form ►START◄
  steps: [],
  indicators: [],
  buttons: [],
  stepsValidableFields: [],
  isProgressBar: false,
  progressMeter: null,
  handleMultiStep(form) {
    const formStepElements = form.children('.fields-step-wrapper');
    const stepIndicators = form.children('.raven-form__indicators').children().not('.raven-form__indicators__indicator__separator');
    const stepButtons = form.find('.step-button-next,.step-button-prev');
    this.steps = this.jqueryToArray(formStepElements);
    this.indicators = this.jqueryToArray(stepIndicators);
    this.buttons = this.jqueryToArray(stepButtons);
    this.stepsValidableFields = this.getStepsValidableFields();
    this.isProgressBar = this.isIndicatorProgressBar();
    this.progressMeter = this.isProgressBar ? this.indicators[0].find('.raven-form__indicators__indicator__progress__meter') : null;
    if (this.isProgressBar) {
      this.updateProgressMeter(0);
    }
    this.setStepButtonsOnClicks();
  },
  jqueryToArray(jqObj) {
    const result = [];
    jqObj.each((_, el) => {
      result.push($(el));
    });
    return result;
  },
  getStepsValidableFields() {
    const result = Array(this.steps.length);
    _.each(this.steps, (step, i) => {
      result[i] = [];
      const selection = step.find('*[oninvalid]');
      selection.each((_, el) => {
        result[i].push($(el));
      });
    });
    return result;
  },
  setStepButtonsOnClicks() {
    _.each(this.buttons, button => {
      const stepKey = button.attr('data-step-key');
      const isNext = button.hasClass('step-button-next');
      if (!stepKey) {
        return;
      }
      if (isNext) {
        button.click({
          destStep: +stepKey + 1,
          totalSteps: this.steps.length,
          inputsToValidate: this.stepsValidableFields[+stepKey]
        }, e => {
          // Validate fields before going to next step.
          let stepValidityResult = true;
          _.each(e.data.inputsToValidate, field => {
            if (!field[0].checkValidity()) {
              stepValidityResult = false;

              // Show invalidity message.
              if (e.data.destStep - 1 < e.data.totalSteps - 1) {
                field[0].reportValidity();
              }
            }
          });
          if (stepValidityResult) {
            this.moveToStep(e.data.destStep);
          }
        });
      }
      if (!isNext) {
        button.click({
          destStep: +stepKey - 1
        }, e => {
          this.moveToStep(e.data.destStep);
        });
      }
    });
  },
  moveToStep(stepKey) {
    _.each(this.steps, (step, i) => {
      if (i === stepKey) {
        step.removeClass('elementor-hidden');
      } else {
        step.addClass('elementor-hidden');
      }
    });
    if (this.isProgressBar) {
      this.updateProgressMeter(stepKey);
      return;
    }
    this.updateNormalIndicators(stepKey);
  },
  isIndicatorProgressBar() {
    return this.indicators[0].hasClass('raven-form__indicators__indicator__progress');
  },
  updateNormalIndicators(stepKey) {
    _.each(this.indicators, (indicator, i) => {
      if (i === stepKey) {
        this.stripStateClasses(indicator);
        indicator.addClass('raven-form__indicators__indicator--state-active');
      } else if (i > stepKey) {
        this.stripStateClasses(indicator);
        indicator.addClass('raven-form__indicators__indicator--state-inactive');
      } else {
        this.stripStateClasses(indicator);
        indicator.addClass('raven-form__indicators__indicator--state-completed');
      }
    });
  },
  stripStateClasses(indicator) {
    indicator.removeClass('raven-form__indicators__indicator--state-active');
    indicator.removeClass('raven-form__indicators__indicator--state-inactive');
    indicator.removeClass('raven-form__indicators__indicator--state-completed');
  },
  updateProgressMeter(stepKey) {
    const progress = (stepKey + 1) / this.steps.length * 100;
    this.progressMeter.css({
      width: `${progress}%`
    });
    this.progressMeter.html(`${Math.round(progress)}%`);
  },
  // Multi step form ►END◄

  // ITI ►START◄ (ITI plugin: Intelligent Tel Input).
  initializeITI() {
    const itiTelFields = this.form.find('input[data-iti-tel]');
    if (!itiTelFields.length) {
      return;
    }
    if (!window.itiCountry) {
      $.get('https://ipwho.is/', () => {}, 'json').always(response => {
        window.itiCountry = response && response.country_code ? response.country_code.toLowerCase() : 'us';
        this.setupTelFields(itiTelFields);
      });
    } else {
      this.setupTelFields(itiTelFields);
    }
  },
  setupTelFields(itiTelFields) {
    const iti = require('intl-tel-input');
    if (!iti) {
      return;
    }
    const allCountries = window.intlTelInputGlobals.getCountryData().map(item => item.iso2);
    const numberTypes = ['FIXED_LINE', 'MOBILE', 'FIXED_LINE_OR_MOBILE', 'TOLL_FREE', 'PREMIUM_RATE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL'];
    _.each(itiTelFields, input => {
      const allowDropdown = input.hasAttribute('data-iti-allow-dropdown');
      const countriesAttr = input.getAttribute('data-iti-country-include');
      const countries = countriesAttr ? countriesAttr.split(' ') : null;
      const isCountriesSet = countries && countries.length;
      const ipDetect = input.hasAttribute('data-iti-ip-detect');
      const placeHolderAttr = input.getAttribute('data-iti-tel-type');
      const args = {
        allowDropdown,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.16/js/utils.min.js',
        separateDialCode: true,
        placeholderNumberType: 'all' === placeHolderAttr ? 'MOBILE' : numberTypes[+placeHolderAttr],
        onlyCountries: isCountriesSet ? countries : allCountries,
        initialCountry: '',
        geoIpLookup: null
      };
      if (ipDetect) {
        args.initialCountry = isCountriesSet && !countries.includes(window.itiCountry) ? countries[0] : 'auto';
        args.geoIpLookup = success => success(window.itiCountry);
      }
      iti(input, args);
    });
  },
  fixTelBeforeSubmit() {
    const itiTelFields = this.form.find('input[data-iti-tel]');
    _.each(itiTelFields, input => {
      const internationalize = input.hasAttribute('data-iti-internationalize');
      if (internationalize) {
        const itiInstance = window.intlTelInputGlobals.getInstance(input);
        input.value = itiInstance.getNumber();
      }
    });
  }
  // ITI ►END◄.
});
function _default($scope) {
  new Form({
    $element: $scope
  });
}

},{"../utils/module":9,"@wordpress/i18n":104,"intl-tel-input":107}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const Hotspot = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        hotspot: '.raven-hotspot',
        tooltip: '.raven-hotspot__tooltip'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $hotspot: this.$element.find(selectors.hotspot),
      $hotspotsExcludesLinks: this.$element.find(selectors.hotspot).filter(':not(.raven-hotspot--no-tooltip)'),
      $tooltip: this.$element.find(selectors.tooltip)
    };
  },
  bindEvents() {
    const tooltipTrigger = this.getCurrentDeviceSetting('tooltip_trigger'),
      tooltipTriggerEvent = 'mouseenter' === tooltipTrigger ? 'mouseleave mouseenter' : tooltipTrigger;
    if (tooltipTriggerEvent !== 'none') {
      this.elements.$hotspotsExcludesLinks.on(tooltipTriggerEvent, event => this.onHotspotTriggerEvent(event));
    }
  },
  onDeviceModeChange() {
    this.elements.$hotspotsExcludesLinks.off();
    this.bindEvents();
  },
  onHotspotTriggerEvent(event) {
    const elementTarget = $(event.target),
      isHotspotButtonEvent = elementTarget.closest('.raven-hotspot__button').length,
      isTooltipMouseLeave = 'mouseleave' === event.type && (elementTarget.is('.raven-hotspot--tooltip-position') || elementTarget.parents('.raven-hotspot--tooltip-position').length),
      isMobile = 'mobile' === elementorFrontend.getCurrentDeviceMode(),
      isHotspotLink = elementTarget.closest('.raven-hotspot--link').length,
      triggerTooltip = !(isHotspotLink && isMobile && ('mouseleave' === event.type || 'mouseenter' === event.type));
    if (triggerTooltip && (isHotspotButtonEvent || isTooltipMouseLeave)) {
      const currentHotspot = $(event.currentTarget);
      this.elements.$hotspot.not(currentHotspot).removeClass('raven-hotspot--active');
      currentHotspot.toggleClass('raven-hotspot--active');
    }
  },
  // Fix bad UX of "Sequenced Animation" when editing other controls

  editorAddSequencedAnimation() {
    this.elements.$hotspot.toggleClass('raven-hotspot--sequenced', 'yes' === this.getElementSettings('hotspot_sequenced_animation'));
  },
  hotspotSequencedAnimation() {
    const isSequencedAnimation = this.getElementSettings('hotspot_sequenced_animation');
    const sequencedAnimation = this.getElementSettings('hotspot_sequenced_animation_duration');
    if ('no' === isSequencedAnimation) {
      return;
    } //start sequenced animation when element on viewport

    const hotspotObserver = elementorModules.utils.Scroll.scrollObserver({
      callback: event => {
        if (event.isInViewport) {
          hotspotObserver.unobserve(this.$element[0]); //add delay for each hotspot

          this.elements.$hotspot.each((index, element) => {
            if (0 === index) {
              return;
            }
            const sequencedAnimationDuration = sequencedAnimation ? sequencedAnimation.size : 1000;
            const animationDelay = index * (sequencedAnimationDuration / this.elements.$hotspot.length);
            element.style.animationDelay = animationDelay + 'ms';
          });
        }
      }
    });
    hotspotObserver.observe(this.$element[0]);
  },
  setTooltipPositionControl() {
    const tooltipAnimation = this.getElementSettings('tooltip_animation');
    const isDirectionAnimation = 'undefined' !== typeof tooltipAnimation && tooltipAnimation.match(/^raven-hotspot--(slide|fade)-direction/);
    if (isDirectionAnimation) {
      const tooltipPosition = this.getElementSettings('tooltip_position');
      this.elements.$tooltip.removeClass('raven-hotspot--tooltip-animation-from-left raven-hotspot--tooltip-animation-from-top raven-hotspot--tooltip-animation-from-right raven-hotspot--tooltip-animation-from-bottom');
      this.elements.$tooltip.addClass('raven-hotspot--tooltip-animation-from-' + tooltipPosition);
    }
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.hotspotSequencedAnimation();
    this.setTooltipPositionControl();
    if (window.elementor) {
      elementor.listenTo(elementor.channels.deviceMode, 'change', () => this.onDeviceModeChange());
    }
  },
  onElementChange(propertyName) {
    if (propertyName.startsWith('tooltip_position')) {
      this.setTooltipPositionControl();
    }
    if (propertyName.startsWith('hotspot_sequenced_animation')) {
      this.editorAddSequencedAnimation();
    }
  }
});
function _default($scope) {
  new Hotspot({
    $element: $scope
  });
}

},{"../utils/module":9}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const ImageAccordion = _module.default.extend({
  onInit() {
    this.addOnHover();
  },
  addOnHover() {
    const settings = this.getElementSettings(),
      wrapper = this.$element,
      length = $(wrapper).find('.jupiterx-image-accordion-item').length,
      activeSize = settings.active_size.size,
      flexGrow = activeSize / ((100 - activeSize) / (length - 1));
    this.onMouseLeave(flexGrow);

    // On hover.
    $(wrapper).find('.jupiterx-image-accordion-item').on('mouseover', function () {
      $(wrapper).find('.jupiterx-image-accordion-item').removeClass('jupiterx-active-image-accordion-item').css({
        'flex-grow': 1
      });
      $(this).addClass('jupiterx-active-image-accordion-item').css({
        'flex-grow': flexGrow
      });
    });

    // On first load.
    $(wrapper).find('.jupiterx-default-active-image-accordion-item').addClass('jupiterx-active-image-accordion-item').css({
      'flex-grow': flexGrow
    });
  },
  onMouseLeave(flexGrow) {
    const wrapper = this.$element;
    $(wrapper).find('.jupiterx-image-accordion-item').on('mouseleave', function () {
      $(wrapper).find('.jupiterx-image-accordion-item').css({
        'flex-grow': 1
      }).removeClass('jupiterx-active-image-accordion-item');

      // Reactivate default one when mouse leaving widget area.
      $(wrapper).find('.jupiterx-default-active-image-accordion-item').addClass('jupiterx-active-image-accordion-item').css({
        'flex-grow': flexGrow
      });
    });
  }
});
function _default($scope) {
  new ImageAccordion({
    $element: $scope
  });
}

},{"../utils/module":9}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ImageComparison = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        carouselWrapper: '.raven-swiper-slider',
        sliderWrapper: '.raven-image-comparison-swiper-container',
        itemsSlider: '.swiper-wrapper',
        slides: '.swiper-slide',
        comparison: '.raven-image-comparison-container'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $carouselWrapper: this.$element.find(selectors.carouselWrapper),
      $sliderWrapper: this.$element.find(selectors.sliderWrapper),
      $itemsSlider: this.$element.find(selectors.itemsSlider),
      $slides: this.$element.find(selectors.slides),
      $comparison: this.$element.find(selectors.comparison)
    };
  },
  getCarouselSettings() {
    return {
      slides_view: this.getInstanceValue('slides_view') || 1,
      slides_view_tablet: this.getInstanceValue('slides_view_tablet') || 1,
      slides_view_mobile: this.getInstanceValue('slides_view_mobile') || 1,
      slides_scroll: this.getInstanceValue('slides_scroll') || 1,
      slides_scroll_tablet: this.getInstanceValue('slides_scroll_tablet') || 1,
      slides_scroll_mobile: this.getInstanceValue('slides_scroll_mobile') || 1,
      enable_autoplay: this.getInstanceValue('autoplay'),
      autoplay_speed: this.getInstanceValue('autoplay_speed'),
      effect: this.getInstanceValue('effect'),
      transition_speed: this.getInstanceValue('speed'),
      show_dots: this.getInstanceValue('dots'),
      pause_on_hover: this.getInstanceValue('pause_on_hover')
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const self = this,
      settings = this.getCarouselSettings(),
      options = {
        allowTouchMove: false,
        draggable: false,
        slidesPerColumn: 0,
        slidesPerView: +settings.slides_view_mobile,
        slidesToScroll: +settings.slides_scroll_mobile || 1,
        spaceBetween: 24,
        slidesPerGroup: +settings.slides_scroll_mobile || 1,
        slidesPerGroupSkip: 0,
        autoplay: settings.enable_autoplay === 'yes' ? {
          delay: settings.autoplay_speed
        } : false,
        watchOverflow: false,
        speed: +settings.transition_speed,
        navigation: {
          nextEl: '.swiper-next-arrow',
          prevEl: '.swiper-prev-arrow'
        },
        appendArrows: this.elements.$sliderWrapper,
        autoHeight: true,
        breakpoints: {
          360: {
            slidesPerView: +settings.slides_view_mobile,
            slidesToScroll: +settings.slides_scroll_mobile || 1,
            spaceBetween: 24,
            slidesPerGroup: +settings.slides_scroll_mobile || 1,
            slidesPerGroupSkip: 0
          },
          768: {
            slidesPerView: +settings.slides_view_tablet,
            slidesToScroll: +settings.slides_scroll_tablet || 1,
            spaceBetween: 24,
            slidesPerGroup: +settings.slides_scroll_tablet || 1,
            slidesPerGroupSkip: 0
          },
          1024: {
            slidesPerView: +settings.slides_view,
            slidesToScroll: +settings.slides_scroll || 1,
            spaceBetween: 24,
            slidesPerGroup: +settings.slides_scroll || 1,
            slidesPerGroupSkip: 0
          }
        }
      };
    this.elements.$sliderWrapper.each(function (index, swiperContainer) {
      $(this).parents('.elementor-widget-raven-image-comparison').find('.raven-image-comparison').addClass('swiper-' + index);
      if (options.navigation) {
        options.navigation = {
          nextEl: $(swiperContainer).parents('.raven-image-comparison.swiper-' + index).find('.swiper-next-arrow')[0],
          prevEl: $(swiperContainer).parents('.raven-image-comparison.swiper-' + index).find('.swiper-prev-arrow')[0]
        };
      }
      options.pagination = false;
      if (settings.show_dots === 'yes') {
        options.pagination = {
          el: $(swiperContainer).parents('.raven-image-comparison.swiper-' + index).find('.swiper-pagination')[0],
          type: 'bullets',
          clickable: true
        };
      }
      if ('fade' === self.getInstanceValue('effect')) {
        options.effect = 'fade';
        options.fadeEffect = {
          crossFade: true
        };
      }

      /**
       * It should run Juxtapose before swiper to prevent wrong slide height.
       */
      if ('function' === typeof juxtapose.scanPage) {
        // eslint-disable-line no-undef
        juxtapose.scanPage('.raven-image-comparison .raven-juxtapose'); // eslint-disable-line no-undef
      }
      options.on = {};
      options.on.init = function () {
        self.setJXDimensions();
        self.elements.$carouselWrapper.addClass('raven-image-comparison-active');
      };
      options.on.update = options.on.init;
      let swiperObj = null;
      if ('undefined' === typeof Swiper) {
        const asyncSwiper = elementorFrontend.utils.swiper;
        new asyncSwiper(swiperContainer, options).then(newSwiperInstance => {
          swiperObj = newSwiperInstance; // eslint-disable-line
        });
      } else {
        swiperObj = new Swiper(swiperContainer, options); // eslint-disable-line
      }
      if ('yes' === settings.pause_on_hover && 'yes' === settings.enable_autoplay) {
        $(swiperContainer).on({
          mouseenter() {
            swiperObj.autoplay.stop();
          },
          mouseleave() {
            swiperObj.autoplay.start();
          }
        });
      }
      window.addEventListener('resize', () => {
        swiperObj = new Swiper(swiperContainer, options); // eslint-disable-line
      });

      // eslint-disable-next-line no-undef
      const resizeObserver = new ResizeObserver(() => {
        self.setJXDimensions();
      });
      resizeObserver.observe(swiperContainer);
    });
  },
  bindEvents() {
    const self = this;

    // We run it async, so swiper will be ready to set the dimensions.
    setTimeout(() => {
      self.setJXDimensions();
    }, 1);
  },
  setJXDimensions() {
    this.elements.$slides.each((index, slide) => {
      const placeHolderImage = $(slide).find('.placeholder-image'),
        height = placeHolderImage[0].clientHeight,
        width = slide.clientWidth,
        swiperHeight = $(placeHolderImage).parents('.swiper-wrapper').height();
      $(placeHolderImage).parents('.swiper-slide').find('.raven-juxtapose')[0].style.height = height + 'px';
      if (parseInt(swiperHeight) < 1 && 'object' === typeof elementor) {
        $(placeHolderImage).parents('.swiper-wrapper').css('height', height);
      }
      const jxImages = $(placeHolderImage).parents('.swiper-slide').find('.raven-juxtapose img');
      if (jxImages.length > 0) {
        jxImages[0].style.width = width + 'px';
        jxImages[1].style.width = width + 'px';
      }
    });
  }
});
function _default($scope) {
  new ImageComparison({
    $element: $scope
  });
}

},{"../utils/module":9}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
class Lottie extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        container: '.raven-lottie__container',
        containerLink: '.raven-lottie__container__link',
        animation: '.raven-lottie__animation',
        caption: '.raven-lottie__caption'
      },
      classes: {
        caption: 'raven-lottie__caption'
      }
    };
  }
  getDefaultElements() {
    const {
      selectors
    } = this.getSettings();
    return {
      $widgetWrapper: this.$element,
      $container: this.$element.find(selectors.container),
      $containerLink: this.$element.find(selectors.containerLink),
      $animation: this.$element.find(selectors.animation),
      $caption: this.$element.find(selectors.caption),
      $sectionParent: this.$element.closest('.elementor-section'),
      $columnParent: this.$element.closest('.elementor-column')
    };
  }
  onInit(...args) {
    super.onInit(...args);
    this.lottie = null;
    this.state = {
      isAnimationScrollUpdateNeededOnFirstLoad: true,
      isNewLoopCycle: false,
      isInViewport: false,
      loop: false,
      animationDirection: 'forward',
      currentAnimationTrigger: '',
      effectsRelativeTo: '',
      hoverOutMode: '',
      hoverArea: '',
      caption: '',
      playAnimationCount: 0,
      animationSpeed: 0,
      linkTimeout: 0,
      viewportOffset: {
        start: 0,
        end: 100
      }
    };
    this.intersectionObservers = {
      animation: {
        observer: null,
        element: null
      },
      lazyload: {
        observer: null,
        element: null
      }
    };
    this.animationFrameRequest = {
      timer: null,
      lastScrollY: 0
    };
    this.listeners = {
      collection: [],
      elements: {
        $widgetArea: {
          triggerAnimationHoverIn: null,
          triggerAnimationHoverOut: null
        },
        $container: {
          triggerAnimationClick: null
        }
      }
    };
    this.initLottie();
  }
  initLottie() {
    const lottieSettings = this.getLottieSettings();
    if (lottieSettings.lazyload) {
      this.lazyloadLottie();
      return;
    }
    this.generateLottie();
  }
  lazyloadLottie() {
    const bufferHeightBeforeTriggerLottie = 200;
    this.intersectionObservers.lazyload.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `0px 0px ${bufferHeightBeforeTriggerLottie}px`,
      callback: event => {
        if (event.isInViewport) {
          this.generateLottie();
          this.intersectionObservers.lazyload.observer.unobserve(this.intersectionObservers.lazyload.element);
        }
      }
    });
    this.intersectionObservers.lazyload.element = this.elements.$container[0];
    this.intersectionObservers.lazyload.observer.observe(this.intersectionObservers.lazyload.element);
  }
  generateLottie() {
    this.createLottieInstance();
    this.setLottieEvents();
  }
  createLottieInstance() {
    const lottieSettings = this.getLottieSettings();
    this.lottie = window.bodymovin.loadAnimation({
      container: this.elements.$animation[0],
      path: this.getAnimationPath(),
      renderer: lottieSettings.renderer,
      autoplay: false,
      // We always want to trigger the animation manually for considering start/end frame.
      name: 'lottie-widget'
    });
    // Expose the lottie instance in the frontend.
    this.elements.$animation.data('lottie', this.lottie);
  }
  getAnimationPath() {
    const lottieSettings = this.getLottieSettings();
    if (lottieSettings.source_json?.url && 'json' === lottieSettings.source_json.url.toLowerCase().substr(-4)) {
      return lottieSettings.source_json.url;
    }
    if (lottieSettings.source_external_url?.url) {
      return lottieSettings.source_external_url.url;
    }
    return window.lottie_defaultAnimationUrl.url;
  }
  setCaption() {
    const lottieSettings = this.getLottieSettings();
    if ('external_url' === lottieSettings.source || 'media_file' === lottieSettings.source && 'custom' === lottieSettings.caption_source) {
      const $captionElement = this.getCaptionElement();
      $captionElement.text(lottieSettings.caption);
    }
  }
  getCaptionElement() {
    if (!this.elements.$caption.length) {
      const {
        classes
      } = this.getSettings();
      this.elements.$caption = jQuery('<p>', {
        class: classes.caption
      });
      this.elements.$container.append(this.elements.$caption);
      return this.elements.$caption;
    }
    return this.elements.$caption;
  }
  setLottieEvents() {
    this.lottie.addEventListener('DOMLoaded', () => this.onLottieDomLoaded());
    this.lottie.addEventListener('complete', () => this.onComplete());
  }
  saveInitialValues() {
    const lottieSettings = this.getLottieSettings();

    /*
    These values of the animation are being changed during the animation runtime
    and saved in the lottie instance (and not in the state) for the instance expose in the frontend.
     */
    this.lottie.__initialTotalFrames = this.lottie.totalFrames;
    this.lottie.__initialFirstFrame = this.lottie.firstFrame;
    this.state.currentAnimationTrigger = lottieSettings.trigger;
    this.state.effectsRelativeTo = lottieSettings.effects_relative_to;
    this.state.viewportOffset.start = lottieSettings.viewport ? lottieSettings.viewport.sizes.start : 0;
    this.state.viewportOffset.end = lottieSettings.viewport ? lottieSettings.viewport.sizes.end : 100;
    this.state.animationSpeed = lottieSettings.play_speed?.size;
    this.state.linkTimeout = lottieSettings.link_timeout;
    this.state.caption = lottieSettings.caption;
    this.state.loop = lottieSettings.loop;
  }
  setAnimationFirstFrame() {
    const frame = this.getAnimationFrames();
    /*
    We need to subtract the initial first frame from the first frame for handling scenarios
    when the animation first frame is not 0, this way we always get the relevant first frame.
    example: when start point is 70 and initial first frame is 60, the animation should start at 10.
     */

    frame.first = frame.first - this.lottie.__initialFirstFrame;
    this.lottie.goToAndStop(frame.first, true);
  }
  initAnimationTrigger() {
    const lottieSettings = this.getLottieSettings();
    switch (lottieSettings.trigger) {
      case 'none':
        this.playLottie();
        break;
      case 'arriving_to_viewport':
        this.playAnimationWhenArrivingToViewport();
        break;
      case 'bind_to_scroll':
        this.playAnimationWhenBindToScroll();
        break;
      case 'on_click':
        this.bindAnimationClickEvents();
        break;
      case 'on_hover':
        this.bindAnimationHoverEvents();
        break;
    }
  }
  playAnimationWhenArrivingToViewport() {
    const offset = this.getOffset();
    this.intersectionObservers.animation.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `${offset.end}% 0% ${offset.start}%`,
      callback: event => {
        if (event.isInViewport) {
          this.state.isInViewport = true;
          this.playLottie();
          return;
        }
        this.state.isInViewport = false;
        this.lottie.pause();
      }
    });
    this.intersectionObservers.animation.element = this.elements.$widgetWrapper[0];
    this.intersectionObservers.animation.observer.observe(this.intersectionObservers.animation.element);
  }
  getOffset() {
    const lottieSettings = this.getLottieSettings(),
      start = -lottieSettings.viewport.sizes.start || 0,
      end = -(100 - lottieSettings.viewport.sizes.end) || 0;
    return {
      start,
      end
    };
  }
  playAnimationWhenBindToScroll() {
    const lottieSettings = this.getLottieSettings(),
      offset = this.getOffset();
    this.intersectionObservers.animation.observer = elementorModules.utils.Scroll.scrollObserver({
      offset: `${offset.end}% 0% ${offset.start}%`,
      callback: event => this.onLottieIntersection(event)
    });
    this.intersectionObservers.animation.element = 'viewport' === lottieSettings.effects_relative_to ? this.elements.$widgetWrapper[0] : document.documentElement;
    this.intersectionObservers.animation.observer.observe(this.intersectionObservers.animation.element);
  }
  updateAnimationByScrollPosition() {
    const lottieSettings = this.getLottieSettings();
    let percentage;
    if ('page' === lottieSettings.effects_relative_to) {
      percentage = this.getLottiePagePercentage();
    } else if ('fixed' === this.getCurrentDeviceSetting('_position')) {
      percentage = this.getLottieViewportHeightPercentage();
    } else {
      percentage = this.getLottieViewportPercentage();
    }
    let nextFrameToPlay = this.getFrameNumberByPercent(percentage);
    nextFrameToPlay = nextFrameToPlay - this.lottie.__initialFirstFrame;
    this.lottie.goToAndStop(nextFrameToPlay, true);
  }
  getLottieViewportPercentage() {
    return elementorModules.utils.Scroll.getElementViewportPercentage(this.elements.$widgetWrapper, this.getOffset());
  }
  getLottiePagePercentage() {
    return elementorModules.utils.Scroll.getPageScrollPercentage(this.getOffset());
  }
  getLottieViewportHeightPercentage() {
    return elementorModules.utils.Scroll.getPageScrollPercentage(this.getOffset(), window.innerHeight);
  }
  getFrameNumberByPercent(percent) {
    const frame = this.getAnimationFrames();
    /*
    In mobile devices the document height can be 'stretched' at the top and bottom points of the document,
    this 'stretched' will make percent to be either negative or larger than 100, therefore we need to limit percent between 0-100.
    */

    percent = Math.min(100, Math.max(0, percent));
    // Getting frame number by percent of range, considering start/end frame values if exist.
    return frame.first + (frame.last - frame.first) * (percent / 100);
  }
  getAnimationFrames() {
    const lottieSettings = this.getLottieSettings(),
      currentFrame = this.getAnimationCurrentFrame(),
      startPoint = this.getAnimationRange().start,
      endPoint = this.getAnimationRange().end;
    let firstFrame = this.lottie.__initialFirstFrame,
      lastFrame = 0 === this.lottie.__initialFirstFrame ? this.lottie.__initialTotalFrames : this.lottie.__initialFirstFrame + this.lottie.__initialTotalFrames;

    // Limiting min start point to animation first frame.
    if (startPoint && startPoint > firstFrame) {
      firstFrame = startPoint;
    }

    // limiting max end point to animation last frame.
    if (endPoint && endPoint < lastFrame) {
      lastFrame = endPoint;
    }

    /*
    Getting the relevant first frame after loop complete and when not bind to scroll.
    when the animation is in progress (no when a new loop start), the first frame should be the current frame.
    when the trigger is bind_to_scroll we DON'T need to get this functionality.
    */
    if (!this.state.isNewLoopCycle && 'bind_to_scroll' !== lottieSettings.trigger) {
      // When we have a custom start point, we need to check if the start point is larger than the last pause stop of the animation.
      firstFrame = startPoint && startPoint > currentFrame ? startPoint : currentFrame;
    }

    // Reverse Mode.
    if ('backward' === this.state.animationDirection && this.isReverseMode()) {
      firstFrame = currentFrame;
      lastFrame = startPoint && startPoint > this.lottie.__initialFirstFrame ? startPoint : this.lottie.__initialFirstFrame;
    }
    return {
      first: firstFrame,
      last: lastFrame,
      current: currentFrame,
      total: this.lottie.__initialTotalFrames
    };
  }
  getAnimationRange() {
    const lottieSettings = this.getLottieSettings();
    return {
      start: this.getInitialFrameNumberByPercent(lottieSettings.start_point.size),
      end: this.getInitialFrameNumberByPercent(lottieSettings.end_point.size)
    };
  }
  getInitialFrameNumberByPercent(percent) {
    percent = Math.min(100, Math.max(0, percent));
    return this.lottie.__initialFirstFrame + (this.lottie.__initialTotalFrames - this.lottie.__initialFirstFrame) * (percent / 100);
  }
  getAnimationCurrentFrame() {
    // When pausing the animation (when out of viewport) the first frame of the animation changes.
    return 0 === this.lottie.firstFrame ? this.lottie.currentFrame : this.lottie.firstFrame + this.lottie.currentFrame;
  }
  setLinkTimeout() {
    const lottieSettings = this.getLottieSettings();
    if ('on_click' === lottieSettings.trigger && lottieSettings.custom_link?.url && lottieSettings.link_timeout) {
      this.elements.$containerLink.on('click', event => {
        event.preventDefault();
        if (!this.isEdit) {
          setTimeout(() => {
            const tabTarget = 'on' === lottieSettings.custom_link.is_external ? '_blank' : '_self';
            window.open(lottieSettings.custom_link.url, tabTarget);
          }, lottieSettings.link_timeout);
        }
      });
    }
  }
  bindAnimationClickEvents() {
    this.listeners.elements.$container.triggerAnimationClick = () => {
      this.playLottie();
    };
    this.addSessionEventListener(this.elements.$container, 'click', this.listeners.elements.$container.triggerAnimationClick);
  }
  getLottieSettings() {
    const lottieSettings = this.getElementSettings();
    return {
      ...lottieSettings,
      lazyload: 'yes' === lottieSettings.lazyload,
      loop: 'yes' === lottieSettings.loop
    };
  }
  playLottie() {
    const frame = this.getAnimationFrames();
    this.lottie.stop();
    this.lottie.playSegments([frame.first, frame.last], true);
    // We reset the loop cycle state after playing the animation.
    this.state.isNewLoopCycle = false;
  }
  bindAnimationHoverEvents() {
    this.createAnimationHoverInEvents();
    this.createAnimationHoverOutEvents();
  }
  createAnimationHoverInEvents() {
    const lottieSettings = this.getLottieSettings(),
      $widgetArea = this.getHoverAreaElement();
    this.state.hoverArea = lottieSettings.hover_area;
    this.listeners.elements.$widgetArea.triggerAnimationHoverIn = () => {
      this.state.animationDirection = 'forward';
      this.playLottie();
    };
    this.addSessionEventListener($widgetArea, 'mouseenter', this.listeners.elements.$widgetArea.triggerAnimationHoverIn);
  }
  addSessionEventListener($el, event, callback) {
    $el.on(event, callback);
    this.listeners.collection.push({
      $el,
      event,
      callback
    });
  }
  createAnimationHoverOutEvents() {
    const lottieSettings = this.getLottieSettings(),
      $widgetArea = this.getHoverAreaElement();
    if ('pause' === lottieSettings.on_hover_out || 'reverse' === lottieSettings.on_hover_out) {
      this.state.hoverOutMode = lottieSettings.on_hover_out;
      this.listeners.elements.$widgetArea.triggerAnimationHoverOut = () => {
        if ('pause' === lottieSettings.on_hover_out) {
          this.lottie.pause();
          return;
        }
        this.state.animationDirection = 'backward';
        this.playLottie();
      };
      this.addSessionEventListener($widgetArea, 'mouseleave', this.listeners.elements.$widgetArea.triggerAnimationHoverOut);
    }
  }
  getHoverAreaElement() {
    const lottieSettings = this.getLottieSettings();
    if ('section' === lottieSettings.hover_area) {
      return this.elements.$sectionParent;
    } else if ('column' === lottieSettings.hover_area) {
      return this.elements.$columnParent;
    }
    return this.elements.$container;
  }
  setLoopOnAnimationComplete() {
    const lottieSettings = this.getLottieSettings();
    this.state.isNewLoopCycle = true;
    if (lottieSettings.loop && !this.isReverseMode()) {
      this.setLoopWhenNotReverse();
    } else if (lottieSettings.loop && this.isReverseMode()) {
      this.setReverseAnimationOnLoop();
    } else if (!lottieSettings.loop && this.isReverseMode()) {
      this.setReverseAnimationOnSingleTrigger();
    }
  }
  isReverseMode() {
    const lottieSettings = this.getLottieSettings();
    return 'yes' === lottieSettings.reverse_animation || 'reverse' === lottieSettings.on_hover_out && 'backward' === this.state.animationDirection;
  }
  setLoopWhenNotReverse() {
    const lottieSettings = this.getLottieSettings();
    if (lottieSettings.number_of_times > 0) {
      this.state.playAnimationCount++;
      if (this.state.playAnimationCount < lottieSettings.number_of_times) {
        this.playLottie();
        return;
      }
      this.state.playAnimationCount = 0;
      return;
    }
    this.playLottie();
  }
  setReverseAnimationOnLoop() {
    const lottieSettings = this.getLottieSettings();

    /*
    We trigger the reverse animation:
    either when we don't have any value in the 'Number of Times" field, and then it will be an infinite forward/backward loop,
    or, when we have a value in the 'Number of Times" field and then we need to limit the number of times of the loop cycles.
     */
    if (!lottieSettings.number_of_times || this.state.playAnimationCount < lottieSettings.number_of_times) {
      this.state.animationDirection = 'forward' === this.state.animationDirection ? 'backward' : 'forward';
      this.playLottie();
      /*
      We need to increment the count only on the backward movements,
      because forward movement + backward movement are equal together to one full movement count.
      */

      if ('backward' === this.state.animationDirection) {
        this.state.playAnimationCount++;
      }
      return;
    }

    // Reset the values for the loop counting for the next trigger.
    this.state.playAnimationCount = 0;
    this.state.animationDirection = 'forward';
  }
  setReverseAnimationOnSingleTrigger() {
    if (this.state.playAnimationCount < 1) {
      this.state.playAnimationCount++;
      this.state.animationDirection = 'backward';
      this.playLottie();
      return;
    } else if (this.state.playAnimationCount >= 1 && 'forward' === this.state.animationDirection) {
      this.state.animationDirection = 'backward';
      this.playLottie();
      return;
    }
    this.state.playAnimationCount = 0;
    this.state.animationDirection = 'forward';
  }
  setAnimationSpeed() {
    const lottieSettings = this.getLottieSettings();
    if (lottieSettings.play_speed) {
      this.lottie.setSpeed(lottieSettings.play_speed.size);
    }
  }
  onElementChange() {
    this.updateLottieValues();
    this.resetAnimationTrigger();
  }
  updateLottieValues() {
    const lottieSettings = this.getLottieSettings(),
      valuesComparison = [{
        sourceVal: lottieSettings.play_speed?.size,
        stateProp: 'animationSpeed',
        callback: () => this.setAnimationSpeed()
      }, {
        sourceVal: lottieSettings.link_timeout,
        stateProp: 'linkTimeout',
        callback: () => this.setLinkTimeout()
      }, {
        sourceVal: lottieSettings.caption,
        stateProp: 'caption',
        callback: () => this.setCaption()
      }, {
        sourceVal: lottieSettings.effects_relative_to,
        stateProp: 'effectsRelativeTo',
        callback: () => this.updateAnimationByScrollPosition()
      }, {
        sourceVal: lottieSettings.loop,
        stateProp: 'loop',
        callback: () => this.onLoopStateChange()
      }];
    valuesComparison.forEach(item => {
      if ('undefined' !== typeof item.sourceVal && item.sourceVal !== this.state[item.stateProp]) {
        this.state[item.stateProp] = item.sourceVal;
        item.callback();
      }
    });
  }
  onLoopStateChange() {
    const isInActiveViewportMode = 'arriving_to_viewport' === this.state.currentAnimationTrigger && this.state.isInViewport;
    if (this.state.loop && (isInActiveViewportMode || 'none' === this.state.currentAnimationTrigger)) {
      this.playLottie();
    }
  }
  resetAnimationTrigger() {
    const lottieSettings = this.getLottieSettings(),
      isTriggerChange = lottieSettings.trigger !== this.state.currentAnimationTrigger,
      isViewportOffsetChange = lottieSettings.viewport ? this.isViewportOffsetChange() : false,
      isHoverOutModeChange = lottieSettings.on_hover_out ? this.isHoverOutModeChange() : false,
      isHoverAreaChange = lottieSettings.hover_area ? this.isHoverAreaChange() : false;
    if (isTriggerChange || isViewportOffsetChange || isHoverOutModeChange || isHoverAreaChange) {
      this.removeAnimationFrameRequests();
      this.removeObservers();
      this.removeEventListeners();
      this.initAnimationTrigger();
    }
  }
  isViewportOffsetChange() {
    const lottieSettings = this.getLottieSettings(),
      isStartOffsetChange = lottieSettings.viewport.sizes.start !== this.state.viewportOffset.start,
      isEndOffsetChange = lottieSettings.viewport.sizes.end !== this.state.viewportOffset.end;
    return isStartOffsetChange || isEndOffsetChange;
  }
  isHoverOutModeChange() {
    const lottieSettings = this.getLottieSettings();
    return lottieSettings.on_hover_out !== this.state.hoverOutMode;
  }
  isHoverAreaChange() {
    const lottieSettings = this.getLottieSettings();
    return lottieSettings.hover_area !== this.state.hoverArea;
  }
  removeEventListeners() {
    this.listeners.collection.forEach(listener => {
      listener.$el.off(listener.event, null, listener.callback);
    });
  }
  removeObservers() {
    // Removing all observers.
    for (const type in this.intersectionObservers) {
      if (this.intersectionObservers[type].observer && this.intersectionObservers[type].element) {
        this.intersectionObservers[type].observer.unobserve(this.intersectionObservers[type].element);
      }
    }
  }
  removeAnimationFrameRequests() {
    window.cancelAnimationFrame(this.animationFrameRequest.timer);
  }
  onDestroy() {
    super.onDestroy();
    this.destroyLottie();
  }
  destroyLottie() {
    this.removeAnimationFrameRequests();
    this.removeObservers();
    this.removeEventListeners();
    this.elements.$animation.removeData('lottie');
    if (this.lottie) {
      this.lottie.destroy();
    }
  }
  onLottieDomLoaded() {
    this.saveInitialValues();
    this.setAnimationSpeed();
    this.setLinkTimeout();
    this.setCaption();
    this.setAnimationFirstFrame();
    this.initAnimationTrigger();
  }
  onComplete() {
    this.setLoopOnAnimationComplete();
  }
  onLottieIntersection(event) {
    if (event.isInViewport) {
      /*
      It's required to update the animation progress on first load when lottie is inside the viewport on load
      but, there is a problem when the browser is refreshed when the scroll bar is not in 0 position,
      in this scenario, after the refresh the browser will trigger 2 scroll events
      one trigger on immediate load and second after a f ew ms to move the scroll bar to previous position (before refresh)
      therefore, we use the this.state.isAnimationScrollUpdateNeededOnFirstLoad flag
      to make sure that this.updateAnimationByScrollPosition() function will be triggered only once.
       */
      if (this.state.isAnimationScrollUpdateNeededOnFirstLoad) {
        this.state.isAnimationScrollUpdateNeededOnFirstLoad = false;
        this.updateAnimationByScrollPosition();
      }
      this.animationFrameRequest.timer = window.requestAnimationFrame(() => this.onAnimationFrameRequest());
      return;
    }
    const frame = this.getAnimationFrames(),
      finalFrame = 'up' === event.intersectionScrollDirection ? frame.first : frame.last;
    this.state.isAnimationScrollUpdateNeededOnFirstLoad = false;
    window.cancelAnimationFrame(this.animationFrameRequest.timer);
    this.lottie.goToAndStop(finalFrame, true);
  }
  onAnimationFrameRequest() {
    // Making calculation only when there is a change with the scroll position.
    if (window.scrollY !== this.animationFrameRequest.lastScrollY) {
      this.updateAnimationByScrollPosition();
      this.animationFrameRequest.lastScrollY = window.scrollY;
    }
    this.animationFrameRequest.timer = window.requestAnimationFrame(() => this.onAnimationFrameRequest());
  }
}
function _default($scope) {
  new Lottie({
    $element: $scope
  });
}

},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MediaGallery = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        tabsWrapper: '.raven-media-gallery-tabs',
        contentsWrapper: '.raven-media-gallery-tab-contents',
        tabs: '.raven-media-gallery-tabs button.tab-item',
        contents: '.raven-media-gallery-tab-contents .content',
        items: '.gallery-item [class*="type-"]',
        galleryItems: '.gallery-item'
      },
      state: {
        activeIndex: 0
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $tabsWrapper: this.$element.find(selectors.tabsWrapper),
      $contentsWrapper: this.$element.find(selectors.contentsWrapper),
      $tabs: this.$element.find(selectors.tabs),
      $contents: this.$element.find(selectors.contents),
      $items: this.$element.find(selectors.items),
      $galleryItems: this.$element.find(selectors.galleryItems)
    };
  },
  bindEvents() {
    const self = this;
    this.zoom();
    this.zoomMove();
    setTimeout(() => {
      self.setHeight();
    }, 1);
    jQuery(window).resize(() => {
      self.setHeight();
    });
    if (!this.elements.$tabsWrapper[0]) {
      return;
    }
    this.elements.$tabsWrapper[0].addEventListener('click', event => {
      if (!event.target.classList.contains('tab-item')) {
        return;
      }
      let activeIndex = this.getSettings('state.activeIndex');
      if ('show' !== this.getInstanceValue('all_filter') && 0 === activeIndex) {
        activeIndex = 1;
      }
      const activeTab = this.elements.$tabsWrapper[0].querySelector('[data-raven-tab-index="' + activeIndex + '"]');
      const activeContent = this.elements.$contentsWrapper[0].querySelector('[data-raven-content-index="' + activeIndex + '"]');
      activeTab.classList.remove('active');
      activeContent.classList.remove('active');
      activeContent.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.remove('show-animation');
      });
      this.setSettings('state.activeIndex', event.target.dataset.ravenTabIndex);
      const newActiveContent = this.elements.$contentsWrapper[0].querySelector('[data-raven-content-index="' + event.target.dataset.ravenTabIndex + '"]');
      event.target.classList.add('active');
      newActiveContent.classList.add('active');
      newActiveContent.querySelectorAll('.gallery-item').forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show-animation');
        }, index * 100);
      });
      this.setHeight();
    });
  },
  zoom() {
    if (this.getInstanceValue('image_hover_animation') !== 'zoom') {
      return;
    }
    this.elements.$items.find('.poster').zoom();
  },
  zoomMove() {
    if (this.getInstanceValue('image_hover_animation') !== '3d-zoom') {
      return;
    }
    [...this.elements.$galleryItems].forEach(item => {
      const img = item.querySelector('img');
      if (!img) {
        return;
      }
      const isContentUnderImage = $(item).parents('.content-layout-under-image');
      if (isContentUnderImage.length > 0) {
        item = item.querySelector('[class*="type-"]');
      }
      item.addEventListener('mouseout', () => {
        img.style.transform = 'perspective(900px) translate3d( 0px, 0px, 0px ) scale(1)';
      });
      item.addEventListener('mousemove', event => {
        const bound = event.currentTarget.getBoundingClientRect(),
          scaleX = ((bound.width + 35) / bound.width).toFixed(2),
          scaleY = ((bound.height + 35) / bound.height).toFixed(2);
        let pageX = bound.width / 2 - (event.clientX - bound.left),
          pageY = bound.height / 2 - (event.clientY - bound.top);
        pageX = pageX / bound.width * 40;
        pageY = pageY / bound.height * 40;
        img.style.transform = `perspective(900px) translate3d( ${pageX}px, ${pageY}px, 0px ) scale(${Math.max(scaleX, scaleY)})`;
      });
    });
  },
  handleAnimation() {
    const activeItems = this.elements.$contentsWrapper[0].querySelectorAll('.active .gallery-item');
    activeItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show-animation');
      }, index * 100);
    });
  },
  setHeight() {
    const isInsideFlexBoxContainer = this.$element.parents()[0].classList.contains('e-con-inner');
    if (!isInsideFlexBoxContainer) {
      return;
    }
    const height = this.$element.find('.raven-media-gallery-wrapper')[0].clientHeight;
    this.$element[0].style.height = height + 'px';
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.handleAnimation();
  }
});
function _default($scope) {
  new MediaGallery({
    $element: $scope
  });
}

},{"../utils/module":9}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MyAccount = _module.default.extend({
  pageWrapperAttr: 'raven-my-account-page',
  currentPage: null,
  onInit() {
    this.initElements();
    this.bindEvents();

    // Specific scripts to manage the widget in editor preview.
    if (this.isEdit) {
      this.editorInitTabs();
      this.currentPage = this.$element.attr(this.pageWrapperAttr);
      if (!this.currentPage) {
        this.currentPage = 'dashboard';
      }
      this.editorShowTab();
    }

    // General scripts for both frontend and editor.
    this.applyButtonsHoverAnimation();
    this.doHeightEqualizations();
    this.setContentMinHeight();
    this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote);
  },
  getDefaultSettings() {
    return {
      selectors: {
        address: 'address',
        tabLinks: '.woocommerce-MyAccount-navigation-link a',
        viewOrderButtons: '.my_account_orders .woocommerce-button.view',
        viewOrderLinks: '.woocommerce-orders-table__cell-order-number a',
        authForms: 'form.login, form.register',
        tabWrapper: '.raven-my-account-tab',
        tabItem: '.woocommerce-MyAccount-navigation li',
        allPageElements: `[${this.pageWrapperAttr}]`,
        purchasenote: 'tr.product-purchase-note',
        stickyRightColumn: '.e-sticky-right-column'
      },
      classes: {
        stickyRightColumnActive: 'e-sticky-right-column--active'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $address: this.$element.find(selectors.address),
      $tabLinks: this.$element.find(selectors.tabLinks),
      $viewOrderButtons: this.$element.find(selectors.viewOrderButtons),
      $viewOrderLinks: this.$element.find(selectors.viewOrderLinks),
      $authForms: this.$element.find(selectors.authForms),
      $tabWrapper: this.$element.find(selectors.tabWrapper),
      $tabItem: this.$element.find(selectors.tabItem),
      $allPageElements: this.$element.find(selectors.allPageElements),
      $purchasenote: this.$element.find(selectors.purchasenote),
      $stickyRightColumn: this.$element.find(selectors.stickyRightColumn)
    };
  },
  bindEvents() {
    // Add our wrapper class around the select2 whenever it is opened.
    elementorFrontend.elements.$document.on('select2:open', this.addSelect2Wrapper);

    // The heights of the Registration and Login boxes need to be recaclulated and equalized when
    // WooCommerce adds validation messages (such as the password strength meter) into these sections.
    elementorFrontend.elements.$body.on('keyup change', '.register #reg_password', this.doHeightEqualizations);
  },
  editorInitTabs() {
    this.elements.$allPageElements.each((index, element) => {
      const endpoint = element.getAttribute(this.pageWrapperAttr);
      let linksToEndpoint;
      linksToEndpoint = this.$element.find('.woocommerce-MyAccount-navigation-link--' + endpoint);
      if ('view-order' === endpoint) {
        linksToEndpoint = this.elements.$viewOrderLinks.add(this.elements.$viewOrderButtons);
      }
      linksToEndpoint.on('click', {
        endpoint
      }, this.editorShowTab);
    });
    this.elements.$tabWrapper.find('.woocommerce-MyAccount-navigation li').first().trigger('click');
  },
  editorShowTab(event = null) {
    if (event) {
      this.currentPage = event.data.endpoint;
    }
    if ('customer-logout' === this.currentPage) {
      return;
    }
    const targetPage = this.$element.find(`[${this.pageWrapperAttr}="${this.currentPage}"]`);
    this.$element.attr(this.pageWrapperAttr, this.currentPage);
    this.elements.$allPageElements.hide();
    targetPage.show();
    this.toggleEndpointClasses();
    if ('view-order' !== this.currentPage) {
      this.elements.$tabItem.removeClass('is-active');
      this.$element.find('.woocommerce-MyAccount-navigation-link--' + this.currentPage).addClass('is-active');
    }

    // We need to run doHeightEqualizations() again when the 'edit-address' or 'view-order' tab is shown, because jQuery cannot
    // get the height of hidden elements, and this tab was hidden on initial page load in the editor.
    if ('edit-address' === this.currentPage || 'view-order' === this.currentPage) {
      this.doHeightEqualizations();
    }
  },
  toggleEndpointClasses() {
    const wcPages = ['dashboard', 'orders', 'view-order', 'downloads', 'edit-account', 'edit-address', 'payment-methods'];
    this.elements.$tabWrapper.removeClass('raven-my-account-tab__' + wcPages.join(' raven-my-account-tab__'));
    if (wcPages.includes(this.currentPage)) {
      this.elements.$tabWrapper.addClass('raven-my-account-tab__' + this.currentPage);
    }
  },
  applyButtonsHoverAnimation() {
    const elementSettings = this.getElementSettings();
    if (elementSettings.forms_buttons_hover_animation) {
      this.$element.find('.woocommerce button.button').addClass('elementor-animation-' + elementSettings.forms_buttons_hover_animation);
    }
    if (elementSettings.tables_button_hover_animation) {
      this.$element.find('.order-again .button, td .button, .woocommerce-pagination .button').addClass('elementor-animation-' + elementSettings.tables_button_hover_animation);
    }
  },
  doHeightEqualizations() {
    // Equalize <address> boxes height.
    this.equalizeElementHeight(this.elements.$address);
    if (!this.isEdit) {
      // Equalize login/reg boxes height, since auth forms do not display in the Editor.
      this.equalizeElementHeight(this.elements.$authForms); //
    }
  },
  equalizeElementHeight($element) {
    if ($element.length) {
      // First remove the custom height we added so that the new height can be re-calculated according to the content.
      $element.removeAttr('style');
      let maxHeight = 0;
      $element.each((index, element) => {
        maxHeight = Math.max(maxHeight, element.offsetHeight);
      });
      if (0 < maxHeight) {
        $element.css('height', maxHeight + 'px');
      }
    }
  },
  // After render, we acquire height of navigation menu and set the minimum height of contents to it, then make it visible.
  setContentMinHeight() {
    const nav = jQuery('.custom-my-account-nav-vertical');
    const content = jQuery('.woocommerce-MyAccount-content-wrapper');
    if (nav.length) {
      const navHeight = window.getComputedStyle(nav[0]).height;
      content.css('min-height', navHeight);
    }
    content.css('visibility', 'visible');
  },
  removePaddingBetweenPurchaseNote($element) {
    if ($element) {
      $element.each(element => {
        jQuery(element).prev().children('td').addClass('product-purchase-note-is-below');
      });
    }
  },
  onElementChange(propertyName) {
    // When the 'General Text' Typography or 'Section' Padding is changed, the height of the boxes need to update as well.
    if (0 === propertyName.indexOf('general_text_typography') || 0 === propertyName.indexOf('sections_padding')) {
      this.doHeightEqualizations();
    }
    if (0 === propertyName.indexOf('forms_rows_gap')) {
      this.removePaddingBetweenPurchaseNote(this.elements.$purchasenote);
    }
  },
  //----------------Select2s-------------------+
  addSelect2Wrapper(event) {
    // The select element is recaptured every time because the markup can refresh
    const selectElement = jQuery(event.target).data('select2');
    if (selectElement.$dropdown) {
      selectElement.$dropdown.addClass('e-woo-select2-wrapper');
    }
  },
  isStickyRightColumnActive() {
    const classes = this.getSettings('classes');
    return this.elements.$stickyRightColumn.hasClass(classes.stickyRightColumnActive);
  },
  activateStickyRightColumn() {
    const elementSettings = this.getElementSettings();
    const $wpAdminBar = elementorFrontend.elements.$wpAdminBar;
    const classes = this.getSettings('classes');
    let stickyOptionsOffset = elementSettings.sticky_right_column_offset || 0;
    if ($wpAdminBar.length && 'fixed' === $wpAdminBar.css('position')) {
      stickyOptionsOffset += $wpAdminBar.height();
    }
    if ('yes' === this.getElementSettings('sticky_right_column')) {
      this.elements.$stickyRightColumn.addClass(classes.stickyRightColumnActive);
      this.elements.$stickyRightColumn.css('top', stickyOptionsOffset + 'px');
    }
  },
  deactivateStickyRightColumn() {
    if (!this.isStickyRightColumnActive()) {
      return;
    }
    const classes = this.getSettings('classes');
    this.elements.$stickyRightColumn.removeClass(classes.stickyRightColumnActive);
  },
  toggleStickyRightColumn() {
    if (!this.getElementSettings('sticky_right_column')) {
      this.deactivateStickyRightColumn();
      return;
    }
    if (!this.isStickyRightColumnActive()) {
      this.activateStickyRightColumn();
    }
  }
});
function _default($scope) {
  new MyAccount({
    $element: $scope
  });
}

},{"../utils/module":9}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const NavMenu = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        menus: '.raven-nav-menu',
        inPageMenuItems: 'a[href*="#"]',
        toggleButton: '.raven-nav-menu-toggle-button',
        closeButton: '.raven-nav-menu-close-button',
        mobileMenu: '.raven-nav-menu-mobile',
        mobileContainer: '.raven-nav-menu-mobile .raven-container',
        megaMenu: '.submenu .raven-megamenu-wrapper',
        liNavItem: '.raven-nav-menu-main .raven-nav-menu li'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $body: $('body'),
      $menus: this.$element.find(selectors.menus),
      $inPageMenuItems: this.$element.find(selectors.inPageMenuItems),
      $toggleButton: this.$element.find(selectors.toggleButton),
      $closeButton: this.$element.find(selectors.closeButton),
      $mobileMenu: this.$element.find(selectors.mobileMenu),
      $mobileContainer: this.$element.find(selectors.mobileContainer),
      $elementorElement: this.$element.closest('.elementor-element'),
      $elementorContainer: this.$element.parents('.elementor-container').last(),
      $megaMenu: this.$element.find(selectors.megaMenu),
      $navMenuItem: this.$element.find(selectors.$menus).find('li'),
      $liNavItem: this.$element.find(selectors.liNavItem)
    };

    // If there is no parent:<.elementor-container> then the container is a Flex Container.
    if (!elements.$elementorContainer.length) {
      elements.$elementorContainer = this.$element.closest('.e-con');
    }
    return elements;
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.initSmartMenu();
    this.inPageMenuClick();
    this.inPageMenuScroll();
    this.mobileMenuScroll();
    this.mobileMenuPageRedirection();
    this.setMegaMenuWidth();
    this.stretchElement = new elementorModules.frontend.tools.StretchElement({
      element: this.elements.$mobileMenu,
      selectors: {
        container: this.elements.$mobileMenu.parents('.elementor-top-section')
      }
    });
  },
  bindEvents() {
    const mobileLayout = this.getElementSettings('mobile_layout');
    switch (mobileLayout) {
      case 'dropdown':
        this.elements.$toggleButton.on('click', this.toggleDropdown.bind(this));
        elementorFrontend.addListenerOnce(this.$element.data('model-cid'), 'resize', this.dropdownFullWidth.bind(this));
        $(window).on('resize', this.setMegaMenuWidth.bind(this));
        break;
      case 'side':
        const sideMenuOpenPosition = this.getElementSettings('side_menu_alignment'),
          sideMenuEffect = this.getElementSettings('side_menu_effect');
        this.elements.$mobileMenu.addClass('raven-side-menu-' + sideMenuOpenPosition);
        this.elements.$mobileMenu.addClass('raven-side-menu-' + sideMenuOpenPosition);
        this.elements.$toggleButton.on('click', this.toggleMobileMenu.bind(this));
        this.elements.$closeButton.on('click', this.toggleMobileMenu.bind(this));
        if (sideMenuEffect === 'push') {
          this.elements.$body.addClass('raven-nav-menu-effect-push');
          this.elements.$toggleButton.on('click', this.sideMenuPush.bind(this));
          this.elements.$closeButton.on('click', this.sideMenuPush.bind(this));
        }
        this.elements.$menus.on('select.smapi', this.onSideMenuItemClick.bind(this));
        break;
      case 'full-screen':
        const isItemFullWidth = this.getElementSettings('mobile_menu_item_full_width');
        if (isItemFullWidth === 'yes') {
          this.elements.$mobileMenu.addClass('raven-nav-menu-item-full-width');
        }
        this.elements.$toggleButton.on('click', this.toggleMobileMenu.bind(this));
        this.elements.$closeButton.on('click', this.toggleMobileMenu.bind(this));
        break;
    }
    this.elements.$liNavItem.on('hover', this.setMegaMenuWidth);
  },
  initSmartMenu() {
    const subIndicatorsContent = this.getElementSettings('submenu_icon');
    const spaceBetween = this.getElementSettings('submenu_space_between'),
      options = {
        subIndicatorsText: subIndicatorsContent,
        subIndicators: '' !== subIndicatorsContent,
        subIndicatorsPos: 'append',
        subMenusMaxWidth: '1500px'
      };
    if (this.elements.$body.hasClass('rtl')) {
      options.rightToLeftSubMenus = true;
    }
    if (this.elements.$megaMenu.length) {
      options.keepInViewport = false;
    }
    if (typeof spaceBetween === 'object' && spaceBetween.size !== '') {
      options.mainMenuSubOffsetY = parseInt(spaceBetween.size);
    }
    if (this.getElementSettings('submenu_opening_position') === 'top') {
      options.bottomToTopSubMenus = true;
    }
    this.excludeOtherUl();
    this.elements.$menus.smartmenus(options);
  },
  toggleDropdown() {
    const mobileMenu = this.elements.$mobileMenu;
    this.elements.$toggleButton.find('.hamburger').toggleClass('is-active');
    mobileMenu.slideToggle(250, () => {
      mobileMenu.toggleClass('raven-nav-menu-active').css('display', '');
    });
    this.dropdownFullWidth();
  },
  dropdownFullWidth() {
    const mobileMenu = this.elements.$mobileMenu;

    // Used for scrolling menu in small screens.
    mobileMenu.css('max-height', document.documentElement.clientHeight - mobileMenu.get(0).getBoundingClientRect().top);
    if (this.getElementSettings('full_width') !== 'stretch') {
      return;
    }
    const elementorElement = this.elements.$elementorElement,
      elementorContainer = this.elements.$elementorContainer,
      mobileToggle = this.elements.$toggleButton,
      mobileContainer = this.elements.$mobileContainer,
      windowWidth = window.innerWidth;
    this.stretchElement.stretch();
    mobileMenu.css('top', elementorElement.offset().top + elementorElement.outerHeight() - mobileToggle.offset().top);
    mobileContainer.css('max-width', windowWidth > 1024 ? elementorContainer.outerWidth() : 'none');
  },
  sideMenuPush() {
    const sideMenuOpenPosition = this.getElementSettings('side_menu_alignment');
    let width = parseInt(this.$element.css('--menu-container-width')) || 250;
    if (sideMenuOpenPosition === 'right') {
      width = -width;
    }
    if (!this.elements.$body.hasClass('raven-nav-menu-effect-pushed')) {
      this.elements.$body.addClass('raven-nav-menu-effect-pushed').css('margin-' + (this.isRtl() ? 'right' : 'left'), width);
    } else {
      this.elements.$body.removeClass('raven-nav-menu-effect-pushed').removeAttr('style');
    }
  },
  toggleMobileMenu() {
    this.elements.$mobileMenu.toggleClass('raven-nav-menu-active');
    if (this.elements.$mobileMenu.hasClass('raven-nav-menu-active')) {
      this.elements.$mobileMenu.parents('.animated').addClass('raven-nav-menu-parents-animation');
    } else {
      this.elements.$mobileMenu.parents('.animated').removeClass('raven-nav-menu-parents-animation');
    }
    if (this.elements.$toggleButton.find('.hamburger').length !== 0) {
      this.elements.$toggleButton.find('.hamburger').toggleClass('is-active');
    }
  },
  mobileMenuScroll() {
    const overlays = document.querySelectorAll('.raven-nav-menu-mobile.raven-nav-menu-dropdown, .raven-nav-menu-mobile.raven-nav-menu-full-screen');
    let _clientY = null;
    for (let i = 0; i < overlays.length; i++) {
      overlays[i].addEventListener('touchstart', function (event) {
        if (event.targetTouches.length === 1) {
          _clientY = event.targetTouches[0].clientY;
        }
      }, {
        capture: false,
        passive: true
      });
      overlays[i].addEventListener('touchmove', function (event) {
        if (event.targetTouches.length === 1) {
          const clientY = event.targetTouches[0].clientY - _clientY;
          if (overlays[i].scrollTop === 0 && clientY > 0 && event.cancelable) {
            event.preventDefault();
          }
          if (overlays[i].scrollHeight - overlays[i].scrollTop <= overlays[i].clientHeight && clientY < 0 && event.cancelable) {
            event.preventDefault();
          }
        }
      }, {
        capture: false,
        passive: true
      });
    }
  },
  mobileMenuPageRedirection() {
    const itemWithChildern = this.elements.$mobileMenu.find('.menu-item-has-children'),
      itemLink = itemWithChildern.find('> .raven-link-item'),
      subArrow = itemLink.find('> .sub-arrow');
    if (itemWithChildern.length === 0 || itemLink.length === 0) {
      return;
    }
    subArrow.on('click', function (event) {
      const target = $(event.currentTarget);
      if (!target.parent().hasClass('highlighted')) {
        return;
      }
      event.preventDefault();
    });
  },
  inPageMenuClick() {
    const self = this;
    const headerSettings = this.getHeaderSettings();
    let anchorId;
    this.elements.$menus.on('click', e => {
      anchorId = e.target.getAttribute('href') || '';
      let url = null;
      try {
        url = new window.URL($(e.target).prop('href'));
      } catch (err) {
        return;
      }
      if (url.href.replace(url.hash, '') !== window.location.href.replace(window.location.hash, '') && anchorId.search(/^#/) === -1) {
        return;
      }
      if (url.hash.search(/^#/) === -1) {
        return;
      }
      anchorId = url.hash;
      e.preventDefault();
      const anchorTarget = $(anchorId);
      if (anchorTarget.length === 0) {
        if (self.elements.$body.hasClass('raven-nav-menu-effect-pushed')) {
          self.sideMenuPush();
        }
        self.elements.$mobileMenu.removeClass('raven-nav-menu-active');
        self.changeHamburgerState(false);
        window.history.pushState(null, null, url.hash);
        return;
      }
      let scrollPosition = anchorTarget.offset().top;
      scrollPosition -= self.getAdminbarHeight();
      scrollPosition -= self.getBodyBorderWidth();
      if (headerSettings && headerSettings.behavior === 'sticky' && headerSettings.overlap) {
        scrollPosition -= self.isHeaderSticked() ? self.tbarHeight() : 2 * self.tbarHeight();
      } else if (headerSettings && !headerSettings.behavior) {
        scrollPosition -= self.isHeaderSticked() ? self.tbarHeight() : 2 * self.tbarHeight();
      } else {
        scrollPosition -= self.tbarHeight();
      }
      if (self.hasCustomStickyHeader()) {
        scrollPosition -= self.getCustomStickyHeaderHeight();
      } else if (headerSettings && headerSettings.behavior === 'fixed' && headerSettings.position === 'top' || headerSettings && headerSettings.behavior === 'sticky') {
        scrollPosition -= self.getHeaderHeight();
      }
      if (self.elements.$body.hasClass('raven-nav-menu-effect-pushed')) {
        self.sideMenuPush();
      }
      self.elements.$mobileMenu.removeClass('raven-nav-menu-active');
      self.changeHamburgerState(false);
      window.history.pushState(null, null, url.hash);
      $('html, body').stop().animate({
        scrollTop: scrollPosition
      }, 500, 'swing');
      return false;
    });
  },
  inPageMenuScroll() {
    const self = this;
    if (self.elements.$inPageMenuItems.length) {
      self.elements.$inPageMenuItems.each(function (index, node) {
        // Skip links without fragments.
        if (node.hash < 1) {
          return;
        }
        const section = $('[id="' + node.hash.replace('#', '') + '"]');
        if (!section.length) {
          return;
        }
        node = $(node);
        if (!window.location.hash) {
          self.activateMenuItem(section, node);
        }
        window.addEventListener('scroll', _.throttle(function () {
          self.activateMenuItem(section, node);
        }));
      });
    }
  },
  activateMenuItem(section, element) {
    const self = this,
      threshold = 1;
    let isVisible = false;
    const headerHeight = self.getHeaderHeight() + self.getAdminbarHeight(),
      top = section.offset().top,
      offset = top - threshold - headerHeight,
      maxOffset = top - threshold * 2 + section.outerHeight() - headerHeight,
      scrollOffset = window.pageYOffset;
    if (scrollOffset >= offset && scrollOffset <= maxOffset) {
      isVisible = true;
    }
    element.toggleClass('raven-menu-item-active', isVisible);
  },
  getHeaderHeight() {
    const header = $('.jupiterx-header');
    if (header.length === 0) {
      return 0;
    }
    const {
      behavior
    } = header.data('jupiterx-settings');
    if (behavior === 'fixed' || behavior === 'sticky' || window.pageYOffset < header.height()) {
      return header.height();
    }
    return 0;
  },
  hasCustomStickyHeader() {
    const settings = this.getHeaderSettings();
    if (!settings) {
      return false;
    }
    if (!settings.behavior || settings.behavior !== 'sticky') {
      return false;
    }
    return !settings.stickyTemplate || settings.stickyTemplate !== settings.template;
  },
  getHeaderSettings() {
    const $header = $('.jupiterx-header');
    return $header.data('jupiterx-settings');
  },
  getCustomStickyHeaderHeight() {
    if (!this.hasCustomStickyHeader()) {
      return 0;
    }
    const $stickyHeader = $('.jupiterx-header-custom .elementor:last-of-type');
    if ($stickyHeader.length === 0) {
      return 0;
    }
    return $stickyHeader.outerHeight();
  },
  getBodyBorderWidth() {
    const $bodyBorder = $('.jupiterx-site-body-border');
    if ($bodyBorder.length === 0) {
      return 0;
    }
    const width = $bodyBorder.css('border-width');
    if (!width) {
      return 0;
    }
    return parseInt(width.replace('px', ''));
  },
  getAdminbarHeight() {
    const adminbar = $('#wpadminbar');
    if (adminbar.length) {
      return adminbar.height();
    }
    return 0;
  },
  tbarHeight() {
    const tbar = $('.jupiterx-tbar');
    if (tbar.length) {
      return tbar.outerHeight();
    }
    return 0;
  },
  onElementChange(propertyName) {
    if (this.getElementSettings('full_width') !== 'stretch') {
      this.stretchElement.reset();
      this.elements.$mobileMenu.removeAttr('style');
      this.elements.$mobileMenu.find('.raven-container').removeAttr('style');
    } else {
      this.dropdownFullWidth();
    }
    if (propertyName === 'mobile_layout' || propertyName === 'side_menu_effect') {
      this.elements.$body.removeClass('raven-nav-menu-effect-pushed').removeAttr('style');
      this.elements.$mobileMenu.removeClass('raven-nav-menu-active');
    }
    if (this.getElementSettings('mobile_layout') === 'side') {
      if (propertyName.startsWith('menu_container_width') && this.elements.$body.hasClass('raven-nav-menu-effect-pushed')) {
        const sideMenuOpenPosition = this.getElementSettings('side_menu_alignment');
        const width = parseInt(this.$element.css('--menu-container-width')) || 250;
        this.elements.$body.css('margin-left', sideMenuOpenPosition === 'left' ? width : -width);
      }
    }
    if (propertyName === 'submenu_space_between') {
      const spaceBetween = this.getElementSettings('submenu_space_between');
      if (typeof spaceBetween === 'object') {
        this.findElement('.raven-submenu').first().css('margin-top', spaceBetween.size === '' ? '0' : `${spaceBetween.size}px`);
        this.elements.$menus.smartmenus('destroy');
        this.initSmartMenu();
      }
    }
  },
  onSectionActivated(activeSection) {
    this.editShowSubmenu(activeSection === 'section_submenu');
  },
  onEditorClosed() {
    this.editShowSubmenu(false);
  },
  editShowSubmenu(toggle) {
    const subMenu = this.findElement('.raven-submenu').first(),
      spaceBetween = this.getElementSettings('submenu_space_between');
    subMenu.toggleClass('raven-show-submenu', toggle);
    if (typeof spaceBetween === 'object') {
      subMenu.css('margin-top', spaceBetween.size === '' ? '0' : `${spaceBetween.size}px`);
    }
  },
  onSideMenuItemClick(e, item) {
    const $el = $(item);
    if ($el.closest('.raven-nav-menu-side').length === 0) {
      return;
    }
    const href = $el.attr('href');
    if (href.search(/^#/) !== -1 || href.trim().length === 0) {
      return;
    }
    this.elements.$closeButton.trigger('click');
  },
  isHeaderSticked() {
    return $('.jupiterx-header-sticked').length > 0;
  },
  setMegaMenuWidth() {
    const megaMenu = this.elements.$liNavItem.find('.submenu .raven-megamenu-wrapper'),
      elementorContainer = this.elements.$elementorContainer,
      elementorContainerLeft = elementorContainer.offset().left,
      containerWidth = elementorContainer.outerWidth();
    megaMenu.each(function () {
      const self = $(this),
        megaMenuLiParent = self.parent().parent(),
        megaMenuLiParentLeft = megaMenuLiParent.offset().left,
        transformValue = -Math.abs(megaMenuLiParentLeft - elementorContainerLeft);
      self.parent().css('transform', `translateX(${transformValue}px)`);
    });
    megaMenu.css('width', `${containerWidth}px`);
  },
  excludeOtherUl() {
    const megaMenu = this.elements.$liNavItem.find('.submenu .raven-megamenu-wrapper');
    megaMenu.each(function () {
      const self = $(this);
      self.find('ul').attr('data-sm-skip', 'true');
    });
  },
  changeHamburgerState(active) {
    const $hamburger = this.elements.$toggleButton.find('.hamburger');
    if ($hamburger.length === 0) {
      return;
    }
    if (!active) {
      $hamburger.removeClass('is-active');
      return;
    }
    $hamburger.addClass('is-active');
  }
});
function _default($scope) {
  new NavMenu({
    $element: $scope
  });
}

},{"../utils/module":9}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
class PaypalButton extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        button: '.elementor-button.elementor-paypal-legacy',
        errors: '.elementor-message-danger'
      }
    };
  }
  getDefaultElements() {
    const settings = this.getSettings();
    return {
      wrapper: this.$element[0],
      button: this.$element[0].querySelector(settings.selectors.button),
      errors: this.$element[0].querySelectorAll(settings.selectors.errors)
    };
  }
  handleClick(event) {
    if (0 < this.elements.errors.length) {
      event.preventDefault();
      this.elements.errors.forEach(error => {
        error.classList.remove('elementor-hidden');
      });
    }
  }
  bindEvents() {
    if (_.isNull(this.elements.button)) {
      return;
    }
    this.elements.button.addEventListener('click', this.handleClick.bind(this));
  }
}
function _default($scope) {
  new PaypalButton({
    $element: $scope
  });
}

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
var _masonry = _interopRequireDefault(require("../utils/masonry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PhotoAlbum = _module.default.extend({
  Masonry: null,
  onInit() {
    $(this.$element).on('add-stack-effect', this.addStackEffect);
    if (this.getInstanceValue('layout') === 'masonry') {
      this.createMasonry();
    }
    if (this.getElementSettings('_skin') === 'stack') {
      $(this.$element).trigger('add-stack-effect');
    }
  },
  addStackEffect() {
    const effect = this.getElementSettings('stack_hover_effect');
    $.each(this.$element.find('.raven-photo-album-item'), (key, stackEl) => {
      new window[effect + 'Fx']({
        el: stackEl
      });
    });
  },
  createMasonry() {
    const self = this;
    self.Masonry = new _masonry.default({
      $element: self.$element
    });
    self.Masonry.run();
    if (self.getElementSettings('_skin') !== 'stack') {
      return;
    }
    setTimeout(() => {
      $(self.$element).trigger('add-stack-effect');
    }, 50);
  }
});
function _default($scope) {
  new PhotoAlbum({
    $element: $scope
  });
}

},{"../utils/masonry":8,"../utils/module":9}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PhotoRoller = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        container: '.raven-photo-roller',
        frame: '.raven-photo-roller-frame',
        image: '.raven-photo-roller-frame img'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $container: this.$element.find(selectors.container),
      $frame: this.$element.find(selectors.frame),
      $image: this.$element.find(selectors.image)
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);

    // If the max height has value, we should maintain the scale of the image.
    if (this.getElementSettings('max_height').size) {
      this.calculateNewWidth();
    }

    // Fore redraw for Safari. This is a hack.
    if (typeof window.safari === 'undefined') {
      return;
    }
    this.redraw();
    $(window).resize(this.redraw);
  },
  redraw() {
    this.elements.$container.hide().show(0);
  },
  calculateNewWidth() {
    const maxHeight = this.getElementSettings('max_height');
    const oldWidth = parseFloat(this.elements.$image.css('width'), 10);
    const oldHeight = parseFloat(this.elements.$image.css('height'), 10);

    // Set max height.
    this.elements.$frame.css('max-height', maxHeight.size + maxHeight.unit);
    this.elements.$frame.after().css('max-height', maxHeight.size + maxHeight.unit);
    if (maxHeight.unit === 'px' && maxHeight.size < oldHeight) {
      const newWidth = maxHeight.size / oldHeight * oldWidth;
      this.elements.$frame.css('width', newWidth);
      this.elements.$image.css('width', newWidth);
      return;
    }
    if (maxHeight.unit === '%' && maxHeight.size < 100) {
      // Calculate the maximum height in pixels based on the width.
      const maxHeightPixels = oldHeight * maxHeight.size / 100,
        aspectRatio = oldWidth / oldHeight,
        newWidth = maxHeightPixels * aspectRatio;
      this.elements.$frame.css('width', newWidth);
      this.elements.$frame.css('height', maxHeightPixels);
      this.elements.$image.css('width', newWidth);
      this.elements.$image.css('height', maxHeightPixels);
    }
  }
});
function _default($scope) {
  new PhotoRoller({
    $element: $scope
  });
}

},{"../utils/module":9}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PostComments = _module.default.extend({
  onInit() {
    $('body').find('li.depth-1').each(function (index, element) {
      const lastChildren = $(element).find('.children').last();
      lastChildren.find('.comment').last().find('.jupiterx-comment-body').css({
        'border-bottom': 'none',
        'padding-bottom': '5px'
      });
    });
    this.actionLinkIconOnHover();
  },
  onElementChange() {
    this.actionLinkIconOnHover();
  },
  getWrapper() {
    return 'div[data-id="' + this.getID() + '"]';
  },
  actionLinkIconOnHover() {
    const wrapper = this.getWrapper();
    const iconHoverColor = $(wrapper).css('--action-links-icon-color-hover');
    const defaultColor = $(wrapper).find('.fa-comment-dots').css('color');
    if (!iconHoverColor) {
      return;
    }
    $(wrapper).find('.jupiterx-comment-links i').on('mouseover', function () {
      $(this).css('color', iconHoverColor);
    });
    $(wrapper).find('.jupiterx-comment-links i').on('mouseleave', function () {
      $(this).css('color', defaultColor);
    });
    $(wrapper).find('.comment-reply-link').on('mouseover', function () {
      $(this).parents('.jupiterx-comment-links').find('.fa-comment-dots').css('color', iconHoverColor);
    });
    $(wrapper).find('.comment-reply-link').on('mouseleave', function () {
      $(this).parents('.jupiterx-comment-links').find('.fa-comment-dots').css('color', defaultColor);
    });
    $(wrapper).find('.jupiterx-comment-links li:last-child').on('mouseover', function () {
      $(this).parents('.jupiterx-comment-links').find('.fa-paper-plane').css('color', iconHoverColor);
    });
    $(wrapper).find('.jupiterx-comment-links li:last-child').on('mouseleave', function () {
      $(this).parents('.jupiterx-comment-links').find('.fa-paper-plane').css('color', defaultColor);
    });
  }
});
function _default($scope) {
  new PostComments({
    $element: $scope
  });
}

},{"../utils/module":9}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PostNavigation = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        image: '.raven-post-navigation-featured-image'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $navigation: this.$element,
      $image: this.$element.find(selectors.image)
    };
  },
  bindEvents() {
    this.handleZoomAndMove();
  },
  handleZoomAndMove() {
    const effect = this.getInstanceValue('hover_animation_featured_image');
    if (!effect || effect !== 'zoom-move' || this.elements.$image.length < 1) {
      return;
    }
    this.elements.$image.on('mouseout', event => {
      event.currentTarget.style.transform = 'perspective(900px) translate3d( 0px, 0px, 0px ) scale(1)';
    });
    this.elements.$image.on('mousemove', event => {
      const bound = event.currentTarget.getBoundingClientRect(),
        scaleX = ((bound.width + 35) / bound.width).toFixed(2),
        scaleY = ((bound.height + 35) / bound.height).toFixed(2);
      let pageX = bound.width / 2 - (event.clientX - bound.left),
        pageY = bound.height / 2 - (event.clientY - bound.top);
      pageX = pageX / bound.width * 30;
      pageY = pageY / bound.height * 30;
      event.currentTarget.style.transform = `perspective(900px) translate3d( ${pageX}px, ${pageY}px, 0px )  scale(${Math.max(scaleX, scaleY)}`;
    });
  }
});
function _default($scope) {
  new PostNavigation({
    $element: $scope
  });
}

},{"../utils/module":9}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classic = classic;
exports.cover = cover;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PostsCarousel = _module.default.extend({
  getDefaultSettings() {
    return {
      classes: {
        dots: 'swiper-pager'
      },
      selectors: {
        postImageFit: '.raven-image-fit img',
        carouselWrapper: '.raven-swiper-slider',
        sliderWrapper: '.raven-posts-carousel-swiper-container',
        itemsSlider: '.swiper-wrapper'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $carouselWrapper: this.$element.find(selectors.carouselWrapper),
      $sliderWrapper: this.$element.find(selectors.sliderWrapper),
      $itemsSlider: this.$element.find(selectors.itemsSlider)
    };
  },
  getCarouselSettings() {
    return {
      slides_view: this.getInstanceValue('slides_view'),
      slides_view_tablet: this.getInstanceValue('slides_view_tablet'),
      slides_view_mobile: this.getInstanceValue('slides_view_mobile'),
      slides_scroll: this.getInstanceValue('slides_scroll'),
      slides_scroll_tablet: this.getInstanceValue('slides_scroll_tablet'),
      slides_scroll_mobile: this.getInstanceValue('slides_scroll_mobile'),
      enable_autoplay: this.getInstanceValue('enable_autoplay'),
      autoplay_speed: this.getInstanceValue('autoplay_speed'),
      enable_infinite_loop: this.getInstanceValue('enable_infinite_loop'),
      enable_hover_pause: this.getInstanceValue('enable_hover_pause'),
      overflow_visible: this.getInstanceValue('overflow_visible'),
      transition_speed: this.getInstanceValue('transition_speed'),
      show_navigation: this.getInstanceValue('show_arrows'),
      show_pagination: this.getInstanceValue('show_pagination'),
      pagination_position: this.getInstanceValue('pagination_position'),
      columns_space_between: this.getInstanceValue('columns_space_between'),
      columns_space_between_mobile: this.getInstanceValue('columns_space_between_mobile'),
      columns_space_between_tablet: this.getInstanceValue('columns_space_between_tablet')
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const settings = this.getCarouselSettings();
    const options = {
      draggable: false,
      slidesPerColumn: 0,
      centeredSlides: 'yes' === settings.overflow_visible,
      centeredSlidesBounds: 'yes' === settings.overflow_visible,
      spaceBetween: settings.columns_space_between_mobile.size,
      slidesPerView: 'yes' === settings.overflow_visible ? +settings.slides_view_mobile + 0.5 : +settings.slides_view_mobile,
      slidesPerGroup: +settings.slides_scroll_mobile,
      autoplay: settings.enable_autoplay === 'yes' ? {
        delay: settings.autoplay_speed
      } : false,
      loop: settings.enable_infinite_loop === 'yes',
      speed: +settings.transition_speed,
      navigation: settings.show_navigation === 'yes' ? {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      } : false,
      appendArrows: this.elements.$sliderWrapper,
      pagination: settings.show_pagination === 'yes' ? {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      } : false,
      breakpoints: {
        360: {
          slidesPerView: 'yes' === settings.overflow_visible ? +settings.slides_view_mobile + 0.5 : +settings.slides_view_mobile,
          slidesPerGroup: +settings.slides_scroll_mobile,
          spaceBetween: settings.columns_space_between_mobile.size
        },
        768: {
          slidesPerView: 'yes' === settings.overflow_visible ? +settings.slides_view_tablet + 0.5 : +settings.slides_view_tablet,
          slidesPerGroup: +settings.slides_scroll_tablet,
          spaceBetween: settings.columns_space_between_tablet.size
        },
        1024: {
          slidesPerView: 'yes' === settings.overflow_visible ? +settings.slides_view + 0.5 : +settings.slides_view,
          slidesPerGroup: +settings.slides_scroll,
          spaceBetween: settings.columns_space_between.size
        }
      }
    };
    if ('yes' === settings.overflow_visible) {
      this.elements.$carouselWrapper.find('.swiper-button-next').css('right', '40px');
      this.elements.$carouselWrapper.find('.swiper-button-prev').css('left', '40px');
    }
    const self = this;
    this.elements.$sliderWrapper.each(function (index, swiperContainer) {
      $(this).parents('.elementor-widget-raven-posts-carousel').find('.raven-posts-carousel').addClass('swiper-' + index);
      $(this).parents('.elementor-widget-raven-posts-carousel').find('.raven-posts-carousel').addClass('swiper-' + index);
      if (options.navigation) {
        options.navigation = {
          nextEl: $(swiperContainer).parents('.raven-posts-carousel').find('.swiper-button-next')[0],
          prevEl: $(swiperContainer).parents('.raven-posts-carousel').find('.swiper-button-prev')[0]
        };
      }
      let swiperObj = null;
      options.on = {};
      options.on.init = function () {
        self.handleAnitmation();
        self.handleFeaturedIamageEffect();
      };
      if ('undefined' === typeof Swiper) {
        const asyncSwiper = elementorFrontend.utils.swiper;
        new asyncSwiper(swiperContainer, options).then(newSwiperInstance => {
          swiperObj = newSwiperInstance; // eslint-disable-line
        });
      } else {
        swiperObj = new Swiper(swiperContainer, options); // eslint-disable-line
      }
      if (settings.enable_autoplay === 'yes' && settings.enable_hover_pause === 'yes') {
        $(swiperContainer).on({
          mouseenter() {
            swiperObj.autoplay.stop();
          },
          mouseleave() {
            swiperObj.autoplay.start();
          }
        });
      }
    });
  },
  handleAnitmation() {
    this.elements.$sliderWrapper.imagesLoaded().done(() => {
      let items = [...this.elements.$sliderWrapper[0].querySelectorAll('.swiper-slide')];
      if (!this.getInstanceValue('load_effect')) {
        items.forEach(event => {
          event.classList.add('raven-posts-carousel-loaded');
        });
        return;
      }
      if (this.getInstanceValue('load_effect') === 'slide-right') {
        items = items.slice().reverse();
      }
      items.forEach((event, index) => {
        setTimeout(() => {
          event.classList.add('raven-posts-carousel-loaded');
        }, 200 + 100 * index);
        setTimeout(() => {
          event.querySelector('.raven-posts-carousel-load-effect').classList.remove('raven-post-carousel-effect-' + this.getInstanceValue('load_effect'), 'raven-posts-carousel-load-effect');
        }, 1500 + 100 * index);
      });
    });
  },
  handleFeaturedIamageEffect() {
    const effect = this.getInstanceValue('post_image_hover_effect');
    if (!effect || effect !== 'zoom-move') {
      return;
    }
    let items = this.elements.$sliderWrapper.find('.raven-post-image');
    if ('cover' === this.getElementSettings('_skin')) {
      items = this.elements.$sliderWrapper.find('.raven-post-wrapper');
    }
    items.on('mouseout', event => {
      const zoomMove = event.currentTarget.querySelector('.raven-posts-carousel-zoom-move-wrapper');
      if (!zoomMove) {
        return;
      }
      zoomMove.style.transform = 'perspective(900px) translate3d( 0px, 0px, 0px ) scale(1)';
    });
    items.on('mousemove', event => {
      const bound = event.currentTarget.getBoundingClientRect(),
        scaleX = ((bound.width + 35) / bound.width).toFixed(2),
        scaleY = ((bound.height + 35) / bound.height).toFixed(2),
        zoomMove = event.currentTarget.querySelector('.raven-posts-carousel-zoom-move-wrapper');
      let pageX = bound.width / 2 - (event.clientX - bound.left),
        pageY = bound.height / 2 - (event.clientY - bound.top);
      pageX = pageX / bound.width * 30;
      pageY = pageY / bound.height * 30;
      if (!zoomMove) {
        return;
      }
      zoomMove.style.transform = `perspective(900px) translate3d( ${pageX}px, ${pageY}px, 0px ) scale(${Math.max(scaleX, scaleY)})`;
    });
    if ('cover' !== this.getElementSettings('_skin') || document.body.classList.contains('elementor-editor-active')) {
      return;
    }
    items.on('click', event => {
      const postLink = event.currentTarget.querySelector('.raven-post-image').getAttribute('data-href');
      if (!postLink) {
        return;
      }
      window.location.assign(postLink);
    });
  }
});
function classic($scope) {
  new PostsCarousel({
    $element: $scope
  });
}
function cover($scope) {
  new PostsCarousel({
    $element: $scope
  });
}

},{"../utils/module":9}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classic = classic;
exports.cover = cover;
var _module = _interopRequireDefault(require("../utils/module"));
var _sortable = _interopRequireDefault(require("../utils/sortable"));
var _pagination = _interopRequireDefault(require("../utils/pagination"));
var _masonry = _interopRequireDefault(require("../utils/masonry"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Posts = _module.default.extend({
  Sortable: null,
  Pagination: null,
  Masonry: null,
  getDefaultSettings() {
    return {
      classes: {
        postMirrored: 'data-mirrored'
      },
      selectors: {
        posts: '.raven-posts',
        postItem: '.raven-post-item',
        postImageFit: '.raven-image-fit img',
        postMirrored: '[data-mirrored]',
        loadMore: '.raven-load-more',
        loadMoreButton: '.raven-load-more-button',
        pagination: '.raven-pagination',
        sortable: '.raven-sortable',
        infinteLoadIndicator: '.raven-infinite-load'
      },
      state: {
        paged: 1,
        category: -1,
        maxNumPages: 1,
        isLoading: false
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $postsContainer: this.$element.find(selectors.posts),
      $loadMore: this.$element.find(selectors.loadMore),
      $loadMoreButton: this.$element.find(selectors.loadMoreButton),
      $pagination: this.$element.find(selectors.pagination),
      $infinteLoadIndicator: this.$element.find(selectors.infinteLoadIndicator)
    };
  },
  bindEvents() {
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      elementorFrontend.addListenerOnce(this.$element.data('model-cid'), 'resize', this.mirrorRows.bind(this));
    }
    if (this.getInstanceValue('pagination_type') === 'load_more' && this.elements.$loadMore.length) {
      const state = this.getSettings('state'),
        settings = this.elements.$loadMore.data('settings');
      this.setPaged({
        paged: state.paged,
        maxNumPages: settings.maxNumPages
      });
      this.elements.$loadMoreButton.on('click', this.handleLoadMore.bind(this));
    }
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.initializeOnce();
    this.initialize();
  },
  initializeOnce() {
    if (this.getInstanceValue('pagination_type') === 'page_based') {
      this.paginationModule();
    }
    if (this.getInstanceValue('show_sortable') === 'yes') {
      this.sortableModule();
    }
  },
  initialize() {
    if (this.getInstanceValue('layout') === 'masonry') {
      this.runMasonry();
    }
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      this.mirrorRows();
    }
    if (this.getInstanceValue('pagination_type') === 'infinite_load') {
      this.infiniteLoadObserver();
    }
    objectFitPolyfill(this.$element.find(this.getSettings('selectors.postImageFit')));
  },
  paginationModule() {
    const _Pagination = _pagination.default.extend({
      handlePagination: this.handlePagination.bind(this)
    });
    this.Pagination = new _Pagination({
      $element: this.$element.find(this.getSettings('selectors.pagination'))
    });
  },
  sortableModule() {
    const _Sortable = _sortable.default.extend({
      handleSort: this.handleSort.bind(this)
    });
    this.Sortable = new _Sortable({
      $element: this.$element.find(this.getSettings('selectors.sortable'))
    });
  },
  afterAppend() {
    if (this.getInstanceValue('mirror_rows') === 'yes') {
      this.mirrorRows();
    }
    if (this.getInstanceValue('pagination_type') === 'infinite_load') {
      this.infiniteLoadObserver();
    }
  },
  setColumnsCount() {
    const curDevice = elementorFrontend.getCurrentDeviceMode();
    let columnsKey = `columns_${curDevice}`;
    if (curDevice === 'desktop') {
      columnsKey = 'columns';
    }
    this.setSettings('columnsCount', parseInt(this.getInstanceValue(columnsKey)));
  },
  runMasonry() {
    this.Masonry = new _masonry.default({
      $element: this.$element
    });
    this.Masonry.run();
  },
  mirrorRows() {
    this.setColumnsCount();
    const settings = this.getSettings(),
      $postsItems = this.$element.find(settings.selectors.postItem);
    $postsItems.filter(settings.selectors.postMirrored).removeAttr(settings.classes.postMirrored);
    if ($postsItems.length && $postsItems.length > settings.columnsCount) {
      const totalRows = $postsItems.length / settings.columnsCount;
      for (let i = 1; i < totalRows; i += 2) {
        const startIndex = i * settings.columnsCount;
        $postsItems.slice(startIndex, startIndex + settings.columnsCount).attr(settings.classes.postMirrored, true);
      }
    }
  },
  createObserver($indicator, callback, options) {
    if ($indicator.length < 1) {
      return;
    }
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    }, options);
    observer.observe($indicator[0]);
  },
  infiniteLoadObserver() {
    const self = this;
    const options = {
      threshold: 1.0
    };
    self.createObserver(self.elements.$infinteLoadIndicator, () => {
      const state = self.getSettings('state');
      const newPaged = state.paged + 1;
      self.addPosts({
        paged: newPaged,
        category: state.category
      });
    }, options);
  },
  ajaxPosts(data, callback) {
    const ajaxData = {
      action: 'raven_get_render_posts',
      post_id: this.getCurrentPostId(),
      model_id: this.getID(),
      paged: data.paged,
      category: data.category,
      lang: this.elements.$postsContainer.data('lang')
    };
    const archiveQuery = this.elements.$postsContainer.data('archive-query');
    if (archiveQuery) {
      ajaxData.archive_query = JSON.stringify(archiveQuery);
    }
    const ajaxSuccess = function (res) {
      if (!res.success || !res.data.posts) {
        return;
      }
      callback(res);
    };
    const ajaxComplete = function () {
      this.setSettings('state.isLoading', false);
    };
    this.setSettings('state.isLoading', true);
    $.ajax({
      type: 'POST',
      url: _wpUtilSettings.ajax.url,
      data: ajaxData,
      success: ajaxSuccess,
      complete: ajaxComplete.bind(this)
    });
  },
  addPosts(data) {
    const state = this.getSettings('state');
    if (state.isLoading || state.paged < 1) {
      return false;
    }
    this.ajaxPosts(data, this.appendPosts);
    return true;
  },
  appendPosts(res) {
    const state = this.getSettings('state');
    switch (this.getInstanceValue('layout')) {
      case 'masonry':
        this.Masonry.push(res.data.posts);
        break;
      default:
        this.elements.$postsContainer.append(res.data.posts);
    }
    this.setPaged({
      paged: state.paged + 1,
      maxNumPages: res.data.max_num_pages
    });
    this.afterAppend();
  },
  setPosts(data) {
    const state = this.getSettings('state');
    if (state.isLoading) {
      return false;
    }
    this.ajaxPosts(data, this.renderPosts);
    return true;
  },
  renderPosts(res) {
    this.elements.$postsContainer.empty();
    this.elements.$postsContainer.append(res.data.posts);
    if (this.Sortable && !this.Sortable.isEnabled()) {
      this.Sortable.renderUpdate();
      if (this.Pagination && this.Pagination.isEnabled()) {
        this.Pagination.recreatePagination(res.data.max_num_pages);
      }
    }
    if (this.Pagination && !this.Pagination.isEnabled()) {
      this.Pagination.renderUpdate();
    }
    this.setPaged({
      paged: 1,
      maxNumPages: res.data.max_num_pages
    });
    this.initialize();
  },
  handleLoadMore(event) {
    event.preventDefault();
    const state = this.getSettings('state'),
      newPaged = state.paged + 1;
    this.addPosts({
      paged: newPaged,
      category: state.category
    });
  },
  handleInfiniteLoad() {
    const state = this.getSettings('state'),
      newPaged = state.paged + 1;
    this.addPosts({
      paged: newPaged,
      category: state.category
    });
  },
  handlePagination(pageNum) {
    this.scrollToContainer(this.elements.$postsContainer);
    this.setPosts({
      paged: pageNum,
      category: this.getSettings('state.category')
    });
  },
  handleSort(category) {
    const postOk = this.setPosts({
      paged: 1,
      category
    });
    if (postOk) {
      this.setSettings('state.category', category);
    }
  },
  setPaged(params) {
    let {
      paged,
      maxNumPages
    } = params;
    if (paged >= maxNumPages) {
      paged = -1;
    }
    if (paged === -1) {
      this.elements.$loadMore.hide();
    } else {
      this.elements.$loadMore.show();
    }
    this.setSettings('state.paged', paged);
    this.setSettings('state.maxNumPages', maxNumPages);
  },
  getCurrentPostId() {
    return parseInt(this.elements.$postsContainer.data('post-id'));
  },
  onSectionActivated(activeSection) {
    if (!activeSection) {
      return;
    }
    this.editOverlayIcons(activeSection.indexOf('section_icons') !== -1);
  },
  onEditorClosed() {
    this.editOverlayIcons(false);
  },
  editOverlayIcons(toggle) {
    this.$element.toggleClass('raven-edit-icons', toggle);
  }
});
function classic($scope) {
  new Posts({
    $element: $scope
  });
}
function cover($scope) {
  new Posts({
    $element: $scope
  });
}

},{"../utils/masonry":8,"../utils/module":9,"../utils/pagination":20,"../utils/sortable":22}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProductDataTabs = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        standardTab: '.raven-product-data-tabs.standard-tab-style .woocommerce-tabs ul.tabs a'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $standardTab: this.$element.find(selectors.standardTab)
    };
  },
  bindEvents() {
    if (document.body.classList.contains('elementor-editor-active')) {
      $('.wc-tabs-wrapper, .woocommerce-tabs, #rating').trigger('init');
    }
    this.elements.$standardTab.on('click', function (event) {
      $('.raven-product-data-tabs.standard-tab-style .woocommerce-tabs ul.tabs li').removeClass('previous-tab');
      const target = $(event.currentTarget).parent(),
        previousElement = target.prev();
      previousElement.addClass('previous-tab');
    });
  }
});
function _default($scope) {
  new ProductDataTabs({
    $element: $scope
  });
}

},{"../utils/module":9}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProductsGallery = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        gallery: '.raven-product-gallery-wrapper',
        galleryItemsWrapper: '.raven-product-gallery-items',
        galleryItems: '.raven-product-gallery-items li',
        galleryBase: '.woocommerce-product-gallery-raven-widget',
        galleryThumbs: '.flex-control-thumbs',
        galleryImageFit: '.raven-image-fit img'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $gallery: this.$element.find(selectors.gallery),
      $galleryItemsWrapper: this.$element.find(selectors.galleryItemsWrapper),
      $galleryItems: this.$element.find(selectors.galleryItems),
      $galleryBase: this.$element.find(selectors.galleryBase),
      $galleryThumbs: this.$element.find(selectors.galleryThumbs)
    };
  },
  getGallerylSettings() {
    return {
      layout: this.getInstanceValue('gallery_layout'),
      thumbnails: this.getInstanceValue('thumbnails') || '',
      carousel: this.getInstanceValue('carousel'),
      lightbox: this.getInstanceValue('lightbox'),
      zoom: this.getInstanceValue('zoom'),
      wcZoomDisabled: this.$element.data('wc-disable-zoom') || '',
      wcLighboxDisabled: this.$element.data('wc-disable-lightbox') || '',
      videoIsEnable: this.getInstanceValue('video_enable') === '1' ? true : false,
      aspectIsEnabled: this.getInstanceValue('enable_aspect_ratio') === 'true' ? true : false
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    const settings = this.getGallerylSettings();
    if (settings.layout === 'stack' && settings.aspectIsEnabled) {
      objectFitPolyfill(this.$element.find(this.getSettings('selectors.galleryImageFit')));
    }
    this.galleryItemsHtml = [];
  },
  bindEvents() {
    this.galleryEvent();
  },
  onElementChange(propertyName) {
    const settings = this.getGallerylSettings();
    if (propertyName === 'aspect_ratio' && settings.videoIsEnable) {
      const $gallery = this.$element.find('.raven-product-gallery-wrapper').find('.raven-product-gallery-stack-wrapper'),
        videos = $gallery.find('.jupiterx-product-gallery-stack-video'),
        images = $gallery.find('.raven-product-gallery-stack-image'),
        imagesHeight = images.height();
      videos.css('height', 'auto');
      if (images.length === 0) {
        setTimeout(() => videos.css('height', 'max-content'));
        return;
      }
      setTimeout(() => videos.height(imagesHeight));
    }
    const reloadProperties = ['product_thumbnail_width', 'product_thumbnail_width'];
    if (reloadProperties.includes(propertyName)) {
      new window.jupiterxProductGallery(jQuery('.raven-product-gallery-wrapper'), true);
    }
  },
  galleryEvent() {
    this.ProductGalleryInstance();
    const self = this;
    this.resetButtonOnClick();
    this.updateGalleryPictures(self);
    this.singleSlideOnClick();
  },
  ProductGalleryInstance() {
    const $ = jQuery,
      settings = this.getGallerylSettings(),
      slider = this.elements.$galleryBase.find('.raven-product-gallery-slider-wrapper'),
      widgetWrapper = this.getWrapper(),
      widget = this;
    $(slider).removeClass('jupiterx-product-gallery-vertical jupiterx-product-gallery-horizontal jupiterx-product-gallery-none');
    const thumbnailsView = this.getThumbnail(widget);
    if (window.innerWidth < 768) {
      settings.thumbnails = 'horizontal';
      $(widgetWrapper).find('.woocommerce-product-gallery-raven-widget').removeClass('raven-product-gallery-left raven-product-gallery-right').addClass('raven-product-gallery-horizontal').find('ol').removeClass('slick-vertical');
    }
    const ProductGallery = function ($target, afterAjax = false) {
      this.$target = $target;
      if (true === afterAjax) {
        return this;
      }
      if ('stack' === settings.layout) {
        if (settings.zoom) {
          this.initZoom('li');
        }
        if (settings.zoom) {
          this.lightbox();
        }
        if (settings.videoIsEnable) {
          this.controlVideoOnload();
          this.endedVideo();
          this.handleVideoHeight();
        }
      }
      if ('standard' === settings.layout) {
        this.slider();
        if (!settings.carousel) {
          this.carousel();
        }
        if (settings.zoom) {
          this.zoomIcon();
        }
        if (settings.lightbox) {
          this.standardLightbox();
        }
        if (!settings.lightbox) {
          const $image = this.$target.find('.woocommerce-product-gallery__image');
          $image.find('a').css('pointer-events', 'none');
        }
        if (settings.wcZoomDisabled && settings.zoom) {
          setTimeout(() => {
            this.initZoom('.woocommerce-product-gallery__image');
          }, 100);
        }
        if (settings.wcLighboxDisabled && settings.lightbox && !settings.videoIsEnable) {
          this.initPhotoswipe();
        }
        this.disableProductElementorLighBox();
        this.createSlickThumbnailsSlider();
        this.repositionDirectionNav();
        if (settings.videoIsEnable) {
          this.handleIframe();
          this.handleVideoOnChangeSlide();
          this.handlePhotoswipe();
          this.endedVideo();
        }
      }
    };
    this.handleWcModal();
    ProductGallery.prototype.endedVideo = function () {
      $('video').on('ended', function (event) {
        const current = $(event.currentTarget),
          iconTag = current.parent().find('i');
        iconTag.removeClass('circle-pause').addClass('circle-play');
      });
    };
    ProductGallery.prototype.handleIframe = function () {
      const gallery = this.$target;
      let aciveItem = gallery.find('.flex-active-slide');
      if (aciveItem.length === 0) {
        aciveItem = gallery.find('.woocommerce-product-gallery__image');
      }
      aciveItem.find('iframe').on('load', function (event) {
        $(event.currentTarget).parent().removeClass('iframe-on-load');
        $(event.currentTarget).show();
        $(event.currentTarget).next().hide();
      });
    };
    ProductGallery.prototype.handleVideoHeight = function () {
      const $gallery = this.$target.find('.raven-product-gallery-stack-wrapper'),
        videos = $gallery.find('.jupiterx-product-gallery-stack-video'),
        images = $gallery.find('.raven-product-gallery-stack-image'),
        imagesHeight = images.height();
      if (images.length === 0) {
        videos.css('height', 'max-content');
        return;
      }
      videos.height(imagesHeight);
    };
    ProductGallery.prototype.slider = function () {
      const isRtl = document.body.classList.contains('rtl') ? true : false;
      let nextIcon = '<svg fill=\"#333333\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"7.2px\" height=\"12px\" viewBox=\"0 0 7.2 12\" style=\"enable-background:new 0 0 7.2 12;\" xml:space=\"preserve\"><path class=\"st0\" d=\"M4.8,6l-4.5,4.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l5.2-5C7.1,6.5,7.2,6.3,7.2,6S7.1,5.5,6.9,5.3l-5.2-5C1.5,0.1,1.2,0,1,0C0.7,0,0.5,0.1,0.3,0.3c-0.4,0.4-0.4,1,0,1.4L4.8,6z\"/></svg>';
      let prevIcon = '<svg fill=\"#333333\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"7.2px\" height=\"12px\" viewBox=\"0 0 7.2 12\" style=\"enable-background:new 0 0 7.2 12;\" xml:space=\"preserve\"><path class=\"st0\" d=\"M2.4,6l4.5-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-5.2,5C0.1,5.5,0,5.7,0,6s0.1,0.5,0.3,0.7l5.2,5\tC5.7,11.9,6,12,6.2,12c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L2.4,6z\"/></svg>';
      if (isRtl) {
        nextIcon = '<svg fill=\"#333333\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"7.2px\" height=\"12px\" viewBox=\"0 0 7.2 12\" style=\"enable-background:new 0 0 7.2 12;\" xml:space=\"preserve\"><path class=\"st0\" d=\"M2.4,6l4.5-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-5.2,5C0.1,5.5,0,5.7,0,6s0.1,0.5,0.3,0.7l5.2,5\tC5.7,11.9,6,12,6.2,12c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L2.4,6z\"/></svg>';
        prevIcon = '<svg fill=\"#333333\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"7.2px\" height=\"12px\" viewBox=\"0 0 7.2 12\" style=\"enable-background:new 0 0 7.2 12;\" xml:space=\"preserve\"><path class=\"st0\" d=\"M4.8,6l-4.5,4.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l5.2-5C7.1,6.5,7.2,6.3,7.2,6S7.1,5.5,6.9,5.3l-5.2-5C1.5,0.1,1.2,0,1,0C0.7,0,0.5,0.1,0.3,0.3c-0.4,0.4-0.4,1,0,1.4L4.8,6z\"/></svg>';
      }
      const args = {
        flexslider: {
          allowOneSlide: false,
          animation: 'slide',
          animationLoop: false,
          animationSpeed: 500,
          controlNav: 'thumbnails',
          directionNav: true,
          nextText: nextIcon,
          prevText: prevIcon,
          rtl: isRtl,
          slideshow: false,
          smoothHeight: false
        },
        photoswipe_enabled: settings.lightbox && !settings.videoIsEnable ? true : false,
        zoom_enabled: settings.zoom ? true : false
      };
      slider.wc_product_gallery(args);
      this.smoothHeight();
    };
    ProductGallery.prototype.smoothHeight = function (duration = 400) {
      setTimeout(() => {
        const $obj = $(widgetWrapper).find('.flex-viewport');
        const mainImageHeight = $(widgetWrapper).find('.flex-active-slide').height();
        $obj.animate({
          height: mainImageHeight
        });
        const half = mainImageHeight / 2;
        $('.flex-direction-nav').css('top', half + 'px');
      }, duration);
    };
    ProductGallery.prototype.getGalleryItems = function () {
      const $slides = $('.woocommerce-product-gallery__image'),
        items = [];
      if ($slides.length > 0) {
        $slides.each(function (i, el) {
          const img = $(el).find('img');
          if (img.length > 0) {
            const largeImageSrc = img.attr('data-large_image'),
              largeImageW = img.attr('data-large_image_width'),
              largeImageH = img.attr('data-large_image_height'),
              alt = img.attr('alt'),
              item = {
                alt,
                src: largeImageSrc,
                w: largeImageW,
                h: largeImageH,
                title: img.attr('data-caption') ? img.attr('data-caption') : img.attr('title')
              };
            items.push(item);
          } else {
            $(el).find('.jupiterx-attachment-media-custom-video-icons').css('max-width', 'inherit');
            const iframe = $(el).find('.jupiterx-attachment-media-iframe').parent().html();
            items.push({
              html: '<div class="jupiterx-pswp-attachment-media-iframe">' + iframe + '</div>'
            });
          }
        });
      }
      return items;
    };
    ProductGallery.prototype.handlePhotoswipe = function () {
      if (!settings.lightbox) {
        return;
      }

      // Disable all default events.
      this.$target.off('click', '.woocommerce-product-gallery__trigger');
      this.$target.off('click', '.woocommerce-product-gallery__image a');
      this.$target.on('click', '.woocommerce-product-gallery__trigger', this.openPhotoswipe);
      this.$target.on('click', '.woocommerce-product-gallery__image a', function (e) {
        e.preventDefault();
      });
      if (settings.zoom) {
        if (this.$target.find('.woocommerce-product-gallery__trigger').length === 0) {
          this.$target.append('<a href="#" class="woocommerce-product-gallery__trigger"></a>');
        }
        const $zoomIcon = $(this.$target).find('.woocommerce-product-gallery__trigger');
        $($zoomIcon).hide();
        $(document).on('click', '.zoomImg, .woocommerce-product-gallery__image a', function () {
          $($zoomIcon).click();
        });
      }
    };

    /**
     * Init PhotoSwipe.
     */
    ProductGallery.prototype.initPhotoswipe = function () {
      const $target = this.$target,
        images = $target.find('img');
      if (images.length > 0) {
        this.$target.prepend('<a href="#" class="woocommerce-product-gallery__trigger"></a>');
        this.$target.on('click', '.woocommerce-product-gallery__trigger', this.openPhotoswipe);
        this.$target.on('click', '.woocommerce-product-gallery__image a', function (event) {
          event.preventDefault();
        });
      }
      if (settings.zoom) {
        const $zoomIcon = $target.find('.woocommerce-product-gallery__trigger');
        $(document).on('click', '.flex-active-slide', function (event) {
          const iframe = $(event.currentTarget).find('.jupiterx-attachment-media-iframe');
          if (iframe.length > 0) {
            return;
          }
          $($zoomIcon).click();
        });
      }
    };
    ProductGallery.prototype.handleVideoOnPhotoSwipe = function (element, photoswipe) {
      if (!$(element).hasClass('pswp--open')) {
        return;
      }
      photoswipe.listen('beforeChange', function () {
        const video = $(element).find('video'),
          iframe = $(element).find('iframe'),
          items = $(element).find('.pswp__item');
        if (video.length > 0) {
          const iconTag = video.parent().find('i');
          iconTag.removeClass('circle-pause').addClass('circle-play');
          video.get(0).pause();
        }
        if (iframe.length > 0) {
          ProductGallery.prototype.resetIframes(iframe);
          $(element).find('iframe').on('load', function (event) {
            $(event.currentTarget).parent().removeClass('iframe-on-load');
            $(event.currentTarget).show();
            $(event.currentTarget).next().hide();
          });
        }
        items.each(function (index, item) {
          if ('block' === $(item).css('display') && typeof $(item).find('video').attr('autoplay') !== 'undefined') {
            const iconTag = video.parent().find('i');
            iconTag.removeClass('circle-play').addClass('circle-pause');
            $(item).find('video').get(0).play();
          }
        });
      });
      ProductGallery.prototype.handleVideoOnClick($(element));
    };
    ProductGallery.prototype.openPhotoswipe = function (event) {
      event.preventDefault();
      const pswpElement = $('.pswp')[0],
        items = ProductGallery.prototype.getGalleryItems(),
        eventTarget = $(event.target);
      let clicked;
      if (eventTarget.is('.woocommerce-product-gallery__trigger') || eventTarget.is('.woocommerce-product-gallery__trigger img')) {
        clicked = slider.find('.flex-active-slide');
      } else {
        clicked = eventTarget.closest('.woocommerce-product-gallery__image');
        return;
      }
      const options = $.extend({
        index: $(clicked).index(),
        addCaptionHTMLFn: (item, captionEl) => {
          if (!item.title) {
            captionEl.children[0].textContent = '';
            return false;
          }
          captionEl.children[0].textContent = item.title;
          return true;
        } // eslint-disable-line
      }, {
        closeOnScroll: false,
        history: false,
        hideAnimationDuration: 0,
        showAnimationDuration: 0
      });

      // Initializes and opens PhotoSwipe.
      const photoswipe = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options); // eslint-disable-line
      photoswipe.init();
      ProductGallery.prototype.handleVideoOnPhotoSwipe(pswpElement, photoswipe);
    };
    ProductGallery.prototype.disableProductElementorLighBox = function () {
      const $imageLinks = $(this.$target).find('a');
      if (settings.lightbox && document.body.classList.contains('elementor-editor-active')) {
        $($imageLinks).attr('data-elementor-open-lightbox', 'yes');
        return;
      }
      $($imageLinks).attr('data-elementor-open-lightbox', 'no');
    };
    ProductGallery.prototype.initZoom = function (item) {
      if (!$.isFunction($.fn.zoom)) {
        return;
      }
      const $target = this.$target,
        zoomTarget = $target.find(item);
      $(zoomTarget).each(function (index, target) {
        const image = $(target).find('img'),
          itemWidth = $(target).width();
        if (image.data('large_image_width') > itemWidth) {
          const zoomOptions = {
            touch: false
          };
          if ('ontouchstart' in window) {
            zoomOptions.on = 'click';
          }
          $(target).trigger('zoom.destroy');
          $(target).zoom(zoomOptions);
        }
      });
    };
    ProductGallery.prototype.carousel = function () {
      const $target = this.$target,
        nav = $target.find('.flex-direction-nav');
      $(nav).remove();
    };
    ProductGallery.prototype.lightbox = function () {
      const self = this;
      setTimeout(function () {
        const $target = self.$target;
        $target.on('click', '.zoomImg', function (event) {
          $(event.currentTarget).prev().click();
        });
      }, 100);
    };
    ProductGallery.prototype.standardLightbox = function () {
      if (settings.zoom) {
        return;
      }
      const $target = this.$target;
      if ($target.find('.woocommerce-product-gallery__trigger').length === 0) {
        this.$target.append('<a href="#" class="woocommerce-product-gallery__trigger"></a>');
      }
      let $zoomIcon = null;
      $zoomIcon = $target.find('.woocommerce-product-gallery__trigger');
      $($zoomIcon).hide();
      $(document).on('click', '.zoomImg, .woocommerce-product-gallery__image a', function () {
        $($zoomIcon).click();
      });
    };
    ProductGallery.prototype.zoomIcon = function () {
      const $target = this.$target,
        $zoomIcon = $target.find('.woocommerce-product-gallery__trigger');
      $($zoomIcon).hide();
      if (settings.lightbox) {
        $target.on('click', '.zoomImg, .woocommerce-product-gallery__image a', function () {
          $($zoomIcon).click();
        });
      }
    };
    ProductGallery.prototype.createSlickThumbnailsSlider = function () {
      const $gallery = this.$target.find('.raven-product-gallery-slider-wrapper');
      let options = {
        infinite: false,
        draggable: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        prevArrow: '<button class="slick-prev" aria-label="Prev" type="button"><svg fill="#333333" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="7.2px" height="12px" viewBox="0 0 7.2 12" style="enable-background:new 0 0 7.2 12;" xml:space="preserve"><path class="st0" d="M2.4,6l4.5-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-5.2,5C0.1,5.5,0,5.7,0,6s0.1,0.5,0.3,0.7l5.2,5	C5.7,11.9,6,12,6.2,12c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L2.4,6z"/></svg></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"><svg fill="#333333" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="7.2px" height="12px" viewBox="0 0 7.2 12" style="enable-background:new 0 0 7.2 12;" xml:space="preserve"><path class="st0" d="M4.8,6l-4.5,4.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l5.2-5C7.1,6.5,7.2,6.3,7.2,6S7.1,5.5,6.9,5.3l-5.2-5C1.5,0.1,1.2,0,1,0C0.7,0,0.5,0.1,0.3,0.3c-0.4,0.4-0.4,1,0,1.4L4.8,6z"/></svg></button>'
      };
      if (['left', 'right'].includes(widget.getThumbnail(widget))) {
        options = $.extend(options, {
          vertical: true,
          slidesToShow: 5
        });
        setTimeout(function () {
          const activeItems = $gallery.find('.slick-active'),
            count = activeItems.length;
          let height = activeItems.height() * count;
          if (parseInt(activeItems.css('margin-bottom')) > 0) {
            height += parseInt(activeItems.css('margin-bottom')) * count;
          }
          if (parseInt(activeItems.css('border-bottom-width')) > 0) {
            height += parseInt(activeItems.css('border-bottom-width')) * count;
          }
          if (parseInt(activeItems.css('border-top-width')) > 0) {
            height += parseInt(activeItems.css('border-top-width')) * count;
          }
          $gallery.find('.slick-track, .slick-list').css('height', height + 'px');
        }, 100);
      }
      if ('horizontal' === widget.getThumbnail(widget)) {
        options.arrows = false;
        options.useTransform = false;
      } else {
        options.arrows = true;
        options.useTransform = true;
      }
      if ($('.flex-control-thumbs').hasClass('slick-initialized')) {
        $('.flex-control-thumbs').slick('destroy');
        $('.flex-control-thumbs').slick(options);
      } else {
        $('.flex-control-thumbs').slick(options);
      }
      if (settings.videoIsEnable) {
        const galleryItems = $gallery.find('.woocommerce-product-gallery__image');
        galleryItems.each(function (index, element) {
          if (typeof $(element).data('poster') !== 'undefined') {
            $('.flex-control-nav').find('li[data-slick-index=' + index + ']').prepend('<i class="jupiterx-product-single-play-icon"></i>');
          }
        });
      }
      const self = this;
      $gallery.on('click', '.flex-direction-nav a', function () {
        $gallery.find('.flex-control-nav').slick('slickGoTo', $gallery.find('.flex-active-slide').index());
        $gallery.find('.slick-track li').removeClass('active-slick-slide');
        $gallery.find('.flex-active').parent().addClass('active-slick-slide');
        self.smoothHeight(0);
      });
    };
    ProductGallery.prototype.repositionDirectionNav = function () {
      const $gallery = this.$target.find('.raven-product-gallery-slider-wrapper');
      const positionNav = function () {
        const $nav = $gallery.find('.flex-direction-nav'),
          $thumbs = $gallery.find('.flex-control-thumbs'),
          $videoIcon = $gallery.find('.jupiterx-attachment-media-custom-video-icons'),
          $viewport = $gallery.find('.flex-viewport');
        const width = $thumbs.outerWidth(true);
        if (widget.getThumbnail(widget) === 'right') {
          $nav.css('right', width);
        }
        if (widget.getThumbnail(widget) === 'left') {
          $nav.css('left', width);
        }
        $videoIcon.css('max-width', $viewport.width());
      };
      $(window).resize(positionNav);
      positionNav();
    };
    ProductGallery.prototype.handleVideoOnClick = function ($gallery) {
      $gallery.off('click', '.jupiterx-attachment-media-custom-video-icons').on('click', '.jupiterx-attachment-media-custom-video-icons', function (event) {
        const current = $(event.currentTarget),
          iconTag = $(event.currentTarget).find('i'),
          video = current.prev(),
          wrapper = $gallery.find('.jupiterx-attachment-media-iframe'),
          videos = $gallery.find('video'),
          iframe = $gallery.find('iframe');
        if (iframe.length > 0) {
          ProductGallery.prototype.resetIframes(iframe);
        }
        if (!video.get(0).paused) {
          iconTag.removeClass('circle-pause').addClass('circle-play');
          video.get(0).pause();
          return;
        }
        wrapper.find('i').removeClass('circle-pause').addClass('circle-play');
        videos.trigger('pause');
        iconTag.removeClass('circle-play').addClass('circle-pause');
        video.get(0).play();
      });
    };
    ProductGallery.prototype.controlVideoOnload = function () {
      const $gallery = this.$target.find('.raven-product-gallery-stack-wrapper'),
        videos = $gallery.find('video'),
        iframe = $gallery.find('iframe');
      let active = $gallery.find('li:first-child');
      if ($gallery.length === 0) {
        return;
      }
      if (videos.length > 0) {
        videos.each(function () {
          const iconTag = $(this).parent().find('i');
          iconTag.removeClass('circle-pause').addClass('circle-play');
          $(this).get(0).pause();
        });
      }
      if (iframe.length > 0) {
        ProductGallery.prototype.resetIframes(iframe);
        iframe.on('load', function (event) {
          $(event.currentTarget).parent().removeClass('iframe-on-load');
          $(event.currentTarget).show();
          $(event.currentTarget).next().hide();
        });
      }
      if (videos.length > 0 && active.find('video').length === 0) {
        const firstVideo = videos[0];
        active = $(firstVideo).parent();
      }
      if (active.length > 0 && active.find('video').length > 0 && typeof active.find('video').attr('autoplay') !== 'undefined') {
        const iconTag = active.find('video').parent().find('i');
        iconTag.removeClass('circle-play').addClass('circle-pause');
        active.find('video').get(0).play();
      }
      ProductGallery.prototype.handleVideoOnClick($gallery);
    };
    ProductGallery.prototype.handleVideoOnChangeSlide = function () {
      const $gallery = this.$target,
        selectors = '.flex-direction-nav a, .flex-control-thumbs li, .flex-control-thumbs li .jupiterx-product-single-play-icon, .woocommerce-product-gallery__image a, .woocommerce-product-gallery__trigger';
      $gallery.on('click', selectors, function () {
        const video = $gallery.find('video'),
          iframe = $gallery.find('iframe'),
          active = $gallery.find('.flex-active-slide');
        if (video.length > 0) {
          const iconTag = video.parent().find('i');
          iconTag.removeClass('circle-pause').addClass('circle-play');
          video.each(function (index, item) {
            $(item).get(0).pause();
          });
        }
        if (iframe.length > 0) {
          ProductGallery.prototype.resetIframes(iframe);
          iframe.on('load', function (event) {
            $(event.currentTarget).parent().removeClass('iframe-on-load');
            $(event.currentTarget).show();
            $(event.currentTarget).next().hide();
          });
        }
        if (active.length > 0 && typeof active.find('video').attr('autoplay') !== 'undefined') {
          const iconTag = video.parent().find('i');
          iconTag.removeClass('circle-play').addClass('circle-pause');
          active.find('video').get(0).play();
        }
      });
      ProductGallery.prototype.handleVideoOnClick($gallery);
    };
    ProductGallery.prototype.resetIframes = function (iframe) {
      iframe.each(function (index, element) {
        const src = $(element).attr('src');
        $(element).attr('src', src);
      });
    };
    new ProductGallery(jQuery('.raven-product-gallery-wrapper'));
    window.jupiterxProductGallery = ProductGallery;

    // Let library update slider 250ms after window resize event.
    const handleResize = () => {
      const windowInnerWidth = window.innerWidth;
      if (windowInnerWidth < 768 || 'horizontal' === widget.getThumbnail(widget)) {
        settings.thumbnails = 'horizontal';
        $(widgetWrapper).find('.woocommerce-product-gallery-raven-widget').removeClass('raven-product-gallery-left raven-product-gallery-right').addClass('raven-product-gallery-horizontal').find('ol').removeClass('slick-vertical');
      }
      if (windowInnerWidth >= 768 && 'horizontal' !== thumbnailsView) {
        settings.thumbnails = thumbnailsView;
        $(widgetWrapper).find('.woocommerce-product-gallery-raven-widget').removeClass('raven-product-gallery-horizontal raven-product-gallery-right raven-product-gallery-left').addClass(`raven-product-gallery-${thumbnailsView}`).find('ol').addClass('slick-vertical');
      }
      new ProductGallery(jQuery('.raven-product-gallery-wrapper'));
      if (windowInnerWidth < 768) {
        $(widgetWrapper).find('div.flex-active-slide').css('width', windowInnerWidth - 40);
      }
    };
    window.addEventListener('resize', this.debounce(handleResize, 100));
  },
  debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  },
  handleWcModal() {
    $('.pswp__button--close').off().on('click touchend', function (event) {
      $(event.target).closest('.pswp--open').removeClass('pswp--open');
      setTimeout(() => {
        $(event.target).closest('.pswp--open').removeClass('pswp--open');
      });
    });
    $('.pswp__item').off().on('click touched', function (event) {
      if (!$(event.target).closest('img.pswp__img').length && !$(event.target).closest('.jupiterx-pswp-attachment-media-iframe').length) {
        $(event.target).closest('.pswp--open').removeClass('pswp--open');
      }
    });
  },
  onFullScreenClose() {
    const self = this;
    $('.pswp__button--fs').on('click', function () {
      self.handleWcModal();
    });
  },
  updateGallery(data) {
    if (false === data.replace) {
      return;
    }
    const id = this.getWrapper(),
      content = data.content,
      self = this,
      settings = this.getGallerylSettings();
    if ('stack' === data.layout) {
      $(id).find('.raven-product-gallery-wrapper').html(content);
      const productGallery = new window.jupiterxProductGallery(jQuery('.raven-product-gallery-wrapper'), true);
      if (settings.videoIsEnable) {
        productGallery.controlVideoOnload();
      }
      return;
    }
    $(id).find('.woocommerce-product-gallery-raven-widget').html(content);
    let i = 0;
    $(id).find('.flex-control-nav li').each(function () {
      if (i === 0) {
        $(this).addClass('slick-slide slick-current slick-active');
      } else {
        $(this).addClass('slick-slide slick-active');
      }
      $(this).attr('style', 'width: 61px;');
      $(this).attr('tabindex', '0');
      $(this).attr('aria-hidden', 'false');
      $(this).attr('data-slick-index', i);
      i++;
    });
    const listOl = $(id).find('.flex-control-nav'),
      listOlHtml = listOl.html(),
      listOlNew = document.createElement('ol'),
      slickList = document.createElement('div'),
      slickTrack = document.createElement('div');
    listOlNew.setAttribute('class', 'flex-control-nav flex-control-thumbs slick-initialized slick-slider');
    slickList.setAttribute('class', 'slick-list');
    slickTrack.setAttribute('class', 'slick-track');
    $(slickTrack).append(listOlHtml);
    slickList.appendChild(slickTrack);
    listOlNew.appendChild(slickList);
    $(id).find('ol.flex-control-nav').remove();
    const position = $(id).find('.flex-viewport');
    $(listOlNew).insertAfter(position);
    self.galleryEvent();
    self.singleSlideOnClick();
    self.handleWcModal();
    self.onFullScreenClose();
    const productGallery = new window.jupiterxProductGallery(jQuery('.raven-product-gallery-wrapper'), true);
    if (settings.videoIsEnable) {
      productGallery.controlVideoOnload();
    }
    productGallery.createSlickThumbnailsSlider();
  },
  restButtonAjax() {
    const self = this,
      id = self.getWrapper(),
      productId = $(id).find('input[name="product_id"]').val(),
      variationId = $('input[name="variation_id"]').val(),
      cacheIndex = self.galleryItemsHtml.findIndex(item => item.key === 'reset');
    if (0 === variationId || _.isEmpty(variationId)) {
      const variationForm = document.getElementById('jupiterx-clear-variable-button-single-page');
      variationForm.removeEventListener('click', this.restButtonAjax);
      return;
    }
    if (cacheIndex !== -1) {
      const data = self.galleryItemsHtml[cacheIndex].value;
      self.updateGallery(data);
      return;
    }
    wp.ajax.post({
      beforeSend: () => {
        const itemHeight = $(id).find('.flex-active').outerHeight(),
          mainImage = $(id).find('.flex-viewport').outerHeight(),
          nav = $(id).find('.flex-control-nav'),
          style = `.raven-product-gallery-wrapper-placeholder .slick-slide { min-height: ${itemHeight}px };`,
          temporaryStyle = '<div class="temporary-style"><style>' + style + '</style></div>',
          stackedLi = $('.jupiterx-product-gallery-stack-item').outerHeight();
        $(id).find('.raven-product-gallery-wrapper').append(temporaryStyle);
        $(id).find('.flex-viewport').remove();
        $(`<div class="flex-viewport" style="width:100%; height:${mainImage}px;"></div>`).insertBefore(nav);
        $(id).find('.raven-product-gallery-wrapper').addClass('raven-product-gallery-wrapper-placeholder');
        $(id).find('.jupiterx-product-gallery-stack-item').css('height', stackedLi);
        $('#variation-previous-number').val(0);
      },
      action: 'jupiterx_product_gallery_get_gallery_items',
      variation: '0',
      post_id: $(id).find('input[name="post_id"]').val(),
      form_id: $(id).find('input[name="form_id"]').val(),
      product_id: productId,
      nonce: ravenTools.nonce //eslint-disable-line
    }).always(function () {
      $('.raven-product-gallery-wrapper').removeClass('raven-product-gallery-wrapper-placeholder');
      $(id).find('.raven-product-gallery-wrapper').find('.temporary-style').remove();
      const variationForm = document.getElementById('jupiterx-clear-variable-button-single-page');
      variationForm.removeEventListener('click', this.restButtonAjax);
    }).done(function (data) {
      self.galleryItemsHtml.push({
        key: 'reset',
        value: data
      });
      self.updateGallery(data);
    });
  },
  resetButtonOnClick() {
    const variationForm = document.getElementById('jupiterx-clear-variable-button-single-page');
    if (_.isNull(variationForm)) {
      return;
    }
    variationForm.addEventListener('click', this.restButtonAjax);
  },
  updateGalleryPictures(self) {
    const id = this.getWrapper();
    const defaultVariation = $('.raven-product-add-to-cart input.variation_id').val();
    $('body').append(`<input type="hidden" id="variation-first-load" value="true">`);
    $('body').append(`<input type="hidden" id="variation-previous-number" value="${defaultVariation}">`);
    $('.variation_id').off().on('change', function () {
      const variationId = $('input[name="variation_id"]').val(),
        firstLoad = $('#variation-first-load').val(),
        previousVariation = $('#variation-previous-number').val(),
        productId = $(id).find('input[name="product_id"]').val(),
        cacheIndex = self.galleryItemsHtml.findIndex(item => item.key === variationId);
      if (_.isEmpty(variationId) || 'true' === firstLoad || variationId === previousVariation) {
        $('#variation-first-load').val('false');
        return;
      }
      if (cacheIndex !== -1) {
        const data = self.galleryItemsHtml[cacheIndex].value;
        self.updateGallery(data);
        return;
      }
      wp.ajax.post({
        beforeSend: () => {
          const itemHeight = $(id).find('.flex-active').outerHeight(),
            mainImage = $(id).find('.flex-viewport').outerHeight(),
            nav = $(id).find('.flex-control-nav'),
            style = `.raven-product-gallery-wrapper-placeholder .slick-slide { min-height: ${itemHeight}px };`,
            temporaryStyle = '<div class="temporary-style"><style>' + style + '</style></div>',
            stackedLi = $('.jupiterx-product-gallery-stack-item').outerHeight();
          $(id).find('.raven-product-gallery-wrapper').append(temporaryStyle);
          $(id).find('.flex-viewport').remove();
          $(`<div class="flex-viewport" style="width:100%; height:${mainImage}px;"></div>`).insertBefore(nav);
          $(id).find('.raven-product-gallery-wrapper').addClass('raven-product-gallery-wrapper-placeholder');
          $(id).find('.jupiterx-product-gallery-stack-item').css('height', stackedLi);
          $('#variation-previous-number').val(variationId);
        },
        action: 'jupiterx_product_gallery_get_gallery_items',
        variation: variationId,
        post_id: $(id).find('input[name="post_id"]').val(),
        form_id: $(id).find('input[name="form_id"]').val(),
        product_id: productId,
        nonce: ravenTools.nonce //eslint-disable-line
      }).always(function () {
        $('.raven-product-gallery-wrapper').removeClass('raven-product-gallery-wrapper-placeholder');
        $(id).find('.raven-product-gallery-wrapper').find('.temporary-style').remove();
      }).done(function (data) {
        self.galleryItemsHtml.push({
          key: variationId,
          value: data
        });
        self.updateGallery(data);
      });
    });
  },
  getWrapper() {
    return 'div[data-id="' + this.getID() + '"]';
  },
  singleSlideOnClick() {
    const id = this.getWrapper();
    const self = this;
    $(id).find('.slick-current').addClass('active-slick-slide');
    $(id).find('li.slick-slide').on('click', function () {
      $(id).find('li.slick-slide').removeClass('active-slick-slide');
      $(this).addClass('active-slick-slide');
      self.smoothHeight();
    });
  },
  smoothHeight(duration = 0) {
    const id = this.getWrapper();
    setTimeout(() => {
      const $obj = $(id).find('.flex-viewport');
      const mainImageHeight = $(id).find('.flex-active-slide').height();
      $obj.animate({
        height: mainImageHeight
      }, duration);
      const half = mainImageHeight / 2;
      $('.flex-direction-nav').css('top', half + 'px');
    });
  },
  getThumbnail(widget) {
    const settings = widget.getGallerylSettings();
    if ('stack' === settings.layout) {
      return widget.getElementSettings().thumbnails;
    }
    if (0 === widget.elements.$gallery.data('has-gallery')) {
      return 'horizontal';
    }
    return widget.getElementSettings().thumbnails;
  }
});
function _default($scope) {
  new ProductsGallery({
    $element: $scope
  });
}

},{"../utils/module":9}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
/* eslint no-undef: 0 */

const $ = jQuery;
function _default() {
  loadFromBrowser();
  ratingSelector();
  submitNewReview();
}
const submitNewReview = () => {
  $('.jupiterx-product-review-submit-new').on('click', function () {
    $('.jupiterx-product-review-alarm').css('display', 'none');
    $('.jupiterx-product-review-global-error').css('display', 'none');
    const rate = $('#jupiterx-product-review-input-rating');
    const content = $('.jupiterx-product-review-textarea');
    const name = $('.jupiterx-product-review-name');
    const email = $('.jupiterx-product-review-email');
    const related = $('#jupiterx-product-review-related');
    const requiredFields = [rate, content, name, email];
    let error = false;
    requiredFields.forEach(item => {
      if ('' === item.val()) {
        error = true;
        item.parent().find('.jupiterx-product-review-alarm').css('display', 'block');
      }
    });
    if (true === error) {
      return;
    }
    if ($('#jupiterx-product-review-acceptance').length > 0 && $('#jupiterx-product-review-acceptance').is(':checked')) {
      saveToBrowser(name.val(), email.val());
    }
    wp.ajax.post({
      beforeSend: () => {
        $('.jupiterx-product-review-form-wrapper').css('opacity', 0.5);
      },
      action: 'jupiterx_product_review_submitter',
      score: rate.val(),
      content: content.val(),
      name: name.val(),
      email: email.val(),
      post_id: related.val(),
      nonce: ravenTools.nonce
    }).always(function () {
      $('.jupiterx-product-review-form-wrapper').css('opacity', 1.0);
    }).done(function () {
      location.reload();
    }).fail(function () {
      $('.jupiterx-product-review-global-error').css('display', 'block');
    });
  });
};
const ratingSelector = () => {
  const elements = document.querySelectorAll('.jupiterx-product-review-rating-selector');
  // Elementor editor mode.
  const selector = 'jupiterx-product-review-rating-selector ',
    marked = selector + ' jupiterx-product-review-marked',
    unmarked = selector + ' jupiterx-product-review-unmarked';
  let checker = true;

  // On click;
  elements.forEach(el => el.addEventListener('click', () => {
    $('.jupiterx-product-review-rating-selector').attr('class', unmarked);
    $(el).attr('class', marked);
    $(el).prevAll().attr('class', marked);
    $('#jupiterx-product-review-input-rating').val($(el).attr('data-rate'));
    checker = false;
  }));
  elements.forEach(el => el.addEventListener('mouseover', () => {
    if (false === checker) {
      return;
    }
    $(el).attr('class', marked);
    $(el).prevAll().attr('class', marked);
  }));

  // On mouseout.
  elements.forEach(el => el.addEventListener('mouseout', () => {
    if (false === checker) {
      return;
    }
    $(el).attr('class', unmarked);
    $(el).prevAll().attr('class', unmarked);
  }));
};
const loadFromBrowser = () => {
  if (null !== localStorage.getItem('jupiterx-product-review-name')) {
    $('.jupiterx-product-review-name').val(localStorage.getItem('jupiterx-product-review-name'));
  }
  if (null !== localStorage.getItem('jupiterx-product-review-email')) {
    $('.jupiterx-product-review-email').val(localStorage.getItem('jupiterx-product-review-email'));
  }
};
const saveToBrowser = (name, email) => {
  localStorage.setItem('jupiterx-product-review-name', name);
  localStorage.setItem('jupiterx-product-review-email', email);
};

},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ProductsCarousel = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        carouselWrapper: '.raven-swiper-slider',
        sliderWrapper: '.raven-products-carousel-swiper-container',
        itemsSlider: '.swiper-wrapper',
        productData: '.jupiterx-product-container',
        productImage: '.jupiterx-wc-loop-product-image > img',
        categories: '.posted_in',
        addToCartButton: 'a.add_to_cart_button',
        productTitle: '.woocommerce-loop-product__title',
        productPrice: '.price',
        ratingWrapper: '.rating-wrapper',
        product_type_external: 'a.product_type_external',
        product_type_grouped: 'a.product_type_grouped',
        product_type_simple: 'a.product_type_simple'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $carouselWrapper: this.$element.find(selectors.carouselWrapper),
      $sliderWrapper: this.$element.find(selectors.sliderWrapper),
      $itemsSlider: this.$element.find(selectors.itemsSlider),
      $productData: this.$element.find(selectors.productData),
      $productImage: this.$element.find(selectors.productImage),
      $categories: this.$element.find(selectors.categories),
      $addToCartButton: this.$element.find(selectors.addToCartButton),
      $productTitle: this.$element.find(selectors.productTitle),
      $productPrice: this.$element.find(selectors.productPrice),
      $ratingWrapper: this.$element.find(selectors.ratingWrapper),
      $product_type_external: this.$element.find(selectors.product_type_external),
      $product_type_grouped: this.$element.find(selectors.product_type_grouped),
      $product_type_simple: this.$element.find(selectors.product_type_simple)
    };
  },
  getCarouselSettings() {
    return {
      atc_button_location: this.getInstanceValue('pc_atc_button_location'),
      load_effect: this.getInstanceValue('load_effect'),
      overflow_visible: this.getInstanceValue('overflow_visible'),
      slides_view: this.getInstanceValue('slides_view'),
      slides_scroll: this.getInstanceValue('slides_scroll'),
      enable_autoplay: this.getInstanceValue('enable_autoplay'),
      autoplay_speed: this.getInstanceValue('autoplay_speed'),
      enable_infinite_loop: this.getInstanceValue('enable_infinite_loop'),
      enable_hover_pause: this.getInstanceValue('enable_hover_pause'),
      transition_speed: this.getInstanceValue('transition_speed'),
      show_pagination: this.getInstanceValue('show_pagination'),
      pagination_type: this.getInstanceValue('pagination_type'),
      pagination_position: this.getInstanceValue('pagination_position'),
      pause_on_hover: this.getInstanceValue('pause_on_hover'),
      columns_space_between: this.getInstanceValue('columns_space_between')
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.addClassToContent();
    this.wrapAllContents();
    const settings = this.getCarouselSettings(),
      breakpoints = elementorFrontend.config.responsive.activeBreakpoints,
      breakpointsSettings = {};
    const breakpointsArray = Object.entries(breakpoints).sort(([, a], [, b]) => a.value - b.value);
    let lastMinWidth = 0;
    let desktopBreakpoint = 0;
    breakpointsArray.forEach(([breakpointName, bp]) => {
      if (bp.direction === 'max') {
        breakpointsSettings[lastMinWidth] = {
          slidesPerView: this.getDeviceSlidesPerView(breakpointName),
          slidesPerGroup: this.getDeviceSlidesToScroll(breakpointName),
          spaceBetween: this.getSpaceBetween(breakpointName)
        };

        // Keep track of the largest max-value breakpoint
        desktopBreakpoint = Math.max(desktopBreakpoint, bp.value);
      } else {
        breakpointsSettings[bp.value] = {
          slidesPerView: this.getDeviceSlidesPerView(breakpointName),
          slidesPerGroup: this.getDeviceSlidesToScroll(breakpointName),
          spaceBetween: this.getSpaceBetween(breakpointName)
        };
      }
      lastMinWidth = bp.value;
    });

    // Explicitly define "Desktop" as anything beyond the highest max breakpoint
    breakpointsSettings[desktopBreakpoint] = {
      slidesPerView: this.getDeviceSlidesPerView('desktop'),
      slidesPerGroup: this.getDeviceSlidesToScroll('desktop'),
      spaceBetween: this.getSpaceBetween('desktop')
    };
    const options = {
      draggable: false,
      autoplay: settings.enable_autoplay === 'yes' ? {
        delay: settings.autoplay_speed
      } : false,
      loop: settings.enable_infinite_loop === 'yes',
      watchOverflow: settings.enable_hover_pause === 'yes',
      speed: +settings.transition_speed,
      slidesPerView: this.getDeviceSlidesPerView('desktop'),
      slidesPerGroup: this.getDeviceSlidesToScroll('desktop'),
      spaceBetween: this.getSpaceBetween('desktop'),
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      appendArrows: this.elements.$sliderWrapper,
      breakpoints: breakpointsSettings,
      handleElementorBreakpoints: true
    };
    const self = this;
    this.elements.$sliderWrapper.each(function (index, swiperContainer) {
      $(this).parents('.elementor-widget-raven-products-carousel').find('.raven-products-carousel').addClass('swiper-' + index);
      if (options.navigation) {
        options.navigation = {
          nextEl: $(swiperContainer).parents('.raven-products-carousel.swiper-' + index).find('.swiper-button-next')[0],
          prevEl: $(swiperContainer).parents('.raven-products-carousel.swiper-' + index).find('.swiper-button-prev')[0]
        };
      }
      options.pagination = false;
      if (settings.show_pagination === 'yes') {
        options.pagination = {
          el: $(swiperContainer).parents('.raven-products-carousel.swiper-' + index).find('.swiper-pagination')[0],
          type: settings.pagination_type,
          clickable: true
        };
      }
      let swiperObj = null;
      options.on = {};
      options.on.init = function () {
        self.handleAnimation();
        self.zoom();
      };

      // Hide the carousel and wait for swiper to adjust the slides, then show slides.
      // Added to make load effect work correctly.
      $(swiperContainer)[0].style.opacity = 0;
      setInterval(() => {
        $(swiperContainer)[0].style.opacity = 1;
      }, 700);
      if ('undefined' === typeof Swiper) {
        const asyncSwiper = elementorFrontend.utils.swiper;
        new asyncSwiper(swiperContainer, options).then(newSwiperInstance => {
          swiperObj = newSwiperInstance; // eslint-disable-line
        });
      } else {
        swiperObj = new Swiper(swiperContainer, options); // eslint-disable-line
      }
      if (settings.pause_on_hover === 'yes') {
        $(swiperContainer).on({
          mouseenter() {
            swiperObj.autoplay.stop();
          },
          mouseleave() {
            swiperObj.autoplay.start();
          }
        });
      }

      // Expose the swiper instance in the frontend.
      self.elements.$itemsSlider.data('swiper', swiperObj);
    });
  },
  handleAnimation() {
    const carouselSettings = this.getCarouselSettings();
    this.elements.$sliderWrapper.load().after(() => {
      let items = [...this.elements.$carouselWrapper[0].querySelectorAll('.swiper-slide')];
      if (this.getInstanceValue('load_effect') === 'slide-right') {
        items = items.slice().reverse();
      }
      if (carouselSettings.overflow_visible && this.getInstanceValue('load_effect') !== 'slide-right') {
        items[items.length - 1].classList.add('raven-load-effect-' + carouselSettings.load_effect);
      }
      items.forEach((event, index) => {
        setTimeout(() => {
          event.classList.add('raven-load-effect-' + carouselSettings.load_effect);
          if (index === items.length - 1) {
            this.elements.$itemsSlider[0].classList.add('raven-products-loaded');
            setInterval(() => {
              this.elements.$itemsSlider[0].classList.remove('raven-products-load-effect');
            }, 1500);
            this.setSettings('state.loaded', true);
          }
        }, 100 * index);
      });
    });
  },
  bindEvents() {
    this.zoom();
    if (this.getInstanceValue('wishlist') === 'show') {
      this.wishlist();
    }

    // Prevent horizontal scroll when overflow visible is activated.
    if (this.getInstanceValue('overflow_visible')) {
      window['jupiterx-main'].style.overflow = 'hidden';
    }
  },
  onEditSettingsChange(propertyName) {
    if ('activeItemIndex' === propertyName) {
      elementorFrontend.utils.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  },
  zoom() {
    if (this.getInstanceValue('swap_effect') !== 'zoom_hover') {
      return;
    }
    this.elements.$sliderWrapper.find('.jupiterx-wc-loop-product-image').zoom();
  },
  wishlist() {
    $(document).on('click', '.jupiterx-wishlist', function (event) {
      event.preventDefault();
      const $this = $(this);
      let action = 'add_to_wishlist';
      const data = {};
      const state = $this.data('state');
      const productId = $this.data('productId');
      const nonceAdd = $this.data('nonceAdd');
      const nonceRemove = $this.data('nonceRemove');
      data.nonce = nonceAdd;
      data.add_to_wishlist = productId;
      data.remove_from_wishlist = productId;
      if (state === 'remove') {
        action = 'remove_from_wishlist';
        data.nonce = nonceRemove;
      }
      wp.ajax.send(action, {
        type: 'GET',
        data
      }).always(res => {
        if (action === 'add_to_wishlist' && res.result === 'true') {
          $this.addClass('jupiterx-wishlist-remove');
          $this.data('state', 'remove');
        }
        if (action === 'remove_from_wishlist' && res.fragments.length === 0) {
          $this.removeClass('jupiterx-wishlist-remove');
          $this.data('state', 'add');
        }
      });
    });
  },
  addClassToContent() {
    const carouselSettings = this.getCarouselSettings();
    const contents = [this.elements.$productPrice, this.elements.$productTitle, this.elements.$categories, this.elements.$ratingWrapper];
    if ('outside' === carouselSettings.atc_button_location) {
      contents.push(this.elements.$addToCartButton);
      contents.push(this.elements.$product_type_external);
      contents.push(this.elements.$product_type_grouped);
      contents.push(this.elements.$product_type_simple);
    }
    contents.forEach(content => {
      [...content].forEach(item => {
        item.classList.add('raven-product-item-content');
      });
    });
  },
  wrapAllContents() {
    const slides = [...this.elements.$carouselWrapper[0].querySelectorAll('.swiper-slide')];
    slides.forEach(slide => {
      $(slide).find('.raven-product-item-content').wrapAll('<div class="raven-product-data" />');
    });
  },
  getSpaceBetween(device) {
    let propertyName = 'columns_space_between';
    if (device && 'desktop' !== device) {
      propertyName += '_' + device;
    }
    return this.getElementSettings(propertyName).size || 10;
  },
  getDeviceSlidesToScroll(device) {
    const slidesToScrollKey = 'slides_scroll' + ('desktop' === device ? '' : '_' + device);
    return +this.getElementSettings(slidesToScrollKey) || 1;
  },
  getDeviceSlidesPerView(device) {
    const slidesPerViewKey = 'slides_view' + ('desktop' === device ? '' : '_' + device);
    return +this.getElementSettings(slidesPerViewKey) || 1;
  }
});
function _default($scope) {
  new ProductsCarousel({
    $element: $scope
  });
}

},{"../utils/module":9}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint no-undef: 0 */

const $ = jQuery;
const ProgressTracker = _module.default.extend({
  onInit() {
    const settings = this.getElementSettings();
    this.selector = this.getTrackingElementSelector();
    if ('circular' === settings.type) {
      this.circularOnScroll(settings);
      this.progressUpdate();
      return;
    }
    this.createHorizontalScroll();
    this.progressUpdate();
  },
  onElementChange(property) {
    const settings = this.getElementSettings();
    if ('relative_to' === property || 'selector' === property || 'type' === property) {
      window.removeEventListener('scroll', this.progressUpdate);
      this.selector = this.getTrackingElementSelector();
      if (this.selector === false) {
        return;
      }
      if (!this.circle && 'circular' === settings.type) {
        this.createCircle(settings);
      }
      if (!this.horizontal && 'horizontal' === settings.type) {
        this.createHorizontalScroll();
      }
      this.initListeners();
    }
  },
  createHorizontalScroll() {
    if (this.selector === false) {
      return;
    }
    this.horizontal = document.querySelector('.jupiterx-progress-tracker-horizontal-' + this.getID());
    this.initListeners();
  },
  circularOnScroll(settings) {
    this.createCircle(settings);
    if (this.selector === false) {
      return;
    }
    this.initListeners();
  },
  createCircle(settings) {
    const element = this.getCircularWrapper(settings),
      globalConfig = this.defaultGlobalConfig(settings);
    this.circle = new CircularProgressBar(element, globalConfig);
    this.circle.initial();
  },
  initListeners() {
    window.addEventListener('scroll', this.progressUpdate);
  },
  progressUpdate() {
    if (this.selector === false) {
      return;
    }
    const settings = this.getElementSettings(),
      percentNum = this.calculateScroll();
    if ('circular' === settings.type) {
      this.circle.animationTo({
        percent: percentNum.toFixed(0),
        index: 1
      });
      return;
    }
    const percentage = percentNum.toFixed(0) + '%';
    this.horizontal.querySelector('.progress-indicator').style.width = percentage;
    if ('yes' === settings.percentage) {
      this.horizontal.querySelector('.percentage-text').innerText = percentage;
    }
  },
  calculateScroll() {
    const scrollStartPercentage = this.selector.is(elementorFrontend.elements.$body) || this.selector.is($('#e-scroll-snap-container')) ? -100 : 0,
      percentage = elementorModules.utils.Scroll.getElementViewportPercentage(this.selector, {
        start: scrollStartPercentage,
        end: -100
      });
    return percentage;
  },
  getWrapper() {
    return 'div[data-id="' + this.getID() + '"]';
  },
  getCircularWrapper() {
    return 'jupiterx-progress-tracker-circular-' + this.getID();
  },
  getTrackingElementSelector() {
    const trackingElementSetting = this.getElementSettings().relative_to;
    let selector;
    switch (trackingElementSetting) {
      case 'selector':
        selector = $(this.getElementSettings().selector);
        break;
      case 'post_content':
        if ($('.elementor-widget-raven-post-content').length > 0) {
          selector = $('.elementor-widget-raven-post-content');
          break;
        }
        if ($('.elementor-widget-theme-post-content').length) {
          selector = $('.elementor-widget-theme-post-content');
          break;
        }
        selector = false;
        break;
      default:
        selector = this.isScrollSnap() ? $('#e-scroll-snap-container') : elementorFrontend.elements.$body;
        break;
    }
    if (false === selector || selector.length <= 0) {
      this.onDestroy();
      return false;
    }
    return selector;
  },
  isScrollSnap() {
    const scrollSnapStatus = this.isEdit ? elementor.settings.page.model.attributes.scroll_snap : elementorFrontend.config.settings.page.scroll_snap;
    return 'yes' === scrollSnapStatus ? true : false;
  },
  defaultGlobalConfig(settings) {
    const defaultSettings = {
      // Circle size.
      size: 100,
      // Filled stroke size.
      stroke: 4,
      // Circle stroke size.
      strokeBottom: 4,
      // Filled Color.
      colorSlice: '#61ce70',
      // Circle color.
      colorCircle: '#eee',
      // Path rounding.
      round: true,
      // Show percentage.
      number: 'yes' === settings.percentage ? true : false,
      // Inverse direction.
      inverse: 'rtl' === settings.direction ? true : false,
      // Inner circle color.
      fill: 'none',
      // Font size of percentage.
      animationOff: true
    };
    if (!_.isEmpty(settings.circular_size.size)) {
      defaultSettings.size = settings.circular_size.size;
    }
    return defaultSettings;
  },
  onDestroy() {
    window.removeEventListener('scroll', this.progressUpdate);
  }
});
function _default($scope) {
  new ProgressTracker({
    $element: $scope
  });
}

},{"../utils/module":9}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classic = classic;
exports.full = full;
function classic($scope) {
  const form = $scope.find('.raven-search-form');
  $scope.on('focus', '.raven-search-form-input', () => {
    form.addClass('raven-search-form-focus');
  });
  $scope.on('blur', '.raven-search-form-input', () => {
    form.removeClass('raven-search-form-focus');
  });
}
function full($scope) {
  const elements = {
    lightbox: $scope.find('.raven-search-form-lightbox'),
    inputSearch: $scope.find('.raven-search-form-input')
  };
  $scope.on('click', '.raven-search-form-button', event => {
    event.preventDefault();
    elements.lightbox.addClass('raven-search-form-lightbox-open');
    window.setTimeout(() => {
      elements.inputSearch.focus();
    }, 100);
  });
  $scope.on('click', '.raven-search-form-close', event => {
    event.preventDefault();
    elements.lightbox.removeClass('raven-search-form-lightbox-open');
  });
  jQuery(document).keyup(function (event) {
    if (event.keyCode === 27) {
      elements.lightbox.removeClass('raven-search-form-lightbox-open');
    }
  });
}

},{}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const ShoppingCart = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        shoppingCart: '.raven-shopping-cart',
        closeButton: '.jupiterx-raven-mini-cart-close',
        cartWrapper: '.raven-shopping-cart-wrap',
        overlay: '.jupiterx-shopping-cart-content-effect-enabled-overlay'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $body: $('body'),
      $header: $('.jupiterx-header'),
      $hasProductWidget: $('.elementor-widget-raven-wc-products').length > 0 || $('.elementor-widget-shortcode .products').length > 0 || $('.elementor-widget-woocommerce-products').length > 0,
      $elementorElement: this.$element.closest('.elementor-element'),
      $cartWrapper: this.$element.find(selectors.cartWrapper),
      $overlay: this.$element.find(selectors.overlay),
      $shoppingCart: this.$element.find(selectors.shoppingCart),
      $closeButton: this.$element.find(selectors.closeButton)
    };
  },
  bindEvents() {
    elementorFrontend.elements.$body.on('updated_wc_div update_checkout', () => {
      this.refreshFragments();
    });
    const isWooCommerceArchivePage = this.elements.$body.hasClass('woocommerce-page') && this.elements.$body.hasClass('archive');
    if (window?.ravenTools && isWooCommerceArchivePage) {
      const {
        wcAjaxAddToCart,
        disableAjaxToCartInArchive
      } = window.ravenTools.wc || {};
      if (wcAjaxAddToCart !== 'yes' && disableAjaxToCartInArchive) {
        $(document.body).off('click', '.add_to_cart_button.ajax_add_to_cart');
        $('.add_to_cart_button.ajax_add_to_cart').removeClass('ajax_add_to_cart').addClass('no_ajax_add_to_cart');
      }
    }
    if (this.getElementSettings('enable_ajax_add_to_cart') !== 'yes' && isWooCommerceArchivePage) {
      this.handleAjaxAddToCartOnPage();
    }
    if (this.getElementSettings('enable_ajax_add_to_cart') !== 'yes' && !isWooCommerceArchivePage && this.elements.$hasProductWidget) {
      this.handleAjaxAddToCartOnPage();
    }
    if (this.getElementSettings('show_cart_quick_view') !== 'yes' && (this.elements.$body.find('form.cart').hasClass('bundle_form') || this.elements.$body.find('form.cart').hasClass('grouped_form'))) {
      return;
    }
    if (this.getElementSettings('show_cart_quick_view') === 'yes' && this.getElementSettings('enable_ajax_add_to_cart') === 'yes' && (this.elements.$body.find('form.cart').hasClass('bundle_form') || this.elements.$body.find('form.cart').hasClass('grouped_form'))) {
      this.handleMiniCartOpenClose();
      this.handleTapToCloseOutside();
      return;
    }
    if (this.getElementSettings('show_cart_quick_view') === 'yes' && this.getElementSettings('enable_ajax_add_to_cart') !== 'yes') {
      this.handleMiniCartOpenClose();
      this.handleRemoveFromCart();
      this.handleTapToCloseOutside();
      return;
    }
    if (this.getElementSettings('show_cart_quick_view') !== 'yes') {
      return;
    }
    this.handleMiniCartOpenClose();
    this.handleMiniCartOnAddToCart();
    this.ajaxAddToCart();
    this.handleRemoveFromCart();
    this.handleTapToCloseOutside();
  },
  handleAjaxAddToCartOnPage() {
    elementorFrontend.elements.$body.find('.add_to_cart_button.ajax_add_to_cart').attr('data-has_raven_shopping_cart', 'exists');
    elementorFrontend.elements.$body.on('wc_fragments_refreshed removed_from_cart added_to_cart', () => {
      this.refreshFragments();
    });
  },
  refreshFragments() {
    const templatesInPage = [];
    $.each(elementorFrontend.documentsManager.documents, index => {
      templatesInPage.push(index);
    });
    $.ajax({
      type: 'POST',
      url: _wpUtilSettings.ajax.url,
      context: this,
      data: {
        action: 'cart_checkout_page_shopping_cart_fragments',
        templates: templatesInPage
      },
      success(successData) {
        if (successData?.fragments) {
          $.each(successData.fragments, (key, value) => {
            $(key).replaceWith(value);
          });
        }
        this.handleRemoveFromCart();
      }
    });
  },
  handleMiniCartOpenClose() {
    const self = this;
    const overlayColor = this.getElementSettings('content_effect_blur_content'),
      BlurContent = this.getElementSettings('content_effect_content_overlay');
    this.elements.$shoppingCart.on('click', function (event) {
      if ('#' !== $(this).attr('href')) {
        return;
      }
      event.preventDefault();
      const stickyHeaderId = self.elements.$header.data('jupiterx-settings');

      // Handle customizer sticky header.
      if ($(event.target).closest('.raven-sticky--effects').length > 0 && self.elements.$header.hasClass('jupiterx-header-sticky-custom')) {
        let defaultHeaderElement = self.elements.$header.find('[data-elementor-id]:not([data-elementor-id="' + stickyHeaderId.stickyTemplate + '"])');
        const headerAttr = defaultHeaderElement.attr('data-elementor-type');
        if (headerAttr === 'header') {
          if ($(event.target).closest('.raven-sticky--effects').length > 0) {
            defaultHeaderElement.children().each(function () {
              if ($(this).css('display') !== 'none') {
                defaultHeaderElement = $(this);
                return false;
              }
            });
          }
          defaultHeaderElement.find('.jupiterx-cart-quick-view').css('visibility', 'visible');
          defaultHeaderElement.find('.raven-shopping-cart').click();
          return;
        }
      }
      self.$element.addClass('jupiterx-raven-cart-quick-view-overlay');
      if (overlayColor === 'enabled' || BlurContent === 'enabled') {
        self.elements.$overlay.addClass('jupiterx-shopping-cart-overlay-activated');
      }
    });
    this.elements.$closeButton.on('click', function () {
      self.$element.alterClass('jupiterx-raven-cart-quick-view-overlay');
      if (overlayColor === 'enabled' || BlurContent === 'enabled') {
        self.elements.$overlay.removeClass('jupiterx-shopping-cart-overlay-activated');
      }
    });
  },
  handleMiniCartOnAddToCart() {
    const self = this;
    let isPro = false;
    if (typeof elementor !== 'undefined') {
      isPro = elementor.helpers.hasPro();
    }
    if (isPro && document.body.classList.contains('elementor-editor-active')) {
      return;
    }

    // Before sending Ajax by WooCommerce we modify data.
    $(document.body).on('adding_to_cart', function (event, button, data) {
      if ($('.raven-shopping-cart-count').length > 0 && 'object' === typeof data) {
        data.raven_shopping_cart = 'exists';
      }
    });
    $(document.body).on('added_to_cart', function () {
      let target = self.elements.$shoppingCart;
      const stickyHeaders = $('.jupiterx-header-sticky-custom .elementor[data-elementor-type=header]');
      if (self.elements.$header.hasClass('jupiterx-header-sticky-custom') && stickyHeaders.length === 2) {
        if (self.elements.$shoppingCart.parents('.elementor[data-elementor-type=header]').css('visibility') !== 'visible') {
          return;
        }
      }

      // motion effect.
      const targetParent = self.elements.$body.find('.raven-sticky--effects'),
        montionEffect = target.parents('.raven-sticky--active');
      if (montionEffect.length > 0 && !montionEffect.hasClass('raven-sticky--effects')) {
        return;
      }
      if (targetParent.length !== 0 && targetParent.find('.raven-shopping-cart')) {
        target = targetParent.find('.raven-shopping-cart');
      }
      target.click();
    });
  },
  ajaxAddToCart() {
    const currentCart = this.elements.$elementorElement;
    if ($(currentCart[0]).parents('.jupiterx-header').length === 0 || !this.elements.$cartWrapper.data('is-product')) {
      return;
    }
    $(document.body).find('form.cart').off('submit').on('submit', function (event) {
      event.preventDefault();
      const $form = $(this);
      const ajaxData = {};
      const formData = new FormData($form[0]);
      if ($form.hasClass('grouped_form') || $form.hasClass('bundle_form')) {
        return;
      }
      for (const [key, value] of formData.entries()) {
        let newKey = key;
        if ('add-to-cart' === newKey) {
          newKey = 'raven-add-to-cart';
        }
        ajaxData[newKey] = value;
      }
      if (!ajaxData.hasOwnProperty('raven-add-to-cart')) {
        ajaxData['raven-add-to-cart'] = $form.find('[name="add-to-cart"]').val();
      }
      ajaxData.raven_shopping_cart = 'exists';
      ajaxData.nonce = ravenTools.nonce; // eslint-disable-line no-undef
      ajaxData.action = 'raven_shopping_cart_single_insert_to_cart';
      if (!event.hasOwnProperty('originalEvent')) {
        return;
      }
      $.ajax({
        type: 'post',
        url: wc_add_to_cart_params.ajax_url,
        // eslint-disable-line no-undef
        data: ajaxData,
        beforeSend: () => {
          $form.addClass('loading');
        },
        complete: () => {
          $form.removeClass('loading');
          $form.removeClass('added');
          $form.next().hide();
        },
        success: response => {
          if (response.error && response.product_url) {
            window.location = response.product_url;
            return false;
          }
          const data = response.data;
          if (data.error) {
            return;
          }
          $(document.body).trigger('added_to_cart', [data.fragments, data.cart_hash, $form]);
        }
      });
      return false;
    });
  },
  handleRemoveFromCart() {
    $(document.body).on('click', '.jupiterx_remove_from_cart', function (event) {
      event.preventDefault();
      const cartKey = $(event.target).data('cart_item_key'),
        $row = $(event.target).closest('.woocommerce-mini-cart-item');
      $row.block({
        message: null,
        overlayCSS: {
          opacity: 0.6
        }
      });
      $.ajax({
        type: 'post',
        url: wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'remove_from_cart'),
        // eslint-disable-line no-undef
        data: {
          cart_item_key: cartKey,
          raven_shopping_cart: 'exists'
        },
        success: response => {
          $(document.body).trigger('removed_from_cart', [response.fragments, response.cart_hash, $(event.target)]);
        },
        error: () => {
          window.location = $(event.target).attr('href');
        },
        dataType: 'json'
      });
    });
  },
  handleTapToCloseOutside() {
    const tabToClose = this.getElementSettings('tap_outside_close');
    if (tabToClose === 'yes') {
      const BlurContent = this.getElementSettings('content_effect_blur_content'),
        overlayColor = this.getElementSettings('content_effect_content_overlay'),
        ravenShoppingCart = document.getElementsByClassName('raven-shopping-cart')[0],
        ravenShoppingCartQuickView = document.getElementsByClassName('jupiterx-cart-quick-view')[0];
      document.addEventListener('click', event => {
        if (!ravenShoppingCart?.contains(event.target) && !ravenShoppingCartQuickView?.contains(event.target) && this.$element?.hasClass('jupiterx-raven-cart-quick-view-overlay') && !event.target.classList?.contains('add_to_cart_button') && !event.target.classList?.contains('single_add_to_cart_button')) {
          this.$element.alterClass('jupiterx-raven-cart-quick-view-overlay');
          if (overlayColor === 'enabled' || BlurContent === 'enabled') {
            this.elements.$overlay.removeClass('jupiterx-shopping-cart-overlay-activated');
          }
        }
      });
    }
  }
});
function _default($scope) {
  new ShoppingCart({
    $element: $scope
  });
}

},{"../utils/module":9}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const ravenSlider = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        slider: '.raven-slider-wrapper',
        slide: '.swiper-slide',
        slideInnerContents: '.swiper-slide-contents',
        activeSlide: '.swiper-slide-active',
        activeDuplicate: '.swiper-slide-duplicate-active'
      },
      classes: {
        animated: 'animated',
        kenBurnsActive: 'elementor-ken-burns--active',
        slideBackground: 'swiper-slide-bg'
      },
      attributes: {
        dataSliderOptions: 'slider_options',
        dataAnimation: 'animation'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors'),
      elements = {
        $swiperContainer: this.$element.find(selectors.slider)
      };
    elements.$slides = elements.$swiperContainer.find(selectors.slide);
    return elements;
  },
  getSwiperOptions() {
    const swiperOptions = {
      autoplay: this.getAutoplayConfig(),
      grabCursor: true,
      initialSlide: this.getInitialSlide(),
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: 'yes' === this.getElementSettings('infinite'),
      speed: this.getElementSettings('transition_speed'),
      effect: this.getElementSettings('transition'),
      observeParents: true,
      observer: true,
      handleElementorBreakpoints: true,
      on: {
        slideChange: () => {
          this.handleKenBurns();
        }
      }
    };
    const elementSettingsNavigation = this.getElementSettings('navigation');
    const showArrows = 'arrows' === elementSettingsNavigation || 'both' === elementSettingsNavigation,
      pagination = 'dots' === elementSettingsNavigation || 'both' === elementSettingsNavigation;
    if (showArrows) {
      swiperOptions.navigation = {
        prevEl: '.elementor-swiper-button-prev',
        nextEl: '.elementor-swiper-button-next'
      };
    }
    if (pagination) {
      swiperOptions.pagination = {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      };
    }
    if (true === swiperOptions.loop) {
      swiperOptions.loopedSlides = this.getSlidesCount();
    }
    if ('fade' === swiperOptions.effect) {
      swiperOptions.fadeEffect = {
        crossFade: true
      };
    }
    return swiperOptions;
  },
  getAutoplayConfig() {
    if ('yes' !== this.getElementSettings('autoplay')) {
      return false;
    }
    return {
      stopOnLastSlide: true,
      // Has no effect in infinite mode by default.
      delay: this.getElementSettings('autoplay_speed'),
      disableOnInteraction: 'yes' === this.getElementSettings('pause_on_interaction')
    };
  },
  initSingleSlideAnimations() {
    const settings = this.getSettings(),
      animation = this.elements.$swiperContainer.data(settings.attributes.dataAnimation);
    this.elements.$swiperContainer.find('.' + settings.classes.slideBackground).addClass(settings.classes.kenBurnsActive); // If there is an animation, get the container of the slide's inner contents and add the animation classes to it

    if (animation) {
      this.elements.$swiperContainer.find(settings.selectors.slideInnerContents).addClass(settings.classes.animated + ' ' + animation);
    }
  },
  async initSlider() {
    const $slider = this.elements.$swiperContainer,
      settings = this.getSettings(),
      animation = $slider.data(settings.attributes.dataAnimation);
    if (!$slider.length) {
      return;
    }
    if (1 >= this.getSlidesCount()) {
      return;
    }
    const Swiper = elementorFrontend.utils.swiper;
    this.swiper = await new Swiper($slider, this.getSwiperOptions()); // Expose the swiper instance in the frontend

    $slider.data('swiper', this.swiper); // The Ken Burns effect will only apply on the specific slides that toggled the effect ON,
    // since it depends on an additional class besides 'elementor-ken-burns--active'

    this.handleKenBurns();
    if (this.getElementSettings('pause_on_hover')) {
      this.togglePauseOnHover(true);
    }
    if (!animation) {
      return;
    }
    this.swiper.on('slideChangeTransitionStart', function () {
      const $sliderContent = $slider.find(settings.selectors.slideInnerContents);
      $sliderContent.removeClass(settings.classes.animated + ' ' + animation).hide();
    });
    this.swiper.on('slideChangeTransitionEnd', function () {
      const $currentSlide = $slider.find(settings.selectors.slideInnerContents);
      $currentSlide.show().addClass(settings.classes.animated + ' ' + animation);
    });
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if (2 > this.getSlidesCount()) {
      this.initSingleSlideAnimations();
      return;
    }
    this.initSlider();
  },
  getChangeableProperties() {
    return {
      pause_on_hover: 'pauseOnHover',
      pause_on_interaction: 'disableOnInteraction',
      autoplay_speed: 'delay',
      transition_speed: 'speed'
    };
  },
  updateSwiperOption(propertyName) {
    if (0 === propertyName.indexOf('width')) {
      this.swiper.update();
      return;
    }
    const newSettingValue = this.getElementSettings(propertyName),
      changeableProperties = this.getChangeableProperties();
    let propertyToUpdate = changeableProperties[propertyName],
      valueToUpdate = newSettingValue; // Handle special cases where the value to update is not the value that the Swiper library accepts.

    switch (propertyName) {
      case 'autoplay_speed':
        propertyToUpdate = 'autoplay';
        valueToUpdate = {
          delay: newSettingValue,
          disableOnInteraction: 'yes' === this.getElementSettings('pause_on_interaction')
        };
        break;
      case 'pause_on_hover':
        this.togglePauseOnHover('yes' === newSettingValue);
        break;
      case 'pause_on_interaction':
        valueToUpdate = 'yes' === newSettingValue;
        break;
    } // 'pause_on_hover' is implemented by the handler with event listeners, not the Swiper library.

    if ('pause_on_hover' !== propertyName) {
      this.swiper.params[propertyToUpdate] = valueToUpdate;
    }
    this.swiper.update();
  },
  getSlidesCount() {
    return this.elements.$slides.length;
  },
  getInitialSlide() {
    const editSettings = this.getEditSettings();
    return editSettings.activeItemIndex ? editSettings.activeItemIndex - 1 : 0;
  },
  handleKenBurns() {
    const settings = this.getSettings();
    if (this.$activeImageBg) {
      this.$activeImageBg.removeClass(settings.classes.kenBurnsActive);
    }
    this.activeItemIndex = this.swiper ? this.swiper.activeIndex : this.getInitialSlide();
    if (this.swiper) {
      this.$activeImageBg = $(this.swiper.slides[this.activeItemIndex]).children('.' + settings.classes.slideBackground);
    } else {
      this.$activeImageBg = $(this.elements.$slides[0]).children('.' + settings.classes.slideBackground);
    }
    this.$activeImageBg.addClass(settings.classes.kenBurnsActive);
  },
  // This method live-handles the 'Pause On Hover' control's value being changed in the Editor Panel
  togglePauseOnHover(toggleOn) {
    if (toggleOn) {
      this.elements.$swiperContainer.on({
        mouseenter: () => {
          this.swiper.autoplay.stop();
        },
        mouseleave: () => {
          this.swiper.autoplay.start();
        }
      });
    } else {
      this.elements.$swiperContainer.off('mouseenter mouseleave');
    }
  },
  onElementChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }
    const changeableProperties = this.getChangeableProperties();
    if (changeableProperties.hasOwnProperty(propertyName)) {
      this.updateSwiperOption(propertyName);
    }
  },
  onEditSettingsChange(propertyName) {
    if (1 >= this.getSlidesCount()) {
      return;
    }
    if ('activeItemIndex' === propertyName) {
      this.swiper.slideToLoop(this.getEditSettings('activeItemIndex') - 1);
    }
  }
});
function _default($scope) {
  new ravenSlider({
    $element: $scope
  });
}

},{"../utils/module":9}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Google = void 0;
exports.default = _default;
var _i18n = require("@wordpress/i18n");
/* eslint no-undef: "off", no-unused-vars: "off", no-shadow: "off", no-var: "off" */

const $ = jQuery;
function _default($scope) {
  if ($('#jupiterx-raven-social-login-widget-facebook').length > 0) {
    jxRavenSocialLoginfacebook();
  }
  if ($('#jupiterx-raven-social-login-widget-twitter').length > 0) {
    jxRavenSocialLoginTwitter();
  }
}
const jxRavenSocialLoginfacebook = () => {
  // Facebook event.
  window.fbAsyncInit = function () {
    FB.init({
      appId: jxRavenFacebookAppId,
      // Passed to page from JupiterX_Core\Raven\Modules\Forms\Classes\Social_Login_Handler\facebook::html.
      cookie: true,
      // Enable cookies to allow the server to access the session.
      xfbml: true,
      // Parse social plugins on this webpage.
      version: 'v10.0'
    });
  };
  const facebookBtn = document.getElementById('jupiterx-raven-social-login-widget-facebook');
  facebookBtn.addEventListener('click', () => {
    FB.login(function (response) {
      if (response.authResponse) {
        if ('connected' === response.status) {
          FB.api('/me', {
            fields: 'name, email'
          }, function (data) {
            const email = data.email;
            const name = data.name;
            const accessToken = response.authResponse.accessToken;
            jxRavenSocialFacebookSignIn(email, name, accessToken);
          });
        }
      } else {
        //user hit cancel button
      }
    });
  }, false);
  const jxRavenSocialFacebookSignIn = (emailUser, nameUser, accessToken) => {
    $.ajax({
      url: _wpUtilSettings.ajax.url,
      type: 'POST',
      beforeSend: () => {
        jQuery('.raven-social-login-wrap .facebook').css('opacity', '0.5');
        $('.jx-social-login-errors-wrapper').hide().text('');
      },
      data: {
        action: 'raven_form_frontend',
        email: emailUser,
        name: nameUser,
        access_token: accessToken,
        post_id: document.getElementById('jx-raven-social-widget-post').value,
        form_id: document.getElementById('jx-raven-social-widget-form').value,
        social_network: 'Facebook'
      }
    }).always(data => {
      $('.raven-social-login-wrap .facebook').css('opacity', '1.0');
      if (true === data.success) {
        if (data.data.redirectUrl) {
          window.location.href = data.data.redirectUrl;
        } else {
          window.location.href = data.data.siteURL;
        }
      } else {
        $('.jx-social-login-errors-wrapper').show().text(data.data);
      }
    });
  };
};
const jxRavenSocialLoginTwitter = () => {
  const twitterBtn = document.getElementById('jupiterx-raven-social-login-widget-twitter');
  twitterBtn.addEventListener('click', () => {
    $.ajax({
      url: _wpUtilSettings.ajax.url,
      type: 'POST',
      beforeSend: () => {
        $('.raven-social-login-wrap .twitter').css('opacity', '0.5');
        $('.jx-social-login-errors-wrapper').hide().text('');
      },
      data: {
        action: 'raven_form_frontend',
        post_id: document.getElementById('jx-raven-social-widget-post').value,
        form_id: document.getElementById('jx-raven-social-widget-form').value,
        social_network: 'Twitter'
      }
    }).always(data => {
      $('.raven-social-login-wrap .twitter').css('opacity', '1.0');
      if (true === data.success) {
        win = window.open(data.data, '_blank');
        win.focus();
      } else {
        $('.jx-social-login-errors-wrapper').show().text(data.data);
      }
    });
  }, false);
};
const jxRavenSocialGoogle = data => {
  $.ajax({
    url: _wpUtilSettings.ajax.url,
    type: 'POST',
    beforeSend: () => {
      $('.raven-social-login-wrap .google').css('opacity', '0.5');
      $('.jx-social-login-errors-wrapper').hide().text('');
    },
    data: {
      token: data.credential,
      action: 'raven_form_frontend',
      post_id: document.getElementById('jx-raven-social-widget-post').value,
      form_id: document.getElementById('jx-raven-social-widget-form').value,
      social_network: 'Google'
    }
  }).always(data => {
    $('.raven-social-login-wrap .google').css('opacity', '1.0');
    if (true === data.success) {
      if (data.data.redirectUrl) {
        window.location.href = data.data.redirectUrl;
      } else {
        window.location.href = data.data.siteURL;
      }
    } else {
      $('.jx-social-login-errors-wrapper').show().text(data.data);
    }
  });
};
exports.Google = jxRavenSocialGoogle;

},{"@wordpress/i18n":104}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = () => {
  const socialShareUrl = {
    facebook: 'https://www.facebook.com/sharer.php?u={url}',
    twitter: 'https://twitter.com/intent/tweet?text={text}\x20{url}',
    linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={text}&source={url}',
    pinterest: 'https://www.pinterest.com/pin/create/button/?url={url}&media={image}',
    reddit: 'https://reddit.com/submit?url={url}&title={title}',
    vk: 'https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}',
    odnoklassniki: 'https://connect.ok.ru/offer?url={url}&title={title}&imageUrl={image}',
    tumblr: 'https://tumblr.com/share/link?url={url}',
    digg: 'https://digg.com/submit?url={url}',
    skype: 'https://web.skype.com/share?url={url}',
    stumbleupon: 'https://www.stumbleupon.com/submit?url={url}',
    telegram: 'https://telegram.me/share/url?url={url}&text={text}',
    pocket: 'https://getpocket.com/edit?url={url}',
    xing: 'https://www.xing.com/app/user?op=share&url={url}',
    whatsapp: 'https://api.whatsapp.com/send?text=*{title}*%0A{text}%0A{url}',
    email: 'mailto:?subject={title}&body={text}\n{url}',
    print: 'javascript:print()'
  };
  const checkUrl = string => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  };
  const replacement = network => {
    let $target = document.getElementById('jupiterx-social-share-target').value;
    const $title = encodeURIComponent(document.getElementById('jupiterx-social-share-title').value),
      $image = document.getElementById('jupiterx-social-share-image').value,
      safeUrl = checkUrl($target),
      $text = '';
    if (false === safeUrl) {
      $target = 'https://' + $target;
    }
    let $url = socialShareUrl[network];
    $url = $url.replace(/{text}/g, $text);
    $url = $url.replace(/{url}/g, $target);
    $url = $url.replace(/{title}/g, $title);
    $url = $url.replace('{image}', $image);
    return $url;
  };
  const windowFeature = () => {
    const defaultValue = 'toolbar=0,status=0';
    let width = window.screen.width / 2,
      height = window.screen.height / 2,
      left = window.screen.width / 4,
      top = window.screen.height / 4;
    if (window.screen.width < 600) {
      width = window.screen.width;
      height = window.screen.height - 150;
      left = 10;
      top = 75;
    }
    return defaultValue + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;
  };
  document.querySelectorAll('.jupiterx-social-share-button').forEach(item => {
    item.addEventListener('click', () => {
      const network = item.getAttribute('data-network'),
        finalURL = replacement(network),
        name = network.charAt(0).toUpperCase() + network.slice(1);
      if ('print' === network) {
        //eslint-disable-next-line
        javascript: print();
        return;
      }
      window.open(finalURL, name, windowFeature());
    });
  });
};
exports.default = _default;

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const StickyMediaScroller = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        mediaColumn: '.media-column',
        contentColumn: '.content-column',
        mediaItem: '.media-column .section',
        contentItem: '.content-column .section',
        stickyModeWrapper: '.sticky-mode-wrapper',
        responsiveModeWrapper: '.responsive-mode-wrapper'
      },
      state: {
        lastScroll: 0,
        scrollDirection: ''
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $mediaColumn: this.$element.find(selectors.mediaColumn),
      $contentColumn: this.$element.find(selectors.contentColumn),
      $mediaItem: this.$element.find(selectors.mediaItem),
      $contentItem: this.$element.find(selectors.contentItem),
      $stickyModeWrapper: this.$element.find(selectors.stickyModeWrapper),
      $responsiveModeWrapper: this.$element.find(selectors.responsiveModeWrapper)
    };
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    this.setMediaHeight();
    this.setStickPosition();
    this.pauseAllVideosOnFirstScroll();
  },
  bindEvents() {
    const self = this;
    window.addEventListener('scroll', self.detectScrollDirection);
    window.addEventListener('resize', () => {
      self.setMediaHeight();
      self.setStickPosition();
    });
    [...this.elements.$contentItem].forEach(item => {
      // eslint-disable-next-line no-undef
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
          const visiblePart = entry.intersectionRatio * 100;
          const scrollDirection = self.getSettings('state.scrollDirection');
          if (entry.intersectionRatio > 0 && !scrollDirection) {
            self.elements.$mediaColumn.find('.section').removeClass('active');
            self.elements.$mediaColumn.find(`[data-section-index="${$(entry.target).index()}"]`).addClass('active');
          }
          if ('up' === scrollDirection) {
            self.handleScrollUp(visiblePart, entries);
          }
          if ('down' === scrollDirection) {
            self.handleScrollDown(visiblePart, entries);
          }
        });
      }, {
        threshold: [0.4, 0.9]
      });
      observer.observe(item);
    });
  },
  detectScrollDirection() {
    const self = this,
      lastScroll = self.getSettings('state.lastScroll'),
      newScroll = window.scrollY;
    if (newScroll - lastScroll > 0) {
      self.setSettings('state.scrollDirection', 'down');
    } else if (newScroll - lastScroll < 0) {
      self.setSettings('state.scrollDirection', 'up');
    }
    self.setSettings('state.lastScroll', newScroll);
  },
  handleScrollUp(visiblePart, entries) {
    const self = this;
    if (visiblePart < 90) {
      return;
    }
    const previousActiveMedia = self.elements.$mediaColumn.find('.section.active'),
      sectionIndex = entries[0].target.dataset.sectionIndex,
      activeMediaItem = self.elements.$mediaColumn.find(`[data-section-index="${sectionIndex}"]`);
    self.activateMediaSection(activeMediaItem[0], previousActiveMedia[0]);
  },
  handleScrollDown(visiblePart, entries) {
    const self = this;
    if (visiblePart > 40) {
      return;
    }
    const previousActiveMedia = self.elements.$mediaColumn.find('.section.active');
    let sectionIndex = +entries[0].target.dataset.sectionIndex + 1;
    if (sectionIndex === this.elements.$contentItem.length) {
      sectionIndex = this.elements.$contentItem.length - 1;
    }
    const activeMediaItem = self.elements.$mediaColumn.find(`[data-section-index="${sectionIndex}"]`);
    self.activateMediaSection(activeMediaItem[0], previousActiveMedia[0]);
  },
  activateMediaSection(currentActive, previousActive) {
    previousActive.classList.remove('active');
    currentActive.classList.add('active');
    const previousActiveVideo = previousActive.querySelector('video'),
      currentActiveVideo = currentActive.querySelector('video'),
      previousActiveIframe = previousActive.querySelector('iframe'),
      currentActiveIframe = currentActive.querySelector('iframe');
    if (previousActiveVideo || previousActiveIframe) {
      const previousActiveIframeSrc = previousActiveIframe?.src;
      if (previousActiveIframeSrc) {
        previousActiveIframe.src = '';
        previousActiveIframe.dataset.src = previousActiveIframeSrc;
      }
      if (previousActiveVideo) {
        previousActiveVideo.currentTime = previousActiveVideo.dataset.startTime;
        previousActiveVideo.pause();
      }
    }
    if (currentActiveIframe && currentActiveIframe.dataset && currentActiveIframe.dataset.src) {
      currentActiveIframe.src = currentActiveIframe.dataset.src;
    }
    if (currentActiveVideo && currentActiveVideo.autoplay && currentActiveVideo.muted) {
      currentActiveVideo.play();
    }
    this.setStickPosition(currentActive);
  },
  setMediaHeight() {
    this.elements.$mediaColumn.each((index, item) => {
      const mediaHeight = item.querySelector('.section').clientHeight;
      item.style.height = mediaHeight + 'px';
    });
    this.elements.$mediaColumn.find('.section').each((index, item) => {
      const mediaHeight = item.querySelector('.raven-sticky-media-scroller-content')?.clientHeight;
      item.style.height = mediaHeight + 'px';
    });
    this.elements.$responsiveModeWrapper.find('.section:first-child').each((index, item) => {
      const mediaHeight = item.querySelector('.raven-sticky-media-scroller-content')?.clientHeight;
      const contentHeight = item.parentElement.querySelector('.section:last-child')?.clientHeight;
      if (mediaHeight > contentHeight && this.elements.$responsiveModeWrapper.css('display') !== 'none' && item.classList.contains('elementor-repeater-item-media-type-video')) {
        item.style.height = mediaHeight - contentHeight + 'px';
        if (document.body.classList.contains('elementor-editor-active')) {
          item.style.height = mediaHeight + 'px';
        }
      } else {
        item.style.height = mediaHeight + 'px';
      }
    });
  },
  /*
   * Only sets the position for the bottom and center.
   * The top position is handled in the css.
   */
  setStickPosition(currentActive = {}) {
    if (!currentActive.length) {
      currentActive = this.elements.$mediaColumn.find('.section.active')[0];
    }
    const mediaHeight = currentActive.clientHeight,
      stickPosition = this.getElementSettings('stick_position'),
      windowHeight = window.innerHeight;
    this.elements.$mediaColumn[0].style.height = mediaHeight + 'px';
    if ('bottom' === stickPosition) {
      this.elements.$mediaColumn[0].style.top = windowHeight - mediaHeight - 40 + 'px';
    }
    if ('center' === stickPosition) {
      this.elements.$mediaColumn[0].style.top = (windowHeight - mediaHeight) / 2 + 'px';
    }
  },
  pauseAllVideosOnFirstScroll() {
    const notActiveSections = this.elements.$stickyModeWrapper[0].querySelectorAll('.section:not(.active)');
    if (!notActiveSections) {
      return;
    }
    notActiveSections.forEach(section => {
      const video = section.querySelector('video');
      if (video) {
        video.pause();
      }
    });
  }
});
function _default($scope) {
  new StickyMediaScroller({
    $element: $scope
  });
}

},{"../utils/module":9}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const RavenStripeButton = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        form: '.elementor-stripe-form',
        errors: '.elementor-message-danger',
        button: '.elementor-payment-button'
      }
    };
  },
  getDefaultElements() {
    const settings = this.getSettings();
    return {
      form: this.$element[0].querySelector(settings.selectors.form),
      errors: this.$element[0].querySelectorAll(settings.selectors.errors)
    };
  },
  bindEvents() {
    const submitButton = document.querySelector('.elementor-payment-button');
    if (_.isNull(this.elements.form) && _.isNull(submitButton)) {
      return;
    }
    submitButton.addEventListener('click', e => this.handleSubmit(e));
  },
  handleSubmit(event) {
    event.preventDefault();
    if (elementorFrontend.isEditMode()) {
      return;
    }
    if (this.elements.errors.innerHTML !== '') {
      document.querySelectorAll('.elementor-stripe-error-message').forEach(e => e.remove());
    }
    const stripeForm = this.elements.form,
      formData = new FormData(stripeForm),
      action = formData.get('action'),
      postId = formData.get('post_id'),
      widgetId = formData.get('widget_id'),
      customErrorMsg = formData.get('custom_error_msg'),
      customErrorMsgGlobal = formData.get('custom_error_msg_global'),
      customErrorMsgPayment = formData.get('custom_error_msg_payment'),
      nonce = formData.get('stripe_form_submit_nonce'),
      pageUrl = document.URL,
      // Should the page open in a new tab or not
      openInNewWindow = formData.get('open_in_new_window'),
      target = 'yes' === openInNewWindow ? '_blank' : '_self'; // Create error container

    const createErrorContainer = errorMsg => {
      const errorDiv = document.createElement('div'),
        errorCont = stripeForm.appendChild(errorDiv);
      errorCont.className = 'elementor-message elementor-stripe-error-message elementor-message-danger';
      errorCont.innerHTML = errorMsg;
    };
    const data = {
      action,
      postId,
      widgetId,
      pageUrl,
      nonce
    };
    if ('undefined' !== typeof this.elements.errors && 0 < this.elements.errors.length) {
      this.elements.errors.forEach(error => {
        error.classList.remove('elementor-hidden');
      });
    }
    wp.ajax.post({
      action,
      data,
      nonce
    }).done(response => {
      const code = response.response.code;
      const result = response.body && JSON.parse(response.body);
      switch (code) {
        case 200:
          window.open(result.url, target);
          break;
        case 401:
        case 403:
          if (customErrorMsg) {
            createErrorContainer(customErrorMsgPayment);
          } else {
            createErrorContainer(result.error.message);
          }
          break;
        default:
          if (customErrorMsg) {
            createErrorContainer(customErrorMsgGlobal);
          } else {
            createErrorContainer(result.error.message);
          }
      }
    }).fail(result => {
      result = result.body && JSON.parse(result.body);
      if (customErrorMsg) {
        createErrorContainer(customErrorMsgGlobal);
        return;
      }
      createErrorContainer(result.error.message);
      console.log(result); // eslint-disable-line
    });
  }
});
function _default($scope) {
  new RavenStripeButton({
    $element: $scope
  });
}

},{"../utils/module":9}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
var _i18n = require("@wordpress/i18n");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const TableOfContents = _module.default.extend({
  onInit() {
    this.setLoader();
    const settings = this.getElementSettings();
    let tags = {};
    this.addCollpaseIcons(settings);
    if (_.isEmpty(settings.headings_by_tags)) {
      return;
    }
    tags = this.findWanted(settings);
    if (_.isEmpty(tags)) {
      this.manageNotFound();
      return;
    }
    this.manageToAppendFound(tags, settings);
    if ('object' === typeof elementor) {
      this.autoSlide(settings);
    }
  },
  onElementChange() {
    const settings = this.getElementSettings();
    this.addCollpaseIcons(settings, true);
  },
  autoSlide(settings) {
    const id = this.getWrapper();
    if ('yes' === settings.collapse_subitems) {
      $(id).find('.jupiterx-table-of-content-main-list > li > ol').hide();
    }
    if ('undefined' === typeof elementor) {
      window.addEventListener('scroll', this.onScrollEvent);
    }
  },
  onScrollEvent() {
    const id = this.getWrapper(),
      settings = this.getElementSettings(),
      self = this;
    let key = 0;
    $(`[data-${self.getID()}-jxtoc]`).each((index, item) => {
      const headerKey = $(item).attr(`data-${self.getID()}-jxtoc`);
      const isInView = self.isElementInView(headerKey);
      if (isInView[0]) {
        key = headerKey;
        return true;
      }
    });
    $(id).find('.jupiterx-table-of-contents-item-link').removeClass('jupiterx-table-of-contents-item-link-active');
    $(id).find(`.jupiterx-table-of-contents-item-link[data-id=${key}]`).addClass('jupiterx-table-of-contents-item-link-active');
    if ('yes' !== settings.collapse_subitems) {
      return;
    }
    const element = $(id).find(`li[data-key=${key}] > ol`);
    if ($(id).find(`.jupiterx-table-of-contents-item-wrapper[data-key=${key}]`).parent().hasClass('jupiterx-table-of-content-main-list')) {
      $(id).find('.jupiterx-table-of-content-main-list > li > ol').not(element).hide('fast');
      element.slideDown();
    } else {
      $(id).find(`.jupiterx-table-of-contents-item-wrapper[data-key=${key}]`).parents('.jupiterx-table-of-contents-nested-list').show();
      $(id).find('.jupiterx-table-of-content-main-list > li > ol').not($(`.jupiterx-table-of-contents-item-wrapper[data-key=${key}]`).parents('.jupiterx-table-of-contents-nested-list')).hide();
    }
  },
  isElementInView(key) {
    let check = false;
    const id = this.getWrapper(),
      self = this,
      selfList = $(id).find(`.jupiterx-table-of-contents-item-wrapper[data-key="${key}"]`),
      selfHeader = $(`[data-${this.getID()}-jxtoc="${key}"]`),
      selfTop = selfHeader.offset().top + 25,
      selfBottom = selfTop + selfHeader.outerHeight(),
      viewportTopSelf = $(window).scrollTop(),
      viewportBottomSelf = viewportTopSelf + $(window).height();
    check = selfBottom > viewportTopSelf && selfTop < viewportBottomSelf;
    if (check) {
      return [true, key];
    }
    selfList.find('li').each((index, item) => {
      const headKey = $(item).attr('data-key'),
        header = $(`[data-${self.getID()}-jxtoc=${headKey}]`),
        elementTop = header.offset().top,
        elementBottom = elementTop + header.outerHeight(),
        viewportTop = $(window).scrollTop(),
        viewportBottom = viewportTop + $(window).height();
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        check = true;
      }
    });
    return [check, key];
  },
  addCollpaseIcons(settings, editor = false) {
    if ('yes' !== settings.minimize_box) {
      return;
    }
    const id = this.getWrapper(),
      expandHtml = $(id).find('.jupiterx-table-of-contents-list-icon-expand').html(),
      collapseHtml = $(id).find('.jupiterx-table-of-contents-list-icon-collapse').html(),
      parent = $(id).find('.jupiterx-toc-body-maximized'),
      screen = window.innerWidth,
      table = $(id).find('.jupiterx-table-of-contents-widget'),
      tableHeight = table.css('min-height'),
      header = $(id).find('.jupiterx-table-of-contents-header');
    if (editor && $(id).find('.jxtoc').length < 0) {
      $(id).append('<input type="hidden" value="0" class="jxtoc-checker">');
    }
    if (!editor || '0' === $(id).find('.jxtoc-checker').val()) {
      parent.append(expandHtml);
      parent.append(collapseHtml);
    }
    if (editor) {
      $(id).find('.jxtoc-checker').val('1');
    }
    header.css('cursor', 'pointer');
    const collapse = $(id).find('.jupiterx-table-of-contents-expand-icon'),
      expand = $(id).find('.jupiterx-table-of-contents-collapse-icon');
    header.off().on('click', () => {
      const body = $(id).find('.jupiterx-table-of-contents-body'),
        isExpanded = body.is(':visible');
      if (isExpanded) {
        body.slideUp();
        $(id).find('table').css('min-height', 'auto');
        expand.hide();
        collapse.show();
      } else {
        body.slideDown();
        $(id).find('table').css('min-height', tableHeight);
        collapse.hide();
        expand.show();
      }
    });
    collapse.hide();
    expand.show();
    if ('desktop' === settings.minimized_on && screen >= 1024) {
      collapse.show();
      expand.hide();
      header.trigger('click');
    }
    if ('tablet' === settings.minimized_on && screen < 1024 && screen > 767) {
      collapse.show();
      expand.hide();
      header.trigger('click');
    }
    if ('mobile' === settings.minimized_on && screen < 767) {
      collapse.show();
      expand.hide();
      header.trigger('click');
    }
  },
  setLoader() {
    const svg = $('.jupiterx-table-of-contents-loader-icon').html();
    $('.jupiterx-table-of-contents-body').append(svg);
  },
  findWanted(settings) {
    const foundTargets = {},
      wanted = settings.headings_by_tags.join();
    let searchArea = 'body',
      i = 0;

    // Looking in body.
    if (!_.isEmpty(settings.container)) {
      searchArea = settings.container;
    }
    $(searchArea).find(wanted).each((index, element) => {
      const tag = $(element).prop('tagName');
      let check = true;

      // Not table of contents title.
      if ($(element).hasClass('jupiterx-table-of-contents-native-exclude')) {
        return;
      }

      // Not header headings.
      if ($(element).parents('header').length === 1 && !settings.container?.includes('header')) {
        if ($(element).parents('#jupiterx-primary').length !== 1) {
          return;
        }
      }

      // Not footer headings.
      if ($(element).parents('footer').length === 1 && !settings.container?.includes('footer')) {
        if ($(element).parents('#jupiterx-primary').length !== 1) {
          return;
        }
      }

      // Not sidebar also
      if ($(element).parents('aside').length === 1 && !settings.container?.includes('aside')) {
        if ($(element).parents('#jupiterx-primary').length !== 1) {
          return;
        }
      }

      // Not post title bar.
      if ($(element).parents('.jupiterx-main-header').length === 1 && !settings.container?.includes('.jupiterx-main-header')) {
        return;
      }

      // Not excludes.
      if (!_.isEmpty(settings.exclude_headings_by_selector)) {
        check = this.checkExcludes(element, settings.exclude_headings_by_selector, tag);
        if (!check) {
          return;
        }
      }
      $(element).attr(`data-${this.getID()}-jxtoc`, i);
      foundTargets[i] = {
        type: tag,
        text: $(element).text().trim(),
        id: i
      };
      i++;
    });
    return foundTargets;
  },
  checkExcludes(element, excludes, tag) {
    // Prevents JS errors.
    if (!excludes.includes(',')) {
      excludes = excludes + ',';
    }
    let check = true,
      toCheck = '';
    const cssSelectors = excludes.split(',');
    const selectors = cssSelectors.map(e => e.trim());
    selectors.forEach(item => {
      if (item === '') {
        return;
      }
      const firstLetter = item.charAt(0);
      const allElementsBasedSelector = $(item);
      if ('.' === firstLetter) {
        toCheck = item.substring(1);
        if ($(element).hasClass(toCheck) || _.some(allElementsBasedSelector, obj => {
          return obj?.offsetParent?.classList === element?.offsetParent?.classList;
        })) {
          check = false;
        }
      } else if ('#' === firstLetter) {
        toCheck = item.substring(1);
        if (toCheck === $(element).attr('id') || _.some(allElementsBasedSelector, obj => {
          return obj?.offsetParent?.id === element?.offsetParent?.id;
        })) {
          check = false;
        }
      } else {
        toCheck = item.toUpperCase();
        if (toCheck === tag) {
          check = false;
        }
      }
    });
    return check;
  },
  getWrapper() {
    return 'div[data-id="' + this.getID() + '"]';
  },
  manageNotFound() {
    const id = this.getWrapper();
    $(id).find('.jupiterx-table-of-contents-body').text((0, _i18n.__)('No headings were found on this page.', 'jupiterx-core'));
  },
  activeLoading() {
    const id = this.getWrapper();
    $(id).find('.jupiterx-table-of-contents-body').empty();
  },
  buildItem(settings, tags, key, count) {
    const id = this.getWrapper(),
      element = tags[key],
      wrapper = document.createElement('li'),
      innerRapper = document.createElement('div');
    wrapper.setAttribute('class', 'jupiterx-table-of-contents-item-wrapper');
    wrapper.setAttribute('data-tag', element.type);
    innerRapper.setAttribute('class', 'jupiterx-table-of-contents-inner-wrapper');
    if ('yes' !== settings.word_wrap) {
      wrapper.classList.add('jupiterx-toc-word-wrap');
    }
    if ('yes' === settings.hierarchical_view) {
      wrapper.setAttribute('data-key', key);
    }
    const counter = document.createElement('span');
    const point = document.createElement('span');
    point.setAttribute('class', 'jupiterx-table-of-contents-list-pointer');
    if ('numbers' === settings.marker_view) {
      counter.innerText = count;
      point.innerText = '.';
    }
    if ('bullets' === settings.marker_view) {
      counter.innerHTML = $(id).find('.jupiterx-table-of-contents-list-icon-wrapper').html();
    }
    if (_.isEmpty(settings.hierarchical_view)) {
      innerRapper.appendChild(counter);
      innerRapper.appendChild(point);
    }
    if (!_.isEmpty(settings.hierarchical_view) && 'bullets' === settings.marker_view) {
      wrapper.classList.add('wrapper-with-no-number');
      innerRapper.appendChild(counter);
    }
    const item = document.createElement('a');
    item.setAttribute('class', 'jupiterx-table-of-contents-item-link');
    item.setAttribute('data-text', element.text);
    item.setAttribute('data-id', element.id);
    item.setAttribute('href', '#');
    $(item).off().on('click', e => {
      e.preventDefault();
      this.collapseSubmenus(e, settings);
    });
    item.innerText = element.text;
    innerRapper.appendChild(item);
    wrapper.appendChild(innerRapper);
    return {
      type: 'li',
      content: wrapper,
      tag: element.type
    };
  },
  manageToAppendFound(tags, settings) {
    let i = 1;
    const id = this.getWrapper(),
      widgetBody = $(id).find('.jupiterx-table-of-contents-body'),
      listType = _.isEmpty(settings.hierarchical_view) ? 'ul' : 'ol',
      orderedList = document.createElement(listType);
    orderedList.setAttribute('type', '1');
    orderedList.setAttribute('class', 'jupiterx-table-of-content-main-list');
    for (const key in tags) {
      const item = this.buildItem(settings, tags, key, i);
      let counter = parseInt(key);
      i++;
      if (counter === 0 || _.isEmpty(settings.hierarchical_view)) {
        orderedList.appendChild(item.content);
        continue;
      }
      const currentDignity = this.convertTagToNumber(item.tag);
      counter = counter - 1;
      while (counter >= 0) {
        let keyTagDignity = this.convertTagToNumber(tags[counter].type),
          keyHTML = $(orderedList).find('[data-key="' + counter + '"]');

        // Same as previous tag.
        if (currentDignity === keyTagDignity) {
          keyHTML.parent().append(item.content);
          break;
        }

        // lower than previous tag and parent has an OL child.
        if (currentDignity > keyTagDignity && keyHTML.children('ol').length > 0) {
          keyHTML.append(item.content);
          break;
        }

        // lower than previous tag and parent does not have an OL child.
        if (currentDignity > keyTagDignity && 0 === keyHTML.children('ol').length) {
          const ol = document.createElement('ol');
          ol.appendChild(item.content);
          ol.setAttribute('class', 'jupiterx-table-of-contents-nested-list');
          keyHTML.append(ol);
          break;
        }

        // Higher than previous.
        if (currentDignity < keyTagDignity) {
          const doublePre = counter - 1;
          if (doublePre < 0) {
            $(orderedList).find('[data-key="0"]').parent().append(item.content);
            break;
          }
          keyTagDignity = this.convertTagToNumber(tags[doublePre].type);
          keyHTML = $(orderedList).find('[data-key="' + doublePre + '"]');
          if (currentDignity > keyTagDignity && keyHTML.children('ol').length > 0) {
            keyHTML.find('ol').append(item.content);
            break;
          }
          if (currentDignity > keyTagDignity && 0 === keyHTML.children('ol').length) {
            const ol = document.createElement('ol');
            ol.appendChild(item.content);
            ol.setAttribute('class', 'jupiterx-table-of-contents-nested-list');
            keyHTML.append(ol);
            break;
          }
        }
        counter--;
      }
    }
    if ('undefined' === typeof elementor) {
      setTimeout(() => {
        $('.jupiterx-table-of-contents-loader').css('display', 'none');
        widgetBody.append(orderedList);
        this.autoSlide(settings);
      }, 500);
      return;
    }
    $('.jupiterx-table-of-contents-loader').css('display', 'none');
    widgetBody.append(orderedList);
  },
  convertTagToNumber(tag) {
    return parseInt(tag.replace('H', ''));
  },
  collapseSubmenus(e, settings) {
    window.removeEventListener('scroll', this.onScrollEvent);
    const relatedTag = $(e.target).attr('data-id');
    $('.jupiterx-table-of-contents-item-link').removeClass('jupiterx-table-of-contents-item-link-active');
    e.target.classList.add('jupiterx-table-of-contents-item-link-active');
    if ('undefined' === typeof elementor) {
      $('html, body').animate({
        scrollTop: $(`[data-${this.getID()}-jxtoc="` + relatedTag + `"]`).offset().top - 100
      }, 500);
    }
    if ('yes' !== settings.collapse_subitems) {
      setTimeout(() => {
        window.addEventListener('scroll', this.onScrollEvent);
      }, 0);
      return;
    }
    const key = e.target.getAttribute('data-id');
    const id = this.getWrapper();
    if ($(e.target).parent().parent().parent().hasClass('jupiterx-table-of-content-main-list')) {
      $(id).find(`li[data-key=${key}] > ol`).slideToggle('fast');
      $(id).find(`.jupiterx-table-of-content-main-list > li[data-key!=${key}] > ol`).hide();
    }
    setTimeout(() => {
      window.addEventListener('scroll', this.onScrollEvent);
    }, 0);
  }
});
function _default($scope) {
  new TableOfContents({
    $element: $scope
  });
}

},{"../utils/module":9,"@wordpress/i18n":104}],71:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Tabs = _module.default.extend({
  $activeContent: null,
  interval: null,
  getDefaultSettings() {
    return {
      selectors: {
        tabTitle: '.raven-tabs-title',
        tabContent: '.raven-tabs-content'
      },
      classes: {
        active: 'raven-tabs-active'
      },
      showTabFn: 'show',
      hideTabFn: 'hide',
      toggleSelf: true,
      hidePrevious: true,
      autoExpand: true
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $tabTitles: this.findElement(selectors.tabTitle),
      $tabContents: this.findElement(selectors.tabContent)
    };
  },
  activateDefaultTab() {
    const settings = this.getSettings();
    if ((!settings.autoExpand || settings.autoExpand === 'editor') && !this.isEdit) {
      return;
    }
    const defaultActiveTab = this.getEditSettings('activeItemIndex') || 1;
    const originalToggleMethods = {
      showTabFn: settings.showTabFn,
      hideTabFn: settings.hideTabFn
    };
    this.setSettings({
      showTabFn: 'show',
      hideTabFn: 'hide'
    });
    this.changeActiveTab(defaultActiveTab);
    this.setSettings(originalToggleMethods);
  },
  deactivateActiveTab(tabIndex) {
    const settings = this.getSettings();
    const activeClass = settings.classes.active;
    const activeFilter = tabIndex ? '[data-tab="' + tabIndex + '"]' : '.' + activeClass;
    const $activeTitle = this.elements.$tabTitles.filter(activeFilter);
    const $activeContent = this.elements.$tabContents.filter(activeFilter);
    $activeTitle.add($activeContent).removeClass(activeClass);
    $activeContent[settings.hideTabFn]();
  },
  activateTab(tabIndex) {
    const settings = this.getSettings();
    const activeClass = settings.classes.active;
    const $requestedTitle = this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]');
    const $requestedContent = this.elements.$tabContents.filter('[data-tab="' + tabIndex + '"]');
    const $scrollToBeggining = this.getElementSettings('scroll_to_beginning');
    $requestedTitle.add($requestedContent).addClass(activeClass);
    $requestedContent[settings.showTabFn]();
    if ($requestedTitle.hasClass('raven-tabs-mobile-title') && $scrollToBeggining === 'yes' && window.innerWidth < 1025) {
      const headerHeight = $('header').outerHeight();
      window.scroll({
        top: $requestedContent.offset().top - headerHeight - 100,
        behavior: 'smooth'
      });
    }
  },
  isActiveTab(tabIndex) {
    return this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]').hasClass(this.getSettings('classes.active'));
  },
  useAjax() {
    const useAjaxLoading = this.getElementSettings('use_ajax_loading');
    if ('yes' === useAjaxLoading) {
      const templateWrapper = $('.raven-tabs-content.raven-tabs-active .raven-ajax-content-template');
      const templateId = templateWrapper.attr('data-id');
      wp.ajax.post({
        action: 'jupiterx_load_content_template',
        // eslint-disable-next-line no-undef
        nonce: ravenTools.nonce,
        template_id: templateId
      }).done(function (response) {
        templateWrapper.html(response);
      }).fail(function () {
        templateWrapper.html('Oops! Something went wrong');
      });
    }
  },
  bindEvents() {
    const self = this;
    const tabsEvent = self.getElementSettings('tabs_event');
    self.elements.$tabTitles.on(tabsEvent, event => {
      self.changeActiveTab(event.currentTarget.dataset.tab);
      self.useAjax();
      clearInterval(self.interval);
    });
  },
  onInit() {
    const self = this;
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(self, arguments);
    self.activateDefaultTab();
    const autoSwitch = self.getElementSettings('auto_switch');
    if ('yes' === autoSwitch) {
      const delay = self.getElementSettings('auto_swtich_delay');
      let indexNumber = 1;
      const tabsContents = self.getDefaultElements();
      const tabsLength = tabsContents.$tabContents.length;
      self.interval = setInterval(() => {
        indexNumber++;
        if (indexNumber > tabsLength) {
          indexNumber = 1;
        }
        this.changeActiveTab(indexNumber);
      }, delay);
    }
  },
  onEditSettingsChange(propertyName) {
    if (propertyName === 'activeItemIndex') {
      this.activateDefaultTab();
    }
  },
  changeActiveTab(tabIndex) {
    const isActiveTab = this.isActiveTab(tabIndex);
    const settings = this.getSettings();
    if ((settings.toggleSelf || !isActiveTab) && settings.hidePrevious) {
      this.deactivateActiveTab();
    }
    if (!settings.hidePrevious && isActiveTab) {
      this.deactivateActiveTab(tabIndex);
    }
    if (!isActiveTab) {
      this.activateTab(tabIndex);
    }

    // eslint-disable-next-line no-undef
    const changeActiveTab = new CustomEvent('jupiterxcore:advancedtabs:changeactivetab');
    document.dispatchEvent(changeActiveTab);
  }
});
function _default($scope) {
  new Tabs({
    $element: $scope,
    toggleSelf: false
  });
}

},{"../utils/module":9}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class baseTabs extends elementorModules.frontend.handlers.Base {
  getDefaultSettings() {
    return {
      selectors: {
        tablist: '[role="tablist"]',
        tabTitle: '.raven-tab-title',
        tabContent: '.raven-tab-content'
      },
      classes: {
        active: 'e-active'
      },
      showTabFn: 'show',
      hideTabFn: 'hide',
      toggleSelf: true,
      hidePrevious: true,
      autoExpand: true,
      keyDirection: {
        ArrowLeft: window.elementorFrontendConfig.is_rtl ? 1 : -1,
        ArrowUp: -1,
        ArrowRight: window.elementorFrontendConfig.is_rtl ? -1 : 1,
        ArrowDown: 1
      }
    };
  }
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $tabTitles: this.findElement(selectors.tabTitle),
      $tabContents: this.findElement(selectors.tabContent)
    };
  }
  activateDefaultTab(videoId) {
    const settings = this.getSettings();
    if (!settings.autoExpand || 'editor' === settings.autoExpand && !this.isEdit) {
      return;
    }
    const defaultActiveTab = this.getEditSettings('activeItemIndex') || videoId || 1,
      originalToggleMethods = {
        showTabFn: settings.showTabFn,
        hideTabFn: settings.hideTabFn
      };
    this.setSettings({
      showTabFn: 'show',
      hideTabFn: 'hide'
    });
    this.changeActiveTab(defaultActiveTab);
    this.setSettings(originalToggleMethods);
  }
  handleKeyboardNavigation(event) {
    const tab = event.currentTarget,
      $tabList = jQuery(tab.closest(this.getSettings('selectors').tablist)),
      // eslint-disable-next-line @wordpress/no-unused-vars-before-return
      $tabs = $tabList.find(this.getSettings('selectors').tabTitle),
      isVertical = 'vertical' === $tabList.attr('aria-orientation');
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        if (isVertical) {
          return;
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        if (!isVertical) {
          return;
        }
        event.preventDefault();
        break;
      case 'Home':
        event.preventDefault();
        $tabs.first().trigger('focus');
        return;
      case 'End':
        event.preventDefault();
        $tabs.last().trigger('focus');
        return;
      default:
        return;
    }
    const tabIndex = tab.getAttribute('data-tab') - 1,
      direction = this.getSettings('keyDirection')[event.key],
      nextTab = $tabs[tabIndex + direction];
    if (nextTab) {
      nextTab.focus();
    } else if (-1 === tabIndex + direction) {
      $tabs.last().trigger('focus');
    } else {
      $tabs.first().trigger('focus');
    }
  }
  deactivateActiveTab(tabIndex) {
    const settings = this.getSettings(),
      activeClass = settings.classes.active,
      activeFilter = tabIndex ? '[data-tab="' + tabIndex + '"]' : '.' + activeClass,
      $activeTitle = this.elements.$tabTitles.filter(activeFilter),
      $activeContent = this.elements.$tabContents.filter(activeFilter);
    $activeTitle.add($activeContent).removeClass(activeClass);
    $activeTitle.attr({
      tabindex: '-1',
      'aria-selected': 'false'
    });
    $activeContent[settings.hideTabFn]();
    $activeContent.attr('hidden', 'hidden');
  }
  activateTab(tabIndex) {
    const settings = this.getSettings(),
      activeClass = settings.classes.active,
      $requestedTitle = this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]'),
      $requestedContent = this.elements.$tabContents.filter('[data-tab="' + tabIndex + '"]'),
      animationDuration = 'show' === settings.showTabFn ? 0 : 400;
    $requestedTitle.add($requestedContent).addClass(activeClass);
    $requestedTitle.attr({
      tabindex: '0',
      'aria-selected': 'true'
    });
    $requestedContent[settings.showTabFn](animationDuration, () => elementorFrontend.elements.$window.trigger('resize'));
    $requestedContent.removeAttr('hidden');
  }
  isActiveTab(tabIndex) {
    return this.elements.$tabTitles.filter('[data-tab="' + tabIndex + '"]').hasClass(this.getSettings('classes.active'));
  }
  bindEvents() {
    this.elements.$tabTitles.on({
      keydown: event => {
        // Support for old markup that includes an `<a>` tag in the tab.
        if (jQuery(event.target).is('a') && `Enter` === event.key) {
          event.preventDefault();
        }
        if (['End', 'Home', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
          this.handleKeyboardNavigation(event);
        }
      },
      keyup: event => {
        switch (event.key) {
          case 'ArrowLeft':
          case 'ArrowRight':
            this.handleKeyboardNavigation(event);
            break;
          case 'Enter':
          case 'Space':
            event.preventDefault();
            this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));
            break;
        }
      },
      click: event => {
        event.preventDefault();
        this.changeActiveTab(event.currentTarget.getAttribute('data-tab'));
      }
    });
  }
  onInit() {
    super.onInit(...arguments);
  }
  changeActiveTab(tabIndex) {
    const isActiveTab = this.isActiveTab(tabIndex),
      settings = this.getSettings();
    if ((settings.toggleSelf || !isActiveTab) && settings.hidePrevious) {
      this.deactivateActiveTab();
    }
    if (!settings.hidePrevious && isActiveTab) {
      this.deactivateActiveTab(tabIndex);
    }
    if (!isActiveTab) {
      this.activateTab(tabIndex);
    }
  }
}
var _default = exports.default = baseTabs;

},{}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerEvent = triggerEvent;
var _playlistEvent = _interopRequireDefault(require("../video-playlist/playlist-event"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Functions to get objects for the playlist event object.
function getEventTabsObject(widgetObject) {
  const currentInnerTabsTitleElements = widgetObject.elements.$innerTabs.filter('.e-active').find('.raven-inner-tabs-wrapper .raven-inner-tab-title');
  if (currentInnerTabsTitleElements.length) {
    const activeInnerTabTitleElement = currentInnerTabsTitleElements.filter('.raven-inner-tab-active');
    return {
      name: activeInnerTabTitleElement.text().trim(),
      index: activeInnerTabTitleElement.index() + 1
    };
  }
  return {
    name: 'none',
    index: 'none'
  };
}
function getEventPlaylistObject(widgetObject, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex;
  return {
    name: widgetObject.getElementSettings('playlist_title'),
    currentItem: currentVideoIndex,
    amount: widgetObject.playlistItemsArray.filter(video => video.videoType !== 'section').length
  };
}
function getEventVideoObject(widgetObject, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex,
    currentVideo = widgetObject.playlistItemsArray[currentVideoIndex - 1];
  return {
    provider: currentVideo.videoType,
    url: currentVideo.videoUrl,
    title: currentVideo.videoTitle,
    duration: currentVideo.videoDuration
  };
}
async function getEventEventObject(widgetObject, eventType, eventTrigger, positionInVideoList) {
  const currentVideoIndex = positionInVideoList || widgetObject.currentPlaylistItemIndex,
    currentVideo = widgetObject.playlistItemsArray[currentVideoIndex - 1];
  return {
    type: eventType,
    time: await currentVideo.playerInstance.getCurrentTime(),
    element: widgetObject.$element,
    trigger: eventTrigger,
    watchCount: currentVideo.playerInstance.watchCount
  };
}
async function triggerEvent(widgetObject, eventType, eventTrigger, positionInVideoList) {
  const currentEvent = new _playlistEvent.default({
    event: await getEventEventObject(widgetObject, eventType, eventTrigger, positionInVideoList),
    tab: getEventTabsObject(widgetObject),
    playlist: getEventPlaylistObject(widgetObject, positionInVideoList),
    video: getEventVideoObject(widgetObject, positionInVideoList)
  });
  jQuery('body').trigger('raven-video-playList', currentEvent);
}

},{"../video-playlist/playlist-event":80}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _baseTabs = _interopRequireDefault(require("../video-playlist/base-tabs"));
var _playerYoutube = _interopRequireDefault(require("../video-playlist/player-youtube"));
var _playerVimeo = _interopRequireDefault(require("../video-playlist/player-vimeo"));
var _playerHosted = _interopRequireDefault(require("../video-playlist/player-hosted"));
var _scrollUtils = require("../video-playlist/scroll-utils");
var _innerTabs = require("../video-playlist/inner-tabs");
var _urlParams = require("../video-playlist/url-params");
var _eventTrigger = require("../video-playlist/event-trigger");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class VideoPlaylistHandler extends _baseTabs.default {
  getDefaultSettings() {
    const defaultSettings = super.getDefaultSettings(),
      selectors = {
        tabsWrapper: '.raven-tabs-items-wrapper',
        tabsItems: '.raven-tabs-items',
        toggleVideosDisplayButton: '.raven-tabs-toggle-videos-display-button',
        videos: '.raven-tabs-content-wrapper .raven-tab-content',
        innerTabs: '.raven-tabs-inner-tabs .raven-tab-content',
        imageOverlay: '.raven-custom-embed-image-overlay'
      };
    return {
      ...defaultSettings,
      selectors: {
        ...defaultSettings.selectors,
        ...selectors
      }
    };
  }
  getDefaultElements() {
    const elements = super.getDefaultElements(),
      selectors = this.getSettings('selectors');
    return {
      ...elements,
      $tabsWrapper: this.findElement(selectors.tabsWrapper),
      $tabsItems: this.findElement(selectors.tabsItems),
      $toggleVideosDisplayButton: this.findElement(selectors.toggleVideosDisplayButton),
      $videos: this.findElement(selectors.videos),
      $innerTabs: this.findElement(selectors.innerTabs),
      $imageOverlay: this.findElement(selectors.imageOverlay)
    };
  }
  initEditorListeners() {
    super.initEditorListeners();
    const self = this;
    this.editorListeners.push({
      event: 'ravenPlaylistWidget:fetchVideoData',
      to: elementor.channels.editor,
      callback: e => {
        self.getCurrentPlayerSelected().setVideoProviderData().then(() => {
          e.currentItem = self.getCurrentItemSelected();
          elementor.channels.editor.trigger('ravenPlaylistWidget:setVideoData', e);
        });
      }
    });
  }
  bindEvents() {
    super.bindEvents();

    // Handle the click on the image overlay.
    this.elements.$imageOverlay.on({
      click: e => {
        // Remove image overlay if the user clicked it and play the video in case it is not playing.
        e.currentTarget.remove();
        this.getCurrentPlayerSelected().play();
      }
    });

    // Handle the inner tab functionality.
    this.elements.$innerTabs.on({
      click: event => {
        (0, _innerTabs.handleInnerTabs)(event, this);
      }
    });

    // Handle scroll on the right panel to make the "shadows" effect when the panel is scrollable.
    this.elements.$tabsItems.on({
      scroll: event => {
        (0, _scrollUtils.handleVideosPanelScroll)(this.elements, event);
      }
    });

    // Handle the closing/opening right panel in mobile mode.
    this.elements.$toggleVideosDisplayButton.on({
      click: event => {
        jQuery(event.target).toggleClass('rotate-up');
        jQuery(event.target).toggleClass('rotate-down');
        this.elements.$tabsWrapper.slideToggle('slow');
      }
    });
  }
  onInit() {
    super.onInit(...arguments);
    this.playlistId = this.getID();

    // Handle watched videos.
    this.storageKey = 'watched_videos_' + this.getID();
    const storageObject = elementorFrontend.storage.get(this.storageKey);
    this.watchedVideosArray = [];
    if (storageObject) {
      this.watchedVideosArray = JSON.parse(storageObject);
    }
    this.watchedIndication = this.getElementSettings('show_watched_indication');

    // Handle indication for scrolling in the right panel.
    (0, _scrollUtils.handleVideosPanelScroll)(this.elements);

    // Handle the video player functionality, includes "on load" and "next up".
    this.isAutoplayOnLoad = 'yes' === this.getElementSettings('autoplay_on_load');
    this.isAutoplayNextUp = 'yes' === this.getElementSettings('autoplay_next');
    this.isFirstVideoActivated = true;
    this.createPlaylistItems();

    // Handle display for show more/less button.
    this.isCollapsible = this.getElementSettings('inner_tab_is_content_collapsible');
    this.innerTabsHeightLimit = this.getElementSettings('inner_tab_collapsible_height');

    // Keep track of the element that supposed to be paused since the user selected other video.
    this.currentPlayingPlaylistItemIndex = 1;

    // Handle the first initial activation of the video in the playlist.
    this.activateInitialVideo();

    // Handle Inner Tab activation in edit mode.
    this.activateInnerTabInEditMode();
  }
  onEditSettingsChange(propertyName) {
    // The condition will be true when the user clicks the widget to open the edit panel.
    if ('panel' === propertyName) {
      // The boolean below will prevent running twice the activateDefaultTab function when widget first load and user click the item to play it.
      this.preventTabActivation = true;
    }
    if ('activeItemIndex' !== propertyName) {
      return;
    }
    if (this.preventTabActivation) {
      this.preventTabActivation = false;
      return;
    }
    this.activateDefaultTab();
  }
  activateInitialVideo() {
    this.isPageOnLoad = true;
    const isLazyLoad = !!this.getElementSettings('lazy_load'),
      initialTabIndex = (0, _urlParams.handleURLParams)(this.playlistId, this.playlistItemsArray);
    let isUrlParamsExist = false;
    this.currentPlaylistItemIndex = 1;
    this.currentPlayingPlaylistItemIndex = 1;
    if (initialTabIndex) {
      this.currentPlaylistItemIndex = initialTabIndex;
      this.currentPlayingPlaylistItemIndex = initialTabIndex;
      isUrlParamsExist = true;
    }

    // When there are no url parameters and on-load is on, the video should be played, means the url parameters should be set.
    if (this.isAutoplayOnLoad && !isUrlParamsExist) {
      (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex);
    }
    if (isUrlParamsExist) {
      // eslint-disable-next-line no-unused-expressions
      this.$element[0]?.scrollIntoView({
        behavior: 'smooth'
      });
    }
    this.handleFirstVideoActivation(isLazyLoad);
  }

  /*
  The scenarios for playing the first video after page load:
  - lazy load off - video will load on page load before user scroll video to view.
  - lazy load on - video will load when user scroll the video to view.
  */
  handleFirstVideoActivation(isLazyLoad) {
    if (!isLazyLoad) {
      this.activateDefaultTab(this.currentPlaylistItemIndex);
      // No need to use the observer since "lazy load is" off.
      return;
    }
    const playlistElement = document.querySelector('.elementor-element-' + this.playlistId + ' .raven-tabs-main-area'),
      observer = elementorModules.utils.Scroll.scrollObserver({
        callback: event => {
          if (event.isInViewport) {
            this.activateDefaultTab(this.currentPlaylistItemIndex);
            observer.unobserve(playlistElement);
          }
        }
      });
    observer.observe(playlistElement);
  }
  getCurrentItemSelected() {
    return this.playlistItemsArray[this.currentPlaylistItemIndex - 1];
  }
  getCurrentPlayerSelected() {
    return this.getCurrentItemSelected().playerInstance;
  }
  getCurrentPlayerPlaying() {
    return this.playlistItemsArray[this.currentPlayingPlaylistItemIndex - 1].playerInstance;
  }

  // Handle video selection.
  isVideoShouldBePlayed() {
    // When user select other video, the current video will be paused if is playing.
    if (this.currentPlayingPlaylistItemIndex !== this.currentPlaylistItemIndex) {
      if (this.getCurrentPlayerPlaying()) {
        this.getCurrentPlayerPlaying().pause();
      }
      this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex;
      // When user select the same video, the current video will be paused if is playing.
    } else if (this.getCurrentPlayerPlaying().isVideoPlaying) {
      this.getCurrentPlayerPlaying().pause();
      return false;
    }

    // When none of the videos are playing, the selected video should be played.
    return true;
  }
  activateInnerTabInEditMode() {
    if (this.isEdit && this.getEditSettings('innerActiveIndex')) {
      const innerTabActivated = this.getEditSettings('innerActiveIndex'),
        innerTabs = jQuery(this.elements.$innerTabs.eq(this.currentPlaylistItemIndex - 1).find('.raven-inner-tab-title a'));
      innerTabs[innerTabActivated].click();
    }
  }

  // Handle video creation including event listeners and playing video if needed.
  handleVideo(playListItem) {
    // If the video already created (visited once), then just play it if it's not playing already, otherwise pause it.
    if (playListItem.playerInstance) {
      if (this.isVideoShouldBePlayed()) {
        // Remove image overlay if first video item is playing without clicking the image overlay.
        if (1 === this.currentPlaylistItemIndex && this.elements.$imageOverlay) {
          this.elements.$imageOverlay.remove();
        }
        this.playVideoAfterCreation(playListItem);
      }
      return;
    }

    // If the video is not created yet (first visit), then create the video instance and the event listeners.
    const players = {
      youtube: _playerYoutube.default,
      vimeo: _playerVimeo.default,
      hosted: _playerHosted.default
    };
    playListItem.playerInstance = new players[playListItem.videoType](playListItem, this.currentPlaylistItemIndex);
    playListItem.playerInstance.create().then(() => {
      if (this.isVideoShouldBePlayed()) {
        this.playVideoOnCreation(playListItem);
      }

      // Handle the functionality when video full screen mode changes.
      playListItem.playerInstance.handleFullScreenChange(isEnterFullScreenMode => {
        // Trigger event when enter/exit full screen mode.
        (0, _eventTrigger.triggerEvent)(this, isEnterFullScreenMode ? 'videoFullScreen' : 'videoExitFullScreen', 'click');
      });

      // Handle the functionality when video play.
      playListItem.playerInstance.handlePlayed(() => {
        const currentPlaylistItem = this.getCurrentItemSelected();
        let videoTrigger = 'click';
        if (currentPlaylistItem.isAutoplayOnLoad) {
          videoTrigger = 'onLoad';
          playListItem.isAutoplayOnLoad = false;
        } else if (currentPlaylistItem.isAutoPlayNextUp) {
          videoTrigger = 'nextVideo';
        }

        // Trigger event when video started.
        (0, _eventTrigger.triggerEvent)(this, currentPlaylistItem.playerInstance.isVideoPausedLocal ? 'videoResume' : 'videoStart', videoTrigger);
      });

      // Handle the functionality when video ended.
      playListItem.playerInstance.handleEnded(() => {
        // Trigger event when video ended.
        (0, _eventTrigger.triggerEvent)(this, 'videoEnded', 'click');

        // Handle the indication for videos that have been watched and ended.
        if (this.watchedIndication) {
          this.elements.$tabTitles.filter('.e-active').addClass('watched-video');
        }
        const endedVideoId = this.getCurrentItemSelected().dataItemId;
        if (!this.watchedVideosArray.includes(endedVideoId) && this.watchedIndication) {
          this.watchedVideosArray.push(this.getCurrentItemSelected().dataItemId);
          elementorFrontend.storage.set(this.storageKey, JSON.stringify(this.watchedVideosArray));
        }

        // Handle "next up" functionality.
        if (this.isAutoplayNextUp) {
          // If there are more videos in the list, play next video.
          if (this.playlistItemsArray.length >= ++this.currentPlaylistItemIndex) {
            // Handle the logic for playing next video.
            while ('section' === this.getCurrentItemSelected().videoType) {
              this.currentPlaylistItemIndex++;

              // When last video in the playlist ended, we reset the this.currentPlaylistItemIndex to the last playlist item index.
              if (this.playlistItemsArray.length < this.currentPlaylistItemIndex) {
                this.currentPlaylistItemIndex = this.playlistItemsArray.length;
                return;
              }
            }
            this.changeActiveTab(this.currentPlaylistItemIndex, true);
          }
        }
      });

      // Handle the functionality when video paused.
      // The handlePaused will trigger event with setTimeout, positionInVideoList will keep track for the paused video when selecting other video.
      playListItem.playerInstance.handlePaused(positionInVideoList => {
        // Trigger event when video paused.
        (0, _eventTrigger.triggerEvent)(this, 'videoPaused', 'click', positionInVideoList);
      });
    });
  }

  // Handle the actual playing of the video that already exists (already created before).
  playVideoAfterCreation(playListItem) {
    playListItem.playerInstance.play();
  }

  // Handle the actual playing of the video when the video is created.
  playVideoOnCreation(playListItem) {
    // Play the video according to "on load" and "next up" indications.
    if (this.isAutoplayOnLoad) {
      playListItem.isAutoplayOnLoad = true;

      // Mute the initiated video when "autoplay onload" and then play.
      playListItem.playerInstance.mute();
      playListItem.playerInstance.play();
      this.isAutoplayOnLoad = false;
    } else if (!this.isFirstVideoActivated) {
      playListItem.isAutoPlayNextUp = true;
      playListItem.playerInstance.play();
    }
    this.isFirstVideoActivated = false;
  }
  createPlaylistItems() {
    this.playlistItemsArray = [];
    this.elements.$videos.each((index, tabContent) => {
      const playListItem = {};
      const $tabContent = jQuery(tabContent);
      playListItem.videoUrl = $tabContent.attr('data-video-url');
      playListItem.videoType = $tabContent.attr('data-video-type');
      playListItem.videoTitle = $tabContent.attr('data-video-title');
      playListItem.videoDuration = $tabContent.attr('data-video-duration');
      playListItem.tabContent = tabContent;
      playListItem.dataTab = index + 1;
      playListItem.dataItemId = this.getElementSettings().tabs[index]._id;
      this.playlistItemsArray.push(playListItem);
    });

    // When the page loads,the code checks which videos already watched and adding a class accordingly.
    if (this.watchedVideosArray.length > 0 && this.watchedIndication) {
      this.watchedVideosArray.forEach(watchedVideoId => {
        const watchedPlaylistItem = this.playlistItemsArray.find(playlistItem => playlistItem.dataItemId === watchedVideoId);
        this.elements.$tabTitles.filter('[data-tab="' + watchedPlaylistItem.dataTab + '"]').addClass('watched-video');
      });
    }
  }
  changeActiveTab(tabIndex, isVideoSelectedAutomatically) {
    super.changeActiveTab(tabIndex);
    if (this.playlistItemsArray[tabIndex - 1] && this.playlistItemsArray[tabIndex - 1]?.videoType !== 'section') {
      this.currentPlaylistItemIndex = parseInt(tabIndex);
      if (isVideoSelectedAutomatically) {
        this.currentPlayingPlaylistItemIndex = this.currentPlaylistItemIndex;
      }

      // Handle on creation of the video and working with it.
      this.handleVideo(this.getCurrentItemSelected(), isVideoSelectedAutomatically);

      // Set Video params in url only if its not the first video when page load.
      if (!this.isPageOnLoad) {
        (0, _urlParams.setVideoParams)(this.playlistId, this.playlistItemsArray, this.currentPlaylistItemIndex);
      }
      this.isPageOnLoad = false;

      // Handle the display for the inner tabs buttons as long there are actually inner tabs.
      if (jQuery(this.elements.$innerTabs.eq(tabIndex - 1)).find('.raven-inner-tab-content').length > 0) {
        const innerTabsContent = this.elements.$innerTabs.filter('.e-active').find('.raven-inner-tab-content');
        (0, _innerTabs.handleInnerTabsButtonsDisplay)(innerTabsContent.toArray(), this.isCollapsible, this.innerTabsHeightLimit);
      }
    }
  }
}
function _default($scope) {
  new VideoPlaylistHandler({
    $element: $scope
  });
}

},{"../video-playlist/base-tabs":72,"../video-playlist/event-trigger":73,"../video-playlist/inner-tabs":75,"../video-playlist/player-hosted":77,"../video-playlist/player-vimeo":78,"../video-playlist/player-youtube":79,"../video-playlist/scroll-utils":81,"../video-playlist/url-params":82}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleInnerTabs = handleInnerTabs;
exports.handleInnerTabsButtonsDisplay = handleInnerTabsButtonsDisplay;
exports.onTabContentButtonsClick = onTabContentButtonsClick;
var _eventTrigger = require("../video-playlist/event-trigger");
function toggleInnerTabs(event, clickedTab, widgetObject) {
  const activeTabWrapper = event.currentTarget,
    tabTitles = activeTabWrapper.querySelectorAll('.raven-inner-tab-title');
  if (clickedTab.hasClass('raven-inner-tab-active') || tabTitles.length < 2) {
    return;
  }
  const tabsContents = activeTabWrapper.querySelectorAll('.raven-inner-tab-content');
  tabTitles.forEach(tabTitle => {
    tabTitle.classList.toggle('raven-inner-tab-active');
  });
  tabsContents.forEach(tabContent => {
    tabContent.toggleAttribute('hidden');
    tabContent.classList.toggle('raven-inner-tab-active');
  });
  handleInnerTabsButtonsDisplay(Array.from(tabsContents), widgetObject.isCollapsible, widgetObject.innerTabsHeightLimit);

  // Trigger event when tab open.
  (0, _eventTrigger.triggerEvent)(widgetObject, 'tabOpened', 'click');
}
function handleInnerTabs(event, widgetObject) {
  const clickedTarget = event.target;
  const clickedTagType = clickedTarget.tagName;

  // Handle click on tab on desktop mode.
  if (clickedTarget.classList.contains('raven-inner-tab-title-text')) {
    event.preventDefault();
    const $clickedTab = jQuery(clickedTarget).parent('.raven-inner-tab-title');
    toggleInnerTabs(event, $clickedTab, widgetObject);
  }

  // Handle click on tab on mobile mode.
  if (clickedTarget.classList.contains('raven-tab-mobile-title')) {
    const $clickedTab = jQuery(clickedTarget);
    toggleInnerTabs(event, $clickedTab, widgetObject);
  }

  // Handle click on show-less buttons in tab content.
  if ('button' === clickedTagType.toLowerCase()) {
    onTabContentButtonsClick(event, widgetObject);
  }
}
function handleInnerTabsButtonsDisplay(tabsContents, isCollapsible, innerTabsHeightLimit) {
  if (!isCollapsible) {
    return;
  }
  const activeInnerTab = tabsContents.filter(tabsContent => tabsContent.classList.contains('raven-inner-tab-active')),
    innerTabScrollableHeight = activeInnerTab[0].querySelector('.raven-inner-tab-text > div').offsetHeight,
    innerTabsLimitHeight = parseInt(innerTabsHeightLimit.size);
  if (innerTabsLimitHeight && innerTabScrollableHeight > innerTabsLimitHeight) {
    activeInnerTab[0].classList.add('show-inner-tab-buttons');
  }
}
function onTabContentButtonsClick(event, widgetObject) {
  const $tabsContent = jQuery(event.currentTarget).find('.raven-inner-tab-content'),
    $activeTabContent = $tabsContent.filter('.raven-inner-tab-active'),
    buttonsElements = $activeTabContent.find('button');
  buttonsElements.toggleClass('show-button');
  $activeTabContent.toggleClass('show-full-height');
  const eventType = $activeTabContent.hasClass('show-full-height') ? 'tabExpanded' : 'tabCollapsed';

  // Trigger event when collapsed/expanded clicked.
  (0, _eventTrigger.triggerEvent)(widgetObject, eventType, 'click');
}

},{"../video-playlist/event-trigger":73}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class PlayerBase {
  constructor(playlistItem, videoIndex) {
    this.playlistItem = playlistItem;
    this.positionInVideoList = videoIndex;
  }
  formatDuration(duration) {
    const dateObj = new Date(duration * 1000),
      hours = dateObj.getUTCHours(),
      minutes = dateObj.getUTCMinutes(),
      seconds = dateObj.getSeconds();
    if (hours !== 0) {
      return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
  }
}
var _default = exports.default = PlayerBase;

},{}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _playerBase = _interopRequireDefault(require("../video-playlist/player-base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class playerHosted extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoPlaying = false;
    this.isVideoPausedLocal = false;
    this.isVideoSeeking = false;
    this.isVideoEnded = false;
    this.isReady = false;
  }
  create() {
    const videoPromise = new Promise(resolve => {
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      const text = document.createTextNode('Sorry, your browser doesn\'t support embedded videos.');
      const source = document.createElement('source');
      source.setAttribute('src', this.playlistItem.videoUrl);
      source.setAttribute('type', 'video/' + this.playlistItem.videoUrl.split('.').pop());
      video.appendChild(source);
      video.appendChild(text);
      this.playerObject = video;
      this.playlistItem.tabContent.querySelector('div').replaceWith(this.playerObject);
      this.playerObject.addEventListener('canplay', () => {
        // Indication that the video is loaded and can be played and paused.
        this.isReady = true;
        resolve();
      });

      // Seeked event indicates that the seeking has been finished, so we reset the boolean for that.
      this.playerObject.addEventListener('seeked', () => {
        this.isVideoSeeking = false;
      });

      // Seeking event indicates that the seeking is currently happening, so we change the boolean.
      this.playerObject.addEventListener('seeking', () => {
        clearTimeout(this.seekTimeOut);
        this.isVideoSeeking = true;
      });
    });
    return videoPromise;
  }
  handleEnded(callback) {
    this.playerObject.addEventListener('ended', () => {
      this.watchCount++;

      // This property will prevent automatic pause trigger when video ended.
      this.isVideoEnded = true;
      this.isVideoPlaying = false;
      callback(this.playlistItem);
    });
  }
  handlePaused(callback) {
    this.playerObject.addEventListener('pause', () => {
      // Prevent pause trigger when the user is seeking video or when the video automatically trigger pause event when ended.
      this.seekTimeOut = setTimeout(() => {
        if (!this.isVideoSeeking && !this.isVideoEnded) {
          callback(this.positionInVideoList);

          // Indication to know when there is a resume trigger event.
          this.isVideoPausedLocal = true;
        } else {
          this.isVideoEnded = false;
        }
      }, 30);
    });
  }
  handlePlayed(callback) {
    this.playerObject.addEventListener('play', () => {
      // Prevent play trigger when user is seeking video.
      if (!this.isVideoSeeking) {
        callback(this.playlistItem);
      }
    });
  }
  handleFullScreenChange(callback) {
    // Wrapping with jQuery to easily listen all 3 prefixed screen change.
    jQuery(this.playerObject).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', () => {
      callback(document.fullscreenElement);
    });
  }
  getCurrentTime() {
    return this.playerObject.currentTime;
  }
  play() {
    if (!this.isReady) {
      return;
    }
    this.isVideoPlaying = true;
    this.playerObject.play();
  }
  pause() {
    if (!this.isReady) {
      return;
    }
    this.isVideoPlaying = false;
    this.playerObject.pause();
  }
  mute() {
    this.playerObject.muted = true;
  }
}
var _default = exports.default = playerHosted;

},{"../video-playlist/player-base":76}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _playerBase = _interopRequireDefault(require("../video-playlist/player-base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class playerVimeo extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.apiProvider = elementorFrontend.utils.vimeo;
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoInFullScreenChange = false;
    this.isReady = false;
  }
  create() {
    this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);
    return new Promise(resolve => {
      this.apiProvider.onApiReady(apiObject => {
        const playerOptions = {
          id: this.currentVideoID,
          autoplay: false
        };
        this.playerObject = new apiObject.Player(this.playlistItem.tabContent.querySelector('div'), playerOptions);

        // Indication that the video is loaded and can be played and paused.
        this.playerObject.ready().then(() => {
          this.isReady = true;
          resolve();
        });
      });
    });
  }
  handleEnded(callback) {
    this.playerObject.on('ended', () => {
      this.watchCount++;
      callback(this.playlistItem);
    });
  }
  handlePaused(callback) {
    this.playerObject.on('pause', event => {
      // Prevent "pause" event trigger when page loads with vimeo video and when vimeo video ended, or when entering/exiting full-screen mode.
      if (0 === event.percent || event.percent >= 1 || this.isVideoInFullScreenChange) {
        return;
      }
      callback(this.positionInVideoList);
    });
  }
  handlePlayed(callback) {
    this.playerObject.on('play', () => {
      if (this.isVideoInFullScreenChange) {
        // Full screen change ended with all the extra events (pause and play).
        this.isVideoInFullScreenChange = false;
        return;
      }
      callback(this.playlistItem);
    });
  }
  handleFullScreenChange(callback) {
    this.playerObject.element.addEventListener('fullscreenchange', () => {
      callback(document.fullscreenElement);
      this.isVideoInFullScreenChange = true;
    });
  }
  getCurrentTime() {
    return this.playerObject.getCurrentTime().then(seconds => seconds);
  }
  play() {
    if (!this.isReady) {
      return;
    }
    this.playerObject.play();
  }
  pause() {
    if (!this.isReady) {
      return;
    }
    this.playerObject.pause();
  }
  mute() {
    this.playerObject.setMuted(true);
  }
  async setVideoProviderData() {
    if (!this.currentVideoID && 9 === !this.currentVideoID?.length) {
      return;
    }
    const videoId = await this.playerObject.getVideoId();
    const response = await window.fetch('https://vimeo.com/api/v2/video/' + videoId + '.json');
    const videoData = await response.json();
    this.playlistItem.duration = this.formatDuration(videoData[0].duration);
    this.playlistItem.video_title = videoData[0].title;
    this.playlistItem.thumbnail = {
      url: videoData[0].thumbnail_medium
    };
    return this.playlistItem;
  }
}
var _default = exports.default = playerVimeo;

},{"../video-playlist/player-base":76}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _playerBase = _interopRequireDefault(require("../video-playlist/player-base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class playerYoutube extends _playerBase.default {
  constructor(playlistItem, videoIndex) {
    super(playlistItem, videoIndex);
    this.apiProvider = elementorFrontend.utils.youtube;
    this.playerObject = null;
    this.watchCount = 0;
    this.isVideoPlaying = false;
    this.isVideoPausedLocal = false;
    this.isVideoEnded = false;
    this.seekSequenceArray = [];
    this.pauseCurrentTime = null;
    this.isReady = false;
  }
  create() {
    this.currentVideoID = this.apiProvider.getVideoIDFromURL(this.playlistItem.videoUrl);
    const videoPromise = new Promise(resolve => {
      this.apiProvider.onApiReady(apiObject => {
        const playerOptions = {
          width: '773',
          videoId: this.currentVideoID,
          playerVars: {
            rel: 0,
            showinfo: 0,
            ecver: 2
          },
          events: {
            onReady: () => {
              // Indication that the video is loaded and can be played and paused.
              this.isReady = true;
              resolve();
            }
          }
        };
        this.playerObject = new apiObject.Player(this.playlistItem.tabContent.querySelector('div'), playerOptions);
        this.playerObject.addEventListener('onStateChange', event => {
          // Buffering state.
          if (3 === event.data) {
            // When user is seeking we want to prevent triggering for "pause" and "play".
            // Seeking means a sequence as [2,3], so we check that 2 (pause) is exist before adding "3" (buffering).
            // If there is no "2", it means that this is not a seeking event and we can reset the array.
            if (2 === this.seekSequenceArray[this.seekSequenceArray.length - 1]) {
              this.seekSequenceArray.push(3);
            } else {
              this.seekSequenceArray = [];
              clearTimeout(this.seekTimeOut);
            }
          }
        });
      });
    });
    return videoPromise;
  }
  handleEnded(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Ended state.
      if (0 === event.data) {
        this.watchCount++; // Prevent "video start" event when we seek to "0" on video ended event.
        // We seek to "0" to prevent the display of suggested videos by youtube when video ended.
        this.isVideoEnded = true;
        event.target.seekTo(0);
        event.target.stopVideo();
        this.isVideoPlaying = false;
        callback();
      }
    });
  }
  handlePaused(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Pause state.
      if (2 === event.data) {
        // The pause event can be the start of seek event ([2,3] sequence) so we reset the sequence array and adding 2.
        this.seekSequenceArray = [];
        this.seekSequenceArray.push(2); // Save the current time when pause event occur.

        this.pauseCurrentTime = this.playerObject.playerInfo.currentTime;

        // We use here a setTimeout, since we don't want to fire the pause event before we can be sure that its not part of seek event.
        this.seekTimeOut = setTimeout(() => {
          if (2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1]) {
            this.seekSequenceArray = [];
            clearTimeout(this.seekTimeOut);
          } else {
            callback(this.positionInVideoList);

            // Indication to know when there is a resume trigger event.
            this.isVideoPausedLocal = true;
          }
        }, 1000);
      }
    });
  }
  handlePlayed(callback) {
    this.playerObject.addEventListener('onStateChange', event => {
      // Prevent "video start" event when we seek to "0" on video ended event.
      if (1 === event.data && !this.isVideoEnded) {
        // Prevent "play" event when it is a seek event ([2,3] sequence).
        if (!(2 === this.seekSequenceArray.length && 2 === this.seekSequenceArray[0] && 3 === this.seekSequenceArray[1])) {
          callback();
        }
      } else {
        this.isVideoEnded = false;
      }
    });
  }
  handleError(callback) {
    this.playerObject.addEventListener('onError', () => {
      callback();
    });
  }
  handleFullScreenChange(callback) {
    this.playerObject.addEventListener('fullscreenchange', () => {
      callback(document.fullscreenElement);
    });
  }
  getCurrentTime() {
    const currentTime = this.pauseCurrentTime ? this.pauseCurrentTime : this.playerObject.playerInfo.currentTime;
    this.pauseCurrentTime = null;
    return currentTime;
  }
  play() {
    if (!this.isReady) {
      return;
    }
    this.isVideoPlaying = true;
    this.playerObject.playVideo();
  }
  pause() {
    if (!this.isReady) {
      return;
    }
    this.isVideoPlaying = false;
    this.playerObject.pauseVideo();
  }
  mute() {
    this.playerObject.mute();
  }
  async setVideoProviderData() {
    if (!this.isReady) {
      return;
    }
    if (this.currentVideoID && 11 === this.currentVideoID?.length) {
      this.playlistItem.thumbnail = {
        url: 'http://img.youtube.com/vi/' + this.playerObject.getVideoData().video_id + '/maxresdefault.jpg'
      };
      this.playlistItem.video_title = this.playerObject.getVideoData().title;
      this.playlistItem.duration = this.formatDuration(this.playerObject.getDuration());
    } else {
      this.playlistItem.thumbnail = {
        url: ''
      };
      this.playlistItem.video_title = '';
      this.playlistItem.duration = '';
    }
  }
}
var _default = exports.default = playerYoutube;

},{"../video-playlist/player-base":76}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// State transfer object.
class PlaylistEvent {
  constructor(ref) {
    const {
      event,
      tab,
      playlist,
      video
    } = ref;
    this.event = {
      type: event.type || '',
      time: event.time || 0,
      element: event.element,
      trigger: event.trigger || '',
      watchCount: event.watchCount || 0
    };
    this.tab = {
      name: tab.name,
      index: tab.index
    };
    this.playlist = {
      name: playlist.name,
      currentItem: playlist.currentItem,
      amount: playlist.amount
    };
    this.video = {
      provider: video.provider,
      url: video.url,
      title: video.title,
      duration: video.duration
    };
  }
}
var _default = exports.default = PlaylistEvent;

},{}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleVideosPanelScroll = handleVideosPanelScroll;
// Handle the display of top/bottom shadows in playlist item's panel.
function handleVideosPanelScroll(elements, event) {
  if (!event) {
    if (elements.$tabsItems[0].offsetHeight < elements.$tabsItems[0].scrollHeight) {
      elements.$tabsWrapper.addClass('bottom-shadow');
    }
    return;
  }
  if (event.target.scrollTop > 0) {
    elements.$tabsWrapper.addClass('top-shadow');
  } else {
    elements.$tabsWrapper.removeClass('top-shadow');
  }
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    elements.$tabsWrapper.removeClass('bottom-shadow');
  } else {
    elements.$tabsWrapper.addClass('bottom-shadow');
  }
}

},{}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleURLParams = handleURLParams;
exports.setVideoParams = setVideoParams;
// Handling the functionality for existing/not-existing url params.
function handleURLParams(playlistId, playlistItemsArray) {
  const params = new URLSearchParams(location.search),
    playlistName = params.get('playlist'),
    defaultTabIndex = 1;

  // When there is no data in params, the first video in the list should be active by returning false.
  if (!playlistName) {
    return false;
  }

  // When there is data in params, we return the tab number for the video.
  if (playlistName === playlistId) {
    const videoId = params.get('video');
    const videoItem = playlistItemsArray.find(playlistItem => videoId === playlistItem.dataItemId),
      tabIndex = videoItem ? videoItem.dataTab : defaultTabIndex;
    if (!tabIndex) {
      setVideoParams(playlistId, playlistItemsArray, defaultTabIndex);
    }
    return tabIndex || false;
  }
}

// Setting the playlist id and video id on the url.
function setVideoParams(playlistId, playlistItemsArray, videoId) {
  const params = new URLSearchParams(location.search);
  params.set('playlist', playlistId);
  params.set('video', playlistItemsArray[videoId - 1].dataItemId);
  window.history.replaceState({}, '', location.pathname + '?' + params);
}

},{}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const $ = jQuery;
const Video = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        widgetContainer: '.elementor-widget-container',
        widgetWrapper: '.raven-widget-wrapper',
        imageOverlay: '.raven-video-thumbnail',
        videoWrapper: '.raven-video',
        videoFrame: 'iframe',
        videoCloseButton: '.raven-video-close',
        videoPlayPreviewButton: '.raven-video-play-button-preview',
        videoModal: '.raven-modal',
        mejsPlayer: '.raven-video-mejs-hosted'
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    const elements = {
      $widgetContainer: this.$element.find(selectors.widgetContainer),
      $widgetWrapper: this.$element.find(selectors.widgetWrapper),
      $imageOverlay: this.$element.find(selectors.imageOverlay),
      $videoWrapper: this.$element.find(selectors.videoWrapper),
      $videoCloseButton: this.$element.find(selectors.videoCloseButton),
      $videoPlayPreviewButton: this.$element.find(selectors.videoPlayPreviewButton),
      $videoModal: this.$element.find(selectors.videoModal),
      $mejsPlayer: this.$element.find(selectors.mejsPlayer)
    };
    elements.$videoFrame = elements.$videoWrapper.find(selectors.videoFrame);
    return elements;
  },
  onInit() {
    elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
    if ('yes' === this.getElementSettings('lazyload')) {
      this.handleLazyLoad();
    }
    if ('yes' === this.getElementSettings('muted_autoplay_preview')) {
      this.handleMutedPreview();
    } else if ('yes' === this.getElementSettings('lazyload')) {
      this.handleLazyLoad();
    } else {
      this.handleMediaElement();
    }

    // Control styles.
    if ('yes' === this.getElementSettings('progress_bar')) {
      $('.elementor-widget-raven-video.raven-player-style2 .mejs-time').css('display', 'contents');
    } else {
      $('.elementor-widget-raven-video.raven-player-style3 .mejs-volume-button').css('width', '100%');
      $('.elementor-widget-raven-video.raven-player-style3 .mejs-volume-button button').css('float', 'right');
    }
    this.updateWidgetContainerMargin();
  },
  handleLazyLoad() {
    $(window).on('scroll', () => {
      const elementTop = this.elements.$widgetWrapper.offset().top,
        elementBottom = elementTop + this.elements.$widgetWrapper.outerHeight(),
        viewportTop = $(window).scrollTop(),
        viewportBottom = viewportTop + $(window).height();
      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        const videoFrame = this.elements.$videoFrame,
          lazyLoad = videoFrame.data('lazy-load');
        if (lazyLoad) {
          videoFrame.attr('src', lazyLoad);
          this.handleMediaElement();
        }
      }
    });
  },
  handleStickyScroll() {
    const height = this.elements.$widgetWrapper.outerHeight(true);
    const $offsetTop = this.elements.$widgetWrapper.offset().top;
    $(window).on('scroll', () => {
      if (!this.elements.$widgetWrapper.hasClass('sticky-close')) {
        const videoBoxTopPoint = $(window).scrollTop();
        const videoBoxMiddlePoint = $offsetTop + height / 2;
        if (videoBoxMiddlePoint < videoBoxTopPoint) {
          this.elements.$widgetContainer.css('height', height);
          this.elements.$widgetWrapper.addClass('sticky');
          this.elements.$videoCloseButton.show();
        } else {
          this.elements.$widgetWrapper.removeClass('sticky');
          this.elements.$videoCloseButton.hide();
        }
      }
    });
    this.elements.$videoCloseButton.on('click', () => {
      this.elements.$widgetWrapper.removeClass('sticky');
      this.elements.$widgetWrapper.addClass('sticky-close');
      this.elements.$videoCloseButton.hide();
    });
  },
  handleMutedPreview() {
    let mejsPlayer = this.elements.$videoFrame;
    if ('hosted' === this.getElementSettings('video_type')) {
      mejsPlayer = this.elements.$mejsPlayer;
    }
    const mejsPlayerControls = [],
      self = this;
    if (this.getElementSettings('fast_forward')) {
      mejsPlayerControls.push('skipback');
    }
    mejsPlayerControls.push('playpause');
    if (this.getElementSettings('fast_forward')) {
      mejsPlayerControls.push('jumpforward');
    }
    if (this.getElementSettings('current_time')) {
      mejsPlayerControls.push('current');
    }
    if (this.getElementSettings('progress_bar')) {
      mejsPlayerControls.push('progress');
    }
    mejsPlayerControls.push('duration', 'volume');
    if (this.getElementSettings('speed_options')) {
      mejsPlayerControls.push('speed');
    }
    if (this.getElementSettings('fullscreen')) {
      mejsPlayerControls.push('fullscreen');
    }
    mejsPlayer.mediaelementplayer({
      videoVolume: 'horizontal',
      pauseOtherPlayers: false,
      hideVolumeOnTouchDevices: false,
      enableProgressTooltip: false,
      alwaysShowControls: 'yes' !== this.getElementSettings('auto_hide_controls'),
      autoRewind: 'yes' === this.getElementSettings('rewind'),
      jumpForwardInterval: 10,
      skipBackInterval: 10,
      youtube: {
        controls: 0,
        autoplay: 1,
        start: this.getElementSettings('start_time'),
        end: this.getElementSettings('end_time'),
        mute: 1,
        loop: 'yes' === this.getElementSettings('youtube_loop') ? 1 : 0,
        playlist: 'youtube' === this.getElementSettings('video_type') ? this.YouTubeGetID(this.elements.$videoFrame.attr('src')) : 0,
        rel: 0,
        modestbranding: 'yes' === this.getElementSettings('hide_youtube_ui') ? 1 : 0,
        cc_load_policy: 'yes' === this.getElementSettings('turn_on_captions_by_default') ? 1 : 0,
        origin: window.location.href
      },
      features: mejsPlayerControls,
      success: media => {
        const target = self.elements.$widgetWrapper.find('.mejs-time-current')[0];
        const observer = new window.MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (mutation.type === 'attributes') {
              const $currentTime = self.elements.$widgetWrapper.find('.mejs-time-current'),
                inlineStyle = $currentTime.attr('style');
              if (inlineStyle) {
                const scaleX = inlineStyle.match(/scaleX\([0-9.]*\)/gi)[0].replace('scaleX(', '').replace(')', '');
                if (scaleX) {
                  $currentTime.css('width', scaleX * 100 + '%');
                }
              }
            }
          });
        });
        if (target) {
          observer.observe(target, {
            attributes: true,
            attributeFilter: ['style']
          });
        }

        // Hide large play button if muted preview and device frame active.
        if ('yes' === self.getElementSettings('show_device_frame')) {
          self.elements.$widgetWrapper.find('.mejs-overlay-play:not(.raven-video-play-button-preview)').addClass('hide-large-button');
        }
        media.addEventListener('play', () => {
          if ('yes' === self.getElementSettings('sticky_on_scroll') && !self.getElementSettings('use_lightbox')) {
            self.handleStickyScroll();
          }
          if ('yes' === self.getElementSettings('show_device_frame')) {
            self.elements.$widgetWrapper.find('.mejs-overlay-play:not(.raven-video-play-button-preview)').removeClass('hide-large-button');
          }
        }, false);
        self.elements.$widgetWrapper.find('.mejs-controls').hide();
        if ('vimeo' === self.getElementSettings('video_type') || 'hosted' === self.getElementSettings('video_type')) {
          mejsPlayer[0].player.play();
          mejsPlayer[0].player.options.startVolume = 0;
          mejsPlayer[0].player.setMuted(true);
        }
        this.elements.$videoPlayPreviewButton.on('click', () => {
          let $controls = self.getElementSettings('youtube_controls');
          if ('hosted' === self.getElementSettings('video_type')) {
            $controls = self.getElementSettings('hosted_controls');
          }
          this.elements.$videoPlayPreviewButton.hide();
          if ('yes' !== self.getElementSettings('youtube_mute') && 'youtube' === self.getElementSettings('video_type') || 'yes' !== self.getElementSettings('vimeo_mute') && 'vimeo' === self.getElementSettings('video_type') || 'yes' !== self.getElementSettings('hosted_muted') && 'hosted' === self.getElementSettings('video_type')) {
            mejsPlayer[0].player.setMuted(false);
            mejsPlayer[0].player.setVolume(0.5);
          }
          if ($controls === 'yes' || 'vimeo' === self.getElementSettings('video_type')) {
            self.elements.$widgetWrapper.find('.mejs-controls').show();
          }
          self.elements.$widgetWrapper.find('.raven-video-muted-overlay').hide();
          mejsPlayer[0].player.play();
        });
      }
    });
  },
  handleMediaElement() {
    let mejsPlayer = this.elements.$videoFrame;
    if ('hosted' === this.getElementSettings('video_type')) {
      mejsPlayer = this.elements.$mejsPlayer;
    }
    const mejsPlayerControls = [],
      self = this;
    if (this.getElementSettings('fast_forward')) {
      mejsPlayerControls.push('skipback');
    }
    mejsPlayerControls.push('playpause');
    if (this.getElementSettings('fast_forward')) {
      mejsPlayerControls.push('jumpforward');
    }
    if (this.getElementSettings('current_time')) {
      mejsPlayerControls.push('current');
    }
    if (this.getElementSettings('progress_bar')) {
      mejsPlayerControls.push('progress');
    }
    mejsPlayerControls.push('duration', 'volume');
    if (this.getElementSettings('speed_options')) {
      mejsPlayerControls.push('speed');
    }
    if (this.getElementSettings('fullscreen')) {
      mejsPlayerControls.push('fullscreen');
    }
    mejsPlayer.mediaelementplayer({
      videoVolume: 'horizontal',
      pauseOtherPlayers: false,
      hideVolumeOnTouchDevices: false,
      enableProgressTooltip: false,
      alwaysShowControls: 'yes' !== this.getElementSettings('auto_hide_controls'),
      autoRewind: 'yes' === this.getElementSettings('rewind'),
      jumpForwardInterval: 10,
      skipBackInterval: 10,
      youtube: {
        controls: 0,
        autoplay: 'yes' === this.getElementSettings('youtube_autoplay') ? 1 : 0,
        start: this.getElementSettings('start_time'),
        end: this.getElementSettings('end_time'),
        mute: 'yes' === this.getElementSettings('youtube_mute') || 'yes' === this.getElementSettings('youtube_autoplay') ? 1 : 0,
        loop: 'yes' === this.getElementSettings('youtube_loop') ? 1 : 0,
        playlist: 'youtube' === this.getElementSettings('video_type') ? this.YouTubeGetID(this.elements.$videoFrame.attr('src')) : 0,
        rel: 0,
        modestbranding: 'yes' === this.getElementSettings('hide_youtube_ui') ? 1 : 0,
        cc_load_policy: 'yes' === this.getElementSettings('turn_on_captions_by_default') ? 1 : 0,
        origin: window.location.href
      },
      features: mejsPlayerControls,
      success: media => {
        const target = self.elements.$widgetWrapper.find('.mejs-time-current')[0];
        const observer = new window.MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (mutation.type === 'attributes') {
              const $currentTime = self.elements.$widgetWrapper.find('.mejs-time-current'),
                inlineStyle = $currentTime.attr('style');
              if (inlineStyle) {
                const scaleX = inlineStyle.match(/scaleX\([0-9.]*\)/gi)[0].replace('scaleX(', '').replace(')', '');
                if (scaleX) {
                  $currentTime.css('width', scaleX * 100 + '%');
                }
              }
            }
          });
        });
        if (target) {
          observer.observe(target, {
            attributes: true,
            attributeFilter: ['style']
          });
        }
        media.addEventListener('play', () => {
          if ('yes' === this.getElementSettings('sticky_on_scroll') && !self.getElementSettings('use_lightbox')) {
            this.handleStickyScroll();
          }
          if ('yes' === this.getElementSettings('hosted_autoplay')) {
            self.elements.$widgetWrapper.find('.raven-video-mejs-hosted').css('visibility', 'visible');
          }
        }, false);

        // Hide large play button.
        if ('yes' !== self.getElementSettings('large_play_button')) {
          self.elements.$widgetWrapper.find('.mejs-overlay-button').hide();
        } else {
          self.elements.$widgetWrapper.find('.mejs-overlay-play').show();
        }
        if ('vimeo' === self.getElementSettings('video_type') && ('yes' === self.getElementSettings('vimeo_mute') || 'yes' === self.getElementSettings('vimeo_autoplay'))) {
          mejsPlayer[0].player.options.startVolume = 0;
          mejsPlayer[0].player.setMuted(true);
        }
      }
    });
    if ('yes' !== this.getElementSettings('youtube_controls') && 'youtube' === this.getElementSettings('video_type') || 'yes' !== this.getElementSettings('hosted_controls') && 'hosted' === this.getElementSettings('video_type')) {
      this.elements.$widgetWrapper.find('.mejs-controls').hide();
    }
  },
  YouTubeGetID(url) {
    if (!url) {
      return 0;
    }
    let ID = '';
    const youtubeUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (youtubeUrl[2] !== undefined) {
      ID = youtubeUrl[2].split(/[^0-9a-z_\-]/i);
      ID = ID[0];
    } else {
      ID = youtubeUrl;
    }
    return ID;
  },
  handleVideo() {
    let mejsPlayer = this.elements.$videoFrame;
    if ('hosted' === this.getElementSettings('video_type')) {
      mejsPlayer = this.elements.$mejsPlayer;
    }
    if (!this.getElementSettings('use_lightbox')) {
      this.elements.$imageOverlay.remove();
      mejsPlayer[0].player.play();
      return;
    }
    const modal = this.elements.$videoWrapper.find('.raven-modal'),
      mainContent = $('.jupiterx-main');
    if (modal.css('display') === 'none') {
      modal.show();
      mainContent.addClass('raven-lightbox-open');

      // Update z-index for using multiple light-boxes in a page.
      this.$element.css('z-index', parseInt(this.$element.css('z-index')) + 1);
    }
  },
  hideModal(event) {
    event.stopPropagation();
    let mejsPlayer = this.elements.$videoFrame;
    if ('hosted' === this.getElementSettings('video_type')) {
      mejsPlayer = this.elements.$mejsPlayer;
    }
    const modal = this.elements.$videoWrapper.find('.raven-modal'),
      mainContent = $('.jupiterx-main');
    if (modal.css('display') === 'block') {
      modal.hide();
      mainContent.removeClass('raven-lightbox-open');

      // Revert z-index for using multiple light-boxes in a page.
      this.$element.css('z-index', 9999);
      mejsPlayer[0].player.pause();
    }
  },
  updateWidgetContainerMargin() {
    if (this.elements.$widgetContainer.closest('.elementor-container').length > 0) {
      this.elements.$widgetContainer.removeAttr('style');
      const advancedTabMargin = this.elements.$widgetContainer.css('margin');
      if (advancedTabMargin) {
        this.$element.css('margin', advancedTabMargin);
        this.elements.$widgetContainer.css('margin', '0');
      }
    }
  },
  bindEvents() {
    this.elements.$imageOverlay.on('click', this.handleVideo);
    this.elements.$videoModal.find('.close').on('click', this.hideModal);
  },
  onElementChange(propertyName) {
    if ('_margin' === propertyName) {
      this.updateWidgetContainerMargin();
    }
  }
});
function _default($scope) {
  new Video({
    $element: $scope
  });
}

},{"../utils/module":9}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _module = _interopRequireDefault(require("../utils/module"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Products = _module.default.extend({
  getDefaultSettings() {
    return {
      selectors: {
        productsWrapper: '.raven-wc-products-wrapper',
        productsContainer: '.products',
        products: '.products .product',
        paginationContainer: '.woocommerce-pagination',
        loadMoreButton: '.raven-load-more-button',
        postImageFit: '.raven-image-fit img:not(.zoomImg)',
        preLoader: '.raven-products-preloader',
        addToCartButton: '.add_to_cart_button, .button[class*="product_type_"]',
        categories: '.posted_in',
        productTitle: '.woocommerce-loop-product__title',
        productPrice: '.price',
        ratingWrapper: '.rating-wrapper',
        infinteLoadIndicator: '.raven-infinite-load'
      },
      state: {
        isLoading: false,
        paged: 2
      }
    };
  },
  getDefaultElements() {
    const selectors = this.getSettings('selectors');
    return {
      $productsWrapper: this.$element.find(selectors.productsWrapper),
      $productsContainer: this.$element.find(selectors.productsContainer),
      $products: this.$element.find(selectors.products),
      $paginationContainer: this.$element.find(selectors.paginationContainer),
      $loadMoreButton: this.$element.find(selectors.loadMoreButton),
      $preLoader: this.$element.find(selectors.preLoader),
      $infinteLoadIndicator: this.$element.find(selectors.infinteLoadIndicator),
      $showedItems: 0
    };
  },
  bindEvents() {
    const totalPages = this.elements.$productsWrapper.data('settings').total_pages || 0;
    if (this.getInstanceValue('pagination_type') === 'load_more' && totalPages > 1) {
      this.loadMore();
    }
    if (this.getInstanceValue('pagination_type') === 'infinite_load' && totalPages > 1) {
      const urlParams = new URLSearchParams(window.location.search);
      const hasSellkitFilterWidget = document.querySelector('.elementor-widget-sellkit-product-filter') !== null;
      const hasActualFilterParams = [...urlParams.keys()].some(key => !['sellkit_filters', 'page'].includes(key));
      const sellkitFiltersActive = hasSellkitFilterWidget && urlParams.get('sellkit_filters') === '1' && hasActualFilterParams;
      if (!sellkitFiltersActive) {
        this.infiniteLoad();
      }
    }
    this.zoom();
    this.flexslider();
    this.wrapContentData();
    if (this.getInstanceValue('wishlist') === 'show') {
      this.wishlist();
    }
    this.initialize();
    if (this.getInstanceValue('general_layout') === 'grid') {
      this.gridRun();
      $(window).on('resize', () => {
        setTimeout(() => this.gridRun(), 500);
      });
    }
    const self = this;

    /*
     This event is dispatched in showProducts method of the sellkit pro products filter.
     */
    document.addEventListener('sellkitpro:filterproducts:showproducts', () => {
      /*
       Refresh The elements so the other functions (zoom, initialize and ...)
       apply on the new elements that are added because of the sellkit pro filters.
       */
      self.refreshElements();
      self.zoom();
      self.flexslider();
      self.wrapContentData();
      self.initialize();
      if (this.getInstanceValue('general_layout') === 'grid') {
        setTimeout(() => this.gridRun(), 100);
      }
    });
    window.addEventListener('resize', function () {
      if (self.getInstanceValue('general_layout') === 'masonry') {
        self.masonryRun();
      }
      if (self.getInstanceValue('general_layout') === 'matrix') {
        self.matrixRun();
      }
      if (self.getInstanceValue('general_layout') === 'metro') {
        self.metroRun();
      }
    });
  },
  initialize() {
    let notGalleryEffect = true;
    if (typeof this.getInstanceValue('swap_effect') !== 'undefined' && this.getInstanceValue('swap_effect').includes('gallery')) {
      notGalleryEffect = false;
    }
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'masonry') {
      this.masonryRun();
    }
    const self = this;
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'matrix') {
      this.elements.$productsWrapper.imagesLoaded().progress(() => {
        self.matrixRun();
      });
    }
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'metro') {
      this.elements.$productsWrapper.imagesLoaded().progress(() => {
        self.metroRun();
      });
    }
    if (this.getInstanceValue('load_effect')) {
      this.handleAnitmation();
    }
    objectFitPolyfill(this.$element.find(this.getSettings('selectors.postImageFit')));
  },
  initializeOnFetch() {
    let notGalleryEffect = true;
    if (typeof this.getInstanceValue('swap_effect') !== 'undefined' && this.getInstanceValue('swap_effect').includes('gallery')) {
      notGalleryEffect = false;
    }
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'masonry') {
      this.masonryRun();
    }
    const self = this;
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'matrix') {
      this.elements.$productsWrapper.imagesLoaded().progress(() => {
        self.matrixRun();
      });
    }
    if (notGalleryEffect && this.getInstanceValue('general_layout') === 'metro') {
      this.elements.$productsWrapper.imagesLoaded().progress(() => {
        self.metroRun();
      });
    }
    if (!['metro', 'matrix'].includes(this.getInstanceValue('general_layout')) && this.getInstanceValue('load_effect')) {
      this.handleAnitmation();
    }
    objectFitPolyfill(this.$element.find(this.getSettings('selectors.postImageFit')));
  },
  onElementChange(propertyName) {
    if (propertyName === 'metro_matrix_rows_gap') {
      if (this.getInstanceValue('general_layout') === 'metro') {
        this.metroRun();
      }
      if (this.getInstanceValue('general_layout') === 'matrix') {
        this.matrixRun();
      }
    }
    if (propertyName === 'metro_matrix_large_aspect_ratio' || propertyName === 'metro_matrix_large_aspect_ratio') {
      setTimeout(() => {
        if (this.getInstanceValue('general_layout') === 'metro') {
          this.metroRun();
        }
        if (this.getInstanceValue('general_layout') === 'matrix') {
          this.matrixRun();
        }
      }, 300);
    }
    if (propertyName === 'box_rows_gap' || propertyName === 'box_columns_gap' || propertyName === 'stroke_width') {
      if (this.getInstanceValue('general_layout') === 'masonry') {
        setTimeout(() => {
          this.masonryRun();
        }, 300);
      }
    }
  },
  handleProductsOrder(items) {
    if (this.getInstanceValue('general_layout') === 'metro' && items[0]?.parentNode?.parentNode.classList.contains('raven-product-full-width')) {
      return [...items.slice(1, 3).reverse(), items[0], ...items.slice(3, items.length)];
    }
    if (items[0]?.parentNode?.parentNode.classList.contains('raven-product-full-width')) {
      return [items[0], ...items.slice(1, items.length).reverse()];
    }
    if (this.getInstanceValue('general_layout') === 'matrix') {
      return [...items];
    }
    return [...items.reverse()];
  },
  createAnimationObserver(self, item, options, index, effect) {
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (item.classList.contains('raven-product-loaded')) {
            return;
          }
          let delay = self.elements.$showedItems > 0 ? index - self.elements.$showedItems : index;
          if (effect === 'slide-right') {
            if (delay > self.elements.$showedItems) {
              delay -= self.elements.$showedItems;
            }
            if (self.elements.$showedItems > delay) {
              delay = self.elements.$showedItems - delay;
            }
          }
          setTimeout(() => {
            item.classList.add('raven-product-loaded');
            self.elements.$showedItems = index;
            observer.unobserve(item);
          }, 100 * delay);
        }
      });
    }, options);
    observer.observe(item);
  },
  handleAnitmation() {
    let items = [...this.elements.$productsWrapper[0].querySelectorAll('.jupiterx-product-container')];
    const effect = this.getInstanceValue('load_effect'),
      self = this;
    this.elements.$productsWrapper.imagesLoaded().done(() => {
      let increment = 0;
      if (effect === 'slide-right') {
        this.setColumnsCount();
        const settings = this.getSettings(),
          rows = parseInt(items.length / settings.columnsCount),
          itemsLeft = items.length % settings.columnsCount;
        if (items.length / settings.columnsCount <= 1) {
          items = [...this.handleProductsOrder(items)];
        } else {
          const itemsToRight = [];
          let tempItems = [];
          for (let row = 1; row <= rows; ++row) {
            tempItems = [];
            for (let i = itemsToRight.length; i < row * settings.columnsCount; ++i) {
              tempItems.push(items[i]);
            }
            itemsToRight.push(...this.handleProductsOrder(tempItems));
          }
          if (itemsLeft > 0) {
            itemsToRight.push(...items.slice(-itemsLeft).reverse());
          }
          items = itemsToRight;
        }
      }

      // eslint-disable-next-line no-unused-vars
      items.forEach((event, index) => {
        if (!effect || document.body.classList.contains('elementor-editor-active')) {
          if (!event.classList.contains('raven-product-loaded')) {
            ++increment;
            setTimeout(() => {
              event.classList.add('raven-product-loaded');
            }, 200 + 100 * increment);
          }
        }
        if (effect) {
          const options = {
            threshold: 0.4
          };
          self.createAnimationObserver(self, event, options, index, effect);
        }
      });
    });
  },
  setColumnsCount() {
    const curDevice = elementorFrontend.getCurrentDeviceMode();
    let columnsKey = `columns_custom${curDevice}`;
    if (curDevice === 'desktop') {
      columnsKey = 'columns_custom';
    }
    if (this.getInstanceValue('general_layout') === 'metro' || this.getInstanceValue('general_layout') === 'matrix') {
      columnsKey = 'number_of_products';
    }
    let columnValue = this.getInstanceValue(columnsKey);
    if (!this.getInstanceValue(columnsKey)) {
      columnValue = 1;
    }
    this.setSettings('columnsCount', parseInt(columnValue));
  },
  zoom() {
    if (this.getInstanceValue('swap_effect') !== 'zoom_hover') {
      return;
    }
    this.elements.$productsWrapper.find('.jupiterx-wc-loop-product-image').zoom();
  },
  flexslider() {
    if (typeof this.getInstanceValue('swap_effect') === 'undefined') {
      return;
    }
    if (!this.getInstanceValue('swap_effect').includes('gallery')) {
      return;
    }
    const self = this;
    let controlNav = false;
    let directionNav = false;
    if (this.getInstanceValue('swap_effect') === 'gallery_arrows') {
      directionNav = true;
    }
    if (this.getInstanceValue('swap_effect') === 'gallery_pagination') {
      controlNav = true;
    }
    self.elements.$productsWrapper.find('.jupiterx-wc-loop-product-image').flexslider({
      selector: '.raven-swap-effect-gallery-slides > li',
      animation: 'slide',
      slideshow: false,
      controlNav,
      directionNav,
      prevText: '<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.2 12" style="enable-background:new 0 0 7.2 12;" xml:space="preserve"><path class="st0" d="M2.4,6l4.5-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-5.2,5C0.1,5.5,0,5.7,0,6s0.1,0.5,0.3,0.7l5.2,5	C5.7,11.9,6,12,6.2,12c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L2.4,6z"></path></svg>',
      nextText: '<svg version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 7.2 12" style="enable-background:new 0 0 7.2 12;" xml:space="preserve"><path class="st0" d="M4.8,6l-4.5,4.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l5.2-5C7.1,6.5,7.2,6.3,7.2,6S7.1,5.5,6.9,5.3l-5.2-5C1.5,0.1,1.2,0,1,0C0.7,0,0.5,0.1,0.3,0.3c-0.4,0.4-0.4,1,0,1.4L4.8,6z"></path></svg>',
      init() {
        self.elements.$productsWrapper.addClass('raven-swap-effect-gallery-loaded');
      },
      start() {
        if (self.getInstanceValue('general_layout') === 'masonry') {
          self.masonryRun();
        }
        if (self.getInstanceValue('general_layout') === 'matrix') {
          self.matrixRun();
        }
        if (self.getInstanceValue('general_layout') === 'metro') {
          self.metroRun();
        }
      }
    });
  },
  loadMore() {
    const self = this;
    self.elements.$loadMoreButton.on('click', event => {
      event.preventDefault();
      self.fetch();
    });
  },
  createObserver($indicator, self, options) {
    if ($indicator.length < 1) {
      return;
    }
    const observer = new IntersectionObserver(entries => {
      // eslint-disable-line no-undef
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          self.fetch();
          observer.disconnect();
        }
      });
    }, options);
    observer.observe($indicator[0]);
  },
  infiniteLoad() {
    const self = this;
    if (self.elements.$paginationContainer.length) {
      return;
    }
    self.elements.$productsContainer.imagesLoaded().always(() => {
      const options = {
        threshold: 1.0
      };
      self.createObserver(self.elements.$infinteLoadIndicator, self, options);
    });
  },
  fetch() {
    const self = this;
    if (self.getSettings('state.isLoading')) {
      return;
    }
    self.setSettings('state.isLoading', true);
    const data = {
      post_id: elementorFrontend.config.post.id,
      model_id: this.getID(),
      'product-page': self.getSettings('state.paged')
    };

    // Set template ID in product archives as post_id.
    const isElementorProductArchive = jQuery('[data-elementor-type=product-archive], [data-elementor-type=jet-woo-builder-archive]');
    if (isElementorProductArchive.data('elementor-id')) {
      data.raven_archive_query = JSON.stringify(jQuery('[data-raven-archive-query]').data('raven-archive-query'));
      data.post_id = isElementorProductArchive.data('elementor-id');
    }

    // Orderby filter.
    const urlParams = new URLSearchParams(window.location.search);
    if (null !== urlParams.get('orderby') && urlParams.get('orderby').length) {
      data.orderby = urlParams.get('orderby');
    }
    if (self.elements.$preLoader) {
      self.elements.$preLoader[0].classList.add('active-preloader');
    }
    wp.ajax.send('raven_products_query', {
      type: 'GET',
      data,
      success(res) {
        self.setSettings('state.paged', self.getSettings('state.paged') + 1);
        self.elements.$productsContainer.append(res.products);
        let resultCount = self.elements.$productsContainer.siblings('.woocommerce-result-count');
        if (resultCount.length === 0) {
          resultCount = self.elements.$productsContainer.siblings('.raven-products-ordering-result-wrapper').find('.woocommerce-result-count');
        }
        resultCount.html(res.result_count);
        if (self.getInstanceValue('pagination_type') === 'load_more' && res.query_results.current_page === res.query_results.total_pages) {
          self.elements.$loadMoreButton.hide();
        }
        const totalPages = self.elements.$productsWrapper.data('settings').total_pages || 0;
        if (self.getInstanceValue('pagination_type') === 'infinite_load' && res.query_results.current_page !== res.query_results.total_pages && totalPages > 1) {
          self.infiniteLoad();
        }
        self.zoom();
        self.flexslider();
        self.initializeOnFetch();
        self.wrapContentData();
      },
      error(res) {
        // eslint-disable-next-line no-console
        console.error(res);
      },
      complete() {
        self.setSettings('state.isLoading', false);
        if (self.elements.$preLoader) {
          self.elements.$preLoader[0].classList.remove('active-preloader');
        }
      }
    });
  },
  wishlist() {
    $(document).on('click', '.jupiterx-wishlist', function (event) {
      event.preventDefault();
      const $this = $(this);
      let action = 'add_to_wishlist';
      const data = {};
      const state = $this.data('state');
      const productId = $this.data('productId');
      const nonceAdd = $this.data('nonceAdd');
      const nonceRemove = $this.data('nonceRemove');
      data.nonce = nonceAdd;
      data.add_to_wishlist = productId;
      data.remove_from_wishlist = productId;
      if (state === 'remove') {
        action = 'remove_from_wishlist';
        data.nonce = nonceRemove;
      }
      wp.ajax.send(action, {
        type: 'GET',
        data
      }).always(res => {
        if (action === 'add_to_wishlist' && res.result === 'true') {
          $this.addClass('jupiterx-wishlist-remove');
          $this.data('state', 'remove');
        }
        if (action === 'remove_from_wishlist' && res.fragments.length === 0) {
          $this.removeClass('jupiterx-wishlist-remove');
          $this.data('state', 'add');
        }
      });
    });
  },
  setGapSize() {
    const curDevice = elementorFrontend.getCurrentDeviceMode();
    let gapKey = `metro_matrix_rows_gap_${curDevice}`;
    if (curDevice === 'desktop') {
      gapKey = 'metro_matrix_rows_gap';
    }
    this.setSettings('gapSize', parseInt(this.getInstanceValue(gapKey)?.size));
  },
  gridRun() {
    const itemsHeight = this.elements.$productsContainer[0]?.clientHeight,
      containerHeight = this.$element[0]?.clientHeight;
    if (!elementorFrontend?.config?.experimentalFeatures?.container) {
      return;
    }
    if (containerHeight >= itemsHeight) {
      this.$element[0].style.minHeight = 'unset';
      return;
    }
    this.$element[0].style.minHeight = this.elements.$productsContainer[0]?.clientHeight + 'px';
  },
  masonryRun() {
    const self = this,
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$productsContainer.data('isotope')) {
      self.elements.$productsContainer.isotope('reloadItems').isotope();
    }
    self.elements.$productsContainer.isotope({
      itemSelector: '.product',
      masonry: {
        layoutMode: 'fitRows'
      },
      transitionDuration: 0,
      sortBy: 'original-order',
      isOriginLeft
    });
  },
  matrixRun() {
    this.setGapSize();
    const self = this,
      gap = this.getSettings().gapSize ? this.getSettings().gapSize : 0,
      currentDevice = elementorFrontend.getCurrentDeviceMode(),
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$productsContainer.data('isotope')) {
      self.elements.$productsContainer.isotope('reloadItems').isotope();
    }
    let normalSize = Math.floor((self.elements.$productsContainer.parent().width() + gap) / 3),
      tripleSize = normalSize * 3;
    if (currentDevice === 'mobile') {
      normalSize = normalSize * 3 - gap;
      tripleSize = normalSize;
    }
    let increment = 0;
    self.elements.$productsContainer.find('li.product').each((index, event) => {
      let setWidth = normalSize;
      if (index === 0 || increment + 4 === index) {
        setWidth = tripleSize;
        increment = index;
        if (!event.classList.contains('raven-product-full-width')) {
          event.classList.add('raven-product-full-width');
        }
      }
      if (setWidth) {
        event.style.width = setWidth + 'px';
      }
      if (currentDevice === 'mobile') {
        event.style.paddingRight = 0;
      }
    });
    self.elements.$productsContainer.find('li.product').addClass('matrix-loaded');
    self.elements.$productsContainer.isotope({
      itemSelector: 'li.product',
      layoutMode: 'packery',
      packery: {
        isFitWidth: true
      },
      percentPosition: true,
      sortBy: 'original-order',
      transitionDuration: 0,
      isOriginLeft
    });
    self.elements.$productsContainer.isotope('once', 'arrangeComplete', () => {
      setTimeout(() => self.handleAnitmation(), 100);
    });
  },
  metroRun() {
    this.setGapSize();
    const self = this,
      gap = this.getSettings().gapSize ? this.getSettings().gapSize : 0,
      currentDevice = elementorFrontend.getCurrentDeviceMode(),
      isOriginLeft = document.body.classList.contains('rtl') ? false : true;
    if (self.elements.$productsContainer.data('isotope')) {
      self.elements.$productsContainer.isotope('reloadItems').isotope();
    }
    let normalSize = Math.floor((self.elements.$productsContainer.parent().width() + gap) / 4),
      doubleSize = normalSize * 2;
    if (currentDevice === 'tablet') {
      normalSize = normalSize * 2;
      doubleSize = normalSize * 2;
    }
    if (currentDevice === 'mobile') {
      normalSize = normalSize * 4;
      doubleSize = normalSize;
    }
    let increment = 0;
    self.elements.$productsContainer.find('li.product').each((index, event) => {
      let setWidth = normalSize,
        setHeight = normalSize;
      if (index === 0 || increment + 3 === index) {
        setWidth = doubleSize;
        setHeight = doubleSize;
        increment = index;
        if (!event.classList.contains('raven-product-full-width')) {
          event.classList.add('raven-product-full-width');
        }
      }
      if (setWidth) {
        event.style.width = setWidth + 'px';
      }
      if ('overlay' === self.getInstanceValue('metro_matrix_content_layout')) {
        event.style.height = setHeight + 'px';
      }
    });
    self.elements.$productsContainer.find('li.product').addClass('metro-loaded');
    self.elements.$productsContainer.isotope({
      itemSelector: 'li.product',
      layoutMode: 'packery',
      percentPosition: true,
      sortBy: 'original-order',
      transitionDuration: 0,
      isOriginLeft
    });
    self.elements.$productsContainer.isotope('once', 'arrangeComplete', () => {
      setTimeout(() => self.handleAnitmation(), 100);
    });
  },
  wrapContentData() {
    const selectors = this.getSettings('selectors');
    const contents = [selectors.productPrice, selectors.productTitle, selectors.categories, selectors.ratingWrapper];
    const btnLocation = this.getInstanceValue('pc_atc_button_location');
    const btnLocationOverlay = this.getInstanceValue('pc_atc_button_location_overlay');
    const isOutside = btnLocation && 'outside' === btnLocation || btnLocationOverlay && 'outside' === btnLocationOverlay;
    if (isOutside) {
      contents.push(selectors.addToCartButton);
    }
    this.elements.$productsContainer.find('.product').each((index, product) => {
      contents.forEach(content => {
        const dataElement = $(product).find(content)[0];
        if (dataElement) {
          dataElement.classList.add('raven-product-item-content');
        }
      });
      if (!product.classList.contains('has-data-wrapper')) {
        $(product).find('.raven-product-item-content').wrapAll('<div class="raven-product-data" />');
      }
      product.classList.add('has-data-wrapper');
    });
  },
  refreshElements() {
    const selectors = this.getSettings('selectors');
    this.elements.$productsWrapper = this.$element.find(selectors.productsWrapper);
    this.elements.$productsContainer = this.$element.find(selectors.productsContainer);
    this.elements.$products = this.$element.find(selectors.products);
    this.elements.$paginationContainer = this.$element.find(selectors.paginationContainer);
    this.elements.$loadMoreButton = this.$element.find(selectors.loadMoreButton);
    this.elements.$preLoader = this.$element.find(selectors.preLoader);
  }
});
function _default($scope) {
  new Products({
    $element: $scope
  });
}

},{"../utils/module":9}],85:[function(require,module,exports){
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],86:[function(require,module,exports){
/**
 * @popperjs/core v2.11.8 - MIT License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = isElement(element) ? getWindow(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect$2(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect$2,
  data: {}
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

exports.applyStyles = applyStyles$1;
exports.arrow = arrow$1;
exports.computeStyles = computeStyles$1;
exports.createPopper = createPopper;
exports.createPopperLite = createPopper$1;
exports.defaultModifiers = defaultModifiers;
exports.detectOverflow = detectOverflow;
exports.eventListeners = eventListeners;
exports.flip = flip$1;
exports.hide = hide$1;
exports.offset = offset$1;
exports.popperGenerator = popperGenerator;
exports.popperOffsets = popperOffsets$1;
exports.preventOverflow = preventOverflow$1;


},{}],87:[function(require,module,exports){
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

},{"@tannin/evaluate":88,"@tannin/postfix":90}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"@tannin/compile":87}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validateNamespace = _interopRequireDefault(require("./validateNamespace.js"));
var _validateHookName = _interopRequireDefault(require("./validateHookName.js"));
/**
 * Internal dependencies
 */

/**
 * @callback AddHook
 *
 * Adds the hook to the appropriate hooks container.
 *
 * @param {string}               hookName      Name of hook to add
 * @param {string}               namespace     The unique namespace identifying the callback in the form `vendor/plugin/function`.
 * @param {import('.').Callback} callback      Function to call when the hook is run
 * @param {number}               [priority=10] Priority of this hook
 */

/**
 * Returns a function which, when invoked, will add a hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {AddHook} Function that adds a new hook.
 */
function createAddHook(hooks, storeKey) {
  return function addHook(hookName, namespace, callback, priority = 10) {
    const hooksStore = hooks[storeKey];
    if (!(0, _validateHookName.default)(hookName)) {
      return;
    }
    if (!(0, _validateNamespace.default)(namespace)) {
      return;
    }
    if ('function' !== typeof callback) {
      // eslint-disable-next-line no-console
      console.error('The hook callback must be a function.');
      return;
    }

    // Validate numeric priority
    if ('number' !== typeof priority) {
      // eslint-disable-next-line no-console
      console.error('If specified, the hook priority must be a number.');
      return;
    }
    const handler = {
      callback,
      priority,
      namespace
    };
    if (hooksStore[hookName]) {
      // Find the correct insert index of the new hook.
      const handlers = hooksStore[hookName].handlers;

      /** @type {number} */
      let i;
      for (i = handlers.length; i > 0; i--) {
        if (priority >= handlers[i - 1].priority) {
          break;
        }
      }
      if (i === handlers.length) {
        // If append, operate via direct assignment.
        handlers[i] = handler;
      } else {
        // Otherwise, insert before index via splice.
        handlers.splice(i, 0, handler);
      }

      // We may also be currently executing this hook.  If the callback
      // we're adding would come after the current callback, there's no
      // problem; otherwise we need to increase the execution index of
      // any other runs by 1 to account for the added element.
      hooksStore.__current.forEach(hookInfo => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      // This is the first hook of its type.
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0
      };
    }
    if (hookName !== 'hookAdded') {
      hooks.doAction('hookAdded', hookName, namespace, callback, priority);
    }
  };
}
var _default = exports.default = createAddHook;

},{"./validateHookName.js":100,"./validateNamespace.js":101,"@babel/runtime/helpers/interopRequireDefault":85}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Returns a function which, when invoked, will return the name of the
 * currently running hook, or `null` if no hook of the given type is currently
 * running.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {() => string | null} Function that returns the current hook name or null.
 */
function createCurrentHook(hooks, storeKey) {
  return function currentHook() {
    var _hooksStore$__current;
    const hooksStore = hooks[storeKey];
    return (_hooksStore$__current = hooksStore.__current[hooksStore.__current.length - 1]?.name) !== null && _hooksStore$__current !== void 0 ? _hooksStore$__current : null;
  };
}
var _default = exports.default = createCurrentHook;

},{}],93:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validateHookName = _interopRequireDefault(require("./validateHookName.js"));
/**
 * Internal dependencies
 */

/**
 * @callback DidHook
 *
 * Returns the number of times an action has been fired.
 *
 * @param {string} hookName The hook name to check.
 *
 * @return {number | undefined} The number of times the hook has run.
 */

/**
 * Returns a function which, when invoked, will return the number of times a
 * hook has been called.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DidHook} Function that returns a hook's call count.
 */
function createDidHook(hooks, storeKey) {
  return function didHook(hookName) {
    const hooksStore = hooks[storeKey];
    if (!(0, _validateHookName.default)(hookName)) {
      return;
    }
    return hooksStore[hookName] && hooksStore[hookName].runs ? hooksStore[hookName].runs : 0;
  };
}
var _default = exports.default = createDidHook;

},{"./validateHookName.js":100,"@babel/runtime/helpers/interopRequireDefault":85}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @callback DoingHook
 * Returns whether a hook is currently being executed.
 *
 * @param {string} [hookName] The name of the hook to check for.  If
 *                            omitted, will check for any hook being executed.
 *
 * @return {boolean} Whether the hook is being executed.
 */

/**
 * Returns a function which, when invoked, will return whether a hook is
 * currently being executed.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {DoingHook} Function that returns whether a hook is currently
 *                     being executed.
 */
function createDoingHook(hooks, storeKey) {
  return function doingHook(hookName) {
    const hooksStore = hooks[storeKey];

    // If the hookName was not passed, check for any current hook.
    if ('undefined' === typeof hookName) {
      return 'undefined' !== typeof hooksStore.__current[0];
    }

    // Return the __current hook.
    return hooksStore.__current[0] ? hookName === hooksStore.__current[0].name : false;
  };
}
var _default = exports.default = createDoingHook;

},{}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * @callback HasHook
 *
 * Returns whether any handlers are attached for the given hookName and optional namespace.
 *
 * @param {string} hookName    The name of the hook to check for.
 * @param {string} [namespace] Optional. The unique namespace identifying the callback
 *                             in the form `vendor/plugin/function`.
 *
 * @return {boolean} Whether there are handlers that are attached to the given hook.
 */
/**
 * Returns a function which, when invoked, will return whether any handlers are
 * attached to a particular hook.
 *
 * @param {import('.').Hooks}    hooks    Hooks instance.
 * @param {import('.').StoreKey} storeKey
 *
 * @return {HasHook} Function that returns whether any handlers are
 *                   attached to a particular hook and optional namespace.
 */
function createHasHook(hooks, storeKey) {
  return function hasHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];

    // Use the namespace if provided.
    if ('undefined' !== typeof namespace) {
      return hookName in hooksStore && hooksStore[hookName].handlers.some(hook => hook.namespace === namespace);
    }
    return hookName in hooksStore;
  };
}
var _default = exports.default = createHasHook;

},{}],96:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports._Hooks = void 0;
var _createAddHook = _interopRequireDefault(require("./createAddHook"));
var _createRemoveHook = _interopRequireDefault(require("./createRemoveHook"));
var _createHasHook = _interopRequireDefault(require("./createHasHook"));
var _createRunHook = _interopRequireDefault(require("./createRunHook"));
var _createCurrentHook = _interopRequireDefault(require("./createCurrentHook"));
var _createDoingHook = _interopRequireDefault(require("./createDoingHook"));
var _createDidHook = _interopRequireDefault(require("./createDidHook"));
/**
 * Internal dependencies
 */

/**
 * Internal class for constructing hooks. Use `createHooks()` function
 *
 * Note, it is necessary to expose this class to make its type public.
 *
 * @private
 */
class _Hooks {
  constructor() {
    /** @type {import('.').Store} actions */
    this.actions = Object.create(null);
    this.actions.__current = [];

    /** @type {import('.').Store} filters */
    this.filters = Object.create(null);
    this.filters.__current = [];
    this.addAction = (0, _createAddHook.default)(this, 'actions');
    this.addFilter = (0, _createAddHook.default)(this, 'filters');
    this.removeAction = (0, _createRemoveHook.default)(this, 'actions');
    this.removeFilter = (0, _createRemoveHook.default)(this, 'filters');
    this.hasAction = (0, _createHasHook.default)(this, 'actions');
    this.hasFilter = (0, _createHasHook.default)(this, 'filters');
    this.removeAllActions = (0, _createRemoveHook.default)(this, 'actions', true);
    this.removeAllFilters = (0, _createRemoveHook.default)(this, 'filters', true);
    this.doAction = (0, _createRunHook.default)(this, 'actions');
    this.applyFilters = (0, _createRunHook.default)(this, 'filters', true);
    this.currentAction = (0, _createCurrentHook.default)(this, 'actions');
    this.currentFilter = (0, _createCurrentHook.default)(this, 'filters');
    this.doingAction = (0, _createDoingHook.default)(this, 'actions');
    this.doingFilter = (0, _createDoingHook.default)(this, 'filters');
    this.didAction = (0, _createDidHook.default)(this, 'actions');
    this.didFilter = (0, _createDidHook.default)(this, 'filters');
  }
}

/** @typedef {_Hooks} Hooks */

/**
 * Returns an instance of the hooks object.
 *
 * @return {Hooks} A Hooks instance.
 */
exports._Hooks = _Hooks;
function createHooks() {
  return new _Hooks();
}
var _default = exports.default = createHooks;

},{"./createAddHook":91,"./createCurrentHook":92,"./createDidHook":93,"./createDoingHook":94,"./createHasHook":95,"./createRemoveHook":97,"./createRunHook":98,"@babel/runtime/helpers/interopRequireDefault":85}],97:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _validateNamespace = _interopRequireDefault(require("./validateNamespace.js"));
var _validateHookName = _interopRequireDefault(require("./validateHookName.js"));
/**
 * Internal dependencies
 */

/**
 * @callback RemoveHook
 * Removes the specified callback (or all callbacks) from the hook with a given hookName
 * and namespace.
 *
 * @param {string} hookName  The name of the hook to modify.
 * @param {string} namespace The unique namespace identifying the callback in the
 *                           form `vendor/plugin/function`.
 *
 * @return {number | undefined} The number of callbacks removed.
 */

/**
 * Returns a function which, when invoked, will remove a specified hook or all
 * hooks by the given name.
 *
 * @param {import('.').Hooks}    hooks             Hooks instance.
 * @param {import('.').StoreKey} storeKey
 * @param {boolean}              [removeAll=false] Whether to remove all callbacks for a hookName,
 *                                                 without regard to namespace. Used to create
 *                                                 `removeAll*` functions.
 *
 * @return {RemoveHook} Function that removes hooks.
 */
function createRemoveHook(hooks, storeKey, removeAll = false) {
  return function removeHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if (!(0, _validateHookName.default)(hookName)) {
      return;
    }
    if (!removeAll && !(0, _validateNamespace.default)(namespace)) {
      return;
    }

    // Bail if no hooks exist by this name.
    if (!hooksStore[hookName]) {
      return 0;
    }
    let handlersRemoved = 0;
    if (removeAll) {
      handlersRemoved = hooksStore[hookName].handlers.length;
      hooksStore[hookName] = {
        runs: hooksStore[hookName].runs,
        handlers: []
      };
    } else {
      // Try to find the specified callback to remove.
      const handlers = hooksStore[hookName].handlers;
      for (let i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i].namespace === namespace) {
          handlers.splice(i, 1);
          handlersRemoved++;
          // This callback may also be part of a hook that is
          // currently executing.  If the callback we're removing
          // comes after the current callback, there's no problem;
          // otherwise we need to decrease the execution index of any
          // other runs by 1 to account for the removed element.
          hooksStore.__current.forEach(hookInfo => {
            if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
              hookInfo.currentIndex--;
            }
          });
        }
      }
    }
    if (hookName !== 'hookRemoved') {
      hooks.doAction('hookRemoved', hookName, namespace);
    }
    return handlersRemoved;
  };
}
var _default = exports.default = createRemoveHook;

},{"./validateHookName.js":100,"./validateNamespace.js":101,"@babel/runtime/helpers/interopRequireDefault":85}],98:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Returns a function which, when invoked, will execute all callbacks
 * registered to a hook of the specified type, optionally returning the final
 * value of the call chain.
 *
 * @param {import('.').Hooks}    hooks                  Hooks instance.
 * @param {import('.').StoreKey} storeKey
 * @param {boolean}              [returnFirstArg=false] Whether each hook callback is expected to
 *                                                      return its first argument.
 *
 * @return {(hookName:string, ...args: unknown[]) => undefined|unknown} Function that runs hook callbacks.
 */
function createRunHook(hooks, storeKey, returnFirstArg = false) {
  return function runHooks(hookName, ...args) {
    const hooksStore = hooks[storeKey];
    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0
      };
    }
    hooksStore[hookName].runs++;
    const handlers = hooksStore[hookName].handlers;

    // The following code is stripped from production builds.
    if ('production' !== process.env.NODE_ENV) {
      // Handle any 'all' hooks registered.
      if ('hookAdded' !== hookName && hooksStore.all) {
        handlers.push(...hooksStore.all.handlers);
      }
    }
    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : undefined;
    }
    const hookInfo = {
      name: hookName,
      currentIndex: 0
    };
    hooksStore.__current.push(hookInfo);
    while (hookInfo.currentIndex < handlers.length) {
      const handler = handlers[hookInfo.currentIndex];
      const result = handler.callback.apply(null, args);
      if (returnFirstArg) {
        args[0] = result;
      }
      hookInfo.currentIndex++;
    }
    hooksStore.__current.pop();
    if (returnFirstArg) {
      return args[0];
    }
    return undefined;
  };
}
var _default = exports.default = createRunHook;

}).call(this)}).call(this,require('_process'))
},{"_process":109}],99:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFilters = exports.addFilter = exports.addAction = exports.actions = void 0;
Object.defineProperty(exports, "createHooks", {
  enumerable: true,
  get: function () {
    return _createHooks.default;
  }
});
exports.removeFilter = exports.removeAllFilters = exports.removeAllActions = exports.removeAction = exports.hasFilter = exports.hasAction = exports.filters = exports.doingFilter = exports.doingAction = exports.doAction = exports.didFilter = exports.didAction = exports.defaultHooks = exports.currentFilter = exports.currentAction = void 0;
var _createHooks = _interopRequireDefault(require("./createHooks"));
/**
 * Internal dependencies
 */

/** @typedef {(...args: any[])=>any} Callback */

/**
 * @typedef Handler
 * @property {Callback} callback  The callback
 * @property {string}   namespace The namespace
 * @property {number}   priority  The namespace
 */

/**
 * @typedef Hook
 * @property {Handler[]} handlers Array of handlers
 * @property {number}    runs     Run counter
 */

/**
 * @typedef Current
 * @property {string} name         Hook name
 * @property {number} currentIndex The index
 */

/**
 * @typedef {Record<string, Hook> & {__current: Current[]}} Store
 */

/**
 * @typedef {'actions' | 'filters'} StoreKey
 */

/**
 * @typedef {import('./createHooks').Hooks} Hooks
 */

const defaultHooks = exports.defaultHooks = (0, _createHooks.default)();
const {
  addAction,
  addFilter,
  removeAction,
  removeFilter,
  hasAction,
  hasFilter,
  removeAllActions,
  removeAllFilters,
  doAction,
  applyFilters,
  currentAction,
  currentFilter,
  doingAction,
  doingFilter,
  didAction,
  didFilter,
  actions,
  filters
} = defaultHooks;
exports.filters = filters;
exports.actions = actions;
exports.didFilter = didFilter;
exports.didAction = didAction;
exports.doingFilter = doingFilter;
exports.doingAction = doingAction;
exports.currentFilter = currentFilter;
exports.currentAction = currentAction;
exports.applyFilters = applyFilters;
exports.doAction = doAction;
exports.removeAllFilters = removeAllFilters;
exports.removeAllActions = removeAllActions;
exports.hasFilter = hasFilter;
exports.hasAction = hasAction;
exports.removeFilter = removeFilter;
exports.removeAction = removeAction;
exports.addFilter = addFilter;
exports.addAction = addAction;

},{"./createHooks":96,"@babel/runtime/helpers/interopRequireDefault":85}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Validate a hookName string.
 *
 * @param {string} hookName The hook name to validate. Should be a non empty string containing
 *                          only numbers, letters, dashes, periods and underscores. Also,
 *                          the hook name cannot begin with `__`.
 *
 * @return {boolean} Whether the hook name is valid.
 */
function validateHookName(hookName) {
  if ('string' !== typeof hookName || '' === hookName) {
    // eslint-disable-next-line no-console
    console.error('The hook name must be a non-empty string.');
    return false;
  }
  if (/^__/.test(hookName)) {
    // eslint-disable-next-line no-console
    console.error('The hook name cannot begin with `__`.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    // eslint-disable-next-line no-console
    console.error('The hook name can only contain numbers, letters, dashes, periods and underscores.');
    return false;
  }
  return true;
}
var _default = exports.default = validateHookName;

},{}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Validate a namespace string.
 *
 * @param {string} namespace The namespace to validate - should take the form
 *                           `vendor/plugin/function`.
 *
 * @return {boolean} Whether the namespace is valid.
 */
function validateNamespace(namespace) {
  if ('string' !== typeof namespace || '' === namespace) {
    // eslint-disable-next-line no-console
    console.error('The namespace must be a non-empty string.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(namespace)) {
    // eslint-disable-next-line no-console
    console.error('The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.');
    return false;
  }
  return true;
}
var _default = exports.default = validateNamespace;

},{}],102:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createI18n = void 0;
var _tannin = _interopRequireDefault(require("tannin"));
/**
 * External dependencies
 */

/**
 * @typedef {Record<string,any>} LocaleData
 */

/**
 * Default locale data to use for Tannin domain when not otherwise provided.
 * Assumes an English plural forms expression.
 *
 * @type {LocaleData}
 */
const DEFAULT_LOCALE_DATA = {
  '': {
    /** @param {number} n */
    plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};

/*
 * Regular expression that matches i18n hooks like `i18n.gettext`, `i18n.ngettext`,
 * `i18n.gettext_domain` or `i18n.ngettext_with_context` or `i18n.has_translation`.
 */
const I18N_HOOK_REGEXP = /^i18n\.(n?gettext|has_translation)(_|$)/;

/**
 * @typedef {(domain?: string) => LocaleData} GetLocaleData
 *
 * Returns locale data by domain in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} SetLocaleData
 *
 * Merges locale data into the Tannin instance by domain. Note that this
 * function will overwrite the domain configuration. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} AddLocaleData
 *
 * Merges locale data into the Tannin instance by domain. Note that this
 * function will also merge the domain configuration. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/**
 * @typedef {(data?: LocaleData, domain?: string) => void} ResetLocaleData
 *
 * Resets all current Tannin instance locale data and sets the specified
 * locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 */
/** @typedef {() => void} SubscribeCallback */
/** @typedef {() => void} UnsubscribeCallback */
/**
 * @typedef {(callback: SubscribeCallback) => UnsubscribeCallback} Subscribe
 *
 * Subscribes to changes of locale data
 */
/**
 * @typedef {(domain?: string) => string} GetFilterDomain
 * Retrieve the domain to use when calling domain-specific filters.
 */
/**
 * @typedef {(text: string, domain?: string) => string} __
 *
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 */
/**
 * @typedef {(text: string, context: string, domain?: string) => string} _x
 *
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 */
/**
 * @typedef {(single: string, plural: string, number: number, domain?: string) => string} _n
 *
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 */
/**
 * @typedef {(single: string, plural: string, number: number, context: string, domain?: string) => string} _nx
 *
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 */
/**
 * @typedef {() => boolean} IsRtl
 *
 * Check if current locale is RTL.
 *
 * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
 * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
 * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
 * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
 */
/**
 * @typedef {(single: string, context?: string, domain?: string) => boolean} HasTranslation
 *
 * Check if there is a translation for a given string in singular form.
 */
/** @typedef {import('@wordpress/hooks').Hooks} Hooks */

/**
 * An i18n instance
 *
 * @typedef I18n
 * @property {GetLocaleData}   getLocaleData   Returns locale data by domain in a Jed-formatted JSON object shape.
 * @property {SetLocaleData}   setLocaleData   Merges locale data into the Tannin instance by domain. Note that this
 *                                             function will overwrite the domain configuration. Accepts data in a
 *                                             Jed-formatted JSON object shape.
 * @property {AddLocaleData}   addLocaleData   Merges locale data into the Tannin instance by domain. Note that this
 *                                             function will also merge the domain configuration. Accepts data in a
 *                                             Jed-formatted JSON object shape.
 * @property {ResetLocaleData} resetLocaleData Resets all current Tannin instance locale data and sets the specified
 *                                             locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 * @property {Subscribe}       subscribe       Subscribes to changes of Tannin locale data.
 * @property {__}              __              Retrieve the translation of text.
 * @property {_x}              _x              Retrieve translated string with gettext context.
 * @property {_n}              _n              Translates and retrieves the singular or plural form based on the supplied
 *                                             number.
 * @property {_nx}             _nx             Translates and retrieves the singular or plural form based on the supplied
 *                                             number, with gettext context.
 * @property {IsRtl}           isRTL           Check if current locale is RTL.
 * @property {HasTranslation}  hasTranslation  Check if there is a translation for a given string.
 */

/**
 * Create an i18n instance
 *
 * @param {LocaleData} [initialData]   Locale data configuration.
 * @param {string}     [initialDomain] Domain for which configuration applies.
 * @param {Hooks}      [hooks]         Hooks implementation.
 *
 * @return {I18n} I18n instance.
 */
const createI18n = (initialData, initialDomain, hooks) => {
  /**
   * The underlying instance of Tannin to which exported functions interface.
   *
   * @type {Tannin}
   */
  const tannin = new _tannin.default({});
  const listeners = new Set();
  const notifyListeners = () => {
    listeners.forEach(listener => listener());
  };

  /**
   * Subscribe to changes of locale data.
   *
   * @param {SubscribeCallback} callback Subscription callback.
   * @return {UnsubscribeCallback} Unsubscribe callback.
   */
  const subscribe = callback => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  /** @type {GetLocaleData} */
  const getLocaleData = (domain = 'default') => tannin.data[domain];

  /**
   * @param {LocaleData} [data]
   * @param {string}     [domain]
   */
  const doSetLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data
    };

    // Populate default domain configuration (supported locale date which omits
    // a plural forms expression).
    tannin.data[domain][''] = {
      ...DEFAULT_LOCALE_DATA[''],
      ...tannin.data[domain]?.['']
    };

    // Clean up cached plural forms functions cache as it might be updated.
    delete tannin.pluralForms[domain];
  };

  /** @type {SetLocaleData} */
  const setLocaleData = (data, domain) => {
    doSetLocaleData(data, domain);
    notifyListeners();
  };

  /** @type {AddLocaleData} */
  const addLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data,
      // Populate default domain configuration (supported locale date which omits
      // a plural forms expression).
      '': {
        ...DEFAULT_LOCALE_DATA[''],
        ...tannin.data[domain]?.[''],
        ...data?.['']
      }
    };

    // Clean up cached plural forms functions cache as it might be updated.
    delete tannin.pluralForms[domain];
    notifyListeners();
  };

  /** @type {ResetLocaleData} */
  const resetLocaleData = (data, domain) => {
    // Reset all current Tannin locale data.
    tannin.data = {};

    // Reset cached plural forms functions cache.
    tannin.pluralForms = {};
    setLocaleData(data, domain);
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
  const dcnpgettext = (domain = 'default', context, single, plural, number) => {
    if (!tannin.data[domain]) {
      // Use `doSetLocaleData` to set silently, without notifying listeners.
      doSetLocaleData(undefined, domain);
    }
    return tannin.dcnpgettext(domain, context, single, plural, number);
  };

  /** @type {GetFilterDomain} */
  const getFilterDomain = (domain = 'default') => domain;

  /** @type {__} */
  const __ = (text, domain) => {
    let translation = dcnpgettext(domain, undefined, text);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters text with its translation.
     *
     * @param {string} translation Translated text.
     * @param {string} text        Text to translate.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.gettext', translation, text, domain);
    return /** @type {string} */ /** @type {*} */hooks.applyFilters('i18n.gettext_' + getFilterDomain(domain), translation, text, domain);
  };

  /** @type {_x} */
  const _x = (text, context, domain) => {
    let translation = dcnpgettext(domain, context, text);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters text with its translation based on context information.
     *
     * @param {string} translation Translated text.
     * @param {string} text        Text to translate.
     * @param {string} context     Context information for the translators.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.gettext_with_context', translation, text, context, domain);
    return /** @type {string} */ /** @type {*} */hooks.applyFilters('i18n.gettext_with_context_' + getFilterDomain(domain), translation, text, context, domain);
  };

  /** @type {_n} */
  const _n = (single, plural, number, domain) => {
    let translation = dcnpgettext(domain, undefined, single, plural, number);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters the singular or plural form of a string.
     *
     * @param {string} translation Translated text.
     * @param {string} single      The text to be used if the number is singular.
     * @param {string} plural      The text to be used if the number is plural.
     * @param {string} number      The number to compare against to use either the singular or plural form.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.ngettext', translation, single, plural, number, domain);
    return /** @type {string} */ /** @type {*} */hooks.applyFilters('i18n.ngettext_' + getFilterDomain(domain), translation, single, plural, number, domain);
  };

  /** @type {_nx} */
  const _nx = (single, plural, number, context, domain) => {
    let translation = dcnpgettext(domain, context, single, plural, number);
    if (!hooks) {
      return translation;
    }

    /**
     * Filters the singular or plural form of a string with gettext context.
     *
     * @param {string} translation Translated text.
     * @param {string} single      The text to be used if the number is singular.
     * @param {string} plural      The text to be used if the number is plural.
     * @param {string} number      The number to compare against to use either the singular or plural form.
     * @param {string} context     Context information for the translators.
     * @param {string} domain      Text domain. Unique identifier for retrieving translated strings.
     */
    translation = /** @type {string} */
    /** @type {*} */hooks.applyFilters('i18n.ngettext_with_context', translation, single, plural, number, context, domain);
    return /** @type {string} */ /** @type {*} */hooks.applyFilters('i18n.ngettext_with_context_' + getFilterDomain(domain), translation, single, plural, number, context, domain);
  };

  /** @type {IsRtl} */
  const isRTL = () => {
    return 'rtl' === _x('ltr', 'text direction');
  };

  /** @type {HasTranslation} */
  const hasTranslation = (single, context, domain) => {
    const key = context ? context + '\u0004' + single : single;
    let result = !!tannin.data?.[domain !== null && domain !== void 0 ? domain : 'default']?.[key];
    if (hooks) {
      /**
       * Filters the presence of a translation in the locale data.
       *
       * @param {boolean} hasTranslation Whether the translation is present or not..
       * @param {string}  single         The singular form of the translated text (used as key in locale data)
       * @param {string}  context        Context information for the translators.
       * @param {string}  domain         Text domain. Unique identifier for retrieving translated strings.
       */
      result = /** @type { boolean } */
      /** @type {*} */hooks.applyFilters('i18n.has_translation', result, single, context, domain);
      result = /** @type { boolean } */
      /** @type {*} */hooks.applyFilters('i18n.has_translation_' + getFilterDomain(domain), result, single, context, domain);
    }
    return result;
  };
  if (initialData) {
    setLocaleData(initialData, initialDomain);
  }
  if (hooks) {
    /**
     * @param {string} hookName
     */
    const onHookAddedOrRemoved = hookName => {
      if (I18N_HOOK_REGEXP.test(hookName)) {
        notifyListeners();
      }
    };
    hooks.addAction('hookAdded', 'core/i18n', onHookAddedOrRemoved);
    hooks.addAction('hookRemoved', 'core/i18n', onHookAddedOrRemoved);
  }
  return {
    getLocaleData,
    setLocaleData,
    addLocaleData,
    resetLocaleData,
    subscribe,
    __,
    _x,
    _n,
    _nx,
    isRTL,
    hasTranslation
  };
};
exports.createI18n = createI18n;

},{"@babel/runtime/helpers/interopRequireDefault":85,"tannin":111}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribe = exports.setLocaleData = exports.resetLocaleData = exports.isRTL = exports.hasTranslation = exports.getLocaleData = exports.default = exports._x = exports._nx = exports._n = exports.__ = void 0;
var _createI18n = require("./create-i18n");
var _hooks = require("@wordpress/hooks");
/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */

const i18n = (0, _createI18n.createI18n)(undefined, undefined, _hooks.defaultHooks);

/**
 * Default, singleton instance of `I18n`.
 */
var _default = exports.default = i18n;
/*
 * Comments in this file are duplicated from ./i18n due to
 * https://github.com/WordPress/gutenberg/pull/20318#issuecomment-590837722
 */
/**
 * @typedef {import('./create-i18n').LocaleData} LocaleData
 * @typedef {import('./create-i18n').SubscribeCallback} SubscribeCallback
 * @typedef {import('./create-i18n').UnsubscribeCallback} UnsubscribeCallback
 */
/**
 * Returns locale data by domain in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {string} [domain] Domain for which to get the data.
 * @return {LocaleData} Locale data.
 */
const getLocaleData = exports.getLocaleData = i18n.getLocaleData.bind(i18n);

/**
 * Merges locale data into the Tannin instance by domain. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */
const setLocaleData = exports.setLocaleData = i18n.setLocaleData.bind(i18n);

/**
 * Resets all current Tannin instance locale data and sets the specified
 * locale data for the domain. Accepts data in a Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */
const resetLocaleData = exports.resetLocaleData = i18n.resetLocaleData.bind(i18n);

/**
 * Subscribes to changes of locale data
 *
 * @param {SubscribeCallback} callback Subscription callback
 * @return {UnsubscribeCallback} Unsubscribe callback
 */
const subscribe = exports.subscribe = i18n.subscribe.bind(i18n);

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
const __ = exports.__ = i18n.__.bind(i18n);

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
const _x = exports._x = i18n._x.bind(i18n);

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
const _n = exports._n = i18n._n.bind(i18n);

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
const _nx = exports._nx = i18n._nx.bind(i18n);

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
const isRTL = exports.isRTL = i18n.isRTL.bind(i18n);

/**
 * Check if there is a translation for a given string (in singular form).
 *
 * @param {string} single    Singular form of the string to look up.
 * @param {string} [context] Context information for the translators.
 * @param {string} [domain]  Domain to retrieve the translated text.
 * @return {boolean} Whether the translation exists or not.
 */
const hasTranslation = exports.hasTranslation = i18n.hasTranslation.bind(i18n);

},{"./create-i18n":102,"@wordpress/hooks":99}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sprintf: true,
  defaultI18n: true,
  setLocaleData: true,
  resetLocaleData: true,
  getLocaleData: true,
  subscribe: true,
  __: true,
  _x: true,
  _n: true,
  _nx: true,
  isRTL: true,
  hasTranslation: true
};
Object.defineProperty(exports, "__", {
  enumerable: true,
  get: function () {
    return _defaultI18n.__;
  }
});
Object.defineProperty(exports, "_n", {
  enumerable: true,
  get: function () {
    return _defaultI18n._n;
  }
});
Object.defineProperty(exports, "_nx", {
  enumerable: true,
  get: function () {
    return _defaultI18n._nx;
  }
});
Object.defineProperty(exports, "_x", {
  enumerable: true,
  get: function () {
    return _defaultI18n._x;
  }
});
Object.defineProperty(exports, "defaultI18n", {
  enumerable: true,
  get: function () {
    return _defaultI18n.default;
  }
});
Object.defineProperty(exports, "getLocaleData", {
  enumerable: true,
  get: function () {
    return _defaultI18n.getLocaleData;
  }
});
Object.defineProperty(exports, "hasTranslation", {
  enumerable: true,
  get: function () {
    return _defaultI18n.hasTranslation;
  }
});
Object.defineProperty(exports, "isRTL", {
  enumerable: true,
  get: function () {
    return _defaultI18n.isRTL;
  }
});
Object.defineProperty(exports, "resetLocaleData", {
  enumerable: true,
  get: function () {
    return _defaultI18n.resetLocaleData;
  }
});
Object.defineProperty(exports, "setLocaleData", {
  enumerable: true,
  get: function () {
    return _defaultI18n.setLocaleData;
  }
});
Object.defineProperty(exports, "sprintf", {
  enumerable: true,
  get: function () {
    return _sprintf.sprintf;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function () {
    return _defaultI18n.subscribe;
  }
});
var _sprintf = require("./sprintf");
var _createI18n = require("./create-i18n");
Object.keys(_createI18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _createI18n[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createI18n[key];
    }
  });
});
var _defaultI18n = _interopRequireWildcard(require("./default-i18n"));
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function (e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return {
    default: e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}

},{"./create-i18n":102,"./default-i18n":103,"./sprintf":105}],105:[function(require,module,exports){
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
const logErrorOnce = (0, _memize.default)(console.error); // eslint-disable-line no-console

/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string} format The format of the string to generate.
 * @param {...*}   args   Arguments to apply to the format.
 *
 * @see https://www.npmjs.com/package/sprintf-js
 *
 * @return {string} The formatted string.
 */
function sprintf(format, ...args) {
  try {
    return _sprintfJs.default.sprintf(format, ...args);
  } catch (error) {
    if (error instanceof Error) {
      logErrorOnce('sprintf error: \n\n' + error.toString());
    }
    return format;
  }
}

},{"@babel/runtime/helpers/interopRequireDefault":85,"memize":108,"sprintf-js":110}],106:[function(require,module,exports){
/*
 * International Telephone Input v17.0.21
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
        var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Ascension Island", "ac", "247" ], [ "Australia", "au", "61", 0 ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Christmas Island", "cx", "61", 2, [ "89164" ] ], [ "Cocos (Keeling) Islands", "cc", "61", 1, [ "89162" ] ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Eswatini", "sz", "268" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "North Macedonia (Северна Македонија)", "mk", "389" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway (Norge)", "no", "47", 0 ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262", 0 ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna (Wallis-et-Futuna)", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
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
        intlTelInputGlobals.version = "17.0.21";
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
},{}],107:[function(require,module,exports){
/**
 * Exposing intl-tel-input as a component
 */
module.exports = require("./build/js/intlTelInput");

},{"./build/js/intlTelInput":106}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memize;
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
 * @template {(...args: any[]) => any} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {((...args: Parameters<F>) => ReturnType<F>) & MemizeMemoizedFunction} Memoized function.
 */
function memize(fn, options) {
  var size = 0;

  /** @type {?MemizeCacheNode|undefined} */
  var head;

  /** @type {?MemizeCacheNode|undefined} */
  var tail;
  options = options || {};
  function memoized(/* ...args */
  ) {
    var node = head,
      len = arguments.length,
      args,
      i;
    searchCache: while (node) {
      // Perform a shallow equality test to confirm that whether the node
      // under test is a candidate for the arguments passed. Two arrays
      // are shallowly equal if their length matches and each entry is
      // strictly equal between the two sets. Avoid abstracting to a
      // function which could incur an arguments leaking deoptimization.

      // Check whether node arguments match arguments length
      if (node.args.length !== arguments.length) {
        node = node.next;
        continue;
      }

      // Check whether node arguments match arguments values
      for (i = 0; i < len; i++) {
        if (node.args[i] !== arguments[i]) {
          node = node.next;
          continue searchCache;
        }
      }

      // At this point we can assume we've found a match

      // Surface matched node to head if not already
      if (node !== head) {
        // As tail, shift to previous. Must only shift if not also
        // head, since if both head and tail, there is no previous.
        if (node === tail) {
          tail = node.prev;
        }

        // Adjust siblings to point to each other. If node was tail,
        // this also handles new tail's empty `next` assignment.
        /** @type {MemizeCacheNode} */
        node.prev.next = node.next;
        if (node.next) {
          node.next.prev = node.prev;
        }
        node.next = head;
        node.prev = null;
        /** @type {MemizeCacheNode} */
        head.prev = node;
        head = node;
      }

      // Return immediately
      return node.val;
    }

    // No cached value found. Continue to insertion phase:

    // Create a copy of arguments (avoid leaking deoptimization)
    args = new Array(len);
    for (i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    node = {
      args: args,
      // Generate the result from original function
      val: fn.apply(null, args)
    };

    // Don't need to check whether node is already head, since it would
    // have been returned above already if it was

    // Shift existing head down list
    if (head) {
      head.prev = node;
      node.next = head;
    } else {
      // If no head, follows that there's no tail (at initial or reset)
      tail = node;
    }

    // Trim tail if we're reached max size and are pending cache insertion
    if (size === /** @type {MemizeOptions} */options.maxSize) {
      tail = /** @type {MemizeCacheNode} */tail.prev;
      /** @type {MemizeCacheNode} */
      tail.next = null;
    } else {
      size++;
    }
    head = node;
    return node.val;
  }
  memoized.clear = function () {
    head = null;
    tail = null;
    size = 0;
  };

  // Ignore reason: There's not a clear solution to create an intersection of
  // the function with additional properties, where the goal is to retain the
  // function signature of the incoming argument and add control properties
  // on the return value.

  // @ts-ignore
  return memoized;
}

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"@tannin/plural-forms":89}],112:[function(require,module,exports){
(function (process){(function (){
/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@popperjs/core');

var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message

var visitedMessages;

if (process.env.NODE_ENV !== "production") {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if (process.env.NODE_ENV !== "production") {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = core.createPopper(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
    /* istanbul ignore else */

    if (process.env.NODE_ENV !== "production") {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== "production") {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if (process.env.NODE_ENV !== "production") {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

var applyStylesModifier = Object.assign({}, core.applyStyles, {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  var _optionalProps$popper;

  if (optionalProps === void 0) {
    optionalProps = {};
  }

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    errorWhen(!Array.isArray(tippyInstances), ['The first argument passed to createSingleton() must be an array of', 'tippy instances. The passed value was', String(tippyInstances)].join(' '));
  }

  var individualInstances = tippyInstances;
  var references = [];
  var triggerTargets = [];
  var currentTarget;
  var overrides = optionalProps.overrides;
  var interceptSetPropsCleanups = [];
  var shownOnCreate = false;

  function setTriggerTargets() {
    triggerTargets = individualInstances.map(function (instance) {
      return normalizeToArray(instance.props.triggerTarget || instance.reference);
    }).reduce(function (acc, item) {
      return acc.concat(item);
    }, []);
  }

  function setReferences() {
    references = individualInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    individualInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  function interceptSetProps(singleton) {
    return individualInstances.map(function (instance) {
      var originalSetProps = instance.setProps;

      instance.setProps = function (props) {
        originalSetProps(props);

        if (instance.reference === currentTarget) {
          singleton.setProps(props);
        }
      };

      return function () {
        instance.setProps = originalSetProps;
      };
    });
  } // have to pass singleton, as it maybe undefined on first call


  function prepareInstance(singleton, target) {
    var index = triggerTargets.indexOf(target); // bail-out

    if (target === currentTarget) {
      return;
    }

    currentTarget = target;
    var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
      acc[prop] = individualInstances[index].props[prop];
      return acc;
    }, {});
    singleton.setProps(Object.assign({}, overrideProps, {
      getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function () {
        var _references$index;

        return (_references$index = references[index]) == null ? void 0 : _references$index.getBoundingClientRect();
      }
    }));
  }

  enableInstances(false);
  setReferences();
  setTriggerTargets();
  var plugin = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onHidden: function onHidden() {
          currentTarget = null;
        },
        onClickOutside: function onClickOutside(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            currentTarget = null;
          }
        },
        onShow: function onShow(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            prepareInstance(instance, references[0]);
          }
        },
        onTrigger: function onTrigger(instance, event) {
          prepareInstance(instance, event.currentTarget);
        }
      };
    }
  };
  var singleton = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [plugin].concat(optionalProps.plugins || []),
    triggerTarget: triggerTargets,
    popperOptions: Object.assign({}, optionalProps.popperOptions, {
      modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [applyStylesModifier])
    })
  }));
  var originalShow = singleton.show;

  singleton.show = function (target) {
    originalShow(); // first time, showOnCreate or programmatic call with no params
    // default to showing first instance

    if (!currentTarget && target == null) {
      return prepareInstance(singleton, references[0]);
    } // triggered from event (do nothing as prepareInstance already called by onTrigger)
    // programmatic call with no params when already visible (do nothing again)


    if (currentTarget && target == null) {
      return;
    } // target is index of instance


    if (typeof target === 'number') {
      return references[target] && prepareInstance(singleton, references[target]);
    } // target is a child tippy instance


    if (individualInstances.indexOf(target) >= 0) {
      var ref = target.reference;
      return prepareInstance(singleton, ref);
    } // target is a ReferenceElement


    if (references.indexOf(target) >= 0) {
      return prepareInstance(singleton, target);
    }
  };

  singleton.showNext = function () {
    var first = references[0];

    if (!currentTarget) {
      return singleton.show(0);
    }

    var index = references.indexOf(currentTarget);
    singleton.show(references[index + 1] || first);
  };

  singleton.showPrevious = function () {
    var last = references[references.length - 1];

    if (!currentTarget) {
      return singleton.show(last);
    }

    var index = references.indexOf(currentTarget);
    var target = references[index - 1] || last;
    singleton.show(target);
  };

  var originalSetProps = singleton.setProps;

  singleton.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  singleton.setInstances = function (nextInstances) {
    enableInstances(true);
    interceptSetPropsCleanups.forEach(function (fn) {
      return fn();
    });
    individualInstances = nextInstances;
    enableInstances(false);
    setReferences();
    setTriggerTargets();
    interceptSetPropsCleanups = interceptSetProps(singleton);
    singleton.setProps({
      triggerTarget: triggerTargets
    });
  };

  interceptSetPropsCleanups = interceptSetProps(singleton);
  return singleton;
};

var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({
    touch: defaultProps.touch
  }, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende;

    // @ts-ignore
    if (!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy)) {
      if (process.env.NODE_ENV !== "production") {
        errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
      }

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var mouseCoords = {
  clientX: 0,
  clientY: 0
};
var activeInstances = [];

function storeMouseCoords(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  mouseCoords = {
    clientX: clientX,
    clientY: clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var isInternalUpdate = false;
    var wasFocusEvent = false;
    var isUnmounted = true;
    var prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          // @ts-ignore - unneeded DOMRect properties
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance: instance,
          doc: doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(function (data) {
        return data.instance !== instance;
      });

      if (activeInstances.filter(function (data) {
        return data.doc === doc;
      }).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,
      onBeforeUpdate: function onBeforeUpdate() {
        prevProps = instance.props;
      },
      onAfterUpdate: function onAfterUpdate(_, _ref2) {
        var followCursor = _ref2.followCursor;

        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },
      onMount: function onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },
      onHidden: function onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }
    };
  }
};

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var triedPlacements = [];
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (triedPlacements.indexOf(state.placement) !== -1) {
            triedPlacements = [];
          }

          if (placement !== state.placement && triedPlacements.indexOf(state.placement) === -1) {
            triedPlacements.push(state.placement);
            instance.setProps({
              // @ts-ignore - unneeded DOMRect properties
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          var index = rects.indexOf(cursorRect);
          cursorRectIndex = index > -1 ? index : cursorRectIndex;
        }
      },
      onHidden: function onHidden() {
        cursorRectIndex = -1;
      }
    };
  }
};
function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});

exports.animateFill = animateFill;
exports.createSingleton = createSingleton;
exports.default = tippy;
exports.delegate = delegate;
exports.followCursor = followCursor;
exports.hideAll = hideAll;
exports.inlinePositioning = inlinePositioning;
exports.roundArrow = ROUND_ARROW;
exports.sticky = sticky;


}).call(this)}).call(this,require('_process'))
},{"@popperjs/core":86,"_process":109}]},{},[1]);
