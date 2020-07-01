import {render, populate} from './bookmark.js';
import store from './store.js';

function main(){
  populate().then(render);
  
  store.handleNewItem();
  store.handleRatingFilter();
  store.handleCheckbox();
  store.handleDelete();
  store.handleSaveBookmark();
  store.handleCancelBookmark();
  store.handleViewDetails();
  store.handleHideDetails();
}
  
$(main);
  
