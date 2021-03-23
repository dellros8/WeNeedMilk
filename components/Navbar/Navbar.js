import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    width: '100%',
    height: 40,
    backgroundColor: "red",
  },
});

const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text>asdfasdfasdfasfd</Text>
    </View>
  );
};
export default Navbar;
