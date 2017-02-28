console.log('sourced!');
$(document).ready(function(){
  console.log('jquery was correctly sourced!');
  getBookData();
  function getBookData() {
    $.ajax({
      type: 'GET',
      url: '/books',
      success: function(response) {
        console.log('response', response);
        $('#bookShelf').empty();
        var htmlBookList = ''; //created this variable per Huck's advice that this is faster than appending every loop
        for (var i = 0; i < response.length; i++) { //added the concatenated html and variables to append from the response
          htmlBookList += '<li>Title: ' + response[i].title + ', Author: ' + response[i].author + ', Edition: ' + response[i].edition + ', Publisher: ' + response[i].publisher + '</li>';
        }
          $('#bookShelf').append(htmlBookList); //only appends once when variable is built
      }
    });
  }

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
