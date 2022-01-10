import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
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

let ConductivityParams = Paramsfiltered.find(ConductivityParams => ConductivityParams.Tag === "Conductivity");
let MenuParams = ConductivityParams.menu;
const StackConductivity = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Conductivity');
var filteredAT = filtered.filter(row => row.Tag == 'Range');
const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, maxbytesize = 512) => {
  BleManager.write(peripheralId, serviceUUID, characteristicUUID, value, maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}


const ConductivityScreen = ({ route, navigation }) => {

  function Item(title, value) {
    switch (title) {
      case 'Range':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Range')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Compensation':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Temperature Compensation')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Coefficient':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Temperature Coefficient')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Reference Temperature':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Reference Temperature')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Mounting Factor':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Mounting Factor')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Zero Point':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Zero Point')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Filter Count Constant':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Filter Count Constant')}>
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


  const ConductivityMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const RangeScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Range');
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
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

      if (selection != val[0].Value) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Conductivity', 'Set Parameters': {'73':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`)) }}>
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

  const MountingFactorScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Mounting Factor')[0];
    const possibleValues = val.PossibleValues;
    const initalMFValue = val.Value;
    const limitsMF = [possibleValues.RangeLower, possibleValues.RangeUpper]
    const [mountingFactor, setMountingFactor] = React.useState(initalMFValue);
    function callBackSlider() {

      if ((initalMFValue != mountingFactor)) {

        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Conductivity', 'Set Parameters': {'85':'${mountingFactor}'}}`)) }}>
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
    }



    return (

      <View style={styles.containerSlider}>

        <Slider
          value={mountingFactor}
          onValueChange={value => setMountingFactor(value[0].toFixed(3))}
          minimumValue={limitsMF[0]}
          maximumValue={limitsMF[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{ alignContent: "center" }}>Mounting Factor Value : {mountingFactor}</Text>
      </View>



    );
  };
  const TemperatureCoefficientScreen = ({ route, navigation }) => {
    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Conductivity', 'Set Parameters': {'78':'${nonLinearParamT1}','79':'${nonLinearParamC1}','7A':'${nonLinearParamT2}'},'7B':'${nonLinearParamC2}','7C':'${nonLinearParamT3}','7D':'${nonLinearParamC3}','7E':'${nonLinearParamT4}','7F':'${nonLinearParamC4}','80':'${nonLinearParamT5}','81':'${nonLinearParamC5}'}`)) }}>
            <View style={styles.buttonBar}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        ),
      })
    })


    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const compensationVal = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Compensation')[0].Value;
    const coefficientMenu = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Coefficient')[0].Menu;
    const initialNonLinearParams = coefficientMenu.filter(row => row.Tag == 'Non-Linear')[0].Value
    const initialLinearParams = coefficientMenu.filter(row => row.Tag == 'Linear')[0].Value[0]
    const [nonLinearParams, setNonLinearParams] = useState(initialNonLinearParams)
    const [linearParam, setLinearParam] = useState(initialLinearParams)
    const [nonLinearParams1, setNonLinearParams1] = useState(nonLinearParams)
    const [nonLinearParamT1, setNonLinearParamT1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "T1")[0].Value)
    const [nonLinearParamT2, setNonLinearParamT2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "T2")[0].Value)
    const [nonLinearParamT3, setNonLinearParamT3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "T3")[0].Value)
    const [nonLinearParamT4, setNonLinearParamT4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "T4")[0].Value)
    const [nonLinearParamT5, setNonLinearParamT5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "T5")[0].Value)
    const [nonLinearParamC1, setNonLinearParamC1] = react.useState(initialNonLinearParams.filter(row => row.Tag == "C1")[0].Value)
    const [nonLinearParamC2, setNonLinearParamC2] = react.useState(initialNonLinearParams.filter(row => row.Tag == "C2")[0].Value)
    const [nonLinearParamC3, setNonLinearParamC3] = react.useState(initialNonLinearParams.filter(row => row.Tag == "C3")[0].Value)
    const [nonLinearParamC4, setNonLinearParamC4] = react.useState(initialNonLinearParams.filter(row => row.Tag == "C4")[0].Value)
    const [nonLinearParamC5, setNonLinearParamC5] = react.useState(initialNonLinearParams.filter(row => row.Tag == "C5")[0].Value)
    // console.log(nonLinearParamT1)
    // console.log()
    return (
      // <ReturnMenu param={compensationVal} />
      <SafeAreaView style={[styles.container, { flex: 1, flexDirection: "row" }]}>
        {/* <ScrollView style={{ flex: 1, flexDirection: "row" }}> */}
        <View style={{ flex: 1, paddingTop: 5 }}>
          <Text style={styles.basicText}>  T1 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamT1}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamT1(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  T2 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamT2}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamT2(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  T3 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamT3}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamT3(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  T4 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamT4}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamT4(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  T5 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamT5}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamT5(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, paddingTop: 5 }}>
          <Text style={styles.basicText}>  C1 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamC1}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamC1(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  C2 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamC2}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamC2(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  C3 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamC3}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamC3(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  C4 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamC4}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamC4(text))}
            // onBlur={(text) =>handleTextChangeEnd(text,item)}
            maxLength={5}
            editable

            keyboardType="numeric"
          />
          <Text style={styles.basicText}>  C5 Param  </Text>
          <TextInput style={styles.input}
            value={nonLinearParamC5}
            // placeholder={nonLinearParamT1}
            onChangeText={(text) => (setNonLinearParamC5(text))}
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
  const TemperatureCompensationScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Compensation');

    const possibleValues = val[0].Menu;
    const [selection, setSelection] = React.useState(val[0].Value);
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

      if (selection != val[0].Value) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Conductivity', 'Set Parameters': {'74':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`)) }}>
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
  const ReferenceTemperatureScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Reference Temperature');
    const possibleValues = val[0].PossibleValues;
    const initialValC = possibleValues.filter(row => row.Tag == '°C')[0].Value
    const initialValF = possibleValues.filter(row => row.Tag == '°F')[0].Value

    const [temperatureC, setTemperatureC] = React.useState(initialValC);
    const [temperatureF, setTemperatureF] = React.useState(initialValF);
    const limitsF = [possibleValues.filter(row => row.Tag == '°F')[0].RangeLower, possibleValues.filter(row => row.Tag == '°F')[0].RangeUpper]
    const limitsC = [possibleValues.filter(row => row.Tag == '°C')[0].RangeLower, possibleValues.filter(row => row.Tag == '°C')[0].RangeUpper]
    function callBackSlider() {

      if ((temperatureF != initialValF) || (temperatureC != initialValC)) {
        // console.log({ temperatureF, initialValF, temperatureC, initialValC })
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Communication', 'Set Parameters': {'82':'${temperatureC}','83':'${temperatureF}'}}`)) }}>
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

    }
    return (

      <View style={styles.containerSlider}>

        <Slider
          value={temperatureC}
          onValueChange={value => setTemperatureC(value[0].toFixed(1))}
          minimumValue={limitsC[0]}
          maximumValue={limitsC[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{ alignContent: "center" }}>°C Value : {temperatureC}</Text>
        <Slider
          value={temperatureF}
          onValueChange={value => setTemperatureF(value[0].toFixed(1))}
          minimumValue={limitsF[0]}
          maximumValue={limitsF[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{ alignContent: "center" }}>°F Value  : {temperatureF}</Text>

      </View>



    );




  };

  const FilterCountConstantScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Filter Count Constant')[0];
    const possibleValues = val.PossibleValues;
    const initalFCCValue = val.Value;
    const limitsFFC = [possibleValues.RangeLower, possibleValues.RangeUpper]
    const [filterCC, setFilterCC] = React.useState(initalFCCValue);
    function callBackSlider() {
      // useEffect(() =>{
      if ((initalFCCValue != filterCC)) {

        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Communication', 'Set Parameters': {'8C':'${filterCC}'}}`)) }} >
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
      // });

    }
    return (

      <View style={styles.containerSlider}>

        <Slider
          value={filterCC}
          onValueChange={value => setFilterCC(value[0].toFixed(0))}
          minimumValue={limitsFFC[0]}
          maximumValue={limitsFFC[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{ alignContent: "center" }}>Filter Count Constant: {filterCC}</Text>
      </View>



    );
  };
  const ZeroPointScreeen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Zero Point');
    const possibleValues = val[0].Menu;
    const rangeValue = valSystemUnits[0].menu.filter(row => row.Tag == 'Range')[0].Value
    const itemToBeRenderedInitial = possibleValues.filter(row => row.Tag == rangeValue)[0]
    const [selection, setSelection] = React.useState(Number(itemToBeRenderedInitial.Value));
    let measurementRange
    switch (rangeValue) {
      case "2000 µS/cm":
        measurementRange='86'
        break;
      case "20 mS/cm":
        measurementRange='87'
                break;
      case "200 mS/cm":
        measurementRange='88'
                break;
      case "500 mS/cm":
        measurementRange='89'
                break;
      case "1000 mS/cm":
        measurementRange='8A'
                break;
      case "1000 mS/cm":
        measurementRange='8B'
                  break;
      default:
      // code block
    }
    // console.log(Number(itemToBeRenderedInitial.Stepsize))

    function callBackSlider() {
      // useEffect(() => {

      if ((selection != Number(itemToBeRenderedInitial.Value))) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62", "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${measurementRange}':'${selection}'}}`)) }} >
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
      // });
    }
    return (
      <View style={styles.containerSlider}>

        <Slider
          value={Number(selection)}
          onValueChange={value => setSelection((Math.round(value * 100) / 100))}
          minimumValue={Number(itemToBeRenderedInitial.RangeLower)}
          maximumValue={Number(itemToBeRenderedInitial.RangeUpper)}
          onSlidingComplete={() => callBackSlider()}
          step={Number(itemToBeRenderedInitial.Stepsize)}
        />
        <Text style={{ alignContent: "center" }}>Zero Point Value: {selection}</Text>
        <Text style={{ alignContent: "center" }}>Measurement Range: {rangeValue}</Text>

      </View>
    );
  };

  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );
  const renderItem1 = ({ item }) => (
    Item(item.Tag)
  );

  return (
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConductivity.Screen name='Conductivity Main' component={ConductivityMainScreen} options={{ headerTitle: "Conductivity" }} />
      <StackConductivity.Screen name='Range' component={RangeScreen} />
      <StackConductivity.Screen name='Temperature Compensation' component={TemperatureCompensationScreen} />
      <StackConductivity.Screen name='Temperature Coefficient' component={TemperatureCoefficientScreen} />
      <StackConductivity.Screen name='Reference Temperature' component={ReferenceTemperatureScreen} />
      <StackConductivity.Screen name='Mounting Factor' component={MountingFactorScreen} />
      <StackConductivity.Screen name='Zero Point' component={ZeroPointScreeen} />
      <StackConductivity.Screen name='Filter Count Constant' component={FilterCountConstantScreen} />


    </StackConductivity.Navigator>

  );
}

