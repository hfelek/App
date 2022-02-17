#if CONFIG_FREERTOS_UNICORE
#define ARDUINO_RUNNING_CORE 0
#else
#define ARDUINO_RUNNING_CORE 1
#endif

#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <map>
#include <BLE2902.h>

//////////////Can be made another Header

////////77

#define SERVICE_UUID_GET_SENSOR_VALUES "a65373b2-6942-11ec-90d6-024200110000"
#define CHARACTERISTIC_UUID_getSensorValues "a65373b2-6942-11ec-90d6-024200110100"

#define SERVICE_UUID_WRITE_COMMAND "a65373b2-6942-11ec-90d6-024200120000"
#define CHARACTERISTIC_UUID_WRITE_COMMAND "a65373b2-6942-11ec-90d6-024200120100"
#define CHARACTERISTIC_UUID_READ_RESPONSE "a65373b2-6942-11ec-90d6-024200120200"

#define SERVICE_UUID_GET_CONFIGURATION "a65373b2-6942-11ec-90d6-024200130000"
#define SERVICE_UUID_GET_CONFIGURATION1 "a65373b2-6942-11ec-90d6-024200140000"

#define CHARACTERISTIC_UUID_Configuration1 "a65373b2-6942-11ec-90d6-024200130100"
#define CHARACTERISTIC_UUID_Configuration2 "a65373b2-6942-11ec-90d6-024200130200"
#define CHARACTERISTIC_UUID_Configuration3 "a65373b2-6942-11ec-90d6-024200130300"
#define CHARACTERISTIC_UUID_Configuration4 "a65373b2-6942-11ec-90d6-024200130400"
#define CHARACTERISTIC_UUID_Configuration5 "a65373b2-6942-11ec-90d6-024200130500"
#define CHARACTERISTIC_UUID_Configuration6 "a65373b2-6942-11ec-90d6-024200130600"
#define CHARACTERISTIC_UUID_Configuration7 "a65373b2-6942-11ec-90d6-024200140700"
#define CHARACTERISTIC_UUID_Configuration8 "a65373b2-6942-11ec-90d6-024200140800"
#define CHARACTERISTIC_UUID_Configuration9 "a65373b2-6942-11ec-90d6-024200140900"
#define CHARACTERISTIC_UUID_Configuration10 "a65373b2-6942-11ec-90d6-024200141000"
#define CHARACTERISTIC_UUID_Configuration11 "a65373b2-6942-11ec-90d6-024200141100"
#define CHARACTERISTIC_UUID_Configuration12 "a65373b2-6942-11ec-90d6-024200141200"


#define BLE_PARAMETERS_KEY_STRING "Set Parameters"
#define BLE_PARAMETERS_PAGE_STRING "Tag"
#define MAX_ISDU_INDEX_VALUE 376


enum valueTypeISDUValues
{
    INTVALUETYPE = 0,
    FLOATVALUETYPE ,
    STRINGVALUETYPE ,
    UNDEFINEDVALUETYPE 
};
// int returnPageIndex(std::string pageName)
// {
//     try
//     {
//         if (pageName == "Identification")
//         {
//             return 0;
//         }
//         else if (pageName == "Diagnostics")
//         {
//             return 1;
//         }
//         else if (pageName == "Measured Values")
//         {
//             return 2;
//         }
//         else if (pageName == "System Units")
//         {
//             return 3;
//         }
//         else if (pageName == "Conductivity")
//         {
//             return 4;
//         }
//         else if (pageName == "Concentration")
//         {
//             return 5;
//         }
//         else if (pageName == "Output1")
//         {
//             return 6;
//         }
//         else if (pageName == "Output2")
//         {
//             return 7;
//         }
//         else if (pageName == "Display")
//         {
//             return 8;
//         }
//         else if (pageName == "Communication")
//         {
//             return 9;
//         }
//         else if (pageName == "System")
//         {
//             return 10;
//         }
//         else
//         {
//             std::cout << "Couldn't handle page name" << std::endl;
//             return 11;
//         }
//     }
//     catch (const std::exception &e)
//     {
//         std::cerr << e.what() << '\n';
//     }
//     return 11;
// }
 
 
 
 char valuesJSON[] ="{\n"
