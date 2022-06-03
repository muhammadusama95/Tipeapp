import React, { useState, useEffect, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StripeProvider } from '@stripe/stripe-react-native'
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_900Black
} from '@expo-google-fonts/montserrat'

import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LandingScreen from './src/screens/LandingScreen'
import LoginScreen from './src/screens/LoginScreen'
import { auth, db } from './firebase'
import {
  AuthContext,
  StripeConnectConfirmContext,
  StripeReturnContext,
  StripeWaiterConnectConfirmContext
} from './AuthContext'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

import HomeScreen from './src/screens/HomeScreen'
import GoogleBusiness from './src/screens/GoogleBusiness'
import SendTip from './src/screens/SendTip'
import ReceiveTip from './src/screens/ReceiveTip'
import Transactions from './src/screens/Transactions'
import TermAndCondition from './src/screens/TermAndCond'
import PrivacyPolicy from './src/screens/PrivacyPolicy'
import Waiter from './src/screens/Waiter'
import Connect from './src/screens/Connect'
import ConnectWaiter from './src/screens/ConnectWaiter'
import SignupScreen from './src/screens/SignupScreen'
import StripeScreen from './src/screens/StripeScreen'
import WaiterReceiveTip from './src/screens/WaiterReceiveTip'
import WaiterIcon from './assets/svg/waiter'
import HistoryPayment from './src/screens/HistoryPayment'
import Splash from './src/screens/Splash'
import { LogBox, Alert } from 'react-native'
import { getUserById } from './src/APIs'
import ForgotPassword from './src/screens/ForgotPassword'
import OtpScreen from './src/screens/OtpScreen'
import SetNewPasswordScreen from './src/screens/SetNewPasswordScreen'

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer', "Can't perform a"])

