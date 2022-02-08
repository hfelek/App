import React, { useContext, useEffect } from 'react'
import { StyleSheet, Alert, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
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
import { ContextConfigurationValues, ContextSensorValues } from '../../../App';
import BufferArray from '../../../Navigation/Functions/BufferArray';
const Buffer = require('buffer/').Buffer;
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { sub } from 'react-native-reanimated';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
const renderItem = ({ item, navigation, context = null }) => (
  Item(item.Tag, item.Value, navigation, context)
);
const renderItem1 = ({ item }) => (
  Item(item.Tag)
);
let CommunicationParams = Paramsfiltered.filter(CommunicationParams => CommunicationParams.Tag === "Communication")[0];
let MenuParams = CommunicationParams.menu;
const menuCommunication=Values.find(key=>key.Tag=="Communication")
const menuBLE=menuCommunication.menu.find(key=>key.Tag=="Bluetooth")
const menuWiFi=menuCommunication.menu.find(key=>key.Tag=="WiFi")
const menuComType=menuCommunication.menu.find(key=>key.Tag=="Communication Type")

const WiFiFunctionEnums = { "WiFi Fucntion": "CC", "WiFi Mode": "CD", "SSID": "CE", "Password": "CF", "IP Adress": "D1", "Subnet Adress": "D2", "Router Adress": "D3", "Configure IPv4": "D0" }


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

const CheckButtoned = (selectedValue, sentValue) => {
  if (selectedValue === sentValue) {
    return (

      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, justifyContent: "space-between", flexDirection: "row"
      }}>
        <Text style={{ color: 'black' }}>{sentValue}</Text>
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
      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, flexDirection: "row"
      }}>
        <Text>{sentValue}</Text>
      </View>
    )
  }
}

const CommunicationTypeScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)
  // const { HexIndex } = route.params;
  const possibleValues = menuComType.PossibleValues;
  const index = menuComType.Index;

  const [selection, setSelection] = React.useState(possibleValues.find(key=>key.Enum==context[index]).Tag);



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
    if (selection != context[index]) {
      navigation.setOptions({
        headerRight: () => (
          // Burada Peripheral ID ve UUIDler daha object oriented yapılacak.
          <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":"${possibleValues.find(key=>key.Tag==selection).Enum}"}}`, context) }}>
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


let peripheralID = '0'


const StackCommunication = createStackNavigator();


function Item(title, value, navigation = null, context = null) {
  let index=null
  let menu=null
  // const navigation1 =useNavigation()
  switch (title) {
    case 'Bluetooth':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => { navigation.navigate('Bluetooth') }}>
          <ItemBar item={title} />
        </TouchableOpacity>
      )
    case 'WiFi':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi')}>
          <ItemBar item={title} />
        </TouchableOpacity>
      )
    case 'Communication Type':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Communication Type', { Tag: title })}>
          <ItemValueBar item={title} value={menuComType.PossibleValues.find(key=>key.Enum == context[menuComType.Index] ).Tag} />
        </TouchableOpacity>
      )
    case 'Bluetooth Function':
      menu=menuBLE.menu.find(key=>key.Tag==title)
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Function', { Tag: title })}>
          <ItemValueBar item={title} value={menu.PossibleValues.find(key=>key.Enum==context[menu.Index]).Tag} />
        </TouchableOpacity>
      )
    case 'Bluetooth Tx Power Level':
      menu=menuBLE.menu.find(key=>key.Tag==title)

      return (
        <View style={styles.itemButton} >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{context[menu.Index]}</Text>
        </View>
      )
    case 'Bluetooth Connection Status':
      menu=menuBLE.menu.find(key=>key.Tag==title)

      // const enumBleConStatus = {"0":} BLUETOOTH CONNECTION STATUS NASIL SINIFLANDIRILACAK 
      return (
        <View style={styles.itemButton} >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{menu.PossibleValues.find(key=>key.Enum==context[menu.Index]).Tag}</Text>
        </View>
      )
    case 'WiFi Function':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Function', { Tag: title, HexIndex: "CC", name: title })}>
          <ItemValueBar item={title} value={menu.PossibleValues.find(key=>key.Enum==context[menu.Index]).Tag} />
        </TouchableOpacity>
      )
    case 'WiFi Mode':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Function', { Tag: title, HexIndex: "CD", name: title })}>
          <ItemValueBar item={title} value={menu.PossibleValues.find(key=>key.Enum==context[menu.Index]).Tag} />
        </TouchableOpacity>
      )
    case 'SSID':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('SSID Screen', { Tag: title, HexIndex: "CE" })}>
          <ItemValueBar item={title} value={context[menu.Index]} />
        </TouchableOpacity>
      )
    case 'Password':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Password Screen', { Tag: title, HexIndex: "CF" })}>
          <ItemBar item={title} />
        </TouchableOpacity>
      )
    case 'Configure IPv4':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Configure IPv4', { Tag: title, HexIndex: "D0", name: title })}>
          <ItemValueBar item={title} value={menu.PossibleValues.find(key=>key.Enum==context[menu.Index]).Tag} />
        </TouchableOpacity>
      )
    case 'IP Address':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <View style={styles.itemButton}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{context[menu.Index]}</Text>
        </View>
      )
    case 'Router Address':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <View style={styles.itemButton}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{context[menu.Index]}</Text>
        </View>
      )
    case 'Subnet Address':
      menu=menuWiFi.menu.find(key=>key.Tag==title)

      return (
        <View style={styles.itemButton}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{context[menu.Index]}</Text>
        </View>
      )

    default:
      return (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{null}</Text>
        </View>

      )
  };
}
function IPHANDLER(IP) {
  console.log(IP)
  var splitParts = IP.split(".");

  if (splitParts.length != 4) {
    Alert.alert("Please Enter a Valid IP Adress!", " IP addresses are expressed as a set of four numbers!")
    return (false)
  }
  let i = 0
  try {
    for (const element of splitParts) {
      console.log(element)
      if (parseInt(element) < 256 && parseInt(element) > -1) {
        i++
      }
    }
    if (i == 4) {
      console.log(i)
      return true

    }
    else {
      Alert.alert("Please Enter a Valid IP Adress!", "Each number in the set can range from 0 to 255!")
      return false
    }

  }
  catch (err) {
    console.log(err)
    Alert.alert("Please Enter a Valid IP Adress!")

    return (false)
  }
}
function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}


