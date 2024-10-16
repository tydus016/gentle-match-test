import React from "react";
import { StyleSheet, View, Image } from "react-native";

import AuthLayout from "../layouts/AuthLayout";
import AuthHeader from "../common/AuthHeader";
import AuthTextInput from "../common/AuthTextInput";
import AuthButton from "../common/AuthButton";

function ResetPassword(props) {
  return (
    <AuthLayout>
      <AuthHeader title="Reset your password" />

      <View style={styles.authContent}>
        <AuthTextInput placeholder="Enter your email" />

        <AuthButton btnStyle={styles.btnStyle}>Continue</AuthButton>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
    authContent: {
        alignItems: "center",
    },
  btnStyle: {
    marginTop: 50,
  },
});

export default ResetPassword;
