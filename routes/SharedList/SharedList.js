import React, { useEffect, useState } from "react";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { MAX_LENGTH_ITEM_INPUT } from "../../misc/variables.js";
import { PageContainer } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";

const SharedList = ({ route, navigation, shoppingListTitle, sharedListCode }) => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (route.name === "sharedlist" && sharedListCode) {
      firebase
        .database()
        .ref(`shoppinglists/${sharedListCode}/items`)
        .on("value", (snapshot) => {
          const newItems = [];
          snapshot.forEach((item) => {
            newItems.push({ id: item.key, ...item.val() });
          });
          setItems(newItems);
        });
    }
  }, [sharedListCode]);

  const addNewItem = () => {
    firebase.database().ref(`shoppinglists/${sharedListCode}/items`).push({
      name: newItem,
      created: "2021-03-24",
    });
    setNewItem("");
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={shoppingListTitle}>
      <Input
        rightIcon={
          <TouchableOpacity onPress={() => addNewItem()}>
            <Icon name="plus-circle" type="font-awesome" size={40} />
          </TouchableOpacity>
        }
        placeholder="e.g. Milk"
        label="Add Item"
        value={newItem}
        onChangeText={setNewItem}
        maxLength={MAX_LENGTH_ITEM_INPUT}
      />
      {items.length
        ? items.map((item) => {
            console.log(item);
            return <Text key={item.id}>{item.name}</Text>;
          })
        : null}
    </PageContainer>
  );
};

export default SharedList;