"    \"1\": \"Product Name Value\",\n"
"    \"2\": \"Product ID Value\",\n"
"    \"3\": \"Product Text Value\",\n"
"    \"4\": \"Specific Application Tag Value\",\n"
"    \"5\": \"Hardware Revision Value\",\n"
"    \"6\": \"Firmware Revision Value\",\n"
"    \"7\": 0,\n"
"    \"8\": 0,\n"
"    \"9\": \"Actual Diagnostics Value\",\n"
"    \"10\": \"Last Diagnostics Value\",\n"
"    \"11\": 1,\n"
"    \"12\": 0.0,\n"
"    \"13\": 0.0,\n"
"    \"14\": 0.0,\n"
"    \"15\": 0,\n"
"    \"16\": 0,\n"
"    \"17\": 20.0,\n"
"    \"18\": 20.0,\n"
"    \"19\": 0,\n"
"    \"20\": 0,\n"
"    \"21\": 17,\n"
"    \"22\": 85,\n"
"    \"23\": 0,\n"
"    \"24\": 0,\n"
"    \"25\": 25.0,\n"
"    \"26\": 30,\n"
"    \"27\": 0,\n"
"    \"28\": 0,\n"
"    \"29\": 24.2,\n"
"    \"30\": 10,\n"
"    \"31\": 10.5,\n"
"    \"32\": 20.4,\n"
"    \"33\": 30.0,\n"
"    \"34\": 40.0,\n"
"    \"35\": 0,\n"
"    \"36\": 10,\n"
"    \"37\": 20,\n"
"    \"38\": 30,\n"
"    \"39\": 40,\n"
"    \"40\": 50,\n"
"    \"41\": 0.0,\n"
"    \"42\": 1.0,\n"
"    \"43\": 2.0,\n"
"    \"44\": 3.0,\n"
"    \"45\": 4.0,\n"
"    \"46\": 5.0,\n"
"    \"47\": 0,\n"
"    \"48\": 10,\n"
"    \"49\": 20,\n"
"    \"50\": 30,\n"
"    \"51\": 40,\n"
"    \"52\": 50,\n"
"    \"53\": 0.0,\n"
"    \"54\": 1.0,\n"
"    \"55\": 2.0,\n"
"    \"56\": 3.0,\n"
"    \"57\": 4.0,\n"
"    \"58\": 5.0,\n"
"    \"59\": 0,\n"
"    \"60\": 10,\n"
"    \"61\": 20,\n"
"    \"62\": 30,\n"
"    \"63\": 40,\n"
"    \"64\": 50,\n"
"    \"65\": 0.0,\n"
"    \"66\": 1.0,\n"
"    \"67\": 2.0,\n"
"    \"68\": 3.0,\n"
"    \"69\": 4.0,\n"
"    \"70\": 5.0,\n"
"    \"71\": 0,\n"
"    \"72\": 10,\n"
"    \"73\": 20,\n"
"    \"74\": 30,\n"
"    \"75\": 40,\n"
"    \"76\": 50,\n"
"    \"77\": 0.0,\n"
"    \"78\": 1.0,\n"
"    \"79\": 2.0,\n"
"    \"80\": 3.0,\n"
"    \"81\": 4.0,\n"
"    \"82\": 5.0,\n"
"    \"83\": 6,\n"
"    \"84\": 6,\n"
"    \"85\": -10.0,\n"
"    \"86\": 0.0,\n"
"    \"87\": 10.0,\n"
"    \"88\": 20.0,\n"
"    \"89\": 30.0,\n"
"    \"90\": 40.0,\n"
"    \"91\": 0,\n"
"    \"92\": 10.0,\n"
"    \"93\": 30.0,\n"
"    \"94\": 50.0,\n"
"    \"95\": 70.0,\n"
"    \"96\": 90.0,\n"
"    \"97\": 0.0,\n"
"    \"98\": 0.0,\n"
"    \"99\": 0.0,\n"
"    \"100\": 0.0,\n"
"    \"101\": 0.0,\n"
"    \"102\": 0.0,\n"
"    \"103\": 0.0,\n"
"    \"104\": 0.0,\n"
"    \"105\": 0.0,\n"
"    \"106\": 0.0,\n"
"    \"107\": 0.0,\n"
"    \"108\": 0.0,\n"
"    \"109\": 0.0,\n"
"    \"110\": 0.0,\n"
"    \"111\": 0.0,\n"
"    \"112\": 0.0,\n"
"    \"113\": 0.0,\n"
"    \"114\": 0.0,\n"
"    \"115\": 0.0,\n"
"    \"116\": 0.0,\n"
"    \"117\": 0.0,\n"
"    \"118\": 0.0,\n"
"    \"119\": 0.0,\n"
"    \"120\": 0.0,\n"
"    \"121\": 0.0,\n"
"    \"122\": 0.0,\n"
"    \"123\": 0.0,\n"
"    \"124\": 0.0,\n"
"    \"125\": 0.0,\n"
"    \"126\": 0.0,\n"
"    \"127\": 0.0,\n"
"    \"128\": 0.0,\n"
"    \"129\": 0.0,\n"
"    \"130\": 0.0,\n"
"    \"131\": 0.0,\n"
"    \"132\": 0.0,\n"
"    \"133\": 6,\n"
"    \"134\": 6,\n"
"    \"135\": 0.0,\n"
"    \"136\": -10.0,\n"
"    \"137\": 0.0,\n"
"    \"138\": 10.0,\n"
"    \"139\": 20.0,\n"
"    \"140\": 30.0,\n"
"    \"141\": 0,\n"
"    \"142\": 5,\n"
"    \"143\": 10.0,\n"
"    \"144\": 30.0,\n"
"    \"145\": 50.0,\n"
"    \"146\": 70.0,\n"
"    \"147\": 0.0,\n"
"    \"148\": 0.0,\n"
"    \"149\": 0.0,\n"
"    \"150\": 0.0,\n"
"    \"151\": 0.0,\n"
"    \"152\": 0.0,\n"
"    \"153\": 0.0,\n"
"    \"154\": 0.0,\n"
"    \"155\": 0.0,\n"
"    \"156\": 0.0,\n"
"    \"157\": 0.0,\n"
"    \"158\": 0.0,\n"
"    \"159\": 0.0,\n"
"    \"160\": 0.0,\n"
"    \"161\": 0.0,\n"
"    \"162\": 0.0,\n"
"    \"163\": 0.0,\n"
"    \"164\": 0.0,\n"
"    \"165\": 0.0,\n"
"    \"166\": 0.0,\n"
"    \"167\": 0.0,\n"
"    \"168\": 0.0,\n"
"    \"169\": 0.0,\n"
"    \"170\": 0.0,\n"
"    \"171\": 0.0,\n"
"    \"172\": 0.0,\n"
"    \"173\": 0.0,\n"
"    \"174\": 0.0,\n"
"    \"175\": 0.0,\n"
"    \"176\": 0.0,\n"
"    \"177\": 0.0,\n"
"    \"178\": 0.0,\n"
"    \"179\": 0.0,\n"
"    \"180\": 0.0,\n"
"    \"181\": 0.0,\n"
"    \"182\": 0.0,\n"
"    \"183\": 6,\n"
"    \"184\": 6,\n"
"    \"185\": -10,\n"
"    \"186\": -5,\n"
"    \"187\": 0,\n"
"    \"188\": 5,\n"
"    \"189\": 10.0,\n"
"    \"190\": 20.0,\n"
"    \"191\": 0,\n"
"    \"192\": 5.0,\n"
"    \"193\": 10,\n"
"    \"194\": 11.0,\n"
"    \"195\": 30.0,\n"
"    \"196\": 50.0,\n"
"    \"197\": 0.0,\n"
"    \"198\": 0.0,\n"
"    \"199\": 0.0,\n"
"    \"200\": 0.0,\n"
"    \"201\": 0.0,\n"
"    \"202\": 0.0,\n"
"    \"203\": 0.0,\n"
"    \"204\": 0.0,\n"
"    \"205\": 0.0,\n"
"    \"206\": 0.0,\n"
"    \"207\": 0.0,\n"
"    \"208\": 0.0,\n"
"    \"209\": 0.0,\n"
"    \"210\": 0.0,\n"
"    \"211\": 0.0,\n"
"    \"212\": 0.0,\n"
"    \"213\": 0.0,\n"
"    \"214\": 0.0,\n"
"    \"215\": 0.0,\n"
"    \"216\": 0.0,\n"
"    \"217\": 0.0,\n"
"    \"218\": 0.0,\n"
"    \"219\": 0.0,\n"
"    \"220\": 0.0,\n"
"    \"221\": 0.0,\n"
"    \"222\": 0.0,\n"
"    \"223\": 0.0,\n"
"    \"224\": 0.0,\n"
"    \"225\": 0.0,\n"
"    \"226\": 0.0,\n"
"    \"227\": 0.0,\n"
"    \"228\": 0.0,\n"
"    \"229\": 0.0,\n"
"    \"230\": 0.0,\n"
"    \"231\": 0.0,\n"
"    \"232\": 0.0,\n"
"    \"233\": 6,\n"
"    \"234\": 6,\n"
"    \"235\": 0.0,\n"
"    \"236\": 0.0,\n"
"    \"237\": -10.0,\n"
"    \"238\": 0.0,\n"
"    \"239\": 10.0,\n"
"    \"240\": 20.0,\n"
"    \"241\": 0.0,\n"
"    \"242\": 0.0,\n"
"    \"243\": 0,\n"
"    \"244\": 10.0,\n"
"    \"245\": 30.0,\n"
"    \"246\": 50.0,\n"
"    \"247\": 0.0,\n"
"    \"248\": 0.0,\n"
"    \"249\": 0.0,\n"
"    \"250\": 0.0,\n"
"    \"251\": 0.0,\n"
"    \"252\": 0.0,\n"
"    \"253\": 0.0,\n"
"    \"254\": 0.0,\n"
"    \"255\": 0.0,\n"
"    \"256\": 0.0,\n"
"    \"257\": 0.0,\n"
"    \"258\": 0.0,\n"
"    \"259\": 0.0,\n"
"    \"260\": 0.0,\n"
"    \"261\": 0.0,\n"
"    \"262\": 0.0,\n"
"    \"263\": 0.0,\n"
"    \"264\": 0.0,\n"
"    \"265\": 0.0,\n"
"    \"266\": 0.0,\n"
"    \"267\": 0.0,\n"
"    \"268\": 0.0,\n"
"    \"269\": 0.0,\n"
"    \"270\": 0.0,\n"
"    \"271\": 0.0,\n"
"    \"272\": 0.0,\n"
"    \"273\": 0.0,\n"
"    \"274\": 0.0,\n"
"    \"275\": 0.0,\n"
"    \"276\": 0.0,\n"
"    \"277\": 0.0,\n"
"    \"278\": 0.0,\n"
"    \"279\": 0.0,\n"
"    \"280\": 0.0,\n"
"    \"281\": 0.0,\n"
"    \"282\": 0.0,\n"
"    \"283\": 0,\n"
"    \"284\": 0,\n"
"    \"285\": 0,\n"
"    \"286\": 0,\n"
"    \"287\": 0,\n"
"    \"288\": 0,\n"
"    \"289\": 0,\n"
"    \"290\": 0,\n"
"    \"291\": 0,\n"
"    \"292\": 0,\n"
"    \"293\": 0,\n"
"    \"294\": 0,\n"
"    \"295\": 0,\n"
"    \"296\": 0,\n"
"    \"297\": 0,\n"
"    \"298\": 0,\n"
"    \"299\": 0,\n"
"    \"300\": 0,\n"
"    \"301\": 0,\n"
"    \"302\": 0,\n"
"    \"303\": 0,\n"
"    \"304\": 0,\n"
"    \"305\": 0,\n"
"    \"306\": 0,\n"
"    \"307\": 0,\n"
"    \"308\": 0,\n"
"    \"309\": 0,\n"
"    \"310\": 0,\n"
"    \"311\": 0,\n"
"    \"312\": 0,\n"
"    \"313\": 0,\n"
"    \"314\": 0,\n"
"    \"315\": 0,\n"
"    \"316\": 0,\n"
"    \"317\": 0,\n"
"    \"318\": 0,\n"
"    \"319\": 0,\n"
"    \"320\": 0,\n"
"    \"321\": 0,\n"
"    \"322\": 0,\n"
"    \"323\": 0,\n"
"    \"324\": 0,\n"
"    \"325\": 0,\n"
"    \"326\": 0,\n"
"    \"327\": 0,\n"
"    \"328\": 0,\n"
"    \"329\": 0,\n"
"    \"330\": 0,\n"
"    \"331\": 0,\n"
"    \"332\": 0,\n"
"    \"333\": 0,\n"
"    \"334\": 0,\n"
"    \"335\": 0,\n"
"    \"336\": 0,\n"
"    \"337\": 0,\n"
"    \"338\": 0,\n"
"    \"339\": 0,\n"
"    \"340\": 0,\n"
"    \"341\": 0,\n"
"    \"342\": 0,\n"
"    \"343\": 0,\n"
"    \"344\": 0,\n"
"    \"345\": 0,\n"
"    \"346\": 0,\n"
"    \"347\": 0,\n"
"    \"348\": 0,\n"
"    \"349\": 0,\n"
"    \"350\": 0,\n"
"    \"351\": 0,\n"
"    \"352\": \"ICT-210 V2\",\n"
"    \"353\": 0,\n"
"    \"354\": 0,\n"
"    \"355\": \"192.168.1.1\",\n"
"    \"356\": \"255.255.255.1\",\n"
"    \"357\": \"192.168.1.1\",\n"
"    \"358\": 1,\n"
"    \"359\": 1,\n"
"    \"360\": 1,\n"
"    \"361\": 1,\n"
"    \"362\": 1,\n"
"    \"363\": 1,\n"
"    \"364\": 1,\n"
"    \"365\": 1,\n"
"    \"366\": 1,\n"
"    \"367\": 1,\n"
"    \"368\": 1,\n"
"    \"369\": 1,\n"
"    \"370\": 0,\n"
"    \"371\": 0,\n"
"    \"372\": 0,\n"
"    \"373\": 0,\n"
"    \"374\": 0,\n"
"    \"375\": 0,\n"
"    \"376\": 0\n"
"\n"
"}";

