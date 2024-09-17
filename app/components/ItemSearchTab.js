import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
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
  setSelectedItem,
} from "../store/store";

import { formatNumber } from "../configs/global_helpers";
import { TABS } from "../configs/constants";

import Icon from "../common/Icon";
import TextStyle from "../common/TextStyle";
import InputStyle from "../common/InputStyle";

import colors from "../configs/colors";
import items from "../../assets/dummy/productItems.json";

function ItemSearchTab({ data, onBackPress, onAddOrderPress }) {
  const dispatch = useDispatch();

  const [itemSearch, setItemSearch] = useState("");

  const onSelectItem = (item) => {
    if (!item.attributes.is_on_stock) return;

    dispatch(setSelectedItem(item));
    dispatch(setTab(TABS.itemDetails));
  };

  const onItemTabClose = () => {
    dispatch(resetQty());
    dispatch(resetSize());
    dispatch(resetVariant());
    dispatch(resetSelectedItem());
    dispatch(setIsEditing(false));
    dispatch(resetTab());

    onBackPress();
  };

  const listItemRender = ({ item }) => (
    <TouchableOpacity style={styles.navItem} onPress={() => onSelectItem(item)}>
      <View style={styles.navItemTitle}>
        <Icon type="Ionicons" size={25} name={item.icon} />
        <View>
          <TextStyle style={styles.navItemTitleTxt}>{item.title}</TextStyle>
          <TextStyle style={styles.navItemTitleSubtitle}>
            ${formatNumber(item.price)}
          </TextStyle>
        </View>
      </View>

      <View
        style={[
          styles.navBadge,
          item.attributes.is_on_stock ? styles.inStock : styles.outOfStock,
        ]}
      >
        <TextStyle style={styles.navBadgeTxt} numberOfLines={1}>
          {item.attributes.is_on_stock ? "In Stock" : "Out of Stock"}
        </TextStyle>
      </View>
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
            Search Products
          </TextStyle>
        </View>
      </View>

      <View style={styles.formArea}>
        <InputStyle
          style={styles.itemSearchTxt}
          placeholder="Search products name, tag, category"
          value={itemSearch}
          onValueChange={setItemSearch}
        />
      </View>

      <View style={styles.listItems}>
        <FlatList
          data={items}
          renderItem={listItemRender}
          keyExtractor={(item) => item.id}
        />
      </View>
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

  formArea: {
    padding: 10,
  },
  itemSearchTxt: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBlockColor: colors.primary,
  },

  listItems: {
    paddingHorizontal: 10,
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
  navItemTitleSubtitle: {
    color: colors.gray,
    fontFamily: "Medium",
    fontSize: 16,
  },
  navBadge: {
    backgroundColor: colors.primary,
    width: 100,
    height: 25,
    borderRadius: 50,
    padding: 5,
  },
  inStock: {
    backgroundColor: colors.success,
  },
  outOfStock: {
    backgroundColor: colors.warning,
  },
  navBadgeTxt: {
    fontFamily: "Bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ItemSearchTab;
