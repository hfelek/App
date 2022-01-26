import React from 'react';

import {View, Image} from 'react-native';

const ActionBarImage = () => {
  return (

    <Image
        source={require("../Media/eliar.png")}
        style={{
          width: 36,
          height: 36,
          borderRadius: 40 ,
          marginRight:15
        }}
    />
  )
}



export default ActionBarImage;