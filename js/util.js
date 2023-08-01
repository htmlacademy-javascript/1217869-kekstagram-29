const getRandomNumber = (left, right) => Math.trunc(Math.random() * (right + 1 - left) + left);

const TIME_DELAY = 500;

const getRandomArray = (arrays, count) => {
  const newArrays = [];
  const idArrays = arrays.slice().map((element) => element.id);

  for (let i = 0; i < count; i++) {
    const choice = getRandomNumber(0, arrays.length - i - 1);
    newArrays.push(arrays[idArrays[choice]]);
    idArrays.splice(choice, 1);
  }

  return newArrays;
};

const debounce = (callback, timeoutDelay = TIME_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getRandomArray, debounce};