class DeviceBLE
{
public:
    BLEServer *pServer;

    BLEService *pService_Get_Sensor_Values; //////// pService_Get_Sensor_Values
    BLECharacteristic *getSensorValues_Characteristic;

    BLEService *pService_Write_Command; /////pService Write CommandonW
    BLECharacteristic *writeCommand_Characteristic;
    BLECharacteristic *readCommand_Characteristic;

    BLEService *pService_Get_Configuration;
    BLEService *pService_Get_Configuration1;

    BLECharacteristic *readParam_Characteristic1;
    BLECharacteristic *readParam_Characteristic2;
    BLECharacteristic *readParam_Characteristic3;
    BLECharacteristic *readParam_Characteristic4;
    BLECharacteristic *readParam_Characteristic5;
    BLECharacteristic *readParam_Characteristic6;
    BLECharacteristic *readParam_Characteristic7;
    BLECharacteristic *readParam_Characteristic8;
    BLECharacteristic *readParam_Characteristic9;
    BLECharacteristic *readParam_Characteristic10;
    BLECharacteristic *readParam_Characteristic11;
    BLECharacteristic *readParam_Characteristic12;

    // BLEService *pService_Value_Notify;
    // BLECharacteristic *valueNotify_Characteristic;

    BLEAdvertising *pAdvertising;

