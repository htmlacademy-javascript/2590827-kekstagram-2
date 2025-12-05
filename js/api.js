const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }

      return response.json();
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET);
const sendData = (body) => load(Route.POST_DATA, ErrorText.POST, Method.POST, body);

export { getData, sendData, ErrorText };
