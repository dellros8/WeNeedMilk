import React, { useState } from "react";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { MAX_LENGTH_SHOPPING_LIST_NAME } from "../../misc/variables.js";
import { PageContainer } from "../../components";
import { guidGenerator } from "../../misc/helpers.js";

const CreateList = ({ navigation, userId }) => {
  const [shoppingListName, setShoppingListName] = useState("");

  const createShoppingList = () => {
    const shoppinglistUniqueCode = guidGenerator();
    const shoppingListObj = {
      code: shoppinglistUniqueCode,
      name: shoppingListName,
      createdBy: userId,
    };
    firebase.database().ref(`shoppinglists/${shoppinglistUniqueCode}`).set(shoppingListObj);
    firebase.database().ref(`users/${userId}/myshoppinglists/${shoppinglistUniqueCode}`).set(shoppingListObj);
    setShoppingListName("");
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Create Shopping List">
      <Input
        leftIcon={<Icon name="plus" type="font-awesome" size={24} />}
        placeholder="e.g. Family shopping list"
        label="Name"
        value={shoppingListName}
        onChangeText={setShoppingListName}
        maxLength={MAX_LENGTH_SHOPPING_LIST_NAME}
      />
      <Button title="Create List" onPress={() => createShoppingList()}></Button>
    </PageContainer>
  );
};

export default CreateList;
