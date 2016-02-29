app.module(function(app){
  'use strict';

  riot.route(function(path){
    var page = path.slice(2), pages,
      pageContent,
      pageOverlay;

    var final = function(){
      app.trigger('routeChange', path);
    };

    if (page[0] === '!') {
      app.trigger('redirect', '#/' + page.slice(1));
      return;
    }

    if (page !== '') {
      pages = page.split('/');
      pageContent = pages[0];
      pageOverlay = pages[1];

      if (pageContent && pageContent !== app.state.content) {
        $.get('pages/' + pageContent + '.html')
          .done(function(data){
            app.state.content = pageContent;
            app.trigger('contentShow', pageContent, data);
          })
          .fail(function(){
            console.log('Page load failed: ' + pageContent);
          })
          .always(final);
      }

      if (pageOverlay) {
        if (pageOverlay !== app.state.overlay) {
          $.get('pages/' + pageOverlay + '.html')
            .done(function(data){
              app.state.overlay = pageOverlay;
              app.trigger('overlayShow', pageOverlay, data);
            })
            .fail(function(){
              console.log('Page load failed: ' + pageOverlay);
            })
            .always(final);
        }
      } else {
        app.state.overlay = '';
        app.trigger('overlayHide');
        final();
      }
    } else {
      app.state.content = '';
      app.state.overlay = '';
      app.trigger('startingPage');
      final();
    }
  });

  app.on('redirect', function(path){
    setTimeout(function(){
      riot.route(path);
    }, 0);
  });

});