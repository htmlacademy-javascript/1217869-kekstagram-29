import {sendData} from './data.js';
import {showSlider, getSettingsSlider} from './slider.js';

const COUNT_HASHTAGS_VALIDATE = 5;
const COUNT_WORDS_COMMENT_VALIDATE = 140;
const ZOOM_VALUE_LIMIT = 25;
const ZOOM_VALUE_LOWER_LIMIT = 25;
const ZOOM_VALUE_UPPER_LIMIT = 100;

const form = document.querySelector('.img-upload__form');
const buttonSubmit = document.querySelector('.img-upload__submit');
const image = document.querySelector('.img-upload__preview img');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error-validate'
});

const close = () => {
  const changeImg = document.querySelector('.img-upload__overlay');

  if (changeImg.classList.contains('hidden')) {
    return;
  }

  changeImg.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();

  image.style.transform = 'scale(1)';
  image.style.filter = 'none';

  const slider = document.querySelector('.effect-level__slider');
  slider.noUiSlider.set(1);
};

const closeImg = document.querySelector('.img-upload__overlay');
closeImg.addEventListener('click', (evt) => {
  if (document.querySelector('.error') !== null) {
    const sectionError = document.querySelector('.error');
    document.querySelector('.pictures').removeChild(sectionError);
    return;
  }

  if (document.querySelector('.success') !== null) {
    const sectionError = document.querySelector('.success');
    document.querySelector('.pictures').removeChild(sectionError);
    close();
    return;
  }

  if (evt.target === closeImg) {
    close();
  }
});

const closeButton = document.querySelector('#upload-cancel');
closeButton.addEventListener('click', () => {
  close();
});

document.addEventListener('keydown', (evt) => {
  const noFocus = (form.querySelector('.text__hashtags') !== document.activeElement) && (form.querySelector('.text__description') !== document.activeElement);

  if (document.querySelector('.error') !== null) {
    evt.preventDefault();
    const sectionError = document.querySelector('.error');
    document.querySelector('.pictures').removeChild(sectionError);
    buttonSubmit.disabled = false;
    return;
  }

  if (document.querySelector('.success') !== null) {
    evt.preventDefault();
    const sectionError = document.querySelector('.success');
    document.querySelector('.pictures').removeChild(sectionError);
    close();
    return;
  }

  if ((evt.key === 'Escape') && (noFocus)) {
    evt.preventDefault();
    close();
  }
});

const validateForm = () => {
  const validateHashTag = (value) => /^#[a-zа-яё0-9]{1,20}$/i.test(value);

  const validateHashTagBlank = (element) => {
    const words = element.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const countErrorHashTag = words.filter((value) => !validateHashTag(value));
    return countErrorHashTag.length === 0;
  };

  const validateHashTagCount = (element) => {
    const words = element.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    return words.length <= COUNT_HASHTAGS_VALIDATE;
  };

  const validateHashTagRepeat = (element) => {
    const words = element.split(' ').filter((value) => value !== '').map((value) => value.toLowerCase());
    const repeatWords = new Set(words);
    return words.length === repeatWords.size;
  };

  const validateComments = (element) => element.length <= COUNT_WORDS_COMMENT_VALIDATE;

  pristine.addValidator(form.querySelector('.text__hashtags'), (element) => validateHashTagBlank(element), 'недопустипый хэштег');
  pristine.addValidator(form.querySelector('.text__hashtags'), (element) => validateHashTagCount(element), 'хэштегов больше 5');
  pristine.addValidator(form.querySelector('.text__hashtags'), (element) => validateHashTagRepeat(element), 'есть повторяющиеся хэштеги');
  pristine.addValidator(form.querySelector('.text__description'), (element) => validateComments(element), 'комментариев больше 140');
};

const showOkMessange = () => {
  const ok = document.querySelector('#success').content.cloneNode(true);
  document.querySelector('.pictures').appendChild(ok);
  const sectionError = document.querySelector('.success');

  sectionError.addEventListener('click', (evt) => {
    const successInner = document.querySelector('.success__inner');

    if (evt.target !== successInner) {
      document.querySelector('.pictures').removeChild(sectionError);
    }
  });
};

