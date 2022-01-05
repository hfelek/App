// /**
//  * Sample BLE React Native App
//  *
//  * @format
//  * @flow strict-local
//  */

//  import React, { useState, useEffect } from 'react';
//  import {
//    SafeAreaView,
//    StyleSheet,
//    View,
//    Text,
//    StatusBar,
//    NativeModules,
//    NativeEventEmitter,
//    Button,
//    Platform,
//    PermissionsAndroid,
//    FlatList,
//    TouchableHighlight,
//  } from 'react-native';
 
//  import { Colors } from 'react-native/Libraries/NewAppScreen';
 
//  // import and setup react-native-ble-manager
//  import BleManager from 'react-native-ble-manager';
//  const BleManagerModule = NativeModules.BleManager;
//  const bleEmitter = new NativeEventEmitter(BleManagerModule);
 
//  // import stringToBytes from convert-string package.
//  // this func is useful for making string-to-bytes conversion easier
//  import { stringToBytes } from 'convert-string';
 
//  // import Buffer function.
//  // this func is useful for making bytes-to-string conversion easier
//  const Buffer = require('buffer/').Buffer;
 
//  const ConnectionScreen = () => {
//    const [isScanning, setIsScanning] = useState(false);
//    const [list, setList] = useState([]);
//    const peripherals = new Map();
//    const [testMode, setTestMode] = useState('read');
 
//    // start to scan peripherals
//    const startScan = () => {
 
//      // skip if scan process is currenly happening
//      if (isScanning) {
//        return;
//      }
 
//      // first, clear existing peripherals
//      peripherals.clear();
//      setList(Array.from(peripherals.values()));
 
//      // then re-scan it
//      BleManager.scan([], 3, true)
//        .then(() => {
//          console.log('Scanning...');
//          setIsScanning(true);
//        })
//        .catch((err) => {
//          console.error(err);
//        });
//    };
 
//    // handle discovered peripheral
//    const handleDiscoverPeripheral = (peripheral) => {
//      console.log('Got ble peripheral', peripheral);
 
//      if (peripheral.name) {
//        peripheral.name = 'NO NAME';
     
 
//      peripherals.set(peripheral.id, peripheral);
//      setList(Array.from(peripherals.values()));
//      }
//    };
 
//    // handle stop scan event
//    const handleStopScan = () => {
//      console.log('Scan is stopped');
//      setIsScanning(false);
//    };
 
//    // handle disconnected peripheral
//    const handleDisconnectedPeripheral = (data) => {
//      console.log('Disconnected from ' + data.peripheral);
 
//      let peripheral = peripherals.get(data.peripheral);
//      if (peripheral) {
//        peripheral.connected = false;
//        peripherals.set(peripheral.id, peripheral);
//        setList(Array.from(peripherals.values()));
//      }
//    };
 
//    // handle update value for characteristic
//    const handleUpdateValueForCharacteristic = (data) => {
//      console.log(
//        'Received data from: ' + data.peripheral,
//        'Characteristic: ' + data.characteristic,
//        'Data: ' + data.value,
//      );
//    };
 
//    // retrieve connected peripherals.
//    // not currenly used
//    const retrieveConnectedPeripheral = () => {
//      BleManager.getConnectedPeripherals([]).then((results) => {
//        peripherals.clear();
//        setList(Array.from(peripherals.values()));
 
//        if (results.length === 0) {
//          console.log('No connected peripherals');
//        }
 
//        for (var i = 0; i < results.length; i++) {
//          var peripheral = results[i];
//          peripheral.connected = true;
//          peripherals.set(peripheral.id, peripheral);
//          setList(Array.from(peripherals.values()));
//        }
//      });
//    };
 
//    // update stored peripherals
//    const updatePeripheral = (peripheral, callback) => {
//      let p = peripherals.get(peripheral.id);
//      if (!p) {
//        return;
//      }
 
//      p = callback(p);
//      peripherals.set(peripheral.id, p);
//      setList(Array.from(peripherals.values()));
//    };
 
//    // get advertised peripheral local name (if exists). default to peripheral name
//    const getPeripheralName = (item) => {
//      if (item.advertising) {
//        if (item.advertising.localName) {
//          return item.advertising.localName;
//        }
//      }
 
//      return item.name;
//    };
 
//    // connect to peripheral then test the communication
//    const connectAndTestPeripheral = (peripheral) => {
//      if (!peripheral) {
//        return;
//      }
 
//     //  if (peripheral.connected) {
//     //    BleManager.disconnect(peripheral.id);
//     //    return;
//     //  }
 
