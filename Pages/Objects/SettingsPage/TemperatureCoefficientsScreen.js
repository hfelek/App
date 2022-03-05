import React, { useEffect, useState, useRef, useContext } from 'react'
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
import { Buffer } from 'buffer';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import InputScrollView from 'react-native-input-scroll-view';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';

const activeConfigurationMenu = Values.find(SetupMenu => SetupMenu.Tag === "Setup Menu").menu;
const activeConfigurationIndex = activeConfigurationMenu.find(tag => tag.Tag === "Active Configuration").Index
const activeConfigurationPossibleValues = activeConfigurationMenu.find(tag => tag.Tag === "Active Configuration").PossibleValues

const MainMenu = Values.find(item => item.Tag === "Temperature Coefficients").SubMenu;
const CustomCoeffParams = MainMenu.find(item => item.Tag === "Temperature Coefficient Custom");
const MenuParams = CustomCoeffParams.menu;

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import { useLayoutEffect } from 'react';
import convertString from 'convert-string';
import { purpleA100 } from 'react-native-paper/lib/typescript/styles/colors';
function tableDataFunction(tempPoints, concPoints, context, configMenu) {



  const tableData = []
  for (let i = 0; i < tempPoints + 1; i += 1) {
    const rowData = []
    for (let j = 0; j < concPoints + 1; j += 1) {
      if (i == 0) {
        if (j == 0) {
          rowData.push("Empty")
        }
        else {
          rowData.push(context[configMenu.find(key => key.Tag == `Temperature Coefficient ${j}`).Index].toFixed(2))
        }

      }
      else {

        if (j == 0) {
          rowData.push(context[configMenu.find(key => key.Tag == `Temperature Point ${i}`).Index].toFixed(2))

        }
        else {
          rowData.push(context[configMenu.find(key => key.Tag == `Conductivity Point ${((i-1)*tempPoints)+j}`).Index].toFixed(2))
        }
      }
    }

    tableData.push(rowData);
  }

  return tableData;
}
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

const StackConductivity = createStackNavigator();


// function renderItem(item, navigation = null, context = null, parent) {
//   return (Item(item.Tag, item.Value, navigation, context, parent))
// }
const ConfigurationBar = ({ config, activeConfig }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

    <View style={{ justifyContent: 'center', height: 40 }}>
      <Text style={styles.title}>{config}</Text>
      {config == activeConfig && <Text style={{ fontSize: 12, color: 'black' }}>{"Active"}</Text>}

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

function calculatePayload(hookArray){
  let payload = ""
  const buf = Buffer.allocUnsafe(4);
  buf.writeInt32BE(hookArray.get('temp'), 0);
  for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

  buf.writeInt32BE(hookArray.get('conc'), 0);
  for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }


  for (let i = 0; i < hookArray.get('temp'); i++) {
    buf.writeFloatBE(hookArray.get('array')[i + 1][0], 0);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }
  }


  for (let i = 0; i < hookArray.get('conc'); i++) {
    // const buf = Buffer.allocUnsafe(4);
    buf.writeFloatBE(hookArray.get('array')[0][i + 1], 0);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

  }
  

  for (let i = 0; i < hookArray.get('temp'); i++) {
    for (let k = 0; k < hookArray.get('conc'); k++) {
      const buf = Buffer.allocUnsafe(4);
      buf.writeFloatBE(hookArray.get('array')[i + 1][k + 1], 0);
      for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

    }
  }
  console.log("Calculate Payload Function!")
  return payload
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


function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? "0.0" : zeros(dimensions.slice(1)));
  }

  return array;
}

