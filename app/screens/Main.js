import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { setTab, resetTab } from "../store/store";

import colors from "../configs/colors";
import { TABS } from "../configs/constants";

import MainLayout from "../layouts/MainLayout";

// - components
import CategoriesHorizontal from "../components/CategoriesHorizontal";
import ItemsBoxLists from "../components/ItemsBoxLists";
import OrderListsTab from "../components/OrderListsTab";
import ItemDetailsTab from "../components/ItemDetailsTab";
import ItemSearchTab from "../components/ItemSearchTab";
import MoreOptionsTab from "../components/MoreOptionsTab";
import ApplyCouponTab from "../components/ApplyCouponTab";

// - dummies
import categories from "../../assets/dummy/categories.json";
import items from "../../assets/dummy/productItems.json";

function Main(props) {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.tabToggle.value.current);

  const [screenTitle, setScreenTitle] = useState("Products");
  const [selectedItem, setSelectedItem] = useState(null);
  const [productItems, setProductItems] = useState(items);

  const onSelectCatg = (item) => {
    const { id, title } = item;
    setScreenTitle(title);

    let Items = items;
    if (id != 0) {
      Items = items.filter((item) => item.category_id === id);
    }

    setProductItems(Items);
  };

  const onItemSelect = (item) => {
    dispatch(setTab("itemDetails"));
    setSelectedItem(item);
  };

  const onCloseItemDetailsTab = () => {
    dispatch(setTab("orderLists"));
    setSelectedItem(null);
  };

  const ActiveTab = () => {
    switch (currentTab) {
      case TABS.orderLists:
        return <OrderListsTab data={items} onItemSelect={onItemSelect} />;
      case TABS.itemDetails:
        return (
          <ItemDetailsTab
            data={selectedItem}
            onBackPress={() => onCloseItemDetailsTab()}
          />
        );
      case TABS.searchItems:
        return (
          <ItemSearchTab
            data={selectedItem}
            onBackPress={() => onCloseItemDetailsTab()}
          />
        );
      case TABS.moreOptions:
        return <MoreOptionsTab onBackPress={() => onCloseItemDetailsTab()} />;
      case TABS.applyCoupon:
        return <ApplyCouponTab onBackPress={() => onCloseItemDetailsTab()} />;

      default:
        return <OrderListsTab data={items} onItemSelect={onItemSelect} />;
    }
  };

  return (
    <MainLayout screenTitle={screenTitle} showSearchIcon={true}>
      <View style={styles.itemsContainer}>
        {/* categories navigation */}
        <CategoriesHorizontal data={categories} onCategSelect={onSelectCatg} />

        {/* items lists */}
        <ItemsBoxLists data={productItems} onItemSelect={onItemSelect} />
      </View>

      {/* list items */}
      <ActiveTab />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    width: "70%",
    height: "100%",
    backgroundColor: colors.lightGray,
  },
});

export default Main;
