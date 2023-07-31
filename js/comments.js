let photoDefault = {comments:''};

const countAdd = (count) => {
  const countListComment = Number(document.querySelector('.comments-count').textContent);

  if (count + 5 < countListComment) {
    return count + 5;
  }

  document.querySelector('.comments-loader').classList.add('hidden');
  return countListComment;
};

const renderComments = () => {
  const listComments = photoDefault.comments;
  const countListComments = Number(document.querySelector('.comments-count').textContent);
  const socialComments = document.querySelector('.social__comments');
  const count = countAdd(socialComments.children.length);
  socialComments.innerHTML = '';

  //заголовок перед комментами
  const countTitle = document.querySelector('.social__comment-count');
  countTitle.innerHTML = `${count} из <span class="comments-count">${countListComments}</span> комментариев`;

  for (let i = 0; i < count; i++) {
    const comment = listComments[i];
    const li = document.createElement('li');
    li.classList.add('social__comment');
    li.innerHTML = `<img
        class="social__picture"
        src=${comment.avatar}
        alt=${comment.name}
        width="35" height="35">
    <p class="social__text">${comment.message}</p>`;
    socialComments.appendChild(li);
  }
};

const renderComment = (photo) => {
  //дозагрузка комментов
  photoDefault = photo;
  renderComments();
  const loader = document.querySelector('.comments-loader');
  loader.removeEventListener('click', renderComments);
  loader.addEventListener('click', renderComments);
};

export {renderComment};
