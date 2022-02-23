const Buffer = require('buffer/').Buffer;
import BufferArray from '../../Navigation/Functions/BufferArray'
import BleManager from 'react-native-ble-manager';
import { Alert } from 'react-native'

function HandleWriteCommandGroupContext(value, context) {

    const setParameters = JSON.parse(value);
    console.log("Set Parameters");
    console.log(setParameters);
    context.setValueTotal(setParameters);
    console.log("I am in Handle Write Command Group Context")
    console.log(context["283"]);

    ///If anything else is to be done, it will be done here!
}
export default HandleWriteCommandGroupContext