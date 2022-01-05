
/**
 * Sample BLE React Native App
 *
 * @format
 * @flow strict-local
 */

 import React, {
  useState,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Button,
  Platform,
  PermissionsAndroid,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const Buffer = require('buffer/').Buffer;

const ConnectionScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [deviceConnected, setDeviceConnected] = useState(false)
  const peripherals = new Map();
  const [list, setList] = useState([]);



  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 4, true).then((results) => {
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
  }
  const handleDidUpdateState = () => {
    console.log('Handled DidUpdateState');

  }
  const handleConnectPeripheral = () => {
    console.log('Handled DidUpdateState');

  }

  handleConnectPeripheral
  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      setDeviceConnected(false)
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    console.log("handleUpdatetedyim")
  }

  // const retrieveConnected = () => {
  //   BleManager.getConnectedPeripherals([]).then((results) => {
  //     if (results.length == 0) {
  //       console.log('No connected peripherals')
  //     }
  //     console.log(results);
  //     for (var i = 0; i < results.length; i++) {
  //       var peripheral = results[i];
  //       peripheral.connected = true;
  //       setDeviceConnected(true);
  //       peripherals.set(peripheral.id, peripheral);
  //       setList(Array.from(peripherals.values()));
  //     }
  //   });
  // }

  const handleDiscoverPeripheral = (peripheral) => {
    if (peripheral.name) {
    console.log('Got ble peripheral', peripheral);

    peripherals.set(peripheral.id, peripheral);
    setList(Array.from(peripherals.values()));
    }
  }

  const testPeripheral = (peripheral) => {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
        ////Burada Periyodik olan şeyle yapılabilir
        console.log("BleManager.disconnect(peripheral.id)")


      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          console.log("peripherals")

          console.log(peripherals);
          if (p) {
            p.connected = true;
            setDeviceConnected(true);
            console.log("deviceConnected yazılıyor:")

            console.log(deviceConnected)
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          setDeviceConnected(true);

          console.log('Connected1 to ' + peripheral.id);
          console.log("deviceConnected:");
          console.log(deviceConnected);

          setTimeout(() => {

            /* Test read current RSSI value */
            console.log("RSSI Bölümüne Girdik");

            //////////////////////
            // BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
            //   console.log(peripheralInfo);
            //   console.log("step1")
            //   //Buraya Loglarda Girmiyor!!
            //   setTimeout(() => {
 
            //   BleManager.readRSSI(peripheral.id).then((rssi) => {
            //     console.log('Retrieved actual RSSI value', rssi);
            //     //Buraya Loglarda Girmiyor!!
            //     let p = peripherals.get(peripheral.id);
            //     if (p) {
            //       console.log("retreived services set")
            //       p.rssi = rssi;
            //       peripherals.set(peripheral.id, p);
            //       setList(Array.from(peripherals.values()));
            //     }                
            //   });                
            // }, 500);
                          
            // });
///////////////
            /////////////
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              console.log("RSSI Kısmındayız")
                  setTimeout(() => {
                    BleManager.readRSSI(peripheral.id).then((rssi) => {
                    console.log("rssi");
                    console.log(rssi);
                    });


                  }, 500);
              //   }).catch((error) => {
              //     console.log('Notification error', error);
              //   });
              // }, 200);
            });
            ////////////////////
            console.log("RSSI Bölümünden Çıktık");

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            console.log("Servis Bölümüne Girdik");

            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              console.log(peripheralInfo.characteristics.filter(row => row.characteristic == 'a65373b2-6942-11ec-90d6-0242a0110100')[0].properties);
              var service = 'a65373b2-6942-11ec-90d6-024200130000';
              var sensorCharacteristic ='a65373b2-6942-11ec-90d6-024200130600';
              console.log("Buradayım1")
              // setTimeout(() => {<
              //   BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
              //     console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => {
                    BleManager.read(peripheral.id, service, sensorCharacteristic).then((data) => {
                      console.log('Read Data');
                      // console.log(data)
                      // console.log(typeof(data))
                      const buffer = Buffer.from(data);
                      const data1 = buffer.toString();
                      console.log(data1);
                      // console.log(typeof(data1))
                      // console.log(data1.length)
                    });


                  }, 500);
              //   }).catch((error) => {
              //     console.log('Notification error', error);
              //   });
              // }, 200);
            });

            console.log("Servis Bölümünden Çıktık");


          }, 2000);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }

  }

  useEffect(() => {
    BleManager.start({showAlert: false});

    const subscriptionDiscoverPeripheral = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    const subscriptionStopScan = bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
    const subscriptionDisconnectPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    const subscriptionDidUpdateValueForCharacterisctic = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    const subscriptionDidUpdateState= bleManagerEmitter.addListener('BleManagerDidUpdateState', handleDidUpdateState );
    const subscriptionConnectPeripheral= bleManagerEmitter.addListener('BleManagerConnectPeripheral', handleConnectPeripheral );

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
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => testPeripheral(item) }>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
          <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  console.log("deviceConnected:");

  console.log(deviceConnected);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            
            <View style={{margin: 10}}>
              <Button 
                title={'Scan Bluetooth (' + (isScanning ? 'on' : 'off') + ')'}
                onPress={() => startScan() } 
              />            
            </View>
            
            <View style={{margin: 10}}>
            <Text>{deviceConnected}</Text>
            

            </View>
{/* 
            <View style={{margin: 10}}>
              <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
            </View> */}

            {(list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
          
          </View>              
        </ScrollView>
        <FlatList
            data={list}
            renderItem={({ item }) => renderItem(item) }
            keyExtractor={item => item.id}
          />              
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
});

export default ConnectionScreen;