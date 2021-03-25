import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { MAX_LENGTH_ITEM_INPUT } from '../../misc/variables.js';
import { PageContainer, ShoppingListItem } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { guidGenerator } from '../../misc/helpers.js';

const QuickList = ({ navigation }) => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    updateStateWithItemsFromStorage();
  }, []);

  const updateStateWithItemsFromStorage = () => {
    try {
      AsyncStorage.getItem('items').then((data) => {
        if (data) {
          setItems(JSON.parse(data));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addNewItem = () => {
    const newItems = [...items];
    newItems.push({ id: guidGenerator(), name: newItem, created: '2020-01-03' });
    AsyncStorage.setItem('items', JSON.stringify(newItems)).then(() => {
      updateStateWithItemsFromStorage();
      setNewItem('');
    });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Quick Shopping List">
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
        onSubmitEditing={() => addNewItem()}
      />
      {items.map((item) => {
        return <ShoppingListItem key={item.id} item={item} onButtonPress={() => {}} />;
      })}
    </PageContainer>
  );
};

export default QuickList;
