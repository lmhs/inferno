app.module(function(app){
  'use strict';

  (function ( $, window, document, undefined ) {
    var pluginName = "infernoContentTabs",
        defaults = {};

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {
          var _this = this;
          this.wrapperElement = $(this.element);
          this.iconControlsElement = this.wrapperElement.find('.page-tabs-icons');
          this.icons = this.iconControlsElement.children();
          this.seqControlNextElement = this.wrapperElement.find('.page-tabs-controls-next');
          this.seqControlPrevElement = this.wrapperElement.find('.page-tabs-controls-prev');
          this.tabsElement = this.wrapperElement.find('.page-tabs');
          this.tabsCount = this.icons.length;
          this.currentTab = 0;

          this.icons.eq(0).addClass('active');

          // setInterval(function(){ 
          //   _this.next.call(_this) 
          // }, 2000);

          this.iconControlsElement.click(function(e){
            var target = $(e.target);
            if (target.parent().hasClass('page-tabs-icons')) {
              _this.goToTab(target.index());
            }
          });

          this.seqControlNextElement.click(this.next.bind(this));
          this.seqControlPrevElement.click(this.previous.bind(this));


        },

        next: function() {
          this.currentTab++;
          this.update();
        },

        previous: function() {
          this.currentTab -= this.currentTab ? 1 : 0;
          this.update();
        },

        goToTab: function(num) {
          this.currentTab = num;
          this.update();
        },

        update: function() {
          var offset;
          this.currentTab %= this.tabsCount;

          if (this.currentTab === 0) {
            offset = 0;
          } else {
            offset = this.currentTab / this.tabsCount * 100;
          }

          this.icons.removeClass("active");
          this.icons.eq(this.currentTab).addClass("active");
          this.tabsElement.css('transform', 'translateX(' + offset*-1 + '%)');
        }
    };

    $.fn[pluginName] = function ( options ) {
      return new Plugin(this, options);
    };

  })( jQuery, window, document );
});