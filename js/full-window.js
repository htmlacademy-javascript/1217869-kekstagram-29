const countAdd = (element) => {
  const countListComment = Number(document.querySelector('.comments-count').textContent);
  const count = element.children.length;

  if (count + 5 < countListComment) {
    return count + 5;
  }
  document.querySelector('.comments-loader').classList.add('hidden');
  return countListComment;
};

const renderComment = (allPhotos, picture) => {
  const listComment = allPhotos.filter(({id}) => String(id) === picture.querySelector('.picture__img').id)[0].comments;
  const countListComment = Number(document.querySelector('.comments-count').textContent);
  const socialComment = document.querySelector('.social__comments');
  const count = countAdd(socialComment);
  socialComment.innerHTML = '';

  //заголовок перед комментами
  const countTitle = document.querySelector('.social__comment-count');
  countTitle.innerHTML = `
    ${count} из <span class="comments-count">${countListComment}</span> комментариев
  `;

  for (let i = 0; i < count; i++) {
    const comment = listComment[i];
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `
    <img
        class="social__picture"
        src=${comment.avatar}
        alt=${comment.name}
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
    `;
    socialComment.appendChild(li);
  }
};

const close = () => {
  const bigPicture = document.querySelector('.big-picture');
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

const showFullWindowImg = (AllPhotos) => {
  const pictures = document.querySelectorAll('.picture');
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  pictures.forEach((picture) => picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    const bigPictureImg = document.querySelector('.big-picture__img img');
    bigPictureImg.src = picture.querySelector('.picture__img').src;
    bigPictureImg.id = picture.querySelector('.picture__img').id;
    const likeCount = document.querySelector('.likes-count');
    likeCount.textContent = picture.querySelector('.picture__likes').textContent;
    const commentCount = document.querySelector('.comments-count');
    commentCount.textContent = picture.querySelector('.picture__comments').textContent;
    const description = document.querySelector('.social__caption');
    description.textContent = picture.querySelector('.picture__img').alt;
    const socialComment = document.querySelector('.social__comments');
    socialComment.innerHTML = '';

    renderComment(AllPhotos, picture);
    //закрываем окно счетчика и прокрутку окна body
    document.body.classList.add('modal-open');
  }));
  bigPictureClose.addEventListener('click', () => close());

  //скрытие отображение картинки по клику на пустую область
  const closeImg = document.querySelector('.big-picture');
  closeImg.addEventListener('click', (evt) => {
    if (evt.target === closeImg) {
      close();
    }
  });

  //дозагрузка картинок
  const loader = document.querySelector('.comments-loader');
  loader.addEventListener('click', () => {
    const bigPictureImg = document.querySelector('.big-picture__img img');
    const picture = Array.prototype.filter.call(pictures, (pic) => pic.querySelector('.picture__img').id === bigPictureImg.id)[0];
    renderComment(AllPhotos, picture);
  });
};

export {showFullWindowImg};
