import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";

import TextStyle from "../common/TextStyle";
import colors from "../configs/colors";

function CategoriesHorizontal({ data, onCategSelect }) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = data;

  const onCategorySelect = (item) => {
    setSelectedCategory(item.id);

    onCategSelect(item);
  };

  return (
    <View style={styles.itemsNavigation}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.navContentContainer}
      >
        {categories.map((item) => (
          <TouchableOpacity
            style={[
              styles.itemNavBtn,
              selectedCategory === item.id && styles.activeTab,
            ]}
            key={item.id}
            onPress={() => onCategorySelect(item)}
          >
            <TextStyle
              style={
                selectedCategory === item.id
                  ? styles.itemNavTextActive
                  : styles.itemNavText
              }
            >
              {item.title}
            </TextStyle>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemsNavigation: {
    backgroundColor: colors.white,
    width: "100%",
    height: 50,
    padding: 0,
  },
  navContentContainer: {
    paddingHorizontal: 10,
    gap: 10,
    alignItems: "center",
  },
  itemNavBtn: {
    height: "100%",
    justifyContent: "center",
    padding: 5,
  },
  activeTab: {
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary,
  },
  itemNavText: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 16,
    color: "#919090",
  },
  itemNavTextActive: {
    textAlign: "center",
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.primary,
  },
});

export default CategoriesHorizontal;
