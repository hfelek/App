import React, { useState ,useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

let DiagnosticsParams = Paramsfiltered.find(DiagnosticsParams => DiagnosticsParams.Tag === "Diagnostics");
let MenuParams = DiagnosticsParams.menu;
const StackDiagnostics = createStackNavigator();
const TextComponents = ["Simulation Process Variable Value Conducticity", "Simulation Process Variable Value Concentration", "Simulation Process Variable Value Temperature"]
const SwitchComponents = ["Simulation Process Variable"]
const ReadableComponents = ["Last Diagnostics", "Actual Diagnostics"]
var filtered;
var filteredAT;

function Item(title, value, navigation) {
  if (TextComponents.includes(title)) {
    return (
      <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Simulation Process Variable', { Tag: title, Value: value })}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </TouchableOpacity>)


  }
  else if (SwitchComponents.includes(title)) {
  var switchValues = (Values.filter(row => row.Tag == 'Diagnostics'))[0].menu.filter(row => row.Tag == title)[0]["Assignable Values"];
  return (
    <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Switchable Components', { Tag: title, Value: value, SwitchableValues: switchValues})}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </TouchableOpacity>)
  }

  else if (ReadableComponents.includes(title)) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

    )
  }
  else {
    return
  }

}

const DiagnosticsScreen = ({ route, navigation }) => {


  const DiagnosticsMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )
  const CheckButtoned=(selectedValue, sentValue )=> {
    if(selectedValue===sentValue){
      return(

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
    else{
      return(
        <View style={{ flexDirection: "row" }}>
          <Text>{sentValue}</Text>
        </View>
      )
    }
  }

  //---------------------------------------------------------------
  
  
  
  const SwitchVariableScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const { Value } = route.params;
    const {SwitchableValues} =route.params;
    useEffect(() => {
      navigation.setOptions({title:Tag})
    });

    const [text, setText] = React.useState(Value);
    const renderItemSelectable = ({ item })=>{
      return(
      <TouchableOpacity style={styles.itemButton} onPress={() => {setText(item.Tag)}} >
      {CheckButtoned(text,item.Tag)} 
      {/* <Text>{text + "Enabled"}</Text> */}
      </TouchableOpacity>)
    }
    useEffect(() => {
 
    if(text!=Value){
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
    else{
      navigation.setOptions({
        headerRight: () => (
          <></>
        ),
      });
    }
  });
    return (
      <View>

        <FlatList
        data={SwitchableValues}
        renderItem={renderItemSelectable}
        keyExtractor={item => item.Tag}
      />

      </View>
    );
  };

// ------------------------------------------
  const SimulationProcessVariableScreen = ({ route, navigation }) => {
    

    const { Tag } = route.params;
    const { Value } = route.params;
    useEffect(() => {
      navigation.setOptions({title:Tag})
    });
    filtered = Values.filter(row => row.Tag == 'Diagnostics');
    filteredAT = filtered[0].menu.filter(row => row.Tag == Tag);
    const [text, setText] = React.useState(Value);
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
         {/* <Text>Text Here. Lenght --{'>'} {32} </Text>  */}
         {/* <Text>Enter a unique name for the measuring point to identify the device within the plant. Lenght --{'>'} {lenght} </Text>  */}

        <Button
          onPress={() => { console.log(typeof (text)) }}
          title="Save"
          color="#841584"
          accessibilityLabel="Save Configuration"
        />
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}

      </View>
    );
  };
  const renderItem = ({ item }) => (
    Item(item.Tag, item.Value, navigation)
  );
    
  return (
    <StackDiagnostics.Navigator initialRouteName='Diagnostics Main' screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackDiagnostics.Screen name='Diagnostics Main' component={DiagnosticsMainScreen} options={{ headerTitle: 'Diagnostics' }} />
      <StackDiagnostics.Screen name='Simulation Process Variable' component={SimulationProcessVariableScreen} />
      <StackDiagnostics.Screen name='Switchable Components' component={SwitchVariableScreen} />
    </StackDiagnostics.Navigator>

  );
}

export default DiagnosticsScreen

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
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight:3,
    borderRadius: 10,

    
    
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
