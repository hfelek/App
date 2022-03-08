import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react, { useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import navigateBackFunction from "../../../Utilities/navigateBackFunction"

let peripheralID = '0'

const CalibrationParams = Paramsfiltered.filter(CalibrationParams => CalibrationParams.Tag === 'Calibration')[0];
const MenuParams = CalibrationParams.menu;
const ConductivityRangesParam = MenuParams.filter(key => key.Tag == "Conductivity Ranges")[0].menu;
const AutoCalibrationIndex = MenuParams.filter(key => key.Tag == "Device Auto Calibration")[0].Index;

const StackCalibration = createStackNavigator();
const ItemBar = ({ item }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ height: 40, justifyContent: 'center' }}>
      <Text style={styles.title}>{item}</Text>
    </View>
    <View style={{ justifyContent: 'center' }}>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#000"
      />
    </View>
  </View>
)
const ItemValueBar = ({ item, value }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.title}>{item}</Text>
      <Text style={styles.value}>{value}</Text>

    </View>
    <View style={{ justifyContent: 'center' }}>
      <Icon
        name="chevron-forward-outline"
        size={20}
        color="#000"
      />
    </View>
  </View>
)
var filtered;
var filteredAT;
const createTwoButtonAlert = (title, msg, object, hexValue, context) =>
  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      onPress: () => console.log(object + "cancelled"),
      style: 'cancel',
    },
    { text: 'Yes', onPress: () => functionWriteBle(`"${AutoCalibrationIndex}"`, `${hexValue}`, context) },
  ]);


function functionWriteBle(indexKey, indexValue, context) {
  HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Calibration","Set Parameters":{${indexKey}:${indexValue}}}`, context)
}
function CalibrationMainScreen({ navigation }) {
  const context = useContext(ContextConfigurationValues);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, item.Tag))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>)
};

const CheckButtoned = (selectedValue, sentValue) => {
  if (selectedValue === sentValue) {
    return (

      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text>{sentValue}</Text>
        <Icon
          name="checkmark-outline"
          size={20}
          color="#f54"
        />
      </View>
    )
  }
  else {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{sentValue}</Text>
      </View>
    )
  }
}
function Item(title, value, navigation = null, context = null, parent = null) {
  switch (title) {


    case 'Conductivity Ranges':
      return (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() =>
            navigation.navigate('Calibration Parameters', { Tag: title, Value: value, name: title })
          }>
          <ItemBar item={title} />
        </TouchableOpacity>
      );


      break;
    case 'Device Auto Calibration':
      return (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => createTwoButtonAlert(
            'Alert',
            'Are you sure to start Auto Calibration?',
            title,
            '1',
            context
          )}>
          <ItemBar item={title} />

        </TouchableOpacity>
      );
      break;
    default:
      if(title.includes("mS/cm")){
      return (
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() =>
            navigation.navigate('Write Screen', { Tag: title, Value: value, name: title.split('cm ')[1] })
          }>
          {/* <ItemValueBar item={title} value={value}/> */}
          {console.log(title)}
          <ItemValueBar value={context[ConductivityRangesParam.filter(key => key.Tag == title)[0].Index]} item={title} />
        </TouchableOpacity>
      );
        }
  }
}
function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
const WriteScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues);

  const { Tag } = route.params;
  const { Value } = route.params;
  const index =ConductivityRangesParam.find(key => key.Tag == Tag).Index
  const [text, setText] = React.useState(context[index].toFixed(3));
  const slug = Tag.split('/cm ')[1];
  const upperBound = slug=='Mounting Factor' ? 1.1 : null;
  const lowerBound = slug=='Mounting Factor' ? 0.9 : null;
  useEffect(() => {


    if (Math.abs(text - context[index]) >= 0.001 && isItNumber(text) && (upperBound!=null ?upperBound>=text : true ) && (lowerBound!=null ?lowerBound<=text : true ))  {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
          onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Calibration", "Set Parameters": {"${index}":${Math.round(parseFloat(text)*1000)/1000}}}`, context) }}

          >
            <View style={styles.buttonBar}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        ),
        headerLeft: () => (navigateBackFunction(true))
        
      });
    }
    else {
      navigation.setOptions({
        headerRight: () => (
          <></>
        ),
        headerLeft: () => (navigateBackFunction(false))

      });
    }
  });

  return (
    <View>
      <TextInput
        // label={(Tag=='' ? 'Enter The Device Access Code!' : 'Set Your Access Code!' )}
        label={"Set " + slug}

        value={text}
        // selectionColor="#000"
        // underlineColor="#000"
        // activeOutlineColor="#000"
        outlineColor="#000"
        keyboardType='numeric'
        maxLength={8}

        // activeUnderlineColor='#000'
        error={false}
        right={
          <TextInput.Icon
            name="close-circle-outline"
            onPress={text => setText('')}
          />
        }
        onChangeText={text => setText(text)}
      />
      {/* <LenghtChecker lenght={32} /> */}
      {text != context[index] && isItNumber(text) && false &&

      <Button
        onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Calibration", "Set Parameters": {"${index}":${text}}}`, context) }}

        title="Save"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />}
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
    </View>
  );
};

function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}

const DeviceResetScreen = ({ route, navigation }) => {

  const context = useContext(ContextConfigurationValues);
  const valCalibrationUnits = Values.filter(row => row.Tag == 'Calibration');
  const val = valCalibrationUnits[0].menu.filter(row => row.Tag == 'Device Reset');
  const possibleValues = val[0].PossibleValues;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};

const CalibrationParameters = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues);

  const valCalibrationUnits = Values.filter(row => row.Tag == 'Calibration');
  const val = valCalibrationUnits[0].menu.filter(row => row.Tag == 'Conductivity Ranges');
  const possibleValues = val[0].menu;
  const lenght = Object.keys(possibleValues).length
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, context))}
        keyExtractor={item => item.Tag}
        initialNumToRender={lenght}
      />
    </SafeAreaView>
  );
};

const CalibrationScreen = ({ route, navigation }) => {

  const context = useContext(ContextConfigurationValues);

  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code
    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });












  // console.log(JSON.stringify(CalibrationParams));
  // console.log(JSON.stringify(MenuParams))

  // const CalibrationMainScreen = ({ navigation }) => (
  //   <SafeAreaView style={styles.container}>
  //     <FlatList
  //       data={MenuParams}
  //       renderItem={renderItem}
  //       keyExtractor={item => item.Tag}
  //     />
  //   </SafeAreaView>
  // );





  return (
    <StackCalibration.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' , headerStyle:styles.headerStyle,headerLeft: () => (navigateBackFunction(false))
    }}>
      <StackCalibration.Screen
        name="Calibration Main"
        component={CalibrationMainScreen}
        options={{ headerTitle: 'Calibration' }}
      />
      <StackCalibration.Screen name="Write Screen" component={WriteScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackCalibration.Screen name="Device Reset" component={DeviceResetScreen} />
      <StackCalibration.Screen name="Calibration Parameters" component={CalibrationParameters} />

    </StackCalibration.Navigator>
  );
};

export default CalibrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', //
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
    justifyContent: 'center',
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    width:70,
    marginRight: 3,
    borderRadius: 10,
  },  headerStyle: {shadowColor: "#222",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6},
  myText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
});
