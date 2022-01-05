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
import ICTParams from '../Pages/Objects/ICTParams.json';
import Paramsfiltered from '../Pages/Objects/Paramsfiltered.json';
import onPressSettings from './Objects/SettingsPage/OnPressSettingsPage'
import { NavigationContainer } from '@react-navigation/native';
import { StackRouter } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';
import NativeHeadlessJsTaskSupport from 'react-native/Libraries/ReactNative/NativeHeadlessJsTaskSupport';


import IdentificationScreen from './Objects/SettingsPage/Identification'
import DiagnosticsScreen from './Objects/SettingsPage/Diagnostics'
import MeasuredValuesScreen from './Objects/SettingsPage/Measured_Values'
import SystemUnitsScreen from './Objects/SettingsPage/System_Units'
import ConductivityScreen from './Objects/SettingsPage/ConductivityScreen'
import ConcentrationScreen from './Objects/SettingsPage/ConcentrationScreen'
import Output1Screen from './Objects/SettingsPage/Output1'
import Output2Screen from './Objects/SettingsPage/Output2'
import DisplayScreen from './Objects/SettingsPage/Display'
import CommunicationScreen from './Objects/SettingsPage/CommunicationScreen'
import SystemScreen from './Objects/SettingsPage/System'











// const uniqueTags = [...new Set(ICTParams.map(item => item.Tag))];
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

SettingsScreen = ({ navigation,route }) => {
  const SettingsMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={Paramsfiltered}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      // navigation={navigation}
      />
    </SafeAreaView>)
  const renderItem = ({ item }) => { 
  
    return( 
  
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(item.Tag, { msg: "I came From Screen1" })}  >
      <Icon
        name={Paramsfiltered.find(row => row['Tag'] == item.Tag).Icon}
        size={20}
        color="#000"
      />
  
      <Text style={styles.title}>{"     " + item.Tag}</Text>
    </TouchableOpacity>)};






  
  // console.log(JSON.stringify(a, null, 4));

  return (
    // <NavigationContainer>
    <StackSettings.Navigator initialRouteName="SettingsMain" screenOptions={{headerShown:false}}>
      <StackSettings.Screen name='SettingsMain' component={SettingsMainScreen} />
      <StackSettings.Screen name='Identification' component={IdentificationScreen} />
      <StackSettings.Screen name='Diagnostics' component={DiagnosticsScreen} />
      <StackSettings.Screen name='Measured Values' component={MeasuredValuesScreen} />
      <StackSettings.Screen name='Conductivity' component={ConductivityScreen} />
      <StackSettings.Screen name='Concentration' component={ConcentrationScreen} />
      <StackSettings.Screen name='Output1' component={Output1Screen} />
      <StackSettings.Screen name='Output2' component={Output2Screen} />
      <StackSettings.Screen name='Display' component={DisplayScreen} />
      <StackSettings.Screen name='Communication' component={CommunicationScreen} />
      <StackSettings.Screen name='System Units' component={SystemUnitsScreen} />
      <StackSettings.Screen name='System' component={SystemScreen} />
    </StackSettings.Navigator>
    //  </NavigationContainer> 
  );
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
});

export default SettingsScreen;
