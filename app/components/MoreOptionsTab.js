import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  resetQty,
  resetSize,
  resetVariant,
  resetSelectedItem,
  setIsEditing,
  resetTab,
  setTab,
  clearOrderItems,
} from "../store/store";

import Icon from "../common/Icon";
import TextStyle from "../common/TextStyle";
import ModalDialog from "../common/ModalDialog";

import colors from "../configs/colors";
import { ORDER_MORE_OPTIONS as moreOptions, TABS } from "../configs/constants";
import options from "../../assets/ListsOptions/moreOptionsItem.json";

function MoreOptionsTab({ data, onBackPress, onAddOrderPress }) {
  const dispatch = useDispatch();

  const [modalOptions, setModalOptions] = useState({});
  const [modalState, setModalState] = useState(false);
  const [modalTxt, setModalTxt] = useState(null);

  const onItemTabClose = () => {
    dispatch(resetQty());
    dispatch(resetSize());
    dispatch(resetVariant());
    dispatch(resetSelectedItem());
    dispatch(setIsEditing(false));
    dispatch(resetTab());

    onBackPress();
  };

  const onOptionSelect = (item) => {
    switch (item.name) {
      case moreOptions.ApplyCoupon:
        dispatch(setTab(TABS.applyCoupon));
        break;
      case moreOptions.ClearOrderLists:
        onClearOrderLists();
        break;

      default:
        break;
    }
  };

  const onClearOrderLists = () => {
    setModalTxt("Are you sure you want to clear the order list?");
    setModalState(true);

    setModalOptions({
      onCancel: () => {
        setModalState(false);
      },
      onOk: () => {
        dispatch(clearOrderItems());
        onItemTabClose();
      },
    });
  };

  const listItemRender = ({ item }) => (
    <TouchableOpacity
      style={styles.navItem}
      onPress={() => onOptionSelect(item)}
    >
      <View style={styles.navItemTitle}>
        <Icon type="Ionicons" size={25} name={item.icon} />
        <TextStyle style={styles.navItemTitleTxt}>{item.title}</TextStyle>
      </View>

      {item.showBadge && (
        <View style={styles.navBadge}>
          <TextStyle style={styles.navBadgeTxt}>2</TextStyle>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.listedItemsContainer}>
      <View style={styles.liHeader}>
        <View style={styles.liHeaderTxt}>
          <TouchableOpacity onPress={onItemTabClose}>
            <Icon size={25} type="Ionicons" name="arrow-back-outline" />
          </TouchableOpacity>

          <TextStyle numberOfLines={1} style={styles.liHeaderTitle}>
            More Options
          </TextStyle>
        </View>
      </View>

      <View style={styles.listItems}>
        <FlatList
          data={options}
          renderItem={listItemRender}
          keyExtractor={(item) => item.id}
        />
      </View>

      {modalState && (
        <ModalDialog callbacks={modalOptions} message={modalTxt} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listedItemsContainer: {
    width: "30%",
    height: "100%",
  },
  liHeader: {
    width: "100%",
    height: 50,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,
    justifyContent: "space-between",

    // - ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // - android
    elevation: 3,
  },
  liHeaderTxt: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 10,
  },
  liHeaderTitle: {
    fontFamily: "Medium",
    fontSize: 22,
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

export default MoreOptionsTab;
