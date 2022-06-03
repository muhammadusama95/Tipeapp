import { FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native'
import CalendarIcon from '../../assets/svg/calendar'
import { AuthContext } from '../../AuthContext'
import { db } from '../../firebase'
import 'moment/min/locales'
import axios from 'axios'
import { handlePaymentHistory, updateUserTransaction } from '../APIs'
import { API_URL } from '../constants/Urls'

moment.locale('es')
function HistoryPayment({ navigation, route }) {
  var { user } = useContext(AuthContext)
  var [transactions, setTransactions] = useState([])
  var [loading, setLoading] = useState(null)
  var [mainLoading, setMainLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const wuid = route?.params?.uid
  const paymentIntentConfirm = async (payment_intent) => {
    try {
      // const response = await axios.post(
      //   `${API_URL}/paymentIntentConfirm`,
      //   {
      //     payment_intent: payment_intent
      //   }
      // )
      // if (response.status != 200) throw response.data
      // const response_data = response.data
      // return response_data
    } catch (error) {
      // console.warn('error', error)
    }
  }

  useEffect(() => {
    ;(async () => {
      console.log("wuid",wuid)
      setMainLoading(true)
      setIsMounted(true)
      const list = await handlePaymentHistory(wuid)
      if (list && list.length > 0) {
        var _transactions = list
          .map((curr) => curr)
          .sort((curr, next) => Number(next.time) - Number(curr.time))
        isMounted && setTransactions(_transactions)
        isMounted && setMainLoading(false)
      }
    })()
    // return () => {
    //   unsubscribe()
    //   setIsMounted(false)
    // }
  }, [])

  const refund = async (payment_intent, index, uid) => {
    setLoading(index)
    try {
      const res = await axios
        .post(`${API_URL}/refund`, {
          payment_intent: payment_intent
        })
        .then((response) => response.data)
      if (res.success) {
        await updateUserTransaction(wuid, uid, {
          refund: true,
          refundId: res.refunds
        })
        setLoading(null)
        Alert.alert('Éxito', 'Has reembolsado con éxito!', [
          {
            text: 'Aceptar',
            style: 'cancel'
          }
        ])
      } else {
        setLoading(null)
        Alert.alert(
          'Error',
          'Algo salió mal. Por favor, vuelva a intentarlo!',
          [
            {
              text: 'Aceptar',
              style: 'cancel'
            }
          ]
        )
      }
    } catch (error) {
      setLoading(null)
      Alert.alert('Error', 'Algo salió mal. Por favor, vuelva a intentarlo!', [
        {
          text: 'Aceptar',
          style: 'cancel'
        }
      ])
    }
  }

  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  if (mainLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={'rgb(80,80,180)'} size={'large'} />
      </View>
    )
  }
  return (
    <ScrollView>
      {transactions.length === 0 && (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontFamily: 'semi-bold', color: '#000' }}>
            No hay transacciones hechas
          </Text>
        </View>
      )}
      {transactions.length > 0 && (
        <View style={styles.container}>
          {transactions.map(function mapping(curr, index) {
            return (
              <View key={index} style={styles.listItem}>
                <View
                  style={{
                    ...styles.icon,
                    backgroundColor: curr.from == user.uid ? 'purple' : 'green'
                  }}
                >
                  {curr.from == user.uid ? (
                    <CalendarIcon width={25} height={25} color="white" />
                  ) : (
                    <CalendarIcon width={25} height={25} color="white" />
                  )}
                </View>
                {/* <View style={styles.details}>
                  <Text style={styles.detailTextTop}>
                    {curr.sender?.split("@")[0]}
                  </Text>
                </View> */}
                <View style={styles.line} />
                <Text
                  style={{
                    ...styles.amount
                  }}
                >
                  €{parseFloat(curr.amount).toFixed(1)}
                </Text>
                <View style={styles.line} />
                <Text style={styles.detailTextBottom}>
                  {moment(curr.time).format('LLLL')}
                </Text>
                <View style={styles.line} />
                <TouchableOpacity
                  disabled={curr?.refund}
                  onPress={() =>
                    loading === index
                      ? console.log('')
                      : refund(curr?.paymentIntent, index, curr.uid)
                  }
                  style={{
                    width: 80,
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    borderRadius: 5,
                    backgroundColor: 'rgb(80,80,180)',
                    opacity: curr?.refund ? 0.5 : 1
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'normal',
                      color: '#fff'
                    }}
                  >
                    {loading === index ? (
                      <ActivityIndicator color={'#fff'} />
                    ) : curr?.refund ? (
                      'Reintegrada'
                    ) : (
                      'Reembolso'
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
      )}
    </ScrollView>
  )
}

var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginRight: 5
  },
  detailTextTop: {
    fontFamily: 'bold',
    fontSize: 13
  },
  detailTextBottom: {
    fontFamily: 'semi-bold',
    fontSize: 11,
    width: 80,
    textAlign: 'center'
  },
  spacer: {
    flex: 1
  },
  amount: {
    fontFamily: 'bold',
    fontSize: 14,
    color: 'black'
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: 'lightgrey'
  }
})

export default HistoryPayment
