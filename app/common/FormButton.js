import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../../config/colors";

function FormButton(props) {
  const styles = StyleSheet.create({
    formBtn: {
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: "center",
      padding: 10,
      marginTop: 25,
    },
    formBtnText: {
      color: colors.white,
      textTransform: "uppercase",
      fontSize: 18,
      fontWeight: "600",
    },
  });

  return (
    <TouchableOpacity style={styles.formBtn} onPress={props.onClick}>
      <Text style={styles.formBtnText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

export default FormButton;
