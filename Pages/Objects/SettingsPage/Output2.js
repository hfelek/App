import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';

let Output2Params = Paramsfiltered.find(Output2Params => Output2Params.Tag === "Output2");
let MenuParams = Output2Params.menu;
const StackOutput2 = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Output2');
var filteredAT = filtered.filter(row => row.Tag == 'Switch Output');


const Output2Screen = ({ route, navigation }) => {

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
      case 'Conduction Start Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conduction End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration Start Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
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
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
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
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature End Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Current Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Switch Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conduction On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Conduction Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Concentration Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature On Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Off Value':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switch Output Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-IN Polarity LOW':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Polarity':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Function':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
          })}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'D-In Polarity HIGH':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Digital Input Settings', {
            Tag: title,
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
  const CurrentOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Current Output');
    const possibleValues = val[0].menu;

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
  const CurrentOutputSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    navigation.setOptions({ title: Tag })
    return (
      <Text>{Tag}</Text>)
  };
  const SwitchOutputSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    navigation.setOptions({ title: Tag })
    return (
      <Text>{Tag}</Text>)
  };
  const DigitalInputSettingsScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    navigation.setOptions({ title: Tag })
    return (
      <Text>{Tag}</Text>)
  };
  const SwitchOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output2');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Switch Output');
    const possibleValues = val[0].menu;

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

  return (
    <StackOutput2.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackOutput2.Screen name='Output2 Main' component={Output2MainScreen} options={{ headerTitle: "Output 2" }} />
      <StackOutput2.Screen name='Switch Output' component={SwitchOutputScreen} />
      <StackOutput2.Screen name='Current Output' component={CurrentOutputScreen} />
      <StackOutput2.Screen name='Current Output Settings' component={CurrentOutputSettingsScreen} />
      <StackOutput2.Screen name='Switch Output Settings' component={SwitchOutputSettingsScreen} />
      <StackOutput2.Screen name='Digital Input' component={DigitalInputScreen} />
      <StackOutput2.Screen name='Digital Input Settings' component={DigitalInputSettingsScreen} />
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


