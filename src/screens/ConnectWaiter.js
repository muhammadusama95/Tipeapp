import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, Text, Alert } from 'react-native'
import { WebView } from 'react-native-webview'
import {
  AuthContext,
  StripeWaiterConnectConfirmContext,
  StripeReturnContext
} from '../../AuthContext'
import { db } from '../../firebase'
import { getUserById, userReturnedFalse } from '../APIs'
import { API_URL } from '../constants/Urls'

export default function ConnectWaiter({ navigation, route }) {
  var [waiterUser, setwaiterUser] = useState(null)
  const user = route && route.params && route.params.user
  useEffect(async () => {
    console.log('In ConnectWaiter.js')
    const userData = await getUserById(user.uid)
    if (userData) {
      setwaiterUser(userData)
    }
  }, [])

  var isVerified = waiterUser?.is_verified
  var returned = waiterUser?.returned
  useEffect(() => {
    if (returned) {
      axios.get(`${API_URL}/verify/${user.uid}`).then((response) => {
        var { verified, remaining } = response.data
        if (verified) {
          navigation.navigate('Waiter')
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
  }, [returned])
  useEffect(() => {
    if (isVerified) {
      navigation.navigate('Waiter')
    }
  }, [isVerified])

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
