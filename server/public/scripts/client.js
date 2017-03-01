console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();

  $('#newBookButton').on('click', function(){
    var newBookObject = {};
    newBookObject.title = $('#newBookTitle').val();
    newBookObject.author = $('#newBookAuthor').val();

    //added these two new properties based on the new inputs
    newBookObject.edition = $('#newBookEdition').val();
    newBookObject.publisher = $('#newBookPublisher').val();
    $.ajax({
      type: 'POST',
      url: '/books/new',
      data: newBookObject,
      success: function(response){
        console.log(response);
        getBookData();
      }
    });
  });
});

//moved function down to bottom per convention
function getBookData() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function(response) {
      console.log('response', response);

      $('#bookShelf').empty();

      var htmlBookList = ''; //created this variable per Huck's advice that this is faster than appending every loop

      for (var i = 0; i < response.length; i++) { //loops over the response data array to create html list items
        if(response[i].edition == null && response[i].publisher == null){ //created this condition for this specific dataset as it has many that have null properties in these categories
          htmlBookList += '<li class = "list-group-item">Title: ' + response[i].title + ', Author: ' + response[i].author + '</li>';
        } else {
          htmlBookList += '<li class = "list-group-item">Title: ' + response[i].title + ', Author: ' + response[i].author + ', Edition: ' + response[i].edition + ', Publisher: ' + response[i].publisher + '</li>';
        }
      }

      $('#bookShelf').append(htmlBookList); //appends once when variable is built
    }
  });
}
