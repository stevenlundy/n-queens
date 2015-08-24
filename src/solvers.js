/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({'n' : n});
  var solution = addRook(board, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.addRook = function(board, col){
  var rows = board.rows();
  if(board.hasAnyRowConflicts()) {
    return false;
  }
  if (col >= rows.length){
    return rows;
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i][col] = 1;
    var result = addRook(board, col + 1);
    if(result) {
      return result;
    } else {
      rows[i][col] = 0;
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n' : n});
  var solutionCount = addRookAndCount(board, 0, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.addRookAndCount = function(board, col, count){
  var rows = board.rows();
  if(board.hasAnyRowConflicts()) {
    return count;
  }
  if (col >= rows.length){
    return count + 1;
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i][col] = 1;
    count = addRookAndCount(board, col + 1, count);
    rows[i][col] = 0;
  }
  return count;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n' : n});
  var solution = addQueen(board, 0) || board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

window.addQueen = function(board, col){
  var rows = board.rows();
  if(board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
    return false;
  }
  if (col >= rows.length){
    return rows;
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i][col] = 1;
    var result = addQueen(board, col + 1);
    if(result) {
      return result;
    } else {
      rows[i][col] = 0;
    }
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
