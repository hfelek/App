import React, { useEffect,useContext} from 'react'
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
import { ContextConfigurationValues, ContextSensorValues } from '../../../App';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
let peripheralID = '0'


let Output1Params = Paramsfiltered.find(Output1Params => Output1Params.Tag === "Switch Output");
let MenuParams = Output1Params.menu;
const StackSwitchOutput = createStackNavigator();
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
var filtered = Values.filter(row => row.Tag == 'Switch Output');
var filteredAT = filtered.filter(row => row.Tag == 'Switch Output');
function Item(title, value, navigation = null, context = null, parent = null){
    console.log("I am in Item")
    switch (title) {

        case 'Switch Output':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output1')}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.value}>{value}</Text>
                </TouchableOpacity>
            )
        case 'Configuration 1':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Sub',{ Tag: title, name: title, ConfigNum: parent })}>
                    <ItemBar item={title} />
                </TouchableOpacity>
            )
        case 'Configuration 2':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Sub',{ Tag: title, name: title, ConfigNum: parent })}>
                    <ItemBar item={title} />
                </TouchableOpacity>
            )
        case 'Configuration 3':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Sub',{ Tag: title, name: title, ConfigNum: parent })}>
                    <ItemBar item={title} />
                </TouchableOpacity>
            )
        case 'Configuration 4':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Sub',{ Tag: title, name: title, ConfigNum: parent })}>
                    <ItemBar item={title} />
                </TouchableOpacity>
            )
        case 'Conductivity - ON-Value Set Point':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>

<ItemValueBar item={title} value={value} />
                </TouchableOpacity>
            )
        case 'Conductivity - OFF-Value Set Point':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={value} />
                </TouchableOpacity>
            )


        case 'Concentration - ON-Value Set Point':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={value} />
                </TouchableOpacity>
            )
        case 'Concentration - OFF-Value Set Point':
            return ( 
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={value} />
                </TouchableOpacity>
            )

        case 'Temperature - ON-Value Set Point':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={value} />
                </TouchableOpacity>
            )
        case 'Temperature - OFF-Value Set Point':
            return (
                <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
                    Tag: title,
                    name: title,
                    ConfigNum: parent
                })}>
                      <ItemValueBar item={title} value={value} />
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

const SwitchOutputSubScreen = ({route,navigation}) => {
    const {ConfigNum}= route.params
    console.log(ConfigNum)
    const valSystemUnits = Values.filter(row => row.Tag == 'Switch Output');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Configuration 1');
    const possibleValues = val[0].menu;


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={possibleValues}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, "hello", ConfigNum))}
                keyExtractor={item => item.Tag}
            />
        </SafeAreaView>
    );
};
const SwitchOutputMainScreen = ({route,navigation}) => {
  


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={MenuParams}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, "hello", item.Tag))}
                keyExtractor={item => item.Tag}
            />
        </SafeAreaView>
    );
};



const SwitchOutputSettingsScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues);
    const { Tag } = route.params
    const {ConfigNum} = route.params
    console.log("ConfigNum")

    console.log(ConfigNum)
    const filtered = Values.filter(row => row.Tag == 'Switch Output')[0].menu;
    const filteredSub = filtered.filter(row => row.Tag == 'Configuration 1')[0].menu;
    const filteredAT = filteredSub.filter(row => row.Tag == Tag);
    const [text, setText] = React.useState(filteredAT[0].Value);
    console.log("I am here Switch Output")
    let hexIndexKey
    switch (Tag) {
        case "Conduction Start Value":
            hexIndexKey = "9D"
            break;
        case "Conduction End Value":
            hexIndexKey = "9E"
            break;
        case "Concentration Start Value":
            hexIndexKey = "9F"
            break;
        case "Concentration End Value":
            hexIndexKey = "A0"
            break;
        case "Temperature Start Value":
            hexIndexKey = "A1"
            break;
        case "Temperature End Value":
            hexIndexKey = "A2"
            break;

        default:
            break;
    }
    // useEffect(() => {
    //   navigation.setOptions({ title: Tag })
    // })
    //   if (text != filteredAT[0].Value) {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output1', 'Set Parameters': {${hexIndexKey}:'${text}'}}`)) }}

    //         >
    //           <View style={styles.buttonBar}>
    //             <Text>Save</Text>
    //           </View>
    //         </TouchableOpacity>
    //       ),
    //     });
    //   }
    //   else {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <></>
    //       ),
    //     });
    //   }
    // });
    return (
        <View>
            <TextInput
                label={"Set " + Tag + " As a Percentage of Full-Scale"}
                value={text}
                selectionColor='#000'
                underlineColor='#000'
                activeOutlineColor='#000'
                outlineColor='#000'
                keyboardType='numeric'
                // activeUnderlineColor='#000'
                error={false}
                right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
                onChangeText={text => setText(text)}
            />
            {/* <LenghtChecker lenght={32} /> */}
            {text != filteredAT[0].Value &&
                <Button
                    onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Current Output", "Set Parameters": {"${Tag}":"${text}"}}`,context) }}
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

        console.log(JSON.stringify(peripheralsArray[0].id));
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
        <StackSwitchOutput.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
            <StackSwitchOutput.Screen name='Switch Output1' component={SwitchOutputMainScreen}   options={{ headerTitle: "Switch Output Settings" }}/>
            <StackSwitchOutput.Screen name='Switch Sub' component={SwitchOutputSubScreen} options={({ route }) => ({ headerTitle: route.params.name })}  />
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

    buttonBar: {
        alignItems: "center",
        backgroundColor: "#9A348E",
        padding: 8,
        marginRight: 3,
        borderRadius: 10,
    },

    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
});


