app.module(function(app){
  'use strict';

  app.updateRatios = function(){
    var bdWrap = app.view.backdropWrapper,
      ctShape = app.view.contentShape,
      olShape = app.view.overlayShape,
      roShape = app.view.rolloutShape,
      roRatio = .45,
      ratio = window.innerHeight / window.innerWidth * 100,
      shapeWidth = ratio / 2,
      shapeSettings = {
        width: shapeWidth + '%',
        left: -shapeWidth + 10.1 + '%'
      },
      roShapeSettings = {
        width: (shapeWidth / roRatio) + '%'
      };

    bdWrap.width(ratio + '%');
    ctShape.css(shapeSettings);
    olShape.css(shapeSettings);
    roShape.css(roShapeSettings);
  };

});