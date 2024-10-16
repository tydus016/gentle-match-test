import React from "react";
import { Text, Vie, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import colors from "../configs/colors";

import OverlaySpinner from "./OverlaySpinner";

function TextStyle(props) {
  const [fontsLoaded] = useFonts({
    Thin: require("../libraries/fonts/Roboto-Thin.ttf"),
    RegularSerif: require("../libraries/fonts/RobotoSerif-Regular.ttf"),
    Regular: require("../libraries/fonts/Roboto-Regular.ttf"),
    Light: require("../libraries/fonts/Roboto-Light.ttf"),
    Bold: require("../libraries/fonts/Nunito-Bold.ttf"),
    Medium: require("../libraries/fonts/Nunito-Medium.ttf"),
  });

  const style = props.style || {};
  const styles = StyleSheet.create({
    text: {
      fontSize: 25,
      color: colors.black,
      ...style,
    },
  });

  if (!fontsLoaded) {
    return <OverlaySpinner visible={true} />;
  }

  return (
    <Text
      numberOfLines={
        props.numberOfLines !== undefined ? props.numberOfLines : 3
      }
      style={styles.text}
    >
      {props.children}
    </Text>
  );
}

export default TextStyle;