    bool deviceConnected;
    bool oldDeviceConnected;
    // String sendCommandUUID;

    ///////////Functions

    void notifySensorValues()
    {
        this->getSensorValues_Characteristic->notify();
    }
    void notifyCommandHandle()
    {
        this->readCommand_Characteristic->notify();
    }

    // void notifySettingsCharacteristic(int characteristicIndex)
    // {
    //     switch (characteristicIndex)
    //     {
    //     case 0:
    //         this->readParam_Characteristic1->notify();
    //         break;
    //     case 1:
    //         readParam_Characteristic2->setValue("");

    //         break;
    //     case 2:
    //         readParam_Characteristic3->setValue("");

    //         break;
    //     case 3:
    //         readParam_Characteristic4->setValue("");

    //         break;
    //     case 4:
    //         readParam_Characteristic5->setValue("");

    //         break;
    //     case 5:
    //         readParam_Characteristic6->setValue("");

    //         break;
    //     case 6:
    //         readParam_Characteristic7->setValue("");

    //         break;
    //     case 7:
    //         readParam_Characteristic8->setValue("");

    //         break;
    //     case 8:
    //         readParam_Characteristic9->setValue("");

    //         break;
    //     case 9:
    //         readParam_Characteristic10->setValue("");

    //         break;
    //     case 10:
    //         readParam_Characteristic11->setValue("");

