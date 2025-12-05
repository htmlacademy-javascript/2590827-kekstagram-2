const uploadForm = document.querySelector('.img-upload__form');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');
const effectLevelContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectLevelSlider = uploadForm.querySelector('.effect-level__slider');
const effectLevelField = uploadForm.querySelector('.effect-level__value');

const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    getStyle: () => 'none',
  },
  chrome: {
    name: 'chrome',
    min: 0,
    max: 1,
    step: 0.1,
    getStyle: (value) => `grayscale(${value})`,
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    getStyle: (value) => `sepia(${value})`,
  },
  marvin: {
    name: 'marvin',
    min: 0,
    max: 100,
    step: 1,
    getStyle: (value) => `invert(${value}%)`,
  },
  phobos: {
    name: 'phobos',
    min: 0,
    max: 3,
    step: 0.1,
    getStyle: (value) => `blur(${value}px)`,
  },
  heat: {
    name: 'heat',
    min: 1,
    max: 3,
    step: 0.1,
    getStyle: (value) => `brightness(${value})`,
  },
};

let currentEffect = EFFECTS.none;

function updateSliderSettings(effect) {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
}

function applyEffect(value) {
  const numericValue = parseFloat(value);

  effectLevelField.value = numericValue;

  if (currentEffect.name === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  imagePreview.style.filter = currentEffect.getStyle(numericValue);
}

function onSliderUpdate(values) {
  const value = values[0];
  applyEffect(value);
}

function onEffectsListChange(evt) {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  if (currentEffect.name === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    effectLevelField.value = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    updateSliderSettings(currentEffect);
    effectLevelSlider.noUiSlider.set(currentEffect.max);
  }
}

function resetEffects() {
  currentEffect = EFFECTS.none;
  imagePreview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
  effectLevelField.value = '';
}

function initEffects() {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS.chrome.min,
      max: EFFECTS.chrome.max,
    },
    start: EFFECTS.chrome.max,
    step: EFFECTS.chrome.step,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);
  resetEffects();
  effectsList.addEventListener('change', onEffectsListChange);
}

export { initEffects, resetEffects };
