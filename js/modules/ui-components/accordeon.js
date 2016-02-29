app.module(function(app){
  'use strict';

  (function ( $, window, document, undefined ) {
    var pluginName = "infernoAccordeon",
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
          this.questions = this.wrapperElement.find('.page-question');
          this.currentQuestion = this.questions.eq(1);

          this.update();

          this.questions.click(function(e){
            if (_this.currentQuestion[0] != this) {
              _this.currentQuestion = $(this);
              _this.update();
            }
          });

        },

        update: function() {
          this.questions.removeClass('expanded');
          this.questions.find('.page-question-body').slideUp(300, 'easeInOutQuad');

          this.currentQuestion.addClass('expanded');
          this.currentQuestion.find('.page-question-body').slideDown(300, 'easeInOutQuad');
        }

    };

    $.fn[pluginName] = function ( options ) {
      return new Plugin(this, options);
    };

  })( jQuery, window, document );
});