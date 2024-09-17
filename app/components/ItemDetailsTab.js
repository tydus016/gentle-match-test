import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import {
  setAddQty,
  setRemoveQty,
  resetQty,
  addOrderItem,
  setVariant,
  setSize,
  resetSize,
  resetVariant,
  resetSelectedItem,
  setQtyAmount,
  setSubtotal,
  setAmountPayable,
  setIsEditing,
  removeOrderItemByIndex,
  setTab,
  resetTab,
} from "../store/store";

import Icon from "../common/Icon";
import TextStyle from "../common/TextStyle";
import ButtonStyle from "../common/ButtonStyle";

import colors from "../configs/colors";
import { TABS } from "../configs/constants";
import productItems from "../../assets/dummy/productItems.json";

function ItemDetailsTab({ data, onBackPress, onAddOrderPress }) {
  const dispatch = useDispatch();

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [preSelectedItem, setPreSelectedItem] = useState(null);

  //   - state qty
  const quantity = useSelector((state) => state.qtyControl.value);
  const variant = useSelector((state) => state.itemVariants.value);
  const size = useSelector((state) => state.itemSizes.value);
  const selectedItem = useSelector((state) => state.selectedItem.value);
  const orderSummary = useSelector((state) => state.orderSummary.value);
  const orderItems = useSelector((state) => state.orderItems.value);
  const isEditing = useSelector((state) => state.isEditing.value);
  const prevTab = useSelector((state) => state.tabToggle.value.prev);

  if (!selectedItem) {
    return null;
  }

  // - set current

  //   - get item detials
  const itemDetails = productItems.filter(
    (item) => item.id === selectedItem.id
  );
  const currentItem = itemDetails[0];

  const preSelectedData = orderItems[selectedItem.index];

  if (isEditing && preSelectedData) {
    useEffect(() => {
      setPreSelectedItem(preSelectedData);

      // - set variant & size
      if (preSelectedItem) {
        setSelectedVariantId(preSelectedItem.variantId);
        setSelectedSizeId(preSelectedItem.sizeId);
        dispatch(setQtyAmount(preSelectedItem.quantity));
      }
    }, [preSelectedItem, preSelectedData]);
  }

  const onVariantSelect = (variant) => {
    if (selectedVariantId === variant.id) {
      setSelectedVariantId(null);
      return;
    }
    setSelectedVariantId(variant.id);
    dispatch(setVariant(variant));
  };
  const onSizeSelect = (size) => {
    if (selectedSizeId === size.id) {
      setSelectedSizeId(null);
      return;
    }
    setSelectedSizeId(size.id);
    dispatch(setSize(size));
  };

  const onQtyControl = (action) => () => {
    if (action === "add") {
      dispatch(setAddQty());
      return;
    }
    if (action === "remove") {
      if (quantity === 1) {
        return;
      }
      dispatch(setRemoveQty());
    }
  };

  const onAddOrder = () => {
    const originalPrice = selectedItem.price;
    const price = originalPrice * quantity;

    const orderListing = {
      itemId: selectedItem.id,
      itemTitle: selectedItem.title,
      variant: variant.name,
      variantId: variant.id,
      size: size.name,
      sizeId: size.id,
      quantity: quantity,
      price: price,
      is_on_sale: selectedItem.attributes.is_on_sale,
    };
    console.log("orderListing data: ", orderListing);
    dispatch(addOrderItem(orderListing));

    // - for passing to backend
    const orderData = {
      item_id: selectedItem.id,
      quantity: quantity,
      variant_id: variant.id,
      size_id: size.id,
    };
    console.log("orderData: ", orderData);

    processOrder();
    onItemTabClose();
  };

  const processOrder = () => {
    const originalPrice = selectedItem.price;
    const price = originalPrice * quantity;

    const subTotal = parseFloat(orderSummary.subtotal);

    const totalPayable = subTotal + price;

    dispatch(setSubtotal(totalPayable.toFixed(2)));
    dispatch(setAmountPayable());
  };

  const onItemDelete = () => {
    console.log("Delete item: ", selectedItem.index);

    dispatch(removeOrderItemByIndex(selectedItem.index));
    onItemTabClose();
  };

  const onItemTabClose = () => {
    dispatch(resetQty());
    dispatch(resetSize());
    dispatch(resetVariant());
    dispatch(resetSelectedItem());
    dispatch(setIsEditing(false));

    if (prevTab && prevTab == TABS.searchItems) {
      dispatch(setTab(TABS.searchItems));
    } else {
      dispatch(resetTab());
      onBackPress();
    }

    console.log("onItemTabClose");
  };

  return (
    <View style={styles.listedItemsContainer}>
      <View style={styles.liHeader}>
        <View style={styles.liHeaderTxt}>
          <TouchableOpacity onPress={onItemTabClose}>
            <Icon size={25} type="Ionicons" name="arrow-back-outline" />
          </TouchableOpacity>

          <TextStyle numberOfLines={1} style={styles.liHeaderTitle}>
            {currentItem.title}
          </TextStyle>
        </View>

        {/* only show trash icon if
        selected item is already on the list */}
        {isEditing && (
          <TouchableOpacity onPress={onItemDelete}>
            <Icon
              size={25}
              type="Ionicons"
              name="trash-outline"
              color={colors.danger}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* start of product details */}
      <View style={styles.details}>
        <View style={styles.detailsHeader}>
          <Image
            style={styles.productImage}
            source={{ uri: currentItem.image }}
          />

          <View style={styles.productDescription}>
            <TextStyle style={styles.productName}>
              Available Quantity:{" "}
              <TextStyle style={styles.productPrice}>
                {currentItem.quantity}
              </TextStyle>
            </TextStyle>
            <TextStyle style={styles.productName}>
              Price:{" "}
              <TextStyle style={styles.productPrice}>
                ${currentItem.price}
              </TextStyle>
            </TextStyle>
          </View>
        </View>

        {/* variables */}
        {currentItem.variants && currentItem.variants.length > 0 && (
          <ScrollView style={styles.variantsContainer}>
            <TextStyle style={styles.varTitle}>Variants</TextStyle>

            <View style={styles.variants}>
              {currentItem.variants.map((variant) => (
                <TouchableOpacity
                  onPress={() => onVariantSelect(variant)}
                  style={[
                    styles.variant,
                    selectedVariantId === variant.id && styles.activeVariant,
                  ]}
                  key={variant.id}
                >
                  <TextStyle numberOfLines={2} style={styles.varName}>
                    {variant.name}
                  </TextStyle>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* sizes */}
        {currentItem.sizes && currentItem.sizes.length > 0 && (
          <ScrollView style={styles.variantsContainer}>
            <TextStyle style={styles.varTitle}>Sizes</TextStyle>

            <View style={styles.variants}>
              {currentItem.sizes.map((size) => (
                <TouchableOpacity
                  onPress={() => onSizeSelect(size)}
                  style={[
                    styles.variant,
                    selectedSizeId === size.id && styles.activeVariant,
                  ]}
                  key={size.id}
                >
                  <TextStyle numberOfLines={2} style={styles.varName}>
                    {size.name}
                  </TextStyle>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* quantity control */}
        <View style={styles.variantsContainer}>
          <TextStyle style={styles.varTitle}>Quantity</TextStyle>

          <View style={styles.quantityCtrl}>
            <TouchableOpacity
              onPress={onQtyControl("remove")}
              onLongPress={onQtyControl("remove")}
              style={styles.quantityBtnRemove}
            >
              <Icon size={25} type="Ionicons" name="remove-sharp" />
            </TouchableOpacity>

            <View style={styles.quantityDisplay}>
              <TextStyle style={styles.quantityCount}>{quantity}</TextStyle>
            </View>

            <TouchableOpacity
              onPress={onQtyControl("add")}
              onLongPress={onQtyControl("add")}
              style={styles.quantityBtnAdd}
            >
              <Icon size={25} type="Ionicons" name="add-sharp" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* buttons */}
      <View style={styles.detailsActions}>
        {preSelectedItem && (
          <TouchableOpacity style={styles.proceedBtn} onPress={onAddOrder}>
            <TextStyle style={styles.btnTexts}>Update Order</TextStyle>
          </TouchableOpacity>
        )}

        {!preSelectedItem && (
          <TouchableOpacity style={styles.proceedBtn} onPress={onAddOrder}>
            <TextStyle style={styles.btnTexts}>Add Order</TextStyle>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.cancelBtn} onPress={onBackPress}>
          <TextStyle style={styles.btnTexts}>Cancel</TextStyle>
        </TouchableOpacity>
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

  details: {
    padding: 10,
  },
  detailsHeader: {
    flexDirection: "row",
    gap: 20,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  productName: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: "Bold",
  },

  //   - variables
  variantsContainer: {
    marginTop: 20,
    height: 150,
  },
  varTitle: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  variants: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
  },
  variant: {
    backgroundColor: colors.lightGray,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  activeVariant: {
    backgroundColor: colors.primary,
  },
  varName: {
    fontFamily: "Medium",
    fontSize: 16,
  },

  //   - quantity control
  quantityCtrl: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  quantityBtnAdd: {
    backgroundColor: colors.success,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quantityBtnRemove: {
    backgroundColor: colors.danger,
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quantityDisplay: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  quantityCount: {
    fontFamily: "Bold",
    fontSize: 20,
  },

  detailsActions: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
  },
  proceedBtn: {
    backgroundColor: colors.primary,
    width: "50%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: colors.warning,
    width: "50%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },

  btnTexts: {
    fontFamily: "Bold",
    fontSize: 20,
    color: colors.white,
    textTransform: "uppercase",
  },
});

export default ItemDetailsTab;
