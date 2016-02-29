(function(){
  'use strict';

  window.app = riot.observable({
    init: function(arg){
      this.trigger('ready', this.api);
      if ($.isFunction(this.api.init)) {
        this.api.init.call(this, arg);
      }
    },
    module: function(func){
      this.on('ready', func)
    },
    api: riot.observable({
      name: 'Inferno Solutions',
      config: {
        rolloutDelay: 500
      },
      state: {
        content: '',
        overlay: '',
        helper: false
      },
      view: {
        root: $('.page-wrapper'),
        main: $('.page-main'),
        menu: $('.page-menus'),
        submenu: $('.page-menu-secondary'),
        cloak: $('.page-cloak'),
        pagetitle: $('.page-header-title'),
        headerOptions: $('.page-header-options'),
        content: $('.page-content'),
        fixedcontent: $('.page-fixedcontent'),
        overlay: $('.page-overlay'),
        rollout: $('.page-rollout'),
        topmenu: $('.page-topmenu'),
        helper: $('.page-helper'),
        backdropWrapper: $('.page-main-backdrop-wrapper'),
        contentShape: $('.page-content-shape'),
        overlayShape: $('.page-overlay-shape'),
        rolloutShape: $('.page-rollout-shape')
      }
    })
  });

}());