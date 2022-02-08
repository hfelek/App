import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Slider } from "@miblanchard/react-native-slider";
import ScrollViewNativeComponent from 'react-native/Libraries/Components/ScrollView/ScrollViewNativeComponent';
import { color, or, round } from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import { ContextConfigurationValues, ContextSensorValues } from '../../../App';


import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
let peripheralID = '0'
const activeConfigurationMenu = Paramsfiltered.filter(SetupMenu => SetupMenu.Tag === "Setup Menu")[0].menu;
const activeConfigurationIndex =activeConfigurationMenu.filter(tag => tag.Tag === "Active Configuration")[0].Index
const activeConfigurationPossibleValues =activeConfigurationMenu.filter(tag => tag.Tag === "Active Configuration")[0].PossibleValues

let TempCoeffParams = Paramsfiltered.find(ConductivityParams => ConductivityParams.Tag === "Temperature Coefficients");
let MenuParams = TempCoeffParams.menu;
// let subMenuParams = MenuParams.filter(row => row.Tag == 'Configuration 1')[0].menu;
const StackConductivity = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Temperature Coefficients');
const ItemBar = ({ item }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ height: 40, justifyContent: 'center' }}>
      <Text style={styles.title}>{item}</Text>
    </View>
    <View style={{ justifyContent: 'center' }}>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#000"
      />
    </View>
  </View>
)
const ItemValueBar = ({ item, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.title}>{item}</Text>
      <Text style={styles.value}>{value}</Text>

    </View>
    <View style={{ justifyContent: 'center' }}>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#000"
      />
    </View>
  </View>
)
const ConfigurationBar = ({ config, activeConfig }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

    <View style={{ justifyContent: 'center',height:40 }}>
      <Text style={styles.title}>{config}</Text>
     { config==activeConfig && <Text style={{fontSize:12,color:'black'}}>{"Active"}</Text>}

    </View>
    <View style={{ justifyContent: 'center' }}>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#000"
      />
    </View>
  </View>

  )
function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}

function Item(title, value, navigation = null, context = null, parent = null) {
  console.log(context[activeConfigurationIndex])
  let index=null;
  switch (title) {
    case 'Configuration 1':
    
      return (
        <TouchableOpacity style={title== context[activeConfigurationIndex] ? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Configuration', { Tag: title, HexIndex: "CC", name: title })}>
            <ConfigurationBar activeConfig={context[activeConfigurationIndex]} config={"Configuration 1"}/>
        </TouchableOpacity>
      )
    case 'Configuration 2':
      return (
        <TouchableOpacity style={title==context[activeConfigurationIndex]? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Configuration', { Tag: title, HexIndex: "CC", name: title })}>
            <ConfigurationBar activeConfig={context[activeConfigurationIndex]} config={"Configuration 2"}/>
        </TouchableOpacity>
      )
    case 'Configuration 3':
      return (
        <TouchableOpacity style={title==context[activeConfigurationIndex]? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Configuration', { Tag: title, HexIndex: "CC", name: title })}>
            <ConfigurationBar activeConfig={context[activeConfigurationIndex]} config={"Configuration 3"}/>

        </TouchableOpacity>
      )
    case 'Configuration 4':
      return (
        <TouchableOpacity style={title==context[activeConfigurationIndex]? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Configuration', { Tag: title, HexIndex: "CC", name: title })}>
            <ConfigurationBar activeConfig={context[activeConfigurationIndex]} config={"Configuration 4"}/>
        </TouchableOpacity>
      )
    case 'Conductivity Range':
      index = (MenuParams.filter(config=> config.Tag ==parent)[0].menu).filter(tag=>tag.Tag==title)[0].Index
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Conductivity Range', { Tag: title, ConfigNum: parent })}>
          <ItemValueBar item={title} value={context[index]} />
        </TouchableOpacity>
      )
    case 'Temperature Compensation':
      index = (MenuParams.filter(config=> config.Tag ==parent)[0].menu).filter(tag=>tag.Tag==title)[0].Index

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Temperature Compensation', { Tag: title, ConfigNum: parent })}>
          <ItemValueBar item={title} value={context[index]} />

        </TouchableOpacity>
      )

    case 'Reference Temperature':
      index = (MenuParams.filter(config=> config.Tag ==parent)[0].menu).filter(tag=>tag.Tag==title)[0].Index

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Reference Temperature', { Tag: title, ConfigNum: parent })}>
          <ItemValueBar item={title} value={context[index]} />

        </TouchableOpacity>
      )


    case 'Filter Time Constant':
      index = (MenuParams.filter(config=> config.Tag ==parent)[0].menu).filter(tag=>tag.Tag==title)[0].Index

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Filter Time Constant', { Tag: title, ConfigNum: parent })}>
          <ItemValueBar item={title} value={context[index]} />
        </TouchableOpacity>
      )
    default:
      return (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>

      )
  };
}

const ConductivityMainScreen = ({ navigation }) => {
  const context = useContext(ContextConfigurationValues);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[styles.itemActiveConfig,{backgroundColor:'green',borderRadius:15}]}>
          <Text style={[styles.title,{textAlign:'center'}]}>{"Active Configuration : Configuration 1"}</Text>
        </View> */}
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, context))}
        keyExtractor={item => item.Tag}
        initialNumToRender={MenuParams.length}
      />
    </SafeAreaView>)
}

const CheckButtoned = (selectedValue, sentValue) => {
  if (selectedValue === sentValue) {
    return (

      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, justifyContent: "space-between", flexDirection: "row"
      }}>
        <Text style={{ color: 'black' }}>{sentValue}</Text>
        <Icon
          name="checkmark-outline"
          size={20}
          color="#f54"
        />
      </View>
    )
  }
  else {
    return (
      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, flexDirection: "row"
      }}>
        <Text>{sentValue}</Text>
      </View>
    )
  }
}



function ConfigurationNumScreen({ route, navigation }) {
  const { Tag } = route.params;
  const subMenuParams = MenuParams.filter(row => row.Tag == Tag)[0].menu;
  const context = useContext(ContextConfigurationValues);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subMenuParams}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, Tag))}
        keyExtractor={item => item.Tag}
        initialNumToRender={MenuParams.length}
      />
    </SafeAreaView>
  )
}











const TemperatureCoeffScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });


  return (
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConductivity.Screen name='Conductivity Main' component={ConductivityMainScreen} options={{ headerTitle: "Conductivity Input" }} />
      <StackConductivity.Screen name='Configuration' component={ConfigurationNumScreen} options={({ route }) => ({ headerTitle: route.params.name })} />


    </StackConductivity.Navigator>

  );
}

export default TemperatureCoeffScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 
    padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  containerScroll: {
    flex: 1,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 8,
    flexDirection: 'column',
    paddingTop: 0,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  itemActiveConfig: {
    backgroundColor: '#008000',
    justifyContent: 'center',
    padding: 8,
  },
  basicText: { color: "#000", textAlign: "center" },
  title: {
    fontSize: 15,
    color: 'black',
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,
  },
  value: {
    fontSize: 12,
    color: 'gray',
  },
  itemButton: {
    backgroundColor: '#ffffff',
    padding: 8,
    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  },
  myText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  containerSlider: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
});

