'use strict'

//get the text for validation and then posting if valid

var fs = require('fs');
const contentText = fs.readFileSync('input.txt', 'utf8');

let passArray=contentText.trim().split("\n");
    passArray.push("\n");

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
console.log("The amount of yes answers: " + sumYes);
console.log("Amount of yes where the group agreed: " + groupYes);

function getUniqueAnswers(passLine) {
  const regex = /[a-z]/g;
  const found = passLine.match(regex);
  let tempArray=new Array();

  tempArray=found.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  })

  return(tempArray.length);
}

function getGroupYes(passLine,ppl) {
  const regex = /[a-z]/g;
  const found = passLine.match(regex);
    found.sort();
  let commonYes=1;
  let sumOfYes=0;

  if(found.length < 2) {
    sumOfYes++;
  }
  if(ppl===1) {
    return(found.length);
  }

  for(let i=1;i<found.length;i++) {
    if(found[i]===found[i-1]) {
      commonYes++;
    } else {
      commonYes=1;
    }
    if(commonYes===ppl) {
      //console.log(commonYes + ' - ' + ppl);
      sumOfYes++;
      //console.log(sumOfYes);
    }
  }
  return(sumOfYes);
}