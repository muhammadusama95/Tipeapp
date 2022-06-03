import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  SimpleLineIcons
} from '@expo/vector-icons'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import CalendarIcon from '../../assets/svg/calendar'
import {
  AuthContext,
  StripeWaiterConnectConfirmContext
} from '../../AuthContext'
import { db } from '../../firebase'
import QRCode from 'react-native-qrcode-svg'
import listOfCities from '../constants/list-of-cities.json'
import _ from 'lodash'
import { Input } from '../common/Input'
import { SelectInput } from '../common/SelectInput'
import { genrerateUserId } from '../util'
import { getUserById, setUser, updateUser } from '../APIs'

var { width, height } = Dimensions.get('screen')
function StripeScreen({ navigation, route }) {
  var { user } = useContext(AuthContext)
  var isVerified = useContext(StripeWaiterConnectConfirmContext)
  var [waiterUser, setwaiterUser] = useState(null)
  var [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [dni, setDni] = useState('')
  const [tipType, setTipType] = useState('Autonomous')
  const [amount, setAmount] = useState(0)
  const [city, setCity] = useState()
  const [town, setTown] = useState('')
  const [errors, setErrors] = useState({})
  var [added, setAdded] = useState(false)
  var [loading, setLoading] = useState('')
  var [logoutLoading, setLogoutLoading] = useState(false)
  const uid = route && route.params && route.params.uid

  useEffect(() => {
    getWaiter()
  }, [])

  const getWaiter = async () => {
    console.log('In StripeScreen.js')
    const userData = await getUserById(uid)
    if (userData) {
      setwaiterUser(userData)
      setUserDataInState(userData)
    }
  }

  const getUserDataFromState = () => {
    const userData = {
      name,
      surname,
      email,
      address,
      postalCode,
      tipType,
      city,
      town,
      dni
    }

    if (tipType === 'Salaried') {
      userData.charges = [
        {
          name: 'IRPF',
          amount: amount,
          is_fixed: false,
          destination: user.stripe_account_id
        }
      ]
    } else {
      console.log('waiterUser', waiterUser)
      let irpfCharge = waiterUser.charges.find((o) => o.name === 'IRPF')
      let allCharges = waiterUser.charges
      if (irpfCharge) {
        allCharges.splice(
          allCharges.findIndex((a) => a.name === 'IRPF'),
          1
        )
        userData.charges = allCharges
      }
    }

    return userData
  }

  const validate = () => {
    const state = getUserDataFromState()
    const errors = {}
    if (!state.name) {
      errors.name = '*Se requiere el nombre'
    }
    if (!state.surname) {
      errors.surname = '*Se requieren los apellidos'
    }
    if (!state.email) {
      errors.email = '*Se requiere el Email'
    }
    if (!state.address) {
      errors.address = '*Se requiere la dirección'
    }
    if (!state.postalCode) {
      errors.postalCode = '*Se requiere el Código postal'
    }
    if (!state.dni) {
      errors.dni = '*Se requiere el DNI'
    }
    if (!state.town) {
      errors.town = '*Se requiere la localidad'
    }
    if (!state.city) {
      errors.city = '*Se requiere la provincia'
    }
    // console.log('state.amount', state.charges)
    if (state.tipType === 'Salaried' && state.charges.length < 1) {
      errors.amount = '*Se requiere el Porcentaje'
    }

    setErrors(errors)
    return errors
  }

  const setUserDataInState = (user) => {
    let irpfCharge = user?.charges.find((o) => o.name === 'IRPF')
    setName(user?.name)
    setSurname(user?.surname)
    setEmail(user?.email)
    setAddress(user?.address)
    setPostalCode(user?.postalCode)
    user.tipType && setTipType(user?.tipType)
    if (irpfCharge) {
      setAmount(irpfCharge.amount)
    }
    setCity(user?.city)
    setTown(user?.town)
    setDni(user?.dni)
  }

  const handleUpdateUser = async () => {
    try {
      const userData = getUserDataFromState()
      const errors = validate()
      if (!_.isEmpty(errors)) {
        // Please enter the required fields
        Alert.alert('Alerta', 'Por favor introduzca los campos requeridos.')
        return
      }
      setLoading(true)
      if (waiterUser) {
        await updateUser(uid, userData)
      } else {
        const userId = genrerateUserId()
        await setUser(uid, {
          waiter: true,
          uid,
          restaurantUserID: user.uid,
          userId,
          ...userData
        })
      }
      setLoading(false)
      setAdded(true)
      // setName('')
      // The data has been successfully updated.
      Alert.alert('Alerta', 'Los datos se han actualizado correctamente.')
    } catch (error) {
      alert(JSON.stringify(error))
      setLoading(false)
    }
  }

  const onLogout = () => {
    Alert.alert('Alerta', 'Estás seguro de que desea desconectar stripe', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Aceptar', onPress: () => logoutWaiterUser() }
    ])
  }
  const logoutWaiterUser = async () => {
    try {
      setLogoutLoading(true)
      await unverifyUser(uid)
      getWaiter()
      setLogoutLoading(false)
    } catch (error) {
      alert(JSON.stringify(error))
      setLogoutLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
      >
        {/* {
          !waiterUser?.is_verified && */}
        {/* } */}
        {/* {
          waiterUser?.is_verified &&
          <TouchableOpacity onPress={() => logoutWaiterUser()} style={{ marginBottom: 22, marginLeft: 10, width: 150, height: 40, alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: 5, backgroundColor: 'rgb(240,0,0)' }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>{logoutLoading ? <ActivityIndicator color={"#fff"} /> : "Cerrar sesión"}</Text>
          </TouchableOpacity>
        } */}

        <Text style={styles.text}>
          {waiterUser?.is_verified ? 'Verificado' : 'Conectar Con Stripe'}
        </Text>
        {isVerified == null ? (
          <ActivityIndicator color="rgb(80,80,180)" />
        ) : (
          <TouchableOpacity
            activeOpacity={waiterUser?.is_verified ? 1 : 0}
            onPress={(e) =>
              waiterUser?.is_verified
                ? console.log('')
                : waiterUser?.name
                ? navigation.push('ConnectWaiter', { user: waiterUser })
                : Alert.alert('Alerta', 'Por favor agregue el nombre primero')
            }
            style={[
              styles.box,
              {
                height: waiterUser?.is_verified ? 130 : 90,
                borderWidth: waiterUser?.is_verified ? 0 : 1,
                backgroundColor: waiterUser?.is_verified
                  ? 'rgb(80,80,180)'
                  : 'white'
              }
            ]}
          >
            <FontAwesome5
              name="stripe"
              size={((width - 10) / 2 - 5) / 1.5}
              color={waiterUser?.is_verified ? 'white' : 'rgb(80,80,180)'}
            />
            {/* {
              waiterUser?.is_verified &&
              <TouchableOpacity onPress={() => onLogout()} style={{ marginTop: -22, marginBottom: 30, marginLeft: 10, width: 150, height: 40, alignItems: 'center', justifyContent: 'center', padding: 2, borderRadius: 5, backgroundColor: 'rgb(240,0,0)' }}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{logoutLoading ? <ActivityIndicator color={"#fff"} /> : "Desconectar"}</Text>
              </TouchableOpacity>
            } */}
          </TouchableOpacity>
        )}
        {waiterUser?.is_verified && (
          <>
            <Text style={[styles.text, { marginTop: 50 }]}>
              Mostrar Historial De Pagos
            </Text>
            <TouchableOpacity
              onPress={(e) =>
                navigation.push('HistoryPayment', { uid: waiterUser.uid })
              }
              style={{
                borderWidth: 1,
                backgroundColor: '#fff',
                borderColor: 'lightgrey',
                borderRadius: 20,
                width: 200,
                height: 90,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CalendarIcon color={'rgb(80,80,180)'} />
            </TouchableOpacity>
          </>
        )}
        {waiterUser?.is_verified &&
          waiterUser?.stripe_account_id &&
          waiterUser?.userId && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WaiterReceiveTip', { user: waiterUser })
              }
              style={{ marginBottom: 50, alignItems: 'center', marginTop: 20 }}
            >
              <Text style={styles.text}>Código QR</Text>
              <View
                style={[styles.box, { backgroundColor: '#fff', height: 90 }]}
              >
                <QRCode
                  size={((width - 10) / 2 - 10) / 3}
                  value={`https://app.tipeame.com/?id=${waiterUser?.userId}`}
                  color="rgb(80,80,180)"
                />
              </View>
            </TouchableOpacity>
          )}
        <>
          <Text style={styles.text}>Detalles sobre empleado</Text>
          <View
            style={{
              marginTop: 10,
              width: '80%',
              justifyContent: 'space-between'
            }}
          >
            <Input
              value={name}
              onChangeText={(text) => setName(text)}
              label="Nombre"
              error={errors.name}
            />
            <Input
              value={surname}
              onChangeText={(text) => setSurname(text)}
              label="Apellidos"
              error={errors.surname}
            />
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              label="Email"
              error={errors.email}
            />
            <Input
              value={address}
              onChangeText={(text) => setAddress(text)}
              label="Dirección"
              error={errors.address}
            />
            <Input
              value={postalCode}
              onChangeText={(text) => setPostalCode(text)}
              label="Código postal"
              error={errors.postalCode}
            />
            <View style={{ flexDirection: 'row', widht: '100%' }}>
              <View style={{ flex: 1 }}>
                <SelectInput
                  value={tipType}
                  onValueChange={(value) => {
                    setTipType(value)
                  }}
                  label="Tipo de empleado"
                >
                  <Picker.Item label="Autónomo" value="Autonomous" />
                  <Picker.Item label="Asalariado" value="Salaried" />
                </SelectInput>
              </View>
              {tipType === 'Salaried' && (
                <View style={{ marginLeft: 10 }}>
                  <Input
                    // value={String(amount)}
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    label="Porcentaje (%)"
                    keyboardType="numeric"
                    error={errors.amount}
                  />
                </View>
              )}
            </View>
            <Input
              value={dni}
              onChangeText={(text) => setDni(text)}
              label="DNI"
              error={errors.dni}
            />
            <View style={{ flexDirection: 'row', widht: '100%' }}>
              <View style={{ flex: 1 }}>
                <Input
                  value={town}
                  onChangeText={(text) => setTown(text)}
                  label="Localidad"
                  error={errors.town}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <SelectInput
                  label="Provincia"
                  value={city}
                  onValueChange={(value) => setCity(value)}
                  error={errors.city}
                >
                  {listOfCities.map((name) => (
                    <Picker.Item key={name} label={name} value={name} />
                  ))}
                </SelectInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleUpdateUser()}
              style={{
                marginBottom: 22,
                marginLeft: 10,
                width: '35%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                borderRadius: 5,
                backgroundColor: 'rgb(80,80,180)',
                alignSelf: 'center'
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {
                  loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : waiterUser?.name ? (
                    'Guardar ajustes' /* Rename */
                  ) : (
                    'Guardar ajustes'
                  ) /* Add name */
                }
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%'
  },
  box: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 20,
    width: 200,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: { fontSize: 16, color: 'grey', fontFamily: 'semi-bold' },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 10,
    height: 43,
    borderRadius: 5
  },
  selectInput: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  label: { color: 'grey', marginBottom: 3, marginLeft: 2 }
})

export default StripeScreen
