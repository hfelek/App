import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
////Title Sildim Yukarıdan
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import BleManager from 'react-native-ble-manager';
import ConnectionScreen from '../../ConnectionScreen';
const Buffer = require('buffer/').Buffer;


const HandleWriteCommand = (peripheralId,serviceUUID,characteristicUUID,value,maxbytesize=512)=>{
  BleManager.write(peripheralId,serviceUUID,characteristicUUID,value,maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}


let CommunicationParams = Paramsfiltered.find(CommunicationParams => CommunicationParams.Tag === "Communication");
let MenuParams = CommunicationParams.menu;
const StackCommunication = createStackNavigator();

var filtered;
var filteredAT;


const CommunicationScreen = ({ route, navigation }) => {
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

  function Item(title, value) {
    switch (title) {
      case 'Bluetooth':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'WiFi':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Communication Type':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Communication Type', { Tag: title, HexIndex: "C8"  })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Bluetooth Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Function', { Tag: title, HexIndex: "C9"  })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      // case 'Bluetooth Tx Power Level':
      //   return (
      //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Settings Screen', { Tag: title })}>
      //       <Text style={styles.title}>{title}</Text>
      //       <Text style={styles.value}>{value}</Text>
      //     </TouchableOpacity>
      //   )
      // case 'Bluetooth Connection Status':
      //   return (
      //     <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Settings Screen', { Tag: title })}>
      //       <Text style={styles.title}>{title}</Text>
      //       <Text style={styles.value}>{value}</Text>
      //     </TouchableOpacity>
      //   )
      case 'WiFi Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Function', { Tag: title, HexIndex: "CC" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'WiFi Mode':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Function', { Tag: title, HexIndex: "CD"  })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'SSID':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('SSID Screen', { Tag: title, HexIndex: "CE" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Password':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Password Screen', { Tag: title, HexIndex: "CF" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Configure IPv4':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Function', { Tag: title, HexIndex: "D0" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'IP Address':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('IP Screen', { Tag: title , HexIndex: "D1" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Router':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('IP Screen', { Tag: title, HexIndex: "D3" })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Subnet Address':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('IP Screen', { Tag: title, HexIndex: "D2" })}>
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




  // console.log(JSON.stringify(CommunicationParams));
  // console.log(JSON.stringify(MenuParams))

  const CommunicationMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const BluetoothScreen = ({ navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Communication');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Bluetooth');
    const possibleValues = val[0].menu;
    const [selection, setSelection] = React.useState(val[0].Value);
    //console.log(possibleValues)
    //console.log(typeof (possibleValues))
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const BluetoothSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;
    useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    return (
      <Text>{Tag}</Text>)
  };
  const WiFiSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;    useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    return (
      <Text>{Tag}</Text>)
  };
  const CommunicationTypeScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;  

    const valSystemUnits = Values.filter(row => row.Tag == "Communication")[0].menu;
    const val = valSystemUnits.filter(row => row.Tag == 'Communication Type');
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    var myBuffer = [];
    if (Platform.OS === 'android') {
      BleManager.requestMTU("24:0A:C4:09:69:62", 512)
          .then((mtu) => {
              // Success code
              console.log()
              console.log("MTU size changed to " + mtu + " bytes");
          })
          .catch((error) => {
              // Failure code
              console.log("Error kodu")
              console.log("24:0A:C4:09:69:62")
              console.log(error);
          });
   };
    
    
    function ItemSelectable(title) {


      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection(title) }}>
          {CheckButtoned(selection, title)}
        </TouchableOpacity>
      )
    }
    const renderItemSelectable = ({ item }) => (
      ItemSelectable(item.Tag, item.Value)
    );
    // ({"Tag":"Communication", "Set Parameters": {"CB":"1"}})
    
    
    useEffect(() => {
      if (selection != val[0].Value) {
        navigation.setOptions({
          headerRight: () => (
            // Burada Peripheral ID ve UUIDler daha object oriented yapılacak.
            <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${HexIndex}':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`))}}>
              <View style={styles.buttonBar}>
                <Text>Save</Text>
              </View>
            </TouchableOpacity>
          ),
        });
      }
      else {
        //console.log(selection)

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
  const WiFiFunctionScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    console.log(Tag)
    const {HexIndex} = route.params;  
    useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    const valSystemUnits = Values.filter(row => row.Tag == 'Communication')[0];
    const subTitle = valSystemUnits.menu.filter(row => row.Tag == "WiFi")[0];
    const val = subTitle.menu.filter(row => row.Tag == Tag);
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
      ItemSelectable(item.Tag, item.Value)
    );
    useEffect(() => {

      if (selection != val[0].Value) {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {${HexIndex}:'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`))}}>
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
  // function IPParse(Ip){


  // }
  const SSIDScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;   
     useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    const filtered = Values.filter(row => row.Tag == 'Communication');
    const filteredAT = filtered[0].menu.filter(row => row.Tag == "WiFi")[0].menu;
    const filteredATSub = filteredAT.filter(row => row.Tag == Tag)[0].Value;
    const initialText = filteredATSub;
    const [text, setText] = React.useState(filteredATSub);

  
    return (
      <View>
        <TextInput
          label={"Set Your WiFi " + Tag}
          value={text}
          selectionColor='#000'
          underlineColor='#000'
          activeOutlineColor='#000'
          outlineColor='#000'          // activeUnderlineColor='#000'
          error={false}
          right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
          onChangeText={text => setText(text)}
        />
        {/* <LenghtChecker lenght={32} /> */}
     {initialText!=text &&
        <Button
        onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${HexIndex}':'${text}'}}`))}}          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        {/* <MaskedInput {...props} /> */}

      </View>
    );
  };
  const IPScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;    useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    const filtered = Values.filter(row => row.Tag == 'Communication');
    const filteredAT = filtered[0].menu.filter(row => row.Tag == "WiFi")[0].menu;
    const filteredATSub = filteredAT.filter(row => row.Tag == Tag)[0].Value;

    const [text1, setText1] = React.useState(filteredATSub);

    function IPHandle  (IP123){
    //  console.log( "asfas1232145112..41251123124".replaceAll("[^0-9.,]"))
      var returnValIP= IP123.replace('\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b');
      // console.log(IP123)
      // console.log("IP123")
      // console.log(returnValIP)
      // console.log("returnValIP")

      // console.log(typeof(IP123))
      // console.log("typeof(IP123)")

      // setText(IP)
      // return (returnValIP)

    } 
  
    return (
      <View>
        <TextInput
          label={"Set Your WiFi " + Tag}
          value={text1}
          selectionColor='#000'
          underlineColor='#000'
          activeOutlineColor='#000'
          outlineColor='#000'
          keyboardType="numeric"
          // activeUnderlineColor='#000'
          error={false}
          right={<TextInput.Icon name="close-circle-outline" onPress={text => setText1("")} />}
          onChangeText={textwritten => setText1(textwritten)}
        />
        {/* <LenghtChecker lenght={32} /> */}
  {filteredATSub!=text1 &&
        <Button
        onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${HexIndex}':'${text1}'}}`))}}          title="Save"
        title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        {/* <MaskedInput {...props} /> */}

      </View>
    );
  };

  const PasswordScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;    useEffect(() => {
      navigation.setOptions({ title: Tag })
    });
    // const filtered = Values.filter(row => row.Tag == 'Communication');
    // const filteredAT = filtered[0].menu.filter(row => row.Tag == "WiFi")[0].menu;
    // const filteredATSub = filteredAT.filter(row => row.Tag == Tag)[0].Value;

    const [text, setText] = React.useState("");

  
    return (
      <View>
        <TextInput
          label={"Set Your WiFi " + Tag}
          value={text}
          selectionColor='#000'
          underlineColor='#000'
          activeOutlineColor='#000'
          outlineColor='#000'
          secureTextEntry={true}
          // keyboardType="numeric"
          // activeUnderlineColor='#000'
          error={false}
          right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
          onChangeText={text => setText(text)}
        />
        {/* <LenghtChecker lenght={32} /> */}
        {text.length > 8 &&
        <Button
        onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${HexIndex}':'${text}'}}`))}}          title="Save"
        title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        {/* <MaskedInput {...props} /> */}

      </View>
    );
  };

  const BluetoothFunctionScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const {HexIndex} = route.params;    const valSystemUnits = Values.filter(row => row.Tag == 'Communication')[0];
    const subTitle = valSystemUnits.menu.filter(row => row.Tag == "Bluetooth")[0];
    const val = subTitle.menu.filter(row => row.Tag == Tag);
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
            <TouchableOpacity  onPress={() => { HandleWriteCommand("24:0A:C4:09:69:62","a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'${HexIndex}':'${possibleValues.filter(row => row.Tag == selection)[0].Enum}'}}`))}}>

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
  const WifiScreen = ({ navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Communication');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'WiFi');
    const possibleValues = val[0].menu;
    const [selection, setSelection] = React.useState(val[0].Value);
    // console.log(possibleValues)
    // console.log(typeof (possibleValues))
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );
  const renderItem1 = ({ item }) => (
    Item(item.Tag)
  );

  return (
    <StackCommunication.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackCommunication.Screen name='Communication Main' component={CommunicationMainScreen} options={{ headerTitle: "Communication" }} />
      <StackCommunication.Screen name='Bluetooth' component={BluetoothScreen} />
      <StackCommunication.Screen name='WiFi' component={WifiScreen} />
      <StackCommunication.Screen name='Communication Type' component={CommunicationTypeScreen} />
      <StackCommunication.Screen name='Bluetooth Settings Screen' component={BluetoothSettingsScreen} />
      <StackCommunication.Screen name='WiFi Settings Screen' component={WiFiSettingsScreen} />
      <StackCommunication.Screen name='Bluetooth Function' component={BluetoothFunctionScreen} />
      <StackCommunication.Screen name='WiFi Function' component={WiFiFunctionScreen} />
      <StackCommunication.Screen name='IP Screen' component={IPScreen} />
      <StackCommunication.Screen name='Password Screen' component={PasswordScreen} />
      <StackCommunication.Screen name='SSID Screen' component={SSIDScreen} />



    </StackCommunication.Navigator>

  );
}

export default CommunicationScreen

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
  myText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center'
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,
  },
});


