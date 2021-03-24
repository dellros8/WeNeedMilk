import React, { useState } from "react";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { PageContainer } from "../../components";
import { guidGenerator } from "../../misc/helpers.js";

const AddList = ({ navigation, userId }) => {
  const [shoppingListCode, setShoppingListCode] = useState("");

  const addShoppingList = () => {
    firebase
      .database()
      .ref(`shoppinglists/${shoppingListCode}`)
      .once("value")
      .then((shoppingList) => {
        const shoppingListCode = shoppingList.child("code").val();
        const shoppingListName = shoppingList.child("name").val();

        firebase.database().ref(`users/${userId}/myshoppinglists/${shoppingListCode}`).set({
          code: shoppingListCode,
          name: shoppingListName,
        });
      });
    setShoppingListCode("");
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Add Shopping List">
      <Input
        leftIcon={<Icon name="qrcode" type="font-awesome" size={24} />}
        placeholder={`e.g. ${guidGenerator()}`}
        label="Code"
        value={shoppingListCode}
        onChangeText={setShoppingListCode}
      />
      <Button title="Add List" onPress={() => addShoppingList()}></Button>
    </PageContainer>
  );
};

export default AddList;
