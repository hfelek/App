import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Output2Screen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>Output2 Screen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default Output2Screen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})