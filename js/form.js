import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const fileField = uploadForm.querySelector('.img-upload__input');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');

const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

function getHashtagsArray(value) {
  return value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length > 0);
}


function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.reset();
  fileField.value = '';

  pristine.reset();

  resetScale();
  resetEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadOverlay();
  }
}

function onFileFieldChange() {
  if (fileField.files.length > 0) {
    openUploadOverlay();
  }
}

function onCancelButtonClick(evt) {
  evt.preventDefault();
  closeUploadOverlay();
}

function onFieldKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}


function isHashtagValidFormat(value) {
  if (!value) {
    return true;
  }

  const hashtags = getHashtagsArray(value);

  return hashtags.every((tag) =>
    HASHTAG_REGEX.test(tag) && tag.length <= HASHTAG_MAX_LENGTH
  );
}

function isHashtagCountValid(value) {
  if (!value) {
    return true;
  }

  const hashtags = getHashtagsArray(value);
  return hashtags.length <= HASHTAG_MAX_COUNT;
}

function isHashtagUnique(value) {
  if (!value) {
    return true;
  }

  const hashtags = getHashtagsArray(value).map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
}


function isCommentLengthValid(value) {
  return value.length <= COMMENT_MAX_LENGTH;
}


function onFormSubmit(evt) {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
}


function initForm() {
  fileField.addEventListener('change', onFileFieldChange);
  cancelButton.addEventListener('click', onCancelButtonClick);

  hashtagsField.addEventListener('keydown', onFieldKeydown);
  commentField.addEventListener('keydown', onFieldKeydown);

  pristine.addValidator(
    hashtagsField,
    isHashtagValidFormat,
    'Хэштег должен начинаться с # и содержать только буквы и цифры, максимум 20 символов'
  );

  pristine.addValidator(
    hashtagsField,
    isHashtagCountValid,
    'Нельзя указать больше пяти хэштегов'
  );

  pristine.addValidator(
    hashtagsField,
    isHashtagUnique,
    'Хэштеги не должны повторяться'
  );

  pristine.addValidator(
    commentField,
    isCommentLengthValid,
    'Комментарий не должен быть длиннее 140 символов'
  );

  uploadForm.addEventListener('submit', onFormSubmit);
}

export { initForm };
