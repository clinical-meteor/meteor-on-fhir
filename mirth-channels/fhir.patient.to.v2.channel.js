var newMessageString = "";


//==================================================================================================
// MSH Segment

// MSH Segment 1 - Field Separator
newMessageString = newMessageString + "MSH|";

// MSH Segment 2 - Encoding Characters
newMessageString = newMessageString + "^~\\&|";

// MSH Segment 3 - Sending Application
newMessageString = newMessageString + "MeteorOnFHIR|";

// MSH Segment 4 - Sending Facility
newMessageString = newMessageString + "|";

// MSH Segment 5 - Receiving Application
newMessageString = newMessageString + "HAPI|";

// MSH Segment 6 - Receiving Facility
newMessageString = newMessageString + "|";

// MSH Segment 7 - Date/Time of Message
var now = new Date();
newMessageString = newMessageString + now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString() + (now.getHours() + 1).toString() + (now.getMinutes() +1).toString() + "|";

// MSH Segment 8 - Security
newMessageString = newMessageString + "|";

// MSH Segment 9 - Message Type
newMessageString = newMessageString + "ADT^A01|";

// MSH Segment 10 - Message Control Id
newMessageString = newMessageString + Math.floor(Math.random() * 100000).toString() + "|";

// MSH Segment 11 - Processing Id
newMessageString = newMessageString + "P|";

// MSH Segment 12 - Version Id
newMessageString = newMessageString + "2.6|";



//==================================================================================================
// PID Segment

newMessageString = newMessageString + "\r";

// PID Segment 1 - Set ID – Patient ID
newMessageString = newMessageString + "PID|";

// PID Segment 2 - Patient ID (External ID)
if (msg.identifier && msg.identifier[0] && msg.identifier[0].value){
	newMessageString = newMessageString + msg.identifier[0].value + "|";
} else {
	newMessageString = newMessageString + "|";
}

// PID Segment 3 - Patient ID (Internal ID)
newMessageString = newMessageString + msg._id + "|";

// PID Segment 4 - Alternate Patient ID – PID
newMessageString = newMessageString + "|";

// PID Segment 5 - Patient Name
if (msg.name && msg.name[0] && msg.name[0].text){
	newMessageString = newMessageString + msg.name[0].text + "|";
} else {
	newMessageString = newMessageString + "|";
}

// PID Segment 6 - Mother’s Maiden Name
newMessageString = newMessageString + "|";

// PID Segment 7 - Date/Time of Birth
if (msg.birthDate){
	newMessageString = newMessageString + msg.birthDate + "|";
} else {
	newMessageString = newMessageString + "|";
}

// PID Segment 8 - Sex
if (msg.gender){
	newMessageString = newMessageString + msg.gender + "|";
} else {
	newMessageString = newMessageString + "|";
}

// PID Segment 9 - Patient Alias
newMessageString = newMessageString + "|";

// PID Segment 10 - Race
newMessageString = newMessageString + "|";

// PID Segment 11 - Patient Address
newMessageString = newMessageString + "|";

// PID Segment 12 - Country Code
newMessageString = newMessageString + "|";

// PID Segment 13 - Phone Number – Home
newMessageString = newMessageString + "|";

// PID Segment 14 - Phone Number – Business
newMessageString = newMessageString + "|";

// PID Segment 15 - Primary Language
newMessageString = newMessageString + "|";

// PID Segment 16 - Marital Status
newMessageString = newMessageString + "|";

// PID Segment 17 - Religion
newMessageString = newMessageString + "|";

// PID Segment 18 - Patient Account Number
newMessageString = newMessageString + "|";

// PID Segment 19 - SSN Number – Patient
newMessageString = newMessageString + "|";

// PID Segment 20 - Driver’s License Number – Patient
newMessageString = newMessageString + "|";

// PID Segment 21 - Mother’s Identifier
newMessageString = newMessageString + "|";

// PID Segment 22 - Ethnic Group
newMessageString = newMessageString + "|";

// PID Segment 23 - Birth Place
newMessageString = newMessageString + "|";

// PID Segment 24 - Multiple Birth Indicator
newMessageString = newMessageString + "|";

// PID Segment 25 - Birth Order
newMessageString = newMessageString + "|";

// PID Segment 26 - Citizenship
newMessageString = newMessageString + "|";

// PID Segment 27 - Veterans Military Status
newMessageString = newMessageString + "|";

// PID Segment 28 - Nationality
newMessageString = newMessageString + "|";

// PID Segment 29 - Patient Death Date and Time
newMessageString = newMessageString + "|";

// PID Segment 30 - Patient Death Indicator
newMessageString = newMessageString + "|";

//convert to string
msg = newMessageString;
