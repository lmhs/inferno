app.module(function(app){
  'use strict';

  (function ( $, window, document, undefined ) {
    var pluginName = "infernoSlider",
        defaults = {
            delay: 3000
        };

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
          this.controlsElement = $('<div class="page-slider-controls"></div>');
          this.slides = this.wrapperElement.find('.page-slide');
          this.slidesCount = this.slides.length;
          this.currentSlide = 0;

          this.controlsElement.appendTo(this.wrapperElement);

          this.slides.each(function(i, el){
            var el = $(el);
            el.css('background-image', 'url(' + el.data('img') + ')');
            _this.controlsElement.append($('<span class="page-slider-control">/</span>'));
          });

          this.slides.eq(0).addClass('active');
          this.controlsElement.children().eq(0).addClass('active');

          this.controlsElement.click(function(e){
            if (e.target.className === 'page-slider-control') {
              _this.goToSlide($(e.target).index());
            }
          });

          this.startLoop();
        },

        next: function() {
          this.currentSlide++;
          this.update();
        },

        goToSlide: function(num) {
          this.currentSlide = num;
          this.update();
          this.startLoop();
        },

        stopLoop: function(){
          if (this.loop != null) clearInterval(this.loop);
        },

        startLoop: function(){
          if (this.loop != null) clearInterval(this.loop);
          this.loop = setInterval(this.next.bind(this), this.options.delay);
        },

        update: function() {
          this.currentSlide %= this.slidesCount;

          this.slides.removeClass("active");
          this.slides.eq(this.currentSlide).addClass("active");

          this.controlsElement.children().removeClass("active");
          this.controlsElement.children().eq(this.currentSlide).addClass("active");
        }
    };

    $.fn[pluginName] = function ( options ) {
      return new Plugin(this, options);
    };

  })( jQuery, window, document );
});