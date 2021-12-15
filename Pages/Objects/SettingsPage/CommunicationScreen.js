import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const CommunicationScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>CommunicationScreen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default CommunicationScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})