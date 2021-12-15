import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const ConcentrationScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>ConcentrationScreen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default ConcentrationScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})