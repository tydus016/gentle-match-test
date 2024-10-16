import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import TextStyle from "../common/TextStyle";

import colors from "../configs/colors";

function AuthButton({
  children = "Continue",
  btnStyle,
  btnTextStyle,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={[styles.btnStyle, btnStyle]} onPress={onPress}>
      <TextStyle style={[styles.btnTextStyle, btnTextStyle]}>
        {children}
      </TextStyle>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#BFE2FF",
    width: 252,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTextStyle: {
    fontWeight: 400,
    fontFamily: "Regular",
    fontSize: 35,
  },
});

export default AuthButton;
