//get the text for validation and then posting if valid


function getResults(){

  var contentText=document.getElementById('content-in').value;
      contentText=contentText.trim();

 alert(firstPassPolicy(contentText));
 alert(secondPassPolicy(contentText));

}

function firstPassPolicy(contentText) {

 var passArray=contentText.split("\n");

 var i;
 var line;
 var between;
 var char;
 var pass;
 var charCount;
 var regex;
 var valid=0;

   for (i = 0; i < passArray.length; i++) {

     line=passArray[i].trim().split(" ");
       
       between=line[0].split("-");
       char=line[1].replace(":","");
       pass=line[2];
       regex = new RegExp(char, 'g')
       charCount = (pass.match(regex) || []).length;  

         if(charCount >=between[0] && between[1] >= charCount) {
           valid++;
         }
   }

 return("Valid number of passwords Pt.1: " + valid);

}

function secondPassPolicy(contentText) {

  var passArray=contentText.split("\n");
 
  var i;
  var line;
  var positions;
  var firstChar;
  var secondChar;
  var char;
  var pass;
  var valid=0;
 
    for (i = 0; i < passArray.length; i++) {

      line=passArray[i].trim().split(" ");
      pass=line[2];
      char=line[1].replace(":","");
      positions=line[0].split("-");

      firstChar=pass.charAt(positions[0] - 1 );
      secondChar=pass.charAt(positions[1] - 1 );

          if((firstChar == char && secondChar != char) || (firstChar != char && secondChar == char)) {
            valid++;
          }
    }
 
  return("Valid number of passwords Pt.2: " + valid);
 
 }