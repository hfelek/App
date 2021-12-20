import * as React from 'react';
import react from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Settings, Image, Dimensions, TouchableOpacity,TouchableHighlight } from 'react-native';
import Values from './Objects/Paramsfiltered.json';
import { List } from 'react-native-paper';

let IdentificationParams;
let MenuParams;
var filtered;
var filteredAT;
const demoConnection = [{ Tag: "Application Tag", Value: "id1" }, { Tag: "Device Name", Value: "id2" }, { Tag: "Device Serial No", Value: "id3" }, { Tag: "Device Type", Value: "id4" },{ Tag: "Random Tag", Value: "Random Value" }]
const bottomValues = [{ "Tag": "Connection", "Value": "Connected" }, { "Tag": "Conductivity", "Value": "id2", }, { "Tag": "Concentration", "Value": "id3" }]

DeviceScreen = () => {
  const Item = ({ item }) => (
    <View style={styles.itemTab} >
      <Text style={styles.titleTab}>{item.Tag}</Text>
      <Text style={styles.titleTab1}>{item.Value}</Text>
    </View>
  );
  const ItemBottom = ({ item }) => (
    <View style={styles.itemTab} >
      <Text style={styles.titleTab}>{item.Tag}</Text>
        <View style={[styles.titleTabButton]}>
          <Text >Touch Here</Text>
        </View>
    </View>
  );

  const ValuesTab = () => (
    <View style={{ flex: 1.5 }}>
      <FlatList
        data={demoConnection}
        renderItem={({ item }) => (<Item item={item} />)}
      // keyExtractor={item => item.Tag}
      />
    </View>
  );
  const ValuesTabBottom = () => (
    <View style={{ flex: 1.5 }}>
      <FlatList
        data={bottomValues}
        renderItem={({ item }) => (<ItemBottom item={item} />)}
      keyExtractor={item => item.Tag}
      />
    </View>
  );



  let windowWidth = Dimensions.get('window').width;
  let windowHeight = Dimensions.get('window').height;

  IdentificationParams = Values.find(IdentificationParams => IdentificationParams.Tag === "Identification");
  MenuParams = IdentificationParams.menu;


  console.log(MenuParams)
  return (
    <SafeAreaView style={[styles.container, { flexDirection: 'column', backgroundColor: '#ffffff' }]}>


      {/* Top Component of Settings Page */}
      <View style={{ flex: 1.5, flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#000000' }} >
        <Image
          source={require("../Media/sensorimage.png")}
          style={{
            width: windowWidth / 10,
            height: windowHeight / 10,
            // borderRadius: 40,
            flex: 1
          }}
        />
        <ValuesTab />


      </View>

      {/* Bottom Componenent of Settings Page */}
      <SafeAreaView style={{ flex: 2, backgroundColor: "#ffffff" }} >
        <View style={{ alignItems: 'center' }}>
          <Text style={{    padding: 25, fontSize: 25, color: '#000000',fontWeight: 'bold',marginVertical: 0,marginHorizontal: 10,}}> Values</Text>
        </View>
     {/* Values are rendered here. */}
        

          <ValuesTabBottom/>

      </SafeAreaView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    marginTop: 0,
  },
  item: {
    backgroundColor: '#415172',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleTab: {
    backgroundColor: '#ffffff',
    padding: 6,
    fontSize: 13,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 0,
    marginHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  titleTab1: {
    backgroundColor: '#ffffff',
    padding: 6,
    marginVertical: 0,
    marginHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  titleTabButton: {
    backgroundColor: '#ffffff',
    padding: 6,
    marginVertical: 0,
    marginHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  itemTab: {
    backgroundColor: '#ffffff',
    padding: 1,
    marginVertical: 0,
    marginHorizontal: 0,

  },
  title: {
    fontSize: 12,
  },
});

export default DeviceScreen;