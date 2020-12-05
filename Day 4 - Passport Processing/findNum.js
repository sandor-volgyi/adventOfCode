//get the text for validation and then posting if valid

function getResults(){

  var contentText=document.getElementById('content-in').value;
      contentText=contentText.trim();

  var passArray=contentText.split("\n");
  var i;
  var line="";
  var passData="";
  var maxCharCount=0;
  var hasallfields=0;
  var valid=0;

  for (i = 0; i < passArray.length; i++) {

    line=passArray[i].trim();
    line = line.replace(/(\r\n|\n|\r)/gm,"");
    passData+=" " + line;
    maxCharCount=line.length;
      if(maxCharCount==0 || i==passArray.length-1) {
        if(passportHasAllData(passData)) {
          hasallfields++;
          if(passportValidate(passData)) {
            //console.log(passData);
            valid++;
          }
        }
        passData="";
      }
  }

  alert(`The number of passports with all the required fields is: ${hasallfields} \n while the fully valid passport number is ${valid}`);

  return(false);
}

//this function is checking only one pass's data.
function passportHasAllData(passText) {

  var valid=0;
  var neededData=["byr","iyr","eyr","hgt","hcl","ecl","pid"];
  var optional="cid";

    if(neededData.every(x => (passText.indexOf(x) > -1))) {
      valid=1;passportValidate
    }

 return(valid);
}


/*
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
      If cm, the number must be at least 150 and at most 193.
      If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
*/

function passportValidate(passText) {

  var field=passText.split(" ");
  var passCol;
  var passIndex;
  var passValue;
  var valid=1;
  var eyeColor=["amb","blu","brn","gry","grn","hzl","oth"];

  for(var i=0; i<field.length; i++) {
    passCol=field[i].trim().split(":");
    if(passCol.length > 1) {
      passIndex=passCol[0].trim();
      passValue=passCol[1].trim();

      switch (passIndex) {

        case "byr":
          if(!(passValue.match(/^\d{4}$/i) && passValue >=1920 && passValue <=2002)) {
            valid=0;
          }
          break;

        case "iyr":
          if(!(passValue.match(/^\d{4}$/i) && passValue >=2010 && passValue <=2020)) {
            valid=0;
          }
          break;

        case "eyr":
          if(!(passValue.match(/^\d{4}$/i) && passValue >=2020 && passValue <=2030)) {
            valid=0;
          }
          break;

        case "hgt":
          if(passValue.match(/cm$/)) {
            passValue=passValue.match(/^(\d{3})cm$/);
            if(!(passValue && passValue[1]>=150 && passValue[1]<=193)) {
              valid=0;
            } else {
              //console.log(passValue);
            }
          } else if (passValue.match(/in$/)) {
            passValue=passValue.match(/^(\d{2})in$/);
            if(!(passValue && passValue[1]>=59 && passValue[1]<=76)) {
              valid=0;
            } else {
              //console.log(passValue);
            }
          } else {
            valid=0;
          }
          break;

        case "hcl":
          if(!(passValue.match(/^#[0-9a-f]{6}$/))) {
            valid=0;
          }
          break;

        case "ecl":
          if(!(eyeColor.includes(passValue))) {
            valid=0;
          }
          break;

        case "pid":
          if(!(passValue.match(/^\d{9}$/i))) {
            valid=0;
          }
          break;

        default:
          // DO NOTHING for now
      } 
    }
  }

  return(valid);

}
