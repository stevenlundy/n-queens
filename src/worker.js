


// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

  var Board = function(board){
    this.rows = board;
  };

  Board.prototype  =  {
    rows: function() {
      return this.rows;
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.rows.length &&
        0 <= colIndex && colIndex < this.rows.length
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.rows()[rowIndex];
      var count = 0;
      for (var i = 0; i < row.length; i++) {
        count += row[i];
        if(count === 2){
          return true;
        }
      };
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.rows.length;
      for (var i = 0; i < n; i++) {
        if(this.hasRowConflictAt(i)){
          return true;
        }
      };
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;
      for (var i = 0; i < board.length; i++) {
        count += board[i][colIndex];
        if(count === 2){
          return true;
        }
      };
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.rows.length;
      for (var i = 0; i < n; i++) {
        if(this.hasColConflictAt(i)){
          return true;
        }
      };
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var count = 0;
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < board.length; i++) {
        count += board[i][colIndex++] ? 1 : 0;
        if(count === 2){
          return true;
        }
      };
      return false; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.rows.length;
      for (var i = -n + 1; i < n; i++) {
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      };
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var count = 0;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < board.length; i++) {
        count += board[i][colIndex--] ? 1 : 0;
        if(count === 2){
          return true;
        }
      };
      return false; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.rows.length;
      for (var i = 0; i < (n-1)*2; i++) {
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      };
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


};



var addQueenAndCount = function(board, col, count){
  var rows = board.rows();
  if(board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
    return count;
  }
  if (col >= rows.length){
    return count + 1;
  }
  for (var i = 0; i < rows.length; i++) {
    rows[i][col] = 1;
    if( !(board._isInBounds(i-1,col-1) && rows[i-1][col-1]) && !(board._isInBounds(i+1,col-1) && rows[i+1][col-1]) && !(rows[i][col-1]) ){
      count = addQueenAndCount(board, col + 1, count);
    }
    rows[i][col] = 0;
  }
  return count;
};

var onmessage = function(e) {
  var board = e.data[0];

  var count = addQueenAndCount(board, 1, 0);

  console.log('Posting message back to main script');
  postMessage(count);
};