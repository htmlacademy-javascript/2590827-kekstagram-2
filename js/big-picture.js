const COMMENTS_PER_PORTION = 5;

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

let allComments = [];
let renderedCommentsCount = 0;

function createCommentElement(comment) {
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

  return li;
}

function renderNextCommentsPortion() {
  const nextRenderedCount = Math.min(
    renderedCommentsCount + COMMENTS_PER_PORTION,
    allComments.length
  );

  const fragment = document.createDocumentFragment();

  const commentsToRender = allComments.slice(renderedCommentsCount, nextRenderedCount);

  commentsToRender.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  });

  commentsList.append(fragment);

  renderedCommentsCount = nextRenderedCount;
  commentShownCount.textContent = renderedCommentsCount;

  if (renderedCommentsCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function onCommentsLoaderClick() {
  renderNextCommentsPortion();
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

  descriptionElement.textContent = photo.description;

  allComments = photo.comments;
  renderedCommentsCount = 0;

  commentsList.innerHTML = '';

  commentTotalCount.textContent = allComments.length;

  commentCountBlock.classList.remove('hidden');

  if (allComments.length === 0) {
    commentShownCount.textContent = 0;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    renderNextCommentsPortion();
  }

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeBigPicture);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
}

export { openBigPicture };
