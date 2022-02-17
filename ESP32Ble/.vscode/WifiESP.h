#include <EEPROM.h>
#include <Config.h>
/*Wifi*/
#include <WiFi.h>
//#include <ESP8266WiFi.h>
//#include <WebServer.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include <stdlib.h>
class Wifi
{

public:
    WIFIMODE wifiMode;
    bool APModeConnected;
    bool STAModeConnected;
    String devicename;
    SENSORTYPE sensorType;
    DHCPMODE DHCPMode;
    uint8_t uiSTAPeriodicCheck;
    String STA_IP_Adress;
    String STA_Subnet_Mask;
    String STA_Router_Address;
    Wifi()
    {
        
    }

    void WiFiStationConnected(WiFiEvent_t event, WiFiEventInfo_t info)
    {
        // Serial.println("Connected to the WiFi network");
        stamodeconnected = true;
        uiSTAPeriodicCheck = 0;
    }

    void WiFiStationGotIP(WiFiEvent_t event, WiFiEventInfo_t info)
    {
        // Serial.println("WiFiStationGotIP");
        STA_IP_Adress = WiFi.localIP().toString();
        STA_Subnet_Mask = WiFi.subnetMask().toString();
        STA_Router_Address = WiFi.gatewayIP().toString();
    }
};