//      // connect to selected peripheral
//      BleManager.connect(peripheral.id)
//        .then((data) => {
//          console.log('Connected to ' + peripheral.id, peripheral);
//          console.log(data)
//          console.log("data")

//          // update connected attribute
//          updatePeripheral(peripheral, (p) => {
//            p.connected = true;
//            return p;
//          });
 
//          // retrieve peripheral services info
//          BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
//            console.log('Retrieved peripheral services');
//            console.log(peripheralInfo)
 
//            // test read current peripheral RSSI value
//            BleManager.readRSSI(peripheral.id).then((rssi) => {
//              console.log('Retrieved actual RSSI value', rssi);
 
//              // update rssi value
//              updatePeripheral(peripheral, (p) => {
//                p.rssi = rssi;
//                return p;
//              });
//            });
 
//            // test read and write data to peripheral
//            const serviceUUID = '5d3182dd-d58a-469d-a6c7-d160c0b7f716';
//            const charasteristicUUID = 'c2f8fea4-5876-4c1d-93ae-be9d438751cf';
 
//            console.log('peripheral id:', peripheral.id);
//            console.log('service:', serviceUUID);
//            console.log('characteristic:', charasteristicUUID);
//            console.log(testMode)

//            switch (testMode) {
//              case 'write':
//                // ===== test write data
//                const payload = 'pizza';
//                const payloadBytes = stringToBytes(payload);
//                console.log('payload:', payload);
 
//                BleManager.write(peripheral.id, serviceUUID, charasteristicUUID, payloadBytes)
//                  .then((res) => {
//                    console.log('write response', res);
//                    alert(`your "${payload}" is stored to the food bank. Thank you!`);
//                  })
//                  .catch((error) => {
//                    console.log('write err', error);
//                  });
//                break;
 
//              case 'read':
//                // ===== test read data
//                console.log("I am here")
//                BleManager.read("30:AE:A4:1A:04:1A", serviceUUID, charasteristicUUID)
//                  .then((res) => {
//                    console.log('read response', res);
//                    if (res) {
//                      const buffer = Buffer.from(res);
//                      const data = buffer.toString();
//                      console.log('data', data);
//                      alert(`you have stored food "${data}"`);
//                    }
//                  })
//                  .catch((error) => {
//                    console.log('read err', error);
//                    alert(error);
//                  });
//                break;
 
//              case 'notify':
//                // ===== test subscribe notification
//                BleManager.startNotification(peripheral.id, serviceUUID, charasteristicUUID)
//                  .then((res) => {
//                    console.log('start notification response', res);
//                  });
//                break;
 
//              default:
//                break;
//            }
//          });
//        })
//        .catch((error) => {
//          console.log('Connection error', error);
//        });
//    };
 
//    // mount and onmount event handler
//    useEffect(() => {
//      console.log('Mount');
 
//      // initialize BLE modules
//      BleManager.start({ showAlert: false }).then(() => {
//       // Success code
//       console.log("Module initialized");
//     }); 
//      // add ble listeners on mount
//      const subscriptionDiscoverPeripheral = bleEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//      const subscriptionStopScan = bleEmitter.addListener('BleManagerStopScan', handleStopScan);
//      const subscriptionDisconnectPeripheral = bleEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
//      const subscriptionDidUpdateValueForCharacteristic = bleEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);

//      // check location permission only for android device
//      if (Platform.OS === 'android' && Platform.Version >= 23) {
//        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((r1) => {
//          if (r1) {
//            console.log('Permission is OK');
//            return;
//          }
 
//          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((r2) => {
//            if (r2) {
//              console.log('User accept');
//              return
//            }
 
//            console.log('User refuse');
//          });
//        });
//      }
 
//      // remove ble listeners on unmount
//      return () => {
//       console.log('Unmount');
//       subscriptionDidUpdateValueForCharacteristic.remove()
//       subscriptionDisconnectPeripheral.remove()
//       subscriptionDiscoverPeripheral.remove()
//       subscriptionStopScan.remove()
//       //  bleEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
//       //  bleEmitter.removeListener('BleManagerStopScan', handleStopScan);
//       //  bleEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
//       //  bleEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
//      };
//    }, []);
 
