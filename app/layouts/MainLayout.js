import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Container from "../common/Container";
import SidebarDrawer from "../common/SidebarDrawer";

function MainLayout({ children, screenTitle, showSearchIcon }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const onMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container
      screenTitle={screenTitle}
      showSearchIcon={showSearchIcon}
      onMenuClick={onMenuClick}
    >
      <View style={styles.mainContainer}>
        {showSidebar && <SidebarDrawer />}
        {children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },
});

export default MainLayout;
