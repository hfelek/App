import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity, TouchableHighlight } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import Icon from 'react-native-vector-icons/Ionicons';
import react from 'react';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import { ContextConfigurationValues } from '../../../App';
const renderItem = ({ item, navigation, context = null }) => (
  Item(item.Tag, item.Value, navigation, context = context)
);
const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, maxbytesize = 512) => {
  BleManager.write(peripheralId, serviceUUID, characteristicUUID, value, maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}


let peripheralID = '0'
let ConfigurationParams = Paramsfiltered.find(ConfigurationParams => ConfigurationParams.Tag === "Setup Menu");
let MenuParams = ConfigurationParams.menu;
const StackConfiguration = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Setup Menu');
var filteredAT = filtered.filter(row => row.Tag == 'Active Configuration');
const CheckButtoned = (selectedValue, sentValue) => {
  if (selectedValue === sentValue) {
    return (

      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, justifyContent: "space-between", flexDirection: "row"
      }}>
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
const ReferenceTemperatureScreen = ({ route, navigation }) => {
  const valSystemUnits = Values.filter(row => row.Tag == 'System Units');
  const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Unit Temperature');
  const possibleValues = val[0].PossibleValues;
  const [selection, setSelection] = React.useState(val[0].Value);

  const renderItemSelectable = ({ item }) => (
    ItemSelectable(item.Tag)
  );
  function ItemSelectable(title) {

    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection(title) }}>
        {CheckButtoned(selection, title)}
      </TouchableOpacity>
    )
  }
  React.useEffect(() => {
    if (selection != val[0].Value) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'System Units', 'Set Parameters': {'6D':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`)) }}>
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
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={renderItemSelectable}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};
function Item(title, value, navigation = null, context = null) {
  switch (title) {
    case 'Active Configuration':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Active Configuration', { Tag: title, Value: value })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
      )
    case 'Reference Temperature':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Reference Temperature', { Tag: title, Value: value })}>
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
const ChangedButton = (initialValue, newValue, navigation) => {
  if (initialValue === newValue) {
    return (
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      </View>
    )
  }
  else {
    return (
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
      </View>
    )
  }
}
const ActiveConfigurationScreen = ({ route, navigation }) => {
  const { Tag } = route.params
  const valSystemUnits = Values.filter(row => row.Tag == 'Setup Menu')[0].menu;
  const val = valSystemUnits.filter(row => row.Tag == Tag)[0];
  const possibleValues = val.PossibleValues;
  const [selection, setSelection] = React.useState(val.Value);
  let hexIndex
  switch (selection) {
    case "Configuration 1":
      hexIndex = "0"
      break;
    case "Configuration 2":
      hexIndex = "1"
      break;
    case "Configuration 3":
      hexIndex = "2"
      break;
    case "Configuration 4":
      hexIndex = "3"
      break;

    default:
      break;
  }
  function ItemSelectable(title) {

    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection(title) }}>
        {CheckButtoned(selection, title)}
      </TouchableOpacity>
    )
  }
  const renderItemSelectable = ({ item }) => (
    ItemSelectable(item.Tag)
  );
  useEffect(() => {

    if (selection != val.Value) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output2', 'Set Parameters': {'AF':'${hexIndex}'}}`)) }}

          >
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={renderItemSelectable}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};
function ConfigurationMainScreen({ navigation }) {
  const context = useContext(ContextConfigurationValues)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>)
}
const ConfigurationScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });










  return (
    <StackConfiguration.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConfiguration.Screen name='Configuration Main' component={ConfigurationMainScreen} options={{ headerTitle: "Setup Menu" }} />
      <StackConfiguration.Screen name='Active Configuration' component={ActiveConfigurationScreen} />
      <StackConfiguration.Screen name='Reference Temperature' component={ReferenceTemperatureScreen} />

    </StackConfiguration.Navigator>

  );
}

export default ConfigurationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 
    padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,



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
    color: "black",
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


