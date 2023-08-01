import {showFullWindowImg} from './full-window.js';
import {renderComment} from './comments.js';

const createPhotos = (allPhotos) => {
  const fragment = new DocumentFragment();

  for (const photo of allPhotos) {
    const picture = document.querySelector('#picture').content.cloneNode(true);
    const img = picture.querySelector('.picture__img');

    img.src = photo.url;
    img.alt = photo.description;
    img.id = photo.id;

    const likeCount = picture.querySelector('.picture__likes');
    likeCount.textContent = photo.likes;

    const commentCount = picture.querySelector('.picture__comments');
    commentCount.textContent = photo.comments.length;

    fragment.append(picture);
  }

  const pictureContainer = document.querySelector('.pictures');
  pictureContainer.append(fragment);

  const pictures = pictureContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    const img = picture.querySelector('.picture__img');
    const photo = allPhotos.filter((p) => Number(p.id) === Number(img.id))[0];

    const onPictureClick = () => {
      showFullWindowImg(photo);
      renderComment(photo);
    };

    picture.addEventListener('click', onPictureClick);
  });
};

const deletePhotos = () => {
  const pictureContainer = document.querySelector('.pictures');
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    pictureContainer.removeChild(picture);
  });
};

export {createPhotos, deletePhotos};
