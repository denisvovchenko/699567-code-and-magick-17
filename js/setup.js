'use strict';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCharacterName() {
  var randomName = CHARACTERS_NAMES[getRandomNumber(0, CHARACTERS_NAMES.length - 1)];
  var randomSurname = CHARACTERS_SURNAMES[getRandomNumber(0, CHARACTERS_SURNAMES.length - 1)];

  return randomName + ' ' + randomSurname;
}

function createCharacter() {
  return {
    name: createCharacterName(),
    coatColor: CHARACTERS_COAT_COLORS[getRandomNumber(0, CHARACTERS_COAT_COLORS.length - 1)],
    eyesColor: CHARACTERS_EYES_COLORS[getRandomNumber(0, CHARACTERS_EYES_COLORS.length - 1)],
  };
}

function createWizard(wizard, character) {
  var wizardName = wizard.querySelector('.setup-similar-label');
  wizardName.textContent = character.name;

  var wizardCoat = wizard.querySelector('.wizard-coat');
  wizardCoat.setAttribute('fill', character.coatColor);

  var wizardEyes = wizard.querySelector('.wizard-eyes');
  wizardEyes.setAttribute('fill', character.eyesColor);

  return wizard;
}

function renderSimilarCharacters() {
  var fragmentWithWizards = document.createDocumentFragment();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                      .content
                                      .querySelector('.setup-similar-item');
  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarWizardsList = similarWizardsBlock.querySelector('.setup-similar-list');

  for (var i = 0; i < CHARACTERS_LENGTH; i++) {
    var similarWizard = similarWizardTemplate.cloneNode(true);

    fragmentWithWizards.appendChild(createWizard(similarWizard, createCharacter()));
  }

  similarWizardsList.appendChild(fragmentWithWizards);
  similarWizardsBlock.classList.remove('hidden');
}

function isEscapeKey(evt) {
  return evt.keyCode === 27;
}

function isEnterKey(evt) {
  return evt.keyCode === 13;
}

function isUserNameInFocus() {
  return document.querySelector('.setup-user-name:focus');
}

function onEscKeyDown(evt) {
  if (isEscapeKey(evt) && !isUserNameInFocus()) {
    characterPopup.close();
  }
}

function setCharacterWindowOpening() {
  characterPopup.openBtn.addEventListener('click', function () {
    characterPopup.open();

    document.addEventListener('keydown', onEscKeyDown);
  });

  characterPopup.openBtnIcon.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      characterPopup.open();

      document.addEventListener('keydown', onEscKeyDown);
    }
  });

  characterPopup.closeBtn.addEventListener('click', characterPopup.close);
  characterPopup.closeBtn.addEventListener('keydown', function (evt) {
    if (isEnterKey(evt)) {
      characterPopup.close();
    }
  });
}

function CharacterPopup() {
  this.window = document.querySelector('.setup');
  this.openBtn = document.querySelector('.setup-open');
  this.openBtnIcon = this.openBtn.querySelector('.setup-open-icon');
  this.closeBtn = this.window.querySelector('.setup-close');
  this.nameInput = this.window.querySelector('.setup-user-name');

  var self = this;

  this.open = function () {
    self.window.classList.remove('hidden');
  };

  this.close = function () {
    self.window.classList.add('hidden');

    document.removeEventListener('keydown', onEscKeyDown);
  };

  this.changeCoatColor = function () {

  };

  this.changeEyesColor = function () {

  };

  this.changeFireballColor = function () {

  };
}

function getCurrentColorIndex(color, colorsList) {
  return colorsList.indexOf(color);
}


function PlayerWizard() {
  var self = this;
  var appearence = document.querySelector('.setup-player');

  var setInitialColor = function (element) {
    if (element === self.fireball) {
      element.setAttribute('style', 'background: ' + element.currentColor);

    } else {
      element.setAttribute('style', 'background: ' + element.currentColor);
    }
  };

  this.eyes = appearence.querySelector('.wizard-eyes');
  this.eyes.currentColor = appearence.querySelector('input[name="eyes-color"]').value;

  this.coat = appearence.querySelector('.wizard-coat');
  this.coat.currentColor = appearence.querySelector('input[name="coat-color"]').value;

  this.fireball = appearence.querySelector('.setup-fireball-wrap');
  this.fireball.currentColor = appearence.querySelector('input[name="fireball-color"]').value;

  var changebleElements = [
    this.eyes,
    this.coat,
    this.fireball,
  ];

  changebleElements.forEach(function (changebleElement) {
    setInitialColor(changebleElement);
  });

  var changeAppearenceElementColor = function (element, colorsList) {
    var currentColorIndex = getCurrentColorIndex(element.currentColor, colorsList);
    var nextColor = colorsList[currentColorIndex + 1] || colorsList[0];

    if (element === self.fireball) {
      element.setAttribute('style', 'background: ' + nextColor);
    } else {
      element.setAttribute('style', 'fill: ' + nextColor);
    }

    element.currentColor = nextColor;
  };

  this.changeEyesColor = function () {
    changeAppearenceElementColor(this.eyes, CHARACTERS_EYES_COLORS);
  };

  this.changeCoatColor = function () {
    changeAppearenceElementColor(this.coat, CHARACTERS_COAT_COLORS);
  };

  this.changeFireballColor = function () {
    changeAppearenceElementColor(this.fireball, CHARACTER_FIREBALL_COLORS);
  };
}

function changeWizardElementsColor() {
  player.eyes.addEventListener('click', function () {
    player.changeEyesColor();
  });

  player.coat.addEventListener('click', function () {
    player.changeCoatColor();
  });

  player.fireball.addEventListener('click', function () {
    player.changeFireballColor();
  });
}

// variables and constants

var CHARACTERS_LENGTH = 4;

var CHARACTERS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var CHARACTERS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var CHARACTERS_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var CHARACTERS_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var CHARACTER_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

var characterPopup = new CharacterPopup();
var player = new PlayerWizard();

//

setCharacterWindowOpening();

renderSimilarCharacters();

changeWizardElementsColor();
