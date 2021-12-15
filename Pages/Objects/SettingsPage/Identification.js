import React from 'react'
import { StyleSheet, Text, View, Button,SafeAreaView, FlatList, StatusBar } from 'react-native'
import Paramsfiltered from '../../Objects/Paramsfiltered.json';

let IdentificationParams = Paramsfiltered.find(IdentificationParams => IdentificationParams.Tag === "Identification");
let MenuParams = IdentificationParams.menu;

const IdentificationScreen = ({ route, navigation }) => {
    console.log(JSON.stringify(IdentificationParams));
    console.log(JSON.stringify(MenuParams))
    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    
    const renderItem = ({ item }) => (
        <Item title={item.Tag} />
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
        paddingTop: 0,
      },
      item: {
        backgroundColor: '#ffffff',
        padding: 8,
        marginVertical: 0,
        marginHorizontal: 0,
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    
      },
      title: {
        fontSize: 15,
        color: 'black',
      },
  });
  