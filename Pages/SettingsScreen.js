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
import ICTParams from '../Pages/Objects/ICTParams.json';
import Paramsfiltered from '../Pages/Objects/Paramsfiltered.json';
const uniqueTags = [...new Set(ICTParams.map(item => item.Tag))];
const a = Object.assign({}, uniqueTags);


const demoConnection = [
  {title: 'Prop1', id: 'id1'},
  {title: 'Prop2', id: 'id2'},
  {title: 'Prop3', id: 'id3'},
  {title: 'Prop4', id: 'id4'},
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);




SettingsScreen = () => {
  console.log(JSON.stringify(a,null,4))
  const renderItem = ({ item }) => (
    <Item title={item.Tag} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Paramsfiltered}
        renderItem={renderItem}
        keyExtractor={item =>item.Tag}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 1,
    // marginTop: StatusBar.currentHeight || 0,
    paddingTop: 0,
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
    color: 'black',
  },
});

export default SettingsScreen;
