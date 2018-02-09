'use strict';
(function () {
  const setup = document.querySelector('.setup');
  const setupSimilar = setup.querySelector('.setup-similar');
  const setupList = setupSimilar.querySelector('.setup-similar-list');
  const wizardTemplate = document.querySelector('#similar-wizard-template').content;
  const ENTER_KEYCODE = 13;
  const ESC_KEYCODE = 27;
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
  const fireballColor = `
  #ee4830,
  #30a8ee,
  #5ce6c0,
  #e848d5,
  #e6e848
  `.split(',');
  fireballColor.forEach((item, i) => {
    fireballColor[i] = item.trim();
  });
  const generateRandomNumber = (min, max) => Math.floor(min + Math.random() * (max - min + 1));
  //
  // Wizards render
  const wizards = new Set();
  while (wizards.size < 4) {
    wizards.add({
      name: names[generateRandomNumber(0, names.length - 1)] + ' ' + surnames[generateRandomNumber(0, surnames.length - 1)],
      coatColor: coatsColor[generateRandomNumber(0, coatsColor.length - 1)],
      eyeColor: eyesColor[generateRandomNumber(0, eyesColor.length - 1)],
    });
  }
  let fragment = document.createDocumentFragment();
  for (let wizard of wizards) {
    let temp = wizardTemplate.cloneNode(true);
    temp.querySelector('.setup-similar-label').textContent = wizard.name.trim();
    temp.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    temp.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
    fragment.appendChild(temp);
  }
  setupList.appendChild(fragment);
  setupSimilar.classList.toggle('hidden', false);
  //
  // PopUp
  const setupOpen = document.querySelector('.setup-open');
  const setupClose = setup.querySelector('.setup-close');
  const inputWizardName = setup.querySelector('.setup-user-name');
  const setupForm = setup.querySelector('.setup-wizard-form');
  //
  //
  const openPopUp = () => {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', closePopUpEscPress);
  };
  const closePopUp = () => {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', closePopUpEscPress);
  };
  const closePopUpEscPress = (e) => {
    if (e.keyCode === ESC_KEYCODE) {
      closePopUp();
    }
  };
  //
  //
  setupOpen.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      openPopUp();
    }
  });
  setupOpen.addEventListener('click', function () {
    openPopUp();
  });
  setupClose.addEventListener('click', function () {
    closePopUp();
  });
  setupClose.addEventListener('keydown', function (e) {
    if (e.keyCode === ENTER_KEYCODE) {
      closePopUp();
    }
  });
  inputWizardName.addEventListener('focus', function () {
    document.removeEventListener('keydown', closePopUpEscPress);
  });
  inputWizardName.addEventListener('blur', function () {
    document.addEventListener('keydown', closePopUpEscPress);
  });
  inputWizardName.addEventListener('invalid', function () {
    if (inputWizardName.validity.tooShort) {
      inputWizardName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (inputWizardName.validity.tooLong) {
      inputWizardName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else {
      inputWizardName.setCustomValidity('Обязательное поле');
    }
  });
  inputWizardName.addEventListener('input', function () {
    if (inputWizardName.validity.tooShort) {
      inputWizardName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      inputWizardName.setCustomValidity('');
    }
  });
  setupForm.addEventListener('submit', function () {
    closePopUp();
  });
  //
  // Settings of player
  const wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  const wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  const wizardFireball = setup.querySelector('.setup-fireball-wrap');
  //
  //
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = coatsColor[generateRandomNumber(0, coatsColor.length - 1)];
  });
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = eyesColor[generateRandomNumber(0, eyesColor.length - 1)];
  });
  wizardFireball.addEventListener('click', function () {
    wizardFireball.style.backgroundColor = fireballColor[generateRandomNumber(0, fireballColor.length - 1)];
  });
})();
