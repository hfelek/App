
#include <Arduino.h>
#define ARDUINOJSON_ENABLE_ARDUINO_STRING 1
#include <ArduinoJson.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <string>
#include <iostream>
#include <sstream>
#include <Characteristics.h>
#include <EEPROM.h>
#include <stdlib.h>
#include <SensorSettings.hpp>
// #if ARDUINOJSON_ENABLE_ARDUINO_STRING
// // #error ARDUINOJSON_ENABLE_ARDUINO_STRING is set to 1, which is OK
// #else
// // #error  ARDUINOJSON_ENABLE_ARDUINO_STRING is set to 0, which is wrong.
// #endif

DeviceBLE *pMyDevice = nullptr;
TickType_t xLastWakeTime;
std::string intToString(int value)
{
  std::string stringIndex;
  std::stringstream ss;
  ss << value;
  ss >> stringIndex;
  return stringIndex;
};
int stringToInt(std::string str)
{
  int value;
  std::stringstream ss;
  ss << str;
  ss >> value;
  return value;
};
union ulfi
{
  unsigned long ul;
  float f;
  int i;
};
int32_t floatToIntBits(float f)
{
  char *c = (char *)&f;
  int32_t i = 0;
  i |= (int32_t)((c[3] << 24) & 0xff000000);
  i |= (int32_t)((c[2] << 16) & 0x00ff0000);
  i |= (int32_t)((c[1] << 8) & 0x0000ff00);
  i |= (int32_t)((c[0]) & 0x000000ff);
  return i;
}
typedef union _uConv_
{
  uint8_t ui8Buff[4];
  float fValue;
  int iValue;
} Conv;
Conv valueConv;
bool initialConnection = false;
//---------------------------

// DynamicJsonDocument doc(15000);
DynamicJsonDocument settingsParametersJSON(10000);
DynamicJsonDocument sensorValuesJson(100);

//---------------------------------------------

