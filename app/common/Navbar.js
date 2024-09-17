import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../configs/colors";
import { TABS } from "../configs/constants";

import Icon from "./Icon";
import TextStyle from "./TextStyle";

import { useSelector, useDispatch } from "react-redux";

import { setTab, resetTab } from "../store/store";

function Navbar(props) {
  const dispatch = useDispatch();

  const [menuState, setMenuState] = React.useState(false);
  const [searchState, setSearchState] = React.useState(false);

  const currentTab = useSelector((state) => state.tabToggle.value.current);

  const onMenuClick = () => {
    setMenuState(!menuState);

    props.onMenuClick();
  };

  const onSearchClick = () => {
    if (currentTab === TABS.searchItems) {
      dispatch(resetTab());
      return;
    }

    dispatch(setTab("searchItems"));
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onMenuClick}>
        {menuState && (
          <Icon
            type="AntDesign"
            name="menu-unfold"
            color={colors.white}
            size={50}
          />
        )}

        {!menuState && (
          <Icon
            type="MaterialCommunityIcons"
            name="menu"
            color={colors.white}
            size={50}
          />
        )}
      </TouchableOpacity>

      <TextStyle style={styles.pageTitleTxt}>
        {props.children || "Screen Title"}
      </TextStyle>

      {props.showSearchIcon && (
        <View style={styles.searchIcon}>
          <TouchableOpacity onPress={onSearchClick}>
            <Icon
              type="MaterialIcons"
              name={currentTab === TABS.searchItems ? "search-off" : "search"}
              color={colors.white}
              size={50}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: colors.primary,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    position: "relative",
  },
  pageTitleTxt: {
    color: colors.white,
    fontSize: 23,
    fontFamily: "Bold",
  },

  searchIcon: {
    position: "absolute",
    top: 0,
    zIndex: 1,
    right: 0,
  },
});

export default Navbar;
