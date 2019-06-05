'use strict';

var WINDOW_WIDTH = 420;
var WINDOW_HEIGHT = 270;
var TEXT__COORD_X = 120;

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, WINDOW_WIDTH, WINDOW_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, WINDOW_WIDTH, WINDOW_HEIGHT);

  ctx.fillStyle = '#000000';
  ctx.font = 'normal 16px PT Mono';

  var lineHeight = 24;
  var successTextStrings = ['Ура вы победили!', 'Список результатов:'];

  for (var i = 0, textCoordY = 40; i < successTextStrings.length; i++, textCoordY += lineHeight) {
    ctx.fillText(successTextStrings[i], TEXT__COORD_X, textCoordY);
  }
};
