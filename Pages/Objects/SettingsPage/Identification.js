import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
// import LenghtChecker from '../../../Navigation/Functions/Utililty';
// import react from 'react';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import navigateBackFunction from "../../../Utilities/navigateBackFunction"
const StackIdentification = createStackNavigator();

var filtered;
var filteredAT;

// const navigateBackFunction = (showWarning) => {
//   const navigation = useNavigation();
//   console.log(showWarning)
//   if (true) {
//     return(
//     <TouchableOpacity onPress={() => Alert.alert("Settings Isn't Saved!", "Do you want to leave page?", [
//       {
//         text: 'No',
//         style:'destructive',
//         onPress: () => console.log("cancelled"),
//       },
//       { text: 'Yes', onPress: () => navigation.goBack() },
//     ])}>
//       <Icon
//         name="arrow-back-outline"
//         size={35}

//         style={{ paddingLeft: 5 }}
//         color="black"
//       />
//     </TouchableOpacity>)



//   }
//   else {
//     return (
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Icon
//           name="arrow-back-outline"
//           size={35}

//           style={{ paddingLeft: 5 }}
//           color="black"
//         />
//       </TouchableOpacity>
//     )
//   }

// }
const IdentificationParams = Paramsfiltered.find(IdentificationParams => IdentificationParams.Tag === "Identification");
const MenuParams = IdentificationParams.menu;

let peripheralID = '0'
const AlertLocal = () => {
  return (
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'Congrats! this is toast notification success',
    })
  )
}
const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, context, maxbytesize = 512) => {

  BleManager.write(peripheralId, serviceUUID, characteristicUUID, BufferArray(value), maxbytesize).then(() => {
    // Command is written from BLEAPP to ESP32, Global Object in APP will be changed
    let setParameters = JSON.parse(value)["Set Parameters"]

    for (const item in setParameters) {
      context.setValueByKey(item, setParameters[item])
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

  ///If anything else is to be done, it will be done here!
}
const ItemValueBarRead = ({ item, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.title}>{item}</Text>
      <Text style={styles.value}>{value}</Text>

    </View>
  </View>
)

const ApplicationTagScreen = () => {
  const contextConfigurationValues = useContext(ContextConfigurationValues)

  // React.useEffect(() => {  
  filteredAT = MenuParams.filter(row => row.Tag == 'Specific Application Tag')[0];

  // },[]);
  const [text, setText] = React.useState(contextConfigurationValues[filteredAT["Index"]]);

  return (
    <View style={{ paddingLeft: 8, paddingTop: 10, paddingRight: 8, backgroundColor: 'white' }} >
      <TextInput
        // label="Set Your Application Tag"
        value={text}
        selectionColor='gray'
        outlineColor='gray'
        maxLength={32}
        underlineColor='transparent'
        activeUnderlineColor='transparent'
        style={{ fontSize: 14, backgroundColor: 'white', borderWidth: 1, height: 50, borderRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, textAlign: 'center', paddingLeft: 35 }}
        error={false}
        right={<TextInput.Icon name="close" size={15} style={{}} onPress={text => setText("")} />}
        onChangeText={text => setText(text)}

      />
      {/* <LenghtChecker lenght={32} /> */}
      <View style={{ paddingTop: 15, borderRadius: 20 }}>
        <Button
          onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Identification", "Set Parameters": {"${filteredAT["Index"]}":"${text}"}}`, contextConfigurationValues) }}
          // onPress={() => { console.log( `{"Tag":"Identification", "Set Parameters": {"${filteredAT["Index"]}":"${text}"}}`)}}

          title="Save"
          // color="#841584"
          disabled={contextConfigurationValues[filteredAT["Index"]] == text}


          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View style={{ paddingLeft: 3 }}>
        <Text style={{ color: 'gray' }} >Set Your Application Tag with Maximum of 32 Characters</Text>
      </View>
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}



    </View>
  );
};
function IdentificationMainScreen({ navigation }) {
  const context = useContext(ContextConfigurationValues)
  return (<SafeAreaView style={styles.container}>
    <FlatList
      initialNumToRender={MenuParams.length}
      data={MenuParams}
      renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
      keyExtractor={item => item.Tag}
    />
  </SafeAreaView>)
}
function Item(title, value, navigation = null, context = null) {
  // switch (title) {
  //   case 'Specific Application Tag':
  //     return (
  //       <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Application Tag')}>
  //         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

  //           <View>
  //             <Text style={styles.title}>{title}</Text>
  //             <Text style={styles.value}>{context[filteredAT = MenuParams.filter(row => row.Tag == 'Specific Application Tag')[0].Index]}</Text>
  //           </View>
  //           <View style={{ justifyContent: 'center' }}>
  //             <Icon
  //               name="chevron-forward-outline"
  //               size={20}
  //               color="#000"
  //             />
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     )
  // default:
  return (


    <View style={styles.itemButton}>
      <ItemValueBarRead item={title} value={context[filteredAT = MenuParams.filter(row => row.Tag == title)[0].Index]} />
    </View>


  )
  // };
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
      peripheralID = peripheralsArray[0].id
    }).catch(() => {
      console.log("Couldnt Find A peripheral");
      // expected output: "Success!"
    });
  }, []);






  // console.log(JSON.stringify(IdentificationParams));
  // console.log(JSON.stringify(MenuParams));






  return (
    <StackIdentification.Navigator screenOptions={{
      headerShown: true, headerTitleAlign: 'center', headerStyle: styles.headerStyle, headerLeft: () => (navigateBackFunction(false))
    }}>
      <StackIdentification.Screen name='Identification Main' component={IdentificationMainScreen} options={{
        headerTitle: "Identification",
      }} />
      {/* <StackIdentification.Screen name='Application Tag' component={ApplicationTagScreen} options={{ headerStyle: { borderBottomWidth: 1, borderBottomColor: 'black' } }} /> */}
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
  headerStyle: {
    shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
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

