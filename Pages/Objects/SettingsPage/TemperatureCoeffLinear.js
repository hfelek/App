import React, { useEffect, useState,useContext } from 'react'
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
import { ContextConfigurationValues } from '../../../App';
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';

import BufferArray from '../../../Navigation/Functions/BufferArray';
import BleManager from 'react-native-ble-manager';
import HandleWriteCommandGroup from '../../../Utilities/BLEFunctions.js/HandleGroup'
import HandleWriteCommand from '../../../Utilities/BLEFunctions.js/HandleSingle'
let peripheralID = '0'
const MainMenu = Values.find(item => item.Tag === "Temperature Coefficients").SubMenu;
const linearCoeffParams = MainMenu.find(item => item.Tag === "Temperature Coefficient Linear");
const MenuParams = linearCoeffParams.menu;
// let subMenuParams = MenuParams.filter(row => row.Tag == 'Configuration 1')[0].menu;
const StackConductivity = createStackNavigator();
function isItNumber(str) {
  return /^\-?[0-9]+(e[0-9]+)?(\.[0-9]+)?$/.test(str);
}
const ItemBar = ({item})=>(
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

  <View style={{height:40 ,justifyContent:'center'}}> 
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
const ItemValueBar = ({item,value})=>(
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

  <View style={{justifyContent:'center'}}> 
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
  switch (title) {
    case 'Configuration 1':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Linear Temperature Coefficient', { Tag: title,  name: title, ConfigNum: parent })}>
        <ItemValueBar item={title} value={value}/>
        </TouchableOpacity>
      )
    case 'Configuration 2':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
        <ItemValueBar item={title} value={value}/>

        </TouchableOpacity>
      )
    case 'Configuration 3':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
        <ItemValueBar item={title} value={value}/>
        </TouchableOpacity>
      )
    case 'Configuration 4':
      return (
        <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Linear Temperature Coefficient', { Tag: title, name: title, ConfigNum: parent })}>
        <ItemValueBar item={title} value={value}/>
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

      <View style={{
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0, justifyContent: "space-between", flexDirection: "row"
      }}>
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



function ConfigurationNumScreen({ route, navigation }) {
  // const { Tag } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={({ item, index, separators }) => (renderItem(item, navigation, "hello", item.Tag))}
        keyExtractor={item => item.Tag}
        initialNumToRender={MenuParams.length}
      />
    </SafeAreaView>
  )
}




const TemperatureCoefficientScreen = ({ route, navigation }) => {
    const context = useContext(ContextConfigurationValues)
    const  {ConfigNum} =   route.params;
    const index = MenuParams.find(key=>key.Tag == ConfigNum).Index

    const [text, setText] = React.useState(context[index].toFixed(3));
    return (
        <View>
          <TextInput
            label={"Set Your Linear Coefficient for " + ConfigNum + " in %/°C"}
            value={text}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
         // activeUnderlineColor='#000'
            error={false}
            right={<TextInput.Icon name="close-circle-outline" onPress={text => setText("")} />}
            onChangeText={text => setText(text)}
            maxLength={8}
          />
          {/* <LenghtChecker lenght={32} /> */}
          {text != context[index] && isItNumber(text) && text<100 &&

            <Button
              onPress={() => { HandleWriteCommand(peripheralID, "a65373b2-6942-11ec-90d6-024200120000", "a65373b2-6942-11ec-90d6-024200120100", `{"Tag":"Communication", "Set Parameters":{"${index}":${text}}}`, context) }}
              title="Save"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          }
          {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
          {/* <MaskedInput {...props} /> */}
    
        </View>
      );
  };

const TemperatureCoeffLinearScreen = ({ route, navigation }) => {
  const  {ConfigNum} =  route.params;
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    peripheralID = peripheralsArray[0].id
  }).catch(() => {
    // expected output: "Success!"
  });


  return (
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      {/* <StackConductivity.Screen name='Configuration Linear Coeff' component={ConfigurationNumScreen} options={{ headerTitle: "Linear Temperature Coefficient" }} /> */}
      <StackConductivity.Screen name='Linear Temperature Coefficient' component={TemperatureCoefficientScreen} initialParams={{ ConfigNum: ConfigNum }}/>
      {/* <StackConductivity.Screen name=' Non-Linear Temperature Coefficient' component={TemperatureCoefficientScreen} /> */}


    </StackConductivity.Navigator>

  );
}













export default TemperatureCoeffLinearScreen

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
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
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
  containerSlider: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
});