void notifyUpdatedConfigurationCharacteristic(int characteristicNumber){

  float customParams[50];//float array for custom params

  DynamicJsonDocument notificationMsg(1024);
  std::string notificatiomMsgString = "";
  switch (characteristicNumber)
  {
  case 0: ////Calibration Parameters + Digitial Input Configuration Is updated (Calibration Params => [358,369] ,  DI Function =>[342,344])

    for (int i = 358; i < 370; i++)
    { /// Calibration Paramters
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    for (int i = 342; i < 345; i++)
    { /// DI Input Paramters
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic1->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic1->notify();

    break;

  case 1: ////Connection Parameters +  Sensor Info Configuration Is updated (Connection Params => [346,357] , Sensor Info Params =>[1,6])
    for (int i = 346; i < 358; i++)
    { /// Calibration Paramters
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    for (int i = 1; i < 7; i++)
    { /// DI Input Paramters
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic2->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic2->notify();

    break;
  case 2: ////  IO Paramters Changed =>[283,292])
    for (int i = 283; i < 293; i++)
    { /// Calibration Paramters
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic3->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic3->notify();

    break;
  case 3: ////  Configuration 1 Changed; Switch Output=>[317,322], Current Output => [293,298] , Linear Coeff=>31 , NonLinear Coeffs => [35,46])
    for (int i = 317; i < 323; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    for (int i = 293; i < 299; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    notificationMsg[intToString(31)] = settingsParametersJSON[intToString(31)];
    for (int i = 35; i < 47; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic4->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic4->notify();

    break;

  case 4: ////  Configuration 2 Changed; Switch Output=>[323,328], Current Output => [299,304] , Linear Coeff=>32 , NonLinear Coeffs => [47,58])

    for (int i = 323; i < 329; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    for (int i = 299; i < 304; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    notificationMsg[intToString(32)] = settingsParametersJSON[intToString(31)];

    for (int i = 47; i < 59; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic5->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic5->notify();
    break;

  case 5: ////  Configuration 3 Changed; Switch Output=>[329,334], Current Output => [305,310] , Linear Coeff=>33 , NonLinear Coeffs => [59,70])

    for (int i = 329; i < 335; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    for (int i = 305; i < 311; i++)
    {
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    notificationMsg[intToString(33)] = settingsParametersJSON[intToString(31)];

    for (int i = 59; i < 71; i++)
    { ///
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic6->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic6->notify();

    break;

  case 6: ////  Configuration 4 Changed; Switch Output=>[335,340], Current Output => [311,316] , Linear Coeff=>34 , NonLinear Coeffs => [71,82])

    for (int i = 335; i < 341; i++)
    {
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    for (int i = 311; i < 317; i++)
    {
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }

    notificationMsg[intToString(34)] = settingsParametersJSON[intToString(31)];

    for (int i = 71; i < 83; i++)
    {
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic7->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic7->notify();

    break;

  case 7: // Configuration 1 Custom Temp Paramaters => [83,132]
    
    for (int i = 0; i < 50; i++)
    {
    customParams[i]=(float)settingsParametersJSON[intToString(i+83)];
    }
    pMyDevice->readParam_Characteristic8->setValue((uint8_t*)customParams,(size_t)200);
    pMyDevice->readParam_Characteristic8->notify();
    break;

  case 8: // Configuration 2 Custom Temp Paramaters => [133,182]

    for (int i = 0; i < 50; i++)
    {
    customParams[i]=(float)settingsParametersJSON[intToString(i+133)];
    }
    pMyDevice->readParam_Characteristic9->setValue((uint8_t*)customParams,(size_t)200);
    pMyDevice->readParam_Characteristic9->notify();
    break;
  case 9: // Configuration 3 Custom Temp Paramaters => [183,232]

    for (int i = 0; i < 50; i++)
    {
    customParams[i]=(float)settingsParametersJSON[intToString(i+183)];
    }
    pMyDevice->readParam_Characteristic10->setValue((uint8_t*)customParams,(size_t)200);
    pMyDevice->readParam_Characteristic10->notify();
    break;
  case 10: // Configuration 4 Custom Temp Paramaters => [233,282]
    for (int i = 0; i < 50; i++)
    {
    customParams[i]=(float)settingsParametersJSON[intToString(i+233)];
    }
    pMyDevice->readParam_Characteristic11->setValue((uint8_t*)customParams,(size_t)200);
    pMyDevice->readParam_Characteristic11->notify();
    break;

  case 11: // Conductivity Input Parameters Changed => [15,30]

    for (int i = 15; i < 31; i++)
    {
      notificationMsg[intToString(i)] = settingsParametersJSON[intToString(i)];
    }
    serializeJson(notificationMsg, notificatiomMsgString);
    pMyDevice->readParam_Characteristic12->setValue(notificatiomMsgString);
    pMyDevice->readParam_Characteristic12->notify();
    break;

  default:
    break;
  }
}

void objectUpdateHandler(uint8_t flagID)
{
  LIMITS_FOR_OUTPUTS *data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)0);
  NONLINEAR_TC_PARAMS dataNonLinearParams = *SettingsHandler.getNonlinearTC_Params((operation_setup_t)0);
  CUSTOM_TC_PARAMS customTemp = *SettingsHandler.getTCCustom_Temperature((operation_setup_t)0);
  CUSTOM_TC_PARAMS customConcentration = *SettingsHandler.getTCCustom_Concentration((operation_setup_t)0);
  CUSTOM_TC_CONDUCTIVITY_PARAMS customConductivity = *SettingsHandler.getTCCustom_Conductivity((operation_setup_t)0);
  CONDUCTIVITY_INPUTS conductivityInputs = *SettingsHandler.getConductivityInputs((operation_setup_t)0);

  switch (flagID)
  {
  case 0: /////////////Correction Paramaters are Updated  + Digital Input

    for (int i = 0; i < 6; i++)
    {
      CORRECTION_SETTINGS *dataCorrection = SettingsHandler.getCorrectionParameters((conductivity_range_t)i);
      settingsParametersJSON[intToString(358 + (2 * i))] = (float)dataCorrection->fMountingFactor;
      settingsParametersJSON[intToString(359 + (2 * i))] = (float)dataCorrection->fZeroPoint;
    }

    settingsParametersJSON[intToString(343)] = SettingsHandler.getDINAssign_HIGH();
    settingsParametersJSON[intToString(344)] = SettingsHandler.getDINAssign_LOW();
    settingsParametersJSON[intToString(342)] = SettingsHandler.getDINFunctionality();

    break;

  case 1: /////////////Communication Paramaters are Updated
    // TODO: WiFi Tarafına Return Typelar İçin Bak
    settingsParametersJSON[intToString(349)] = SettingsHandler.getBLE_CommunicationStatus();
    settingsParametersJSON[intToString(348)] = SettingsHandler.getBLE_TxPwrLevel();
    settingsParametersJSON[intToString(346)] = SettingsHandler.getCommunicationType();
    settingsParametersJSON[intToString(355)] = SettingsHandler.getWiFi_IP();
    settingsParametersJSON[intToString(350)] = SettingsHandler.getWiFiActivation();
    settingsParametersJSON[intToString(351)] = SettingsHandler.getWiFiConnectionMode();
    settingsParametersJSON[intToString(357)] = SettingsHandler.getWiFiRouter();
    settingsParametersJSON[intToString(352)] = SettingsHandler.getWiFiSSID();
    settingsParametersJSON[intToString(356)] = SettingsHandler.getWiFiSubnet();
    settingsParametersJSON[intToString(345)] = SettingsHandler.getDisplayBacklight();
    // settingsParametersJSON[intToString(349)] = Language.Data.DeviceLanguage; Device Language Mobil Appde Yok
    settingsParametersJSON[intToString(4)] = SensorInformation.Data.cSensorTagKey;
    // settingsParametersJSON[intToString(349)] = SensorInformation.Data.eMeasurementRange;
    // settingsParametersJSON[intToString(349)] = SensorInformation.Data.eUserInterface;
    // settingsParametersJSON[intToString(349)] = SensorInformation.Data.eWirelessConnection;
    settingsParametersJSON[intToString(5)] = SensorInformation.Data.fHardwareVersion;
    settingsParametersJSON[intToString(6)] = SensorInformation.Data.fSoftwareVersion;
    // settingsParametersJSON[intToString(349)] = SensorInformation.Data.eAutomaticCalibration;

    // En Son Notify Functionı Çağıralacak
    break;
  case 2: /////////////IOSetting Paramaters are Updated
    // IO1
    settingsParametersJSON[intToString(283)] = SettingsHandler.getOperationMode_IO1();
    settingsParametersJSON[intToString(284)] = SettingsHandler.getCurrentOutputAssign_IO1();
    // SettingsHandler.getProcessVariable_IO1(); Bunu Anlamadım
    settingsParametersJSON[intToString(286)] = SettingsHandler.getSwitchOutputAssign_IO1();
    settingsParametersJSON[intToString(287)] = SettingsHandler.getSwitchOutputFunction_IO1();
    settingsParametersJSON[intToString(285)] = SettingsHandler.getSwitchOutputType_IO1();

    // IO2
    settingsParametersJSON[intToString(288)] = SettingsHandler.getOperationMode_IO2();
    settingsParametersJSON[intToString(289)] = SettingsHandler.getCurrentOutputAssign_IO2();
    // SettingsHandler.getProcessVariable_IO1(); Bunu Anlamadım
    settingsParametersJSON[intToString(291)] = SettingsHandler.getSwitchOutputAssign_IO2();
    settingsParametersJSON[intToString(292)] = SettingsHandler.getSwitchOutputFunction_IO2();
    settingsParametersJSON[intToString(290)] = SettingsHandler.getSwitchOutputType_IO2();

    ////////Burada Appe Notify Et Functionı Çağırılacak
    break;

  case 3: /////////////Switch-Current Output-Temperature Coeff Linear-Temp Coeff Non-Linear Config 1 Paramaters are Updated
    data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)0);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(317 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(318 + 2 * i)] = data[i].fUpper;
    };
    data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)0);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(293 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(294 + 2 * i)] = data[i].fUpper;
    };

    settingsParametersJSON[intToString(31)] = SettingsHandler.getTemperatureCoefficientLinear((operation_setup_t)0);

    dataNonLinearParams = *SettingsHandler.getNonlinearTC_Params((operation_setup_t)0);

    for (int k = 0; k < 6; k++)
    {
      settingsParametersJSON[intToString(41 + k)] = dataNonLinearParams.coefficients[k];
      settingsParametersJSON[intToString(35 + k)] = dataNonLinearParams.temperatures[k];
    }

    /////////Notify For Cnfiguration 1 Will Be Handled Here

    break;
  case 4: /////////////Switch-Current Output-Temperature Coeff Linear-Temp Coeff Non-Linear Config 2 Paramaters are Updated

    data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)1);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(323 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(324 + 2 * i)] = data[i].fUpper;
    };
    data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)1);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(299 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(300 + 2 * i)] = data[i].fUpper;
    };

    settingsParametersJSON[intToString(32)] = SettingsHandler.getTemperatureCoefficientLinear((operation_setup_t)1);

    dataNonLinearParams = *SettingsHandler.getNonlinearTC_Params((operation_setup_t)1);

    for (int k = 0; k < 6; k++)
    {
      settingsParametersJSON[intToString(53 + k)] = dataNonLinearParams.coefficients[k];
      settingsParametersJSON[intToString(47 + k)] = dataNonLinearParams.temperatures[k];
    }
    /////////Notify For Cnfiguration 2 Will Be Handled Here

    break;

  case 5: /////////////Switch-Current Output-Temperature Coeff Linear-Temp Coeff Non-Linear Config 3 Paramaters are Updated

    data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)2);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(329 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(330 + 2 * i)] = data[i].fUpper;
    };
    data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)2);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(305 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(306 + 2 * i)] = data[i].fUpper;
    };

    settingsParametersJSON[intToString(33)] = SettingsHandler.getTemperatureCoefficientLinear((operation_setup_t)2);

    dataNonLinearParams = *SettingsHandler.getNonlinearTC_Params((operation_setup_t)2);

    for (int k = 0; k < 6; k++)
    {
      settingsParametersJSON[intToString(65 + k)] = dataNonLinearParams.coefficients[k];
      settingsParametersJSON[intToString(59 + k)] = dataNonLinearParams.temperatures[k];
    }
    break;
  case 6: /////////////Switch-Current Output-Temperature Coeff Linear-Temp Coeff Non-Linear Config 4 Paramaters are Updated

    data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)3);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(335 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(336 + 2 * i)] = data[i].fUpper;
    };
    data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)3);
    for (int i = 0; i < 3; i++)
    {
      settingsParametersJSON[intToString(311 + 2 * i)] = data[i].fLower;
      settingsParametersJSON[intToString(312 + 2 * i)] = data[i].fUpper;
    };

    settingsParametersJSON[intToString(34)] = SettingsHandler.getTemperatureCoefficientLinear((operation_setup_t)3);

    dataNonLinearParams = *SettingsHandler.getNonlinearTC_Params((operation_setup_t)3);

    for (int k = 0; k < 6; k++)
    {
      settingsParametersJSON[intToString(77 + k)] = dataNonLinearParams.coefficients[k];
      settingsParametersJSON[intToString(71 + k)] = dataNonLinearParams.temperatures[k];
    }
    break;
  case 7: /////////////Custom Temperature Coefficients Config 1
    customTemp = *SettingsHandler.getTCCustom_Temperature((operation_setup_t)0);
    customConcentration = *SettingsHandler.getTCCustom_Concentration((operation_setup_t)0);
    customConductivity = *SettingsHandler.getTCCustom_Conductivity((operation_setup_t)0);

    settingsParametersJSON[intToString(83)] = customTemp.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(85 + i)] = customTemp.fEntries[i];
    }

    settingsParametersJSON[intToString(84)] = customConcentration.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(91 + i)] = customConcentration.fEntries[i];
    }

    for (int i = 0; i < customConcentration.ui8NumberOfPoints * customTemp.ui8NumberOfPoints; i++)
    {
      settingsParametersJSON[intToString(97 + i)] = customConductivity.fEntries[i];
    }

    /// Buraya Notify Yap Func Yazılacak for Config 1 Custom Temp Params

    break;
  case 8: /////////////Custom Temperature Coefficients Config 2
    customTemp = *SettingsHandler.getTCCustom_Temperature((operation_setup_t)1);
    customConcentration = *SettingsHandler.getTCCustom_Concentration((operation_setup_t)1);
    customConductivity = *SettingsHandler.getTCCustom_Conductivity((operation_setup_t)1);

    settingsParametersJSON[intToString(133)] = customTemp.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(135 + i)] = customTemp.fEntries[i];
    }

    settingsParametersJSON[intToString(134)] = customConcentration.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(141 + i)] = customConcentration.fEntries[i];
    }

    for (int i = 0; i < customConcentration.ui8NumberOfPoints * customTemp.ui8NumberOfPoints; i++)
    {
      settingsParametersJSON[intToString(147 + i)] = customConductivity.fEntries[i];
    }

    /// Buraya Notify Yap Func Yazılacak for Config 2 Custom Temp Params    break;
  case 9: /////////////Custom Temperature Coefficients Config 3
    customTemp = *SettingsHandler.getTCCustom_Temperature((operation_setup_t)2);
    customConcentration = *SettingsHandler.getTCCustom_Concentration((operation_setup_t)2);
    customConductivity = *SettingsHandler.getTCCustom_Conductivity((operation_setup_t)2);

    settingsParametersJSON[intToString(183)] = customTemp.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(185 + i)] = customTemp.fEntries[i];
    }

    settingsParametersJSON[intToString(184)] = customConcentration.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(191 + i)] = customConcentration.fEntries[i];
    }

    for (int i = 0; i < customConcentration.ui8NumberOfPoints * customTemp.ui8NumberOfPoints; i++)
    {
      settingsParametersJSON[intToString(197 + i)] = customConductivity.fEntries[i];
    }

    /// Buraya Notify Yap Func Yazılacak for Config 3 Custom Temp Params    break;
  case 10: /////////////Custom Temperature Coefficients Config 4
    customTemp = *SettingsHandler.getTCCustom_Temperature((operation_setup_t)3);
    customConcentration = *SettingsHandler.getTCCustom_Concentration((operation_setup_t)3);
    customConductivity = *SettingsHandler.getTCCustom_Conductivity((operation_setup_t)3);

    settingsParametersJSON[intToString(233)] = customTemp.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(235 + i)] = customTemp.fEntries[i];
    }

    settingsParametersJSON[intToString(234)] = customConcentration.ui8NumberOfPoints;
    for (int i = 0; i < 6; i++)
    {
      settingsParametersJSON[intToString(241 + i)] = customConcentration.fEntries[i];
    }

    for (int i = 0; i < customConcentration.ui8NumberOfPoints * customTemp.ui8NumberOfPoints; i++)
    {
      settingsParametersJSON[intToString(247 + i)] = customConductivity.fEntries[i];
    }
    break;
  case 11: /////////////Conductivity Input Paramaters are Updated
    for (int i = 0; i < 4; i++)
    {
      conductivityInputs = *SettingsHandler.getConductivityInputs((operation_setup_t)i);
      settingsParametersJSON[intToString(15 + i * 4)] = conductivityInputs.eConductivityRange;
      settingsParametersJSON[intToString(16 + i * 4)] = conductivityInputs.eTemperatureCompensationType;
      settingsParametersJSON[intToString(17 + i * 4)] = conductivityInputs.fReferenceTemperature;
      settingsParametersJSON[intToString(18 + i * 4)] = conductivityInputs.ui8FilterTimeConstant;
    }
    break;

  default:
    break;
  }
};
// DynamicJsonDocument msgObject(512);
void setByKey(JsonObject documentRoot, int uintKeyValue)
{
  std::cout << uintKeyValue << std::endl;
  std::cout << "I am in Function" << std::endl;
  if (uintKeyValue == 1) // Case Prodcut Name
  {                      // std::cout << documentRoot[intToString(uintKeyValue)] << std::endl;
  }
  else if (uintKeyValue == 2) // Case Product ID
  {
  }
  else if (uintKeyValue == 3) // Case Product Text
  {
  }
  else if (uintKeyValue == 4) // Case Specific Application Tag
  {
  }
  else if (uintKeyValue == 5) // Hardware Revision
  {
  }
  else if (uintKeyValue == 6) // Firmware Revision
  {
  }
  else if (uintKeyValue == 7) // Active Configuration
  {
    uint8_t DataOperationSetup = (uint8_t)documentRoot[intToString(uintKeyValue)];
    // std::cout << DataOperationSetup <<std::endl;
    SettingsHandler.setOperationSetup(DataOperationSetup);
  }
  else if (uintKeyValue == 8) // Reference Temperature
  {
    temperature_unit_t DataTemp = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setOperationSetup((uint8_t *)&DataTemp);
  }
  else if (uintKeyValue == 9) // Actual Diagnostics
  {
  }
  else if (uintKeyValue == 10) // Last Diagnostics
  {
  }
  else if (uintKeyValue == 11) // Simulation Process Variable
  {
  }
  else if (uintKeyValue >= 12 && uintKeyValue <= 14) // Simulation Process Variable Values (Cond / Conc/ Temp)
  {
  }
  else if (uintKeyValue >= 15 && uintKeyValue <= 30) // Conductivity Input Variables
  {
    if (uintKeyValue >= 15 && uintKeyValue <= 18)
    {
      pCONDUCTIVITY_INPUTS cond_obj = SettingsHandler.getConductivityInputs((operation_setup_t)0);
      std::string stringIndex = intToString(uintKeyValue);
      switch (uintKeyValue)
      {
      case 15:
        cond_obj->eConductivityRange = documentRoot[stringIndex];
        break;
      case 16:
        cond_obj->eTemperatureCompensationType = documentRoot[stringIndex];
        break;
      case 17:
        cond_obj->fReferenceTemperature = documentRoot[stringIndex];
        break;
      case 18:
        cond_obj->ui8FilterTimeConstant = documentRoot[stringIndex];
        break;
      default:
        break;
      }
      SettingsHandler.setConductivityInputs((operation_setup_t)0, (uint8_t *)cond_obj);
    }
    else if (uintKeyValue >= 19 && uintKeyValue <= 22)
    {
      pCONDUCTIVITY_INPUTS cond_obj = SettingsHandler.getConductivityInputs((operation_setup_t)1);
      std::string stringIndex = intToString(uintKeyValue);
      switch (uintKeyValue)
      {
      case 19:
        cond_obj->eConductivityRange = documentRoot[stringIndex];
        break;
      case 20:
        cond_obj->eTemperatureCompensationType = documentRoot[stringIndex];
        break;
      case 21:
        cond_obj->fReferenceTemperature = documentRoot[stringIndex];
        break;
      case 22:
        cond_obj->ui8FilterTimeConstant = documentRoot[stringIndex];
        break;
      default:
        break;
      }
      SettingsHandler.setConductivityInputs((operation_setup_t)1, (uint8_t *)cond_obj);
    }
    else if (uintKeyValue >= 23 && uintKeyValue <= 26)
    {
      pCONDUCTIVITY_INPUTS cond_obj = SettingsHandler.getConductivityInputs((operation_setup_t)2);
      std::string stringIndex = intToString(uintKeyValue);

      switch (uintKeyValue)
      {
      case 23:
        cond_obj->eConductivityRange = documentRoot[stringIndex];
        break;
      case 24:
        cond_obj->eTemperatureCompensationType = documentRoot[stringIndex];
        break;
      case 25:
        cond_obj->fReferenceTemperature = documentRoot[stringIndex];
        break;
      case 26:
        cond_obj->ui8FilterTimeConstant = documentRoot[stringIndex];
        break;
      default:
        break;
      }
      SettingsHandler.setConductivityInputs((operation_setup_t)2, (uint8_t *)cond_obj);
    }
    else if (uintKeyValue >= 27 && uintKeyValue <= 30)
    {
      pCONDUCTIVITY_INPUTS cond_obj = SettingsHandler.getConductivityInputs((operation_setup_t)3);
      std::string stringIndex = intToString(uintKeyValue);
      switch (uintKeyValue)
      {
      case 27:
        cond_obj->eConductivityRange = documentRoot[stringIndex];
        break;
      case 28:
        cond_obj->eTemperatureCompensationType = documentRoot[stringIndex];
        break;
      case 29:
        cond_obj->fReferenceTemperature = documentRoot[stringIndex];
        break;
      case 30:
        cond_obj->ui8FilterTimeConstant = documentRoot[stringIndex];
        break;
      default:
        break;
      }
      SettingsHandler.setConductivityInputs((operation_setup_t)3, (uint8_t *)cond_obj);
    }
  }
  else if (uintKeyValue >= 31 && uintKeyValue <= 34) // Temperature Coefficient Linears ///Burada SIkıntı Var
  {
    operation_setup_t configNum = (operation_setup_t)(uintKeyValue - 31);
    float linearCoeffData = documentRoot[intToString(uintKeyValue)];
    // SettingsHandler.setTemperatureCoefficientLinear(configNum,(float *)documentRoot[intToString(uintKeyValue)]);
    SettingsHandler.setTemperatureCoefficientLinear(configNum, &linearCoeffData);
  }
  else if (uintKeyValue >= 35 && uintKeyValue <= 82) // Temperature Coefficients Non-Linears
  {
    if (uintKeyValue >= 35 && uintKeyValue <= 46)
    {
      operation_setup_t configNum = (operation_setup_t)0;
      NONLINEAR_TC_PARAMS nonLinearParamsObj = *SettingsHandler.getNonlinearTC_Params(configNum);

      if (uintKeyValue <= 40)
      {
        nonLinearParamsObj.temperatures[uintKeyValue - 35] = (float)documentRoot[intToString(uintKeyValue)];
      }
      else
      {
        nonLinearParamsObj.coefficients[uintKeyValue - 41] = (float)documentRoot[intToString(uintKeyValue)];
      }
      SettingsHandler.setNonlinearTC_Params(configNum, (uint8_t *)&nonLinearParamsObj);
    }
    else if (uintKeyValue >= 47 && uintKeyValue <= 58)
    {
      operation_setup_t configNum = (operation_setup_t)1;
      NONLINEAR_TC_PARAMS nonLinearParamsObj = *SettingsHandler.getNonlinearTC_Params(configNum);
      if (uintKeyValue <= 53)
      {
        nonLinearParamsObj.temperatures[uintKeyValue - 47] = documentRoot[intToString(uintKeyValue)];
      }
      else
      {
        nonLinearParamsObj.coefficients[uintKeyValue - 53] = documentRoot[intToString(uintKeyValue)];
      }
      SettingsHandler.setNonlinearTC_Params(configNum, (uint8_t *)&nonLinearParamsObj);
    }
    else if (uintKeyValue >= 59 && uintKeyValue <= 70)
    {
      operation_setup_t configNum = (operation_setup_t)2;
      NONLINEAR_TC_PARAMS nonLinearParamsObj = *SettingsHandler.getNonlinearTC_Params(configNum);
      if (uintKeyValue <= 64)
      {
        nonLinearParamsObj.temperatures[uintKeyValue - 59] = documentRoot[intToString(uintKeyValue)];
      }
      else
      {
        nonLinearParamsObj.coefficients[uintKeyValue - 65] = documentRoot[intToString(uintKeyValue)];
      }
      SettingsHandler.setNonlinearTC_Params(configNum, (uint8_t *)&nonLinearParamsObj);
    }
    else if (uintKeyValue >= 71 && uintKeyValue <= 82)
    {
      operation_setup_t configNum = (operation_setup_t)3;
      NONLINEAR_TC_PARAMS nonLinearParamsObj = *SettingsHandler.getNonlinearTC_Params(configNum);
      if (uintKeyValue <= 76)
      {
        nonLinearParamsObj.temperatures[uintKeyValue - 71] = documentRoot[intToString(uintKeyValue)];
      }
      else
      {
        nonLinearParamsObj.coefficients[uintKeyValue - 77] = documentRoot[intToString(uintKeyValue)];
      }
      SettingsHandler.setNonlinearTC_Params(configNum, (uint8_t *)&nonLinearParamsObj);
    }
  }
  else if (uintKeyValue >= 501 && uintKeyValue <= 504) //////Temperature Coefficients Custom with One Index
  {
   
      operation_setup_t configNum = operation_setup_t(uintKeyValue-501);
      CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
      CUSTOM_TC_PARAMS concObj = *SettingsHandler.getTCCustom_Concentration(configNum);
      ulfi tempPointNumbers;
      ulfi concPointNumbers;

      std::string msgString = documentRoot[intToString(uintKeyValue)];
      std::stringstream ss(msgString.substr(0,8));
      ss >> std::hex >> tempPointNumbers.i;
      std::stringstream ss1(msgString.substr(8,8));
      ss1 >> std::hex >> concPointNumbers.i;
      int nrOfConductivityPoints = concPointNumbers.i*tempPointNumbers.i;
      tempObj.ui8NumberOfPoints=tempPointNumbers.i;
      concObj.ui8NumberOfPoints = concPointNumbers.i;

      for(int i= 0;i<tempPointNumbers.i;i++){       ///Set Temperature Points
        std::stringstream ssfloat(msgString.substr((8*(i+2)),8));
        ssfloat >> std::hex >> tempObj.fEntries[i] ;
      }
       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);

      for(int i= 0;i<concPointNumbers.i;i++){       ///Set Concentration Points
        std::stringstream ssfloat(msgString.substr((8*(i+2+tempPointNumbers.i)),8));
        ssfloat >> std::hex >> concObj.fEntries[i] ;
      }
      SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&concObj);
      

      for(int i= 0;i<nrOfConductivityPoints;i++){       ///Set Conductivity Points
        ulfi conductivityPoint;
        std::stringstream ssfloat(msgString.substr((8*(tempPointNumbers.i+concPointNumbers.i+nrOfConductivityPoints+2)),8));
        ssfloat >> std::hex >> conductivityPoint.f;
        SettingsHandler.setTCCustom_Conductivity(configNum,i, &conductivityPoint.f);
      }
     

      std::cout << tempPointNumbers.i << std::endl;
      std::cout << concPointNumbers.i << std::endl;
    

  }
  // else if (uintKeyValue >= 83 && uintKeyValue <= 282) // Temperature Coefficients Custom
  // {
  //   if (uintKeyValue >= 83 && uintKeyValue <= 132)
  //   {
  //     operation_setup_t configNum = (operation_setup_t)0;
  //     if (uintKeyValue == 83)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue == 84)
  //     {
  //       CUSTOM_TC_PARAMS concentrObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       concentrObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&concentrObj);
  //     }

  //     else if (uintKeyValue >= 85 && uintKeyValue <= 90)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 85] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 91 && uintKeyValue <= 96)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Concentration(configNum);
  //       tempObj.fEntries[uintKeyValue - 91] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 97 && uintKeyValue <= 132)
  //     {
  //       // CUSTOM_TC_CONDUCTIVITY_PARAMS co = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       // tempObj.fEntries[uintKeyValue - 85] = documentRoot[intToString(uintKeyValue)];
  //       float value = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Conductivity(configNum, uintKeyValue - 97, &value);
  //     }
  //   }
  //   else if (uintKeyValue >= 133 && uintKeyValue <= 182)
  //   {

  //     operation_setup_t configNum = (operation_setup_t)1;
  //     if (uintKeyValue == 133)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue == 134)
  //     {
  //       CUSTOM_TC_PARAMS concentrObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       concentrObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&concentrObj);
  //     }

  //     else if (uintKeyValue >= 135 && uintKeyValue <= 140)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 135] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 141 && uintKeyValue <= 146)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 141] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 147 && uintKeyValue <= 182)
  //     {
  //       // CUSTOM_TC_CONDUCTIVITY_PARAMS co = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       // tempObj.fEntries[uintKeyValue - 85] = documentRoot[intToString(uintKeyValue)];
  //       float value = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Conductivity(configNum, uintKeyValue - 147, &value);
  //     }
  //   }
  //   else if (uintKeyValue >= 183 && uintKeyValue <= 232)
  //   {
  //     operation_setup_t configNum = (operation_setup_t)2;
  //     if (uintKeyValue == 183)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue == 184)
  //     {
  //       CUSTOM_TC_PARAMS concentrObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       concentrObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&concentrObj);
  //     }

  //     else if (uintKeyValue >= 185 && uintKeyValue <= 190)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 185] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 191 && uintKeyValue <= 196)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 191] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 197 && uintKeyValue <= 232)
  //     {
  //       // CUSTOM_TC_CONDUCTIVITY_PARAMS co = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       // tempObj.fEntries[uintKeyValue - 85] = documentRoot[intToString(uintKeyValue)];
  //       float value = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Conductivity(configNum, uintKeyValue - 197, &value);
  //     }
  //   }
  //   else if (uintKeyValue >= 233 && uintKeyValue <= 282)
  //   {
  //     operation_setup_t configNum = (operation_setup_t)3;
  //     if (uintKeyValue == 233)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue == 234)
  //     {
  //       CUSTOM_TC_PARAMS concentrObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       concentrObj.ui8NumberOfPoints = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Concentration(configNum, (uint8_t *)&concentrObj);
  //     }

  //     else if (uintKeyValue >= 235 && uintKeyValue <= 240)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 235] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 241 && uintKeyValue <= 246)
  //     {
  //       CUSTOM_TC_PARAMS tempObj = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       tempObj.fEntries[uintKeyValue - 241] = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Temperature(configNum, (uint8_t *)&tempObj);
  //     }
  //     else if (uintKeyValue >= 247 && uintKeyValue <= 282)
  //     {
  //       // CUSTOM_TC_CONDUCTIVITY_PARAMS co = *SettingsHandler.getTCCustom_Temperature(configNum);
  //       // tempObj.fEntries[uintKeyValue - 85] = documentRoot[intToString(uintKeyValue)];
  //       float value = documentRoot[intToString(uintKeyValue)];
  //       SettingsHandler.setTCCustom_Conductivity(configNum, uintKeyValue - 247, &value);
  //     }
  //   }
  // }
  else if (uintKeyValue >= 283 && uintKeyValue <= 287) // Operation Mode 1
  {
    if (uintKeyValue == 283)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setSwitchOutputFunction_IO1((uint8_t *)&data);
    }
    else if (uintKeyValue == 284)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setSwitchOutputFunction_IO1((uint8_t *)&data);
    }
    else if (uintKeyValue == 285)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setSwitchOutputFunction_IO1((uint8_t *)&data);
    }
    else if (uintKeyValue == 286)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setSwitchOutputFunction_IO1((uint8_t *)&data);
    }
    else if (uintKeyValue == 287)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setSwitchOutputFunction_IO1((uint8_t *)&data);
    }
  }
  else if (uintKeyValue >= 288 && uintKeyValue <= 292) // Operation Mode 2
  {
    if (uintKeyValue == 288)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setOperationMode_IO2((uint8_t *)&data);
    }
    else if (uintKeyValue == 289)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setOperationMode_IO2((uint8_t *)&data);
    }
    else if (uintKeyValue == 290)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setOperationMode_IO2((uint8_t *)&data);
    }
    else if (uintKeyValue == 291)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setOperationMode_IO2((uint8_t *)&data);
    }
    else if (uintKeyValue == 292)
    {
      uint8_t data = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setOperationMode_IO2((uint8_t *)&data);
    }
  }
  else if (uintKeyValue >= 293 && uintKeyValue <= 316) // Current Output
  {
    uint8_t index;

    if (uintKeyValue >= 293 && uintKeyValue <= 298)
    {
      if (uintKeyValue == 293 || uintKeyValue == 294)
      {
        index = 0;
      }
      else if (uintKeyValue == 295 || uintKeyValue == 296)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)0);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setCurrentOutputLimits((operation_setup_t)0, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 299 && uintKeyValue <= 304)
    {
      if (uintKeyValue == 299 || uintKeyValue == 300)
      {
        index = 0;
      }
      else if (uintKeyValue == 301 || uintKeyValue == 302)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)1);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setCurrentOutputLimits((operation_setup_t)1, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 305 && uintKeyValue <= 310)
    {
      if (uintKeyValue == 305 || uintKeyValue == 306)
      {
        index = 0;
      }
      else if (uintKeyValue == 307 || uintKeyValue == 308)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)2);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setCurrentOutputLimits((operation_setup_t)2, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 311 && uintKeyValue <= 316)
    {
      if (uintKeyValue == 311 || uintKeyValue == 312)
      {
        index = 0;
      }
      else if (uintKeyValue == 313 || uintKeyValue == 314)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getCurrentOutputLimits((operation_setup_t)3);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setCurrentOutputLimits((operation_setup_t)3, (uint8_t *)&data);
    }
  }
  else if (uintKeyValue >= 317 && uintKeyValue <= 340) // Switch Output
  {
    uint8_t index;
    if (uintKeyValue >= 317 && uintKeyValue <= 322)
    {
      if (uintKeyValue == 317 || uintKeyValue == 318)
      {
        index = 0;
      }
      else if (uintKeyValue == 319 || uintKeyValue == 320)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)0);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setSwitchOutputLimits((operation_setup_t)0, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 323 && uintKeyValue <= 328)
    {
      if (uintKeyValue == 323 || uintKeyValue == 324)
      {
        index = 0;
      }
      else if (uintKeyValue == 325 || uintKeyValue == 326)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)1);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setSwitchOutputLimits((operation_setup_t)1, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 329 && uintKeyValue <= 334)
    {
      if (uintKeyValue == 329 || uintKeyValue == 330)
      {
        index = 0;
      }
      else if (uintKeyValue == 331 || uintKeyValue == 332)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)2);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setSwitchOutputLimits((operation_setup_t)2, (uint8_t *)&data);
    }
    else if (uintKeyValue >= 335 && uintKeyValue <= 340)
    {
      if (uintKeyValue == 335 || uintKeyValue == 336)
      {
        index = 0;
      }
      else if (uintKeyValue == 337 || uintKeyValue == 338)
      {
        index = 1;
      }
      else
      {
        index = 2;
      }
      LIMITS_FOR_OUTPUTS *data = SettingsHandler.getSwitchOutputLimits((operation_setup_t)3);
      uintKeyValue % 2 == 0 ? data[index].fUpper = documentRoot[intToString(uintKeyValue)] : data[index].fLower = documentRoot[intToString(uintKeyValue)]; // Buradan Emin Değilim Çalışmayabilir, Teset Etmek Lazım.
      SettingsHandler.setSwitchOutputLimits((operation_setup_t)3, (uint8_t *)&data);
    }
  }
  else if (uintKeyValue >= 341 && uintKeyValue <= 344) // Digital Input
  {
    uint8_t data = (uint8_t)documentRoot[intToString(uintKeyValue)];
    switch (uintKeyValue)
    {
    // case 341:  //DIINPUT STATUS

    //   break;
    case 342: ////DIINPUT Function
      break;
    case 343: // D-IN State:High
      SettingsHandler.setDINAssign_HIGH((uint8_t *)&data);
      break;
    case 344: // D-IN State:Low
      SettingsHandler.setDINAssign_LOW((uint8_t)data);
      break;
    default:
      break;
    }
  }
  else if (uintKeyValue == 345) // Display
  {
  }
  else if (uintKeyValue == 346) // Communication Type
  {
    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setCommunicationType((uint8_t *)&data);
  }
  else if (uintKeyValue == 347) // BLE Function
  {
  }
  else if (uintKeyValue == 348) // BLE Tx Power Level
  {
    SettingsHandler.setBLE_TxPwrLevel((uint8_t)documentRoot[intToString(uintKeyValue)]);
  }
  else if (uintKeyValue == 349) // BLE Conenction Status
  {
  }
  else if (uintKeyValue == 350) // WiFi Function
  {
  }
  else if (uintKeyValue == 351) // WiFi Mode
  {
    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiConnectionMode((uint8_t *)&data);
  }
  else if (uintKeyValue == 352) // SSID
  {
    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiSSID((uint8_t *)&data);
  }
  else if (uintKeyValue == 353) // Password
  {
    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiPassword((uint8_t *)&data);
  }
  else if (uintKeyValue == 354) // Configuration IPv4
  {
    std::cout << "I am Here 3" << std::endl;

    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setIP_ConfigurationMode((uint8_t *)&data);
  }
  else if (uintKeyValue == 355) // IP Address

  {
    std::cout << "I am Herekekw" << std::endl;
    uint8_t data = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiSSID((uint8_t *)&data);
  }
  else if (uintKeyValue == 356) // Subnet Address
  {
    uint8_t data10 = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiSubnet((uint8_t *)&data10);
  }
  else if (uintKeyValue == 357) // Router Address
  {
    std::cout << "I am Here 2" << std::endl;

    uint8_t data11 = documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setWiFiRouter((uint8_t *)&data11);
  }
  else if (uintKeyValue >= 358 && uintKeyValue <= 369) // Conductivity Ranges
  {
    conductivity_range_t rangeNum;
    if (uintKeyValue == 358 || uintKeyValue == 359)
    {
      rangeNum = (conductivity_range_t)0;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 358 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
    else if (uintKeyValue == 360 || uintKeyValue <= 361)
    {
      rangeNum = (conductivity_range_t)1;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 360 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
    else if (uintKeyValue == 362 || uintKeyValue <= 363)
    {
      rangeNum = (conductivity_range_t)2;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 362 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
    else if (uintKeyValue == 364 || uintKeyValue <= 365)
    {
      rangeNum = (conductivity_range_t)3;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 364 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
    else if (uintKeyValue == 366 || uintKeyValue <= 367)
    {
      rangeNum = (conductivity_range_t)4;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 366 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
    else if (uintKeyValue == 368 || uintKeyValue <= 369)
    {
      rangeNum = (conductivity_range_t)5;
      CORRECTION_SETTINGS *data = SettingsHandler.getCorrectionParameters(conductivity_range_t(rangeNum));
      uintKeyValue == 368 ? data->fMountingFactor = documentRoot[intToString(uintKeyValue)] : data->fZeroPoint = documentRoot[intToString(uintKeyValue)];
      SettingsHandler.setCorrectionParameters(rangeNum, (uint8_t *)&data);
    }
  }
  else if (uintKeyValue == 370) // Device Auto Calibration
  {
  }
  else if (uintKeyValue == 371) // Set Access Code
  {
    uint8_t data = (uint8_t)documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setSystemDefineAccessCode((uint8_t *)&data);
  }
  else if (uintKeyValue == 372) // Access Code
  {
    uint8_t data = (uint8_t)documentRoot[intToString(uintKeyValue)];
    SettingsHandler.setSystemEnterAccessCode((uint8_t *)&data);
  }
  else if (uintKeyValue == 373) // Device Restore Factory
  {
  }
  else if (uintKeyValue == 374) // Device Auto Calibration
  {
  }
  else if (uintKeyValue == 375) // WiFi Parameters Restore
  {
  }
  else if (uintKeyValue == 376) // Restart
  {
  }
  else{
    ///do null
  }
}


StaticJsonDocument<1500> msgObject;
JsonObject documentRoot;
std::string key;
uint16_t uintKeyValue;
void HandleWrittenCommand(std::string msg, std::string chracteriscticUUID)
{
  std::cout << "HandleWriteCommand" << std::endl;
  if (chracteriscticUUID == CHARACTERISTIC_UUID_WRITE_COMMAND) // Write Comamnd Service Write Characteristic
  {
    try
    {
      //   DynamicJsonDocument msgObject(512);
      deserializeJson(msgObject, msg);
      serializeJson(msgObject, Serial);
      std::string pageName = msgObject[BLE_PARAMETERS_PAGE_STRING];

      documentRoot = msgObject[BLE_PARAMETERS_KEY_STRING].as<JsonObject>();
      serializeJson(documentRoot, Serial);
      // for (JsonPair keyValue : documentRoot)
      // { //////////Burası Çalışıyor Data Büyüklüğü Önemli Değil
      //   key = keyValue.key().c_str();
      //    std::cout << key << std::endl;
      //   // std::cout << documentRoot[key] << std::endl;
      // }
      for (JsonPair keyValue : documentRoot)
      {
        key = keyValue.key().c_str();
        uintKeyValue = stringToInt(key);
        {
          std::cout << key << std::endl;
        }
        setByKey(documentRoot, uintKeyValue);
      }
    }
    catch (const std::exception &e)
    {
      std::cerr << e.what() << '\n';
      std::cout << "BLE MESSAGE COULDN'T BE  HANDLED" << std::endl;
    }
  }
}
class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    pMyDevice->deviceConnected = true;
    initialConnection = true;
  };

  void onDisconnect(BLEServer *pServer)
  {
    pMyDevice->deviceConnected = false;
    initialConnection = false;
    Serial.println("Started Advertising");
    pMyDevice->pServer->startAdvertising(); // restart advertising
  }
};
class MyCharacteristicCallbacks : public BLECharacteristicCallbacks
{
  void onRead(BLECharacteristic *pCharacteristic)
  {
    Serial.print("New Values Has Been Read from Characteristic: ");
    std::cout << pCharacteristic->getUUID().toString() << std::endl;
    std::string rxValue = pCharacteristic->getValue();
    std::cout << rxValue << std::endl;
  };
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    std::string writtenCharacteristic = pCharacteristic->getUUID().toString();
    if (writtenCharacteristic == CHARACTERISTIC_UUID_WRITE_COMMAND)
    {
      // Serial.println("New Value Has Been Written From Command Characteristic");
      std::string rxValue = pCharacteristic->getValue();
      // std::cout << rxValue << std::endl;
      HandleWrittenCommand(rxValue, writtenCharacteristic);
      // pMyDevice->readCommand_Characteristic->setValue("1"); Burası Characteristic Okunduktan Sonra Okunduğunu Belli Etmek İçin konmuştu. App tarafında Durum Handle Edildi.
      // pMyDevice->readCommand_Characteristic->notify();
      // pMyDevice->readCommand_Characteristic->setValue("0");
    }
    else
    {
      // Serial.println("New Value Has Been Written From Different Characteristic");
      std::string rxValue = pCharacteristic->getValue();
      std::cout << rxValue << std::endl;
    }
  }
};

void BLETASK(void *pvParameters) // BLE TASK
{
  (void)pvParameters;
  // const TickType_t xFrequency = 10;
  xLastWakeTime = xTaskGetTickCount();

  pMyDevice = new DeviceBLE("ELIAR-ICT-2-V2");
  MyServerCallbacks *ServerCallBacks = new MyServerCallbacks();
  MyCharacteristicCallbacks *CharactericticCallBacks = new MyCharacteristicCallbacks();

  ///// CALLBACKS FOR SERVER CONNECTION AND CHARACTERISTICS HANDLED
  pMyDevice->pServer->setCallbacks(ServerCallBacks);
  // pMyDevice->getSensorValues_Characteristic->setCallbacks(CharactericticCallBacks);
  pMyDevice->writeCommand_Characteristic->setCallbacks(CharactericticCallBacks);
  pMyDevice->readCommand_Characteristic->setCallbacks(CharactericticCallBacks);

  Serial.print(" -> Device Connected(bool): ");
  Serial.println(pMyDevice->deviceConnected);
  deserializeJson(settingsParametersJSON, valuesJSON);
  uint8_t dummyValue = 0;
  for (;;)
  {
    if (pMyDevice->deviceConnected)
    {
      if (initialConnection)
      {
        /// When Connection is Made initially, functions will be called here
        initialConnection = false;
      }

      notifyUpdatedConfigurationCharacteristic(dummyValue);
      dummyValue == 11 ? dummyValue = 0 : dummyValue++;
      delay(1000); // bluetooth stack will go into congestion, if too many packets are sent, in 6 hours test i was able to go as low as 3ms
    }
    //   // disconnecting

    if (!pMyDevice->deviceConnected)
    {
      delay(500); // give the bluetooth stack the chance to get things ready
      Serial.println("Device Disconnected");
    }
    // if (pMyDevice->deviceConnected && !pMyDevice->oldDeviceConnected)
    // {
    //   Serial.println("Device Conencted && Old Device Not Connected");
    //   //
    //   // do stuff here on connecting
    //   pMyDevice->oldDeviceConnected = pMyDevice->deviceConnected;
    // }
    Serial.println("Completed Loop");
    delay(2000);
    // vTaskDelayUntil(&xLastWakeTime, xFrequency);
  }
}
