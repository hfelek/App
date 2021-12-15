import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const DisplayScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>DisplayScreen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default DisplayScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})