import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Pressable, Text, Modal, View, Button, Alert, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
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
import { Picker } from '@react-native-picker/picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import InputScrollView from 'react-native-input-scroll-view';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
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
let peripheralID = '0'

const CustomCoeffParams = Values.filter(item => item.Tag === "Temperature Coefficient Custom")[0];
let MenuParams = CustomCoeffParams.menu;
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
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
          <ItemBar item={title} />

        </TouchableOpacity>
      )
    case 'Configuration 2':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
          <ItemBar item={title} />
        </TouchableOpacity>
      )
    case 'Configuration 3':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
          <ItemBar item={title} />

        </TouchableOpacity>
      )
    case 'Configuration 4':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
          <ItemBar item={title} />

        </TouchableOpacity>
      )
    case 'Configure Table':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          {/* <Text style={styles.value}>{value}</Text> */}
        </TouchableOpacity>
      )
    case 'Configuration':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Configuration', { name: "Custom Temperature Coefficient" })}>
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
const TextInputCoeff = (initialVal, setFunction) => {
  return (
    <TextInput style={styles.input}
      value={initialVal}
      // placeholder={nonLinearParamT1}
      onChangeText={(text) => (setFunction(text))}
      // onBlur={(text) =>handleTextChangeEnd(text,item)}
      maxLength={5}
      editable

      keyboardType="numeric"
    />)
}
const PickerItems = (arr) => (
  <Text></Text>
)

function Coeffs(title, value, setValue) {
  return (
    <View>
      <Text style={styles.basicText}>  {title}  </Text>
      <TextInput style={styles.input}
        value={value}
        // placeholder={nonLinearParamT1}
        onChangeText={(text) => (setValue(text))}
        // onBlur={(text) =>handleTextChangeEnd(text,item)}
        maxLength={5}
        editable

        keyboardType="numeric"
      />
    </View>)
}
function CustomConfigurationScreen({ route, navigation }) {
  const { Tag } = route.params;
  const { ConfigNum } = route.params;
  const initialObj = MenuParams.filter(item => item.Tag === ConfigNum)[0];
  const initialObjConfig = initialObj.Config;
  const initialNrofTemperaturePoints = initialObjConfig.filter(item => item.Tag === "Number of Temperature Points in the Custom Table")[0];
  const initialNrofConcentrationPoints = initialObjConfig.filter(item => item.Tag === "Number of Concentration Points in the Custom Table")[0];
  const [nrOfTempPoints, setNrOfTempPoints] = useState("1")
  const [nrOfConcPoints, setNrOfConcPoints] = useState("1")


  return (
    <ScrollView style={styles.container2}>
      <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]}  >
        <Text style={[styles.title, { textAlign: 'center', color: 'black' }]}>Number of Temperature Points in the Table</Text>
      </View>


      <View style={[styles.pickerText]} >
        <Picker style={styles.picker}
          selectedValue={nrOfTempPoints}
          onValueChange={(itemValue, itemIndex) =>
            setNrOfTempPoints(itemValue)
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
      </View>
      <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]}  >
        <Text style={[styles.title, { textAlign: 'center', color: 'black' }]}>Number of Concentration Points in the Table</Text>
      </View>

      <View style={styles.pickerText} >
        <Picker style={styles.picker}
          selectedValue={nrOfConcPoints}
          onValueChange={(itemValue, itemIndex) =>
            setNrOfConcPoints(itemValue)
          }>

          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
      </View>

      <Button
        onPress={() => navigation.navigate('Custom Temperature Coefficient', { Tag: ConfigNum, ConfigNum: ConfigNum, name: "Custom Temperature Coefficient", ConcentrationPoints: nrOfConcPoints, TemperaturePoints: nrOfTempPoints })}

        title="Configure Coefficients"
        color="#841584"
      />
    </ScrollView>
  )
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

