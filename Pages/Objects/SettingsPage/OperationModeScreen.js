import React, { useEffect, useState, useContext } from 'react'
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
import { Picker } from '@react-native-picker/picker';
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';
import navigateBackFunction from "../../../Utilities/navigateBackFunction"

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
let peripheralID = '0'

let OperationModeParams = Values.filter(item => item.Tag === "Operation Mode IO")[0];
let MenuParams = OperationModeParams.menu;




// let subMenuParams = MenuParams.filter(row => row.Tag == 'Configuration 1')[0].menu;









const StackConductivity = createStackNavigator();
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
    let object = null
    switch (title) {
        case 'Operation Mode IO 1':
            object = MenuParams.find(key => key.Tag == title)
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Operation Selection', { Tag: title, name: title, ConfigNum: parent })}>
                    <ItemValueBar item={title} value={object.PossibleValues.find(key => key.Enum == context[object.Index]).Tag} />
                </TouchableOpacity>
            )
        case 'Operation Mode IO 2':
            object = MenuParams.find(key => key.Tag == title)

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Operation Selection', { Tag: title, name: title, ConfigNum: parent })}>
                    <ItemValueBar item={title} value={object.PossibleValues.find(key => key.Enum == context[object.Index]).Tag} />

                </TouchableOpacity>
            )
        case 'Configuration':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Configuration Linear Coeff', { name: "Linear Temperature Coefficients" })}>
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



function OperationScreen({ route, navigation }) {
    const context = useContext(ContextConfigurationValues);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={MenuParams}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, item.Tag))}
                keyExtractor={item => item.Tag}
                initialNumToRender={MenuParams.length}
            />
        </SafeAreaView>
    )
}

function renderItemPicker(item) {

    return (<Picker.Item label={item.Tag} value={item.Enum} />)
}


const OperationSelectionScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues)

    const { Tag } = route.params;
    const { ConfigNum } = route.params;
    const Menu = MenuParams.filter(item => item.Tag == ConfigNum)[0]
    const PossibleValues = Menu.PossibleValues
    const indexSelection = Menu.Index
    const subMenu = Menu.subMenu
    const menuCurrentAssign = subMenu.find(key => key.Tag == "Current Output").menu.find(key => key.Tag == "Output-Assign")
    const menuSwitchOutputType = subMenu.find(key => key.Tag == "Switch Output").menu.find(key => key.Tag == "Output Type")
    const menuSwitchAssign = subMenu.find(key => key.Tag == "Switch Output").menu.find(key => key.Tag == "Output-Assign")
    const menuSwitchFunction = subMenu.find(key => key.Tag == "Switch Output").menu.find(key => key.Tag == "Function")


    const [selection, setSelection] = React.useState(PossibleValues.find(key => key.Enum == context[indexSelection]).Tag);
    const [selectionCurrentAssign, setSelectionCurrentAssign] = React.useState(menuCurrentAssign.PossibleValues.find(key => key.Enum == context[menuCurrentAssign.Index]).Tag)
    const [selectionSwitchOutputType, setSelectionSwitchOutputType] = React.useState(menuSwitchOutputType.PossibleValues.find(key => key.Enum == context[menuSwitchOutputType.Index]).Tag)
    const [selectionSwitchAssign, setSelectionSwitchAssign] = React.useState(menuSwitchAssign.PossibleValues.find(key => key.Enum == context[menuSwitchAssign.Index]).Tag)
    console.log("I am here")
    const [selectionSwitchFunction, setSelectionSwitchFunction] = React.useState(menuSwitchFunction.PossibleValues.find(key => key.Enum == context[menuSwitchFunction.Index]).Tag)
    console.log("I am here")

    useEffect(() => {

        if (context[menuSwitchAssign.Index]!=menuSwitchAssign.PossibleValues.find(key => key.Tag == selectionSwitchAssign).Enum ||
         context[menuCurrentAssign.Index]!=menuCurrentAssign.PossibleValues.find(key => key.Tag == selectionCurrentAssign).Enum ||
         context[menuSwitchOutputType.Index]!=menuSwitchOutputType.PossibleValues.find(key => key.Tag == selectionSwitchOutputType).Enum ||
         context[menuSwitchFunction.Index]!=menuSwitchFunction.PossibleValues.find(key => key.Tag == selectionSwitchFunction).Enum ||
         context[indexSelection]!=PossibleValues.find(key => key.Tag == selection).Enum

         
         )  {
          navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
              onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode", "Set Parameters": {"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum},"${menuSwitchAssign.Index}": ${menuSwitchAssign.PossibleValues.find(key => key.Tag == selectionSwitchAssign).Enum}, "${menuSwitchFunction.Index}": ${menuSwitchFunction.PossibleValues.find(key => key.Tag == selectionSwitchFunction).Enum} ,"${menuSwitchOutputType.Index}": ${menuSwitchOutputType.PossibleValues.find(key => key.Tag == selectionSwitchOutputType).Enum},"${menuCurrentAssign.Index}": ${menuCurrentAssign.PossibleValues.find(key => key.Tag == selectionCurrentAssign).Enum} }}`, context) }}
    
              >
                <View style={styles.buttonBar}>
                  <Text>Save</Text>
                </View>
              </TouchableOpacity>
            ),
            headerLeft: () => (navigateBackFunction(true))
            
          });
        }
        else {
          navigation.setOptions({
            headerRight: () => (
              <></>
            ),
            headerLeft: () => (navigateBackFunction(false))
    
          });
        }
      });

    // console.log("PossibleValues")
    // console.log(PossibleValues)

    // const pickerPossibleValues = PossibleValues.map(possiblevalue => (<Picker.Item label={possiblevalue.Tag} value={possiblevalue.Tag} />))
    // console.log("here2")

    // const picketcurrentPossibleValues = currentPossibleValues.map(possiblevalue => (<Picker.Item label={possiblevalue.Tag} value={possiblevalue.Tag} />))
    // console.log("here3")

    // console.log(PossibleValues)
    return (
        <ScrollView style={[styles.container2, { backgroundColor: "#ffffff" }]}>
            <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]} >
                <Text style={[styles.title, { textAlign: 'center' }]}>{"Output Type of IO" + " for " + ConfigNum}</Text>
            </View>


            <View style={styles.pickerText} >

                <Picker style={styles.picker}
                    selectedValue={selection}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelection(itemValue)
                    }>
                    <Picker.Item label="Current Output" value="Current Output" />
                    <Picker.Item label="Switch Output" value="Switch Output" />
                    {Tag == "Operation Mode IO 1" && <Picker.Item label="IO-LINK" value="IO-LINK" />}
                    {Tag == "Operation Mode IO 2" && <Picker.Item label="Digital Input" value="Digital Input" />}
                    <Picker.Item label="Off" value="Off" />
                    {/* {pickerPossibleValues} */}

                </Picker>

            </View>
            {/* {
                selection == "Current Output" && 
                <Picker style={styles.picker}
                    selectedValue={selection}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelection(itemValue)
                    }>
                    {picketcurrentPossibleValues}
                </Picker>
                //   Current Output Seçiliyken Renderlanacak


            } */}
            {
                selection == "Switch Output" && (
                    <View style={[styles.container1, { alignItems: 'stretch', backgroundColor: "#ffffff" }]}>
                        <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]} >
                            <Text style={[styles.title]}>{"Output Assign for Switch Output"}</Text>
                        </View>

                        <View style={styles.pickerText} >

                            <Picker itemStyle={{}} style={[styles.picker, { textAlign: 'center', alignItems: 'center' }]}
                                selectedValue={selectionSwitchAssign}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectionSwitchAssign(itemValue)
                                }>
                                <Picker.Item label="Off" value="Off" />
                                <Picker.Item label="Conductivity" value="Conductivity" />
                                <Picker.Item label="Concentration" value="Concentration" />
                                <Picker.Item label="Temperature" value="Temperature" />
                                {/* {pickerPossibleValues} */}

                            </Picker>
                        </View>
                        <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]} >
                            <Text style={[styles.title]}>{"Function Type for Switch Output"}</Text>
                        </View>
                        <View style={styles.pickerText} >

                            <Picker style={styles.picker}
                                selectedValue={selectionSwitchFunction}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectionSwitchFunction(itemValue)
                                }>
                                <Picker.Item label="Alarm" value="Alarm" />
                                <Picker.Item label="Off" value="Off" />
                                <Picker.Item label="Limit Conductivity" value="Limit Conductivity" />
                                <Picker.Item label="Limit Concentration" value="Limit Concentration" />
                                <Picker.Item label="Limit Temperature" value="Limit Temperature" />
                                <Picker.Item label="Window Conductivity" value="Window Conductivity" />
                                <Picker.Item label="Window Concentration" value="Window Concentration" />
                                <Picker.Item label="Window Temperature" value="Window Temperature" />
                                {/* {pickerPossibleValues} */}

                            </Picker>
                        </View>
                        <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]} >
                            <Text style={[styles.title]}>{"Output Type for Switch Output"}</Text>
                        </View>
                        <View style={styles.pickerText} >

                            <Picker style={styles.picker}
                                selectedValue={selectionSwitchOutputType}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectionSwitchOutputType(itemValue)
                                }>
                                <Picker.Item label="P-Switching" value="P-Switching" />
                                {Tag == "Operation Mode IO 1" &&<Picker.Item label="N-Switching" value="N-Switching" />}
                                <Picker.Item label="Push-Pull" value="Push-Pull" />
                                {/* {pickerPossibleValues} */}

                            </Picker>
                        </View>

                        {

                            (false) && /////// Condition For Switch Output

                            <Button
                                onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode", "Set Parameters": {"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum},"${menuSwitchAssign.Index}": ${menuSwitchAssign.PossibleValues.find(key => key.Tag == selectionSwitchAssign).Enum}, "${menuSwitchFunction.Index}": ${menuSwitchFunction.PossibleValues.find(key => key.Tag == selectionSwitchFunction).Enum} ,"${menuSwitchOutputType.Index}": ${menuSwitchOutputType.PossibleValues.find(key => key.Tag == selectionSwitchOutputType).Enum} }}`, context) }}
                                title="Save"
                                color="#841584"
                            />
                            



                        }
                    </View>



                )
                //   Current Output Seçiliyken Renderlanacak
            }
            {
                selection == "Current Output" && (
                    <View style={[styles.container1, { alignItems: 'stretch', backgroundColor: "#ffffff" }]}>

                        <View style={[styles.pickerText, { paddingTop: 15, alignItems: "center" }]} >
                            <Text style={[styles.title, { textAlign: 'center', borderBottomColor: "black" }]}>{"Output Assign for Current Output"}</Text>
                        </View>

                        <View style={styles.pickerText} >

                            <Picker style={[styles.picker, { textAlign: 'center' }]}
                                selectedValue={selectionCurrentAssign}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectionCurrentAssign(itemValue)
                                }>
                                <Picker.Item label="Off" value="Off" />
                                <Picker.Item label="Conductivity" value="Conductivity" />
                                <Picker.Item label="Concentration" value="Concentration" />
                                <Picker.Item label="Temperature" value="Temperature" />
                                {/* {pickerPossibleValues} */}

                            </Picker>
                        </View>

                        {

                            (false) && /////// Condition For Current Output

                            <Button
                                onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode","Set Parameters":{"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum},"${menuSwitchAssign.Index}":${menuCurrentAssign.PossibleValues.find(key => key.Tag == selectionCurrentAssign).Enum}}}`, context) }}

                                title="Save"
                                color="#841584"
                            />




                        }
                    </View>





                )
                //   Current Output Seçiliyken Renderlanacak
            }



{/* 
            {
                (selection == "IO-LINK" &&false) &&

                <Button
                    onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode","Set Parameters":{"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum}}}`, context) }}
                    title="Save"
                    color="#841584"
                />
            }
            {
                (selection == "Off" && false) &&

                <Button
                    onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode","Set Parameters":{"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum}}}`, context) }}
                    title="Save"
                    color="#841584"
                />
            }
            {
                (selection == "Digital Input" && false) &&

                <Button
                    onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Operation Mode","Set Parameters":{"${indexSelection}":${PossibleValues.find(key => key.Tag == selection).Enum}}}`, context) }}
                    title="Save"
                    color="#841584"
                />
            } */}

        </ScrollView>
    );
};

