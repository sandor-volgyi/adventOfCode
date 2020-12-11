'use strict'

//get the text for validation and then posting if valid

var fs = require('fs');
const contentText = fs.readFileSync('input2.txt', 'utf8');

let passArray=contentText.trim().split("\n");

let acc = 0;
let codeLines=getCodeLines(passArray);

let accNumSingleRun=accBeforeDouble(codeLines,0);

console.log("The account value before the second iteration of the loop is: ", accNumSingleRun[0]);

console.log("The account value accumulation after the fix applied: ", bruteForce(codeLines));

function bruteForce(codeLines){

  let acc=0;
  let i=0;

  while(true) {
    if(i>=codeLines.length){
      return(i + "Nemtom mi van");
    }

    switch (codeLines[i][0]) {
      case 'acc':
          acc+=codeLines[i][1];
          i++;
          break;
      case 'nop':
        //console.log(i,codeLines[i][0],codeLines[i][1]);
        if(accBeforeDouble(codeLines,i+codeLines[i][1])[1] > codeLines.length-1){
          return(acc+=accBeforeDouble(codeLines,i+codeLines[i][1])[0]);
        } else {
          i++;
        }
        break;

      case 'jmp':
        //console.log(i,codeLines[i][0],codeLines[i][1]);
        if(accBeforeDouble(codeLines,i+1)[1] > codeLines.length-1){
          return(acc+=accBeforeDouble(codeLines,i+1)[0]);
        } else {
          i=i+codeLines[i][1];
        }
        break;

      default:
        //no need for this now
    }
  }

}
  





/*
let accNumFixitRun=accGetFinishedAcc(codeLines);
console.log(accNumFixitRun[0]);


function accGetFinishedAcc(codeLines) {
  let acc=0;
  let i=0;
  let upperGoal=getLastWrongJump(codeLines);

  console.log("upper goal", upperGoal);

  while(true) {
    console.log(i, acc);
    switch (codeLines[i][0]) {
      case 'acc':
          acc+=codeLines[i][1];
          i++;
          break;
      case 'nop':
        if(lookAhead(codeLines,(i+codeLines[i][1])-1) > i) {
          i=i+codeLines[i][1];
        } else {
          i++;
        }
        break;

      case 'jmp':
          if(lookAhead(codeLines,i) > i) {
            i++;
          } else {
            i=i+codeLines[i][1];
          }
          if(i>codeLines.length-1 || i<0) {
            return([acc,i]);
          };
        break;

      default:
        //no need for this now
    }
  }

  return([acc,i]);

}

//console.log(getLastWrongJump(codeLines));

function getLastWrongJump(codeLines) {

  for(let i=codeLines.length-1;i>=0;i--){
    if(codeLines[i][0]==="jmp" && codeLines[i][1]< 1) {
      return i;
    }
  }

}

//console.log(lookAhead(codeLines,3));

function lookAhead(codeLines,i){
//console.log(codeLines.length);
  let upperGoal=getLastWrongJump(codeLines);
  let b=(i+1);
      while(true) {
        if(codeLines[b][0]==="jmp") {
          if(codeLines[b][1] > 0) {
            b=b+codeLines[b][1];

            if(b > upperGoal) {
              return(b);
            }
            
          } else {
            return(i);
          }
      } else {
        b++;
        if(b > upperGoal) {
          return(b);
        }
      }
    }
}*/


function getCodeLines(passArray) {

  let codeLines=[];
  let line;

    for (let i = 0; i < passArray.length; i++) {
      line=passArray[i].trim().split(" ");
      line=line.map(function(a) {
        if(!isNaN(a)){
          return(parseInt(a));
        } else {
          return(a);
        };
        });
      codeLines.push(line);
    }
  return(codeLines);
  }



function accBeforeDouble(codeLines,g) {
    let acc=0;
    let i=0+g;
    let visited=new Array(codeLines.length);
  
    while(true) {
      if(visited[i]===true || i>codeLines.length-1) {
          break;
      } else {
        visited[i]=true;
      };
  
      switch (codeLines[i][0]) {
        case 'acc':
            acc+=codeLines[i][1];
        case 'nop':
            i++;
          break;
  
        case 'jmp':
            i=i+codeLines[i][1];
          break;
  
        default:
          //no need for this now
      }
    }
  
    return([acc,i]);
  
}