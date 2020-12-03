//get the text for validation and then posting if valid


function getResults(){

  var contentText=document.getElementById('content-in').value;
      contentText=contentText.trim();

  var route1=routeThrough(contentText,1,1);
  var route2=routeThrough(contentText,3,1);
  var route3=routeThrough(contentText,5,1);
  var route4=routeThrough(contentText,7,1);
  var route5=routeThrough(contentText,1,2);

  var multi=route1 * route2 * route3 * route4 * route5;

  alert(route2);
  alert(multi);

  return(false);

}

function routeThrough(contentText,right,down) {

  var i;
  var line;
  var currPos=1;
  var charAtPos;
  var lastC;
  var trees=0;

  var passArray=contentText.split("\n");

  for (i = 0; i < passArray.length; i = i + down) {

    line=passArray[i].trim();
    maxCharCount=line.length;
    charAtPos=line.charAt(currPos - 1 );


    if(charAtPos == "#" ) {
        trees++;
        console.log((currPos) + " - - " + charAtPos + " - line " + i + " - " + trees);
    } 
    
    currPos=currPos + right;
    if(currPos > maxCharCount) {
      currPos=currPos % maxCharCount;
    }
  }

 return(trees);

}