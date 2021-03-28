import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './SharedListStyle.js';
import { removeItemFromList, listItemsRef, pushItemToList, updateItemInList } from '../../firebase/functions.js';
import { DARK_RED } from '../../misc/variables.js';
import { PageContainer, ListPage } from '../../components';
import { getWeekDay, sortFullItemList } from '../../misc/helpers.js';
import CopyCodeOverlay from './CopyCodeOverlay.js';
import RemoveListOverlay from './RemoveListOverlay.js';

const SharedList = ({ navigation, shoppingListTitle, sharedListCode, userId }) => {
  const [items, setItems] = useState([]);

  const [removeListOverlayVisible, setRemoveListOverlayVisible] = useState(false);
  const [copyCodeOverlayVisible, setCopyCodeOverlayVisible] = useState(false);

  useEffect(() => {
    listItemsRef(sharedListCode).on('value', setItemsFromDB);
    return () => {
      listItemsRef(sharedListCode).off('value', setItemsFromDB);
    };
  }, [sharedListCode]);

  const setItemsFromDB = (itemsSnapshot) => {
    if (itemsSnapshot) {
      const newItems = [];
      itemsSnapshot.forEach((item) => {
        newItems.push({ id: item.key, ...item.val() });
      });
      sortFullItemList(newItems);
      setItems(newItems);
    }
  };

  const addNewItem = (newItem) => {
    const itemObj = {
      name: newItem,
      createdWeekDay: getWeekDay(),
      createdTime: new Date().toLocaleString(),
    };
    pushItemToList(sharedListCode, itemObj);
  };

  const checkItem = (item) => {
    const checkItemValues = {
      checked: true,
      checkedTime: new Date().toLocaleString(),
    };
    updateItemInList(sharedListCode, item.id, checkItemValues);
  };

  const removeDoneItem = (item) => {
    removeItemFromList(sharedListCode, item.id);
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title={shoppingListTitle}>
      <ListPage items={items} addNewItem={addNewItem} checkItem={checkItem} removeDoneItem={removeDoneItem} />
      <Divider style={commonStyles.divider} />
      <View style={styles.listCodeWrapper}>
        <TouchableOpacity onPress={() => setCopyCodeOverlayVisible(true)} style={styles.listCodeButton}>
          <Icon name="share" type="font-awesome" size={38} />
        </TouchableOpacity>
        <CopyCodeOverlay
          isVisible={copyCodeOverlayVisible}
          closeOverlay={() => setCopyCodeOverlayVisible(false)}
          sharedListCode={sharedListCode}
        />
        <TouchableOpacity onPress={() => setRemoveListOverlayVisible(true)} style={styles.removeListButton}>
          <Icon name="trash" type="font-awesome" size={42} color={DARK_RED} />
        </TouchableOpacity>
        <RemoveListOverlay
          isVisible={removeListOverlayVisible}
          closeOverlay={() => setRemoveListOverlayVisible(false)}
          sharedListCode={sharedListCode}
          userId={userId}
          navigateToPersonalList={() => navigation.navigate('personallist')}
        />
      </View>
    </PageContainer>
  );
};

export default SharedList;
