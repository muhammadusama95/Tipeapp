import React, { useContext, useEffect, useState } from 'react'
import {
  Text,
  SafeAreaView,
  Alert,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native'
import LandingScreenImage from '../../assets/landing.png'
import { AuthContext, StripeConnectConfirmContext } from '../../AuthContext'
import { Ionicons } from '@expo/vector-icons'
import { db } from '../../firebase'
import { getUserById, updateUser } from '../APIs'

var { width, height } = Dimensions.get('screen')

function GoogleBusiness({ navigation }) {
  var { user } = useContext(AuthContext)
  var isVerified = useContext(StripeConnectConfirmContext)
  var [gblink, setgblink] = useState(user?.gblink || '')
  var [loading, setLoading] = useState(false)
  var [UserData, setUserData] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      navigation.replace('Welcome')
      return
    }
    if (user?.uid) {
      getUser()
    }
  }, [user.uid])

  async function handleUpdate() {
    try {
      if (gblink.includes('g.page')) {
        setLoading(true)
        await updateUser(user.uid, { gblink })
        setLoading(false)
        Alert.alert('Éxito', '¡Se ha agregado su enlace comercial de Google!')
      } else {
        Alert.alert('Advertencia', 'Por favor, inserte una URL válida!')
      }
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  async function getUser() {
    try {
      setLoading(true)
      console.log('In GoogleBusiness.js')
      const userData = await getUserById(user.uid)
      setUserData(userData)
      if (userData?.gblink) {
        setgblink(userData?.gblink)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error.message)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text1}>
            Añade tu perfil de google my business para que tus clientes puedas
            añadir reseñas. Puedes conseguir el enlace en la pagina de google my
            business en el apartado Inicio - Consigue más reseñas - Compartir
            perfil
          </Text>
          <Text style={styles.heading}>{UserData?.gblink}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="at-sharp" size={24} color="grey" />
          <TextInput
            autoCapitalize="none"
            value={gblink}
            onChangeText={(e) => setgblink(e.trim())}
            placeholder="Enlace comercial de Google"
            style={styles.input}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text>&nbsp;</Text>
        </View>
        <TouchableOpacity onPress={handleUpdate} style={styles.button}>
          {loading ? (
            <ActivityIndicator color={'#fff'} size={'small'} />
          ) : (
            <Text style={{ ...styles.text, color: 'white' }}>
              Añadir enlace comercial de Google
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(80,80,180)',
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 40,
    marginTop: 20
  },
  container: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    height: height - 60,
    height: '100%'
  },
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'black',
    color: 'rgb(80,80,180)'
  },
  text: {
    fontFamily: 'normal',
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center'
  },
  spacer: {
    flex: 1
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  text1: {
    fontFamily: 'bold',
    fontSize: 20
  }
})

export default GoogleBusiness
