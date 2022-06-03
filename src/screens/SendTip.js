import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'

import { BarCodeScanner } from 'expo-barcode-scanner'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import {
  CardField,
  useConfirmPayment,
  useStripe
} from '@stripe/stripe-react-native'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'
import { db } from '../../firebase'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import ProfileForm from './ProfileForm'
import { addUserTransaction, getUserByStripeId } from '../APIs'
import { API_URL } from '../constants/Urls'

var { width } = Dimensions.get('screen')
var { height } = Dimensions.get('screen')

export default function SendTip({ navigation }) {
  const [hasPermission, setHasPermission] = useState(true)
  const [scanned, setScanned] = useState(false)
  const [data, setData] = useState('')
  const [receiverData, setReceiverData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState('')

  const [receiver, setReceiver] = useState('')
  useEffect(() => {
    ;(async () => {
      // const { status } = await BarCodeScanner.requestPermissionsAsync()
      // setHasPermission(status === 'granted')
    })()
  }, [])

  useEffect(() => {
    if (account && account != '') {
      navigation.setOptions({ title: `Perfil empresa a - ${account}` })
    } else {
      navigation.setOptions({ title: `Perfil empresa` })
    }
  }, [account])

  const handleBarCodeScanned = async ({ type, data: _data }) => {
    let stripe_id = _data.split('stripe_id=')
    stripe_id = stripe_id.length > 0 && stripe_id[1]
    setData(stripe_id)
    setScanned(true)
    setLoading(true)
    console.log('<<<<<< _data: ', stripe_id)
    if (stripe_id.includes('acct_')) {
      setScanned(true)
      const userData = await getUserByStripeId(stripe_id)
      if (userData.length > 0) {
        var doc = userData[0]
        setReceiver(doc.id)
        var _account = doc.data()?.email?.split('@')[0]
        setAccount(_account)
        setReceiverData(doc.data())
      } else {
        setScanned(false)
        alert('ID de cuenta no válido')
      }
      setLoading(false)
    } else {
      Alert.alert('Oops', 'ID de cuenta no válido', [
        {
          text: 'OK',
          onPress: () => {
            setScanned(false)
            setLoading(false)
          }
        }
      ])
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  const { user } = useContext(AuthContext)

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
      if (result.user?.uid) {
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
        return navigation.replace('Home')
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

  return loading ? (
    <View style={{ padding: 24 }}>
      <Text>espere por favor...</Text>
    </View>
  ) : scanned ? (
    <TipDetails
      navigation={navigation}
      receiver={receiver}
      setAccount={setAccount}
      receiverData={receiverData}
      setScanned={setScanned}
      account_id={data}
    />
  ) : (
    <ProfileForm />
  )
}

function TipDetails({
  navigation,
  receiver,
  account_id,
  setScanned,
  setAccount,
  receiverData
}) {
  const [cardDetails, setCardDetails] = useState()
  const { confirmPayment } = useConfirmPayment()

  var [amount, setAmount] = useState(undefined)
  var user = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    let fee = 0.05
    if (receiverData?.fee) {
      if (receiverData?.feeType === 'Fixed') {
        fee = Number(receiverData?.fee)
      } else {
        fee = (Number(amount) * Number(receiverData?.fee)) / 100
      }
    }
    const response = await axios.post(`${API_URL}/payment-sheet`, {
      amount: Number(amount),
      to_account_id: account_id,
      fee: fee
    })

    if (response.status != 200) throw response.data

    const response_data = response.data
    console.log(response_data)
    var { paymentIntent } = response_data

    return paymentIntent
  }

  const handlePayPress = async () => {
    console.log('Amount: ', amount)
    if (amount && amount < 0.5) {
      Alert.alert('La cantidad introducida debe ser de 0.50€ o más')
      return
    }

    //1.Gather the customer's billing information (e.g., email)
    if (
      !cardDetails?.complete
      //  || !email
    ) {
      Alert.alert('Por favor rellene los datos de su tarjeta de débito.')
      return
    }
    const billingDetails = {
      // email: "musthafa@tets.com",
    }

    setLoading(true)

    //2.Fetch the intent client secret from the backend
    try {
      console.log('1')
      const clientSecret = await fetchPaymentSheetParams()
      console.log('2: ', clientSecret)

      //2. confirm the payment
      console.log('4')
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: billingDetails
      })
      console.log('5')
      if (error) {
        setLoading(false)
        console.log('6')
        alert(`Payment Confirmation Error ${error.message}`)
      } else if (paymentIntent) {
        console.log('7')
        // Payout start
        try {
          axios.post('${API_URL}/payout', {
            to: account_id,
            amount,
            from: user.user.uid
          })
          console.log('8', paymentIntent)
          await addUserTransaction(user.user.uid, {
            to: account_id,
            amount,
            paymentIntent: paymentIntent.id,
            from: user.user.uid,
            time: new Date().getTime(),
            sender: user.user.email
          })
          console.log('9')
          await addUserTransaction(receiver, {
            to: account_id,
            amount,
            paymentIntent: paymentIntent.id,
            from: user.user.uid,
            time: new Date().getTime(),
            sender: user.user.email
          })
          console.log('10')
          setLoading(false)
          Alert.alert(
            'Confirmado',
            'Tu propina ha sido enviada correctamente',
            [
              {
                text: 'Aceptar',
                style: 'cancel'
              }
            ]
          )
        } catch (e) {
          setLoading(false)
          console.log('11')
          console.log(e.message)
          Alert.alert(
            'Error',
            'Algo salió mal durante la transacción. ¡Inténtalo de nuevo!',
            [
              {
                text: 'Aceptar',
                style: 'cancel'
              }
            ]
          )
        }
        // Payout end
      }
    } catch (e) {
      setLoading(false)
      console.log(e)
      Alert.alert(
        'Error',
        'Algo salió mal durante la transacción. ¡Inténtalo de nuevo!',
        [
          {
            text: 'Aceptar',
            style: 'cancel'
          }
        ]
      )
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cantidad a enviar</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="logo-euro" size={24} color="grey" />
        <TextInput
          disabled={loading}
          autoCapitalize="none"
          value={amount}
          keyboardType="numeric"
          onChangeText={(e) => setAmount(e.trim())}
          placeholder="Tip Amount"
          returnKeyType="done"
          style={styles.input}
        />
      </View>
      <View
        style={{
          borderWidth: 0.5,
          borderRadius: 5,
          borderStyle: 'solid',
          borderColor: 'grey',
          width: '100%'
        }}
      >
        <CardField
          postalCodeEnabled={false}
          style={{
            height: 55,
            alignItems: 'center'
          }}
          cardStyle={{
            paddingVertical: 4,
            borderRadius: 5,
            borderWidth: 0.5
          }}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails)
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (loading) return

          handlePayPress()
        }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="rgb(255,255,255)" />
        ) : (
          <Text style={{ ...styles.text1, color: 'white' }}>
            Perfil empresa{' '}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (loading) return

          setScanned(false)
          setAccount('')
        }}
        style={{ ...styles.button, backgroundColor: 'red', marginTop: 3 }}
      >
        <Text style={{ ...styles.text1, color: 'white' }}>Regresa</Text>
      </TouchableOpacity>
    </View>
  )
}

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
  }
})
