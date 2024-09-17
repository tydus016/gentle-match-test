import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import colors from "../configs/colors";
import TextStyle from "./TextStyle";

function VariantButton({ onPress, btnStyle, txtStyle, children }) {
  const onBtnClick = () => {
    if (onPress === undefined || typeof onPress.onClose !== "function") return;
    onPress();
  };

  return (
    <TouchableOpacity onPress={onPress || onBtnClick} style={[btnStyle]}>
      <TextStyle numberOfLines={2} style={styles.varName}>
        {children}
      </TextStyle>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  variant: {
    backgroundColor: colors.lightGray,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  activeVariant: {
    backgroundColor: colors.primary,
  },
  varName: {
    fontFamily: "Medium",
    fontSize: 16,
  },
});

export default VariantButton;
