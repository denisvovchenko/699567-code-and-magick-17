'use strict';

var STAT_WIDTH = 420;
var STAT_HEIGHT = 270;

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, STAT_WIDTH, STAT_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, STAT_WIDTH, STAT_HEIGHT);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';

  var successTextStrings = ['Ура вы победили!', 'Список результатов:'];
  var lineHeight = 20;
  var textCoordsX = 120;
  var textCoordY = 40;

  for (var i = 0; i < successTextStrings.length; i++, textCoordY += lineHeight) {
    ctx.fillText(successTextStrings[i], textCoordsX, textCoordY);
  }

  var gistHeight = 150;
  var gistMarginTop = 15;
  var gistCoordY = textCoordY + gistMarginTop;
  var gistGap = 50;

  var timeMarginBottom = 10;
  var nameMarginTop = 20;

  var columnCoordX = 140;
  var columnWidth = 40;
  var highestColumn = times[0];
  var nextTime;

  for (i = 0; i < names.length - 1; i++) {
    nextTime = Math.round(times[i + 1]);
    highestColumn = (highestColumn > nextTime) ? highestColumn : nextTime;
  }

  for (i = 0; i < names.length; i++, columnCoordX += columnWidth + gistGap) {
    var time = Math.round(times[i]);
    var name = names[i];

    var columnHeight = Math.round(gistHeight / highestColumn * time);
    var columnCoordY = gistCoordY + gistHeight - columnHeight;
    var columnSaturation = Math.random() * 100 + '%';

    var myColor = 'rgba(255, 0, 0, 1)';
    var otherPlayerColor = 'hsl(240, ' + columnSaturation + ', 50%)';

    ctx.fillStyle = (name === 'Вы') ? myColor : otherPlayerColor;
    ctx.fillRect(columnCoordX, columnCoordY, columnWidth, columnHeight);

    var timeCoordY = columnCoordY - timeMarginBottom;
    var nameCoordY = gistCoordY + gistHeight + nameMarginTop;

    ctx.fillStyle = '#000000';
    ctx.fillText(time, columnCoordX, timeCoordY);
    ctx.fillText(name, columnCoordX, nameCoordY);
  }
};
