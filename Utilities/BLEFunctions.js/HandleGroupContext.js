const Buffer = require('buffer/').Buffer;
import BufferArray from '../../Navigation/Functions/BufferArray'
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native'
const HandleWriteCommandGroupContext = (value, context) => {

    let setParameters = JSON.parse(value)
    context.setValueTotal(setParameters)


    ///If anything else is to be done, it will be done here!
}
export default HandleWriteCommandGroupContext