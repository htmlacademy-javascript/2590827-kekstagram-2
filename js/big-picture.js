const bigPicture = document.querySelector('.big-picture');
const body = document.body;

const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');

const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');

const commentsList = bigPicture.querySelector('.social__comments');
const descriptionElement = bigPicture.querySelector('.social__caption');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

function renderComments(comments) {
  commentsList.innerHTML = '';

  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = comment.message;

    li.append(img);
    li.append(text);

    fragment.append(li);
  });

  commentsList.append(fragment);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function openBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigImage.src = photo.url;
  bigImage.alt = photo.description;

  likesCount.textContent = photo.likes;

  const comments = photo.comments;

  commentTotalCount.textContent = comments.length;
  commentShownCount.textContent = comments.length;

  descriptionElement.textContent = photo.description;

  renderComments(comments);

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeBigPicture);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
}

export { openBigPicture };
