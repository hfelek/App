import { createStackNavigator } from '@react-navigation/stack';
function onPressSettings({ title }) {
    if(title == "Identification"){
    return (
      <View style={style.container}>
        <Text>Home Screen</Text>
      </View>
    );
  }
  else{
      return(
        <View>
        <Text>Home Screen</Text>
      </View>
      )
  }
};