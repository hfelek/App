import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const ConductivityScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>ConductivityScreen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default ConductivityScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})