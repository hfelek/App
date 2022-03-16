import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    FlatList,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react, { useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
import { ContextConfigurationValues, ContextSensorValues } from '../../../Src/contextConfiguration'
import navigateBackFunction from "../../../Utilities/navigateBackFunction"
import { ItemValueBarShow, ItemBar, ItemBarShow, ItemValueBar, ConfigurationBar } from '../../../Utilities/ItemValueBarStyles';

let peripheralID = '0'

const SystemParams = Paramsfiltered.find(
    SystemParams => SystemParams.Tag === 'System',
);
const MenuParams = SystemParams.menu;
const StackSystem = createStackNavigator();


const createTwoButtonAlert = (title, msg, object, hexValue, context) =>
    Alert.alert(title, msg, [
        {
            text: 'Cancel',                     
            onPress: () => console.log(object + "cancelled"),
            style: 'cancel',
        },
        { text: 'Yes', onPress: () => functionWriteBle(MenuParams.filter(key => key.Tag == object)[0].Index, `${hexValue}`, context) },
    ]);
function functionWriteBle(indexKey, indexValue, context) {
    HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"System","Set Parameters":{"${indexKey}":${indexValue}}}`, context)

}
function SystemMainScreen({ navigation }) {
    const context = useContext(ContextConfigurationValues);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={MenuParams}
                renderItem={({ item, index, separators }) => (renderItem(item, navigation, context, item.Tag))}
                keyExtractor={item => item.Tag}
            />
        </SafeAreaView>)
};

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
function Item(title, value, navigation = null, context = null, parent = null) {
    switch (title) {
        case 'Access Code':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() =>
                        navigation.navigate('Write Screen', { Tag: title, Value: value, name: title })
                    }>

                    <ItemBar item={title} />
                </TouchableOpacity>
            );
            break;
        case 'Set Access Code':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() =>
                        navigation.navigate('Write Screen', { Tag: title, Value: value, name: title })
                    }>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;


        case 'Device Reset':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() =>
                        navigation.navigate('Device Reset', { Tag: title, Value: value })
                    }>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;
        // case 'Cancel':
        //   return (
        //     <TouchableOpacity
        //       style={styles.itemButton}
        //       onPress={() => createTwoButtonAlert(
        //         'Alert',
        //         'Are you sure to cancel ongoing action?',
        //         title,
        //         '0'
        //       ) 

        //       }>
        //       <Text style={styles.title}>{title}</Text>
        //       <Text style={styles.value}>{value}</Text>
        //     </TouchableOpacity>
        //   );
        //   break;
        case 'Device Auto Calibration':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => createTwoButtonAlert(
                        'Alert',
                        'Are you sure to start Auto Calibration?',
                        title,
                        1,
                        context
                    )}>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;
        case 'Device Restore Factory':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => createTwoButtonAlert(
                        'Alert',
                        'Are you sure to restore Factory Settings?',
                        title,
                        1,
                        context
                    )}>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;
        case 'Wifi Parameters Restore':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => createTwoButtonAlert(
                        'Alert',
                        'Are you sure to restore WiFi parameters?',
                        title,
                        1,
                        context
                    )}>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;
        case 'Restart':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => createTwoButtonAlert(
                        'Alert',
                        'Are you sure to restart the device?',
                        title,
                        1,
                        context
                    )}>
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;

        case 'Language':
            return (
                <TouchableOpacity
                    style={styles.itemButton}
                    onPress={()=> Alert.alert('Notice','This feature will be added in upcoming versions!',[  {
                        text: 'Ok',                     
                    }])}
                >
                    <ItemBar item={title} />

                </TouchableOpacity>
            );
            break;

    }
}

const WriteScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues);
    const { Tag } = route.params;
    const { Value } = route.params;
    const index = MenuParams.find(key => key.Tag == Tag).Index
    const [text, setText] = React.useState('');
    useEffect(() => {

        if (text.length > 8) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => { HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Calibration", "Set Parameters": {"${index}":"${text}"}}`, context) }}

                    >
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
        <View>
            <TextInput
                label={(Tag == 'Access Code' ? 'Enter The Device Access Code!' : 'Set Your Access Code!')}
                value={text}
                // selectionColor="#000"
                // underlineColor="#000"
                activeOutlineColor="#000"
                outlineColor="#000"
                // activeUnderlineColor='#000'
                error={false}
                right={
                    <TextInput.Icon
                        name="close-circle-outline"
                        onPress={text => setText('')}
                    />
                }
                onChangeText={text => setText(text)}
            />
            {/* <LenghtChecker lenght={32} /> */}

            {/* <Button
        onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Calibration", "Set Parameters": {"${index}":"${text}"}}`, context) }}

        title="Save"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
            {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        </View>
    );
};

function renderItem(item, navigation = null, context = null, parent) {
    return (Item(item.Tag, item.Value, navigation, context, parent))
}



const SystemScreen = ({ route, navigation }) => {
    BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        // Success code

        console.log(JSON.stringify(peripheralsArray[0].id));
        peripheralID = peripheralsArray[0].id
    }).catch(() => {
        console.log("Couldnt Find A peripheral");
        // expected output: "Success!"
    });




    return (
        <StackSystem.Navigator
            screenOptions={{ headerShown: true, headerStyle: styles.headerStyle, headerTitleAlign: 'center',headerLeft: () => (navigateBackFunction(false)) }}>
            <StackSystem.Screen
                name="System Main"
                component={SystemMainScreen}
                options={{ headerTitle: 'System' }}
            />
            <StackSystem.Screen name="Write Screen" component={WriteScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
        </StackSystem.Navigator>
    );
};

export default SystemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', //
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
        justifyContent: 'center',
    },
    buttonBar: {
        alignItems: "center",
        backgroundColor: "#9A348E",
        padding: 8,
        width: 70,
        marginRight: 3,
        borderRadius: 10,
    },
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
    },
    headerStyle: {
        shadowColor: "#222",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
});
