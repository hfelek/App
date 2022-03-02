import React, { useEffect, useContext } from 'react'
import react from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Settings, Image, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, Button } from 'react-native';
import Values from './Objects/Paramsfiltered.json';
import { List } from 'react-native-paper';
import { ContextConfigurationValues, ContextSensorValues } from '../App'
import Icon from 'react-native-vector-icons/Ionicons';
import HandleWriteCommandGroup from '../Utilities/BLEFunctions.js/HandleGroup';
import HandleWriteCommandGroupContext from '../Utilities/BLEFunctions.js/HandleGroupContext';

let IdentificationParams;
let MenuParams;
var filtered;
var filteredAT;
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
  // const bottomValues = [{ "Tag": "Conductivity", "Value": `${contextValues["Process"]}` }, { "Tag": "Concentration", "Value": `${contextValues["Value"]["60"]}` }, { "Tag": "Temperature", "Value": `${contextValues["Value"]["61"]}` }]

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
    <View style={{ height: 220, paddingTop: 8, width: 155, justifyContent: 'center' }}>

      <TouchableOpacity style={{ paddingTop: 5 }}>
        <View style={{ backgroundColor: '#808B97', borderRadius: 5 }}>
          <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Conductivity"].toFixed(2) + " " + conductivityParams.find(value => value.Enum == contextValues["Unit Conductivity"]).Tag}</Text>
          {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Conductivity"]}</Text> */}

        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 5 }}>
        <View style={{ backgroundColor: '#808B97', borderRadius: 5 }}>
          <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Concentration"].toFixed(2) + " " + concentrationParams.find(value => value.Enum == contextValues["Unit Concentration"]).Tag}</Text>
          {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Concentration"]}</Text> */}

        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ paddingTop: 5 }}>
        <View style={{ backgroundColor: '#808B97', borderRadius: 5 }}>
          <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Temperature"].toFixed(2) + " " + temperatureParams.find(value => value.Enum == contextValues["Unit Temperature"]).Tag}</Text>
          {/* <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1, textAlign: 'center' }}>{contextValues["Temperature"]}</Text> */}

        </View>
      </TouchableOpacity>


    </View>
  );



  let windowWidth = Dimensions.get('window').width;
  let windowHeight = Dimensions.get('window').height;

  IdentificationParams = Values.find(IdentificationParams => IdentificationParams.Tag === "Identification");
  MenuParams = IdentificationParams.menu;


  return (



    <ScrollView style={[styles.container, { flexDirection: 'column', alignContent: 'center', flex: 1, backgroundColor: '#ffffff' }]}>
      {false &&
        <View style={styles.noDevice}>
          <Text style={{ alignContent: 'center', padding: 25 }}>No device connected</Text>
          <Icon name='warning-outline' size={100} color="#000" rounded='true' />
        </View>}
      {/* Top Component of Settings Page */}
      {false &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#000000' }} >
          <View style={{}}>
            <TableIndex />
          </View>
          <View style={{ paddingTop: 5 }}>
            <ValuesTabBottom />
          </View>

        </View>
      }

      {/* Bottom Componenent of Settings Page */}
      {false &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }} >

          <View style={[styles.titleTab1, { paddingTop: 5 }]}>
            <Text style={{ color: 'black', fontSize: 15 }}  >Alarm Status</Text>
            <View style={{ backgroundColor: '#D8E1E9', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{contextValues["Status Alarm"] == false ? "No Alarm Detected" : "Alarm Detected"}</Text>
              <Icon
                name={contextValues["Status Alarm"] == false ? "checkmark-outline" : "alert-outline"}
                size={20}
                color={contextValues["Status Alarm"] == false ? "black" : "black"}
                style={{ paddingBottom: 1, alignSelf: 'center', backgroundColor: contextValues["Status Alarm"] == false ? "green" : "red", width: 20, height: 20 }}
              />
            </View>
          </View>
          <View style={styles.titleTab1}>
            <Text style={{ color: 'black', fontSize: 15 }} >Active Configuration</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{"Configuration " + (contextValues["Active Configuration"] + 1).toString()}</Text>
            </View>
          </View>

        </SafeAreaView>
      }
      {false &&
        <SafeAreaView style={{ backgroundColor: "#ffffff" }} >

          <View style={styles.titleTab1}>
            <Text style={{ color: 'black', fontSize: 15 }} >Device Name</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{contextConfiguration["1"]}</Text>
            </View>
          </View>
          <View style={styles.titleTab1}>
            <Text style={{ color: 'black', fontSize: 15 }} >Hardware Version</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{contextConfiguration["5"]}</Text>
            </View>
          </View>
          <View style={[styles.titleTab1, { paddingTop: 2 }]}>
            <Text style={{ color: 'black', fontSize: 15 }}  >Firmware Version</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{contextConfiguration["6"]}</Text>
            </View>
          </View>
          <View style={[styles.titleTab1, { paddingTop: 2 }]}>
            <Text style={{ color: 'black', fontSize: 15 }}  >Product Serial Number</Text>
            <View style={{ backgroundColor: '#D8E1E9' }}>
              <Text style={{ color: 'black', paddingTop: 1, paddingBottom: 1 }}>{contextConfiguration["2"]}</Text>
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
          <View>
            <Text>
              {JSON.stringify(contextConfiguration)}
            </Text>
          </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignContent:'center',
    // alignSelf:'center',
    // marginTop: StatusBar.currentHeight || 0,
    marginTop: 0,
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

  },
  titleTab1: {
    backgroundColor: '#ffffff',

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