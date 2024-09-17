import React from "react";

import { TextInput, StyleSheet } from "react-native";
import colors from "../../config/colors";

function FormInput(props) {
  const styles = StyleSheet.create({
    formInput: {
      height: 40,
      margin: 12,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderWidth: 1,
      padding: 10,
      color: colors.black,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
    },
  });

  const config = {
    placeholderTextColor:
      props.placeholderTextColor !== undefined
        ? props.placeholderTextColor
        : colors.black,
    onChangeText: props.onChangeText !== undefined ? props.onChangeText : null,
    value: props.value !== undefined ? props.value : null,
    placeholder: props.placeholder !== undefined ? props.placeholder : null,
    secureTextEntry:
      props.secureTextEntry !== undefined ? props.secureTextEntry : false,
    keyboardType:
      props.keyboardType !== undefined ? props.keyboardType : "default",
  };

  return (
    <TextInput
      placeholderTextColor={config.placeholderTextColor}
      style={styles.formInput}
      onChangeText={config.onChangeText}
      value={config.value}
      placeholder={config.placeholder}
      secureTextEntry={config.secureTextEntry}
      keyboardType={config.keyboardType}
    />
  );
}

export default FormInput;