function inverter(num) {
  if (num == 0) {
    return 255
  }
  else {
    return (~num)
  }
}

function IPCOMPARATOR(ip, subnet, router) {



  try {
    var splitPartsip = ip.split(".");
    var splitPartssubnet = subnet.split(".");
    var splitPartsrouter = router.split(".");
    let total = 0
    const arr = [0, 1, 2, 3]

    for (let index = 0; index < arr.length; index++) {
      console.log("iteration")
      console.log(index)
      let ip1 = parseInt(splitPartsip[index])
      let subnet1 = parseInt(splitPartssubnet[index])
      let router1 = parseInt(splitPartsrouter[index])
      console.log("ip1")
      console.log(ip1)
      console.log("subnet1")
      console.log(subnet1)
      console.log("router1")
      console.log(router1)


      let comparison = 255 - (ip1 ^ router1)
      console.log("comparison")
      console.log(comparison)

      let subnetcomaparison = comparison & subnet1
      console.log("subnetcomaparison")
      console.log(subnetcomaparison)

      if (subnetcomaparison == subnet1) {
        console.log("subnetcomaparison")

        console.log(subnetcomaparison)
        console.log("subnet1")

        console.log(subnet1)
        total++
        // return(true)
      }
      else {
        Alert.alert("IP Adress, Subnet Mask and Router IP should be valid!")
        // return (false)
      }
    }
    if (total == 4) {
      console.log(total)
      return (true)
    }
    else {
      Alert.alert("IP Adress, Subnet Mask and Router IP should be valid!")
      return (false)
    }

    // {
    //   Alert.alert("Please Enter a Valid IP Adress!","Each number in the set can range from 0 to 255!")
    //   return false
    // }

  }
  catch (err) {
    console.log(err)
    return (false)
  }
}


const IPScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)

  const { Tag } = route.params;
  const [text1, setText1] = React.useState(context[HexIndex]);


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
      {context[HexIndex] != text1 &&
        <Button
          onPress={() => {

            if (IPHANDLER(text1)) {
              HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${HexIndex}":"${text1}"}}`, context)
            }
          }}
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
  const val = menuBLE.menu.find(key=>key.Tag==Tag)
  const index = val.Index;

  const possibleValues = val.PossibleValues;
  const context = useContext(ContextConfigurationValues)

  const [selection, setSelection] = React.useState(possibleValues.find(key=>key.Enum == context[index]).Tag);
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

    if (selection != possibleValues.find(key=>key.Enum == context[index]).Tag) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":${possibleValues.find(key=>key.Tag == selection).Enum}}}`, context) }}>

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
const IPV4 = ({ route, navigation }) => {
  const { Tag } = route.params;
  const context = useContext(ContextConfigurationValues)


  const val = menuWiFi.menu.find(key=>key.Tag== Tag)
  const possibleValues = val.PossibleValues;
  const index = val.Index;

  const indexIP = menuWiFi.menu.find(row => row.Tag == "IP Address").Index;
  const indexSubnet = menuWiFi.menu.find(row => row.Tag == "Subnet Address").Index;
  const indexRouter = menuWiFi.menu.find(row => row.Tag == "Router Address").Index;

  const [IPAdress, setIPAdress] = React.useState(context[indexIP]);
  const [subnetAdress, setSubnetAdress] = React.useState(context[indexSubnet]);
  const [routerAdress, setRouterAdress] = React.useState(context[indexRouter]);
  const [selection, setSelection] = React.useState(possibleValues.find(key=>key.Enum==context[index]).Tag);
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

    if ((selection == "DHCP") && ("Manual" ==possibleValues.find(key=>key.Enum==context[index]).Tag)) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":${possibleValues.find(key=>key.Tag==selection).Enum}}}`, context)
            }
            }>
            <View style={styles.buttonBar}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
    else if ((selection == "Manual") && ((IPAdress != context[indexIP]) || (subnetAdress != context[indexSubnet]) || (routerAdress != context[indexRouter]))) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              if (IPHANDLER(IPAdress)) {
                if (IPHANDLER(subnetAdress)) {
                  if (IPHANDLER(routerAdress)) {
                    if (IPCOMPARATOR(IPAdress, subnetAdress, routerAdress)) {

                      HandleWriteCommandGroup(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters":{"${indexIP}":"${IPAdress}","${indexSubnet}":"${subnetAdress}","${indexRouter}":"${routerAdress}","${index}":${possibleValues.find(key=>key.Tag==selection).Enum}}}`, context)
                    }
                  }
                }
              }
            }
            }>
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
    <ScrollView style={styles.containerIPv4}>
      <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection("Manual") }}>
        {CheckButtoned(selection, "Manual")}
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemButton} onPress={() => { setSelection("DHCP") }}>
        {CheckButtoned(selection, "DHCP")}
      </TouchableOpacity>
      {selection == "Manual" && (
        <ScrollView style={{ paddingTop: 15, backgroundColor: "#ffffff" }}>
          <Text style={styles.myText}>Configure IP Adresses Manually</Text>
          <TextInput
            label={"Set Your  WiFi " + "Static IP Adress"}
            value={IPAdress}
            selectionColor='#000'
            underlineColor='#000'
            activeOutlineColor='#000'
            style={{ backgroundColor: "white" }}
            outlineColor='#000'
            keyboardType="numeric"
            // activeUnderlineColor='#000'
            error={false}
            right={<TextInput.Icon name="close-circle-outline" onPress={text => setText1("")} />}
            onChangeText={textwritten => setIPAdress(textwritten)}
          />
          <TextInput
            label={"Set Your  WiFi " + "Static Subnet Adress"}
            value={subnetAdress}
            style={{ backgroundColor: "white" }}
            selectionColor='#000'
            underlineColor='#000'
            activeOutlineColor='#000'
            outlineColor='#000'
            keyboardType="numeric"
            // activeUnderlineColor='#000'
            error={false}
            right={<TextInput.Icon name="close-circle-outline" onPress={text => setSubnetAdress("")} />}
            onChangeText={textwritten => setSubnetAdress(textwritten)}
          />
          <TextInput
            label={"Set Your  WiFi " + "Static Router IP Adress"}
            value={routerAdress}
            style={{ backgroundColor: "white" }}
            selectionColor='#000'
            underlineColor='#000'
            activeOutlineColor='#000'
            outlineColor='#000'
            keyboardType="numeric"
            // activeUnderlineColor='#000'
            error={false}
            right={<TextInput.Icon name="close-circle-outline" onPress={text => setRouterAdress("")} />}
            onChangeText={textwritten => setRouterAdress(textwritten)}
          />

        </ScrollView>

      )


      }





    </ScrollView>
  );
};
const WiFiFunctionScreen = ({ route, navigation }) => {
  const { Tag } = route.params;
  // const { HexIndex } = route.params;



  const context = useContext(ContextConfigurationValues)


  const val = menuWiFi.menu.find(row => row.Tag == Tag);
  const index = val.Index 

  const possibleValues = val.PossibleValues;
  const [selection, setSelection] = React.useState(possibleValues.find(key=>key.Enum==context[index]).Tag);
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

    if (selection != possibleValues.find(key=>key.Enum==context[index]).Tag) {
      navigation.setOptions({
        headerRight: () => (
          // <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":"${possibleValues.filter(row => row.Tag == selection)[0].Enum}"}}`, context) }}>
                     <TouchableOpacity onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":${possibleValues.find(key=>key.Tag==selection).Enum}}}`, context) }}>

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
const BluetoothScreen = ({ navigation }) => {
  const context = useContext(ContextConfigurationValues)
  const possibleValues = menuBLE.menu;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};
const SSIDScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)
  const { Tag } = route.params;
  const index = menuWiFi.menu.find(row => row.Tag == Tag).Index;

  const [text, setText] = React.useState(context[index]);


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
      {context[index] != text &&
        <Button
          onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":"${text}"}}`, context) }}
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
      {/* <MaskedInput {...props} /> */}

    </View>
  );
};
const CommunicationMainScreen = ({ navigation }) => {
  const context = useContext(ContextConfigurationValues)
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>)
}
const PasswordScreen = ({ route, navigation }) => {
  const context = useContext(ContextConfigurationValues)
  const { Tag } = route.params;
  // const { HexIndex } = route.params;
  // useEffect(() => {
  //   navigation.setOptions({ title: Tag })
  // });
  const index = menuWiFi.menu.find(row => row.Tag == Tag).Index;


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
          onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters": {"${index}":"${text}"}}`, context) }} title="Save"
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
      {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
      {/* <MaskedInput {...props} /> */}

    </View>
  );
};

const WifiScreen = ({ navigation }) => {
  const context = useContext(ContextConfigurationValues)
  // const navigation= useNavigation()

  const possibleValues = menuWiFi.menu;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={possibleValues}
        renderItem={({ item, index, separators }) => (renderItem({ item, navigation, context }))}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};

const CommunicationScreen = ({ route, navigation }) => {


  const contextConfigurationValues = useContext(ContextConfigurationValues)

  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID = peripheralsArray[0].id
  }).catch((error) => {
    console.log(error);

    // expected output: "Success!"
  });










  return (
    <StackCommunication.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackCommunication.Screen name='Communication Main' component={CommunicationMainScreen} options={{ headerTitle: "Communication" }} />
      <StackCommunication.Screen name='Bluetooth' component={BluetoothScreen} />
      <StackCommunication.Screen name='WiFi' component={WifiScreen} />
      <StackCommunication.Screen name='Communication Type' component={CommunicationTypeScreen} />
      {/* <StackCommunication.Screen name='Bluetooth Settings Screen' component={BluetoothSettingsScreen} /> */}
      {/* <StackCommunication.Screen name='WiFi Settings Screen' component={WiFiSettingsScreen} /> */}
      <StackCommunication.Screen name='Configure IPv4' component={IPV4} options={({ route }) => ({ headerTitle: route.params.name })} />

      <StackCommunication.Screen name='Bluetooth Function' component={BluetoothFunctionScreen} />
      <StackCommunication.Screen name='WiFi Function' component={WiFiFunctionScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackCommunication.Screen name='IP Screen' component={IPScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
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
  containerIPv4: {

    padding: 0,
    // alignItems:"flex-end",
    // alignContent:"flex-start",
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 8,
    flexDirection: 'column',
    paddingTop: 0,
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth,
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
    fontSize: 19,
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


