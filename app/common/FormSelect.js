import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import { Dropdown } from "react-native-element-dropdown";

function FormSelect(props) {
  const styles = StyleSheet.create({
    formInput: {
      height: 40,
      margin: 12,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderWidth: 1,
      padding: 10,
      color: colors.black,
      borderBottomColor: colors.primary,
      borderBottomWidth: 2,
    },

    selectedTextStyle: {
      fontSize: 14,
    },
  });

  const p = props;
  const config = {
    labelField: p.labelField !== undefined ? p.labelField : "label",
    onChange: p.onChange !== undefined ? p.onChange : onChange,
    data: p.data !== undefined ? p.data : [],
    style: p.style !== undefined ? p.style : styles.formInput,
    selectedTextStyle:
      p.selectedTextStyle !== undefined
        ? p.selectedTextStyle
        : styles.selectedTextStyle,
    valueField: p.valueField !== undefined ? p.valueField : "value",
    placeholder:
      p.placeholder !== undefined ? p.placeholder : "Select an option",
    value: p.value !== undefined ? p.value : "",
  };

  const onChange = (value) => {
    return value;
  };

  return (
    <Dropdown
      labelField={config.labelField}
      onChange={(e) => config.onChange(e.value)}
      data={config.data}
      style={config.style}
      selectedTextStyle={config.selectedTextStyle}
      valueField={config.valueField}
      placeholder={config.placeholder}
      value={config.value}
    />
  );
}

export default FormSelect;
