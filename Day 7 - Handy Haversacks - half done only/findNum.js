'use strict'

//get the text for validation and then posting if valid

var fs = require('fs');
const contentText = fs.readFileSync('input.txt', 'utf8');

let passArray=contentText.trim().split("\n");

let line;
let contain=0;
let parentArr=new Array();
let returnArr=new Array();
let checkAsChild=new Array();
    checkAsChild.push("shiny gold");
    parentArr.push("shiny gold");

while(checkAsChild.length > 0) {
  //console.log(checkAsChild);
  returnArr=getContainers(passArray,checkAsChild);
  if(returnArr[0]!==0) {
    contain+=returnArr[returnArr.length-1];
    checkAsChild=[];
    returnArr.pop();
    returnArr.forEach(a=>{
      if(parentArr.indexOf(a) < 0) {
        checkAsChild.push(a);
        parentArr.push(a);
        //console.log(a);
      }
    });
  } else {
    checkAsChild=[];
  }
}
console.log("The amount of bags that could hold a shiny bag: " + (parentArr.length-1));
/*
let calculateIt=[];
    returnArr=[];
    checkAsChild=[];
    checkAsChild.push([[1],"shiny gold bag"]);

while(checkAsChild.length > 0) {
  returnArr=getToBottom(passArray,checkAsChild);
  checkAsChild=[];
  //console.log(returnArr);
  for(let g=0;g<returnArr.length;g++) {
    //console.log(returnArr[g][0]);
    if(returnArr[g][1] === 'Bottom reached') {
      calculateIt.push(returnArr[g][0]);
    } else {
      checkAsChild.push([returnArr[g][0],returnArr[g][1]]);
    }
  }
  //console.log(checkAsChild);
  //checkAsChild=[];
}
//console.log(calculateIt);
  console.log(parentBag);
let tempMult=1;
let partSum=0;
let fullSum=0;

for(let zs=0;zs<calculateIt.length;zs++){

  calculateIt[zs].pop();
  calculateIt[zs].shift();
  console.log(calculateIt[zs]);

  for(let less=0; less<calculateIt[zs].length;less++) {
    for(let xy=0;xy<calculateIt[zs].length-less;xy++) {
      tempMult*=parseInt(calculateIt[zs][xy]);
    }
    partSum+=tempMult;
    console.log(partSum);
    tempMult=1;
  }

  fullSum+=partSum;
  partSum=0;
}
console.log(fullSum);
*/

function getContainers(inArray,checkBagArray) {
  let responseArray=new Array();
  let i;
  let line;
  let contain=0;

  for (i = 0; i < inArray.length; i++) {
    line=inArray[i].trim();
    checkBagArray.forEach(a=>{
      if(line.indexOf(a)>0) {
        responseArray.push(line.substring(0,line.indexOf(" bags")));
        contain++;
        //console.log(line);
      }
    })
  }
  responseArray.push(contain);

  return(responseArray);
}

function getToBottom(inArray,checkArray) {

  let responseArray=new Array();
  let childArray;
  let i;
  let line;
  let allChildren;
  let child;
  let tempNum;
  let multiplier=new Array();

    checkArray.forEach(subarray => {
        for (i = 0; i < inArray.length; i++) {
            line=inArray[i].trim();
            if(line.indexOf(subarray[1])===0) {
              allChildren=line.split("contain");
              if(allChildren.length>1 && allChildren[1].indexOf('no') < 0) {
                child=allChildren[1].split(",");
                child.forEach(a=>{
                  childArray=a.trim().match(/^([0-9])\s([a-z\s]+\sbag).*$/i);
                  childArray.shift();
                  subarray[0].push(childArray[0]);
                  childArray[0]=subarray[0].slice();
                  responseArray.push(childArray);
                  subarray[0].pop();
                });
              } else {
                subarray[0].push(1);
                multiplier=subarray[0].slice();
                childArray=[multiplier,"Bottom reached"];
                responseArray.push(childArray);
                subarray[0].pop();
              }
            }
        }
    });
  return(responseArray);
}

function mapAllLines(inArray) {

  let parentBag;
  let childBags=[];
  let matchingData={};
  let allChildren;
  let child;
  let childArray;

  inArray.forEach(subArray => {

    if(subArray.indexOf('contain no other') > 0) {
      childBags.push([0,0]);
      parentBag=subArray.trim().match(/^([a-z\s]+?)\sbag/)[1];
      matchingData[parentBag] = childBags;
    } else {
      allChildren=subArray.split("contain");

        parentBag=allChildren[0].trim().match(/^([a-z\s]+?)\sbag/)[1];
        child=allChildren[1].split(",");
        child.forEach(a=>{
          childArray=a.trim().match(/^([0-9])\s([a-z\s]+)\sbag.*$/i);
          childArray.shift();
          childBags.push([parseInt(childArray[0]),childArray[1]]);
        });
    }
    matchingData[parentBag] = childBags;
    childBags=[];
  });

  return(matchingData);

};

let nezzuk=mapAllLines(passArray);
//console.log(nezzuk['faded blue']);
//console.log(nezzuk['vibrant plum']);

  let parentName='faded blue';
  let i=0;

  while(i>=0) {
    let getChildren = nezzuk[parentName];
      getChildren.forEach(a => {
        console.log(a[0]);
        

      });
    parentName="";
    i++;
    break;
  }