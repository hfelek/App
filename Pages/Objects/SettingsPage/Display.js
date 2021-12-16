import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import store from '../store';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';

let DisplayParams = Paramsfiltered.find(DisplayParams => DisplayParams.Tag === "Display");
let MenuParams = DisplayParams.menu;
const StackDisplay = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Display');
var filteredAT = filtered.filter(row => row.Tag == 'Backlight');


const DisplayScreen = ({ route, navigation }) => {

  function Item(title, value) {
    switch (title) {
      case 'Backlight':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Backlight')}>
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




  console.log(JSON.stringify(DisplayParams));
  console.log(JSON.stringify(MenuParams))

  const DisplayMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <Text></Text>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const BacklightScreen = () => {
    console.log(Values);
    console.log("Values")
    filtered = Values.filter(row => row.Tag == 'Display');
    console.log(filtered);
    console.log("filtered")
    console.log(filtered[0].menu)
    filteredAT = filtered[0].menu.filter(row => row.Tag == 'Backlight');
    console.log(filteredAT[0].Value);
    const [text, setText] = React.useState(filteredAT[0].Value);
   
    return (
      <View>
        <TextInput
          label="Set Your Backlight"
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
    <StackDisplay.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackDisplay.Screen name='Display Main' component={DisplayMainScreen} options={{headerTitle:"Display"}} />
      <StackDisplay.Screen name='Backlight' component={BacklightScreen} />
    </StackDisplay.Navigator>

  );
}

export default DisplayScreen

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


