import React from 'react'
import { StyleSheet, Text, View, Button,SafeAreaView, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';

let IdentificationParams = Paramsfiltered.find(IdentificationParams => IdentificationParams.Tag === "Identification");
let MenuParams = IdentificationParams.menu;


function Item(title,value){
    switch(title){
    case 'Application Tag':  
    return (
    <TouchableOpacity style={styles.itemButton}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
    </TouchableOpacity>
    )
    default:
        return(
            <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>

        )
};
}


const IdentificationScreen = ({ route, navigation }) => {
    console.log(JSON.stringify(IdentificationParams));
    console.log(JSON.stringify(MenuParams))
    
    
    
    

    
    const renderItem = ({ item }) => (
        Item(item.Tag,item.Value)
      );
    
      return (
        <SafeAreaView style={styles.container}>
            <Text></Text>
          <FlatList
            data={MenuParams}
            renderItem={renderItem}
            keyExtractor={item => item.Tag}
          />
        </SafeAreaView>
      );
}

export default IdentificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // 
        padding: 0,
        // marginTop: StatusBar.currentHeight || 0,
        paddingTop:0,
      },
      item: {
        backgroundColor: '#ffffff',
        padding: 8,
        flexDirection: 'column',
        paddingTop:0,
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
      }
  });
  