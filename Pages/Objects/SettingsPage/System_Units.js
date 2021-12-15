import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const SystemUnitsScreen = ({ route, navigation }) => {
    return (
        <View>
            <Text style={styles.myText}>System Units Screen</Text>
            <Button
                title="Dont Press me"
                onPress={() => navigation.navigate("SettingsMain")} />
        </View>
    )
}

export default SystemUnitsScreen

const styles = StyleSheet.create({
    myText: {
        color: 'black',
        fontSize: 25,
        textAlign: 'center'
    }
})