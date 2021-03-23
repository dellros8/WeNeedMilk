import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Dropdown = ({ open }) => {
  if (open) {
    return <View style={styles.container}>dropdown</View>;
  } else {
    return null;
  }
};

export default Dropdown;
