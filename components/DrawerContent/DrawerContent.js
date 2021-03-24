import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon, ListItem, Divider } from "react-native-elements";

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
      <ListItem onPress={() => navigation.navigate("authenticate")}>
        <ListItem.Content>
          <ListItem.Title>{userEmail ? "Profile" : "Log in"}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {!userEmail && (
        <ListItem onPress={() => navigation.navigate("signup")}>
          <ListItem.Content>
            <ListItem.Title>Sign up</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      <Divider />
      <ListItem onPress={() => navigation.navigate("quicklist")}>
        <ListItem.Content>
          <ListItem.Title>Quick List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate("createlist")}>
        <ListItem.Content>
          <ListItem.Title>Create List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem onPress={() => navigation.navigate("addlist")}>
        <ListItem.Content>
          <ListItem.Title>Add List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Divider />
      {shoppingLists.length
        ? shoppingLists.map((list) => {
            return (
              <ListItem
                key={list.code}
                onPress={() =>
                  navigation.navigate({
                    name: "sharedlist",
                    params: { shoppingListTitle: list.name, sharedListCode: list.code },
                  })
                }
              >
                <ListItem.Content>
                  <ListItem.Title>{list.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })
        : null}
    </View>
  );
};

export default DrawerContent;