    //         break;

    //     default:
    //         std::cout << "Couldnt Handle Notify Execution" << std::endl;
    //         break;
    //     }
    // }

    ////////

    /*Constructor*/

    DeviceBLE(std::string deviceName)
    {
        BLEDevice::init(deviceName);
        pServer = BLEDevice::createServer();

        pService_Get_Sensor_Values = pServer->createService(SERVICE_UUID_GET_SENSOR_VALUES);
        pService_Get_Configuration = pServer->createService(SERVICE_UUID_GET_CONFIGURATION);
        pService_Get_Configuration1 = pServer->createService(SERVICE_UUID_GET_CONFIGURATION1);
        pService_Write_Command = pServer->createService(SERVICE_UUID_WRITE_COMMAND);
        // pService_Value_Notify = pServer->createService(SERVICE_UUID_VALUE_NOTIFY);

        /*CHARACTERISTICs ARE CREATED*/

        getSensorValues_Characteristic = pService_Get_Sensor_Values->createCharacteristic(
            CHARACTERISTIC_UUID_getSensorValues,
            BLECharacteristic::PROPERTY_NOTIFY |
                BLECharacteristic::PROPERTY_READ);
        Serial.println("Get Sensor Values Characteristic Created");
        // getSensorValues_Characteristic->setValue(0);

        writeCommand_Characteristic = pService_Write_Command->createCharacteristic(
            CHARACTERISTIC_UUID_WRITE_COMMAND,
            BLECharacteristic::PROPERTY_WRITE |
                BLECharacteristic::PROPERTY_READ);
        Serial.println("Write Command Characteristic Created");
        writeCommand_Characteristic->setValue("Write Command");
        // writeCommand_Characteristic->setCallbacks(new MyCharacteristicCallbacks());
        readCommand_Characteristic = pService_Write_Command->createCharacteristic(
            CHARACTERISTIC_UUID_READ_RESPONSE,
            BLECharacteristic::PROPERTY_NOTIFY |
            BLECharacteristic::PROPERTY_READ);
        Serial.println("Read Response Characteristic Created");
        readCommand_Characteristic->setValue("Read Command");

        readParam_Characteristic1 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration1,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic1->setValue("1");

        readParam_Characteristic2 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration2,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic2->setValue("2");

        readParam_Characteristic3 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration3,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY

        );
        readParam_Characteristic3->setValue("3");

