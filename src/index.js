import {generateMainView, bindEventListeners, render} from './bookmark.js';
import api from './api.js';
import store from './store.js';

const main = function() {
  render(generateMainView);
  let bkm = api.getBookmarks()
    .then(response => {
      response.forEach(bookmark => {
        bookmark.expanded = false;
        store.addBookmark(bookmark);
        render(generateMainView);
      });
      render(generateMainView);
      bindEventListeners();
    });
};

$(main);