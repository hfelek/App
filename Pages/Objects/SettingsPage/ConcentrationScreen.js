import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';

let ConcentrationParams = Paramsfiltered.find(ConcentrationParams => ConcentrationParams.Tag === "Concentration");
let MenuParams = ConcentrationParams.menu;
const StackConcentration = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Concentration');
var filteredAT = filtered.filter(row => row.Tag == 'Measurement Type');


const ConcentrationScreen = ({ route, navigation }) => {

  function Item(title, value) {
    switch (title) {
      case 'Measurement Type':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Measurement Type')}>
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




  // console.log(JSON.stringify(ConcentrationParams));
  // console.log(JSON.stringify(MenuParams));

  const ConcentrationMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const MeasurementTypeScreen = () => {
    filtered = Values.filter(row => row.Tag == 'Concentration');
    filteredAT = filtered[0].menu.filter(row => row.Tag == 'Measurement Type');
    const [text, setText] = React.useState(filteredAT[0].Value);
   
    return (
      <View>
        <TextInput
          label="Set Your Measurement Type"
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
          onPress={() => {console.log(typeof(text))}}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
        
      </View>
    );
  };
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value)
  );

  return (
    <StackConcentration.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConcentration.Screen name='Concentration Main' component={ConcentrationMainScreen} options={{headerTitle:"Concentration"}} />
      <StackConcentration.Screen name='Measurement Type' component={MeasurementTypeScreen} />
    </StackConcentration.Navigator>

  );
}

export default ConcentrationScreen

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


