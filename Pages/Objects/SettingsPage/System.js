import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Paramsfiltered from '../../Objects/Paramsfiltered.json';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-paper';
import Values from '../Paramsfiltered.json';
import LenghtChecker from '../../../Navigation/Functions/Utililty';
import react, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

let SystemParams = Paramsfiltered.find(
  SystemParams => SystemParams.Tag === 'System',
);
let MenuParams = SystemParams.menu;
const StackSystem = createStackNavigator();

var filtered;
var filteredAT;


const SystemScreen = ({ route, navigation }) => {
  const createTwoButtonAlert = (title, msg,object) =>
    Alert.alert(title, msg, [
      {
        text: 'Cancel',
        onPress: () => console.log(object+ "cancelled"),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => console.log( object+ " confirmed.") },
    ]);
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


  function Item(title, value) {
    switch (title) {
      case 'Access Code':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() =>
              navigation.navigate('Write Screen', { Tag: title, Value: value })
            }>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Set Access Code':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() =>
              navigation.navigate('Write Screen', { Tag: title, Value: value })
            }>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
        case 'Language':
          return (
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() =>
                navigation.navigate('Language', { Tag: title, Value: value })
              }>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.value}>{value}</Text>
            </TouchableOpacity>
          );
          break;
      case 'Auto-Calibrate':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() =>
              navigation.navigate('Write Screen', { Tag: title, Value: value })
            }>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
      case 'Device Reset':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() =>
              navigation.navigate('Device Reset', { Tag: title, Value: value })
            }>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Cancel':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to cancel ongoing action?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Device Auto Calibration':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to start Auto Calibration?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Device Restore Factory':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to restore Factory Settings?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Parameters Restore':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to restore parameters?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Wifi Parameters Restore':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to restore WiFi parameters?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      case 'Restart':
        return (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => createTwoButtonAlert(
              'Alert',
              'Are you sure to restart the device?',
              title
            )}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </TouchableOpacity>
        );
        break;
      default:
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        );
        break;
    }
  }

  // console.log(JSON.stringify(SystemParams));
  // console.log(JSON.stringify(MenuParams))

  const SystemMainScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MenuParams}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );

  const WriteScreen = ({ route, navigation }) => {
    const { Tag } = route.params;
    const { Value } = route.params;
    const [text, setText] = React.useState('');
    useEffect(() => {

    navigation.setOptions({ title: Tag });
    });
    return (
      <View>
        <TextInput
          label={'Set Your ' + Tag}
          value={text}
          selectionColor="#000"
          underlineColor="#000"
          activeOutlineColor="#000"
          outlineColor="#000"
          // activeUnderlineColor='#000'
          error={false}
          right={
            <TextInput.Icon
              name="close-circle-outline"
              onPress={text => setText('')}
            />
          }
          onChangeText={text => setText(text)}
        />
        {/* <LenghtChecker lenght={32} /> */}

        <Button
          onPress={() => {
            // console.log(typeof text);
          }}
          title="Save"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {/* TODOACTION :: Burada (LenghtChecker )Lenghting çekildği yeri storedan referanslayarak çek*/}
      </View>
    );
  };
  const LanguageScreen = ({ route, navigation }) => {
    const { Tag } = route.params
    const valSystemUnits = Values.filter(row => row.Tag == 'System')[0].menu;
    const subTitle = valSystemUnits.filter(row => row.Tag == 'Language');
    const possibleValues = subTitle[0].PossibleValues;
    const [selection, setSelection] = React.useState(subTitle[0].Value);
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
    useEffect(() => {
    
    if (selection != subTitle[0].Value) {
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
    }});

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
  const DeviceResetScreen = () => {
    const valSystemUnits = Values.filter(row => row.Tag == 'System');
    const val = valSystemUnits[0].menu.filter(row => row.Tag == 'Device Reset');
    const possibleValues = val[0].PossibleValues;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={possibleValues}
          renderItem={renderItem}
          keyExtractor={item => item.Tag}
        />
      </SafeAreaView>
    );
  };
  const renderItem = ({ item }) => Item(item.Tag, item.Value);

  return (
    <StackSystem.Navigator
      screenOptions={{ headerShown: true, headerTitleAlign: 'center' }}>
      <StackSystem.Screen
        name="System Main"
        component={SystemMainScreen}
        options={{ headerTitle: 'System' }}
      />
      <StackSystem.Screen name="Write Screen" component={WriteScreen} />
      <StackSystem.Screen name="Device Reset" component={DeviceResetScreen} />
      <StackSystem.Screen name="Language" component={LanguageScreen} />
    </StackSystem.Navigator>
  );
};

export default SystemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', //
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
    justifyContent: 'center',
  },
  buttonBar: {
    alignItems: "center",
    backgroundColor: "#9A348E",
    padding: 8,
    marginRight: 3,
    borderRadius: 10,
  },
  myText: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
  },
});
