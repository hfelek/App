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
import ActionBarImage from './Src/EliarIconImage.js';
import BleManager from 'react-native-ble-manager';
// function getHeaderTitle(route) {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route) ;

//   return routeName;
// }


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
  // BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
  //   // Success code

  //   console.log(JSON.stringify(peripheralsArray[0].id));
  //   console.log("App.js içinde Ble.Connection Check Edildi")
  //   // peripheralID=peripheralsArray[0].id
  // }).catch(() => {
  //   console.log("Couldnt Find A peripheral");
  //   // expected output: "Success!"
  // });
  return (

    <NavigationContainer >
      {/* <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions({route, color})  */}



      <Tab.Navigator screenOptions={ ({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions({ route, color })
      })} initialRouteName="Connection" >
        <Tab.Screen name="Connection" component={ConnectionScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Device" component={DeviceScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Settings" component={SettingsScreen}      options={styles.tabScreenOptions } />

      </Tab.Navigator>
    </NavigationContainer>
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