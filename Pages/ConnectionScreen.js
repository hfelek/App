import React, { useState, useEffect } from 'react'
import { Platform, PermissionsAndroid, LogBox, NativeModules, NativeEventEmitter, StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'

import BleManager from 'react-native-ble-manager'
const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

//https://stackoverflow.com/questions/41146446/get-rid-of-remote-debugger-is-in-a-background-tab-warning-in-react-native/54392003#54392003
//check priority box in debugger (top left, to the right)
LogBox.ignoreLogs(['Remote debugger'])

 const ConnectionScreen = () => {


    const devicesfound = new Map()    //tried new Set()
    const [devices, setDevices] = useState([])
  
    //initialise ble manager
    useEffect( () => {
      //handle permissions
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
  
      BleManager.start({ showAlert: false }).then(() => {
        console.log("GM: BLE initialised")
      })
  
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan)
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverDevice)  //calls this if device discovered during scan
    }, [])
  
  
    const startScan = async () => {
      devicesfound.clear()
      setDevices([])
      try {
        console.log('GM Scanning...')
        await BleManager.scan([], 3, false)   //these options were supposed to stop duplicates??, false, {numberOfMatches: 1, matchMode: 1, scanMode: 1, reportDelay: 0} ) )  
      }
      catch(e) {
        console.log('GM: Error scanning ' + e)
      }
    }
  
    const stopScan = async () => {
      try {
        await BleManager.stopScan()
        console.log('GM: Stop scan')
        setDevices(Array.from(devicesfound))
      }
      catch(e) {
        console.log('GM: Error in stopping scan ' + e)
      }
    }
  
    const handleStopScan = () => {
      console.log('GM: Stopped scanning')
    }
  
    //if device discovered during scan
    const handleDiscoverDevice = (device) => {
      console.log(device.name)
      if (device.name !== null) {
        console.log('adding')
        devicesfound.set(device.id, device);
        setDevices(Array.from(devicesfound.values()));
      }
    }
  
    const listDevices = () => {
      devices.forEach(d => {console.log(d)})
    }
  
    const selectDevice = (d) => {
      console.log('here', d)
    }
  
    return (
      <View>
        <Text style={ styles.text }>Bluetooth</Text>
  
        <View style={ styles.scanContainer }>
          <TouchableOpacity style={ styles.button } onPress={startScan}>
            <Text>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.button } onPress={stopScan}>
            <Text>Stop Scan</Text>
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity style={styles.button} onPress={listDevices}>
          <Text>List devices</Text>
        </TouchableOpacity>
        
        {/* <ScrollView style={styles.scollview}> */}
          <FlatList
            data={devices}
            keyExtractor={devices => devices.id}
            renderItem={({ item }) => { 
              return <TouchableOpacity onPress={() => selectDevice({item}) } style={styles.devicerow}><Text style={styles.devicerowtext}>{item.name}</Text></TouchableOpacity> 
            }}
          />
        {/* </ScrollView> */}
  
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    scanContainer: {
      flexDirection: 'row'
    },
    button: {
      marginLeft: 20,
      marginTop: 20, 
      width: 150, 
      height: 70, 
      backgroundColor: 'lightgreen',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginLeft: 20,
      marginTop: 20, 
      fontSize: 20,
    },
    scrollview: {
      flex: 1,
    },
    devicerow: {
      backgroundColor: 'lemonchiffon',
      width: 350,
      height: 70,
      borderWidth: 1,
      borderColor: 'grey',  
      borderRadius: 10,
      marginTop: 20,
      marginLeft: 20,
    },
    devicerowtext: {
      marginLeft: 20,
      marginTop: 20, 
      fontSize: 20,
    },
  })
 
 export default ConnectionScreen;