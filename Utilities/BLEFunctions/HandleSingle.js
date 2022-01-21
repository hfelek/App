const Buffer = require('buffer/').Buffer;
import BufferArray from '../../Navigation/Functions/BufferArray'
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native'
const HandleWriteCommand = (peripheralId, serviceUUID, characteristicUUID, value, context, maxbytesize = 512) => {

    BleManager.write(peripheralId, serviceUUID, characteristicUUID, BufferArray(value), maxbytesize).then(() => {
            console.log("data written")
                // Command is written from BLEAPP to ESP32, Global Object in APP will be changed
            let setParameters = JSON.parse(value)["Set Parameters"]
            console.log(setParameters)

            for (const item in setParameters) {
                console.log("item")
                console.log(item)
                console.log(JSON.stringify(setParameters[item]))
                context.setValueByKey(item, setParameters[item])
            }
            // AlertLocal()
            Alert.alert("Configuration Successfull!")
        })
        .catch((error) => {
            // Failure code
            Alert.alert("Couldn't Handle Configuration. Please, Check Your Connection!")

            console.log("error")
            console.log(error);
        }); ///////////Here Writes to the BLE Peripheral

    console.log("In Button Function")
        ///If anything else is to be done, it will be done here!
}
export default HandleWriteCommand