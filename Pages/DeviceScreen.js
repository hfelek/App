import React, { useEffect, useContext } from 'react'
import react from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Settings, Image, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, Button } from 'react-native';
import Values from './Objects/Paramsfiltered.json';
import { List } from 'react-native-paper';
import { ContextConfigurationValues, ContextSensorValues } from "../Src/contextConfiguration";
import Icon from 'react-native-vector-icons/Ionicons';
import HandleWriteCommandGroup from '../Utilities/BLEFunctions.js/HandleGroup';
import HandleWriteCommandGroupContext from '../Utilities/BLEFunctions.js/HandleGroupContext';
import BleManager from 'react-native-ble-manager';

let IdentificationParams;
let MenuParams;
var filtered;
var filteredAT;
let peripheralID = false

const conductivityParams = [{ "Tag": "μS/Cm", "Enum": 0 }, { "Tag": "mS/Cm", "Enum": 1 }];
const concentrationParams = [{ "Tag": "%", "Enum": 0 }, { "Tag": "Baume", "Enum": 1 }];
const temperatureParams = [{ "Tag": "°C", "Enum": 0 }, { "Tag": "°F", "Enum": 1 }];
const demoConnection = [{ Tag: "Application Tag", Value: "id1" }, { Tag: "Device Name", Value: "id2" }, { Tag: "Device Serial No", Value: "id3" }, { Tag: "Device Type", Value: "id4" }, { Tag: "Random Tag", Value: "Random Value" }]
const TableIndex = () => (
  <Image
    source={require("../Media/ICT200-C50.png")}
    style={styles.imgSensor}
  />)
