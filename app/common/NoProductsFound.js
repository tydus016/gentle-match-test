import React from "react";
import { StyleSheet, View } from "react-native";

import TextStyle from "../common/TextStyle";
import colors from "../configs/colors";
import Icon from "../common/Icon";

function NoProductsFound({ content }) {
  return (
    <View style={styles.notFoundContainer}>
      <View style={styles.msgContainer}>
        <Icon type="AntDesign" name="meh" size={100} color={colors.primary} />

        <TextStyle style={styles.msgText} numberOfLines={2}>
          {content || "No products available."}
        </TextStyle>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  msgContainer: {
    alignItems: "center",
    gap: 10,
  },
  msgText: {
    fontFamily: "Medium",
    fontSize: 25,
    color: colors.primary,
  },
});

export default NoProductsFound;
