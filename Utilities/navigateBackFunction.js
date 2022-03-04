import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react';
const navigateBackFunction = (showWarning) => {
    const navigation = useNavigation();
    console.log(showWarning)
    if (showWarning) {
      return(
      <TouchableOpacity onPress={() => Alert.alert("Configuration is not saved!", "Do you want to leave the page?", [
        {
          text: 'No',
          onPress: () => console.log("cancelled"),
        },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ])}>
        <Icon
          name="arrow-back-outline"
          size={25}
  
          style={{ paddingLeft: 10 }}
          color="black"
        />
      </TouchableOpacity>)
  
  
  
    }
    else {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-outline"
            size={25}
  
            style={{ paddingLeft: 10 }}
            color="black"
          />
        </TouchableOpacity>
      )
    }
  
  }
  export default navigateBackFunction;