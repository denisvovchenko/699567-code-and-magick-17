'use strict';

function showCharacterWindow() {
  var characterWindow = document.querySelector('.setup');

  characterWindow.classList.remove('hidden');
}

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

// variables and constants

var CHARACTERS_LENGTH = 4;
var CHARACTERS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var CHARACTERS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var CHARACTERS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var CHARACTERS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

//

showCharacterWindow();

renderSimilarCharacters();
