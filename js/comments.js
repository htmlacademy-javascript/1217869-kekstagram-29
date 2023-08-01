const ADD_COUNT_COMMENT = 5;
let photoDefault = {comments:''};

const countAdd = (count) => {
  const countListComment = Number(document.querySelector('.comments-count').innerHTML);

  if (count + ADD_COUNT_COMMENT < countListComment) {
    return count + ADD_COUNT_COMMENT;
  }

  document.querySelector('.comments-loader').classList.add('hidden');
  return countListComment;
};

const renderComments = () => {
  const listComments = photoDefault.comments;
  const countListComments = Number(document.querySelector('.comments-count').innerHTML);
  const socialComments = document.querySelector('.social__comments');
  const count = countAdd(socialComments.children.length);
  socialComments.innerHTML = '';

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

const onCommentsLoaderClick = () => renderComments();

const renderComment = (photo) => {
  photoDefault = photo;
  onCommentsLoaderClick();
  const loader = document.querySelector('.comments-loader');
  loader.removeEventListener('click', onCommentsLoaderClick);
  loader.addEventListener('click', onCommentsLoaderClick);
};

export {renderComment};
