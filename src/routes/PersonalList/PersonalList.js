import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { PageContainer, ListPage } from '../../components';
import { guidGenerator, sortFullItemList } from '../../misc/helpers.js';

const PersonalList = ({ navigation }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setStateFromStorage();
  }, []);

  const setStateFromStorage = () => {
    AsyncStorage.getItem('items').then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        sortFullItemList(parsedData);
        setItems(parsedData);
      }
    });
  };

  const setNewItems = (items) => {
    AsyncStorage.setItem('items', JSON.stringify(items)).then(() => {
      setStateFromStorage();
    });
  };

  const addNewItem = (newItem) => {
    const copyOfCurrentItems = [...items];
    copyOfCurrentItems.push({
      id: guidGenerator(),
      name: newItem,
      createdTime: new Date().toLocaleString(),
    });
    setNewItems(copyOfCurrentItems);
  };

  const checkItem = (item) => {
    const copyOfCurrentItems = [...items];
    const itemToCheck = copyOfCurrentItems.find((stateItem) => stateItem.id === item.id);
    itemToCheck.checked = true;
    itemToCheck.checkedTime = new Date().toLocaleString();
    setNewItems(copyOfCurrentItems);
  };

  const removeDoneItem = (item) => {
    const copyOfCurrentItems = [...items];
    const itemToRemove = copyOfCurrentItems.find((stateItem) => stateItem.id === item.id);
    const index = copyOfCurrentItems.indexOf(itemToRemove);
    copyOfCurrentItems.splice(index, 1);
    setNewItems(copyOfCurrentItems);
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Personal Shopping List">
      <ListPage items={items} addNewItem={addNewItem} checkItem={checkItem} removeDoneItem={removeDoneItem} />
    </PageContainer>
  );
};

export default PersonalList;
