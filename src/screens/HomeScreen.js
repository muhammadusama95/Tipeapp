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
  ActivityIndicator
} from 'react-native'
import LandingScreenImage from '../../assets/landing.png'
import { AuthContext, StripeConnectConfirmContext } from '../../AuthContext'
import { FontAwesome } from '@expo/vector-icons'
import { db } from '../../firebase'
import { StatusBar } from 'expo-status-bar'
import { getUserById, unverifyUser } from '../APIs'

var { width, height } = Dimensions.get('screen')

function HomeScreen({ navigation }) {
  var { user, logout } = useContext(AuthContext)
  var isVerified = useContext(StripeConnectConfirmContext)
  var [logoutLoading, setLogoutLoading] = useState(false)
  const [isUserVerify, setIsUserVerify] = useState(null)
  const [isUserReturned, setIsUserReturned] = useState(false)
  useEffect(() => {
    console.log('user?.uid', user?.uid)
    ;(async () => {
      if (!user?.uid) {
        navigation.replace('Welcome')
      } else {
        console.log('In else')
        const loggedInUser = await getUserById(user?.uid)
        console.log('loggedInUser', loggedInUser)
        if (loggedInUser.is_verified) {
          setIsUserVerify(true)
        } else {
          setIsUserVerify(false)
        }
        if (loggedInUser.returned) {
          setIsUserReturned(true)
        } else {
          setIsUserReturned(false)
        }
      }
    })()
  }, [user.uid])

  useEffect(() => {
    console.log('Home screen')
  }, [isUserReturned])

  const handleLogout = () => {
    Alert.alert('Alerta', '¿Estás seguro de que desea cerrar sesión?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Aceptar', onPress: () => logout() }
    ])
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
      await unverifyUser(user.uid)
      setLogoutLoading(false)
    } catch (error) {
      alert(JSON.stringify(error))
      setLogoutLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.text1}>Hola,</Text>
          <Text style={styles.heading}>{user?.email?.split('@')[0]}</Text>
        </View>
        <View style={{ ...styles.row, marginTop: 30 }}>
          <TouchableOpacity
            onPress={(e) => navigation.navigate('Send')}
            style={styles.card}
          >
            <FontAwesome
              name="user"
              size={((width - 48) / 2 - 10) / 2.5}
              color="rgb(80,80,180)"
              style={{ marginRight: 10, marginBottom: 10 }}
            />
            <Text
              style={{
                ...styles.text,
                color: 'rgb(80,80,180)',
                fontFamily: 'semi-bold'
              }}
            >
              Perfil empresa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={(e) => {
              if (isVerified) {
                navigation.navigate('Receive')
              } else {
                navigation.navigate('Connect')
              }
            }}
            style={styles.card}
          >
            <FontAwesome
              name="qrcode"
              size={((width - 48) / 2 - 10) / 2.5}
              color="rgb(80,80,180)"
              style={{ marginBottom: 10 }}
            />
            <Text
              style={{
                ...styles.text,
                color: 'rgb(80,80,180)',
                fontFamily: 'semi-bold'
              }}
            >
              Recibir propina
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Transactions', { id: user.uid })
            }
            style={styles.card}
          >
            <FontAwesome
              name="th-list"
              size={((width - 48) / 2 - 10) / 2.5}
              color="rgb(80,80,180)"
              style={{ marginBottom: 10 }}
            />
            <Text
              style={{
                ...styles.text,
                color: 'rgb(80,80,180)',
                fontFamily: 'semi-bold'
              }}
            >
              Historial transacciones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isVerified || isVerified == null}
            onPress={(e) => !isVerified && navigation.push('Connect')}
            style={{
              ...styles.card,
              backgroundColor: isVerified ? 'rgb(80,80,180)' : 'white'
            }}
          >
            {isUserVerify == null ? (
              <>
                <ActivityIndicator color="rgb(80,80,180)" />
              </>
            ) : (
              <>
                <FontAwesome
                  name="cc-stripe"
                  size={((width - 48) / 2 - 10) / 2.5}
                  color={isUserVerify ? 'white' : 'rgb(80,80,180)'}
                  style={{ marginBottom: 10 }}
                />
                <Text
                  style={{
                    ...styles.text,
                    color: isUserVerify ? 'white' : 'rgb(80,80,180)',
                    fontFamily: 'semi-bold'
                  }}
                >
                  {isUserVerify ? 'Verificado' : 'Conectar Stripe'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate('GoogleBusiness')}
            style={styles.card}
          >
            <FontAwesome
              name="google"
              size={((width - 48) / 2 - 10) / 2.5}
              color="rgb(80,80,180)"
              style={{ marginBottom: 10 }}
            />
            <Text
              style={{
                ...styles.text,
                color: 'rgb(80,80,180)',
                fontFamily: 'semi-bold'
              }}
            >
              Google my business
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Text>&nbsp;</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={{ ...styles.text, color: 'white' }}>Cerrar sesión</Text>
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
    backgroundColor: 'rgb(240,0,0)',
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
  card: {
    height: (width - 48) / 2 - 10,
    width: (width - 48) / 2 - 10,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'rgb(80,80,180)',
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 8,
    padding: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    shadowColor: 'rgb(80,80,180)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  heading: {
    fontSize: 30,
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

export default HomeScreen
