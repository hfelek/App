import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const MeasuredValuesScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>Measured Values Screen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default MeasuredValuesScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})