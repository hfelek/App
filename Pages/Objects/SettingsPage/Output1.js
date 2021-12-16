import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import store from '../store';
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
      default:
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>

        )
    };
  }


  console.log(JSON.stringify(Output1Params));
  console.log(JSON.stringify(MenuParams))

  const Output1MainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <Text></Text>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const SwitchOutputScreen = () => {
    console.log(Values);
    console.log("Values")
    filtered = Values.filter(row => row.Tag == 'Output1');
    console.log(filtered);
    console.log("filtered")
    console.log(filtered[0].menu)
    filteredAT = filtered[0].menu.filter(row => row.Tag == 'Switch Output');
    console.log(filteredAT[0].Value);
    const [text, setText] = React.useState(filteredAT[0].Value);
   
    return (
      <View>
        <TextInput
          label="Set Your Switch Output"
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
        <LenghtChecker lenght={32} />

                <Button
          onPress={() => {console.log(typeof(store) + typeof(text))}}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        
      </View>
    );
  };
  console.log("Buraya")
  console.log(store[0].Tag)
  console.log("Buraya")
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );

  return (
    <StackOutput1.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackOutput1.Screen name='Output1 Main' component={Output1MainScreen} options={{headerTitle:"Output 1"}} />
      <StackOutput1.Screen name='Switch Output' component={SwitchOutputScreen} />
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