//    // render list of devices
//    const renderItem = (item) => {
//      const color = item.connected ? 'green' : '#fff';
//      return (
//        <TouchableHighlight onPress={() => connectAndTestPeripheral(item)}>
//          <View style={[styles.row, {backgroundColor: color}]}>
//            <Text
//              style={{
//                fontSize: 12,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 10,
//              }}>
//              {getPeripheralName(item)}
//            </Text>
//            <Text
//              style={{
//                fontSize: 10,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 2,
//              }}>
//              RSSI: {item.rssi}
//            </Text>
//            <Text
//              style={{
//                fontSize: 8,
//                textAlign: 'center',
//                color: '#333333',
//                padding: 2,
//                paddingBottom: 20,
//              }}>
//              {item.id}
//            </Text>
//          </View>
//        </TouchableHighlight>
//      );
//    };
 
//    return (
//      <>
//        <StatusBar barStyle="dark-content" />
//        <SafeAreaView style={styles.safeAreaView}>
//          {/* header */}
//          <View style={styles.body}>
//            <View style={styles.scanButton}>
//              <Button
//                title={'Scan Bluetooth Devices'}
//                onPress={() => startScan()}
//              />
//            </View>
 
//            {list.length === 0 && (
//              <View style={styles.noPeripherals}>
//                <Text style={styles.noPeripheralsText}>No peripherals</Text>
//              </View>
//            )}
//          </View>
 
//          {/* ble devices */}
//          <FlatList
//            data={list}
//            renderItem={({item}) => renderItem(item)}
//            keyExtractor={(item) => item.id}
//          />
 
//          {/* bottom footer */}
//          <View style={styles.footer}>
//            <TouchableHighlight onPress={() => setTestMode('write')}>
//              <View style={[styles.row, styles.footerButton]}>
//                <Text>Store pizza</Text>
//              </View>
//            </TouchableHighlight>
//            <TouchableHighlight onPress={() => setTestMode('read')}>
//              <View style={[styles.row, styles.footerButton]}>
//                <Text>Get stored food</Text>
//              </View>
//            </TouchableHighlight>
//          </View>
//        </SafeAreaView>
//      </>
//    );
//  };
 
//  const styles = StyleSheet.create({
//    safeAreaView: {
//      flex: 1,
//    },
//    body: {
//      backgroundColor: Colors.white,
//    },
//    scanButton: {
//      margin: 10,
//    },
//    noPeripherals: {
//      flex: 1,
//      margin: 20,
//    },
//    noPeripheralsText: {
//      textAlign: 'center',
//    },
//    footer: {
//      flexDirection: 'row',
//      justifyContent: 'space-around',
//      width: '100%',
//      marginBottom: 30,
//    },
//    footerButton: {
//      alignSelf: 'stretch',
//      padding: 10,
//      backgroundColor: 'grey',
//    },
//  });
 
//  export default ConnectionScreen;
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
  const peripherals = new Map();
  const [list, setList] = useState([]);


  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 3, true).then((results) => {
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

  const handleDisconnectedPeripheral = (data) => {
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      setList(Array.from(peripherals.values()));
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  const handleUpdateValueForCharacteristic = (data) => {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    console.log("handleUpdatetedyim")
  }

  const retrieveConnected = () => {
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }
    });
  }

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
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            setList(Array.from(peripherals.values()));
          }
          console.log('Connected to ' + peripheral.id);


          setTimeout(() => {

            /* Test read current RSSI value */
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);

              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
                let p = peripherals.get(peripheral.id);
                if (p) {
                  p.rssi = rssi;
                  peripherals.set(peripheral.id, p);
                  setList(Array.from(peripherals.values()));
                }                
              });                                          
            });

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
            
            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
              console.log(peripheralInfo);
              var service = 'a65373b2-6942-11ec-90d6-0242ac130000';
              var bakeCharacteristic = 'a65373b2-6942-11ec-90d6-0242ac110100';
              var crustCharacteristic ='a65373b2-6942-11ec-90d6-0242ac130100';

              // setTimeout(() => {<
              //   BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
              //     console.log('Started notification on ' + peripheral.id);
                  setTimeout(() => {
                    BleManager.read(peripheral.id, service, crustCharacteristic).then((data) => {
                      console.log('Writed NORMAL crust');
                      console.log(data)
                      console.log(typeof(data))
                      const buffer = Buffer.from(data);
                      const data1 = buffer.toString();
                      console.log(data1);
                      console.log(typeof(data1))
                      console.log(data1.length)
                    });


                  }, 500);
              //   }).catch((error) => {
              //     console.log('Notification error', error);
              //   });
              // }, 200);
            });

            

          }, 900);
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
    const subscriptionDisconenctPeripheral = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
    const subscriptionDidUpdateValueForCharacterisctic = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

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
      subscriptionDisconenctPeripheral.remove();
      subscriptionDidUpdateValueForCharacterisctic.remove();

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
              <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
            </View>

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