DeviceScreen = () => {
  const contextConfiguration = useContext(ContextConfigurationValues)
  const contextValues = useContext(ContextSensorValues)
  console.log("here")
  console.log(contextValues)
  // const bottomValues = [{ "Tag": "Conductivity", "Value": `${contextValues["Process"]}` }, { "Tag": "Concentration", "Value": `${contextValues["Value"]["60"]}` }, { "Tag": "Temperature", "Value": `${contextValues["Value"]["61"]}` }]
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });
  const Item = ({ item }) => (
    <View style={styles.itemTab} >
      <Text style={[styles.titleTab, { textAlign: 'center' }]}>{item.Tag}</Text>
      <Text style={styles.titleTab1}>{item.Value}</Text>
    </View>
  );
  const ItemBottom = ({ item, index, seperators }) => (
    <View style={styles.itemTab} >
      {index == 0 ? <Text style={[styles.titleTab, { textAlign: 'center', borderTopWidth: 1 }]}>{item.Tag}</Text> : <Text style={[styles.titleTab, { textAlign: 'center' }]}>{item.Tag}</Text>
      }
      {/* <Text style={[styles.titleTab, { textAlign: 'center', borderTopWidth: StyleSheet.hairlineWidth }]}>{item.Tag}</Text> */}
      <View style={[styles.titleTabButton, { textAlign: 'center' }]}>
        <Text style={{ textAlign: 'center' }} >{item.Value}</Text>
      </View>
    </View>
  );

  const ValuesTab = () => (

    <View style={{ flex: 1 }}>
      <FlatList
        data={demoConnection}
        renderItem={({ item }) => (<Item item={item} />)}
      // keyExtractor={item => item.Tag}
      />
    </View>
  );
  const ValuesTabBottom = () => (
    <View style={{ height: 220, paddingTop: 0, width: '70%', justifyContent: 'center',paddingLeft:'0%',alignContent:'center',alignItems:'center' }}>
        <View style={{alignContent:'flex-start'}}>
      <TouchableOpacity style={{ paddingTop: 5 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 15, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
          <Icon name='close-circle-sharp' size={30} color="red" rounded='true' />

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black' }}>Conductivity</Text>
            <Text style={styles.sensorValuesText}>{contextValues["Conductivity"].toFixed(2) + " " + conductivityParams.find(value => value.Enum == contextValues["Unit Conductivity"]).Tag}</Text>
            {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Conductivity"]}</Text> */}
          </View>

        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 5 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 15, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
        <Icon name='checkmark-circle-sharp' size={30} color="green" rounded='true' />
          
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black' }}>Concentration</Text>
            <Text style={styles.sensorValuesText}>{contextValues["Concentration"].toFixed(2) + " " + concentrationParams.find(value => value.Enum == contextValues["Unit Concentration"]).Tag}</Text>
            {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Concentration"]}</Text> */}
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 5 }}>
      <View style={{ backgroundColor: 'white', borderRadius: 15, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
          <Icon name='checkmark-circle-sharp' size={30} color="green" rounded='true' />

          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black' }}> Temperature</Text>
            <Text style={styles.sensorValuesText}>{contextValues["Temperature"].toFixed(2) + " " + temperatureParams.find(value => value.Enum == contextValues["Unit Temperature"]).Tag}</Text>
            {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Temperature"]}</Text> */}
          </View>
        </View>
      </TouchableOpacity>


      </View>
    </View>
  );



  let windowWidth = Dimensions.get('window').width;
  let windowHeight = Dimensions.get('window').height;

  IdentificationParams = Values.find(IdentificationParams => IdentificationParams.Tag === "Identification");
  MenuParams = IdentificationParams.menu;
  if (peripheralID==false && false){
    return(
      <SafeAreaView style={styles.containerNoDevice}>

      <View style={styles.noDevice}>
        <Text style={{ alignContent: 'center', padding: 25 }}>No device connected</Text>
        <Icon name='warning-outline' size={100} color="#000" rounded='true' />
      </View>
      </SafeAreaView>)
  }
  else{

  return (
   


    <ScrollView style={[styles.container, { flexDirection: 'column', alignContent: 'center', flex: 1, backgroundColor: '#ffffff' }]}>

      {/* Top Component of Settings Page */}
      {true &&
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#000000' }} >
          <View style={{}}>
            <TableIndex />
          </View>
          <View style={{ flex: 3, paddingTop: 5, alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            <ValuesTabBottom />
          </View>

        </View>
      }

      {/* Bottom Componenent of Settings Page */}
      {true &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }} >

          <View style={[styles.titleTab1, { paddingTop: 0, paddingBottom: 15, borderBottomColor: '#D8E1E9', borderBottomWidth: StyleSheet.hairlineWidth }]}>
            <Text style={styles.bottomHeaderTitle}  >Alarm Status</Text>
            <View style={{ backgroundColor: '#D8E1E9', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
              <Text style={styles.bottomTextValues}>{contextValues["Status Alarm"] == false ? "No Alarm Detected" : "Alarm Detected"}</Text>
              <Icon
                name={contextValues["Status Alarm"] == false ? "checkmark-outline" : "alert-sharp"}
                size={18}
                color={contextValues["Status Alarm"] == false ? "black" : "black"}
                style={{ paddingRight: 5, alignContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 0, alignSelf: 'center', backgroundColor: contextValues["Status Alarm"] == false ? "green" : "red", width: 20, height: 20 }}
              />
            </View>
          </View>
          <View style={[styles.titleTab1, { paddingBottom: 15, borderBottomColor: '#D8E1E9', borderBottomWidth: StyleSheet.hairlineWidth }]}>
            <Text style={styles.bottomHeaderTitle} >Active Configuration</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={styles.bottomTextValues}>{"Configuration " + (contextValues["Active Configuration"] + 1).toString()}</Text>
            </View>
          </View>

        </SafeAreaView>
      }
      {true &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }} >

          <View style={styles.titleTab1}>
            <Text style={styles.bottomHeaderTitle} >Device Name</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={styles.bottomTextValues}>{contextConfiguration["1"]}</Text>
            </View>
          </View>
          <View style={styles.titleTab1}>
            <Text style={styles.bottomHeaderTitle} >Hardware Version</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={styles.bottomTextValues}>{contextConfiguration["5"]}</Text>
            </View>
          </View>
          <View style={[styles.titleTab1, { paddingTop: 2 }]}>
            <Text style={styles.bottomHeaderTitle}  >Firmware Version</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={styles.bottomTextValues}>{contextConfiguration["6"]}</Text>
            </View>
          </View>
          <View style={[styles.titleTab1, { paddingTop: 2 }]}>
            <Text style={styles.bottomHeaderTitle}  >Product Serial Number</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={styles.bottomTextValues}>{contextConfiguration["2"]}</Text>
            </View>
          </View>
          {/* <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
          <Button
            onPress={() => { HandleWriteCommandGroupContext('{"283":1,"15":4,"59":1.0000,"60":2.0000,"61":1111.0000,"62":11.0000,"63":11.0000,"64":11.0000,"65":11.0000, "66":11.0000, "67":11.0000, "68":11.0000, "69":999.0000, "70":9999.0000}', contextConfiguration) }}
            title="Save"
            color="#841584"
          />
        </View>
        <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
          <Button
            onPress={() => { HandleWriteCommandGroupContext('{"59":1.0000,"60":2.0000,"61":1111.0000,"62":11.0000,"63":11.0000,"64":11.0000,"65":11.0000, "66":11.0000, "67":11.0000, "68":11.0000, "69":999.0000, "70":9999.0000}', contextConfiguration) }}
            title="Save"
            color="#841584"
          />
        </View> */}

        </SafeAreaView>
      }
      {/* <View>
            <Text>
              {JSON.stringify(contextConfiguration)}
            </Text>
          </View> */}
    </ScrollView>
  )}
}

const styles = StyleSheet.create({
  container: {
    // alignContent:'center',
    // alignSelf:'center',
    // marginTop: StatusBar.currentHeight || 0,
    marginTop: 0,
  },
  containerNoDevice:{
    flex: 1,
    justifyContent: "center", // 
    padding: 0,
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  imgSensor: { width: 150, height: 225, borderRightWidth: 1, paddingLeft: 10 },

  titleTab: {
    backgroundColor: '#ffffff',
    padding: 6,
    fontSize: 15,
    color: '#000000',
    marginVertical: 0,
    marginHorizontal: 10

  }, bottomHeaderTitle: {
     fontWeight: '500', color: 'black', fontSize: 15
  },
  bottomTextValues: {
    paddingLeft: 5,
    color: 'black'
  },
  titleTab1: {
    backgroundColor: '#ffffff',
    paddingBottom: 10,
    borderBottomColor: '#D8E1E9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 17,
    color: '#000000',
    marginVertical: 0,
    marginHorizontal: 10

  },
  titleTabButton: {
    backgroundColor: '#ffffff',
    padding: 6,
    marginVertical: 0,
    marginHorizontal: 10,

  },
  sensorValuesText: {
    color: 'black',
    fontWeight: '400',
    paddingTop: 1,
    paddingBottom: 1,
    textAlign: 'center',
    fontSize: 20
  },
  itemTab: {
    backgroundColor: '#ffffff',
    padding: 1,
    marginVertical: 0,
    marginHorizontal: 0,

  },
  title: {
    fontSize: 12,
  },
  noDevice: {
    // backgroundColor:'rgba(255,255,255,0.26)',
    //  marginTop: '15%',
    margin: '10%',
    alignContent: 'center',
    borderRadius: 3,
    width: '80%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',

  }
});

export default DeviceScreen;