import React,{useEffect} from 'react'
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
let peripheralID='0'

const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, maxbytesize = 512) => {
  BleManager.write(peripheralId, serviceUUID, characteristicUUID, value, maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}
let Output2Params = Paramsfiltered.find(Output2Params => Output2Params.Tag === "Output2");
let MenuParams = Output2Params.menu;
const StackOutput2 = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Output2');
var filteredAT = filtered.filter(row => row.Tag == 'Switch Output');


const Output2Screen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID=peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });
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
  const OutputTypeScreen = ({ route, navigation}) =>{
    const {Tag} = route.params
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == Tag);
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    let hexIndex
    switch (selection) {
      case "Current":
        hexIndex = "0"
        break;
      case "Switch":
        hexIndex = "1"
        break;
      case "Digital Input":
        hexIndex = "2"
        break;
      case "Off":
        hexIndex = "3"
        break;

      default:
        break;
    }
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
            <TouchableOpacity
              onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output2', 'Set Parameters': {'AF':'${hexIndex}'}}`)) }}

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
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItemSelectable}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };


  function Item(title, value) {
    switch (title) {
      case 'Switch Output':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Current Output':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
        case 'Output Type':
          return (
            <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Output Type', {
              Tag: title,
            })}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.value}>{value}</Text>
            </TouchableOpacity>
          )
      case 'Conductivity Start Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Conductivity Start Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conductivity End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Conductivity End Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration Start Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Concentration Start Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Concentration End Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Digital Input':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Output-Assign':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Output-Assign', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Start Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Temperature Start Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
            name:'Temperature End Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Switch Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Function', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conductivity On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Conductivity On Value',
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conductivity Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Conductivity Off Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Concentration On Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Concentration Off Value',
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Temperature On Value'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
            name:'Temperature Off Value',
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Polarity LOW':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
            name:'D-In Polarity LOW'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Polarity':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
            name:'D-In Polarity'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
            name:'D-In Function'
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Polarity HIGH':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
            name:'D-In Polarity HIGH'
          })}>
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
  /// Bu Case Functionı Sonrasında Daha Basit Bir Yapıya Çevrilecek
  const renderItem1 = ({ item }) => (
    Item(item.Tag, item.Value)
  );
  // console.log(JSON.stringify(Output2Params));
  // console.log(JSON.stringify(MenuParams));

  const Output2MainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )
  const DigitalInputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Digital Input');
    const possibleValues = val[0].menu;

    // console.log(possibleValues)
    // console.log(typeof (possibleValues))
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem1}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const CurrentOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Current Output');
    const possibleValues = val[0].menu;

    // console.log(possibleValues)
    // console.log(typeof (possibleValues))
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem1}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const CurrentOutputSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    const filtered = Values.filter(row => row.Tag == 'Output2')[0].menu;
    const filteredSub = filtered.filter(row => row.Tag == 'Current Output')[0].menu;
    const filteredAT = filteredSub.filter(row => row.Tag == Tag);
    const [text, setText] = React.useState(filteredAT[0].Value);
    // console.log(route)
    // console.log("route")
    let hexIndexKey
    switch (Tag) {
      case "Conductivity Start Value":
        hexIndexKey = "B1"
        break;
      case "Conductivity End Value":
        hexIndexKey = "B2"
        break;
      case "Concentration Start Value":
        hexIndexKey = "B3"
        break;
      case "Concentration End Value":
        hexIndexKey = "B4"
        break;
      case "Temperature Start Value":
        hexIndexKey = "B5"
        break;
      case "Temperature End Value":
        hexIndexKey = "B6"
        break;

      default:
        break;
    }
    // useEffect(() => {
    //   navigation.setOptions({ title: Tag })
    // })
    return (
      <View>
        <TextInput
          label={"Set " + Tag}
          value={text}
          selectionColor='#000'
          underlineColor='#000'
          activeOutlineColor='#000'
          outlineColor='#000'
          // activeUnderlineColor='#000'
          error={false}
          right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
          onChangeText={text => setText(text)}
        />
        {/* <LenghtChecker lenght={32} /> */}

        {text != filteredAT[0].Value &&
          <Button
            onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output1', 'Set Parameters': {${hexIndexKey}:'${text}'}}`)) }}
            title="Save"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}

      </View>
    );
  }
  const SwitchFunctionScreen = ({ route, navigation }) => {
    const { Tag } = route.params

  
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2')[0].menu;
    const subTitle = valSystemUnits.filter(row => row.Tag == 'Switch Output');
    const val = subTitle[0].menu.filter(row => row.Tag == Tag);
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    let hexIndex
    switch (selection) {
      case "Alarm":
        hexIndex = "0"
        break;
      case "Off":
        hexIndex = "1"
        break;
      case "On":
        hexIndex = "2"
        break;
      case "Limit Conductivity":
        hexIndex = "3"
        break;
      case "Limit Concentration":
        hexIndex = "4"
        break;
      case "Limit Temperature":
        hexIndex = "5"
        break;
      case "Window Conductivity":
        hexIndex = "6"
        break;
      case "Window Concentration":
        hexIndex = "7"
        break;
      case "Window Temperature":
        hexIndex = "8"
        break;
      default:
        break;
    }
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
            <TouchableOpacity
            onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output2', 'Set Parameters': {'B8':'${hexIndex}'}}`)) }}

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
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItemSelectable}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const OutputAssignScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2')[0].menu;
    const subTitle = valSystemUnits.filter(row => row.Tag == 'Current Output');
    const val = subTitle[0].menu.filter(row => row.Tag == Tag);
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    let hexIndex
    switch (selection) {
      case "Off":
        hexIndex = "0"
        break;
      case "Conductivity":
        hexIndex = "1"
        break;
      case "Concentration":
        hexIndex = "2"
        break;
      case "Temperature":
        hexIndex = "3"
        break;

      default:
        break;
    }
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
          <TouchableOpacity
          onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output2', 'Set Parameters': {'AF':'${hexIndex}'}}`)) }}

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
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItemSelectable}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const SwitchOutputSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    const filtered = Values.filter(row => row.Tag == 'Output2')[0].menu;
    const filteredSub = filtered.filter(row => row.Tag == 'Switch Output')[0].menu;
    const filteredAT = filteredSub.filter(row => row.Tag == Tag);
    const [text, setText] = React.useState(filteredAT[0].Value);
    // useEffect(() => {
    //   navigation.setOptions({ title: Tag })
    // })
    let hexIndexKey
    switch (Tag) {
      case "Conductivity On Value":
        hexIndexKey = "B9"
        break;
      case "Conductivity Off Value":
        hexIndexKey = "BA"
        break;
      case "Concentration On Value":
        hexIndexKey = "BB"
        break;
      case "Concentration Off Value":
        hexIndexKey = "BC"
        break;
      case "Temperature On Value":
        hexIndexKey = "BD"
        break;
      case "Temperature Off Value":
        hexIndexKey = "BE"
        break;

      default:
        break;
    }
    return (
      <View>
        <TextInput
          label={"Set " + Tag}
          value={text}
          selectionColor='#000'
          underlineColor='#000'
          activeOutlineColor='#000'
          outlineColor='#000'
          // activeUnderlineColor='#000'
          error={false}
          keyboardType='numeric'
          right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
          onChangeText={text => setText(text)}
        />
        {/* <LenghtChecker lenght={32} /> */}

   
        {text != filteredAT[0].Value &&
          <Button

            onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output1', 'Set Parameters': {${hexIndexKey}:'${text}'}}`)) }}
            title="Save"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}

      </View>
    );
  }
  const DigitalInputSettingsScreen = ({ route, navigation }) =>{
    const { Tag } = route.params
  
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2')[0].menu;
    const subTitle = valSystemUnits.filter(row => row.Tag == 'Digital Input');
    const val = subTitle[0].menu.filter(row => row.Tag == Tag);
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    let hexIndexKey
    let hexValue
    switch (Tag) {
      case "D-In Polarity":
        hexIndexKey = "BF"
        if(selection=='Low'){
          hexValue='0'
        }
        else if (selection=='High'){
          hexValue='1'
        }
        break;
      case "D-In Function":
        hexIndexKey = "C0"
        if(selection=='Measurement Assignment Chemical'){
          hexValue='0'
        }
        else if (selection=='Off'){
          hexValue='1'
        }
        break;
        break;
      case "D-In Polarity HIGH":
        hexIndexKey = "C1"
        if(selection=='NaOH'){
          hexValue='0'
        }
        else if (selection=='NaCl'){
          hexValue='1'
        }
        else if (selection=='Na2SO4'){
          hexValue='2'
        }
        break;
      case "D-In Polarity LOW":
        hexIndexKey = "C2"
        if(selection=='NaOH'){
          hexValue='0'
        }
        else if (selection=='NaCl'){
          hexValue='1'
        }
        else if (selection=='Na2SO4'){
          hexValue='2'
        }
        break;


      default:
        break;
    }
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
    useEffect(()=> {
      navigation.setOptions({title:Tag})

    },[navigation])
    useEffect(() => {

    if (selection != val[0].Value) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity   onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", BufferArray(`{'Tag':'Output2', 'Set Parameters': {${hexIndexKey}:'${hexValue}'}}`)) }}>
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
  },[]);

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
  const SwitchOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Switch Output');
    const possibleValues = val[0].menu;

    // console.log(possibleValues)
    // console.log(typeof (possibleValues))
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem1}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );

  return (
    <StackOutput2.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackOutput2.Screen name='Output2 Main' component={Output2MainScreen} options={{ headerTitle: "Output 2" }} />
      <StackOutput2.Screen name='Switch Output' component={SwitchOutputScreen} />
      <StackOutput2.Screen name='Current Output' component={CurrentOutputScreen} />
      <StackOutput2.Screen name='Current Output Settings' component={CurrentOutputSettingsScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackOutput2.Screen name='Switch Output Settings' component={SwitchOutputSettingsScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackOutput2.Screen name='Digital Input' component={DigitalInputScreen} />
      <StackOutput2.Screen name='Digital Input Settings' component={DigitalInputSettingsScreen} options={({ route }) => ({ headerTitle: route.params.name })} />
      <StackOutput2.Screen name='Switch Function' component={SwitchFunctionScreen} />
      <StackOutput2.Screen name='Output-Assign' component={OutputAssignScreen} />
      <StackOutput2.Screen name='Output Type' component={OutputTypeScreen} />

    </StackOutput2.Navigator>

  );
}

export default Output2Screen

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
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,
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
  }
});


