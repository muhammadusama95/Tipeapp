import React, { useState, useEffect } from 'react'

import * as Font from 'expo-font'
import { View, ActivityIndicator, Image, Dimensions } from 'react-native'
import Logo from '../../assets/logo_header.png'

const { width, height } = Dimensions.get('screen')

export default function Splash ({ navigation }) {
  const [loaded, setloaded] = useState(false)

  useEffect(() => {
     if (loaded) navigation.replace('Welcome')
    // Font.loadAsync({
    //   'Urbanist Bold': require('../../assets/fonts/Urbanist-Bold.ttf'),
    //   'Urbanist Regular': require('../../assets/fonts/Urbanist-Regular.ttf')
    // }).then(() =>
      setTimeout(() => {
        setloaded(true)
      }, 1000)
    // )
  })
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Image
        source={Logo}
        style={{
          width: width * 0.9,
          height: height * 0.1,
          resizeMode: 'contain'
        }}
      />
      <ActivityIndicator
        size='large'
        color='black'
        style={{
          marginTop: height * 0.1
        }}
      />
    </View>
  )
}
