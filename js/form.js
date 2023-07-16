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

  const buttonValue = document.querySelector('.scale__control--value');
  buttonValue.value = '100%';
  const image = document.querySelector('.img-upload__preview img');
  image.style.transform = 'scale(1)';
  image.style.filter = 'none';

  const slider = document.querySelector('.effect-level__slider');
  slider.noUiSlider.set(0);
  const fieldSlider = document.querySelector('.img-upload__effect-level');
  fieldSlider.style.display = 'none';
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

const scaleImage = () => {
  const buttonSmall = document.querySelector('.scale__control--smaller');
  const buttonBig = document.querySelector('.scale__control--bigger');
  const buttonValue = document.querySelector('.scale__control--value');

  const zoomImg = (direction) => {
    const image = document.querySelector('.img-upload__preview img');
    const digitValue = Number(buttonValue.value.replace('%',''));

    if ((digitValue === 25) && (direction < 0)) {direction = 0}

    if ((digitValue === 100) && (direction > 0)) {direction = 0}

    buttonValue.value = `${digitValue + direction}%`;
    image.style.transform = `scale(${(digitValue + direction) / 100})`;
  };

  buttonSmall.addEventListener('click', () => zoomImg(-25));

  buttonBig.addEventListener('click', () => zoomImg(25));
};

const changeFilterEffect = () => {
  const effectNone = document.querySelector('#effect-none');
  const effectChrome = document.querySelector('#effect-chrome');
  const effectSepia = document.querySelector('#effect-sepia');
  const effectMarvin = document.querySelector('#effect-marvin');
  const effectPhobos = document.querySelector('#effect-phobos');
  const effectHeat = document.querySelector('#effect-heat');
  const effectsList = document.querySelector('.effects__list');
  const image = document.querySelector('.img-upload__preview img');
  const slider = document.querySelector('.effect-level__slider');
  const sliderValue = document.querySelector('.effect-level__value');
  const fieldSlider = document.querySelector('.img-upload__effect-level');

  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 10,
    connect: 'lower',
  });

  const setValueEffect = () => {
    const value = sliderValue.value;
    fieldSlider.style.display = 'block';

    switch (true) {
      case (effectNone.checked) :
        image.style.filter = 'none';
        sliderValue.value = 0;
        fieldSlider.style.display = 'none';
        break;
      case (effectChrome.checked) :
        image.style.filter = `grayscale(${value / 100})`;
        break;
      case (effectSepia.checked) :
        image.style.filter = `sepia(${value / 100})`;
        break;
      case (effectMarvin.checked) :
        image.style.filter = `invert(${value / 100})`;
        break;
      case (effectPhobos.checked) :
        image.style.filter = `blur(${value * 3 / 100}px)`;
        break;
      case (effectHeat.checked) :
        image.style.filter = `brightness(${1 + value * 2 / 100})`;
        break;
    }
  };

  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    setValueEffect();
  });

  effectsList.addEventListener('click', () => {
    sliderValue.value = 0;
    slider.noUiSlider.set(0);
    setValueEffect();
  });
};

export {validateForm, loadFormImg, scaleImage, changeFilterEffect};
