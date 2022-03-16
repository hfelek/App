import React from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text } from "react-native";

const ItemBar = ({ item }) => (
    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>{item}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
            <Icon
                name="chevron-forward-outline"
                size={20}
                color="#000"
            />
        </View>
    </View>
)

const ItemValueBar = ({ item, value }) => (
    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>{item}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>{value}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
            <Icon
                name="chevron-forward-outline"
                size={20}
                color="#000"
            />
        </View>
    </View>
)

const ItemBarShow = ({ item }) => (
    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>{item}</Text>
        </View>
    </View>
)

const ItemValueBarShow = ({ item, value }) => (
    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: 'black' }}>{item}</Text>
            <Text style={{ fontSize: 12, color: 'gray' }}>{value}</Text>
        </View>
    </View>
)

const ConfigurationBar = ({ config, activeConfig }) => (
    <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between' }}>
    <View style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, color: 'black' }}>{config}</Text>
        {config == activeConfig && <Text style={{ fontSize: 12, color: 'black' }}>{"Active"}</Text>}
    </View>
      <View style={{ justifyContent: 'center' }}>
        <Icon
          name="chevron-forward-outline"
          size={20}
          color="#000"
        />
      </View>
    </View>
  
  )

export  { ItemBar, ItemBarShow, ItemValueBar, ItemValueBarShow,ConfigurationBar }