import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConnectionScreen from './Pages/ConnectionScreen.js';
import DeviceScreen from './Pages/DeviceScreen.js';
import SettingsScreen from './Pages/SettingsScreen.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableHighlight, Platform, TextInput, FlatList, StatusBar,
} from 'react-native';
import ConfigurationValuesInitialState from "./Pages/Objects/SettingsPage/IOLINKISDU.json"
import ProcessDataInitialState from "./Pages/Objects/SettingsPage/ProcessData.json"
import ActionBarImage from './Src/EliarIconImage.js';
import BleManager from 'react-native-ble-manager';
// function getHeaderTitle(route) {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route) ;

//   return routeName;
// }


/////


export const ContextSensorValues = React.createContext(null);
export const ContextConfigurationValues = React.createContext(null);
// export const ContextAppState = React.createContext(null);
/////
//Screen Names and Logos Settings
const screenOptions = ({ route, color }) => {
  let iconName;

  switch (route.name) {
    case 'Connection':
      iconName = 'wifi';
      break;
    case 'Device':
      iconName = "hardware-chip-outline";
      break;
    case 'Settings':
      iconName = 'settings-outline';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={25} />;
};

const Tab = createBottomTabNavigator();

const App = ({route,Navigator}) => {
  const [configurationValues, setConfigurationValues] = useState(ConfigurationValuesInitialState);
  // var configurationValues = ConfigurationValuesInitialState;
  // function setConfigurationValues(obj){
  //   configurationValues=obj;
  // }
  const [sensorValues, setSensorValues] = useState(ProcessDataInitialState)

  const objectParams = JSON.parse(JSON.stringify(configurationValues))

  
  function setValueByKey(ISDUIndex,Value) {

    var newState = { ...configurationValues, [ISDUIndex]:Value };
    setConfigurationValues(newState);
  }
  const setValueTotal=(object)=>{
    // console.log("In setValueTotal Function")
    console.log(" Incoming Message Object ==>")
    console.log (JSON.stringify(object))
    // console.log(Object.assign(objectParams, configurationValues, object))
    // console.log("----------------------------Set Fonksiyonu Çağırılmadan Önce-------------------")
    // console.log(configurationValues)

    setConfigurationValues(Object.assign(objectParams, object));
    console.log("-------------------------------OBJECT PARAMS--------------------------")
    console.log(objectParams)
    console.log("----------------------------Set Fonksiyonu Çağırıldıktan Sonra-------------------")
    console.log(configurationValues)
  }

  function getContextValue(){
    return configurationValues
 }
  function setProcessData(Value) {
    setSensorValues(Object.assign({}, sensorValues, Value));
  }


  const contextConfigurationValuesSetters = {
     setValueByKey,
     setValueTotal,
  }
  const contextSensorValuesSetters = {
    setProcessData    
 }

 React.useEffect(() => {
    console.log
  console.log("Config Value Changed")
  console.log(JSON.stringify(configurationValues))

}, [configurationValues]);




  return (
 <ContextConfigurationValues.Provider value = {{...configurationValues,...contextConfigurationValuesSetters}}>
 <ContextSensorValues.Provider value= {{...sensorValues, ...contextSensorValuesSetters}}>
    <NavigationContainer >
      <Tab.Navigator screenOptions={  ({ route }) => ({tabBarIcon:  ({ color }) => screenOptions({ route, color })})} initialRouteName="Connection"  >
        <Tab.Screen name="Connection" component={ConnectionScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Device" component={DeviceScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Settings" component={SettingsScreen}options={styles.tabScreenOptions } />

      </Tab.Navigator>
    </NavigationContainer>
  </ContextSensorValues.Provider>
  </ContextConfigurationValues.Provider>
  );
}
export default App;

/////Tab Header Settings 
const styles = StyleSheet.create({
  tabScreenOptions : {
      headerStyle: {
      backgroundColor: '#000000',
      height: 50
      

    },
    headerRight: (props) => <ActionBarImage {...props} />,
    headerTintColor: 'rgba(255,255,255,0.84)',
    headerTitleStyle: {
    fontWeight: 'normal',
    },
    headerTitleAlign: 'center',
    tabBarInactiveTintColor: "#777777",
    tabBarActiveTintColor: "#000000", //Only Works for Ios
    tabBarActiveBackgroundColor: '#d9f4ff',
    backgroundColor: '#d9f4ff',

  },
  
})

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};