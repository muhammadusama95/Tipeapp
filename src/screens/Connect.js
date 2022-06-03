import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import {
  AuthContext,
  StripeConnectConfirmContext,
  StripeReturnContext
} from '../../AuthContext'
import { db } from '../../firebase'
import { getUserById, userReturnedFalse } from '../APIs'
import { API_URL } from '../constants/Urls'

export default function Connect({ navigation }) {
  var { user } = useContext(AuthContext)
  var isVerified = useContext(StripeConnectConfirmContext)
  var returned = useContext(StripeReturnContext)
  const [isUserVerify, setIsUserVerify] = useState(false)
  const [isUserReturned, setIsUserReturned] = useState(false)
  useEffect(() => {
    console.log('In connect')
    console.log('returned', returned)
    console.log('isVerified', isVerified)
    if (returned) {
      axios.get(`${API_URL}/verify/${user.uid}`).then((response) => {
        var { verified, remaining } = response.data
        if (verified) {
          navigation.goBack()
        } else {
          navigation.goBack()
          Alert.alert(
            'Account not verified',
            `Please complete your onboarding process.\n${remaining.map(
              (curr) => `${curr}\n`
            )}`
          )
        }
      })
    }
    return async () => {
      await userReturnedFalse(user.uid)
    }
  }, [isUserReturned])
  useEffect(() => {
    console.log('isUserVerify', isUserVerify)
    if (isUserVerify) {
      navigation.goBack()
    }
  }, [isUserVerify])

  useEffect(() => {
    ;(async () => {
      const loggedInUser = await getUserById(user?.uid)
      if (loggedInUser.is_verified) {
        setIsUserVerify(true)
      } else {
        setIsUserVerify(false)
      }

      if (loggedInUser.returned) {
        setIsUserReturned(true)
      } else {
        setIsUserReturned(false)
      }
    })()
  }, [user.uid])

  return user.uid ? (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `${API_URL}/?uid=${user.uid}`
        }}
      />
    </View>
  ) : (
    <View />
  )
}
