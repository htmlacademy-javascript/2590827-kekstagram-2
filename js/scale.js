
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const uploadForm = document.querySelector('.img-upload__form');
const smallerButton = uploadForm.querySelector('.scale__control--smaller');
const biggerButton = uploadForm.querySelector('.scale__control--bigger');
const scaleValueField = uploadForm.querySelector('.scale__control--value');
const imagePreview = uploadForm.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

function applyScale(value) {
  scaleValueField.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
}

function onSmallerButtonClick() {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    applyScale(currentScale);
  }
}

function onBiggerButtonClick() {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    applyScale(currentScale);
  }
}

function resetScale() {
  currentScale = SCALE_DEFAULT;
  applyScale(currentScale);
}

function initScale() {
  resetScale();

  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
}

export { initScale, resetScale };