const showErrorMessange = () => {
  const error = document.querySelector('#error').content.cloneNode(true);
  document.querySelector('.pictures').appendChild(error);
  const sectionError = document.querySelector('.error');

  sectionError.addEventListener('click', (evt) => {
    const errorInner = document.querySelector('.error__inner');

    if (evt.target !== errorInner) {
      document.querySelector('.pictures').removeChild(sectionError);
    }
  });
};

const setOnFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      buttonSubmit.disabled = true;
      const data = new FormData(form);
      sendData(data)
        .then(() => {
          showOkMessange();
          close();
        })
        .catch(showErrorMessange)
        .finally(() => {
          buttonSubmit.disabled = false;
        });
    }
  });
};

const loadFormImg = () => {
  const file = document.querySelector('#upload-file');

  file.addEventListener('change', () => {
    buttonSubmit.disabled = true;

    if (file.files[0].name.endsWith('jpg') || file.files[0].name.endsWith('png')) {
      const changeImg = document.querySelector('.img-upload__overlay');
      changeImg.classList.remove('hidden');
      document.body.classList.add('modal-open');

      buttonSubmit.disabled = false;

      image.src = URL.createObjectURL(file.files[0]);
      const effectImgs = document.querySelectorAll('.effects__preview');
      effectImgs.forEach((img) => {
        img.style.backgroundImage = `url(${image.src})`;
      });
    }
  });
};

const scaleImage = () => {
  const buttonSmall = form.querySelector('.scale__control--smaller');
  const buttonBig = form.querySelector('.scale__control--bigger');
  const buttonValue = form.querySelector('.scale__control--value');
  buttonValue.value = '100%';

  const zoomImg = (direction) => {
    const digitValue = Number(buttonValue.value.replace('%',''));
    let zoomValue = direction;

    if ((digitValue === ZOOM_VALUE_LOWER_LIMIT) && (zoomValue < 0)) {
      zoomValue = 0;
    }

    if ((digitValue === ZOOM_VALUE_UPPER_LIMIT) && (zoomValue > 0)) {
      zoomValue = 0;
    }

    buttonValue.value = `${digitValue + zoomValue}%`;
    image.style.transform = `scale(${(digitValue + zoomValue) / 100})`;
  };

  buttonSmall.addEventListener('click', () => zoomImg(-ZOOM_VALUE_LIMIT));
  buttonBig.addEventListener('click', () => zoomImg(ZOOM_VALUE_LIMIT));
};

const changeFilterEffect = () => {
  const effectChrome = document.querySelector('#effect-chrome');
  const effectSepia = document.querySelector('#effect-sepia');
  const effectMarvin = document.querySelector('#effect-marvin');
  const effectPhobos = document.querySelector('#effect-phobos');
  const effectHeat = document.querySelector('#effect-heat');
  const effectsList = document.querySelector('.effects__list');
  const slider = document.querySelector('.effect-level__slider');
  const sliderValue = document.querySelector('.effect-level__value');
  const fieldSlider = document.querySelector('.img-upload__effect-level');

  showSlider();

  const setValueEffect = () => {
    const value = sliderValue.value;

    fieldSlider.classList.remove('hidden');

    switch (true) {
      case (effectChrome.checked) :
        image.style.filter = `grayscale(${value})`;
        break;
      case (effectSepia.checked) :
        image.style.filter = `sepia(${value})`;
        break;
      case (effectMarvin.checked) :
        image.style.filter = `invert(${value})`;
        break;
      case (effectPhobos.checked) :
        image.style.filter = `blur(${value}px)`;
        break;
      case (effectHeat.checked) :
        image.style.filter = `brightness(${value})`;
        break;
      default:
        image.style.filter = 'none';
        sliderValue.value = 1;
        fieldSlider.classList.add('hidden');
        break;
    }
  };

  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    setValueEffect();
  });

  effectsList.addEventListener('click', () => {
    switch (true) {
      case (effectMarvin.checked) :
        getSettingsSlider('invert');
        break;
      case (effectPhobos.checked) :
        getSettingsSlider('phobos');
        break;
      case (effectHeat.checked) :
        getSettingsSlider('heat');
        break;
      default:
        getSettingsSlider('default');
        break;
    }
  });
};

export {validateForm, scaleImage, loadFormImg, changeFilterEffect, setOnFormSubmit};
