import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';

let Output1Params = Paramsfiltered.find(Output1Params => Output1Params.Tag === "Output1");
let MenuParams = Output1Params.menu;
const StackOutput1 = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Output1');
var filteredAT = filtered.filter(row => row.Tag == 'Switch Output');


const Output1Screen = ({ route, navigation }) => {

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
  // console.log(JSON.stringify(Output1Params));
  // console.log(JSON.stringify(MenuParams));

  const Output1MainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )
  const CurrentOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output1');
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
  const SwitchOutputScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Output1');
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
    <StackOutput1.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackOutput1.Screen name='Output1 Main' component={Output1MainScreen} options={{ headerTitle: "Output 1" }} />
      <StackOutput1.Screen name='Switch Output' component={SwitchOutputScreen} />
      <StackOutput1.Screen name='Current Output' component={CurrentOutputScreen} />
      <StackOutput1.Screen name='Current Output Settings' component={CurrentOutputSettingsScreen} />
      <StackOutput1.Screen name='Switch Output Settings' component={SwitchOutputSettingsScreen} />

    </StackOutput1.Navigator>

  );
}

export default Output1Screen

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


