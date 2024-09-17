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
import InputStyle from "../common/InputStyle";
import ButtonStyle from "../common/ButtonStyle";
import ModalDialog from "../common/ModalDialog";

import colors from "../configs/colors";
import { ORDER_MORE_OPTIONS as moreOptions, TABS } from "../configs/constants";

function ApplyCouponTab({ data, onBackPress, onAddOrderPress }) {
  const dispatch = useDispatch();

  const [modalOptions, setModalOptions] = useState({});
  const [modalState, setModalState] = useState(false);
  const [modalTxt, setModalTxt] = useState(null);

  const [couponCode, setCouponCode] = useState("");

  const onItemTabClose = () => {
    dispatch(setTab(TABS.moreOptions));
  };

  const onApplyCoupon = () => {
    console.log("Apply coupon: ", couponCode);
  };

  return (
    <View style={styles.listedItemsContainer}>
      <View style={styles.liHeader}>
        <View style={styles.liHeaderTxt}>
          <TouchableOpacity onPress={onItemTabClose}>
            <Icon size={25} type="Ionicons" name="arrow-back-outline" />
          </TouchableOpacity>

          <TextStyle numberOfLines={1} style={styles.liHeaderTitle}>
            Apply a Coupon
          </TextStyle>
        </View>
      </View>

      <View style={styles.formArea}>
        <InputStyle
          style={styles.CouponCodeTxt}
          placeholder="Enter coupon promo code"
          value={couponCode}
          onValueChange={setCouponCode}
        />

        <View style={styles.btnArea}>
          <ButtonStyle onPress={onApplyCoupon}>Apply Coupon</ButtonStyle>
        </View>
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

  formArea: {
    padding: 10,
  },

  CouponCodeTxt: {
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBlockColor: colors.primary,
  },

  //   btn
  btnArea: {
    width: "100%",
    paddingTop: 10,
  },
  orderBtnVoid: {
    padding: 10,
    backgroundColor: colors.danger,
  },
  orderBtnText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: "Bold",
    textTransform: "uppercase",
    fontSize: 20,
  },
});

export default ApplyCouponTab;
