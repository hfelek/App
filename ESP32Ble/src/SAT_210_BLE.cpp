#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <string>
#include <iostream>
#include <sstream>
#include <EEPROM.h>
#include <Task1.h>
#include <Task2.h>
/*Wifi*/
#include <WiFi.h>
//#include <ESP8266WiFi.h>
//#include <WebServer.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
/*Wifi*/

#if CONFIG_FREERTOS_UNICORE
#define ARDUINO_RUNNING_CORE 0
#else
#define ARDUINO_RUNNING_CORE 1
#endif

#define EEPROM_SIZE 512

#if WIFI_ENABLED

#else
#endif

using namespace std;
// uint32_t value = 0;
// DeviceBLE *pMyDevice = nullptr;
void TaskBlink(void *pvParameters);
void BLETASK(void *pvParameters);
void setup()
{

  Serial.begin(115200);
  /***WIFI PART****/

  Serial.println("Serial Port Initialized");
  // Now set up two tasks to run independently.
//   xTaskCreatePinnedToCore(
//       TaskBlink, //TaskFunction
//       "TaskWIFI", // A name just for humans
//       8000,        // This stack size can be checked & adjusted by reading the Stack Highwater
//       NULL,    //Pointer that will be used as the parameter for the task  being created.   
//       3, // Priority, with 3 (configMAX_PRIORITIES - 1) being the highest, and 0 being the lowest.
//       xTaskBlinkHandle, //Used to pass back a handle by which the created task can be referenced.
//       0); //pinnedCoreNum
  xTaskCreatePinnedToCore(
      BLETASK, //TaskFunction
      "AnalogReadA3", //A name just for humans
      64000, // Stack size
      NULL, //Pointer that will be used as the parameter for the task  being created.   
      4, // Priority
      NULL, //Used to pass back a handle by which the created task can be referenced.
      1); //pinnedCoreNum
  
}

void loop()
{
// std::cout << "I am in Arduino Loop" << std::endl;
}

/*--------------------------------------------------*/
/*---------------------- Tasks ---------------------*/
/*--------------------------------------------------*/
