app.module(function(app){
  'use strict';

  app.init = function(){

    /* Decloak */
    var delay = location.hash.slice(2) ? 600 : 100
    setTimeout(function(){
      app.view.cloak.fadeOut(2000);
    }, delay);

    /* Initialize Inferno Slider */
    app.infernoSlider = $('.page-slider').infernoSlider();

    app.on('contentShow', function(){
      app.infernoSlider.stopLoop();
    });

    app.on('contentHide', function(){
      app.infernoSlider.startLoop();
    });

    /* Update ratios */
    app.updateRatios();
    $(window).resize(app.updateRatios);

    console.log('App initialized.');

  };
});