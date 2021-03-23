import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import Navbar from "../../components/Navbar/Navbar.js";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  container: {
    width: "80%",
    marginTop: 80,
    flex: 1,
    flexDirection: "column",
  },
  pageTitle: {
    textAlign: "center",
    margin: 25,
    fontSize: 26,
    fontWeight: 'bold'
  },
});

const PageContainer = ({ openDrawer, title, children }) => {
  return (
    <View style={styles.wrapper}>
      <Navbar openDrawer={openDrawer} />
      <View style={styles.container}>
        <Text style={styles.pageTitle}>{title}</Text>
        {children}
      </View>
    </View>
  );
};

export default PageContainer;
