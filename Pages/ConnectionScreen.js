import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Settings } from 'react-native';
const demoConnection = [{title:"Prop1",id:"id1"},{title:"Prop2",id:"id2"},{title:"Prop3",id:"id3"},{title:"Prop4",id:"id4"},{title:"Prop5",id:"id5"},{title:"Prop6",id:"id6"},{title:"Prop7",id:"id7"},{title:"Prop8",id:"id8"},{title:"Prop9",id:"id9"}]

ConnectionScreen = () =>{

  const Item = ({title}) => (
    <View style={styles.itemTab}>
      <Text style= {styles.titleTab}>{title}</Text> 
    </View>
  );




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
    marginTop: StatusBar.currentHeight || 0,
    marginTop:  0,
  },
  item: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  itemTab: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },

  title: {
    fontSize: 24,
  },
});

export default ConnectionScreen;