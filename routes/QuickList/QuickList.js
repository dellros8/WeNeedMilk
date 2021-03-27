import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { MAX_LENGTH_ITEM_INPUT } from '../../misc/variables.js';
import { PageContainer, ShoppingListItem } from '../../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { guidGenerator } from '../../misc/helpers.js';
import commonStyles from '../../styles/CommonStyles.js';

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
  const checkItem = (item) => {
    firebaseDB
      .ref(`shoppinglists/${sharedListCode}/items/${item.id}`)
      .remove()
      .then(() => {
        firebaseDB.ref(`shoppinglists/${sharedListCode}/doneitems/${item.id}`).set({
          id: item.id,
          name: item.name,
          createdWeekDay: item.createdWeekDay,
          createdTime: item.createdTime,
        });
      });
  };

  const removeDoneItem = (item) => {
    firebaseDB.ref(`shoppinglists/${sharedListCode}/doneitems/${item.id}`).remove();
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Quick Shopping List">
      <Input
        rightIcon={
          <TouchableOpacity onPress={() => addNewItem()}>
            <Icon name="tag" type="font-awesome" size={40} />
          </TouchableOpacity>
        }
        placeholder="Milk... or something else"
        value={newItem}
        onChangeText={setNewItem}
        maxLength={MAX_LENGTH_ITEM_INPUT}
        onSubmitEditing={() => addNewItem()}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <ScrollView style={commonStyles.defaultPageWidth}>
        <View style={commonStyles.scrollViewChildContainer} onStartShouldSetResponder={() => true}>
          {items.map((item) => {
            return <ShoppingListItem key={item.id} item={item} onButtonPress={() => {}} />;
          })}
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default QuickList;