export default function App() {
  var [user, setUser] = useState({ uid: null })
  var [isVerified, setIsVerified] = useState(null)
  var [isWaiterVerified, setIsWaiterVerified] = useState(null)
  var [isReturned, setReturned] = useState(false)

  var AppStack = createStackNavigator()
  var TabStack = createBottomTabNavigator()

  var tabBarOptions = {
    showLabel: true,
    style: {
      backgroundColor: 'rgb(80,80,180)',
      borderTopColor: 'rgb(80,80,180)',
      paddingBottom: 32
    }
  }

  var screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let icon = ''
      var color = focused ? 'rgb(80,80,180)' : 'grey'
      var size = 24

      switch (route.name) {
        case 'Dashboard':
          icon = 'home'
          break
        case 'Send':
          icon = 'user'
          break
        case 'Receive':
          icon = 'qrcode'
          break
        case 'Transactions':
          icon = 'th-list'
          break
        case 'WaiterStack':
          icon = 'user-secret'
          break
        default:
          icon = 'dashboard'
      }

      return route.name == 'Dashboard' ? (
        <AntDesign name={icon} size={size} color={color} />
      ) : route.name == 'WaiterStack' ? (
        <WaiterIcon color={color} />
      ) : (
        <FontAwesome name={icon} size={size} color={color} />
      )
    },
    headerTitleStyle: {
      fontFamily: 'bold',
      color: 'white'
    },
    headerStyle: {
      backgroundColor: 'rgb(80,80,180)'
    }
  })

  function logout() {
    auth.signOut().then((data) => {
      setUser({
        uid: null
      })
    })
  }

  function WaiterStack() {
    return (
      <AppStack.Navigator initialRouteName="Waiter">
        <AppStack.Screen
          name="Waiter"
          options={{
            headerShown: false
          }}
          component={Waiter}
        />
        <AppStack.Screen
          name="StripeScreen"
          options={{
            headerShown: false
          }}
          component={StripeScreen}
        />
        <AppStack.Screen
          name="WaiterReceiveTip"
          options={{
            headerShown: false
          }}
          component={WaiterReceiveTip}
        />
      </AppStack.Navigator>
    )
  }

  var TabScreens = () => {
    return (
      <TabStack.Navigator screenOptions={screenOptions}>
        <TabStack.Screen
          name="Dashboard"
          component={HomeScreen}
          options={{
            title: 'Inicio',
            headerTintColor: 'rgb(80,80,180)',
            tabBarActiveTintColor: 'rgb(80,80,180)',
            tabBarInactiveTintColor: 'grey'
          }}
        />
        <TabStack.Screen
          name="Receive"
          component={ReceiveTip}
          options={{
            title: 'Recibir Propina',
            headerTintColor: 'rgb(80,80,180)',
            tabBarActiveTintColor: 'rgb(80,80,180)',
            tabBarInactiveTintColor: 'grey'
          }}
        />
        <TabStack.Screen
          name="WaiterStack"
          component={WaiterStack}
          options={{
            headerShown: false,
            title: 'Empleados',
            headerTintColor: 'rgb(80,80,180)',
            tabBarActiveTintColor: 'rgb(80,80,180)',
            tabBarInactiveTintColor: 'grey'
          }}
        />
        <TabStack.Screen
          name="Transactions"
          component={Transactions}
          options={{
            title: 'Pagos',
            headerTintColor: 'rgb(80,80,180)',
            tabBarActiveTintColor: 'rgb(80,80,180)',
            tabBarInactiveTintColor: 'grey'
          }}
        />
        <TabStack.Screen
          name="Send"
          component={SendTip}
          options={{
            title: 'Perfil empresa',
            headerTintColor: 'rgb(80,80,180)',
            tabBarActiveTintColor: 'rgb(80,80,180)',
            tabBarInactiveTintColor: 'grey'
          }}
        />
      </TabStack.Navigator>
    )
  }
  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged(async function onAuthStateChanged(user) {
        if (user) {
          setUser(user)
          console.log('In App.js')
          const userData = await getUserById(user.uid)
          if (userData) {
            console.log('userData', userData)
            //Alert.alert(JSON.stringify(userData))
            setUser({
              ...user,
              userData: userData,
              userId: userData.userId,
              stripe_account_id: userData.stripe_account_id
            })
          }

          // Update is verified context
          if (!userData) {
            setIsVerified(false)
            return
          }

          if (userData.is_verified) {
            setIsVerified(true)
          } else {
            setIsVerified(false)
          }

          if (userData.is_waiter_verified) {
            setIsWaiterVerified(true)
          } else {
            setIsWaiterVerified(false)
          }

          if (userData.returned) {
            setReturned(true)
          } else {
            setReturned(false)
          }
        }
      })
    })()
  }, [])

  let [fontsLoaded] = useFonts({
    light: Montserrat_300Light,
    normal: Montserrat_400Regular,
    bold: Montserrat_700Bold,
    'semi-bold': Montserrat_600SemiBold,
    black: Montserrat_900Black
  })
  // if (!fontsLoaded) {
  //   return <View />
  // }
  return (
    <StripeProvider
      publishableKey="pk_test_51KCOGTBOp8yM0GoXJrc0LJopXnSJC22dnODyMHn7FXhtHPkDe1bDtstSZZ3LeLb8jAkuq6sj56nzV3MWVwPU23y200ZWHcP1ed"
      merchantIdentifier="merchant.com.stripe.react.native"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <AuthContext.Provider value={{ user, logout }}>
        <StripeConnectConfirmContext.Provider value={isVerified}>
          <StripeWaiterConnectConfirmContext.Provider value={isWaiterVerified}>
            <StripeReturnContext.Provider value={isReturned}>
              <NavigationContainer>
                <AppStack.Navigator 
                  initialRouteName="Splash"
                >
                  <AppStack.Screen
                    name="Splash"
                    options={{
                      headerShown: false
                    }}
                    component={Splash}
                  />
                  <AppStack.Screen
                    name="TermAndCond"
                    options={{
                      headerShown: false
                    }}
                    component={TermAndCondition}
                  />
                  <AppStack.Screen
                    name="Privacy"
                    options={{
                      headerShown: false
                    }}
                    component={PrivacyPolicy}
                  />
                  <AppStack.Screen
                    name="Welcome"
                    options={{
                      headerShown: false
                    }}
                    component={LandingScreen}
                  />
                  <AppStack.Screen
                    name="Login"
                    options={{
                      headerShown: false
                    }}
                    component={LoginScreen}
                  />
                   <AppStack.Screen
                    name="ForgotPassword"
                    options={{
                      headerShown: false
                    }}
                    component={ForgotPassword}
                  />
                  <AppStack.Screen
                    name="OtpScreen"
                    options={{
                      headerShown: false
                    }}
                    component={OtpScreen}
                  />
                   <AppStack.Screen
                    name="SetNewPasswordScreen"
                    options={{
                      headerShown: false
                    }}
                    component={SetNewPasswordScreen}
                  />
                  <AppStack.Screen
                    name="Signup"
                    options={{
                      headerShown: false
                    }}
                    component={SignupScreen}
                  />
                  <AppStack.Screen
                    name="Home"
                    options={{
                      headerShown: false
                    }}
                    component={TabScreens}
                  />
                  <AppStack.Screen
                    name="Connect"
                    options={{
                      title: 'Conectar a stripe',
                      headerTintColor: 'white',
                      headerStyle: {
                        backgroundColor: 'rgb(80,80,180)'
                      }
                    }}
                    component={Connect}
                  />
                  <AppStack.Screen
                    name="ConnectWaiter"
                    options={{
                      title: 'Conectar a stripe',
                      headerTintColor: 'white',
                      headerStyle: {
                        backgroundColor: 'rgb(80,80,180)'
                      }
                    }}
                    component={ConnectWaiter}
                  />
                  <AppStack.Screen
                    name="HistoryPayment"
                    options={{
                      title: 'Empleados',
                      headerTintColor: 'white',
                      headerStyle: {
                        backgroundColor: 'rgb(80,80,180)'
                      }
                    }}
                    component={HistoryPayment}
                  />
                  <AppStack.Screen
                    name="GoogleBusiness"
                    options={{
                      title: 'Google my business',
                      headerTintColor: 'white',
                      headerStyle: {
                        backgroundColor: 'rgb(80,80,180)'
                      }
                    }}
                    component={GoogleBusiness}
                  />
                </AppStack.Navigator>
              </NavigationContainer>
            </StripeReturnContext.Provider>
          </StripeWaiterConnectConfirmContext.Provider>
        </StripeConnectConfirmContext.Provider>
      </AuthContext.Provider>
    </StripeProvider>
  )
}
