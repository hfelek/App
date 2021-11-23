/**
 * 
 * @flow
 * @format
 * 
 */

import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid,Platform } from 'react-native';
import { useState,useEffect  } from 'react';


// const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location permission is required for WiFi connections',
//         message:
//           'This app needs location permission as this is required  ' +
//           'to scan for wifi networks.',
//         buttonNegative: 'DENY',
//         buttonPositive: 'ALLOW',
//       },
// );
// if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     // You can now use react-native-wifi-reborn
// } else {
//     // Permission denied
// }
const demoConnection = [{title:"ble1",id:"id1"},{title:"ble2",id:"id2"},{title:"ble3",id:"id3"},{title:"ble4",id:"id4"}]
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style= {styles.title}>{title}</Text> 
  </View>
);
var wifiList={}
export function getObjectProperty(obj,proptery){
  return obj[proptery]
}
DeviceScreen = () =>{
  const [permission,setPermission]=useState(false)
  const [wifi,setWifi]=useState("noDeviceConnected")
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
            console.log("Permission is OK");
        } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("User accept");
                    setPermission(true)
                } else {
                    console.log("User refuse");
                    setPermission(false)
                    
                }
            });
        }
    });
    }
    
    const scanExample = async () => {
      try {
        const data = await WifiManager.reScanAndLoadWifiList()
        console.log(data);
        setWifi(data);
      } catch (error) {
        console.log(error);
        return error;
      }
   
      
    }
    // const scanExample = async () => {
    //   try {
    //     const data = await WifiManager.reScanAndLoadWifiList()
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }    
  // var returnVal=0
  // var promise = new Promise(function(resolve,reject) {
  //   wifiList.Val1="in Promise constructor function ";
  //   setTimeout(function(){
  //     wifiList.Val2="in setTimeout callback";
  //     resolve(WifiManager.loadWifiList())
  //   },5000);
  // });
  // wifiList.Val3="created promise"
  // promise.then(function(result){
  //   wifiList.Val4=("promise returned: " + result);
  // });
  // wifiList.Val5="hooked promise.then"
  const renderItem = ({item}) => (
    <Item title = {item}/>
  );
  //var wifiList=WifiManager.loadWifiList()
  scanExample()
    return (
      
      <SafeAreaView style={styles.container}>
        <Text>{wifi==="noDeviceConnected" ? "No Connection" : wifi.map(function(x) { return getObjectProperty(x, "SSID"); })}</Text>
        <FlatList
          data={wifi.map(function(x) { return getObjectProperty(x, "SSID"); })}
          renderItem={renderItem}
          keyExtractor={item =>item}
          
        />
        <Text>{wifi==="noDeviceConnected" ? "No Connection" : JSON.stringify(wifi) }</Text>
      </SafeAreaView>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    marginTop:  0,
  },
  item: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default DeviceScreen;