app.module(function(app){
  'use strict';

  /* Generic actions */
  app.view.root.click(function(e){
    var action = $(e.target).data('action');
    if (action) app.trigger('action.' + action);
  });

  /* Page transitions */
  app.on('contentShow', function(title, data){
    app.view.content.html(data);
    app.view.pagetitle.html(title);
    app.view.root.addClass('show-content');
  });

  app.on('overlayShow', function(title, data){
    app.view.overlay.html(data);
    app.view.root.addClass('show-overlay');
  });

  app.on('contentShow contentHide', function(){
    var ct = app.capitalize(app.state.content), nm = app.name;
    document.title = ct ? (ct + ' • ' + nm) : nm;
  });

  app.on('contentHide', function(){
    app.view.root.removeClass('show-content show-menu');
  });

  app.on('overlayHide', function(){
    var root = app.view.root;
    root.removeClass('show-overlay show-rollout');
    app.view.menu.removeClass('show-submenu');
  });

  app.on('startingPage', function(){
    app.trigger('contentHide');
    app.trigger('overlayHide');
  });

  /* Menu */
  app.on('routeChange', function(route){
    var menu = app.view.menu,
      rootLinks = menu.find('> ul > li > a'),
      subLinks = menu.find('ul ul li a'),
      subMenus = menu.find('ul ul'),
      links = menu.find('a');

    links.removeClass('active');
    subMenus.stop().slideUp(600, 'easeInOutQuad');

    if (route) {
      var activeLink = links.filter('[href="' + route + '"]'),
        containingMenu = activeLink.parent().parent();

      activeLink.addClass('active');

      if (containingMenu[0]) {
        containingMenu.stop().slideDown(600, 'easeInOutQuad');
      }
    }
  });
  app.on('routeChange', function(){ 
    app.view.content.scrollTop(0); 
  });

});

