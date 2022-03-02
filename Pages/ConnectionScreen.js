
/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ContextConfigurationValues, ContextSensorValues } from '../App';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  View,
  Text,
  Platform,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import SignalLevelIndicator from '../Navigation/Functions/signalLevelIndicator';
import { bytesToString } from "convert-string";
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from 'react-native-ble-manager';
import { List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Buffer } from 'buffer';
import HandleWriteCommandGroup from '../Utilities/BLEFunctions.js/HandleGroup';
import HandleWriteCommandGroupContext from '../Utilities/BLEFunctions.js/HandleGroupContext';
import { stringify } from 'querystring';
function hexStringToByte(str) {
  if (!str) {
    return new Uint8Array();
  }

  var a = [];
  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}
const processDataCharacteristics = [
  {
    "ServiceUUID": "a65373b2-6942-11ec-90d6-024200110000",
    "Characteristics": [
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200110100" }]
  }
]
const configurationCharacteristics = [
  {
    "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000",
    "Characteristics": [
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130100", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130200", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130300", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130400", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130500", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200130600", "DataType": "Object" },
    ]
  },
  {
    "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000",
    "Characteristics": [
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200140700", "DataType": "Object" },
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200140800", "DataType": "Float" }, //Config 1 Custom Paramters
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200140900", "DataType": "Float" },//Config 2 Custom Paramters
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200141000", "DataType": "Float" },//Config 3 Custom Paramters
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200141100", "DataType": "Float" },//Config 4 Custom Paramters
      { "CharacteristicsUUID": "a65373b2-6942-11ec-90d6-024200141200", "DataType": "Object" }

    ]
  }

]
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

