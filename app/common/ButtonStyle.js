import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import TextStyle from "../common/TextStyle";

import colors from "../configs/colors";

function ButtonStyle({ children, onPress, btnStyle, txtStyle }) {
  const onBtnClick = () => {
    if (onPress === undefined || typeof onPress.onClose !== "function") return;

    onPress();
  };

  return (
    <TouchableOpacity style={[btnStyle, styles.button]} onPress={onBtnClick}>
      <TextStyle style={[txtStyle, styles.btnText]}>{children}</TextStyle>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: colors.primary,
  },
  btnText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "Bold",
    textTransform: "uppercase",
    fontSize: 20,
  },
});

export default ButtonStyle;
