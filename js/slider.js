const slider = document.querySelector('.effect-level__slider');

const showSlider = () => {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.10,
    connect: 'lower',
  });
};

const getSettingsSlider = (value) => {
  const settingsSlider = {
    'default': {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.10,
      connect: 'lower',
    },
    'invert': {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.01,
      connect: 'lower',
    },
    'phobos': {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
    'heat': {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  };
  slider.noUiSlider.updateOptions(settingsSlider[value]);
};

export {showSlider, getSettingsSlider};
