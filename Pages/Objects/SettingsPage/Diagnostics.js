import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import { ContextConfigurationValues } from '../../../App';
let peripheralID = '0'

let DiagnosticsParams = Paramsfiltered.find(DiagnosticsParams => DiagnosticsParams.Tag === "Diagnostics");
let MenuParams = DiagnosticsParams.menu;
const possibleValuesSimProcVar = MenuParams.filter(key=>key.Tag=="Simulation Process Variable")[0].PossibleValues;

const StackDiagnostics = createStackNavigator();
const TextComponents = ["Simulation Process Variable Value Conductivity", "Simulation Process Variable Value Concentration", "Simulation Process Variable Value Temperature"]
const SwitchComponents = ["Simulation Process Variable"]
const ReadableComponents = ["Last Diagnostics", "Actual Diagnostics"]

const renderItem = ({ item, navigation, context = null }) => (
  Item(item.Tag, item.Value, navigation, context = context)
);

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
const CheckButtoned = (selectedValue, sentValue) => {
  if (selectedValue === sentValue) {
    return (

      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, justifyContent: "space-between", flexDirection: "row"
      }}>
        <Text style={{ color: 'black' }}>{sentValue}</Text>
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
      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, flexDirection: "row"
      }}>
        <Text>{sentValue}</Text>
      </View>
    )
  }
}
const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, context, maxbytesize = 512) => {

  BleManager.write(peripheralId, serviceUUID, characteristicUUID, BufferArray(value), maxbytesize).then(() => {
    console.log("Data Written")
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

  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}
function Item(title, value, navigation, context = context) {
  if (TextComponents.includes(title)) {
    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Simulation Process Variable', { Tag: title, Value: value, name: title })}>
        <ItemValueBar item={title} value={context[MenuParams.filter(row => row.Tag == title)[0].Index]}/>
      </TouchableOpacity>)

  }
  else if (SwitchComponents.includes(title)) {
    var switchValues = (Values.filter(row => row.Tag == 'Diagnostics'))[0].menu.filter(row => row.Tag == title)[0]["Possible Values"];
    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switchable Components', { Tag: title, Value: value, SwitchableValues: switchValues, name: title })}>
              <ItemValueBar item={title} value={possibleValuesSimProcVar.filter(key=> key.Enum == context[MenuParams.filter(row => row.Tag == title)[0].Index])[0].Tag} />
      </TouchableOpacity>
      )
  }

  else if (ReadableComponents.includes(title)) {
    return (
      <View style={styles.item}>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}> {context[MenuParams.filter(row => row.Tag == title)[0].Index]} </Text>
      </View>

    )
  }
  else {
    return
  }

}
function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
const SimulationProcessVariableScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)
  // const objKeyWritableMap = { "Simulation Process Variable Value Conductivity": "53", "Simulation Process Variable Value Concentration": "54", "Simulation Process Variable Value Temperature": "55" }

  const { Tag } = route.params;

  // let HexIndex = 0
  // switch (Tag) {
  //   case "Simulation Process Variable Value Conductivity":
  //     HexIndex = '53'
  //     break;
  //   case "Simulation Process Variable Value Concentration":
  //     HexIndex = '54'
  //     break;
  //   case "Simulation Process Variable Value Temperature":
  //     HexIndex = '55'
  //     break;
  //   default:
  //   // code block
  // }

  const filteredAT =MenuParams.filter(row => row.Tag == Tag)[0];
  const index = filteredAT.Index;
  const [text, setText] = React.useState((context[index]).toFixed(3));

  function fixNumtoFloat(float) {
    const str = float.toFixed(15).split("").reverse().join("")
  }
  fixNumtoFloat(context[index])
  return (


    <View>
      <TextInput
        label={"Set " + Tag}
        value={text}
        // selectionColor='#000'
        // underlineColor='#000'
        // activeOutlineColor='#000'
        // outlineColor='#000'
        // activeUnderlineColor='#000'
        error={false}
        maxLength={8}
        keyboardType='numeric'
        right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
        onChangeText={text => setText(text)}
      />
      {/* <Text>Text Here. Lenght --{'>'} {32} </Text>  */}
      {/* <Text>Enter a unique name for the measuring point to identify the device within the plant. Lenght --{'>'} {lenght} </Text>  */}
      {text != context[index] && isItNumber(text) &&
        <Button
          onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Diagnostics","Set Parameters":{"${index}":${text}}}`, context) }}
          title="Save"
          color="#841584"
          accessibilityLabel="Save Configuration"
        />}
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}

    </View>
  );
};





const SwitchVariableScreen = ({ route, navigation }) => {
  const { Tag } = route.params;
  const context = useContext(ContextConfigurationValues)
  const filteredAT =MenuParams.filter(row => row.Tag == Tag)[0];
  const SwitchableValues = filteredAT.PossibleValues;
  const index = filteredAT.Index;
  const [text, setText] = React.useState(SwitchableValues.filter(key=> key.Enum==context[index])[0].Tag);

  const renderItemSelectable = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => { setText(item.Tag) }} >
        {CheckButtoned(text, item.Tag)}
        {/* <Text>{text + "Enabled"}</Text> */}
      </TouchableOpacity>)
  }
  useEffect(() => {
    if (text != SwitchableValues.filter(key=> key.Enum==context[index])[0].Tag) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Diagnostics","Set Parameters": {"${index}":${SwitchableValues.filter(row => row.Tag == text)[0].Enum}}}`, context) }}>
            <View style={styles.buttonBar}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
    else {
      navigation.setOptions({
        headerRight: () => (
          <></>
        ),
      });
    }
  });
  return (
    <View>

      <FlatList
        data={SwitchableValues}
        renderItem={renderItemSelectable}
        keyExtractor={item => item.Tag}
      />

    </View>
  );
};
const DiagnosticsMainScreen = ({route,navigation }) => {
const context = useContext(ContextConfigurationValues)

return(
  <SafeAreaView style={styles.container}>
    <FlatList
      data={MenuParams}
      renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
      keyExtractor={item => item.Tag}
    />
  </SafeAreaView>)
}
const DiagnosticsScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });
  const context = useContext(ContextConfigurationValues)



  //---------------------------------------------------------------





  // ------------------------------------------



  return (
    <StackDiagnostics.Navigator initialRouteName='Diagnostics Main' screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackDiagnostics.Screen name='Diagnostics Main' component={DiagnosticsMainScreen} options={{ headerTitle: 'Diagnostics' }} />
      <StackDiagnostics.Screen name='Simulation Process Variable' component={SimulationProcessVariableScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackDiagnostics.Screen name='Switchable Components' component={SwitchVariableScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
    </StackDiagnostics.Navigator>

  );
}

export default DiagnosticsScreen

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
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,



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
