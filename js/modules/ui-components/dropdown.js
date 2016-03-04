app.module(function(app){
  (function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
      // Node/CommonJS
      module.exports = function( root, jQuery ) {
        if ( jQuery === undefined ) {
          // require('jQuery') returns a factory that requires window to
          // build a jQuery instance, we normalize how we use modules
          // that require this pattern but the window provided is a noop
          // if it's defined (how jquery works)
          if ( typeof window !== 'undefined' ) {
            jQuery = require('jquery');
          }
          else {
            jQuery = require('jquery')(root);
          }
        }
        factory(jQuery);
        return jQuery;
      };
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
    'use strict';

    function DropDown(el) {
      this.dd = el;
      this.toggle = this.dd.children('.js-toggle-dd');
      this.placeholder = this.dd.find('.js-toggle-dd-txt');
      this.menu = this.dd.find('.js-dd-items');
      this.opts = this.dd.find('.js-dd-item');
      this.val = '';
      this.index = -1;
      this.initEvents();
    }

    DropDown.prototype = {
      initEvents : function() {
        var obj = this;

        obj.toggle.on('click', function(event){
          obj.menu.toggleClass('dd--is-hidden');
          obj.dd.toggleClass('dd--is-opened');
          event.stopPropagation();
        });

        obj.opts.on('click',function(){
          var opt = $(this);
          if (opt.attr('data-value') !== obj.toggle.attr('data-selected')) {
            obj.menu.find('.dd-item-link--is-selected').removeClass('dd-item-link--is-selected');
            obj.val = opt.html();
            obj.index = opt.index();
            obj.placeholder.html(obj.val);
            obj.toggle.attr('data-selected', opt.attr('data-value'));
            opt.addClass('dd-item-link--is-selected');
          }
          obj.menu.toggleClass('dd--is-hidden');
          obj.dd.toggleClass('dd--is-opened');
        });
      },
      getValue : function() {
        return this.val;
      },
      getIndex : function() {
        return this.index;
      },
      closeDD : function() {
        this.menu.addClass('dd--is-hidden');
        this.dd.removeClass('dd--is-opened');
      }
    }

    window.onclick = function(event) {
      if (!event.target.matches('.js-toggle-dd')) {
        var dropdowns = document.getElementsByClassName('js-dd');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var currentDropdown = dropdowns[i];
          if (currentDropdown.classList.contains('dd--is-opened')) {
            currentDropdown.classList.remove('dd--is-opened');
            currentDropdown.getElementsByClassName('js-dd-items')[0].classList.add('dd--is-hidden');
          }
        }

      }
    }


    $.fn.jqueryDropdown = function () { new DropDown(this); };
  }));
});