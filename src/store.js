let bookmarks = [];

let state = {
  creating : false,
  editing : false,
  filter : 0,
  error : null
};

const findById = function (id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  this.bookmarks.push(bookmark);
};

const findAndUpdate = function (id, newData) {
  let myBookmark = this.findById(id);
  Object.assign(myBookmark, newData);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id.toString() !== id.toString());
};

export default {
  bookmarks,
  state,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete
};
