import API from './api.js';
import {render, setView, setErrors, setMinRatings, setBookmarks,
  getBookmarks,} from './bookmark.js';

function handleNewItem(){
  $('main').on('submit', '.new-bookmark-button', function(event){
    event.preventDefault();
    setView('add');
    render();
  });
}

function handleRatingFilter(){
  $('main').on('submit', '.bookmark-rating-form', function(event){
    event.preventDefault();
    setMinRatings(parseInt($('#bookmark-rating').val(), 10));
    render();
  });
}

function handleSaveBookmark(){
  $('main').on('submit', '.new-bookmark-form', function(event){
    event.preventDefault();
    const title = $('#new-bookmark-title').val();
    const url = $('#new-bookmark-url').val();
    const description = $('#new-bookmark-description').val();
    const rating = $('#new-bookmark-rating').val();

    API.createBookmark({
      title:  title,
      url    : url,
      desc   : description,
      rating : rating,
    })
      .then((bookmark) => {
        let bkm = getBookmarks();
        bkm.push({
          id          : bookmark.id,
          title       : bookmark.title,
          url         : bookmark.url,
          description : bookmark.desc,
          rating      : bookmark.rating,
        });

        setBookmarks(bkm);

        setView('initial');

        setErrors([]);
      })
      .catch((err) => {
        setErrors([]);
        setErrors.push(err.message);
      })
      .finally(() => {
        render();
      });

  });
}

function handleCancelBookmark(){
  $('main').on('click', '#cancel-item', function(event){
    event.preventDefault();
    setErrors([]);
    setView('initial');
    render();
  });
}

function handleCheckbox(){
  $('main').on('click', '.checkbox', function(){
    let bkm = getBookmarks();
    const isChecked = $(event.target).prop('checked');
    const cuid = $(event.target).closest('li').find('input').data('cuid');
    const index = bkm.findIndex(bookmark => bookmark.id === cuid);

    
    bkm[index].selected = isChecked;

    if ($( '.checkbox:checked').length > 0) {
      setView('delete');
    } else {
      setView('delete');
    }

    render();
  });
}

function handleDelete(){
  $('main').on('submit', '.delete-bookmarks', function(event){
    event.preventDefault();

    let bkm = getBookmarks();
    const selectedBookmarks = bkm.filter((b) => {
      return b.selected === true;
    });

    const loop = selectedBookmarks.reduce((prevPromise, bookmark) => {

      return prevPromise.finally(() => {

        return API.destroyBookmark(bookmark.id)
          .then(() => {
            const deletedIndex = bkm.findIndex((mark) => { return mark.id === bookmark.id; });
            bkm.splice(deletedIndex, 1);
          })
          .catch((err) => {
            setErrors.push(err.message);
          });

      });

    }, Promise.resolve());

    loop.finally(() => {
      setView('initial');
      render();
    });

  });
}

function handleViewDetails(){
  $('main').on('click', '.view-details', function(event){
    event.preventDefault();

    let bkm = getBookmarks();
    const cuid = $(event.target).closest('li').find('input').data('cuid');
    const bookmark = bkm.find(bookmark => bookmark.id === cuid);
    bookmark.expanded = true;
    render();
  });
}

function handleHideDetails(){
  $('main').on('click', '.hide-details', function(event){
    event.preventDefault();

    let bkm = getBookmarks();
    const cuid = $(event.target).closest('li').find('input').data('cuid');
    const bookmark = bkm.find(bookmark => bookmark.id === cuid);
    bookmark.expanded = false;
    render();
  });
}

const store = {  
  handleNewItem,
  handleRatingFilter,
  handleCheckbox,
  handleDelete,
  handleSaveBookmark,
  handleCancelBookmark,
  handleViewDetails,
  handleHideDetails
};

export default store;
