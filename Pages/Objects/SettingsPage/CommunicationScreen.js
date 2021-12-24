import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput} from 'react-native-paper';
////Title Sildim Yukarıdan
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Communication Type', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Bluetooth Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Bluetooth Tx Power Level':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Bluetooth Connection Status':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Bluetooth Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'WiFi Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'WiFi Mode':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'SSID':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Password':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Configure IPv4':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'IP Address':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Router':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Subnet Address':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('WiFi Settings Screen', { Tag: title })}>
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
    console.log(possibleValues)
    console.log(typeof (possibleValues))
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
  const BluetoothSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    navigation.setOptions({ title: Tag })
    return (
      <Text>{Tag}</Text>)
  };
  const WiFiSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    navigation.setOptions({ title: Tag })
    return (
      <Text>{Tag}</Text>)
  };
  const CommunicationTypeScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    const valSystemUnits = Values.filter(row => row.Tag == "Communication")[0].menu;
    const val = valSystemUnits.filter(row => row.Tag == 'Communication Type');
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
    console.log("hello")
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
    if (selection != val[0].Value) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity >
            <View style={styles.buttonBar}>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }
    else {
      console.log(selection)

      navigation.setOptions({
        headerRight: () => (
          <></>
        ),
      });
    }
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
    console.log(possibleValues)
    console.log(typeof (possibleValues))
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


