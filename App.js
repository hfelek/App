import * as React from 'react';
;
import { NavigationContainer } from '@react-navigation/native';
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
    TouchableHighlight, Platform, TextInput, FlatList,
} from 'react-native';
// function DeviceScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Device!</Text>
//     </View>
//   );
// }

//Screen Names and Logos Settings
const screenOptions = (route, color) => {
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

App = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color}) => screenOptions(route, "#00ffff")
      })} initialRouteName ="Connection" >
        <Tab.Screen name="Connection" component={ConnectionScreen} options={styles.tabScreenOptions} />
        <Tab.Screen name="Device" component={DeviceScreen} options={styles.tabScreenOptions}  />
        <Tab.Screen name="Settings" component={SettingsScreen} options={styles.tabScreenOptions}  />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;

/////Tab Header Settings 
const styles =StyleSheet.create({
    tabScreenOptions : {
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: 'rgba(255,255,255,0.84)',
        headerTitleStyle: {
          fontWeight: 'normal',
        },
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: "yellow",
        tabBarActiveTintColor: "#000000",
      },
})
// function LogoTitle() {
//     return (
//       <Image
//         style={{ width: 50, height: 50 }}
//         source={require('./Media/eliar.png')}
//       />
//     );
//   }<