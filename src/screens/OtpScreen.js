import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Snackbar } from "react-native-paper";
import Colors from '../constants/Colors';

const OtpScreen = ({ route, navigation }) => {
    const [key, setKey] = useState(0)
    const [showTimer, setShowTimer] = useState(true)
    const [isShow, setIsShow] = useState(false)
    const [snackText, setSnackText] = useState("")
    const { passEmail } = route.params;

    const resendEmail = () => {
        fetch(`https://rakamtech.com/timeapp/?action=sendEmail&email=${passEmail}`)
      .then(response =>response.text())
      .then(data => {
        console.log(data);
        setShowTimer(true)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    const onOTPSubmit = async(code) =>{
        
        
       await fetch(`https://rakamtech.com/timeapp/?action=validateOTP&email=${passEmail}&otp=${code}`)
      .then(response =>response.json())
      .then(data => {
        if(data === "success"){
            navigation.navigate("SetNewPasswordScreen", {email: passEmail, otp: code})
        }else{
            Alert.alert("Alert!", "Invalid Code!");
        }

      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
    }

    return (

        <View style={{ flex: 1 }}>
            <Text style={{ marginLeft: wp(10), marginTop: wp(15) }}>
                Ingrese el código de 6 dígitos recibido en su correo electrónico
            </Text>

            <OTPInputView
                style={{ width: "80%", height: wp(30), alignSelf: "center", }}
                pinCount={6}
                //code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    console.log(code)
                    onOTPSubmit(code)
                }}
            />
            <View style={{ marginTop: wp(4), height: wp(15), alignItems: 'center', justifyContent: 'center' }}>
                {showTimer ? <CountdownCircleTimer
                    isPlaying={true}
                    duration={99}
                    colors={Colors.TEXT_SUCCESS}
                    size={40}
                    strokeWidth={5}
                    onComplete={() => {
                        setShowTimer(false)
                        return { shouldRepeat: false, delay: 1 }
                    }}
                    updateInterval={1}
                    newInitialRemainingTime={99}
                    key={key}
                >
                    {({ remainingTime }) => <Text style={{ fontSize: wp(3.5) }}>{remainingTime}</Text>}
                </CountdownCircleTimer> :
                    <View style={{ width: wp(80) }} >
                        <Text onPress={resendEmail} >Otp caducado!</Text>
                    </View>
                }
            </View>

            <Text style={{ marginLeft: wp(10), marginTop: wp(10) }}>
                ¿No recibiste el código? <Text style={{ color: Colors.TEXT_SUCCESS }} onPress={() => { console.log("s") }}>Reenviar</Text>
            </Text>

            {isShow &&
                <Snackbar
                    style={{ alignSelf: "center", }}
                    visible={isShow}
                    onDismiss={() => setIsShow(false)}
                    action={{
                        label: "OKAY",
                        onPress: () => setIsShow(false)
                    }}
                >
                    {snackText}
                </Snackbar>
            }
        </View>
    );
};
export default OtpScreen;

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45,
    },
    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 2,
        backgroundColor: '#b4b4b4',
    },
    underlineStyleHighLighted: {
        borderColor: Colors.TEXT_SUCCESS,
    },
});
