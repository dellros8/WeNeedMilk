import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Input, Text, Icon, Divider } from 'react-native-elements';
import Clipboard from 'expo-clipboard';

import styles from './SharedListStyle.js';
import { firebaseDB } from '../../firebase/firebase.js';
import { MAX_LENGTH_ITEM_INPUT } from '../../misc/variables.js';
import { PageContainer, ShoppingListItem } from '../../components';
import { getWeekDay } from '../../misc/helpers.js';

const SharedList = ({ navigation, shoppingListTitle, sharedListCode }) => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  useEffect(() => {
    if (sharedListCode) {
      firebaseDB.ref(`shoppinglists/${sharedListCode}/items`).on('value', (snapshot) => {
        if (snapshot) {
          const newItems = [];
          snapshot.forEach((item) => {
            newItems.push({ id: item.key, ...item.val() });
          });
          setItems(newItems);
        }
      });
      firebaseDB.ref(`shoppinglists/${sharedListCode}/doneitems`).on('value', (snapshot) => {
        if (snapshot) {
          const newDoneItems = [];
          snapshot.forEach((item) => {
            newDoneItems.push({ id: item.key, ...item.val() });
          });
          setDoneItems(newDoneItems);
        }
      });
    }
  }, [sharedListCode]);

  const addNewItem = () => {
    firebaseDB.ref(`shoppinglists/${sharedListCode}/items`).push({
      name: newItem,
      createdWeekDay: getWeekDay(),
      createdTime: new Date().toLocaleString(),
    });
    setNewItem('');
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
        containerStyle={{ width: '90%' }}
        onSubmitEditing={() => addNewItem()}
      />
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
        <View style={styles.itemsWrapper}>
          {items.length
            ? items.map((item) => {
                return <ShoppingListItem key={item.id} item={item} onButtonPress={checkItem} />;
              })
            : null}
        </View>
        <View style={styles.doneItemsWrapper}>
          {doneItems.length
            ? doneItems.map((item) => {
                return <ShoppingListItem doneItem key={item.id} item={item} onButtonPress={removeDoneItem} />;
              })
            : null}
        </View>
      </ScrollView>
      <Divider style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
      <View style={styles.listCodeWrapper}>
        <TouchableOpacity onPress={() => Clipboard.setString(sharedListCode)} style={styles.listCodeButton}>
          <Icon name="clipboard" type="font-awesome" size={38} />
          <Text>{sharedListCode}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('deleteList')} style={styles.deleteListButton}>
          <Icon name="trash" type="font-awesome" size={42} color="#c70000" />
        </TouchableOpacity>
      </View>
    </PageContainer>
  );
};

export default SharedList;
