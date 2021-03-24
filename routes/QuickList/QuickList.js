import React, { useEffect, useState } from "react";
import { Button, Input, Text, Icon } from "react-native-elements";

import firebase from "../../firebase/firebase.js";
import { MAX_LENGTH_ITEM_INPUT } from "../../misc/variables.js";
import { PageContainer } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";

const QuickList = ({ navigation }) => {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addNewItem = () => {
    
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Quick List">
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
            return <Text key={item.id}>{item.name}</Text>;
          })
        : null}
    </PageContainer>
  );
};

export default QuickList;
