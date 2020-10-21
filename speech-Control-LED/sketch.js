/*
Serial write example
Sends a byte to a webSocket server which sends the same byte
out through a serial port.
You can use this with the included Arduino example called PhysicalPixel.
Works with P5 editor as the socket/serial server, version 0.5.5 or later.
written 2 Oct 2015
by Tom Igoe
*/
/*
modified Oct 2020 Doug Whitton - this is a mashup of the p5.speech library and p5.serial library

The arduino UNO has the "Physical Pixel" program running, it turns on an LED when the word "on" is spoken, "off" turns off the LED

*/


//Declare a "p5.Speech" object
let myRec;

// Declare a "SerialPort" object
let serial;

// out message is "H" High, sets the LED pin high 
let outMessage = 'H';


//////////////////////////////////////////
// Begin Setup 
//////////////////////////////////////////


function setup() {
 createCanvas(windowWidth, windowHeight);
    
  myRec = new p5.SpeechRec(); 
    // new P5.SpeechRec object
    
  myRec.continuous = true; 
    // do continuous recognition
    
  myRec.interimResults = true; 
    // allow partial recognition (faster, less accurate) 

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
    
  // Change this to the name of your arduino's serial port
  serial.open("/dev/tty.usbmodem1441");

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  
    
 /////////////////////////////////////////
    // Speech Recognition happens here
/////////////////////////////////////////    
  myRec.onResult = parseResult; // recognition callback, see the function below
  myRec.start(); // start engine

}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}


function gotData() {
  let currentString = serial.readLine();  
}


////////////////////////////////////
//end of setup
/////////////////////////////////////


function draw() {
  background(255,255,0);
  fill(0,0,255);
  text("click to change the LED", 10, 10);
}
// When you click on the screen, the server sends H or L out the serial port

function parseResult(){
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
        
  var mostrecentword = myRec.resultString.split(' ').pop();
        
  if(mostrecentword.indexOf("on")!==-1) {serial.write('H')};
        
  console.log("myRec.resultString" + myRec.resultString);

  if(mostrecentword.indexOf("off")!==-1) {serial.write('L')};
        
  console.log("myRec.resultString" + myRec.resultString);
}

function mouseReleased() {
    //This mouse function is used for testing, to get the functionality of the p5.serial library working before adding speech recognition functionality
    
    //console.log("mouseReleased");
  serial.write(outMessage);
  if (outMessage === 'H') {
    outMessage = 'L';
  } else {
    outMessage = 'H';
  }
}