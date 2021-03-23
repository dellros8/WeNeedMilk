import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";

import { DrawerItem } from "@react-navigation/drawer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

const DrawerContent = ({ navigation, userEmail }) => {
  return (
    <View style={styles.container}>
      <DrawerItem label={userEmail ? "Profile" : 'Log in'} onPress={() => navigation.navigate('authenticate')}></DrawerItem>
      <DrawerItem label="Sign up" onPress={() => navigation.navigate('signup')}></DrawerItem>
    </View>
  );
};
export default DrawerContent;
