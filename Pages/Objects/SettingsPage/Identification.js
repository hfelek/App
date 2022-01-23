import React,{useContext} from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList,Alert, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import { ContextConfigurationValues } from '../../../App';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import KeyValueJSON from '../../KeyNames.json'

const StackIdentification = createStackNavigator();

var filtered;
var filteredAT;


const IdentificationParams = Paramsfiltered.find(IdentificationParams => IdentificationParams.Tag === "Identification");
const MenuParams = IdentificationParams.menu;
const ITEMSINPAGE = {
  "Application Tag":"18",
  "Device Name":"12",
  "Device ID1":"09",
   "Device ID2":"0A",
  "Device ID3":"0B",
  "Vendor Name":"10",
  "Vendor ID1":"07",
  "Vendor ID2":"08",
  "Device Serial No":"15",
  "Hardware Version":"16",
  "Firmware Version":"17",
  "Order Code":"41",
  "Device Type":"42",
  "User Role":"43"
}
let peripheralID='0'
const AlertLocal =() => {
  console.log("I am Here")
  return(
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: 'Success',
    textBody:'Congrats! this is toast notification success',
  })
  )
}
const HandleWriteCommand = (peripheralId,serviceUUID,characteristicUUID,value,context,maxbytesize=512)=>{
  
  BleManager.write(peripheralId,serviceUUID,characteristicUUID, BufferArray(value),maxbytesize)  .then(() => {
    console.log("data written")
    // Command is written from BLEAPP to ESP32, Global Object in APP will be changed
     let setParameters= JSON.parse(value)["Set Parameters"]
    console.log(setParameters)

    for (const item in setParameters) {
       context.setValueByKey(item,setParameters[item])
       console.log(context["18"])
    }
  // AlertLocal()
    Alert.alert("Configuration Successfull!")
  })
  .catch((error) => {
    // Failure code
    Alert.alert("Couldn't Handle Configuration. Please, Check Your Connection!")

    console.log("error")
    console.log(error);
  });///////////Here Writes to the BLE Peripheral
  
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}


const ApplicationTagScreen = () => {
  const contextConfigurationValues = useContext(ContextConfigurationValues) 

  // React.useEffect(() => {  
  filtered = Values.filter(row => row.Tag == 'Identification');
  filteredAT = filtered[0].menu.filter(row => row.Tag == 'Application Tag');
  
  // },[]);
  const [text, setText] = React.useState(contextConfigurationValues["18"]);
 
  return (
    <View>
      <TextInput
        label="Set Your Application Tag"
        value={text}
        // selectionColor='#000'
        // underlineColor='#000'
        // activeOutlineColor='#000'
        // outlineColor='#000'
        // activeUnderlineColor='#000'
        error={false}
        right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
        onChangeText={text => setText(text)}
      />
        {/* <LenghtChecker lenght={32} /> */}
        {(contextConfigurationValues["18"] !=  text) &&
        <Button
        onPress={() =>{ HandleWriteCommand(peripheralID,"a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",`{"Tag":"Identification", "Set Parameters": {"18":"${text}"}}`,contextConfigurationValues)}} 
        title="Save"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />}
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
      


    </View>
  );
};
function IdentificationMainScreen  ({ navigation }){
  const context = useContext(ContextConfigurationValues)
  return(<SafeAreaView style={styles.container}>
    <FlatList
      initialNumToRender={MenuParams.length}
      data={MenuParams}
      renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
      keyExtractor={item => item.Tag}
    />
  </SafeAreaView>)
}
function Item(title, value, navigation = null, context = null) {
  switch (title) {
    case 'Application Tag':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Application Tag')}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
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
const renderItem = ({ item, navigation, context = null }) => (
  Item(item.Tag, item.Value, navigation, context = context)
);
const IdentificationScreen = ({ route, navigation }) => {

  
  const contextConfigurationValues = useContext(ContextConfigurationValues) 

  React.useEffect(() => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
      // Success code
    
      console.log(JSON.stringify(peripheralsArray[0].id));
      peripheralID=peripheralsArray[0].id
    }).catch(() => {
      console.log("Couldnt Find A peripheral");
      // expected output: "Success!"
    });
    },[]);
  





  // console.log(JSON.stringify(IdentificationParams));
  // console.log(JSON.stringify(MenuParams));







  return (
    <StackIdentification.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackIdentification.Screen name='Identification Main' component={IdentificationMainScreen} options={{headerTitle:"Identification"}} />
      <StackIdentification.Screen name='Application Tag' component={ApplicationTagScreen} />
    </StackIdentification.Navigator>

  );
}

export default IdentificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 
    padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 8,
    flexDirection: 'column',
    paddingTop: 0,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  title: {
    fontSize: 15,
    color: 'black',
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
  }
});

