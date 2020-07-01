const BASE_URL  = 'https://thinkful-list-API.herokuapp.com/renata/bookmarks';

const validateBody = function (input) {

  const validInput = {};
  const keys = Object.keys(input);

  for (let k = 0; k < keys.length; k++) {
    switch (keys[k]) {
    case 'id':
      if (input.id) {
        validInput.id = input.id;
      }
      break;
    case 'title':
      if (input.title) {
        validInput.title = input.title;
      }
      break;
    case 'url':
      if (input.url) {
        validInput.url = input.url;
      }
      break;
    case 'desc':
      if (input.desc) {
        validInput.desc = input.desc;
      }
      break;
    case 'description':
      if (input.description) {
        validInput.desc = input.description;
      }
      break;
    case 'rating':
      // eslint-disable-next-line no-case-declarations
      const num = Number.parseInt(input.rating, 10);
      if (num >= 1 && num <= 5) {
        validInput.rating = num;
      }
      break;
    default:
      break;
    }
  }
  console.log(input, validInput);
  return validInput;
};

const request = function (uri, options) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = Object.assign({}, defaultOptions, options);

  let response = null;

  return fetch(uri, mergedOptions)
    .then((res) => {
      response = res;
      return res;
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    });
};


const getAllBookmarks = function () {
  return request(BASE_URL, {});
};

const getBookmark = function (id) {
  return request(`${BASE_URL}/${id}`, {});
};

const createBookmark = function (data) {
  return request(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(validateBody(data))
  });
};

const updateBookmark = function (id, data) {
  return request(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(validateBody(data)),
  });
};

const destroyBookmark = function (id) {
  return request(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
};


export default {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  destroyBookmark,
};