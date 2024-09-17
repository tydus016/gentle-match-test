import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function FormFilePicker(props) {
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

  return (
    <TouchableOpacity style={styles.formInput} onPress={props.onClick}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  );
}

export default FormFilePicker;