ConnectionScreen = () => {
  const context = useContext(ContextConfigurationValues);
  // console.log("context")
  // console.log(context)
  const contextProcessData = useContext(ContextSensorValues);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const [isScanning, setIsScanning] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false)
  const peripherals = new Map();
  const [connectedPeripheral, setConnectedPeripheral] = useState(null);
  const [list, setList] = useState([])
  //console.log("I am in Connection Screen")

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 2, true).then((results) => {
        //console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  }

  const handleStopScan = () => {
    //console.log('Scan is stopped');
    setIsScanning(false);
    //console.log(list[0]);
    //console.log(connectedPeripheral);
  }
  const handleDidUpdateState = (args) => {
    console.log(args);
  }
  const handleConnectPeripheral = (peripheralInfo, context) => {
    // console.log(peripheralInfo)
    //console.log("peripheralInfoİLKGİRiŞ")
    // //console.log(typeof(storageObject))
    // //console.log(storageObject.filter(row => row.Tag == 'Conductivity'));

    //console.log(peripheralInfo)
    setConnectedPeripheral(peripheralInfo.peripheral)
    //console.log('Connected to a Peripheral');
    //console.log("peripheralInfo")
    console.log(peripheralInfo)
    setMTU(peripheralInfo, context);
    // setNotification(peripheralInfo);
  }

  const handleDisconnectedPeripheral = (data) => {
    setConnectedPeripheral(null)
    setDeviceConnected(false)
    console.log('Disconnected from ' + data.peripheral);
  }
  let a = ""

  const handleDiscoverPeripheral = (peripheral) => {
    //console.log(typeof (peripheral))
    if (peripheral.name == 'ELIAR-ICT-2-V2') {
      //console.log(peripheral.advertising.manufacturerData.bytes)
      const buffer = Buffer.from(peripheral.advertising.manufacturerData.bytes);
      const data1 = buffer.toString();
      if (a != data1) {
        a = data1
        //console.log(data1)
        //console.log("//console.log(a) ")


      }
    }
    if (peripheral.name) {
      if (peripheral.name.search("Eliar") != -1 || peripheral.name.search("ELIAR") != -1) {
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    }
  }
  function handleUpdateValueForCharacteristic(value, peripheral, characteristic, service, context) {
    // console.log("Update Has Been Made ")
    // console.log("In handleUpdateValueForCharacteristic Function")
    // console.log(service);
    // console.log(service == processDataCharacteristics.find(obj => obj.ServiceUUID).ServiceUUID)
    if (service == processDataCharacteristics.find(obj => obj.ServiceUUID).ServiceUUID) {
      // console.log("byteValue: ")
      // console.log(value);
      const bufferSensorValues = Buffer.from(value);
      let objectToBeSet = {}
      objectToBeSet["Status Alarm"] = bufferSensorValues.readUInt8(0) == 0 ? false : true;
      objectToBeSet["Active Configuration"] = bufferSensorValues.readUInt8(1)
      objectToBeSet["Conductivity"] = bufferSensorValues.readFloatLE(2)
      objectToBeSet["Unit Conductivity"] = bufferSensorValues.readUInt8(6);
      objectToBeSet["Concentration"] = bufferSensorValues.readFloatLE(7)
      objectToBeSet["Unit Concentration"] = bufferSensorValues.readUInt8(11);
      objectToBeSet["Temperature"] = bufferSensorValues.readFloatLE(12)
      objectToBeSet["Unit Temperature"] = bufferSensorValues.readUInt8(16);
      // objectToBeSet["Settings Changed"]= bufferSensorValues.readUInt8(17);
      // objectToBeSet["Settings Group No"]= bufferSensorValues.readUInt8(18);
      contextProcessData.setProcessData(objectToBeSet)
      //  console.log("object to be set")
      //  console.log(objectToBeSet)

    }

    else if (configurationCharacteristics.find(obj => obj.ServiceUUID == service)) {

      if (configurationCharacteristics.find(obj => obj.ServiceUUID == service).Characteristics.find(obj => obj.CharacteristicsUUID == characteristic).DataType == "Float") {
        let numArrBuff = []

        let index = "501"
        if (characteristic == "a65373b2-6942-11ec-90d6-024200140800") {
          index = "501"
        } else if (characteristic == "a65373b2-6942-11ec-90d6-024200140900") {
          index = "502"
        } else if (characteristic == "a65373b2-6942-11ec-90d6-024200141000") {
          index = "503"
        } else if (characteristic == "a65373b2-6942-11ec-90d6-024200141100") {
          index = "504"
        }
        const stringMsg = JSON.parse(bytesToString(value))[index]
        for (var i = 0; i < 200; i++) {
          numArrBuff[i] = parseInt(stringMsg.substring(i * 2, (i * 2) + 2), 16)
        }
        // console.log("stringMsg")
        // console.log(stringMsg)
        // console.log("numArrBuff")

        // console.log(numArrBuff)
        const buf = Buffer.from(numArrBuff);
        // console.log("buf")
        // console.log(buf)
        let obj = {};
        switch (characteristic) {
          case "a65373b2-6942-11ec-90d6-024200140800":
            for (let index = 0; index < 50; index++) {
              if (index == 0 || index == 1) {
                obj[index + 83] = buf.readInt32BE(0 + 4 * index);
              } else {
                obj[index + 83] = Number((buf.readFloatBE(0 + 4 * index)).toFixed(3));
                // console.log(obj[index+83])
              }
            }
            // console.log(obj);
            context.setValueTotal(obj);
            break;
          case "a65373b2-6942-11ec-90d6-024200140900":
            for (let index = 0; index < 50; index++) {
              if (index == 0 || index == 1) {
                obj[index + 133] = buf.readInt32BE(0 + 4 * index);
              } else {
                obj[index + 133] = Number((buf.readFloatBE(0 + 4 * index)).toFixed(3));
                // console.log(obj[index+133])

              }
            }
            // console.log(obj)
            context.setValueTotal(obj);
            break;
          case "a65373b2-6942-11ec-90d6-024200141000":

            for (let index = 0; index < 50; index++) {
              if (index == 0 || index == 1) {
                obj[index + 183] = buf.readInt32BE(0 + 4 * index);
              } else {
                obj[index + 183] = Number((buf.readFloatBE(0 + 4 * index)).toFixed(3));

              }
            }
            // console.log(obj)
            context.setValueTotal(obj);
            break;
          case "a65373b2-6942-11ec-90d6-024200141100":

            for (let index = 0; index < 50; index++) {
              if (index == 0 || index == 1) {
                obj[index + 233] = buf.readInt32BE(0 + 4 * index);
              } else {
                obj[index + 233] = Number((buf.readFloatBE(0 + 4 * index)).toFixed(3));

              }
            }
            context.setValueTotal(obj);
          default:
            break;
        }

      }
       else if (configurationCharacteristics.find(obj => obj.ServiceUUID == service).Characteristics.find(obj => obj.CharacteristicsUUID == characteristic).DataType == "Object") { //Type is Object
        const data = bytesToString(value);
        context.setValueTotal(JSON.parse(data))


      }
    }
    // console.log("End of handleUpdateValueForCharacteristic Function")
  }
  async function ConnectPeripheral(peripheral) {
    if (peripheral) {
      //console.log(peripheral.id)
      //console.log("will be connected")

      if (connectedPeripheral == peripheral.id) {
        await BleManager.disconnect(peripheral.id, false).then(() => {
          // Success code
          console.log("Disconnected (I am in Callback)");
          setConnectedPeripheral(null)
          BleManager.checkState();

        })
          .catch((error) => {
            // Failure code
            console.log(error);
          });;


      } else {
        await BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          //console.log(peripheral.id)
          //console.log("request öncesi")
          console.log("connected to the device")
          //console.log("request sonrası")
          //console.log(peripherals);
          if (p) {
            p.connected = true;
            setDeviceConnected(true);
            //console.log("deviceConnected yazılıyor:")

            //console.log(deviceConnected)
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          // else{

          //   peripherals.set(pe)
          // }
          //console.log("setDeviceConnected(true)")
          setDeviceConnected(true);

          //console.log('Connected1 to ' + peripheral.id);
          //console.log("deviceConnected:");
          //console.log(deviceConnected);

        }).catch((error) => {
          //console.log('Connection error', error);
        });



        // setTimeout(() => {
        //   BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {

        //   });

        // }
        // ,200)
        // setTimeout(() => {
        //  BleManager.startNotification(peripheral.id,"a65373b2-6942-11ec-90d6-024200110000","a65373b2-6942-11ec-90d6-024200110100").then((peripheralInfo) => {

        //   });

        // }
        // ,200)


      }
    }

  }

  async function getConfiguration(peripheral, context) {
    let peripheralInfo = peripheral
    //console.log("Servis Bölümüne Girdik");
    //console.log("before MTU")

    await BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {
      peripheralInfo = peripheralInfo;
      console.log("in retrieve services")
    }).catch((error) => {
      console.log('Error in Reading Data', error);
    });

    // configurationCharacteristics.forEach(obj => {

    //   obj.Characteristics.forEach(characteristic => {
    //     // setTimeout(() => {
    //     console.log("I am in Get Configuration Timeout")  
    //     setTimeout(async () => {  

    //     await BleManager.read(peripheralInfo.id, obj.ServiceUUID, characteristic.CharacteristicsUUID).then((readData) => {

    //       console.log(characteristic.CharacteristicsUUID)
    //       console.log("Read Data: ")
    //       console.log(bytesToString(readData))
    //       if (characteristic.DataType == 'Object') {
    //       console.log("I am in onb position")
    //       handleUpdateValueForCharacteristic(readData,peripheral.peripheral,characteristic.CharacteristicsUUID,obj.ServiceUUID,context)              }
    //       console.log("CONTEXT ==>")  
    //       console.log(JSON.stringify(context))
    //     }).catch((error) => {
    //       console.log('Notification error', error);
    //     });
    //    },500)





    //   })



    await BleManager.read("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200130000", "a65373b2-6942-11ec-90d6-024200130300").then((readData) => {
      // console.log("I am in Function of Characteristic 3")
      if (true) {
        handleUpdateValueForCharacteristic(readData, "24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200130300", "a65373b2-6942-11ec-90d6-024200130000", context)
      }
      // console.log("CONTEXT ==>")
      // console.log(JSON.stringify(context))
    }).catch((error) => {
      console.log('Read error', error);
    });

    console.log("i am here in between calls")
    await BleManager.read("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200130000", "a65373b2-6942-11ec-90d6-024200130200").then((readData) => {
      if (true) {

        handleUpdateValueForCharacteristic(readData, "24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200130200", "a65373b2-6942-11ec-90d6-024200130000", context)
      }

    }).catch((error) => {
      console.log('Notification error', error);
    });
    // processDataCharacteristics.forEach(obj => {
    //   obj.Characteristics.forEach(characteristic => {
    //    await BleManager.read(peripheralInfo.id, obj.ServiceUUID, characteristic.CharacteristicsUUID).then((readData) => {
    //       console.log("Read Data: ")
    //       console.log(bytesToString(readData))

    //     }).catch((error) => {
    //       console.log('Notification error', error);
    //     });
    //   })

    // })

    // BleManager.startNotification(peripheralInfo.id, "a65373b2-6942-11ec-90d6-024200110000", "a65373b2-6942-11ec-90d6-024200110100").then(() => {
    //   //console.log('Read Data');

    // }).catch((error) => {
    //   //console.log('Notification error', error);
    // });
    // setNotification(peripheral);

    // }, 200);

    //console.log("Servis Bölümünden Çıktık");


  }


  ////////////////////////
  const setMTU = (peripheral, context) => {
    console.log("In MTU Function")
    setTimeout(() => {
      //console.log("Servis Bölümüne Girdik");
      //console.log("before MTU")

      BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {

        if (Platform.OS === 'android') {
          BleManager.requestMTU(peripheralInfo.id, 512)
            .then((mtu) => {
              //Success code
              console.log()
              console.log("MTU size changed to " + mtu + " bytes");
              setNotification(peripheral)

            })
            .catch((error) => {
              //Failure code
              console.log("Error kodu")
              console.log(peripheral.id)
              console.log(error);
            });
        }

        // }, 200);
      });

    }, 0);

  }






  /////////////////////////
  const setNotification = (peripheral) => {

    setTimeout(() => {
      //console.log("Servis Bölümüne Girdik");
      //console.log("before MTU")

      BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {

        //console.log("peripheralInfo")

        //console.log(peripheralInfo)

        setTimeout(() => {
          configurationCharacteristics.forEach(obj => {
            obj.Characteristics.forEach(characteristic => {
              BleManager.startNotification(peripheralInfo.id, obj.ServiceUUID, characteristic.CharacteristicsUUID).then(() => {
                console.log('Notification Succesfull for' + characteristic.CharacteristicsUUID);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            })

          })

          processDataCharacteristics.forEach(obj => {
            obj.Characteristics.forEach(characteristic => {
              BleManager.startNotification(peripheralInfo.id, obj.ServiceUUID, characteristic.CharacteristicsUUID).then(() => {
                console.log('Notification Succesfull for' + characteristic.CharacteristicsUUID);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            })

          })


        }, 1000);

      });


    }, 400);

  }


  useEffect(() => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      // Success code
      if (peripheralsArray.length != 0) {
        handleDiscoverPeripheral(peripheralsArray[0])
        setConnectedPeripheral(peripheralsArray[0].id);
        setDeviceConnected(true)
      }
      console.log("Connected peripherals: " + JSON.stringify(peripheralsArray));
    }).catch((error) => {
      console.error(error);
    });;

  }, [])



















  useEffect(() => {
    BleManager.start({ showAlert: false });
    console.log("i am here")
    const subscriptionDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    const subscriptionStopScan = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    const subscriptionDisconnectPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    bleManagerEmitter.addListener("BleManagerDidUpdateState", (args) => {
        
      handleDidUpdateState(args)
    });    // const subscriptionDidUpdateValueForCharacterisctic = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', ({ value, peripheral, characteristic, service }) => {
    //   handleUpdateValueForCharacteristic(value, peripheral, characteristic, service, context);
    // });
    const subscriptionConnectPeripheral = bleManagerEmitter.addListener('BleManagerConnectPeripheral', (peripheral) => {
      handleConnectPeripheral(peripheral, context);
    });

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          //console.log("Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              //console.log("User accept");
            } else {
              //console.log("User refuse");
            }
          });
        }
      });
    }

    return (() => {
      //console.log('unmount');
      subscriptionDiscoverPeripheral.remove();
      subscriptionStopScan.remove();
      subscriptionDisconnectPeripheral.remove();
      subscriptionDidUpdateState.remove();
      // subscriptionDidUpdateValueForCharacterisctic.remove();
      subscriptionConnectPeripheral.remove();

      // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
      // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }, [])




  useEffect(() => {

    const subscriptionDidUpdateValueForCharacterisctic = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', ({ value, peripheral, characteristic, service }) => {
      handleUpdateValueForCharacteristic(value, peripheral, characteristic, service, context);


    });


    return (() => {

      subscriptionDidUpdateValueForCharacterisctic.remove();
    })
  });







  const renderItem = (item) => {
    const color = '#fff';

    return (
      <Pressable style={{ borderBottomWidth: StyleSheet.hairlineWidth }} onPress={() => ConnectPeripheral(item)}>

        <View style={[styles.row, { backgroundColor: color, flexDirection: 'row', justifyContent: 'space-evenly' }]}>
          <Image
            source={require("../Media/ICT200-C50.png")}
            style={[styles.imgSensor, { flex: 1 }]}
          />
          <Text style={{ flex: 1, fontSize: 20, textAlign: 'center', color: '#333333', paddingTop: 25 }}>{item.name}</Text>
          <View style={{ flex: 1, alignItems: 'center', paddingBottom: 20 }}>
            <SignalLevelIndicator signalStrength={item.rssi} />

          </View>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
            <Icon
              name="checkmark-outline"
              size={40}
              color={item.id === connectedPeripheral ? "green" : 'white'}

            />
          </View>

        </View>
      </Pressable>
    );



  }


  return (

    <SafeAreaView style={{}}>
      <StatusBar barStyle="dark-content" />

        <View style={styles.body}>

          <View style={{ margin: 10, }}>

            <Button
              color={'#7209B7'}
              title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
              onPress={() => startScan()}
            />
          </View>


        </View>

      <FlatList
        data={list}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
      />
      {deviceConnected== true && <View>
        <Text>{JSON.stringify(context)}</Text>
      </View>}
      {deviceConnected==false && <View style={styles.noDevice}>
        <Text style={{ alignContent: 'center', padding: 25 }}>No device connected</Text>
        <Icon name='warning-outline' size={100} color="#000" rounded='true' />
      </View>}
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  noDevice: {
    // backgroundColor:'rgba(255,255,255,0.26)',
    marginTop: '30%',
    margin: '10%',
    borderRadius: 3,
    width: '80%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  imgSensor: { width: 60, height: 75, resizeMode: 'contain' },

});

export default ConnectionScreen;

