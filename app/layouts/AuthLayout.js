import React from "react";
import { StyleSheet, View, Image, Platform, StatusBar } from "react-native";

import TextStyle from "../common/TextStyle";
import InputStyle from "../common/InputStyle";

function AuthLayout({ icon, children }) {
  return (
    <View style={styles.authLayout}>
      <View style={styles.authContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  authLayout: {
    backgroundColor: "#F0E8FA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
});

export default AuthLayout;
