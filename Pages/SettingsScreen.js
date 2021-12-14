import * as React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Settings,
  VirtualizedList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ICTParams from '../Pages/Objects/ICTParams.json';
import Paramsfiltered from '../Pages/Objects/Paramsfiltered.json';
const uniqueTags = [...new Set(ICTParams.map(item => item.Tag))];
const a = Object.assign({}, uniqueTags);

var filtered = Paramsfiltered.filter(row => row.Tag == 'Identification');

const demoConnection = [
  {title: 'Prop1', id: 'id1'},
  {title: 'Prop2', id: 'id2'},
  {title: 'Prop3', id: 'id3'},
  {title: 'Prop4', id: 'id4'},
];

// function returnVal ({abc}) {
//   var filtered = Paramsfiltered.filter(row=>row.Tag ==abc["Tag"]);
//   return filtered;
// }
// console.log(returnVal("Identification"));
const Item = ({title}) => (
  <View style={styles.item}>
    <Icon
      name={Paramsfiltered.find(row => row['Tag'] == title).Icon}
      size={20}
      color="#000"
    />

    <Text style={styles.title}>{'   ' + title}</Text>
  </View>
);

SettingsScreen = () => {
  Paramsfiltered.T;
  console.log(JSON.stringify(a, null, 4));
  const renderItem = ({item}) => <Item title={item.Tag} />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Paramsfiltered}
        renderItem={renderItem}
        keyExtractor={item => item.Tag}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // 
    // width: '110%',
    // padding: 0,
    // marginTop: StatusBar.currentHeight || 0,
    // paddingTop: 0,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection: 'row',
    borderBottomColor:'black',
    borderBottomWidth:StyleSheet.hairlineWidth
  },
  title: {
    fontSize: 15,
    color: 'black',
  },
});

export default SettingsScreen;
