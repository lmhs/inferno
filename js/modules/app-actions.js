app.module(function(app){
  'use strict';

  app.on('action.back', function(){
    if (app.state.overlay) {
      location.hash = '#/' + app.state.content;
    } else if (app.state.content) {
      location.hash = '#/';
    }
  });

  app.on('action.helperOpen', function(){
    app.state.helper = true;
    app.view.helper.addClass('opened');
  });

  app.on('action.helperClose', function(){
    app.state.helper = false;
    app.view.helper.removeClass('opened');
  });

});