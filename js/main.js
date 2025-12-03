import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initForm } from './form.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { initFilters } from './filters.js';

const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const messageElement = template.cloneNode(true);

  document.body.append(messageElement);
  setTimeout(() => messageElement.remove(), 5000);
};

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initFilters(photos);
  })
  .catch(showDataError);

initForm();
initScale();
initEffects();
