const Buffer = require('buffer/').Buffer;
const BufferArray = (inputStr) => {
    var myBuffer = []
    var str = inputStr;
    var buffer = new Buffer(str);
    for (var i = 0; i < buffer.length; i++) {
        myBuffer.push(buffer[i]);
    }
    return (myBuffer)
}
export default BufferArray