const element = (data, index, cellIndex, value, setValue) => {

  function ChangeText(val, index, cellIndex, value) {
    var newMap = new Map(value)
    let newMatrix = newMap.get('array').slice(); // just to create a copy of the matrix
    newMatrix[index][cellIndex] = val
    newMap.set('array', newMatrix)
    return newMap


  }
  return (
    // <TouchableOpacity onPress={()=>{focused? setFocused(false):setFocused(true)}}>

    <View style={[cellIndex == 0 ? styles.btn5 : styles.btn6, { borderColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, alignItems: 'center', alignContent: "center", backgroundColor: (cellIndex == 0 || index == 0) ? ((cellIndex == 0) ? "red" : "blue") : 'white' }]}>

      <TextInput
        disabled={false}
        style={[styles.input1]}
        value={value.get('array')[index][cellIndex]}
        keyboardType="numeric"
        maxLength={7}
        underlineColor={(cellIndex == 0 || index == 0) ?(cellIndex == 0 ) ? 'red' : 'blue' : 'white'}
        selectionColor='#2a9df4'
        placeholder='0.0'
        activeUnderlineColor={(cellIndex == 0 || index == 0) ? 'black' : 'black'}
        backgroundColor={(cellIndex == 0 || index == 0) ? ((cellIndex == 0) ? "red" : "blue") : 'white'}
        textAlign='center'
        scrollEnabled={false}
        onChangeText={(val) => setValue(ChangeText(val, index, cellIndex, value))}
      // onEndEditing={()=>  updateCell(text, index, cellIndex, value, setValue)}
      />
    </View>

  )
}
const updateCell = (value, i, j, array, func) => {
  let newMatrix = array.get('array').slice(); // just to create a copy of the matrix
  newMatrix[i][j] = value;
  array.set('array', newMatrix)
  func(array); // this call will trigger a new draw

}
const updateTemp = (tempVal, concVal, array, func, funcModal, context, configMenu) => {
  let newMap = new Map(array);
  var arr = Array(tempVal + 1).fill().map(() => Array(concVal+ 1));



  var myArrCoeff = array.get('array');

  for (let i = 0; i < tempVal + 1; i++) {
    for (let k = 0; k < concVal + 1; k++) {
      if (i == 0) {
        if (k == 0) {
          arr[i][k] = 0
        }
        else {
          arr[i][k] = context[configMenu.find(key => key.Tag == `Temperature Coefficient ${k}`).Index].toFixed(2)
        }

      }
      else {

        if (k == 0) {
          arr[i][k] = context[configMenu.find(key => key.Tag == `Temperature Point ${i}`).Index].toFixed(2)

        }
        else {
          arr[i][k] = context[configMenu.find(key => key.Tag == `Conductivity Point ${((i - 1) * 6) + k}`).Index].toFixed(2)
        }
      }
    }
  }
  newMap.set('temp', tempVal)
  newMap.set('conc', concVal)

  newMap.set('array', arr);
  func(newMap); // this call will trigger a new draw
  funcModal(false)
}


const text = (data, index) => (
  <View style={[styles.btn5, { alignContent: "center", backgroundColor: 'white', paddingBottom: 0 }]}>
    <Text>{"value"}</Text>
  </View>
);
function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}