        readParam_Characteristic4 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration4,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic4->setValue("4");

        readParam_Characteristic5 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration5,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic5->setValue("5");

        readParam_Characteristic6 = pService_Get_Configuration->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration6,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY );
        readParam_Characteristic6->setValue("6");

        readParam_Characteristic7 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration7,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic7->setValue("7");

        readParam_Characteristic8 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration8,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic8->setValue("8");

        readParam_Characteristic9 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration9,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic9->setValue("9");

        readParam_Characteristic10 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration10,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic10->setValue("10");

        readParam_Characteristic11 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration11,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic11->setValue("11");

         readParam_Characteristic12 = pService_Get_Configuration1->createCharacteristic(
            CHARACTERISTIC_UUID_Configuration12,
            BLECharacteristic::PROPERTY_READ |
                BLECharacteristic::PROPERTY_NOTIFY);
        readParam_Characteristic12->setValue("12");

        // valueNotify_Characteristic = pService_Value_Notify->createCharacteristic(
        //     CHARACTERISTIC_UUID_VALUE_NOTIFY,
        //     BLECharacteristic::PROPERTY_READ |
        //     BLECharacteristic::PROPERTY_NOTIFY
        //     );
        // valueNotify_Characteristic->setValue("Value Notifty");

        // writeCommand_Characteristic->addDescriptor(new BLE2902());
        // readCommand_Characteristic->addDescriptor(new BLE2902());
        // getSensorValues_Characteristic->addDescriptor(new BLE2902());
        // -----------------------
        pService_Get_Sensor_Values->start();
        pService_Write_Command->start();
        pService_Get_Configuration->start();
        pService_Get_Configuration1->start();
        // pService_Value_Notify->start();

        pAdvertising = pServer->getAdvertising();

        /*CHARACTERS' DESCRIPTORS ARE SET*/

        // getSensorValues_Characteristic->setNotifyProperty(true);
        // writeCommand_Characteristic->setIndicateProperty(true);
        // pAdvertising->addServiceUUID(SERVICE_UUID_WRITE_COMMAND);
        // pAdvertising->addServiceUUID(SERVICE_UUID_GET_SENSOR_VALUES);
        // pAdvertising->addServiceUUID(SERVICE_UUID_GET_CONFIGURATION);
        BLEAdvertisementData advertisementdata;
        pAdvertising->setScanResponse(false);
        pAdvertising->setMinPreferred(0x00);
        oldDeviceConnected = false;
        deviceConnected = false;
        pAdvertising->start();
    };

    // class MyServerCallbacks : public BLEServerCallbacks
    // {
    //   void onConnect(BLEServer *pServer)
    //   {

    //     deviceConnected = true;
    //   };

    //   void onDisconnect(BLEServer *pServer)
    //   {
    //     deviceConnected = false;
    //   }
    // };

    // class MyCharacteristicCallbacks : public BLECharacteristicCallbacks
    // {
    //   void onRead(BLECharacteristic *pCharacteristic)
    //   {
    //     Serial.print("New Values Has Been Read from Characteristic: ");
    //     std::cout << pCharacteristic->getUUID().toString() << std::endl;
    //     std::string rxValue = pCharacteristic->getValue();
    //     std::cout << rxValue << std::endl;
    //   };

    //   void onWrite(BLECharacteristic *pCharacteristic)
    //   {

    //     Serial.print("New Values Has Been Writtten to Characteristic: ");
    //     std::cout << pCharacteristic->getUUID().toString() << std::endl;

    //     std::string rxValue = pCharacteristic->getValue();
    //     std::cout << rxValue << std::endl;
    //   }
    // };

    // class MyCharacteristicCallbacks : public BLECharacteristicCallbacks
    // {
    //     void onRead(BLECharacteristic *pCharacteristic)
    //     {
    //         Serial.print("New Values Has Been Read from Characteristic: ");
    //         std::cout << pCharacteristic->getUUID().toString() << std::endl;
    //         std::string rxValue = pCharacteristic->getValue();
    //         std::cout << rxValue << std::endl;
    //     };
    // };
    // void startAdvertise()
    // {
    //     BLEDevice::startAdvertising();
    // };

    // void stopAdvertise()
    // {
    //     BLEDevice::stopAdvertising;
    // };
    // ~DeviceBLE()
    // {
    //     BLEDevice::stopAdvertising;
    // };
};
