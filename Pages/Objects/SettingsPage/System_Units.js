import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Title } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import BufferArray from '../../../Navigation/Functions/BufferArray';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
const Buffer = require('buffer/').Buffer;
import BleManager from 'react-native-ble-manager';
let periprheralID='0'

let SystemUnitsParams = Paramsfiltered.find(SystemUnitsParams => SystemUnitsParams.Tag === "System Units");
let MenuParams = SystemUnitsParams.menu;
const StackSystemUnits = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'System Units');
var filteredAT = filtered.filter(row => row.Tag == 'Unit Conductivity');
const HandleWriteCommand = (peripheralId,serviceUUID,characteristicUUID,value,maxbytesize=512)=>{
  BleManager.write(peripheralId,serviceUUID,characteristicUUID,value,maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}


const SystemUnitsScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    periprheralID=peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });
  function Item(title, value) {
    switch (title) {
      case 'Unit Conductivity':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Unit Conductivity')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Unit Concentration':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Unit Concentration')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Unit Temperature':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Unit Temperature')}>
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





  // console.log(JSON.stringify(SystemUnitsParams));
  // console.log(JSON.stringify(MenuParams));

  const SystemUnitsMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const UnitConductivityScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'System Units');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Unit Conductivity');
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
          <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'System Units', 'Set Parameters': {'69':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`))}}>
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
  },)


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
  const UnitConcentrationScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'System Units');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Unit Concentration')[0];
    const possibleValues = val.PossibleValues;
    const [selection, setSelection] = React.useState(val.Value);
    const subValueToRender = val.SubSelectedValue;
    const [subSelection, setSubSelection] = React.useState(subValueToRender);
    const subSelectionList = val["SubList"];
    let HexIndex 
    let subIndex
    switch(selection) {
      case "NaCl":
        HexIndex='6A'
        break;
      case "NaOH":
        HexIndex='6B'
        break;
        case "Na2SO4":
        HexIndex='6C'
        break;
      default:
        // code block
    }
    switch(subSelection) {
      case "g/kg":
        subIndex='0'
        break;
      case "wt%":
        subIndex='1'
        break;
        case "Baume":
        subIndex='2'
        break;
      default:
        // code block
    }
    ///////////BURADA BİR BUG VAR... İLK DEĞERE TEKRAR TIKLAYINCA, SUBVALUE DEĞİŞMİYOR 
    
    React.useEffect(() => {
      if(selection != val.Value){
      setSubSelection(null)
      // console.log("subSelection:") 
      // console.log(subSelection)  
      
    }
    }, [selection]);

    // const subList = subSelectionList["NaCl"];

    const renderItemSelectable = ({ item }) => (
      ItemSelectable(item.Tag)
    );
    function ItemSelectable(title) {

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection(title),setSubSelection(null)}}>
          {CheckButtoned(selection, title)}
        </TouchableOpacity>
      )
    }
    const SubRenderItemSelectable = ({ item }) => (
      SubItemSelectable(item.Tag)
    );
    function SubItemSelectable(title) {

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => { setSubSelection(title) }} >
          {CheckButtoned(subSelection, title)}
        </TouchableOpacity>
      )
    }

    React.useEffect(() => {
      if ((selection != val.Value || subSelection !=subValueToRender) && (subSelection!=null)) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'System Units', 'Set Parameters': {'Tag':'${HexIndex}', ${subIndex}}}`))}}>
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

    },);

    return (
      <SafeAreaView style={{

        justifyContent: "flex-start", // 
        padding: 0,
        // marginTop: StatusBar.currentHeight || 0,
        paddingTop: 5,
      }}>
        <FlatList
          data={possibleValues}
          renderItem={renderItemSelectable}
          keyExtractor={item => item.Tag}
        />
        <Text style={styles.myText}>{selection}</Text>
        <FlatList
          data={subSelectionList[selection]}
          renderItem={SubRenderItemSelectable}
          keyExtractor={item => item.Tag}
        />

      </SafeAreaView>
    );
  };
  const UnitTemperatureScreen = ({ route, navigation }) => {
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
          <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'System Units', 'Set Parameters': {'6D':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`))}}>
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
  },)

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
  const renderItem1 = ({ item }) => (
    Item(item.Tag)
  );
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );

  return (
    <StackSystemUnits.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackSystemUnits.Screen name='System Units Main' component={SystemUnitsMainScreen} options={{ headerTitle: "System Units" }} />
      <StackSystemUnits.Screen name='Unit Conductivity' component={UnitConductivityScreen} />
      <StackSystemUnits.Screen name='Unit Concentration' component={UnitConcentrationScreen} />
      <StackSystemUnits.Screen name='Unit Temperature' component={UnitTemperatureScreen} />
    </StackSystemUnits.Navigator>

  );
}

export default SystemUnitsScreen

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
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,



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
