import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";

export const setSession = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));

    console.log("Session set successfully");
  } catch (error) {
    console.error("Error => ", error);
  }
};

export const getSession = async (key = "users_data") => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("Error => ", error);
  }
};

export const checkSession = async () => {
  const session = await getSession();

  if (session) {
    return true;
  }

  return false;
};

export const defaultParams = async () => {
  if (!checkSession()) return false;

  const session = await getSession();
  const params = {
    admin_id: session.user_id,
    login_token: session.token_hash,
    account_type: session.account_type,
  };

  return params;
};

export const AlertModal = (message, status, alertTitle = "Success Message") => {
  const title = status ? "Success Message" : "Error Message";

  Alert.alert(title, message);
};

export const ConfirmModal = (
  title = null,
  message = null,
  callBack,
  cancelTxt = "Cancel",
  okText = "ok"
) => {
  Alert.alert(title, message, [
    {
      text: cancelTxt,
      onPress: () => callBack(false),
      style: "cancel",
    },
    {
      text: okText,
      onPress: () => callBack(true),
    },
  ]);
};

export const useCamera = async (configs = {}) => {
  settings = {
    mediaTypes: "Images", // - [All, Videos, Images]
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    ...configs,
  };

  return await ImagePicker.launchCameraAsync(settings);
};

export const useGallery = async (configs = {}) => {
  settings = {
    mediaTypes: "All", // - [All, Videos, Images]
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
    ...configs,
  };

  return await ImagePicker.launchImageLibraryAsync(settings);
};

export const SelectImageSource = async (callBack) => {
  let config = {
    canceled: false,
    camera: false,
    gallery: false,
  };

  Alert.alert("Select Image Source", "Choose the source of the image", [
    {
      text: "cancel",
      onPress: () => {
        config.canceled = true;
        callBack(config);
      },
      style: "cancel",
    },
    {
      text: "Gallery",
      onPress: () => {
        config.gallery = true;
        callBack(config);
      },
    },
    {
      text: "Camera",
      onPress: () => {
        config.camera = true;
        callBack(config);
      },
    },
  ]);
};

export const toFormData = (obj = {}) => {
  const formData = new FormData();
  const keys = Object.keys(obj);
  const values = Object.values(obj);

  for (let i = 0; i <= keys.length; i++) {
    if ((keys[i] && values[i]) !== undefined) {
      formData.append(keys[i], values[i]);
    }
  }

  return formData;
};

export const requestMediaCameraPermissions = async () => {
  useEffect(() => {
    (async () => {
      const gallery = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (gallery.status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      const camera = await ImagePicker.requestCameraPermissionsAsync();
      if (camera.status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    })();
  }, []);
};

export const getTimeStamp = () => {
  return new Date().getTime();
};

export const openSystemMessage = (phoneNo) => {
  const phone = `sms:${phoneNo}`;

  Linking.canOpenURL(phone).then((supported) => {
    if (!supported) {
      Alert.alert("Error", "Can't handle url: " + phone);
    } else {
      return Linking.openURL(phone);
    }
  });
};

export const openSystemCall = (phoneNo) => {
  const phone = `tel:${phoneNo}`;

  Linking.canOpenURL(phone).then((supported) => {
    if (!supported) {
      Alert.alert("Error", "Can't handle url: " + phone);
    } else {
      return Linking.openURL(phone);
    }
  });
};

export const formatNumber = (number) => {
  try {
    const Number = parseFloat(number);
    number = Number;
  } catch (error) {
    return number;
  }
  
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