const OperationModeScreen = ({ route, navigation }) => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code

        console.log(JSON.stringify(peripheralsArray[0].id));
        peripheralID = peripheralsArray[0].id
    }).catch(() => {
        console.log("Couldnt Find A peripheral");
        // expected output: "Success!"
    });


    return (
        <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center', headerStyle:styles.headerStyle,headerLeft: () => (navigateBackFunction(false))    }}>
            <StackConductivity.Screen name='Operation Modes IO Main' component={OperationScreen} options={{ headerTitle: "Operation Modes IO" }} />
            <StackConductivity.Screen name='Operation Selection' component={OperationSelectionScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
            {/* <StackConductivity.Screen name=' Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} /> */}


        </StackConductivity.Navigator>

    );
}

export default OperationModeScreen

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
    picker: {
        // flex: 1,
        backgroundColor: '#D8D8D8',
        alignItems: "center",
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'column',
    },
    buttonBar: {
        alignItems: "center",
        backgroundColor: "#9A348E",
        padding: 8,
        width:70,
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
    // picker: {
    //     flex: 1,
    //     alignItems: "center",
    //     borderBottomColor: 'black',
    //     borderBottomWidth: StyleSheet.hairlineWidth,
    //     flexDirection: 'column',
    //     backgroundColor:'white'

    //   },
    containerSlider: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'stretch',
        justifyContent: "flex-start",
    },
    headerStyle: {shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6},
});

