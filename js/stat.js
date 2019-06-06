'use strict';

var WINDOW_WIDTH = 420;
var WINDOW_HEIGHT = 270;

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, WINDOW_WIDTH, WINDOW_HEIGHT);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, WINDOW_WIDTH, WINDOW_HEIGHT);

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';

  var lineHeight = 24;
  var successTextStrings = ['Ура вы победили!', 'Список результатов:'];
  var textCoordsX = 120;
  var textCoordY = 40;

  for (var i = 0; i < successTextStrings.length; i++, textCoordY += lineHeight) {
    ctx.fillText(successTextStrings[i], textCoordsX, textCoordY);
  }

  var gistHeight = 150;
  var gistCoordY = textCoordY;
  var columnCoordX = 130;
  var columnWidth = 40;
  var gistGap = 50;
  var highestColumn;

  for (i = 0; i < names.length - 1; i++) {
    var firstTime = Math.round(times[i]);
    var secondTime = Math.round(times[i + 1]);
    highestColumn = (firstTime > secondTime) ? firstTime : secondTime;
  }

  for (i = 0; i < names.length; i++, columnCoordX += columnWidth + gistGap) {
    var time = Math.round(times[i]);
    var name = names[i];
    var columnHeight = gistHeight / highestColumn * time;
    var columnCoordY = gistCoordY + gistHeight - columnHeight;

    var columnSaturation = Math.random();

    var myColor = 'rgba(255, 0, 0, 1)';
    var otherColor = 'rgba(0, 0, 255, ' + columnSaturation + ')';

    ctx.fillStyle = (name === 'Вы') ? myColor : otherColor;
    ctx.fillRect(columnCoordX, columnCoordY, columnWidth, columnHeight);
    ctx.fillStyle = '#000000';

    var timeCoordY = columnCoordY - 10;
    var nameCoordY = gistCoordY + gistHeight + 20;

    ctx.fillText(time, columnCoordX, timeCoordY);
    ctx.fillText(name, columnCoordX, nameCoordY);
  }
};
