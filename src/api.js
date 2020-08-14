const BASE_URL = 'https://thinkful-list-API.herokuapp.com/renata/bookmarks';
	
function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

const getBookmarks = function () {
  return listApiFetch(BASE_URL, {});
};

const createBookmark = function (bookmark) {
  let newBookmark = JSON.stringify(bookmark);

  return listApiFetch(BASE_URL, {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : newBookmark
  });
};

const updateBookmark = function (id, updateData) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method : 'PATCH',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(updateData)
  });
};

const deleteBookmark = function (id) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method : 'DELETE'
  });
};

export default {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};