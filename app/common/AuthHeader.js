import React from "react";
import { StyleSheet, View, Image } from "react-native";
import TextStyle from "../common/TextStyle";

function AuthHeader({ icon, title }) {
  return (
    <View style={styles.authHeader}>
      <Image
        source={icon || require("../../assets/images/unlock-lock.png")}
        style={styles.authIcon}
      />

      <TextStyle style={styles.authTitle}>
        {title || "Reset your password"}
      </TextStyle>
    </View>
  );
}

const styles = StyleSheet.create({
  authHeader: {
    marginTop: 100,
    alignItems: "center",
  },
  authIcon: {
    width: 61,
    height: 69
  },
  authTitle: {
    marginTop: 50,
    marginBottom: 50,
    color: "#B56277",
    fontSize: 30,
    fontFamily: "Regular"
  }
});

export default AuthHeader;
