var tryAddingQueen = function(ld, col, rd, all, count){
    var poss = ~(ld | rd | col) & all;
    
    if(col === all){
      return count + 1;
    }
    
    while(poss > 0){
      var bit = poss & (~poss + 1);
      poss -= bit;
      count = tryAddingQueen((ld | bit) << 1, (col | bit), (rd | bit) >> 1, all, count);
    }
    return count;
};

var onmessage = function(e) {
  var col = e.data[0];
  var all = e.data[1];
  var count = tryAddingQueen(col << 1, col, col >> 1, all, 0);
  console.log('Posting message back to main script');
  postMessage(count);
};

