import React, { useContext, useEffect } from 'react'
import {
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import LogoHeader from '../../assets/logo_header.png'
import LandingScreenImage from '../../assets/landing.png'
import { AuthContext } from '../../AuthContext'
import { auth } from '../../firebase'
import LongButton from '../Components/LongButton'
import Colors from '../constants/Colors'

var { width, height } = Dimensions.get('screen')

function LandingScreen({ navigation }) {
  var { user } = useContext(AuthContext)
  // useEffect(
  //   function () {
  //     var timeout;
  //     if (user.uid) {
  //       timeout = setTimeout(() => {
  //         navigation.replace("Home");
  //       }, 50);
  //     }
  //     return () => clearTimeout(timeout);
  //   },
  //   [user.uid]
  // );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image source={LogoHeader} style={styles.Logo} />
        <Image style={styles.image} source={LandingScreenImage} />
        <Text style={styles.heading}>Envía pagos en cualquier momento.</Text>
        <Text style={styles.text}>
          ᴉTu plataforma segura para recibir y enviar pagos!
        </Text>
        <LongButton
          text="Registrarte"
          onPress={() => navigation.navigate('TermAndCond')}
          style={styles.Button}
        />
        <Text style={[styles.text1, { marginTop: height * 0.025 }]}>
          ¿Ya tienes una cuenta disponible?
        </Text>
        <Text
          onPress={(e) => navigation.replace('Login')}
          style={[
            styles.text1,
            {
              fontFamily: 'Urbanist Bold',
              marginTop: height * 0.005
            }
          ]}
        >
          Iniciar sesión
        </Text>
      </View>
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: 'white'
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
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
  heading: {
    marginTop: height * 0.05,
    fontSize: 19,
    alignSelf: 'center',
    fontFamily: 'Urbanist Bold',
    textAlign: 'center',
    color: Colors.TEXT_SUCCESS
  },
  text: {
    fontFamily: 'Urbanist Regular',
    alignSelf: 'center',
    fontSize: 15,
    width: width - 60,
    textAlign: 'center',
    color: Colors.TEXT_SUCCESS
  },
  Button: {
    marginTop: height * 0.15
  },
  text1: {
    fontFamily: 'Urbanist Regular',
    alignSelf: 'center',
    color: Colors.TEXT_INFO,
    textAlign: 'center',
    fontSize: 16
  }
})

export default LandingScreen
