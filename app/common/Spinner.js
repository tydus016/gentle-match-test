import React from "react";
import { ActivityIndicator } from "react-native";

import colors from "../../config/colors";

function Spinner(props) {
  const color = props.color !== undefined ? props.color : colors.white;
  const size = props.size !== undefined ? props.size : "small";

  return <ActivityIndicator size={size} color={color} />;
}

export default Spinner;
