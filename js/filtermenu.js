import {createPhotos, deletePhotos} from './picture.js';
import {getRandomArray, debounce} from './util.js';

const COUNT_IMAGES_SHOW = 10;

const imgFilterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const filter = (allPhotos = [], evt) => {
  const idPhoto = evt.id;

  deletePhotos();
  let newAllPhotos = allPhotos;

  switch (idPhoto) {
    case ('filter-random'):
      newAllPhotos = getRandomArray(allPhotos, COUNT_IMAGES_SHOW);
      break;
    case ('filter-discussed'): {
      const compareDiscussedCount = (photo1, photo2) => photo2.comments.length - photo1.comments.length;
      newAllPhotos = allPhotos.slice().sort(compareDiscussedCount);
      break;
    }
  }

  createPhotos(newAllPhotos);
};

const onButtonClick = (evt) => {
  if (evt.target !== imgFilters) {
    imgFilterButtons.forEach((element) => {
      element.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');
  }
};

const filterMenu = (allPhotos) => {
  const filterPhotos = (e) => filter(allPhotos, e);

  if (allPhotos.length !== 0) {
    imgFilters.classList.remove('img-filters--inactive');
  }

  filterPhotos(filterDefault);
  filterDefault.addEventListener('click', debounce((e) => filterPhotos(e.srcElement)));
  filterRandom.addEventListener('click', debounce((e) => filterPhotos(e.srcElement)));
  filterDiscussed.addEventListener('click', debounce((e) => filterPhotos(e.srcElement)));
  imgFilters.addEventListener('click', (e) => onButtonClick(e));
};

export {filterMenu};
