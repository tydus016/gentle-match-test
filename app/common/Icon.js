import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";

function Icon({ type, name, size, color }) {
  const [IconComponent, setIconComponent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadIcon() {
      try {
        const iconMap = {
          AntDesign: () => import("react-native-vector-icons/AntDesign"),
          Entypo: () => import("react-native-vector-icons/Entypo"),
          EvilIcons: () => import("react-native-vector-icons/EvilIcons"),
          Feather: () => import("react-native-vector-icons/Feather"),
          FontAwesome: () => import("react-native-vector-icons/FontAwesome"),
          FontAwesome5: () => import("react-native-vector-icons/FontAwesome5"),
          Fontisto: () => import("react-native-vector-icons/Fontisto"),
          Foundation: () => import("react-native-vector-icons/Foundation"),
          Ionicons: () => import("react-native-vector-icons/Ionicons"),
          MaterialIcons: () =>
            import("react-native-vector-icons/MaterialIcons"),
          MaterialCommunityIcons: () =>
            import("react-native-vector-icons/MaterialCommunityIcons"),
          Octicons: () => import("react-native-vector-icons/Octicons"),
          SimpleLineIcons: () =>
            import("react-native-vector-icons/SimpleLineIcons"),
          Zocial: () => import("react-native-vector-icons/Zocial"),
        };

        if (iconMap[type]) {
          const { default: LoadedIcon } = await iconMap[type]();
          if (isMounted) setIconComponent(() => LoadedIcon);
        } else {
          console.warn(`Icon type "${type}" is not recognized.`);
        }
      } catch (error) {
        console.error("Error loading icon:", error);
      }
    }

    loadIcon();

    return () => {
      isMounted = false;
    };
  }, [type]);

  if (!IconComponent) {
    return <ActivityIndicator />; // Show a loading spinner while the icon is loading
  }

  return <IconComponent name={name} size={size} color={color} />;
}

export default Icon;
