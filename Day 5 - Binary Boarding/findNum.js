'use strict'

//get the text for validation and then posting if valid

var fs = require('fs');
const contentText = fs.readFileSync('input.txt', 'utf8');


let passArray=contentText.trim().split("\n");
let i;
let line;
let highestSeat=0;
let currSeat;
let results=new Array();

for (i = 0; i < passArray.length; i++) {

    currSeat=convertSeatToID(passArray[i]);

    results.push(currSeat);
    //console.log(currSeat);

    if(currSeat > highestSeat){
      highestSeat=currSeat;
    }

}

results.sort();
results.sort(function(a, b) { return a - b; });

for(i=2;i<results.length;i++){
  if((results[i]- results[i-1] ) ===2) {
    console.log("Your seat could have the following ID: " + (results[i] - 1));
  }

}

console.log("The highest seat ID is: " + highestSeat);


//Function to convert the boardingPass mambo jambo to seat ID
function convertSeatToID(passLine) {

  let b;
  let line;
  let rowsUpper;
  let rowsLower;
  let colsUpper;
  let colsLower;
  let currSeat;
  let currRow;
  let currCol;

    line=passLine.split('');
    if(!line.length===10) {
      return(0);
    }

  rowsUpper=127;
  rowsLower=0;
  colsUpper=7;
  colsLower=0;

    line=passLine.split('');

  for(b=0;b<line.length;b++) {
    if(b<7) {
      if(line[b] ==='F') {
        rowsUpper=rowsUpper - Math.ceil((rowsUpper-rowsLower) / 2);
        currRow=rowsUpper;
        //console.log(line[b] + " - " + rowsUpper);
      } else {
        rowsLower=Math.ceil((rowsUpper-rowsLower) / 2) + rowsLower;
        currRow=rowsLower;
        //console.log(line[b] + " - " + rowsLower);
      }
    } else {
      if(line[b] ==='L') {
        colsUpper=colsUpper - Math.ceil((colsUpper-colsLower) / 2);
        currCol=colsUpper;
        //console.log(line[b] + " - " + colsUpper);
      } else {
        colsLower=Math.ceil((colsUpper-colsLower) / 2) + colsLower;
        currCol=colsLower;
        //console.log(line[b] + " - " + colsLower);
      }
    }
  }

  currSeat=currRow * 8 + currCol;

  return(currSeat);
}