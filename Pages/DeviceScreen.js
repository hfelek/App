import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
const demoConnection = [{title:"ble1",id:"id1"},{title:"ble2",id:"id2"},{title:"ble3",id:"id3"},{title:"ble4",id:"id4"}]
const Item = ({title}) => (
  <View style={styles.item}>
    <Text style= {styles.title}>{title}</Text> 
  </View>
);
DeviceScreen = () =>{
  const renderItem = ({item}) => (
    <Item title = {item.title}/>
  );
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={demoConnection}
          renderItem={renderItem}
          keyExtractor={item =>item.id}
        />
      </SafeAreaView>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    marginTop:  0,
  },
  item: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
});

export default DeviceScreen;