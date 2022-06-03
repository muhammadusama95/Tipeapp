import React, { useRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import CryptoJS from 'react-native-crypto-js'
import { v4 as uuidv4 } from 'uuid'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { Ionicons } from '@expo/vector-icons'

var { width } = Dimensions.get('screen')
export default function WaiterReceiveTip({ route, navigation }) {
  const user = route && route.params && route.params.user
  const { userId, stripe_account_id } = user || {}
  console.log('1.1. userId', userId)
  console.log('1.2. stripe_account_id', stripe_account_id)

  const svg = useRef()
  const saveQRCode = () => {
    svg.current.toDataURL(callback)
  }

  const callback = (dataURL) => {
    const uniqueId = uuidv4()
    const uri = FileSystem.documentDirectory + `${uniqueId}.png`

    FileSystem.writeAsStringAsync(uri, dataURL, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(uri)
    })
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'rgb(80,80,180)',
          height: 80,
          justifyContent: 'center',
          marginBottom: 20
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
            marginTop: 20
          }}
        >
          <TouchableOpacity
            style={{ marginTop: 5 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name={'arrowleft'} color={'#fff'} size={24} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              marginLeft: 10,
              fontSize: 22,
              fontFamily: 'bold'
            }}
          >
            Empleados
          </Text>
        </View>
      </View>
      {stripe_account_id && userId && (
        <View style={styles.container}>
          <QRCode
            getRef={(c) => (svg.current = c)}
            size={width - 60}
            value={`https://app.tipeame.com/?id=${userId}`}
            logoBackgroundColor="black"
          />
          <Text style={styles.text}>
            Escanea el código QR para recibir pagos.
          </Text>
          <TouchableOpacity onPress={saveQRCode} style={styles.button}>
            <View style={styles.instructions}>
              <Text style={styles.buttonTitle}>Compartir</Text>
              <Ionicons name="share-social-outline" size={24} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    width: width - 60,
    color: 'rgb(80,80,180)'
  },
  buttonTitle: {
    fontSize: 20,
    marginRight: 10,
    fontFamily: 'normal',
    color: '#fff'
  },
  instructions: {
    flexDirection: 'row'
  },
  button: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(80,80,180)'
  }
})
