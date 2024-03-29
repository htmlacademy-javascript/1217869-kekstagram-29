const exchangeData = (response) => {
  if (!response.ok) {
    throw new Error('нет подключения к базе данных');
  }
  return response.json();
};

const showErrorLoadMessange = () => {
  const error = document.querySelector('#error-load').content.cloneNode(true);
  document.querySelector('.pictures').appendChild(error);
};

const getData = () =>
  fetch('https://29.javascript.pages.academy/kekstagram/data', {method: 'GET'})
    .then((response) => exchangeData(response))
    .catch(() => {
      showErrorLoadMessange();
      return [];
    });

const sendData = (body = null) =>
  fetch('https://29.javascript.pages.academy/kekstagram/', {method: 'POST', body})
    .then((response) => exchangeData(response))
    .catch(() => {
      throw new Error('не смог загрузить картинку на сервер');
    });

export {getData, sendData};
