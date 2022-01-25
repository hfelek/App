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
// import MeasuredValuesScreen from './Objects/SettingsPage/Measured_Values'
// import SystemUnitsScreen from './Objects/SettingsPage/System_Units'
import ConductivityScreen from './Objects/SettingsPage/ConductivityScreen'
// import ConcentrationScreen from './Objects/SettingsPage/ConcentrationScreen'
// import Output1MainScreen from './Objects/SettingsPage/Output1'
// import Output2Screen from './Objects/SettingsPage/Output2'
import DisplayScreen from './Objects/SettingsPage/Display'
import CommunicationScreen from './Objects/SettingsPage/CommunicationScreen'
import SystemScreen from './Objects/SettingsPage/System'
import ConfigurationScreen from './Objects/SettingsPage/Configuration'
import TemperatureCoeffNonLinearScreen from './Objects/SettingsPage/TemperatureCoeffNonLinear'
import TemperatureCoeffLinearScreen from './Objects/SettingsPage/TemperatureCoeffLinear'
import TemperatureCoeffCustomScreen from './Objects/SettingsPage/TemperatureCoeffCustom'
import OperationModeScreen from './Objects/SettingsPage/OperationModeScreen'
import CurrentOutputScreen from './Objects/SettingsPage/CurrentOutputScreen'
import SwitchOutputScreeen from './Objects/SettingsPage/SwitchOutputScreen'
import DigitalInputScreen from './Objects/SettingsPage/DigitalInputScreen'
import CalibrationScreen from './Objects/SettingsPage/CalibrationScreen'

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
        <StackSettings.Screen name='Setup Menu' component={ConfigurationScreen} />
        <StackSettings.Screen name='Diagnostics' component={DiagnosticsScreen} />
        <StackSettings.Screen name='Temperature Coefficient Non-Linear' component={TemperatureCoeffNonLinearScreen} />
        <StackSettings.Screen name='Temperature Coefficient Linear' component={TemperatureCoeffLinearScreen} />
        <StackSettings.Screen name='Temperature Coefficient Custom' component={TemperatureCoeffCustomScreen} />
        <StackSettings.Screen name='Operation Mode IO' component={OperationModeScreen} />
        <StackSettings.Screen name='Conductivity Input' component={ConductivityScreen} />

        <StackSettings.Screen name='Display' component={DisplayScreen} />
        <StackSettings.Screen name='Communication' component={CommunicationScreen} />
        <StackSettings.Screen name='Current Output' component={CurrentOutputScreen} />
        <StackSettings.Screen name='System' component={SystemScreen} />
        <StackSettings.Screen name='Calibration' component={CalibrationScreen} />

        <StackSettings.Screen name='Switch Output' component={SwitchOutputScreeen} />
        <StackSettings.Screen name='Digital Input' component={DigitalInputScreen} />

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
