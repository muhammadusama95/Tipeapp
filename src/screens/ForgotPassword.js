import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native'
import LoginLogo from '../../assets/login_logo.png'
import { Ionicons } from '@expo/vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../AuthContext'
// import { auth } from '../../firebase'
import firebase from "firebase/app";
import { setUser } from '../APIs'

var { width, height } = Dimensions.get('screen');
 const fireDb = firebase.firestore();

async function associateUser(email, uid, displayName, photoURL) {
  await setUser(uid, { email, displayName, photoURL })
}

function ForgotPassword({ navigation }) {
  var { user } = useContext(AuthContext)
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('')
  const [loaded, setloaded] = useState(false)
  async function callConfirmationMailer(email) {
    var data = JSON.stringify({
      userEmail: email
    })

    let url = `https://us-central1-backend-tipeame.cloudfunctions.net/sendEmail/send-custom-verification-email`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    response
      .json()
      .then((data) => {})
      .catch((e) => {
        // setLoaded(false)
      })
  }

  function mailHandler() {
    Alert.alert(
      'Alerta',
      'Su cuenta todavía no está validada, puede seleccionar re-enviar para que le enviemos un email de verificación nuevo.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Re-enviar email',
          onPress: () => callConfirmationMailer(email)
        }
      ]
    )
  }

  async function resetPassword() {
    
      setloaded(true)
      // auth.sendPasswordResetEmail(email)
      // .then((response) => {
      //   console(response)
      //   setloaded(false)
      //   navigation.navigate('OtpScreen')
      // })
      // .catch((error) => {
      //   console.log(error)
      //   setloaded(false)
      // });

       fetch(`https://rakamtech.com/timeapp/?action=sendEmail&email=${email}`)
      .then(response =>response.text())
      .then(data => {
        setloaded(false)
        setEmail("");
        navigation.navigate('OtpScreen', {passEmail: email})
      })
      .catch((error) => {
        setloaded(false)
        console.error('Error:', error);
      });

  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      {loaded ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator
            size="large"
            color="black"
            style={{
              marginTop: height * 0.1
            }}
          />
        </View>
      ) : (
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Image style={styles.image} source={LoginLogo} />

            <Text style={styles.heading}>¿Has olvidado tu contraseña?</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="at-sharp" size={24} color="grey" />
              <TextInput
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e.trim())}
                placeholder="Email"
                style={styles.input}
              />
            </View>
        
            <TouchableOpacity onPress={resetPassword} style={styles.button}>
              <Text style={{ ...styles.text, color: 'white' }}>
                  Reiniciar
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  inputContainer: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginBottom: 10
  },
  input: {
    height: '100%',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'black'
  },
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: height - 60,
    backgroundColor: 'white'
  },
  image: {
    width: width - 60,
    height: width - 60
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: 'rgb(80,80,180)'
  },
  text: {
    fontFamily: 'normal',
    alignSelf: 'center',
    fontSize: 16,
    width: width - 60,
    textAlign: 'center'
  },
  button: {
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(80,80,180)',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 8,
    marginTop: 50
  },
  spacer: {
    flex: 1
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 60,
    justifyContent: 'center'
  },
  text1: {
    fontFamily: 'normal',
    fontSize: 16,
    marginHorizontal: 6
  }
})

export default ForgotPassword
