import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Image, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
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
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import { ContextConfigurationValues, ContextSensorValues } from '../../../App';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import InputScrollView from 'react-native-input-scroll-view';


import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
let peripheralID = '0'
const MainMenu = Values.find(item => item.Tag === "Temperature Coefficients").SubMenu;
let nonLinearCoeffParams = MainMenu.find(item => item.Tag === "Temperature Coefficient Non-Linear");
let MenuParams = nonLinearCoeffParams.menu;
const StackTempCoeffNonLinear = createStackNavigator();

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

function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}

function Item(title, value, navigation = null, context = null, parent = null) {
  switch (title) {
    // case 'Configuration 1':
    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
    //     <ItemBar item={title} />
    //     </TouchableOpacity>
    //   )
    // case 'Configuration 2':
    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
    //     <ItemBar item={title} />
    //     </TouchableOpacity>
    //   )
    // case 'Configuration 3':
    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
    //     <ItemBar item={title} />
    //            </TouchableOpacity>
    //   )
    // case 'Configuration 4':
    //   return (
    //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
    //     <ItemBar item={title} />
    //             </TouchableOpacity>
    //   )
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


function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? "0.0" : zeros(dimensions.slice(1)));
  }

  return array;
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


// function ConfigurationNumScreen({ route, navigation }) {
//   // const { Tag } = route.params;

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={[{flexDirection:'row',padding:8, backgroundColor:'"#808B97"',borderRadius:15,justifyContent:'space-evenly'}]}>
//       <Text style={[styles.title,{textAlign:'center',fontSize:12}]}>{"Device → ICT200-C50"}</Text>
//           <Text style={[styles.title,{textAlign:'center',fontSize:12}]}>{"Active Configuration : Configuration 1"}</Text>
//         </View>
//       <FlatList
//         data={MenuParams}
//         renderItem={({ item, index, separators }) => (renderItem(item, navigation, "hello", item.Tag))}
//         keyExtractor={item => item.Tag}
//         initialNumToRender={MenuParams.length}
//       />
//     </SafeAreaView>
//   )
// }



