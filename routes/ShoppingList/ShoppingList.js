import React, { useState } from "react";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { PageContainer } from '../../components';

const ShoppingList = ({ navigation, shoppingListTitle }) => {
  return (
    <PageContainer openDrawer={navigation.openDrawer} title={shoppingListTitle}>
      <Button title="Sign up" onPress={() => signUp()}></Button>
    </PageContainer>
  );
};

export default ShoppingList;