const TemperatureCoefficientScreen = ({ route, navigation }) => {
 const objOfPointsConcCond = {"Configuration 1" :83,"Configuration 2":133,"Configuration 3":183,"Configuration 4":233}
  const context = useContext(ContextConfigurationValues)
  const { Tag } = route.params;
  const { ConfigNum } = route.params;

  const configMenu = MenuParams.find(key => key.Tag == ConfigNum).menu
  const map1 = new Map();
  map1.set('temp', context[objOfPointsConcCond[ConfigNum].toString()]); map1.set('conc', context[(objOfPointsConcCond[ConfigNum]+1).toString()]); map1.set('array', tableDataFunction(map1.get('temp'), map1.get(('conc')), context, configMenu));
  // const [temperaturePoints, setTemperaturePoints] = useState(4);
  // const [concentrationPoints, setConcentrationPoints] = useState(4)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTemperaturePoints, setModalTemperaturePoints] = useState(map1.get('temp'));
  const [modalConcentrationPoints, setModalConcentrationPoints] = useState(map1.get('conc'));
  const [hookArray, setHookArray] = useState(map1);
  const widthArr = [150]


  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Pressable
              style={{
                alignSelf:'flex-end',
                borderRadius: 20,
                padding: 2,
                elevation: 2,
                backgroundColor: 'white'
              }}
              onPress={() => setModalVisible(false)}
            >
  
            </Pressable> */}
            <View style={styles.pickerText} >
              {/* {tableIndex()} */}
              <Text style={{ textAlign: 'center' }}>Temperature Points</Text>
              <Picker style={styles.picker}
                selectedValue={modalTemperaturePoints}
                onValueChange={(itemValue, itemIndex) =>
                  setModalTemperaturePoints(itemValue)
                }>

                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
              </Picker>
            </View>
            <View style={styles.pickerText} >
              {/* {tableIndex()} */}
              <Text style={{ textAlign: 'center' }}>Concentration Points</Text>

              <Picker style={styles.picker}
                selectedValue={modalConcentrationPoints}
                onValueChange={(itemValue, itemIndex) =>
                  setModalConcentrationPoints(itemValue)
                }>

                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
              </Picker>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: 149, height: 40, }}>
              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: '#7a42f4'
                }}
                onPress={() => updateTemp(modalTemperaturePoints, modalConcentrationPoints, hookArray, setHookArray, setModalVisible, context, configMenu)}
              >
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                onPress={() => { setModalVisible(false); }}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: '#808B97'
                }}

              >
                <Icon
                  name={"close"}

                  size={20}
                  color="#000"
                />
              </Pressable>
            </View>
          </View>

        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ alignSelf: 'center' }} style={{ paddingBottom: 40, backgroundColor: 'white' }} horizontal={false} >

        {false &&
          <View style={{ alignContent: 'center', paddingTop: 3, paddingBottom: 3, backgroundColor: '#333333' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Concentration Points</Text>
          </View>
        }
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={{ backgroundColor: 'white' }} horizontal={true} >
          <View style={{ backgroundColor: 'white', }}>

            {/* <Table borderStyle={{ borderWidth: 0, borderColor: 'transparent' }}>
              <Row data={["Temperature", "Concentration"]} widthArr={[150, 100*hookArray.get("conc")]} style={[styles.header5, { paddingLeft: 0 }]} textStyle={[styles.text5, { color: 'white' }]} />
              <Row data={["Temperature", "Concentration"]} widthArr={[150, 100*hookArray.get("conc")]} style={[styles.header5, { paddingLeft: 0 }]} textStyle={[styles.text5, { color: 'white' }]} />

            </Table> */}
            <Table borderStyle={{ borderWidth: 0, borderColor: 'transparent', borderBottomColor: 'transparent' }}>
              {
                <TableWrapper style={[styles.row5, { paddingTop: 0 }]}>
                  {
                    ["Temperature", "Concentration"].map((cellData, cellIndex) => (
                      <Cell style={{ backgroundColor: cellIndex == 0 ? 'red' : 'blue', borderColor: cellIndex == 0 ? 'transparent' : 'transparent' }} key={cellIndex} data={(cellIndex == 0) ? <Text style={{ width: 149, height: 35, textAlign: 'center', borderLeftColor: 'transparent', paddingTop: 15, borderBottomColor: 'red', borderWidth: StyleSheet.hairlineWidth }}>Temperature</Text> : <Text style={{ width: 100 * hookArray.get('conc'), height: 35, borderBottomColor: 'black', fontSize: hookArray.get('conc') == 1 ? 10 : 15, textAlign: 'center', paddingTop: 5, borderWidth: StyleSheet.hairlineWidth }} > Concentration</Text>} />
                    ))
                  }
                </TableWrapper>
              }

              {/* Right Wrapper */}
              {/* <TableWrapper style={{ flex: 1 }}>
                <Cols data={tableData} heightArr={[40, 30, 30, 30, 30]} textStyle={styles.text5} />
              </TableWrapper> */}


            </Table>





            <Table borderStyle={{ borderWidth: 0, paddingTop: 35, borderColor: 'transparent', borderBottomColor: 'transparent' }}>
              {
                hookArray.get('array').map((rowData, index) => (

                  <TableWrapper key={index} style={[styles.row5, { paddingTop: 0 }]}>
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
              onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Custom Coefficients", "Set Parameters": {"${MenuParams.find(obj => obj.Tag == ConfigNum).Index}":"${calculatePayload(hookArray)}"}}`, context) }}
              title="Save"
              color="#841584"
            />
          </View>
        }
        {true &&
          <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
            <Button
              onPress={() => { setModalVisible(true) }}
              title="Configure Number of Points "
              color="#841584"
            />
          </View>
        }

      </ScrollView>


    </View>
  )

};
const tableIndex = () => (
  <Text style={{ width: 149, height: 35, borderWidth: StyleSheet.hairlineWidth, textAlign: 'center', paddingTop: 5, backgroundColor: 'red', borderColor: 'red' }}>Coefficients</Text>)

const TemperatureCoeffCustomScreen = ({ route, navigation }) => {
  const { ConfigNum } = route.params
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    peripheralID = peripheralsArray[0].id
  }).catch(() => {
  });

  return (
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      {/* <StackConductivity.Screen name='Configuration' component={ConfigurationNumScreen} options={{ headerTitle: "Custom Temperature Coefficient" }} /> */}
      {/* <StackConductivity.Screen name='Custom Configuration' component={CustomConfigurationScreen} initialParams={{ ConfigNum: ConfigNum }} /> */}

      <StackConductivity.Screen name='Custom Temperature Coefficient' component={TemperatureCoefficientScreen} initialParams={{ ConfigNum: ConfigNum }} />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  container2: {
    padding: 0,
    flexDirection: "column",
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  picker: {
    // backgroundColor: '#808B97',
    width: 149, height: 35,
    alignItems: "center",
    alignContent: "stretch",
    borderBottomColor: 'black',
    borderRadius: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    // paddingLeft: 25,
    // paddingRight: 25
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    borderRadius: 40,

    // padding: 8,
    // paddingLeft: 25,
    // paddingRight: 25,

    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'column',

    justifyContent: 'center'
  },
  itemActiveConfig: {
    backgroundColor: '#008000',
    justifyContent: 'center',
    padding: 8,
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
  header4: { height: 35, backgroundColor: '#808B97', borderRadius: 1 },
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
  header5: { height: 35, backgroundColor: '#333333' },
  row5: { flexDirection: 'row', backgroundColor: "#808B97", borderWidth: 0 },

  btn5: {
    width: 149, height: 34, backgroundColor: 'white', borderWidth: StyleSheet.hairlineWidth
  },
  btn6: {
    width: 100, height: 34, backgroundColor: 'white', borderWidth: StyleSheet.hairlineWidth
  },
  img: { width: 149, height: 35, borderRightWidth: 1 },

  btnText5: { textAlign: 'center', color: '#000' }
});

