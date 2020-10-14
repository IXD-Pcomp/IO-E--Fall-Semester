void setup() {
   // start serial port at 9600 bps:
   Serial.begin(9600);
}
 
void loop() {
 // this example uses sensors with a range 0-1023
 // to change the range to 0-255, just divide by 4
 //otherwise use the map() method to convert the range 
    for (int thisSensor = 0; thisSensor < 3; thisSensor++) {
      int sensorValue = analogRead(thisSensor);
      Serial.print(sensorValue);
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
      if (thisSensor == 2) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
                  
}
