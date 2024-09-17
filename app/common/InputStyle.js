import React from "react";
import { StyleSheet, TextInput } from "react-native";

function InputStyle({
  style,
  onValueChange,
  value,
  placeholder,
  keyboardType,
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onValueChange}
      value={value}
      placeholder={placeholder || "Enter text"}
      keyboardType={keyboardType || "default"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default InputStyle;
