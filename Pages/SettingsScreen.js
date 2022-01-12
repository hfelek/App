import * as React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Settings,
  VirtualizedList,
  TouchableOpacity,
  Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Paramsfiltered from '../Pages/Objects/Paramsfiltered.json';
import { NavigationContainer,useIsFocused,useFocusEffect } from '@react-navigation/native';
import { StackRouter } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';
import BleManager, { isPeripheralConnected } from 'react-native-ble-manager';

import IdentificationScreen from './Objects/SettingsPage/Identification'
import DiagnosticsScreen from './Objects/SettingsPage/Diagnostics'
import MeasuredValuesScreen from './Objects/SettingsPage/Measured_Values'
import SystemUnitsScreen from './Objects/SettingsPage/System_Units'
import ConductivityScreen from './Objects/SettingsPage/ConductivityScreen'
import ConcentrationScreen from './Objects/SettingsPage/ConcentrationScreen'
import Output1MainScreen from './Objects/SettingsPage/Output1'
import Output2Screen from './Objects/SettingsPage/Output2'
import DisplayScreen from './Objects/SettingsPage/Display'
import CommunicationScreen from './Objects/SettingsPage/CommunicationScreen'
import SystemScreen from './Objects/SettingsPage/System'


let peripheralID = null








// const a = Object.assign({}, uniqueTags);
// const navigation = useNavigation();
const StackSettings = createStackNavigator();

var filtered = Paramsfiltered.filter(row => row.Tag == 'Identification');

const demoConnection = [
  { title: 'Prop1', id: 'id1' },
  { title: 'Prop2', id: 'id2' },
  { title: 'Prop3', id: 'id3' },
  { title: 'Prop4', id: 'id4' },
];

const SettingsMainScreen = ({ navigation,route }) =>{
  console.log("I am in Settings Main")
  function renderItem ({ item }){
    console.log("I am here 1")
    return(
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(item.Tag, { msg: "I came From Screen1" })}  >
        <Icon
          name={Paramsfiltered.find(row => row['Tag'] == item.Tag).Icon}
          size={20}
          color="#000"
        />
  
        <Text style={styles.title}>{"     " + item.Tag}</Text>
      </TouchableOpacity>)
  }
  return(<SafeAreaView style={styles.container}>
    <FlatList
      initialNumToRender={Paramsfiltered.length}
      data={Paramsfiltered}
      renderItem={(item)=>renderItem(item)}
      keyExtractor={item => item.Tag}
      extraData={navigation}
    // navigation={navigation}
    />
  </SafeAreaView>)
  }
const SettingsScreen = ({ navigation, route }) => {

console.log("I am here Settings Screen")

  // if (peripheralID != null) {

  //   return (<View style={styles.noDevice}>
  //     <Text style={{ alignContent: 'center', padding: 25 }}>No device connected</Text>
  //     <Icon name='alert-circle-outline' size={100} color="#000" rounded='true' />
  //   </View>)
  // }

  // else {

  //   // console.log(JSON.stringify(a, null, 4));

    return (

      <StackSettings.Navigator screenOptions={{ headerShown: false }}>
        <StackSettings.Screen name='SettingsMain' component={SettingsMainScreen} />
        <StackSettings.Screen name='Identification' component={IdentificationScreen} />
        <StackSettings.Screen name='Diagnostics' component={DiagnosticsScreen} />
        <StackSettings.Screen name='Measured Values' component={MeasuredValuesScreen} />
        <StackSettings.Screen name='Conductivity' component={ConductivityScreen} />
        <StackSettings.Screen name='Concentration' component={ConcentrationScreen} />
        <StackSettings.Screen name='Output1' component={Output1MainScreen} />
        <StackSettings.Screen name='Output2' component={Output2Screen} />
        <StackSettings.Screen name='Display' component={DisplayScreen} />
        <StackSettings.Screen name='Communication' component={CommunicationScreen} />
        <StackSettings.Screen name='System Units' component={SystemUnitsScreen} />
        <StackSettings.Screen name='System' component={SystemScreen} />
      </StackSettings.Navigator>
    );
  // }
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    padding: 0,
    marginVertical: 0,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomEndRadius:-5,
    padding: 12,
    marginHorizontal: 0,

  },
  container: {
    flex: 1,
    justifyContent: "center", // 
    padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
  noDevice: {
    // backgroundColor:'rgba(255,255,255,0.26)',
    marginTop: '50%',
    margin: '10%',
    borderRadius: 3,
    width: '80%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',

  }
});

export default SettingsScreen;
