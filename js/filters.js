import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterRandomButton = imgFilters.querySelector('#filter-random');
const filterDiscussedButton = imgFilters.querySelector('#filter-discussed');

let originalPhotos = [];

function getRandomPhotos(photos) {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
}

function getDiscussedPhotos(photos) {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

function setActiveButton(button) {
  const current = imgFilters.querySelector('.img-filters__button--active');

  if (current) {
    current.classList.remove('img-filters__button--active');
  }

  button.classList.add('img-filters__button--active');
}

const debouncedRender = debounce((photos) => {
  renderThumbnails(photos);
}, 500);

function applyFilter(button) {
  setActiveButton(button);

  let result = originalPhotos;

  if (button === filterRandomButton) {
    result = getRandomPhotos(originalPhotos);
  } else if (button === filterDiscussedButton) {
    result = getDiscussedPhotos(originalPhotos);
  }

  debouncedRender(result);
}

function onFiltersClick(evt) {
  const button = evt.target.closest('.img-filters__button');

  if (!button || button.classList.contains('img-filters__button--active')) {
    return;
  }

  applyFilter(button);
}

function initFilters(photos) {
  originalPhotos = photos.slice();
  imgFilters.classList.remove('img-filters--inactive');
  imgFilters.addEventListener('click', onFiltersClick);
}

export { initFilters };
