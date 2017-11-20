/* This script and many more are available free online at
The JavaScript Source :: http://www.javascriptsource.com
Created by: Andreas Hörl :: http://www.no-x.net */

function checkICD() {
  var sText = document.myForm.ICDfield.value;
  var ValidChars = "0123456789.";
  var ValidCharsABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ValidCharsPoint = ".";
  var IsICD=true;
  var Char;
  var lengthICD = sText.length;

	 if ( (lengthICD < 3) || (lengthICD == 4) || (lengthICD > 6) ) {
		  if (lengthICD != 0) {
			   IsICD = false;
			 }
		}
  for (i = 0; i < sText.length && IsICD == true; i++) {
    Char = sText.charAt(i);
      if (i == 0) {
      	 if (ValidCharsABC.indexOf(Char) == -1) {
          IsICD = false; }
      }
      if (i == 1 || i == 2) {
      	 if (ValidChars.indexOf(Char) == -1) {
         	IsICD = false;
        }
      }
      if (i == 3) {
      	 if (ValidCharsPoint.indexOf(Char) == -1) {
          IsICD = false;
        }
      }
      if (i == 4) {
      	 if (ValidChars.indexOf(Char) == -1) {
          IsICD = false;
        }
      }
      if (i == 5) {
      	 if (ValidChars.indexOf(Char) == -1) {
          IsICD = false;
        }
      }
    }
	 if (IsICD == false) {
		  alert("Invalid format");
  } else if (i == "") {
		  alert("No code was entered");
	 } else {
		  alert("Valid format");
	 }
  return IsICD;
}
