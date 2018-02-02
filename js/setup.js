'use strict';
(function () {
  const setup = document.querySelector('.setup');
  const setupSimilar = setup.querySelector('.setup-similar');
  const setupList = setupSimilar.querySelector('.setup-similar-list');
  const wizardTemplate = document.querySelector('#similar-wizard-template').content;
  const names = `
  Иван,
  Хуан Себастьян,
  Мария,
  Кристоф,
  Виктор,
  Юлия,
  Люпита,
  Вашингтон
  `.split(',');
  const surnames = `
  да Марья,
  Верон,
  Мирабелла,
  Вальц,
  Онопко,
  Топольницкая,
  Нионго,
  Ирвинг
  `.split(',');
  const coatsColor = `
  rgb(101, 137, 164),
  rgb(241, 43, 107),
  rgb(146, 100, 161),
  rgb(56, 159, 117),
  rgb(215, 210, 55),
  rgb(0, 0, 0)
  `.match(/rgba?\(.+?\)/g);
  const eyesColor = `
  black,
  red,
  blue,
  yellow,
  green
  `.split(',');
  let wizards = [];
  setup.classList.toggle('hidden', false);
  for (let i = 0; i < 4; i++) {
    wizards.push({
      name: names[generateRandomNumber(0, names.length - 1)] + ' ' + surnames[generateRandomNumber(0, surnames.length - 1)],
      coatColor: coatsColor[generateRandomNumber(0, coatsColor.length - 1)],
      eyeColor: eyesColor[generateRandomNumber(0, eyesColor.length - 1)],
    });
  }
  for (let wizard of wizards) {
    let temp = wizardTemplate.cloneNode(true);
    temp.querySelector('.setup-similar-label').textContent = wizard.name.trim();
    temp.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    temp.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
    setupList.appendChild(temp);
  }
  setupSimilar.classList.toggle('hidden', false);
  function generateRandomNumber(min, max) {
    return Math.floor(min + (Math.random() * max - min + 1));
  }
})();
