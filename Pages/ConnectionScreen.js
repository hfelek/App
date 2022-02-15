
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
function printCoordinate() {
  console.log(this.a)
}
// let consoleobject = printCoordinate.bind(storageObject)

// let notifyCharacteristicsMap = new Map();
// notifyCharacteristicsMap.set("Identification", { "ServiceUUID": "A65373B2-6942-11EC-90D6-024200130000", "CharacteristicUUID": "A65373B2-6942-11EC-90D6-024200130100" })
// notifyCharacteristicsMap.set("Diagnostics", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200130200" })
// notifyCharacteristicsMap.set("Measured Values", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200130300" })
// notifyCharacteristicsMap.set("System Units", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200130400" })
// notifyCharacteristicsMap.set("Conductivity", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200130500" })
// notifyCharacteristicsMap.set("Concentration", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200130000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200130600" })
// ///buradan itibaren ikinci serviste yer alıyor
// notifyCharacteristicsMap.set("Output1", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200140700" })
// notifyCharacteristicsMap.set("Output2", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200140800" })
// notifyCharacteristicsMap.set("Display", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200140900" })
// notifyCharacteristicsMap.set("Communication", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200141000" })
// notifyCharacteristicsMap.set("System", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200140000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200141100" })
// notifyCharacteristicsMap.set("Values", { "ServiceUUID": "a65373b2-6942-11ec-90d6-024200110000", "CharacteristicUUID": "a65373b2-6942-11ec-90d6-024200110100" })
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

