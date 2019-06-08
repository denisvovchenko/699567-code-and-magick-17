'use strict';

var STAT = {
  dimensions: {
    x: 100,
    y: 10,
    width: 420,
    height: 270,
  },

  background: '#ffffff',
};

STAT.shadow = {
  dimensions: {
    x: STAT.dimensions.x + 10,
    y: STAT.dimensions.y + 10,
    width: STAT.dimensions.width,
    height: STAT.dimensions.height,
  },

  background: 'rgba(0, 0, 0, 0.7)',
};

STAT.textDimensions = {
  x: STAT.dimensions.x + 20,
  y: STAT.dimensions.y + 40,
};

var TEXT_STYLES = {
  font: '16px PT Mono',
  lineHeight: 20,
  color: '#000000',
};

var SUCCESS_TEXT_STRINGS = ['Ура вы победили!', 'Список результатов:'];

var GIST = {
  dimensions: {
    x: 140,
    y: STAT.dimensions.y + 115,
    height: 150,
  },

  gap: 50,
  timeMarginBottom: 10,
  nameMarginTop: 20,
};

GIST.columnDimensions = {
  x: GIST.dimensions.x,
  width: 40,
};

window.renderStatistics = function (ctx, names, times) {
  paintStatWindow(ctx);

  writeSuccessText(ctx);

  var highestTime = getHighestTime(times);

  for (var i = 0; i < names.length; i++) {
    var columnProps = {
      name: names[i],
      time: Math.round(times[i]),
      highestTime: highestTime,
    };

    paintColumn(ctx, columnProps);

    GIST.columnDimensions.x += GIST.columnDimensions.width + GIST.gap;
  }
};

function paintStatWindow(ctx) {
  ctx.fillStyle = STAT.shadow.background;
  ctx.fillRect(STAT.shadow.dimensions.x, STAT.shadow.dimensions.y, STAT.shadow.dimensions.width, STAT.shadow.dimensions.height);

  ctx.fillStyle = STAT.background;
  ctx.fillRect(STAT.dimensions.x, STAT.dimensions.y, STAT.dimensions.width, STAT.dimensions.height);
}

function writeSuccessText(ctx) {
  ctx.fillStyle = TEXT_STYLES.color;
  ctx.font = TEXT_STYLES.font;

  for (var i = 0; i < SUCCESS_TEXT_STRINGS.length; i++, STAT.textDimensions.y += TEXT_STYLES.lineHeight) {
    ctx.fillText(SUCCESS_TEXT_STRINGS[i], STAT.textDimensions.x, STAT.textDimensions.y);
  }
}

function getHighestTime(times) {
  var highestTime = 0;

  for (var i = 0; i < times.length; i++) {
    var currentTime = Math.round(times[i]);

    highestTime = (highestTime > currentTime) ? highestTime : currentTime;
  }

  return highestTime;
}

function getColumnColor(name) {
  var myColor = 'rgba(255, 0, 0, 1)';
  var columnSaturation = Math.random() * 100 + '%';
  var otherPlayerColor = 'hsl(240, ' + columnSaturation + ', 50%)';

  return (name === 'Вы') ? myColor : otherPlayerColor;
}

function setColumnVerticalDimensions(highestTime, time) {
  GIST.columnDimensions.height = Math.round(GIST.dimensions.height / highestTime * time);
  GIST.columnDimensions.y = GIST.dimensions.y + GIST.dimensions.height - GIST.columnDimensions.height;
}

function paintColumn(ctx, props) {
  var time = props.time;
  var name = props.name;
  var highestTime = props.highestTime;

  ctx.fillStyle = getColumnColor(name);

  setColumnVerticalDimensions(highestTime, time);

  ctx.fillRect(GIST.columnDimensions.x, GIST.columnDimensions.y, GIST.columnDimensions.width, GIST.columnDimensions.height);

  var timeCoordY = GIST.columnDimensions.y - GIST.timeMarginBottom;
  var nameCoordY = GIST.dimensions.y + GIST.dimensions.height + GIST.nameMarginTop;

  ctx.fillStyle = TEXT_STYLES.color;
  ctx.fillText(time, GIST.columnDimensions.x, timeCoordY);
  ctx.fillText(name, GIST.columnDimensions.x, nameCoordY);
}