function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? "0.0" : zeros(dimensions.slice(1)));
  }

  return array;
}
const element = (data, index, cellIndex, value, setValue) => {
  const [focused, setFocused] = react.useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <TouchableOpacity onPress={()=>{focused? setFocused(false):setFocused(true)}}>

    <View style={[styles.btn5, { alignItems: 'center', alignContent: "center", backgroundColor: (cellIndex == 0 || index == 0) ? "#808B97" : 'white', paddingBottom: 0, borderRadius: 0, borderBottomWidth: 0, borderBottomEndRadius: 0 }]}>

      <TextInput
        disabled={false}
        style={styles.input1}
        value={value[index][cellIndex]}
        keyboardType="numeric"
        maxLength={7}
        underlineColor={(cellIndex == 0 || index == 0) ? "#808B97" : 'white'}
        selectionColor='black'
        activeUnderlineColor={(cellIndex == 0 || index == 0) ? "#808B97" : 'white'}
        backgroundColor={(cellIndex == 0 || index == 0) ? "#808B97" : 'white'}
        textAlign='center'
        scrollEnabled={false}
        onChangeText={(val) => { updateCell(val, index, cellIndex, value, setValue) }}
      />
    </View>

  )
}
const updateCell = (value, i, j, array, func) => {
  let newMatrix = array.slice(); // just to create a copy of the matrix
  newMatrix[i][j] = value;
  func(newMatrix); // this call will trigger a new draw
}
const text = (data, index) => (
  <View style={[styles.btn5, { alignContent: "center", backgroundColor: 'white', paddingBottom: 0 }]}>
    <Text>{"value"}</Text>
  </View>
);
const TemperatureCoefficientScreen = ({ route, navigation }) => {
  const { Tag } = route.params;
  const { ConcentrationPoints } = route.params;
  const { TemperaturePoints } = route.params;
  const { ConfigNum } = route.params;
  const temperaturePoints = parseInt(TemperaturePoints)
  const concentrationPoints = parseInt(ConcentrationPoints)
  const emptyArr = zeros([temperaturePoints, concentrationPoints])
  const concentrationArray = ["0", "10", "20", "30", "40", "50"]
  const temperatureArray = ["-20", "0", "30", "40", "50", "60"]
  const tableHead = []; tableHead[0] = "Configuration Points"
  const widthArr = [150]
  for (let i = 1; i < concentrationPoints + 1; i += 1) {
    tableHead[i] = "Concentration Point" + `${i}`
    widthArr[i] = 150
  }
  //  const  tableHead=  ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9']
  //  const  widthArr= [200, 200, 200, 200, 200, 200, 200, 200, 200]

  const tableData = [];
  for (let i = 0; i < temperaturePoints + 1; i += 1) {
    const rowData = []
    for (let j = 0; j < concentrationPoints + 1; j += 1) {
      if (i == 0) {
        if (j == 0) {
          rowData.push("Empty")
          console.log("I am Here")
        }
        else {
          rowData.push(concentrationArray[j - 1])
        }

      }
      else {

        if (j == 0) {
          rowData.push(temperatureArray[i - 1])

        }
        else {
          rowData.push(emptyArr[i - 1][j - 1])
        }
      }
    }

    tableData.push(rowData);
  }
  console.log(tableData)
  const [hookArray, setHookArray] = react.useState(tableData);

  console.log(tableData)
  console.log("hookArray")
  console.log(hookArray.length)
  console.log(hookArray)

  console.log("hookArray")



  return (
    <ScrollView contentContainerStyle={{ alignSelf: 'center' }} style={{ paddingBottom: 40, backgroundColor: 'white' }} horizontal={false} >

      <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={{ backgroundColor: 'white' }} horizontal={true} >
        <View style={{ backgroundColor: 'white', }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#000000', shadowColor: 'white' }}>
          <Row data={["","Concentration Points"]} widthArr={[150,900]} style={[styles.header5,{paddingLeft:0}]} textStyle={styles.text5} />
          </Table>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#000000', shadowColor: 'white' }}>
            <Row data={tableHead} widthArr={widthArr} style={styles.header5} textStyle={styles.text5} />
          </Table>
          <Table borderStyle={{ borderWidth: 1, borderTopWidth: 1, paddingTop: 50, borderColor: '#000000' }}>
            {
              tableData.map((rowData, index) => (
                <TableWrapper key={index} style={[styles.row5, { paddingTop: 1 }]}>
                  {
                    rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={(cellIndex == 0 && index == 0) ? tableIndex() : element(cellData, index, cellIndex, hookArray, setHookArray)} />
                    ))
                  }
                </TableWrapper>
              ))
            }

            {/* Right Wrapper */}
            {/* <TableWrapper style={{ flex: 1 }}>
                <Cols data={tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text5} />
              </TableWrapper> */}


          </Table>
        </View>
      </ScrollView>
      {true &&
        <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
          <Button
            onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Current Output", "Set Parameters": {"${Tag}":"${text}"}}`, context) }}
            title="Save"
            color="#841584"
          />
        </View>
      }
    </ScrollView>


  )

};
const tableIndex = () => (
  <Image
    source={require("../../../Media/Index.png")}
    style={styles.img}
  />)

