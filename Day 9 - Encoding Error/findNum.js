'use strict'

//get the text for validation and then posting if valid

var fs = require('fs');
const contentText = fs.readFileSync('input.txt', 'utf8');

let passArray=contentText.trim().split("\n");
    passArray=passArray.map(a=>parseInt(a));
let nonValidNumbers=[];
let encryptNumbers=[];
let limitedArray=[];

  nonValidNumbers=getWrongNums(passArray,25);
  console.log("There is/are " + nonValidNumbers.length + " invalid number in this list, the first is: " + nonValidNumbers[0][0]);

  limitedArray=passArray.slice(0,nonValidNumbers[0][1]);
  encryptNumbers=getContiguous(limitedArray,nonValidNumbers[0][0]);
  encryptNumbers.sort((a,b) => a-b);

  console.log("The sum of the smallest and biggest number for the encryption number is: " + (encryptNumbers[0] + encryptNumbers[encryptNumbers.length-1]));

function getContiguous(limitedArray, totalSum) {

  let compareSum=0;
  let lowBound=0;

  for(let i=0; i<limitedArray.length;i++) {

    lowBound=i;
    compareSum=0;
    while(compareSum < totalSum) {
      compareSum+=limitedArray[i];
      i++;
    }
    if(compareSum===totalSum) {
      return(limitedArray.slice(lowBound,i));
    }
    i=lowBound;
  }
  return(false);
}


function getWrongNums(passArray,numberRange) {

  let nonValidNumbers=[];
  let tempArray=[];

  for(let i=numberRange;i<passArray.length;i++) {
    tempArray=passArray.slice(i-numberRange,i);
    tempArray.sort((a,b) => a-b);

    if(!checkSum(tempArray,passArray[i])) {
      nonValidNumbers.push([passArray[i],i]);
    }

  }
  console.log(nonValidNumbers);
  return(nonValidNumbers);
}

function checkSum(arrayOfNum,sumOfTwo) {

  let h=1;

  for(let i=0; i<arrayOfNum.length; i++) {
    //console.log(i,h);
    for(let j=arrayOfNum.length-h; j>i; j--) {
      let sumEnds =arrayOfNum[i] + arrayOfNum[j];

      if(sumEnds < sumOfTwo) {
        break;
      } else if(sumEnds>sumOfTwo) {
        h++;
        continue;
      } else {
        return(true);
      }
    }
  }

  return(false);

}


/*

let i;
let line;
let sumYes=0;
let tempLine="";
let uniqueAnswers=0;
let ppl=0;
let groupYes=0;

for (i = 0; i < passArray.length; i++) {
  //console.log(passArray[i].trim().length);
  if(passArray[i].trim().length>0) {
    tempLine+=passArray[i].trim();
    ppl++;
  } else {
    uniqueAnswers=getUniqueAnswers(tempLine);
    groupYes+=getGroupYes(tempLine,ppl);
    tempLine="";
    sumYes+=uniqueAnswers;
    ppl=0;
  }
}
*/