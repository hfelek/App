// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ConnectionScreen from '../Pages/ConnectionScreen.js';
// import DeviceScreen from '../Pages/DeviceScreen.js';
// import SettingsScreen from '../Pages/SettingsScreen.js';
// import Icon from 'react-native-vector-icons/Ionicons';

// // function DeviceScreen() {
// //   return (
// //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
// //       <Text>Device!</Text>
// //     </View>
// //   );
// // }
// s

// const screenOptions = (route, color) => {
//   let iconName;

//   switch (route.name) {
//     case 'Connection':
//       iconName = 'woman';
//       break;
//     case 'Device':
//       iconName = 'appstore-o';
//       break;
//     case 'Settings':
//       iconName = 'folder1';
//       break;
//     default:
//       break;
//   }

//   return <Icon name={iconName} color={color} size={24} />;
// };
// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarIcon: ({color}) => screenOptions(route, color),
//       })}>
//       {/* rest remains same */}
//     </Tab.Navigator>
//   );
// };
// const Tab = createBottomTabNavigator();

// App = () => {
//   return (
//     <NavigationContainer >
//       <Tab.Navigator screenOptions={({route}) => ({
//         tabBarIcon: ({color}) => screenOptions(route, color),tabBarOptions: {showIcon: true },
//       })}>
//         <Tab.Screen name="Connection" component={ConnectionScreen} />
//         <Tab.Screen name="Device" component={DeviceScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />

//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// export default App;