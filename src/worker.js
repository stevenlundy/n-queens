onmessage = function(e) {
  var board = e.data[0];

  var count = addQueenAndCount(board, 1, 0);


  console.log('Posting message back to main script');
  postMessage(count);
}