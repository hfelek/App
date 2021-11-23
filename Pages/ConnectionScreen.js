import * as React from 'react';
import { useState,useEffect  } from 'react';
import { SafeAreaView,TouchableOpacity, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import axios from 'axios';

const LocalFixed = (a,num) => {
  try{
    return a.toFixed(num)
  }
  catch(error){
    return a
  }

}

ConnectionScreen = () =>{
  const [dummy,setDummy]= useState(0)
  const IP = 'http://192.168.18.151/?getSensorValues'
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style= {styles.title}>{title[0]}</Text> 
      <Text style= {styles.title}>{LocalFixed(title[1],3)}</Text> 
    </View>
  );
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => makeRequest(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  async function makeRequest() {
    try {
      const response = await axios.get(IP);
      //alert("You Got Response");
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
      {/* <TouchableOpacity
        style={styles.button}
        onPress={makeRequest}
      >
        <Text>Press Here</Text>
      </TouchableOpacity> */}
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
    flexDirection:"row",
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent:"space-between",
    marginVertical: 1,
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

