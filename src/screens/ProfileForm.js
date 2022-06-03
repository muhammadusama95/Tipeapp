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
  Alert
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
import { getUserById, setUser, updateUser } from '../APIs'

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
const ProfileForm = ({ navigation }) => {
  var [email, setEmail] = useState('')
  var [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [cif, setCif] = useState('')
  const [city, setCity] = useState()
  const [town, setTown] = useState('')
  const [formattedValue, setFormattedValue] = useState('')
  const [num, setNum] = useState('')
  const [docId, setDocId] = useState('')

  const [errors, setErrors] = useState({})

  const { user } = useContext(AuthContext)
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
    console.log('state', state)
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

  async function handleSignup() {
    try {
      const errors = validate()
      if (!_.isEmpty(errors)) {
        // Please enter the required fields
        Alert.alert('Alerta', 'Por favor introduzca los campos requeridos.')
        return
      }
      const userData = getUserDataFromState()
      console.log('docId', user.uid)
      await updateUser(user.uid, userData)
      Alert.alert('Alerta', 'Los datos se han actualizado correctamente.')
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
      console.log('Alerta', message)
      console.log(e)
    }
  }

  useEffect(() => {
    console.log('user.uid', user.uid)
    getLoggedInUser(user.uid)
  }, [user])

  const getLoggedInUser = async (uid) => {
    console.log('In ProfileForm.js')
    const userData = await getUserById(uid)
    console.log('uid', uid)
    if (userData) {
      setEmail(userData.email)
      setCif(userData.cif)
      setNum(userData.num.replace('+34', ''))
      setCompanyName(userData.companyName)
      setPostalCode(userData.postalCode)
      setCity(userData.city)
      setTown(userData.town)
      setDocId(uid)
      setAddress(userData.address)
      setPassword(userData.password)
    }
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.Body}>
          <InputWithIcon
            icon="business-outline"
            validate={validate}
            value={companyName}
            onChangeText={(e) => setCompanyName(e)}
            label="Nombre sociedad"
          />
          <InputWithIcon
            validate={validate}
            value={address}
            onChangeText={(e) => setAddress(e)}
            label="Dirección"
          />
          <InputWithIcon
            validate={validate}
            value={postalCode}
            onChangeText={(e) => setPostalCode(e)}
            label="Código postal"
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '50%' }}>
              <StyledSelectInput
                onValueChange={(e) => setCity(e)}
                value={city}
                label="Provincia"
              >
                {listOfCities.map((name) => (
                  <Picker.Item key={name} label={name} value={name} />
                ))}
              </StyledSelectInput>
            </View>
            <View style={{ width: '50%' }}>
              <InputWithIcon
                validate={validate}
                onChangeText={(e) => setTown(e)}
                value={town}
                label="Localidad"
              />
            </View>
          </View>
          <InputWithIcon
            validate={validate}
            onChangeText={(e) => setCif(e)}
            label="CIF"
            value={cif}
          />
          <InputWithIcon
            icon="at-sharp"
            onChangeText={(e) => setEmail(e)}
            label="Email"
            validate={validate}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
          />
          <View>
            <PhoneInput
              containerStyle={styles.phoneContainer}
              textInputStyle={styles.phoneText}
              codeTextStyle={styles.phoneCodeText}
              textContainerStyle={styles.phoneTextContainer}
              placeholder="Número de teléfono"
              defaultCode="ES" //ES
              value={num}
              layout="first"
              defaultValue={num}
              onChangeFormattedText={(text) => {
                setFormattedValue(text)
              }}
              onChangeText={(text) => {
                setNum(text)
              }}
              textInputProps={{
                value: num
              }}
            />
          </View>
          <InputWithIcon
            icon="lock-closed-outline"
            onChangeText={(e) => setPassword(e)}
            label="Contraseña"
            validate={validate}
            secureTextEntry
            value={password}
          />
          <LongButton
            text="Guardar ajustes"
            onPress={handleSignup}
            style={styles.Button}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default ProfileForm
var styles = StyleSheet.create({
  container: {
    width,
    minHeight: height,
    backgroundColor: 'white'
  },
  container2: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    fontFamily: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: 'rgb(80,80,180)',
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  scanner: {
    width: width - 60,
    height: width - 60
  },
  button: {
    width: width - 48,
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
    //borderBottomWidth: 0.5,
    //sborderBottomColor: 'red',
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
    borderLeftWidth: 0.5,
    borderLeftColor: 'grey',
    backgroundColor: 'white',
    //borderBottomWidth: 0.5,
    borderBottomColor: 'grey'
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
    marginTop: height * 0.1
  },
  inputContainer: {
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: 'grey',
    marginBottom: 10
  },
  input: {
    height: '100%',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'black'
  },
  text1: {
    fontFamily: 'normal',
    fontSize: 16,
    marginHorizontal: 6
  },
  Body: {
    width: width * 0.85,
    alignSelf: 'center',
    marginTop: 20
  }
})
