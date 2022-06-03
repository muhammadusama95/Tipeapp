import React, { useState, useImperativeHandle } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

const LongButton = React.forwardRef((props, ref) => {
  const {
    text,
    textstyle,
    style,

    Activity,

    font,
  } = props;

  const [act, setact] = useState({ act: Activity, col: "BTN_DEFAULT_TXT" });

  useImperativeHandle(ref, () => ({
    SetActivity(ibool, col = "BTN_DEFAULT_TXT") {
      setact({ act: ibool, col: col });
    },
    GetActivity() {
      return act.act;
    },
  }));

  const styles = StyleSheet.create({
    Button: {
      width: width * 0.5,
      height: height * 0.08,
      backgroundColor: Colors.BTN_DEFAULT_BG,
      alignSelf: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    Text: {
      color: Colors.BTN_DEFAULT_TXT,
      fontSize: font || 16,
      alignSelf: "center",
      fontFamily: "Urbanist Regular",
    },
  });

  const buttonStyles = [styles.Button, style];

  const TextStyle = [styles.Text, textstyle];

  const GetData = () => {
    return !act.act ? (
      <Text style={TextStyle}>{text}</Text>
    ) : (
      <ActivityIndicator size="large" color={Colors[act.col]} />
    );
  };

  return (
    <TouchableOpacity {...props} style={buttonStyles}>
      {GetData()}
    </TouchableOpacity>
  );
});

export default LongButton;
