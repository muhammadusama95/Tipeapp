import React, { useContext, useRef } from 'react'
import QRCode from 'react-native-qrcode-svg'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { AuthContext } from '../../AuthContext'
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid'
import { Ionicons } from '@expo/vector-icons'

var { width } = Dimensions.get('screen')

export default function ReceiveTip() {
  const user = useContext(AuthContext)

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

  return user?.user?.stripe_account_id ? (
    <View style={styles.container}>
      <QRCode
        getRef={(c) => (svg.current = c)}
        size={width - 60}
        value={`https://app.tipeame.com/?id=${user?.user?.userId}`}
        logoBackgroundColor="black"
      />
      {/* Scan the QR code to receive payments. */}
      <Text style={styles.text}>Escanea el código QR para recibir pagos.</Text>
      <TouchableOpacity onPress={saveQRCode} style={styles.button}>
        <View style={styles.instructions}>
          <Text style={styles.buttonTitle}>Compartir</Text>
          <Ionicons name="share-social-outline" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Necesita estar conectado con stripe para poder compartir su código QR</Text>
    </View>
  )
}

var styles = StyleSheet.create({
  container: {
    padding: 24,
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
  instructions: {
    flexDirection: "row"
  },
  button: {
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: "baseline",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'rgb(80,80,180)'
  },
  buttonTitle: {
    fontSize: 20,
    marginRight: 10,
    fontFamily: 'normal',
    color: '#fff'
  }
})
