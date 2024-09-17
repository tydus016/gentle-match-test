import React from "react";
import { StyleSheet, View } from "react-native";

function Separator(props) {
  const styles = StyleSheet.create({
    separatorContainer: {
      width: props.width ? props.width : "100%",
      alignItems: props.alignItems ? props.alignItems : "center",
      marginTop: props.marginTop ? props.marginTop : 0,
      ...props.style,
    },
    separator: {
      width: props.width ? props.width : "80%",
      height: props.height ? props.height : 1.5,
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : "#cccccc",
      ...props.style,
    },
  });

  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
    </View>
  );
}

export default Separator;