const TemperatureCoeffCustomScreen = ({ route, navigation }) => {
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
      <StackConductivity.Screen name='Configuration' component={ConfigurationNumScreen} options={{ headerTitle: "Custom Temperature Coefficient" }} />
      <StackConductivity.Screen name='Custom Configuration' component={CustomConfigurationScreen} options={({ route }) => ({ headerTitle: route.params.name })} />

      <StackConductivity.Screen name='Custom Temperature Coefficient' component={TemperatureCoefficientScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      {/* <StackConductivity.Screen name=' Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} /> */}

    </StackConductivity.Navigator>

  );
}












export default TemperatureCoeffCustomScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: "center", // 
    padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  container1: {
    justifyContent: "center", // 
    padding: 0,
    flexDirection: "column",
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  container2: {
    padding: 0,
    flexDirection: "column",
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  picker: {
    backgroundColor: '#D8D8D8',
    alignItems: "center",
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25
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
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 8,
    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'column',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center'
  },
  pickerText: {
    backgroundColor: '#ffffff',
    padding: 8,
    paddingLeft: 25,
    paddingRight: 25,

    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'column',

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
  input1: {
    // margin: 15,
    height: 30,
    // borderColor: '#7a42f4',
    // borderWidth: 1
  },
  containerSlider: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
  container2: { padding: 0, paddingTop: 0, backgroundColor: '#fff' },
  head2: { height: 40, backgroundColor: '#808B97' },
  text2: { margin: 6 },
  row2: { flexDirection: 'row', backgroundColor: '#ffffff' },
  btn2: { width: 58, height: 18, backgroundColor: '#005555', borderRadius: 2 },
  btnText2: { textAlign: 'center', color: '#fff' },
  container3: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  singleHead3: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  head3: { flex: 1, backgroundColor: '#c8e1ff' },
  title3: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText3: { marginRight: 6, textAlign: 'right' },
  text3: { textAlign: 'center' },
  btn3: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText3: { textAlign: 'center' },

  container4: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header4: { height: 50, backgroundColor: '#808B97', borderRadius: 1 },
  text5: { textAlign: 'center' },
  dataWrapper4: { marginTop: -1 },
  row4: { height: 40, backgroundColor: '#ffffff' },

  container1: {
    justifyContent: "center", // 
    padding: 0,
    flexDirection: "column",
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  header5: { height: 50, backgroundColor: 'red', borderRadius: 1 },

  row5: { flexDirection: 'row', backgroundColor: "#808B97", borderRightWidth: 1 },
  btn5: { width: 149, height: 50, backgroundColor: '#white', borderRadius: 1 },
  btn6: { width: 149, height: 50, backgroundColor: '#white', borderRadius: 1, borderBottomColor: 'white' },

  img: { width: 149, height: 50, borderRightWidth: 1 },

  btnText5: { textAlign: 'center', color: '#000' }
});


