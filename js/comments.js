const ADD_COUNT_COMMENT = 5;

const socialComment = document.querySelector('#social__comment');
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
    const li = socialComment.content.cloneNode(true);
    const img = li.querySelector('.social__picture');
    const p = li.querySelector('.social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    p.textContent = comment.message;
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
