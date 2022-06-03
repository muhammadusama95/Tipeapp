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
import { auth, db } from '../../firebase'
import { setUser } from '../APIs'

var { width, height } = Dimensions.get('screen')

async function associateUser(email, uid, displayName, photoURL) {
  await setUser(uid, { email, displayName, photoURL })
}

function LoginScreen({ navigation }) {
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

  useEffect(async()=>{
    const user = await auth.getCurrentUser();
    console.log(user, "Sadf");
  }, [])

  function mailHandler() {
    Alert.alert(
      'Alerta',
      'Su cuenta todavía no está validada, puede seleccionar re-enviar para que le enviemos un email de verificación nuevo.',
      [
        {
          text: 'Cancelar',
          onPress: () => auth.sendEmailVerification(),//console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Re-enviar email',
          onPress: () => callConfirmationMailer(email)
        }
      ]
    )
  }

  async function handleLogin() {
    setloaded(true)

    try {
      var result = await auth.signInWithEmailAndPassword(
        email.trim(),
        password.trim()
      )
      if (result.user.emailVerified) {
        if (result.user?.uid) {
          setloaded(false)
          var { uid, email: _email, displayName, photoURL } = result.user
          await associateUser(_email, uid, displayName || '', photoURL || '')
          return navigation.replace('Home')
        }
      } else {
        setloaded(false)
        mailHandler()
      }
    } catch (e) {
      setloaded(false)
      var message =
        'Esta cuenta ya se encuentra registrada, pruebe usando otra diferente.'
      if (e.message.includes('badly formatted')) {
        message = 'El email introducido es incorrecto'
      } else if (e.message.includes('password is invalid')) {
        message = 'la contraseña introducida es incorrecta'
      } else if (e.message.includes('no user record')) {
        message =
          'El usuario introducido no se corresponde con ninguno existente.'
      }
      Alert.alert('Alerta', message)
    }
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

            <Text style={styles.heading}>Iniciar sesión</Text>
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
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="grey" />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e.trim())}
                placeholder="Contraseña"
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={styles.spacer}>
              <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                <Text>¿Se te olvidó tu contraseña?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={{ ...styles.text, color: 'white' }}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
            <View style={{ ...styles.row, flexWrap: 'wrap' }}>
              <Text style={styles.text1}>¿Nuevo en nuestra aplicación?</Text>
              <Text
                onPress={(e) => navigation.replace('TermAndCond')}
                style={{
                  ...styles.text1,
                  fontFamily: 'black',
                  color: 'rgb(80,80,180)'
                }}
              >
                Crear una cuenta
              </Text>
            </View>
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
    marginTop: 20
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

export default LoginScreen
