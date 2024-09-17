import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import colors from "../configs/colors";
import Navbar from "./Navbar";

function Container(props) {
  const showNavbar = props.showNavbar || true;
  const showSearchIcon = props.showSearchIcon || false;

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.white,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    navbar: {
      backgroundColor: colors.primary,
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      gap: 25,
    },
    pageTitleTxt: {
      color: colors.white,
      fontSize: 23,
      fontFamily: "Bold",
    },
    ...props.style,
  });

  return (
    <SafeAreaView style={styles.container}>
      {showNavbar && (
        <Navbar
          showSearchIcon={showSearchIcon}
          onMenuClick={props.onMenuClick}
          onSearchClick={props.onSearchClick}
        >
          {props.screenTitle}
        </Navbar>
      )}

      {props.children}
    </SafeAreaView>
  );
}

export default Container;
