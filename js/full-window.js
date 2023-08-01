const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img img');

const close = () => {
  if (bigPicture.classList.contains('hidden')) {
    return;
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.querySelector('.comments-loader').classList.remove('hidden');
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    close();
  }
});

const showFullWindowImg = (photo) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = photo.url;
  bigPictureImg.id = photo.id;
  const likeCount = document.querySelector('.likes-count');
  likeCount.textContent = photo.likes;
  const commentCount = document.querySelector('.comments-count');
  commentCount.textContent = photo.comments.length;
  const description = document.querySelector('.social__caption');
  description.textContent = photo.description;
  const socialComments = document.querySelector('.social__comments');
  socialComments.textContent = '';
  document.body.classList.add('modal-open');
};

bigPictureClose.addEventListener('click', () => close());

const closeImg = document.querySelector('.big-picture');
closeImg.addEventListener('click', (evt) => {
  if (evt.target === closeImg) {
    close();
  }
});

export {showFullWindowImg};