export default ConductivityScreen

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

// const customStyles8 = StyleSheet.create({
//   container: {
//     height: 30,
//   },
//   thumb: {
//     backgroundColor: '#31a4db',
//     borderRadius: 10 / 2,
//     height: 10,
//     shadowColor: '#31a4db',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 2,
//     width: 10,
//   },
//   track: {
//     backgroundColor: '#303030',
//     height: 2,
//   },
// });

// const SliderContainer = (props: {
//   caption: string;
//   children: React.ReactElement;
//   sliderValue?: Array<number>;
//   trackMarks?: Array<number>;
// }) => {
//   const {caption, sliderValue, trackMarks} = props;
//   const [value, setValue] = React.useState(
//       sliderValue ? sliderValue : DEFAULT_VALUE,
//   );
//   let renderTrackMarkComponent: React.ReactNode;

//   if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
//       renderTrackMarkComponent = (index: number) => {
//           const currentMarkValue = trackMarks[index];
//           const currentSliderValue =
//               value || (Array.isArray(value) && value[0]) || 0;
//           const style =
//               currentMarkValue > Math.max(currentSliderValue)
//                   ? trackMarkStyles.activeMark
//                   : trackMarkStyles.inactiveMark;
//           return <View style={style} />;
//       };
//   }

//   const renderChildren = () => {
//       return React.Children.map(
//           props.children,
//           (child: React.ReactElement) => {
//               if (!!child && child.type === Slider) {
//                   return React.cloneElement(child, {
//                       onValueChange: setValue,
//                       renderTrackMarkComponent,
//                       trackMarks,
//                       value,
//                   });
//               }

//               return child;
//           },
//       );
//   };

//   return (
//       <View style={styles.sliderContainer}>
//           <View style={styles.titleContainer}>
//               <Text>{caption}</Text>
//               <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
//           </View>
//           {renderChildren()}
//       </View>
//   );
// };

// const DEFAULT_VALUE = 0.2;
