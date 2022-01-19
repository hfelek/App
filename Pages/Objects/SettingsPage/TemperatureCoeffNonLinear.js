import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
// import Values from '../Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Slider } from "@miblanchard/react-native-slider";
import ScrollViewNativeComponent from 'react-native/Libraries/Components/ScrollView/ScrollViewNativeComponent';
import { color, or, round } from 'react-native-reanimated';
import { RectButton } from 'react-native-gesture-handler';
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
let peripheralID = '0'

let nonLinearCoeffParams = Values.filter(item => item.Tag === "Temperature Coefficient Non-Linear")[0];
let MenuParams = nonLinearCoeffParams.menu;
// let subMenuParams = MenuParams.filter(row => row.Tag == 'Configuration 1')[0].menu;
const StackConductivity = createStackNavigator();


const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, maxbytesize = 512) => {
  BleManager.write(peripheralId, serviceUUID, characteristicUUID, value, maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}

function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}

function Item(title, value, navigation = null, context = null, parent = null) {
  switch (title) {
    case 'Configuration 1':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.value}>{value}</Text> */}
        </TouchableOpacity>
      )
    case 'Configuration 2':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.value}>{value}</Text> */}
        </TouchableOpacity>
      )
    case 'Configuration 3':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.value}>{value}</Text> */}
        </TouchableOpacity>
      )
    case 'Configuration 4':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.value}>{value}</Text> */}
        </TouchableOpacity>
      )
    case 'Configuration':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Configuration', { name: "Non-Linear Temperature Coefficient" })}>
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



function ConfigurationNumScreen({ route, navigation }) {
  // const { Tag } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, "hello", item.Tag))}
        keyExtractor={item => item.Tag}
        initialNumToRender={MenuParams.length}
      />
    </SafeAreaView>
  )
}




const TemperatureCoefficientScreen = ({ route, navigation }) => {
  const { Tag } = route.params;
  console.log(Tag)
  const { ConfigNum } = route.params;
  console.log(ConfigNum)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Conductivity', 'Set Parameters': {'78':'${nonLinearParamT1}','79':'${nonLinearParamC1}','7A':'${nonLinearParamT2}'},'7B':'${nonLinearParamC2}','7C':'${nonLinearParamT3}','7D':'${nonLinearParamC3}','7E':'${nonLinearParamT4}','7F':'${nonLinearParamC4}','80':'${nonLinearParamT5}','81':'${nonLinearParamC5}'}`)) }}>
          <View style={styles.buttonBar}>
            <Text>Save</Text>
          </View>
        </TouchableOpacity>
      ),
    })
  })


  const initialNonLinearParams = MenuParams.filter(row => row.Tag == ConfigNum)[0].menu
  const [nonLinearParams, setNonLinearParams] = useState(initialNonLinearParams)
  // const [linearParam, setLinearParam] = useState(initialLinearParams)
  const [nonLinearParams1, setNonLinearParams1] = useState(nonLinearParams)
  const [nonLinearParamT1, setNonLinearParamT1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 1")[0].Value)
  const [nonLinearParamT2, setNonLinearParamT2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 2")[0].Value)
  const [nonLinearParamT3, setNonLinearParamT3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 3")[0].Value)
  const [nonLinearParamT4, setNonLinearParamT4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 4")[0].Value)
  const [nonLinearParamT5, setNonLinearParamT5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 5")[0].Value)
  const [nonLinearParamT6, setNonLinearParamT6] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 6")[0].Value)
  const [nonLinearParamC1, setNonLinearParamC1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 1")[0].Value)
  const [nonLinearParamC2, setNonLinearParamC2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 2")[0].Value)
  const [nonLinearParamC3, setNonLinearParamC3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 3")[0].Value)
  const [nonLinearParamC4, setNonLinearParamC4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 4")[0].Value)
  const [nonLinearParamC5, setNonLinearParamC5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 5")[0].Value)
  const [nonLinearParamC6, setNonLinearParamC6] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 6")[0].Value)
  // console.log(nonLinearParamT1)
  // console.log()
  return (
    // <ReturnMenu param={compensationVal} />
    <SafeAreaView style={[styles.container, { flex: 1, flexDirection: "row" }]}>
      {/* <ScrollView style={{ flex: 1, flexDirection: "row" }}> */}
      <View style={{ flex: 1, paddingTop: 5 }}>
        <Text style={styles.basicText}>  Temperature Point 1 (°C)   </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT1}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT1(text))}
          ke
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Point 2 (°C)   </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT2}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT2(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Point 3 (°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT3}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT3(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Point 4 (°C)   </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT4}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT4(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Point 5 (°C)   </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT5}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT5(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Point 6 (°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamT6}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamT6(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
      </View>
      <View style={{ flex: 1, paddingTop: 5 }}>
        <Text style={styles.basicText}>  Temperature Coefficient 1 (%/°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC1}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC1(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}> Temperature Coefficient 2 (%/°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC2}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC2(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Coefficient 3 (%/°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC3}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC3(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Coefficient 4 (%/°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC4}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC4(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Coefficient 5 (%/°C)  </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC5}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC5(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
        <Text style={styles.basicText}>  Temperature Coefficient 6 (%/°C) </Text>
        <TextInput style={styles.input}
          value={nonLinearParamC6}
          // placeholder={nonLinearParamT1}
          onChangeText={(text) => (setNonLinearParamC6(text))}
          // onBlur={(text) =>handleTextChangeEnd(text,item)}
          maxLength={5}
          editable

          keyboardType="numeric"
        />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  )
};


const TemperatureCoeffNonLinearScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });


  return (
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConductivity.Screen name='Configuration' component={ConfigurationNumScreen} options={{ headerTitle: "Non-Linear Temperature Coefficient" }} />
      <StackConductivity.Screen name='Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      {/* <StackConductivity.Screen name=' Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} /> */}


    </StackConductivity.Navigator>

  );
}













export default TemperatureCoeffNonLinearScreen

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
  basicText: { color: "#000", textAlign: "center" },
  title: {
    fontSize: 15,
    color: 'black',
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,
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
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  containerSlider: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
});

