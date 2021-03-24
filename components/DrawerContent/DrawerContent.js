import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { DrawerItem } from "@react-navigation/drawer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

const DrawerContent = ({ navigation, userEmail, userId }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${userId}/myshoppinglists`)
      .on("value", (data) => {
        const newShoppingLists = [];
        data.forEach((data) => {
          newShoppingLists.push(data.val());
        });
        setShoppingLists(newShoppingLists);
      });
  }, [userId]);

  return (
    <View style={styles.container}>
      <DrawerItem
        label={userEmail ? "Profile" : "Log in"}
        onPress={() => navigation.navigate("authenticate")}
      ></DrawerItem>
      {!userEmail && <DrawerItem label="Sign up" onPress={() => navigation.navigate("signup")}></DrawerItem>}
      <DrawerItem label="Quick List" onPress={() => navigation.navigate("quicklist")}></DrawerItem>
      <DrawerItem label="Create List" onPress={() => navigation.navigate("createlist")}></DrawerItem>
      <DrawerItem label="Add List" onPress={() => navigation.navigate("addlist")}></DrawerItem>
      {shoppingLists.length
        ? shoppingLists.map((list) => {
            return (
              <DrawerItem
                key={list.code}
                label={list.name}
                onPress={() =>
                  navigation.navigate({
                    name: "sharedlist",
                    params: { shoppingListTitle: list.name, sharedListCode: list.code },
                  })
                }
              ></DrawerItem>
            );
          })
        : null}
    </View>
  );
};

export default DrawerContent;
