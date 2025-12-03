import { sendData } from './api.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const fileField = uploadForm.querySelector('.img-upload__input');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

const HASHTAG_REGEX = /^#[a-zа-яё0-9]+$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});

let isFormResetting = false;
let activeMessage = null;
let activeMessageButton = null;

function getHashtagsArray(value) {
  return value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length > 0);
}

function resetFormState() {
  isFormResetting = true;
  uploadForm.reset();
  isFormResetting = false;
  fileField.value = '';
  pristine.reset();
  resetScale();
  resetEffects();
}

function closeMessage() {
  if (!activeMessage) {
    return;
  }

  activeMessage.remove();
  document.removeEventListener('keydown', onMessageDocumentKeydown);
  activeMessage.removeEventListener('click', onMessageClick);

  if (activeMessageButton) {
    activeMessageButton.removeEventListener('click', closeMessage);
  }

  activeMessage = null;
  activeMessageButton = null;
}

function onMessageDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    closeMessage();
  }
}

function onMessageClick(evt) {
  if (evt.target === activeMessage) {
    closeMessage();
  }
}

function showMessage(template) {
  closeMessage();

  activeMessage = template.cloneNode(true);
  activeMessageButton = activeMessage.querySelector('button');

  document.body.append(activeMessage);

  document.addEventListener('keydown', onMessageDocumentKeydown);
  activeMessage.addEventListener('click', onMessageClick);

  if (activeMessageButton) {
    activeMessageButton.addEventListener('click', closeMessage);
  }
}

function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  resetFormState();

  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !activeMessage) {
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

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);

  blockSubmitButton();

  sendData(formData)
    .then(() => {
      closeUploadOverlay();
      showMessage(successTemplate);
    })
    .catch(() => {
      showMessage(errorTemplate);
    })
    .finally(() => {
      unblockSubmitButton();
    });
}

function onFormReset(evt) {
  if (isFormResetting) {
    return;
  }

  evt.preventDefault();
  closeUploadOverlay();
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
  uploadForm.addEventListener('reset', onFormReset);
}

export { initForm };
