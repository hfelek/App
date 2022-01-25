import React, { useEffect, useState,useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList,Image, StatusBar, TouchableOpacity, ScrollView,KeyboardAvoidingView } from 'react-native'
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
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import { ContextConfigurationValues, ContextSensorValues } from '../../../App';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import InputScrollView from 'react-native-input-scroll-view';
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
let peripheralID = '0'

let nonLinearCoeffParams = Values.filter(item => item.Tag === "Temperature Coefficient Non-Linear")[0];
let MenuParams = nonLinearCoeffParams.menu;
// let subMenuParams = MenuParams.filter(row => row.Tag == 'Configuration 1')[0].menu;
const StackTempCoeffNonLinear = createStackNavigator();



function renderItem(item, navigation = null, context = null, parent) {
  return (Item(item.Tag, item.Value, navigation, context, parent))
}

function Item(title, value, navigation = null, context = null, parent = null) {
  switch (title) {
    case 'Configuration 1':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
      )
    case 'Configuration 2':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
      )
    case 'Configuration 3':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
      )
    case 'Configuration 4':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Non-Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
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




// const TemperatureCoefficientScreen = ({ route, navigation }) => {
//   const context = useContext(ContextConfigurationValues);
//   const { Tag } = route.params;
//   console.log(Tag)
//   const { ConfigNum } = route.params;
//   console.log(ConfigNum)

//   useEffect(() => {
//     navigation.setOptions({
//       headerRight: () => (
//         <TouchableOpacity onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Conductivity", "Set Parameters": {"78":"${nonLinearParamT1}","79":"${nonLinearParamC1}","7A":"${nonLinearParamT2}","7B":"${nonLinearParamC2}","7C":"${nonLinearParamT3}","7D":"${nonLinearParamC3}","7E":"${nonLinearParamT4}","7F":"${nonLinearParamC4}","80":"${nonLinearParamT5}","81":"${nonLinearParamC5}"}}`,context) }}>
//           <View style={styles.buttonBar}>
//             <Text>Save</Text>
//           </View>
//         </TouchableOpacity>
//       ),
//     })
//   })


//   const initialNonLinearParams = MenuParams.filter(row => row.Tag == ConfigNum)[0].menu
//   const [nonLinearParams, setNonLinearParams] = useState(initialNonLinearParams)
//   // const [linearParam, setLinearParam] = useState(initialLinearParams)
//   const [nonLinearParams1, setNonLinearParams1] = useState(nonLinearParams)
//   const [nonLinearParamT1, setNonLinearParamT1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 1")[0].Value)
//   const [nonLinearParamT2, setNonLinearParamT2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 2")[0].Value)
//   const [nonLinearParamT3, setNonLinearParamT3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 3")[0].Value)
//   const [nonLinearParamT4, setNonLinearParamT4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 4")[0].Value)
//   const [nonLinearParamT5, setNonLinearParamT5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 5")[0].Value)
//   const [nonLinearParamT6, setNonLinearParamT6] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Point 6")[0].Value)
//   const [nonLinearParamC1, setNonLinearParamC1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 1")[0].Value)
//   const [nonLinearParamC2, setNonLinearParamC2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 2")[0].Value)
//   const [nonLinearParamC3, setNonLinearParamC3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 3")[0].Value)
//   const [nonLinearParamC4, setNonLinearParamC4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 4")[0].Value)
//   const [nonLinearParamC5, setNonLinearParamC5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 5")[0].Value)
//   const [nonLinearParamC6, setNonLinearParamC6] = react.useState(initialNonLinearParams.filter(row => row.Tag == "Temperature Coefficient 6")[0].Value)
//   // console.log(nonLinearParamT1)
//   // console.log()
//   return (
//     // <ReturnMenu param={compensationVal} />
//     <ScrollView>

