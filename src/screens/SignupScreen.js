import React, { useCallback, useContext, useEffect, useState } from 'react'
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
  BackHandler,
  ActivityIndicator
} from 'react-native'
import LogoHeader from '../../assets/logo_header.png'
import LandingScreenImage from '../../assets/landing.png'
import { Ionicons } from '@expo/vector-icons'
import _ from 'lodash'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../AuthContext'
import { auth, db } from '../../firebase'
import LongButton from '../Components/LongButton'
import Colors from '../constants/Colors'
import { genrerateUserId } from '../util'
import { InputWithIcon } from '../common/InputWithIcon'
import { ScrollView } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import PhoneInput from 'react-native-phone-number-input'
import { StyledSelectInput } from '../common/StyledSelectInput'
import listOfCities from '../constants/list-of-cities.json'
import { useFocusEffect } from '@react-navigation/native'
import { setUser } from '../APIs'

var { width, height } = Dimensions.get('screen')

function associateUser(email, uid, displayName, photoURL, rest) {
  const userId = genrerateUserId()
  setUser(uid, {
    ...rest,
    email,
    displayName,
    photoURL,
    userId
  })
}

function SignupScreen({ navigation }) {
  var { user } = useContext(AuthContext)
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [cif, setCif] = useState('')
  const [city, setCity] = useState()
  const [town, setTown] = useState('')
  const [errors, setErrors] = useState({})
  const [num, setNum] = useState('')
  const [formattedValue, setFormattedValue] = useState('')
  const [loaded, setLoaded] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Alerta',
          '¿Estás seguro de que desea salir de la página de registro?',
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => {} },
            {
              text: 'Aceptar',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.replace('Login')
            }
          ]
        )
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [])
  )

  const getUserDataFromState = () => ({
    email,
    password,
    companyName,
    address,
    postalCode,
    cif,
    city,
    town,
    num: formattedValue
  })

  const validate = () => {
    const state = getUserDataFromState()
    const errors = {}
    if (!state.email) {
      errors.email = '*Se requiere el Email'
    }
    if (!state.password) {
      errors.password = '*Se requiere el contraseña'
    }
    if (!state.companyName) {
      errors.companyName = '*El nombre de la empresa es obligatorio'
    }
    if (!state.address) {
      errors.address = '*Se requiere el Dirección'
    }
    if (!state.postalCode) {
      errors.postalCode = '*Se requiere el Código postal'
    }
    if (!state.cif) {
      errors.cif = '*Se requiere el CIF'
    }
    if (!state.city) {
      errors.city = '*Se requiere el Provincia'
    }
    if (!state.town) {
      errors.town = '*Se requiere el Localidad'
    }

    setErrors(errors)
    return errors
  }
  async function callConfirmationMailer(email) {
    setLoaded(true)
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
      .then((data) => {
        setLoaded(false)
      })
      .catch((e) => {
        setLoaded(false)
      })
  }

  async function handleSignup() {
    try {
      const errors = validate()
      if (!_.isEmpty(errors)) {
        // Please enter the required fields
        Alert.alert('Alerta', 'Por favor introduzca los campos requeridos.')
        return
      }
      var result = await auth.createUserWithEmailAndPassword(
        email.trim(),
        password.trim()
      )
      if (!result.user.emailVerified) {
        await callConfirmationMailer(email)
        await auth.signOut()
        navigation.replace('Login')
        let msg =
          'Para terminar el registro, le acabamos de enviar un correo con un enlace de validación.'
        Alert.alert('Alerta', msg)
      }
      // if (result.user?.uid) {
      else {
        var { uid, email: _email, displayName, photoURL } = result.user
        const { companyName, address, postalCode, cif, city, town, num } =
          getUserDataFromState()
        associateUser(_email, uid, displayName || '', photoURL || '', {
          companyName,
          address,
          postalCode,
          cif,
          city,
          town,
          num
        })
        return navigation.replace("Home");
      }
    } catch (e) {
      var message =
        'Esta cuenta ya se encuentra registrada, pruebe usando otra diferente.'
      // This account is already registered, try using a different one.
      if (e.message.includes('badly formatted')) {
        message = 'El email introducido es incorrecto'
      } else if (e.message.includes('password is invalid')) {
        message = 'la contraseña introducida es incorrecta'
      } else if (e.message.includes('no user record')) {
        message =
          'El usuario introducido no se corresponde con ninguno existente.'
      } else if (
        e.message.includes('Password should be at least 6 characters')
      ) {
        message = 'La contraseña debe tener al menos 6 caracteres'
      }

      Alert.alert('Alerta', message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <KeyboardAwareScrollView style={styles.container}>
          <Image source={LogoHeader} style={styles.Logo} />
          <Image style={styles.image} source={LandingScreenImage} />
          <View style={styles.Body}>
            <Text style={styles.heading}>Crear cuenta</Text>
            <InputWithIcon
              icon="at-sharp"
              value={email}
              onChangeText={(e) => setEmail(e)}
              label="Email"
              validate={validate}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <View style={styles.inputContainer}>
              <PhoneInput
                containerStyle={styles.phoneContainer}
                textInputStyle={styles.phoneText}
                codeTextStyle={styles.phoneCodeText}
                textContainerStyle={styles.phoneTextContainer}
                value={num}
                placeholder="Número de teléfono"
                defaultValue={num}
                defaultCode="ES" //ES
                layout="first"
                onChangeFormattedText={(text) => {
                  setFormattedValue(text)
                }}
              />
            </View>
            <InputWithIcon
              icon="lock-closed-outline"
              value={password}
              onChangeText={(e) => setPassword(e)}
              label="Contraseña"
              validate={validate}
              secureTextEntry
            />
            <InputWithIcon
              icon="business-outline"
              value={companyName}
              validate={validate}
              onChangeText={(e) => setCompanyName(e)}
              label="Nombre sociedad"
            />
            <InputWithIcon
              value={address}
              validate={validate}
              onChangeText={(e) => setAddress(e)}
              label="Dirección"
            />
            <InputWithIcon
              value={postalCode}
              validate={validate}
              onChangeText={(e) => setPostalCode(e)}
              label="Código postal"
            />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <StyledSelectInput
                  value={city}
                  onValueChange={(e) => setCity(e)}
                  label="Provincia"
                >
                  {listOfCities.map((name) => (
                    <Picker.Item key={name} label={name} value={name} />
                  ))}
                </StyledSelectInput>
              </View>
              <View style={{ flex: 1 }}>
                <InputWithIcon
                  value={town}
                  validate={validate}
                  onChangeText={(e) => setTown(e)}
                  label="Localidad"
                />
              </View>
            </View>
            <InputWithIcon
              value={cif}
              validate={validate}
              onChangeText={(e) => setCif(e)}
              label="CIF"
            />
            <LongButton
              text="Crear cuenta"
              onPress={handleSignup}
              style={styles.Button}
            />
            <Text style={[styles.text, { marginTop: height * 0.025 }]}>
              ¿Ya tienes una cuenta disponible?
            </Text>
            <Text
              onPress={(e) => navigation.replace('Login')}
              style={[
                styles.text,
                {
                  fontFamily: 'Urbanist Bold',
                  marginTop: height * 0.005
                }
              ]}
            >
              Iniciar sesión
            </Text>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: 'white'
  },
  image: {
    width: width * 0.45,
    height: height * 0.22,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: height * 0.05
  },
  Logo: {
    width: width * 0.9,
    height: height * 0.1,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.06
  },
  Body: {
    width: width * 0.85,
    alignSelf: 'center'
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Urbanist Bold',
    color: Colors.TEXT_INFO,
    marginTop: height * 0.02
  },

  Button: {
    marginTop: 20
  },
  text: {
    fontFamily: 'Urbanist Regular',
    alignSelf: 'center',
    color: Colors.TEXT_INFO,
    textAlign: 'center',
    fontSize: 16
  },
  phoneContainer: {
    height: height * 0.06,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  },
  phoneText: {
    backgroundColor: 'white',
    height: height * 0.06,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    width: 30,
    fontFamily: 'normal',
    fontSize: 18
  },
  phoneCodeText: {
    backgroundColor: 'white',
    fontFamily: 'normal',
    fontSize: 18
  },
  phoneTextContainer: {
    flex: 1,
    height: height * 0.06,
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
  }
})

export default SignupScreen
