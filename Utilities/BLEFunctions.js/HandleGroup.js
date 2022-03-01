const Buffer = require('buffer/').Buffer;
import BufferArray from '../../Navigation/Functions/BufferArray'
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native'
const HandleWriteCommandGroup = (peripheralId, serviceUUID, characteristicUUID, value, context, maxbytesize = 512) => {

    BleManager.write(peripheralId, serviceUUID, characteristicUUID, BufferArray(value), maxbytesize).then(() => {
            console.log("Data Written")
                // Command is written from BLEAPP to ESP32, Global Object in APP will be changed
            let setParameters = JSON.parse(value)["Set Parameters"]
                // console.log(setParameters)
            const keys = Object.keys(setParameters)
            if (keys.includes("501") || keys.includes("502") || keys.includes("503") || keys.includes("504")) {
                const numKey = parseInt(keys[0])
                const indexCustomTemp = ((numKey - 501) * 50) + 83
                let obj = {}
                var numArrBuff = []
                for (var i = 0; i < 200; i++) {
                    numArrBuff[i] = parseInt(setParameters[keys[0]].substring(i * 2, (i * 2) + 2), 16)
                }
                const buf = Buffer.from(numArrBuff);

                for (let index = 0; index < 50; index++) {

                    if (index == 0 || index == 1) {
                        obj[index + indexCustomTemp] = buf.readInt32BE(0 + 4 * index);
                    } else {
                        obj[index + indexCustomTemp] = Number((buf.readFloatBE(0 + 4 * index)).toFixed(3));
                        // console.log(obj[index+133])

                    }
                }
                context.setValueTotal(obj)


            } else {
                context.setValueTotal(setParameters)
            }
            // console.log(setParameters)

            // AlertLocal()
            Alert.alert("Configuration Successfull!")
        })
        .catch((error) => {
            // Failure code
            Alert.alert("Couldn't Handle Configuration. Please, Check Your Connection!")

            console.log("error")
            console.log(error);
        }); ///////////Here Writes to the BLE Peripheral

    // console.log("In Button Function")
    ///If anything else is to be done, it will be done here!
}
export default HandleWriteCommandGroup