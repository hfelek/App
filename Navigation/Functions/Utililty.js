import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const LenghtChecker = ({lenght}) => (
     
    <Text>Enter a unique name for the measuring point to identify the device within the plant. Lenght --{'>'} {lenght} </Text> 
)

export default LenghtChecker;