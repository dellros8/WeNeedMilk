import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    flex: 0.07,
    top: 40,
    width: "100%",
  },
  navButton: {
    flex: 1,
    justifyContent: "center",
    width: 80,
  },
});

const Navbar = ({ openDrawer }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={openDrawer}>
        <Icon name="bars" type="font-awesome" size={36} />
      </TouchableOpacity>
    </View>
  );
};
export default Navbar;
