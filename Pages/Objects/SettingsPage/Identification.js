import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import BleManager from 'react-native-ble-manager';
import BufferArray from '../../../Navigation/Functions/BufferArray';
let IdentificationParams = Paramsfiltered.find(IdentificationParams => IdentificationParams.Tag === "Identification");
let MenuParams = IdentificationParams.menu;
let peripheralID='0'

const StackIdentification = createStackNavigator();

var filtered;
var filteredAT;
const HandleWriteCommand = (peripheralId,serviceUUID,characteristicUUID,value,maxbytesize=512)=>{
  BleManager.write(peripheralId,serviceUUID,characteristicUUID,value,maxbytesize)///////////Here Writes to the BLE Peripheral
  console.log("In Button Function")
  ///If anything else is to be done, it will be done here!
}

const IdentificationScreen = ({ route, navigation }) => {
  BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    // Success code

    console.log(JSON.stringify(peripheralsArray[0].id));
    peripheralID=peripheralsArray[0].id
  }).catch(() => {
    console.log("Couldnt Find A peripheral");
    // expected output: "Success!"
  });
  function Item(title, value) {
    switch (title) {
      case 'Application Tag':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Application Tag')}>
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




  // console.log(JSON.stringify(IdentificationParams));
  // console.log(JSON.stringify(MenuParams));

  const IdentificationMainScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const ApplicationTagScreen = () => {

    filtered = Values.filter(row => row.Tag == 'Identification');
    filteredAT = filtered[0].menu.filter(row => row.Tag == 'Application Tag');
    const [text, setText] = React.useState(filteredAT[0].Value);
   
    return (
      <View>
        <TextInput
          label="Set Your Application Tag"
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
          {(filteredAT[0].Value !=  text) &&
          <Button
          onPress={() =>{ HandleWriteCommand(peripheralID,"a65373b2-6942-11ec-90d6-024200120000","a65373b2-6942-11ec-90d6-024200120100",BufferArray(`{'Tag':'Communication', 'Set Parameters': {'18':'${text}'}}`))}} 
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />}
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        
      </View>
    );
  };
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );

  return (
    <StackIdentification.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackIdentification.Screen name='Identification Main' component={IdentificationMainScreen} options={{headerTitle:"Identification"}} />
      <StackIdentification.Screen name='Application Tag' component={ApplicationTagScreen} />
    </StackIdentification.Navigator>

  );
}

export default IdentificationScreen

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

