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
import  {Ionicons}  from '@expo/vector-icons'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../AuthContext'
import { auth, db } from '../../firebase'
import { setUser } from '../APIs'

var { width, height } = Dimensions.get('screen')

function SetNewPasswordScreen({route, navigation }) {
  var { user } = useContext(AuthContext)
  var [password, setPassword] = useState('')
  var [confirmPassword, setConfirmPassword] = useState('')
  const { email, otp } = route.params;

  const [loaded, setloaded] = useState(false);
  
  async function setNewPassword() {

    if (password.length < 6 ) Alert.alert("Alert!", "Password should 6 or greater than 6 characters lond.")
    if ( password.length > 5 && confirmPassword.length < 6 ) Alert.alert("Alert!", "Confirm Password should 6 or greater than 6 characters lond.")
    if ( password.length > 5 && confirmPassword.length > 5 && password !== confirmPassword ) Alert.alert("Alert!", "Password and Confirm Password are different.")

    if(password.length > 5 && password  === confirmPassword ){
    setloaded(true);

      await fetch(`https://rakamtech.com/timeapp/?action=updatePassword&email=${email}&otp=${otp}&newPassword=${password}`)
      .then(response =>response.json())
      .then(data => {
        console.log(data, "dataaaaa");
        navigation.navigate("Login")    
        setloaded(false)
      })
      .catch((error) => {
        console.error('Error:', error);
        setloaded(false)
      });
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

            <Text style={styles.heading}>Set New Password</Text>
   
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="grey" />
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e.trim())}
                placeholder="Enter new password"
                secureTextEntry
                style={styles.input}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="grey" />
              <TextInput
                value={confirmPassword}
                onChangeText={(e) => setConfirmPassword(e.trim())}
                placeholder="Confirm password"
                secureTextEntry
                style={styles.input}
              />
            </View>
            <Ionicons name="lock-closed-outline" size={24} color="grey" />
            
            <TouchableOpacity onPress={setNewPassword} style={styles.button}>
              <Text style={{ ...styles.text, color: 'white' }}>
                Reset Password
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
    marginBottom: 10,
  },
  input: {
    height: '100%',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black"
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

export default SetNewPasswordScreen
