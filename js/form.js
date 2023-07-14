//скрытие отображение картинки
const close = () => {
  const changeImg = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const file = document.querySelector('#upload-file');
  if (changeImg.classList.contains('hidden')) {
    return;
  }

  changeImg.classList.add('hidden');
  document.body.classList.remove('modal-open');
  file.value = '';
  form.querySelector('.text__hashtags').value = '';
  form.querySelector('.text__description').value = '';
};

//скрытие отображение картинки по клику на пустую область
const closeImg = document.querySelector('.img-upload__overlay');
closeImg.addEventListener('click', (evt) => {
  if (evt.target === closeImg) {
    close();
  }
});

//скрытие отображение картинки по клику на крестик
const closeButton = document.querySelector('#upload-cancel');
closeButton.addEventListener('click', () => {
  close();
});

//скрытие отображения картинки по Esc
document.addEventListener('keydown', (evt) => {
  const form = document.querySelector('.img-upload__form');
  const noFocus = (form.querySelector('.text__hashtags') !== document.activeElement) && (form.querySelector('.text__description') !== document.activeElement);

  if ((evt.key === 'Escape') && (noFocus)) {
    evt.preventDefault();
    close();
  }
});

//добавляем аттрибуты форме
const validateForm = () => {
  const form = document.querySelector('.img-upload__form');

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'error-validate'
  });

  const validateHashTag = (value) => /^#[a-zа-яё0-9]{1,20}$/i.test(value);

  const validateHashTagBlank = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    return countErrorHashTag.length === 0;
  };

  const validateHashTagCount = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    return words.length <= 5;
  };

  const validateHashTagRepeat = () => {
    const input = form.querySelector('.text__hashtags').value;
    const words = input.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const repeatWords = new Set(words);
    return words.length === repeatWords.size;
  };

  const validateComments = () => {
    const input = form.querySelector('.text__description').value;
    return input.length <= 140;
  };

  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagBlank, 'недопустипый хэштег');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagCount, 'хэштегов больше 5');
  pristine.addValidator(form.querySelector('.text__hashtags'), validateHashTagRepeat, 'есть повторяющиеся хэштеги');
  pristine.addValidator(form.querySelector('.text__description'), validateComments, 'комментариев больше 140');

  form.addEventListener('submit', (evt) => {
    if (pristine.validate()) {
      evt.preventDefault();
      close();
      return;
    }
    evt.preventDefault();
  });
};

const loadFormImg = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
    //отобразим картинку
    const changeImg = document.querySelector('.img-upload__overlay');
    changeImg.classList.remove('hidden');
    document.body.classList.add('modal-open');

    const image = document.querySelector('.img-upload__preview img');
    image.src = URL.createObjectURL(file.files[0]);
    const effectImgs = document.querySelectorAll('.effects__preview');
    effectImgs.forEach((img) => {
      img.style.backgroundImage = `url(${image.src})`;
    });
  });
};

export {validateForm, loadFormImg};