const element = (data, index, cellIndex, value, setValue) => {
  const [focused, setFocused] = react.useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  return (
    // <TouchableOpacity onPress={()=>{focused? setFocused(false):setFocused(true)}}>

    <View style={[styles.btn5, { alignItems: 'center', alignContent: "center", backgroundColor: '#fff', paddingBottom: 0, borderRadius: 0, borderBottomWidth: 0, borderBottomEndRadius: 0 }]}>

      <TextInput
        disabled={false}
        style={[styles.input1]}
        value={value[index][cellIndex]}
        placeholder=""
        keyboardType="numeric"
        maxLength={7}
        underlineColorAndroid="red"
        activeUnderlineColor='#fff'
        selectionColor='black'
        underlineColor='#fff'
        backgroundColor='#fff'
        scrollEnabled={false}
        onChangeText={(val) => { updateCell(val, index, cellIndex, value, setValue) }}
        textAlign='center' />
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
const tableIndex = (text) => (
  <View style={[styles.btn5, { flexDirection: 'row', backgroundColor: "#53565A", justifyContent: 'center', borderTopLeftRadius: (text == "Temperature (°C)" ? 5 : 0), borderTopRadius: (text == "Temperature (°F)" ? 5 : 0) }]}>
    <Text style={{ textAlign: 'center', paddingTop: 15, color: 'white' }}>{text}</Text>
  </View>


)
const TemperatureCoefficientScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)
  const { Tag } = route.params;
  const { ConfigNum } = route.params;
  const valueMenu = MenuParams.find(key => key.Tag == ConfigNum).menu
  // console.log(ConfigNum)
  const temperaturePoints = 6
  const concentrationPoints = 1
  let concentrationArray = []
  let temperatureArray = []
  for (let i = 1; i < 7; i++) {
    concentrationArray[i - 1] = context[valueMenu.find(key => key.Tag == `Temperature Coefficient ${i}`).Index].toFixed(4)

  }
  for (let i = 1; i < 7; i++) {
    temperatureArray[i - 1] = context[valueMenu.find(key => key.Tag == `Temperature Point ${i}`).Index].toFixed(4)

  }

  // const concentrationArray = ["0", "10", "20", "30", "40", "50"]

  // const temperatureArray = ["-20", "5", "30", "40", "50", "60"]
  // const tableHead = []; tableHead[0] = "Configuration Points"
  const widthArr = [150]
  for (let i = 1; i < concentrationPoints + 1; i++) {
    widthArr[i] = 150
  }



  const tableData = [];
  for (let i = 0; i < temperaturePoints + 1; i += 1) {
    const rowData = []
    for (let j = 0; j < concentrationPoints + 1; j += 1) {
      if (i == 0) {
        if (j == 0) {
          rowData.push("Empty")
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
          rowData.push(concentrationArray[i - 1])
          console.log("-------------------------")

        }
      }
    }


    tableData.push(rowData);
  }
  const [hookArray, setHookArray] = react.useState(tableData);
  let payload = ""

  for (let i = 0; i < 2; i++) {
    for (let k = 1; k < 7; k++) {
     i==0 ? payload+=`"${valueMenu.find(key => key.Tag == `Temperature Point ${k}`).Index}":${hookArray[k][i]},` :payload+=`"${valueMenu.find(key => key.Tag == `Temperature Coefficient ${k}`).Index}":${hookArray[k][i]}, `
  }
  }
  payload = payload.slice(0, -2); //// payloaddaki virgül atılıyor.
// console.log(hookArray)
console.log(payload)
console.log(`{"Tag":"Temperature Coefficients","Set Parameters":{${payload}}}`)
  return (
    <View style={[styles.container4, { alignItems: 'center' }]}>
      <ScrollView sckeyboardShouldPersistTaps="always" style={{ backgroundColor: 'white' }} horizontal={false} >

        <ScrollView keyboardShouldPersistTaps="always" style={{ backgroundColor: 'white' }} horizontal={true} >
          <View style={{ backgroundColor: 'white' }}>
            {/* <Table borderStyle={{ borderWidth: 1, borderColor: '#000000', shadowColor:'white' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header5} textStyle={styles.text5} />
            </Table> */}
            <Table borderStyle={{ borderWidth: 1, borderTopWidth: 1, paddingTop: 50, borderColor: '#000000' }}>
              {
                tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={[styles.row5, { paddingTop: 1 }]}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={(index == 0) ? tableIndex((cellIndex == 0 ? "Temperature (°C)" : "Concentration (%)")) : element(cellData, index, cellIndex, hookArray, setHookArray)} />
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
              onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100",`{"Tag":"Temperature Coefficients","Set Parameters":{${payload}}}`,context) }}
              title="Save"
              color="#841584"
            />
          </View>
        }
      </ScrollView>


    </View>

  )

};
const TemperatureCoeffNonLinearScreen = ({ route, navigation }) => {
  const { ConfigNum } = route.params;
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    // console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });


  return (
    <StackTempCoeffNonLinear.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      {/* <StackTempCoeffNonLinear.Screen name='Configuration' component={ConfigurationNumScreen} options={{ headerTitle: "Non-Linear Temperature Coefficient" }} /> */}
      <StackTempCoeffNonLinear.Screen name='Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} options={({ route }) => ({ headerTitle: route.params.name })} initialParams={{ ConfigNum: ConfigNum }} />
      {/* <StackConductivity.Screen name=' Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} /> */}


    </StackTempCoeffNonLinear.Navigator>

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
  input1: {
    // margin: 15,
    height: 29,
    // borderColor: '#7a42f4',
    // borderWidth: 1
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
  container4: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },

  containerSlider: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
  container4: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header4: { height: 50, backgroundColor: '#808B97', borderRadius: 1 },
  text4: { textAlign: 'center' },
  dataWrapper4: { marginTop: -1 },
  row4: { height: 40, backgroundColor: '#ffffff' },



  row5: { flexDirection: 'row', backgroundColor: "#808B97", borderRightWidth: 1 },
  btn5: { width: 149, height: 50, backgroundColor: '#white' },
  btn6: { width: 149, height: 10, backgroundColor: '#white', borderBottomColor: 'white' },

  img: { width: 149, height: 50, borderRightWidth: 1 },

});

