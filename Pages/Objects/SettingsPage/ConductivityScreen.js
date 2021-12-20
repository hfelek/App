import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';

let ConductivityParams = Paramsfiltered.find(ConductivityParams => ConductivityParams.Tag === "Conductivity");
let MenuParams = ConductivityParams.menu;
const StackConductivity = createStackNavigator();

var filtered = Values.filter(row => row.Tag == 'Conductivity');
var filteredAT = filtered.filter(row => row.Tag == 'Range');



const ConductivityScreen = ({ route, navigation }) => {

  function Item(title, value) {
    switch (title) {
      case 'Range':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Range')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Compensation':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Temperature Compensation')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Temperature Coefficient':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Temperature Coefficient')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Reference Temperature':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Reference Temperature')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Mounting Factor':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Mounting Factor')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Zero Point':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Zero Point')}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        )
      case 'Filter Count Constant':
        return (
          <TouchableOpacity style={styles.itemButton} onPress={() => navigation.navigate('Filter Count Constant')}>
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

  const ConductivityMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const RangeScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Range');
    const possibleValues = val[0].PossibleValues;
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
  const MountingFactorScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Mounting Factor');
    const possibleValues = val[0].PossibleValues;
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
  const TemperatureCoefficientScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Coefficient');
    const possibleValues = val[0].PossibleValues;
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
  const TemperatureCompensationScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Compensation');
    const possibleValues = val[0].PossibleValues;
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
  const ReferenceTemperatureScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Reference Temperature');
    const possibleValues = val[0].PossibleValues;
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

  const FilterCountConstantScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Filter Count Constant');
    const possibleValues = val[0].PossibleValues;
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
  const ZeroPointScreeen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Zero Point');
    const possibleValues = val[0].PossibleValues;
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
    <StackConductivity.Navigator screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackConductivity.Screen name='Conductivity Main' component={ConductivityMainScreen} options={{ headerTitle: "Conductivity" }} />
      <StackConductivity.Screen name='Range' component={RangeScreen} />
      <StackConductivity.Screen name='Temperature Compensation' component={TemperatureCompensationScreen} />
      <StackConductivity.Screen name='Temperature Coefficient' component={TemperatureCoefficientScreen} />
      <StackConductivity.Screen name='Reference Temperature' component={ReferenceTemperatureScreen} />
      <StackConductivity.Screen name='Mounting Factor' component={MountingFactorScreen} />
      <StackConductivity.Screen name='Zero Point' component={ZeroPointScreeen} />
      <StackConductivity.Screen name='Filter Count Constant' component={FilterCountConstantScreen} />


    </StackConductivity.Navigator>

  );
}

export default ConductivityScreen

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