const ConnectionScreen = () => {
  const contextConfiguration = useContext(ContextConfigurationValues);
  const contextProcessData = useContext(ContextSensorValues);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
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
  console.log("I am in Connection Screen")

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 2, true).then((results) => {
        console.log('Scanning...');
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  }

  const handleStopScan = () => {
    console.log('Scan is stopped');
    setIsScanning(false);
    console.log(list[0]);
    console.log(connectedPeripheral);
  }
  const handleDidUpdateState = () => {
    console.log('Handled DidUpdateState');

  }
  const handleConnectPeripheral = (peripheralInfo) => {
    console.log("peripheralInfoİLKGİRiŞ")
    // console.log(typeof(storageObject))
    // console.log(storageObject.filter(row => row.Tag == 'Conductivity'));

    console.log(peripheralInfo)
    setConnectedPeripheral(peripheralInfo.peripheral)
    console.log('Connected to a Peripheral');
    console.log("peripheralInfo")
    console.log(peripheralInfo)
    getConfiguration(peripheralInfo);

    setNotification(peripheralInfo);

    // getConfiguration(peripheralInfo);

  }


  const handleDisconnectedPeripheral = (data) => {
    setConnectedPeripheral(null)
    console.log('Disconnected from ' + data.peripheral);
  }
  let a = ""
  const handleUpdateValueForCharacteristic = ({ value, peripheral, characteristic, service }) => {


    // switch (service) {
    //   case processDataCharacteristics[0].ServiceUUID:  //// Value From Process Data  is Written
    //   if(configurationCharacteristics[0].Characteristics.find(obj => obj.DataType == "Float" ){

    //   }

    //     break;

    //   case configurationCharacteristics[0].ServiceUUID:  //// Value From Process Data  is Written

    //   break;

    //   case configurationCharacteristics[1].ServiceUUID:  //// Value From Process Data  is Written
    //   break;

    //   default:
    //     break;
    // }
    console.log("Update Has Been Made From Characteristic")
    console.log(characteristic)
    console.log("Service: " + service)
    if (service == processDataCharacteristics.find(obj => obj.ServiceUUID)) {
      console.log("Update From Process Data")
      const data = bytesToString(value);
      let parsedObject = JSON.parse(data)
      contextProcessData.setValueTotal(parsedObject)
      console.log(parsedObject)

    }

    else if (configurationCharacteristics.find(obj => obj.ServiceUUID == service)) {
      console.log("Update From Configuration Data")

      if (configurationCharacteristics.find(obj => obj.ServiceUUID == service).Characteristics.find(obj => obj.CharacteristicsUUID == characteristic).DataType == "Float") {
        // console.log(configurationCharacteristics[1].Characteristics.find(obj => obj.DataType == "Float"))
        const buf = Buffer.from(value);
        let obj={};
        switch (characteristic) {
          case "a65373b2-6942-11ec-90d6-024200140800":
            for (let index = 0; index < 50; index++) {
              if(index==0 || index ==1 ){
              obj[index+83] = parseInt(buf.readFloatLE(0+4*index).toFixed(0));
            }else{
              obj[index+83] = parseFloat(buf.readFloatLE(0+4*index).toFixed(3));

            }
            }
            console.log(obj)
            contextConfiguration.setValueTotal(obj)
            break;
          case "a65373b2-6942-11ec-90d6-024200140900":
            for (let index = 0; index < 50; index++) {
              if(index==0 || index ==1 ){
              obj[index+133] = parseInt(buf.readFloatLE(0+4*index).toFixed(0));
            }else{
              obj[index+133] = parseFloat(buf.readFloatLE(0+4*index).toFixed(3));

            }
            }
            console.log(obj)
            contextConfiguration.setValueTotal(obj)
            break;
          case "a65373b2-6942-11ec-90d6-024200141000":
            for (let index = 0; index < 50; index++) {
              if(index==0 || index ==1 ){
              obj[index+183] = parseInt(buf.readFloatLE(0+4*index).toFixed(0));
            }else{
              obj[index+183] = parseFloat(buf.readFloatLE(0+4*index).toFixed(3));

            }
            }
            console.log(obj)
            contextConfiguration.setValueTotal(obj)
            break;
          case "a65373b2-6942-11ec-90d6-024200141100":
            for (let index = 0; index < 50; index++) {
              if(index==0 || index ==1 ){
              obj[index+233] = parseInt(buf.readFloatLE(0+4*index).toFixed(0));
            }else{
              obj[index+233] = parseFloat(buf.readFloatLE(0+4*index).toFixed(3));

            }
            }
            console.log(obj)
            contextConfiguration.setValueTotal(obj)
          default:
            break;
        }

      } else if (configurationCharacteristics.find(obj => obj.ServiceUUID == service).Characteristics.find(obj => obj.CharacteristicsUUID == characteristic).DataType == "Object") {
        console.log("Type is Object")
        const data = bytesToString(value);
        console.log("Data:  ")
        console.log(data)

        let parsedObject = JSON.parse(data)
        contextConfiguration.setValueTotal(parsedObject)
        console.log("Parsed Object:  ")

        console.log(parsedObject)
        console.log("Values are Handled")

      }
    }
  }
  const handleDiscoverPeripheral = (peripheral) => {
    console.log(typeof (peripheral))
    if (peripheral.name == 'ELIAR-ICT-2-V2') {
      console.log(peripheral.advertising.manufacturerData.bytes)
      const buffer = Buffer.from(peripheral.advertising.manufacturerData.bytes);
      const data1 = buffer.toString();
      if (a != data1) {
        a = data1
        console.log(data1)
        console.log("console.log(a) ")



      }
    }
    if (peripheral.name) {
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
  }

  async function ConnectPeripheral(peripheral) {
    if (peripheral) {
      console.log(peripheral.id)
      console.log("will be connected")

      if (connectedPeripheral == peripheral.id) {
        BleManager.disconnect(peripheral.id);
        ////Burada Periyodik olan şeyle yapılabilir
        console.log("BleManager.disconnect(peripheral.id)")


      } else {
        await BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          console.log(peripheral.id)
          console.log("request öncesi")

          console.log("request sonrası")
          console.log(peripherals);
          if (p) {
            p.connected = true;
            setDeviceConnected(true);
            console.log("deviceConnected yazılıyor:")

            console.log(deviceConnected)
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          // else{

          //   peripherals.set(pe)
          // }
          console.log("setDeviceConnected(true)")
          setDeviceConnected(true);

          console.log('Connected1 to ' + peripheral.id);
          console.log("deviceConnected:");
          console.log(deviceConnected);


        }).catch((error) => {
          console.log('Connection error', error);
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



  const getConfiguration = (peripheral) => {

    setTimeout(() => {
      console.log("Servis Bölümüne Girdik");


      BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {

        for (let [page, objectUUID] of configurationCharacteristicsMap) {

          setTimeout(() => {


            BleManager.read(peripheralInfo.id, objectUUID.ServiceUUID, objectUUID.CharacteristicUUID).then((data) => {
              console.log('Read Data');

              const buffer = Buffer.from(data);
              const data1 = buffer.toString();
              console.log(page);
              console.log(data1);

            });


          }, 200);

        };
        //   }).catch((error) => {
        //     console.log('Notification error', error);
        //   });
        // }, 200);
      });

      console.log("Servis Bölümünden Çıktık");


    }, 200);

  }
  const setNotification = (peripheral) => {

    setTimeout(() => {
      console.log("Servis Bölümüne Girdik");
      console.log("before MTU")



      BleManager.retrieveServices(peripheral.peripheral).then((peripheralInfo) => {

        if (Platform.OS === 'android') {
          BleManager.requestMTU(peripheralInfo.id, 512)
            .then((mtu) => {
              // Success code
              console.log()
              console.log("MTU size changed to " + mtu + " bytes");
            })
            .catch((error) => {
              // Failure code
              console.log("Error kodu")
              console.log(peripheral.id)
              console.log(error);
            });
        }
        console.log("peripheralInfo")

        console.log(peripheralInfo)

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
                // console.log('Notification Succesfull for' + characteristic.CharacteristicsUUID);
              }).catch((error) => {
                console.log('Notification error', error);
              });
            })

          })

          BleManager.startNotification(peripheralInfo.id, "a65373b2-6942-11ec-90d6-024200110000", "a65373b2-6942-11ec-90d6-024200110100").then(() => {
            console.log('Read Data');


          }).catch((error) => {
            console.log('Notification error', error);
          });

        }, 1000);


        // }, 200);
      });

      console.log("Servis Bölümünden Çıktık");


    }, 400);

  }
















  useEffect(() => {
    BleManager.start({ showAlert: false });

    const subscriptionDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    const subscriptionStopScan = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
    const subscriptionDisconnectPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
    const subscriptionDidUpdateValueForCharacterisctic = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
    const subscriptionDidUpdateState = bleManagerEmitter.addListener('BleManagerDidUpdateState', handleDidUpdateState);
    const subscriptionConnectPeripheral = bleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectPeripheral);

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }

    return (() => {
      console.log('unmount');
      subscriptionDiscoverPeripheral.remove();
      subscriptionStopScan.remove();
      subscriptionDisconnectPeripheral.remove();
      subscriptionDidUpdateValueForCharacterisctic.remove();
      subscriptionConnectPeripheral.remove();
      subscriptionDidUpdateState.remove();

      // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
      // bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
      // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
      // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    })
  }, []);

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
  // const renderItem1 = (item) => {
  //   const color = 'gray';
  //   if (connectedPeripheral == item.id) {
  //     return (
  //       <TouchableHighlight onPress={() => ConnectPeripheral(item)}>
  //         <View style={[styles.row, { backgroundColor: color }]}>
  //           <Text style={{ fontSize: 20, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name}</Text>
  //           <SignalLevelIndicator signalStrength={item.rssi}/>
  //           <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
  //         </View>
  //       </TouchableHighlight>
  //     );
  //   }
  //   else
  //     return (
  //       <></>
  //     )



  // }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />

          }
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}


        >
          {/* {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )} */}
          <View style={styles.body}>

            <View style={{ margin: 10, }}>
              {/* <TouchableHighlight
              title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
              onPress={() => startScan()}
              >

              </TouchableHighlight> */}
              <Button
                color={'#7209B7'}
                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                onPress={() => startScan()}
              />
            </View>
            {/* 
            {(connectedPeripheral != null) &&
              <View style={{ flex: 1, margin: 20 }}>
                <Text >Connected Devices</Text>
              </View>
            } */}


            {/* 
            <View style={{margin: 10}}>
              <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
            </View> */}
            {/* 
            {(list.length == 0) &&
              <View style={{ flex: 1, margin: 20 }}>
                <Text style={{ textAlign: 'center' }}>No peripherals</Text>
              </View>
            } */}

          </View>

        </ScrollView>
        {/* <FlatList
          data={list}
          renderItem={({ item }) => renderItem1(item)}
          keyExtractor={item => item.id}
        /> */}

        {/* {(connectedPeripheral != null) &&
          <View style={{ flex: 1, margin: 20 }}>
            <Text style={{ color: "red" }} >Other Devices</Text>
          </View>
        } */}
        <FlatList
          data={list}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id}
        />
        <>

        </>
        {/* <FlatList
          data={list}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id}
        /> */}
      </SafeAreaView>
    </>
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
  imgSensor: { width: 60, height: 75, resizeMode: 'contain' },

});

export default ConnectionScreen;