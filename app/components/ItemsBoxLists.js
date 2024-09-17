import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import TextStyle from "../common/TextStyle";
import NoProductsFound from "../common/NoProductsFound";
import colors from "../configs/colors";

import { useDispatch } from "react-redux";

import { setSelectedItem } from "../store/store";

function ItemsBoxLists({ data, onItemSelect }) {
  const dispatch = useDispatch();
  const items = data;

  const onSelectItem = (item) => {
    dispatch(setSelectedItem(item));
    onItemSelect(item);
  };

  if (items.length === 0) {
    return <NoProductsFound />;
  }

  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      {items.map((item, index) => (
        <TouchableWithoutFeedback
          key={item.id}
          onPress={() => onSelectItem(item)}
        >
          <View style={styles.itemBox}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.itemTitleContainer}>
                <TextStyle style={styles.itemTitleText}>{item.title}</TextStyle>
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
    gap: 5,
  },
  itemBox: {
    width: 200,
    height: 150,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  itemTitleContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: 5,
  },
  itemTitleText: {
    fontFamily: "Medium",
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
});

export default ItemsBoxLists;
