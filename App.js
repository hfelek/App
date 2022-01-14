import * as React from 'react';
;
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
import ConfigurationValuesInitialState from "./Pages/ESP32New.json"
import SensorValuesInitialState from "./Pages/ICTSensorValues.json"
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

App = ({route,Navigator}) => {
  const [configurationValues, setConfigurationValues] = React.useState(ConfigurationValuesInitialState);
  const [sensorValues, setSensorValues] = React.useState(SensorValuesInitialState)
  
  
  
  
  function setValueByKey(ISDUIndex,Value) {
    console.log(ISDUIndex)
    // const newObject =JSON.parse(`{"${ISDUIndex}":"${Value}"}`)
    // console.log(`{"${ISDUIndex}":${Value}}`) 
    const newState = { ...configurationValues, [ISDUIndex]:Value };
    setConfigurationValues(newState);
  }
  function setSensorValue(Value) {
    // console.log(ISDUIndex)
    // const newObject =JSON.parse(`{"${ISDUIndex}":"${Value}"}`)
    // console.log(`{"${ISDUIndex}":${Value}}`) 
    const newState = { Value} ;
    console.log(Value)
    console.log("Iam in set Sensor Value")
    setSensorValues(newState);
  }


  const contextConfigurationValuesSetters = {
     setValueByKey
  }
  const contextSensorValuesSetters = {
    setSensorValue    
 }




  console.log("I am in Main Screen")
  return (
 <ContextConfigurationValues.Provider value = {{...configurationValues, ...contextConfigurationValuesSetters}}>
 <ContextSensorValues.Provider value= {{...sensorValues, ...contextSensorValuesSetters}}>
    <NavigationContainer >
      <Tab.Navigator screenOptions={ ({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions({ route, color })
      })} initialRouteName="Connection"  >
        <Tab.Screen name="Connection" component={ConnectionScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Device" component={DeviceScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Settings" component={SettingsScreen}      options={styles.tabScreenOptions } />

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