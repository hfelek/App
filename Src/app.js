import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConnectionScreen from './Pages/ConnectionScreen.js';
import DeviceScreen from './Pages/DeviceScreen.js';
import SettingsScreen from './Pages/SettingsScreen.js';

// function DeviceScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Device!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Connection" component={ConnectionScreen} />
        <Tab.Screen name="Device" component={DeviceScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;