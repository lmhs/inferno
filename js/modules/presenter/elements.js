app.module(function(app){
  'use strict';

  /* Dynamic topmenu */
    app.on('contentShow', function(title, data){
      var topMenu = $(data).filter('#is-topmenu');
      if (topMenu.length) {
        app.view.topmenu.html(topMenu.html());
        app.view.root.addClass('show-menu');
      } else {
        app.view.root.removeClass('show-menu');
      }
    });

    /* Dynamic fixed content */
    app.on('contentShow', function(title, data){
      var fixedContent = $(data).filter('#is-fixedcontent');
      if (fixedContent.length) {
        app.view.fixedcontent.html(fixedContent.html());
      } else {
        app.view.fixedcontent.html('');
      }
    });

    /* Dynamic submenu */
    app.on('overlayShow', function(title, data){
      var subMenu = $(data).filter('#is-submenu');
      if (subMenu.length) {
        app.view.submenu.html(subMenu.html());
        app.view.menu.addClass('show-submenu');
      }
    });

    /* Dynamic rollout */
    app.on('overlayShow', function(title, data){
      var rollout = $(data).filter('#is-rollout'), html;
      if (rollout.length) {
        html = rollout.html();
        app.view.rollout.html(html);
        // app.view.rolloutShape = app.view.rollout.find('.page-rollout-shape');
        app.updateRatios();
        app.view.headerOptions.removeClass('dark');
        setTimeout(function(){
          app.view.root.addClass('show-rollout');
        }, app.config.rolloutDelay);
      }
    });

    /* Header options */
    app.on('contentShow overlayHide', function(){
      app.view.headerOptions.addClass('dark');
    });

    app.on('contentHide', function(){
      app.view.headerOptions.removeClass('dark');
    });

});