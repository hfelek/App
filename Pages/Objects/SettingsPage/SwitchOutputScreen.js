import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import navigateBackFunction from "../../../Utilities/navigateBackFunction"
import { ItemValueBarShow,ItemBar,ItemBarShow,ItemValueBar,ConfigurationBar } from '../../../Utilities/ItemValueBarStyles';
let peripheralID = null

function isItNumber(str) {
    return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
const activeConfigurationMenu = Paramsfiltered.filter(SetupMenu => SetupMenu.Tag === "Setup Menu")[0].menu;
const activeConfigurationIndex =activeConfigurationMenu.filter(tag => tag.Tag === "Active Configuration")[0].Index
const activeConfigurationPossibleValues =activeConfigurationMenu.filter(tag => tag.Tag === "Active Configuration")[0].PossibleValues


let Output1Params = Paramsfiltered.find(Output1Params => Output1Params.Tag === "Switch Output");
let MenuParams = Output1Params.menu;
const StackSwitchOutput = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Switch Output');
var filteredAT = filtered.filter(row => row.Tag == 'Switch Output');
function Item(title, value, navigation = null, context = null, parent = null) {
    let index= null
    let activeConfigEnum=null
    switch (title) {

        case 'Switch Output':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output1')}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value}</Text>
                </TouchableOpacity>
            )
        case 'Configuration 1':
            activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

            return (
                <TouchableOpacity style={title == activeConfigEnum ? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Switch Sub', { Tag: title, name: title, ConfigNum: parent })}>
                    <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 1"} />
                </TouchableOpacity>
            )
        case 'Configuration 2':
            activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

            return (
                <TouchableOpacity style={title == activeConfigEnum ? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Switch Sub', { Tag: title, name: title, ConfigNum: parent })}>
                    <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 2"} />
                </TouchableOpacity>
            )
        case 'Configuration 3':
            activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

            return (
                <TouchableOpacity style={title == activeConfigEnum? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Switch Sub', { Tag: title, name: title, ConfigNum: parent })}>
                    <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 3"} />
                </TouchableOpacity>
            )
        case 'Configuration 4':
            activeConfigEnum=activeConfigurationPossibleValues.filter(key=> key.Enum == context[activeConfigurationIndex])[0].Tag

            return (
                <TouchableOpacity style={title == activeConfigEnum ? styles.itemActiveConfig : styles.itemButton} onPress={() => navigation.navigate('Switch Sub', { Tag: title, name: title, ConfigNum: parent })}>
                    <ConfigurationBar activeConfig={activeConfigEnum} config={"Configuration 4"} />
                </TouchableOpacity>
            )
        case 'Conductivity On Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>

<ItemValueBar item={title} value={(context[index].toFixed(1))} />
                </TouchableOpacity>
            )
        case 'Conductivity Off Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={(context[index].toFixed(1))} />
                </TouchableOpacity>
            )


        case 'Concentration On Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={(context[index].toFixed(1))} />
                </TouchableOpacity>
            )
        case 'Concentration Off Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={(context[index].toFixed(1))} />
                </TouchableOpacity>
            )

        case 'Temperature On Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={(context[index].toFixed(1))} />
                </TouchableOpacity>
            )
        case 'Temperature Off Value Point':
            index = (MenuParams.filter(config => config.Tag == parent)[0].menu).filter(tag => tag.Tag == title)[0].Index

            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={(context[index].toFixed(1))} />
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
const renderItem1 = ({ item }) => (
    Item(item.Tag, item.Value)
);

const SwitchOutputSubScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues);
    const { ConfigNum } = route.params
    const valSystemUnits = Values.filter(row => row.Tag == 'Switch Output');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Configuration 1');
    const possibleValues = val[0].menu;


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={possibleValues}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, ConfigNum))}
                keyExtractor={item => item.Tag}
            />
        </SafeAreaView>
    );
};
const SwitchOutputMainScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues);



    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={MenuParams}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, item.Tag))}
                keyExtractor={item => item.Tag}
            />
        </SafeAreaView>
    );
};



const SwitchOutputSettingsScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues);
    const { Tag } = route.params
    const { ConfigNum } = route.params
    const index = (MenuParams.filter(tag => tag.Tag == ConfigNum)[0].menu).filter(tag => tag.Tag == Tag)[0].Index
    const [text, setText] = React.useState(context[index].toFixed(1));
    useEffect(() => {
        console.log((text != context[index] && isItNumber(text) && text<100))
        console.log("here")
        if (Math.abs(text - context[index])>=0.1 && isItNumber(text) && text<=100 && text>=0 )  {
          navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity
              onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Switch Output", "Set Parameters": {"${index}":${(Math.round(parseFloat(text)*10))/10}}}`, context) }}
    
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
      console.log("diff")
      console.log(Math.abs(text-context[index]))
    return (
        <View>
            <TextInput
                label={"Set " + " As a Percentage of Full-Scale"}
                value={text}
                // selectionColor='#000'
                // underlineColor='#000'
                // activeOutlineColor='#000'
                // outlineColor='#000'
                keyboardType='numeric'
                maxLength={8}
                // activeUnderlineColor='#000'
                error={false}
                right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
                onChangeText={text => setText(text)}
            />
            {/* <LenghtChecker lenght={32} /> */}
            {Math.abs(text - context[index])>=0.001 && isItNumber(text) && text<100 && false &&
                <Button
                    onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Switch Output", "Set Parameters": {"${index}":${(Math.round(parseFloat(text)*1000))/1000}}}`, context) }}
                    title="Save"
                    color="#841584"
                />}
            {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}

        </View>
    );
}
function renderItem(item, navigation = null, context = null, parent) {
    return (Item(item.Tag, item.Value, navigation, context, parent))
}
const SwitchOutputScreen = ({ route, navigation }) => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code

        peripheralID = peripheralsArray[0].id
    }).catch(() => {
        console.log("Couldnt Find A peripheral");
        // expected output: "Success!"
    });

    // const CheckButtoned = (selectedValue, sentValue) => {
    //     console.log("I am in checkbuttoned")
    //     if (selectedValue === sentValue) {
    //         return (

    //             <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
    //                 <Text>{sentValue}</Text>
    //                 <Icon
    //                     name="checkmark-outline"
    //                     size={20}
    //                     color="#f54"
    //                 />
    //             </View>
    //         )
    //     }
    //     else {
    //         return (
    //             <View style={{ flexDirection: "row" }}>
    //                 <Text>{sentValue}</Text>
    //             </View>
    //         )
    //     }
    // }


    /// Bu Case Functionı Sonrasında Daha Basit Bir Yapıya Çevrilecek

    // console.log(JSON.stringify(Output1Params));
    // console.log(JSON.stringify(MenuParams));





    return (
        <StackSwitchOutput.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center', headerStyle:styles.headerStyle,headerLeft: () => (navigateBackFunction(false))    }}>
            <StackSwitchOutput.Screen name='Switch Output1' component={SwitchOutputMainScreen} options={{ headerTitle: "Switch Output Settings" }} />
            <StackSwitchOutput.Screen name='Switch Sub' component={SwitchOutputSubScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
            <StackSwitchOutput.Screen name='Switch Output Settings' component={SwitchOutputSettingsScreen} options={({ route }) => ({ headerTitle: route.params.name })} />

        </StackSwitchOutput.Navigator>

    );
}

export default SwitchOutputScreen

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
    itemActiveConfig: {
        backgroundColor: '#008000',
        justifyContent: 'center',
        padding: 8,
    },
    buttonBar: {
        alignItems: "center",
        backgroundColor: "#9A348E",
        padding: 8,
        width:70,
        fontSize:15,
        marginRight: 3,
        borderRadius: 10,
    },

    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    },  headerStyle: {shadowColor: "#222",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6},
});


