import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const SystemScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>Systems Screen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default SystemScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})