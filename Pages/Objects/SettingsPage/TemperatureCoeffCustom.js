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
import { ContextConfigurationValues } from '../../../App';
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


function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}
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
function Item(title, value, navigation = null, context = null, parent = null) {
  let index = null;
  let activeConfigEnum = null
  switch (title) {
    // case 'Configuration 1':
    //   activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

    //   return (
    //     <TouchableOpacity style={title== activeConfigEnum ? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
    //         <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 1"}/>

    //     </TouchableOpacity>
    //   )
    // case 'Configuration 2':
    //   activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
    //         <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 1"}/>
    //     </TouchableOpacity>
    //   )
    // case 'Configuration 3':
    //   activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
    //         <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 1"}/>

    //     </TouchableOpacity>
    //   )
    // case 'Configuration 4':
    //   activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Custom Configuration', { Tag: title, name: "Custom Temperature Coefficients " + title, ConfigNum: parent })}>
    //         <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 1"}/>

    //     </TouchableOpacity>
    //   )
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

    <View style={[cellIndex == 0 ? styles.btn5 : styles.btn6, { alignItems: 'center', alignContent: "center", backgroundColor: (cellIndex == 0 || index == 0) ? "#808B97" : 'white', paddingBottom: 0, borderRadius: 0, borderBottomWidth: 0, borderBottomEndRadius: 0 }]}>

      <TextInput
        disabled={false}
        style={styles.input1}
        value={value[index][cellIndex]}
        keyboardType="numeric"
        maxLength={7}
        underlineColor={(cellIndex == 0 || index == 0) ? "#808B97" : 'white'}
        selectionColor='#555555'
        placeholder='0.0'
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
function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
const TemperatureCoefficientScreen = ({ route, navigation }) => {
  const [modalVisible,setModalVisible]=useState(false);
  const context = useContext(ContextConfigurationValues)
  const { Tag } = route.params;
  const { ConfigNum } = route.params;
  const [temperaturePoints, setTemperaturePoints] = useState(6);
  const [concentrationPoints, useConcentrationPoints] = useState(6)
  const emptyArr = zeros([temperaturePoints, concentrationPoints])
  const concentrationArray = []
  const temperatureArray = []
  const tableHead = []; tableHead[0] = "Configuration Points"
  const widthArr = [150]

  const configMenu = MenuParams.find(key => key.Tag == ConfigNum).menu

  for (let i = 1; i < concentrationPoints + 1; i += 1) {
    tableHead[i] = "Concentration Point" + `${i}`
    widthArr[i] = 100
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
        }
        else {
          rowData.push(context[configMenu.find(key => key.Tag == `Temperature Point ${j}`).Index].toFixed(2))
        }

      }
      else {

        if (j == 0) {
          rowData.push(context[configMenu.find(key => key.Tag == `Temperature Coefficient ${i}`).Index].toFixed(2))

        }
        else {
          rowData.push(context[configMenu.find(key => key.Tag == `Conductivity Point ${i}`).Index].toFixed(2))
        }
      }
    }

    tableData.push(rowData);
  }
  const [hookArray, setHookArray] = react.useState(tableData);
  let payload = ""

  // for (let i = 1; i < 8; i++) {
  //   for (let k = 1; k < 8; k++) {
  //     if (i == 1 & k == 1) {

  //     }
  //     else if (i == 1 & k != 1) {
  //       // console.log(`Temperature Point ${k-1}`)
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         payload = payload + `"${configMenu.find(key => key.Tag == `Temperature Point ${k - 1}`).Index}":${hookArray[k - 1][i - 1]}, `
  //       }
  //     }
  //     else if (i != 1 & k == 1) {
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         payload = payload + `"${configMenu.find(key => key.Tag == `Temperature Coefficient ${i - 1}`).Index}":${hookArray[k - 1][i - 1]}, `
  //       }
  //     }
  //     else if (i != 1 & k != 1) {
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         payload = payload + `"${configMenu.find(key => key.Tag == `Conductivity Point ${((i - 2) * 6 + (k - 2) + 1)}`).Index}":${hookArray[k - 1][i - 1]}, `
  //       }
  //     }
  //   }
  // }
  // payload = payload.slice(0, -2)
  // console.log(payload)
  // console.log((14324).toString(16))
  console.log(hookArray)

  {
    const buf = Buffer.allocUnsafe(4);
    buf.writeInt32BE(temperaturePoints, 0);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

    buf.writeInt32BE(concentrationPoints, 0);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }
  }
  for (let i = 0; i < temperaturePoints; i++) {
    const buf = Buffer.allocUnsafe(4);
    buf.writeFloatBE(hookArray[i + 1][0], 0);
    // console.log(buf.toJSON().data);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }
  }
  for (let i = 0; i < concentrationPoints; i++) {
    const buf = Buffer.allocUnsafe(4);
    buf.writeFloatBE(hookArray[0][i + 1], 0);
    // console.log(buf.toJSON().data);
    for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

  }

  for (let i = 0; i < temperaturePoints; i++) {
    for (let k = 0; k < concentrationPoints; k++) {
      const buf = Buffer.allocUnsafe(4);
      buf.writeFloatBE(hookArray[k + 1][i + 1], 0);
      // console.log(buf.toJSON().data);
      for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

    }
  }
  console.log(Tag)
  console.log(payload)
  // for (let i = 1; i < concentrationPoints+2; i++) {

  //   for (let k = 1; k < temperaturePoints+2; k++) {
  //     if (i == 1 & k == 1) {
  //     }
  //     else if (i == 1 & k != 1) {
  //       // console.log(`Temperature Point ${k-1}`)
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         const buf = Buffer.allocUnsafe(4);
  //         buf.writeFloatBE(hookArray[k - 1][i - 1], 0);
  //         // console.log(buf.toJSON().data);
  //         for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }
  //       }
  //     }
  //     else if (i != 1 & k == 1) {
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         const buf = Buffer.allocUnsafe(4);
  //         buf.writeFloatBE(hookArray[k - 1][i - 1], 0);
  //         // console.log(buf.toJSON().data);
  //         for (const x of buf.toJSON().data) {
  //           payload = payload + x.toString(16).padStart(2, 0);
  //         }

  //       }
  //     }
  //     else if (i != 1 & k != 1) {
  //       if (isItNumber(hookArray[k - 1][i - 1])) {
  //         const buf = Buffer.allocUnsafe(4);
  //         buf.writeFloatBE(hookArray[k - 1][i - 1], 0);
  //         // console.log(buf.toJSON().data);
  //         for (const x of buf.toJSON().data) { payload = payload + x.toString(16).padStart(2, 0); }

  //       }
  //     }
  //   }
  // }
  // // payload = payload.slice(0, -2)
  // console.log(payload)
  // console.log((14324).toString(16))








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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={{ alignSelf: 'center' }} style={{ paddingBottom: 40, backgroundColor: 'white' }} horizontal={false} >
        {true &&
          <View style={{ alignContent: 'center', paddingTop: 3, paddingBottom: 3, backgroundColor: '#333333' }}>

            <Text style={{ color: 'white', textAlign: 'center' }}>Concentration</Text>
          </View>
        }
        <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={{ backgroundColor: 'white' }} horizontal={true} >
          <View style={{ backgroundColor: 'white', }}>
            {/* 
            <Table borderStyle={{ borderWidth: 0, borderColor: 'transparent' }}>
              <Row data={["", "Concentration"]} widthArr={[150, 610]} style={[styles.header5, { paddingLeft: 0 }]} textStyle={[styles.text5, { color: 'white' }]} />
            </Table> */}

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
          {false &&
            <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
              <Button
                onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Custom Coefficients", "Set Parameters": {"${Tag}":"${text}"}}`, context) }}
                title="Save"
                color="#841584"
              />
            </View>
          }
        </ScrollView>
        {true &&
          <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
            <Button
              onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Custom Coefficients", "Set Parameters": {"${MenuParams.find(obj => obj.Tag == ConfigNum).Index}":"${payload}"}}`, context) }}
              title="Save"
              color="#841584"
            />
          </View>
        }
        {true &&
          <View style={{ alignContent: 'stretch', paddingTop: 3 }}>
            <Button
               onPress={()=>setModalVisible(true)}
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
  <Image
    source={require("../../../Media/Index.png")}
    style={styles.img}
  />)

const TemperatureCoeffCustomScreen = ({ route, navigation }) => {
  const { ConfigNum } = route.params
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
    backgroundColor: '#D8D8D8',
    alignItems: "center",
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    padding: 8,
    paddingLeft: 25,
    paddingRight: 25,

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
  header5: { height: 50, backgroundColor: '#333333' },

  row5: { flexDirection: 'row', backgroundColor: "#808B97", borderRightWidth: 1 },
  btn5: { width: 149, height: 50, backgroundColor: '#white', borderRadius: 1 },
  btn6: { width: 100, height: 50, backgroundColor: '#white', borderRadius: 1, borderBottomColor: 'white' },

  img: { width: 149, height: 50, borderRightWidth: 1 },

  btnText5: { textAlign: 'center', color: '#000' }
});


