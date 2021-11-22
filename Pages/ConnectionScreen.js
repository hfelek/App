import * as React from 'react';
import { useState } from 'react';
import { SafeAreaView,TouchableOpacity, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import axios from 'axios';


ConnectionScreen = () =>{
  const [dummy,setDummy]= useState("no values yet")
  
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style= {styles.title}>{title[0]+ "            "  +(title[1]).toFixed(3)} </Text> 
    </View>
  );


  

  async function makeRequest() {
    try {
      const response = await axios.get('http://192.168.18.151/?getSensorValues');
      alert("You Got Response");
      setDummy( response.data)

    } catch (error) {
      console.error(error);
    }
  }



  const renderItem = ({item}) => (
    <Item title = {item}/>
  );
    return (
      <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={makeRequest}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
        <FlatList
          data={Object.entries(dummy)}
          renderItem={renderItem}
        />
      </SafeAreaView>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: StatusBar.currentHeight || 0,
    marginTop:  0,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

  export default ConnectionScreen;