//       <View style={{ flex: 1, paddingTop: 5 }}>
//         <Text style={styles.basicText}>  Temperature Point 1 (°C)   </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT1}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT1(text))}
//           ke
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Temperature Point 2 (°C)   </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT2}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT2(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Temperature Point 3 (°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT3}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT3(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Temperature Point 4 (°C)   </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT4}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT4(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Temperature Point 5 (°C)   </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT5}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT5(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Temperature Point 6 (°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamT6}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamT6(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//       </View>
//       <View style={{ flex: 1, paddingTop: 5 }}>
//         <Text style={styles.basicText}>  Coefficient 1 (%/°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC1}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC1(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}> Coefficient 2 (%/°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC2}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC2(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Coefficient 3 (%/°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC3}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC3(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Coefficient 4 (%/°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC4}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC4(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Coefficient 5 (%/°C)  </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC5}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC5(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//         <Text style={styles.basicText}>  Coefficient 6 (%/°C) </Text>
//         <TextInput style={styles.input}
//           value={nonLinearParamC6}
//           // placeholder={nonLinearParamT1}
//           onChangeText={(text) => (setNonLinearParamC6(text))}
//           // onBlur={(text) =>handleTextChangeEnd(text,item)}
//           maxLength={5}
//           editable

//           keyboardType="numeric"
//         />
//       </View>
    
//      </ScrollView>
//   )
// };
function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? "0.0" : zeros(dimensions.slice(1)));
  }

  return array;
}
const element = (data, index, cellIndex, value, setValue) => {
const [focused,setFocused]= react.useState(false)
const [modalVisible, setModalVisible] = useState(false);
  
return (
  // <TouchableOpacity onPress={()=>{focused? setFocused(false):setFocused(true)}}>
   <View >

 {/* <View style={[styles.btn6, {alignItems:'center', alignContent: "center", backgroundColor:(cellIndex==0 || index==0)? "#808B97" : 'white'}]}></View> */}
 <View   style={[styles.btn5, {alignItems:'center',alignContent: "center", backgroundColor:(cellIndex==0 || index==0)? "#808B97" : 'white', paddingBottom: 0,borderRadius:0,borderBottomWidth:0,borderBottomEndRadius:0 }]}>

  <View   style={[styles.btn5, {alignItems:'center',alignContent: "center", backgroundColor:(cellIndex==0 || index==0)? "#808B97" : 'white', paddingBottom: 0,borderRadius:0,borderBottomWidth:0,borderBottomEndRadius:0 }]}>
    
    <TextInput
      disabled={false}
      style={[styles.input1,{borderWidth:0,borderBottomWidth:0}]}
      value={value[index][cellIndex]}
      placeholder=""
      keyboardType="numeric"
      maxLength={7}
      underlineColorAndroid="transparent"
      backgroundColor={(cellIndex==0 || index==0)? "#808B97" : 'white'}
      scrollEnabled={false}
      onChangeText={(val) => { updateCell(val, index, cellIndex, value, setValue) }}
      textAlign='center' />
  </View>
  {/* <View style={[styles.btn6, { alignContent: "center", backgroundColor:(cellIndex==0 || index==0)? "#808B97" : 'white'}]}></View> */}
  </View>

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
const tableIndex = (text)=>(     
  <View   style={[styles.btn5, {alignItems:'center',alignContent:'center', backgroundColor: "#808B97" , paddingBottom: 0,borderRadius:0,borderBottomWidth:0,borderBottomEndRadius:0 }]}>
    <Text style={{textAlign:'center',paddingTop:15,color:'black'}}>{text}</Text>
  </View>


  )
const TemperatureCoefficientScreen = ({ route, navigation }) => {
  const { Tag } = route.params;
  // const { ConcentrationPoints } = route.params;
  // const { TemperaturePoints } = route.params;
  const { ConfigNum } = route.params;
  const temperaturePoints = 6
  const concentrationPoints = 1
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
  for (let i = 0; i < temperaturePoints+1; i += 1) {
    const rowData = []
    for (let j = 0; j < concentrationPoints + 1; j += 1) {
      if (i == 0) {
        if (j == 0) {
          rowData.push("Empty")
          console.log("I am Here")
        }
        else {
          rowData.push(concentrationArray[j-1])
        }

      }
      else {
      
      if (j == 0) {
        rowData.push(temperatureArray[i-1])

      }
      else {
        rowData.push(emptyArr[i-1][j - 1])
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
    <View style={[styles.container4, { alignItems: 'center' }]}>
      <ScrollView sckeyboardShouldPersistTaps="always" style={{backgroundColor:'white'}} horizontal={false} >

        <ScrollView keyboardShouldPersistTaps="always" style={{backgroundColor:'white'}} horizontal={true} >
          <View style={{backgroundColor:'white'}}>
            {/* <Table borderStyle={{ borderWidth: 1, borderColor: '#000000', shadowColor:'white' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header5} textStyle={styles.text5} />
            </Table> */}
            <InputScrollView style={[styles.dataWrapper4,{backgroundColor:'#fff'}]}>
              <Table  borderStyle={{ borderWidth: 1,borderTopWidth:1,paddingTop:50, borderColor: '#000000' }}>
                {
                  tableData.map((rowData, index) => (
                    <TableWrapper  key={index} style={[styles.row5,{paddingTop:1}]}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={ (index==0) ? tableIndex((cellIndex==0 ? "Temperature Points (°C)" : "Concentration Points (%)")) :element(cellData, index, cellIndex, hookArray, setHookArray)}  />
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
            </InputScrollView>
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


    </View>

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
    <StackTempCoeffNonLinear.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackTempCoeffNonLinear.Screen name='Configuration' component={ConfigurationNumScreen} options={{ headerTitle: "Non-Linear Temperature Coefficient" }} />
      <StackTempCoeffNonLinear.Screen name='Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
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
    height: 30,
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



  row5: { flexDirection: 'row', backgroundColor: "#808B97",borderRightWidth:1 },
  btn5: { width: 149, height: 50, backgroundColor: '#white',borderRadius:1},
  btn6: { width: 149, height: 10, backgroundColor: '#white',borderRadius:1,borderBottomColor:'white' },

  img: { width: 149, height: 50, borderRightWidth: 1 },

});

