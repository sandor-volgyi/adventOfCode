function getResults(){

  //get the text for validation and then posting if valid
  var contentText=document.getElementById('content-in').value;
      contentText=contentText.trim();

  var numArray=contentText.split("\n");
      numArray.sort(function(a, b){return a - b});

  var remainder;
  var low;
  var checkValues;


  for (up = numArray.length - 1; up >= 0; up--) {
    remainder=2020-numArray[up];
    checkValues=getRemainingTwo(remainder, contentText);
    if(checkValues[0] + checkValues[1] > 0) {
      break;
    }

  }

  var numFor2= checkValues[0] + "-" + checkValues[1] + "-" + numArray[up];
  var multiplied2 = checkValues[0] * checkValues[1] * numArray[up];
    checkValues = getRemainingTwo(2020, contentText);
  var numFor1= checkValues[0] + "-" + checkValues[1];
  var multiplied1 = checkValues[0] * checkValues[1];

  alert("Solution 1 (2 numbers): \n -> Numbers:" + numFor1 + "\n -> Multiplication: " + multiplied1 + "\nSolution 2 (3 numbers): \n -> Numbers:" + numFor2 + "\n -> Multiplication: " + multiplied2);
      return(false);
}


function getRemainingTwo(top, contentText){

  var IDs = new Array();
    IDs[0] = 0;
    IDs[1] = 0;

  var numArray=contentText.split("\n");
      numArray.sort(function(a, b){return a - b});

      var low;
      var up;
      var exactNum;
      var result;
      var gotcha =0;

          up=numArray.length - 1;
    
          for (low = 0; low < up; low++) {
            exactNum=top-numArray[low];
            
              while(numArray[up] > exactNum) {
                up--;
              }
    
              if(exactNum == numArray[up]) {
                result= exactNum;
                gotcha=1;
                break;
              }
          } 
        
      //result=numArray[low] * result;
      if(gotcha){
          IDs[0] = numArray[low];
          IDs[1] = result;
        }
      return IDs;
}
