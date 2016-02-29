app.module(function(app){
  'use strict';

  var tabsIcons;

  var scrollEvents = function(val){

    /* Hide indicator */
    if (tabsIcons && tabsIcons.length) {
      if (val > 0) {
        tabsIcons.fadeOut(1000);
      } else {
        tabsIcons.fadeIn(1000);
      }
    }
  };

  app.on('contentShow', function(){
    var content = app.view.content;
    tabsIcons = $('.page-tabs-icons');

    scrollEvents(content.scrollTop());
    content.scroll(function(){
      scrollEvents($(this).scrollTop());
    });
  });
});


