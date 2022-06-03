import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import PlusIcon from '../../assets/svg/plus'
import { AuthContext, StripeConnectConfirmContext } from '../../AuthContext'
import { db } from '../../firebase'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import DeleteIcon from '../../assets/svg/delete'
import CalendarIcon from '../../assets/svg/calendar'
import WaiterIcon from '../../assets/svg/waiter'
import { getDefaultHeaderHeight } from '@react-navigation/elements'
import {
  useSafeAreaFrame,
  useSafeAreaInsets
} from 'react-native-safe-area-context'
import { deleteUser, getAllWaiters, updateUser } from '../APIs'

function Waiter({ navigation }) {
  var { user } = useContext(AuthContext)
  var isVerified = useContext(
    StripeConnectConfirmContext && StripeConnectConfirmContext
  )
  var [waiterList, setWaiterList] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getWaiters()
    })
    return unsubscribe
  }, [])

  const getWaiters = async () => {
    if (user?.uid) {
      const waiterList = await getAllWaiters(user.uid)
      if (waiterList && waiterList.length === 0) {
        console.log('No matching documents.')
        setWaiterList([])
        return
      }
      setWaiterList(waiterList)
    }
  }

  const addWaiterUser = () => {
    const uid = uuidv4()

    navigation.navigate('StripeScreen', { uid })
  }

  const gotoWaiterDetails = async (uid) => {
    navigation.navigate('StripeScreen', { uid })
  }

  const deleteWaiterUser = (uid) => {
    Alert.alert('Alerta', '¿Estás seguro de que desea eliminar el Empleado?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Aceptar',
        onPress: async () => {
          await deleteUser(uid)
          getWaiters()
        }
      }
    ])
  }

  const frame = useSafeAreaFrame()
  const insets = useSafeAreaInsets()
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top)

  return (
    <SafeAreaView style={{ flex: 1, width: '100%', alignItems: 'center' }}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'rgb(80,80,180)',
          height: headerHeight,
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            color: '#fff',
            marginLeft: 10,
            fontSize: 22,
            marginTop: insets.top,
            fontFamily: 'bold'
          }}
        >
          Empleados
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        {waiterList?.length > 0 && (
          <View style={styles.container}>
            {waiterList?.map((curr, index) => {
              return (
                <View key={index} style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => gotoWaiterDetails(curr?.uid)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '80%'
                    }}
                  >
                    <View
                      style={{
                        ...styles.icon,
                        backgroundColor: '#5faa2b'
                      }}
                    >
                      <WaiterIcon width={25} height={25} color="white" />
                    </View>
                    <View>
                      <Text style={styles.detailTextTop}>{curr?.name}</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ width: 40, height: 40, marginRight: 10 }}
                    onPress={() => deleteWaiterUser(curr.uid)}
                  >
                    <DeleteIcon color={'#db1b24'} />
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
        )}
        {isVerified && isVerified ? (
          <View style={{ padding: 24, width: '100%', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ width: 50, height: 50 }}
              onPress={() => addWaiterUser()}
            >
              <PlusIcon color={'black'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%'
            }}
          >
            <Text style={{ textAlign: 'center' }}>
              Necesitas conectarte a stripe antes de poder crear algún empleado
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    height: 70,
    padding: 6
  },
  icon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 10
  },
  detailTextTop: {
    fontFamily: 'bold',
    fontSize: 16
  },
  detailTextBottom: {
    fontFamily: 'semi-bold'
  },
  spacer: {
    flex: 1
  },
  amount: {
    fontFamily: 'bold',
    fontSize: 24
  }
})

export default Waiter
