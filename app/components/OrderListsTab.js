import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";

import Icon from "../common/Icon";
import TextStyle from "../common/TextStyle";
import ButtonStyle from "../common/ButtonStyle";

import colors from "../configs/colors";
import { formatNumber } from "../configs/global_helpers";

import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedItem,
  setIsEditing,
  setTab,
  resetTab,
} from "../store/store";

function OrderListsTab({ data, onItemSelect }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.orderItems.value);
  const orderSummary = useSelector((state) => state.orderSummary.value);

  const onEditItem = (item, index) => {
    console.log("Edit item: ", item);
    const Item = {
      index: index,
      id: item.itemId,
      ...item,
    };

    dispatch(setSelectedItem(Item));
    onItemSelect(Item);
    dispatch(setIsEditing(true));
  };

  const onMoreOptions = () => {
    dispatch(setTab("moreOptions"));
  };

  const OrderLists = ({ item, index }) => (
    <TouchableOpacity
      style={styles.orderItem}
      key={item.itemId}
      onPress={() => onEditItem(item, index)}
    >
      <View style={styles.orderItemName}>
        <TextStyle style={styles.orderItemNameTxt}>
          {item.itemTitle}{" "}
          <TextStyle style={styles.orderItemNameQty}>
            x {item.quantity}
          </TextStyle>
        </TextStyle>
        <TextStyle style={styles.orderItemNameQty}>
          {item.variant}
          {item.size && ", " + item.size}
        </TextStyle>
      </View>

      <View style={styles.orderItemPrice}>
        {item.is_on_sale && (
          <Icon
            size={18}
            name="tag-outline"
            type="MaterialCommunityIcons"
            color={colors.gray}
          />
        )}

        <TextStyle style={styles.orderItemNamePrice}>
          ${formatNumber(item.price)}
        </TextStyle>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listedItemsContainer}>
      <View style={styles.liHeader}>
        <View>
          <TextStyle style={styles.liHeaderTitle}>Order</TextStyle>
        </View>

        <TouchableOpacity
          style={styles.liHeaderOptions}
          onPress={onMoreOptions}
        >
          <Icon size={25} type="Ionicons" name="ellipsis-vertical" />
        </TouchableOpacity>
      </View>

      {/* order items loop */}
      <View style={styles.listItems}>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <OrderLists item={item} index={index} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>

      {/* order summary */}
      <View style={styles.summaryItems}>
        <View style={styles.orderItem}>
          <TextStyle style={styles.orderSummaryTitle}>Discount</TextStyle>

          <TextStyle style={styles.orderSummaryPrice}>
            - ${formatNumber(orderSummary.discount)}
          </TextStyle>
        </View>

        <View style={styles.orderItem}>
          <TextStyle style={styles.orderSummaryTitle}>Tax</TextStyle>

          <TextStyle style={styles.orderSummaryPrice}>
            ${formatNumber(orderSummary.tax)}
          </TextStyle>
        </View>
      </View>

      {/* order total */}
      <View style={styles.orderTotal}>
        <View style={styles.orderItem}>
          <TextStyle style={styles.orderSummaryTitle}>Total</TextStyle>

          <TextStyle style={styles.orderTotalPrice}>
            ${formatNumber(orderSummary.total)}
          </TextStyle>
        </View>
      </View>

      {/* action buttons */}
      <View style={styles.orderActions}>
        <View style={styles.successActions}>
          <ButtonStyle
            btnStyle={styles.orderBtnSave}
            txtStyle={styles.orderBtnText}
          >
            Save
          </ButtonStyle>

          <ButtonStyle
            btnStyle={styles.orderBtnProceed}
            txtStyle={styles.orderBtnText}
          >
            Proceed
          </ButtonStyle>
        </View>

        <View style={styles.failActions}>
          <ButtonStyle
            btnStyle={styles.orderBtnVoid}
            txtStyle={styles.orderBtnText}
          >
            Void Order
          </ButtonStyle>
        </View>
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
    justifyContent: "space-between",
    flexWrap: "nowrap",
    borderBottomWidth: 3,
    borderBottomColor: colors.lightGray,

    // - ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,

    // - android
    elevation: 3,
  },

  listItems: {
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    height: "50%",
  },
  liHeaderTitle: {
    fontFamily: "Medium",
    fontSize: 22,
  },

  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
    padding: 10,
  },

  orderItemPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  orderItemName: {
    gap: 5,
  },
  orderItemNameTxt: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  orderItemNameQty: {
    fontFamily: "Medium",
    fontSize: 18,
    color: colors.gray,
  },

  orderItemNamePrice: {
    fontFamily: "Medium",
    fontSize: 18,
  },

  orderSummaryTitle: {
    fontFamily: "Bold",
    fontSize: 18,
  },
  orderSummaryPrice: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  summaryItems: {
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
  },
  orderTotalPrice: {
    fontFamily: "Bold",
    fontSize: 18,
  },

  successActions: {
    width: "100%",
    flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: colors.success,
  },
  orderBtnSave: {
    padding: 10,
    width: "50%",
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
    backgroundColor: colors.success,
  },

  orderBtnProceed: {
    padding: 10,
    width: "50%",
    backgroundColor: colors.success,
  },
  orderBtnText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "Bold",
    textTransform: "uppercase",
    fontSize: 20,
  },

  orderBtnVoid: {
    padding: 10,
    backgroundColor: colors.danger,
  },
});

export default OrderListsTab;
