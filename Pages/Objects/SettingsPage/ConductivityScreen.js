import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Slider } from "@miblanchard/react-native-slider";
import ScrollViewNativeComponent from 'react-native/Libraries/Components/ScrollView/ScrollViewNativeComponent';
import { or } from 'react-native-reanimated';
// import Slider from '@react-native-community/slider';
//import MultiSlider from 'react-native-multi-slider';

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


  const ConductivityMainScreen = ({ navigation }) => (

    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  )

  const RangeScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Range');
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
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
  const MountingFactorScreen = ({route,navigation}) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Mounting Factor')[0];
    const possibleValues = val.PossibleValues;
    const initalMFValue=val.Value;
    const limitsMF = [possibleValues.RangeLower,possibleValues.RangeUpper]
    const [mountingFactor, setMountingFactor] = React.useState(initalMFValue);
    function callBackSlider () {
      if((initalMFValue!=mountingFactor)){
     
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
    
    }
    
    

    return (

      <View style={styles.containerSlider}>
       
        <Slider
          value={mountingFactor}
          onValueChange={value => setMountingFactor(value[0].toFixed(3))}
          minimumValue={limitsMF[0]}
          maximumValue={limitsMF[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{alignContent:"center"}}>Mounting Factor Value : {mountingFactor}</Text>
        </View>
   


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
  const TemperatureCompensationScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Temperature Compensation');
    const possibleValues = val[0].PossibleValues;
    const [selection, setSelection] = React.useState(val[0].Value);
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
  const ReferenceTemperatureScreen = ({ route, navigation }) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Reference Temperature');
    const possibleValues = val[0].PossibleValues;
    const initialValC=possibleValues.filter(row => row.Tag == '°C')[0].Value
    const initialValF=possibleValues.filter(row => row.Tag == '°F')[0].Value

    const [temperatureC, setTemperatureC] = React.useState(initialValC);
    const [temperatureF, setTemperatureF] = React.useState(initialValF);
    const limitsF = [possibleValues.filter(row => row.Tag == '°F')[0].RangeLower,possibleValues.filter(row => row.Tag == '°F')[0].RangeUpper]
    const limitsC = [possibleValues.filter(row => row.Tag == '°C')[0].RangeLower,possibleValues.filter(row => row.Tag == '°C')[0].RangeUpper]
    function callBackSlider () {
    if((temperatureF!=initialValF) ||(temperatureC!=initialValC)){
      console.log({temperatureF,initialValF,temperatureC,initialValC})
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
  }
    return (

      <View style={styles.containerSlider}>
       
        <Slider
          value={temperatureC}
          onValueChange={value => setTemperatureC(value[0].toFixed(1))}
          minimumValue={limitsC[0]}
          maximumValue={limitsC[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{alignContent:"center"}}>°C Value : {temperatureC}</Text>
        <Slider
          value={temperatureF}
          onValueChange={value => setTemperatureF(value[0].toFixed(1))}
          minimumValue={limitsF[0]}
          maximumValue={limitsF[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{alignContent:"center"}}>°F Value  : {temperatureF}</Text>
      
        </View>
   


    );




  };

  const FilterCountConstantScreen = ({route,navigation}) => {
    const valSystemUnits = Values.filter(row => row.Tag == 'Conductivity');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Filter Count Constant')[0];
    const possibleValues = val.PossibleValues;
    const initalFCCValue=val.Value;
    const limitsFFC = [possibleValues.RangeLower,possibleValues.RangeUpper]
    const [filterCC, setFilterCC] = React.useState(initalFCCValue);
    function callBackSlider () {
      if((initalFCCValue!=filterCC)){
     
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
    
    }
    return (

      <View style={styles.containerSlider}>
       
        <Slider
          value={filterCC}
          onValueChange={value => setFilterCC(value[0].toFixed(0))}
          minimumValue={limitsFFC[0]}
          maximumValue={limitsFFC[1]}
          onSlidingComplete={() => callBackSlider()}
        />
        <Text style={{alignContent:"center"}}>Filter Count Constant: {filterCC}</Text>
        </View>
   


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
  containerSlider: {
    flex:1,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'stretch',
    justifyContent: "flex-start",
  },
});

// const customStyles8 = StyleSheet.create({
//   container: {
//     height: 30,
//   },
//   thumb: {
//     backgroundColor: '#31a4db',
//     borderRadius: 10 / 2,
//     height: 10,
//     shadowColor: '#31a4db',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 2,
//     width: 10,
//   },
//   track: {
//     backgroundColor: '#303030',
//     height: 2,
//   },
// });

// const SliderContainer = (props: {
//   caption: string;
//   children: React.ReactElement;
//   sliderValue?: Array<number>;
//   trackMarks?: Array<number>;
// }) => {
//   const {caption, sliderValue, trackMarks} = props;
//   const [value, setValue] = React.useState(
//       sliderValue ? sliderValue : DEFAULT_VALUE,
//   );
//   let renderTrackMarkComponent: React.ReactNode;

//   if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
//       renderTrackMarkComponent = (index: number) => {
//           const currentMarkValue = trackMarks[index];
//           const currentSliderValue =
//               value || (Array.isArray(value) && value[0]) || 0;
//           const style =
//               currentMarkValue > Math.max(currentSliderValue)
//                   ? trackMarkStyles.activeMark
//                   : trackMarkStyles.inactiveMark;
//           return <View style={style} />;
//       };
//   }

//   const renderChildren = () => {
//       return React.Children.map(
//           props.children,
//           (child: React.ReactElement) => {
//               if (!!child && child.type === Slider) {
//                   return React.cloneElement(child, {
//                       onValueChange: setValue,
//                       renderTrackMarkComponent,
//                       trackMarks,
//                       value,
//                   });
//               }

//               return child;
//           },
//       );
//   };

//   return (
//       <View style={styles.sliderContainer}>
//           <View style={styles.titleContainer}>
//               <Text>{caption}</Text>
//               <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
//           </View>
//           {renderChildren()}
//       </View>
//   );
// };

// const DEFAULT_VALUE = 0.2;
