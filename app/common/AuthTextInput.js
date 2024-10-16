import React from "react";
import { StyleSheet, TextInput } from "react-native";

function AuthTextInput({
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
    height: 69,
    width: 357,
    margin: 12,
    borderWidth: 1,
    padding: 25,
    borderRadius: 30,
    borderBlockColor: "#958989"
  },
});

export default AuthTextInput;
