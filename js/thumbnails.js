import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

function createPictureElement(photo) {
  const pictureElement = pictureTemplate.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  const likes = pictureElement.querySelector('.picture__likes');
  const comments = pictureElement.querySelector('.picture__comments');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  comments.textContent = photo.comments.length;

  return pictureElement;
}

function renderThumbnails(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = createPictureElement(photo);
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.append(pictureElement);
  });

  picturesContainer.append(fragment);
}

export { renderThumbnails };
