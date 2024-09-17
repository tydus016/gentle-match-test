import React from "react";
import { View, StyleSheet } from "react-native";

function FormArea(props) {
  const styles = StyleSheet.create({
    formArea: {
      width: "100%",
      paddingHorizontal: 20,
    },
  });

  if (props.style !== undefined) {
    styles.formArea = {
      ...styles.formArea,
      ...props.style,
    };
  }

  return <View style={styles.formArea}>{props.children}</View>;
}

export default FormArea;
