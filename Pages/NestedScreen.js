import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const NestedScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>{route.params.msg}</Text>
            <Button
                title="Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default NestedScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})