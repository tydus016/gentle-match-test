import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import colors from "../configs/colors";
import navItems from "../../assets/dummy/navItems.json";

import TextStyle from "./TextStyle";
import Icon from "./Icon";

const listItemRender = ({ item }) => (
  <TouchableOpacity style={styles.navItem}>
    <View style={styles.navItemTitle}>
      <Icon type="EvilIcons" size={25} name={item.icon} />
      <TextStyle style={styles.navItemTitleTxt}>{item.title}</TextStyle>
    </View>

    {item.showBadge && (
      <View style={styles.navBadge}>
        <TextStyle style={styles.navBadgeTxt}>2</TextStyle>
      </View>
    )}
  </TouchableOpacity>
);

const SidebarDrawer = () => {
  return (
    <View style={styles.drawerContainer}>
      {/* company tag line area */}
      <View style={styles.tagLineArea}>
        <Image
          style={styles.compImageIcon}
          source={{ uri: "https://via.placeholder.com/50" }}
        />

        <View style={styles.tagLineTextArea}>
          <TextStyle style={styles.taglineTitle}>EdsTech</TextStyle>
          <TextStyle style={styles.taglineSubTitle}>POS Software</TextStyle>
        </View>
      </View>

      {/* nav items */}
      <View style={styles.listItems}>
        <FlatList
          data={navItems}
          renderItem={listItemRender}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    height: "100%",
    width: 250,
    position: "absolute",
    left: 0,
    zIndex: 2,
    backgroundColor: colors.white,

    // - ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // - android
    elevation: 3,
  },
  tagLineArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    padding: 10,
  },
  compImageIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  tagLineTextArea: {},
  taglineTitle: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  taglineSubTitle: {
    fontFamily: "Medium",
    fontSize: 16,
  },

  listItems: {
    padding: 10,
  },

  navItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
  },

  navItemTitle: {
    flexDirection: "row",
    gap: 10,
  },
  navItemTitleTxt: {
    fontFamily: "Medium",
    fontSize: 20,
  },

  navBadge: {
    backgroundColor: colors.primary,
    width: 25,
    height: 25,
    borderRadius: 100,
    padding: 5,
  },
  navBadgeTxt: {
    fontFamily: "Bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SidebarDrawer;
