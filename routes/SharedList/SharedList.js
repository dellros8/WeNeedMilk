import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Icon, Divider, Overlay } from 'react-native-elements';
import Clipboard from 'expo-clipboard';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './SharedListStyle.js';
import { firebaseDB } from '../../firebase/firebase.js';
import { APP_PRIMARY_COLOR, DARK_RED, LIGHT_GREY, MAX_LENGTH_ITEM_INPUT } from '../../misc/variables.js';
import { PageContainer, ShoppingListItem, ShoppingListDoneItem } from '../../components';
import { getWeekDay, copyToClipboard } from '../../misc/helpers.js';

const SharedList = ({ navigation, shoppingListTitle, sharedListCode }) => {
  const [newItem, setNewItem] = useState('');

  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const [copiedString, setCopiedString] = useState('');
  const [deleteListOverlayVisible, setDeleteListOverlayVisible] = useState(false);
  const [copyCodeOverlayVisible, setCopyCodeOverlayVisible] = useState(false);

  useEffect(() => {
    if (sharedListCode) {
      firebaseDB.ref(`shoppinglists/${sharedListCode}/items`).on('value', (snapshot) => {
        if (snapshot) {
          const newItems = [];
          snapshot.forEach((item) => {
            newItems.push({ id: item.key, ...item.val() });
          });
          setItems(newItems.reverse());
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
    if (newItem) {
      firebaseDB.ref(`shoppinglists/${sharedListCode}/items`).push({
        name: newItem,
        createdWeekDay: getWeekDay(),
        createdTime: new Date().toLocaleString(),
      });
      setNewItem('');
    }
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
            <Icon name="tag" type="font-awesome" size={40} />
          </TouchableOpacity>
        }
        placeholder="Milk... or something else"
        value={newItem}
        onChangeText={setNewItem}
        maxLength={MAX_LENGTH_ITEM_INPUT}
        containerStyle={commonStyles.defaultPageInputContainer}
        onSubmitEditing={() => addNewItem()}
      />
      <ScrollView style={commonStyles.defaultPageWidth}>
        <View style={commonStyles.scrollViewChildContainer} onStartShouldSetResponder={() => true}>
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
                  return <ShoppingListDoneItem doneItem key={item.id} item={item} onButtonPress={removeDoneItem} />;
                })
              : null}
          </View>
        </View>
      </ScrollView>
      <Divider style={commonStyles.divider} />
      <View style={styles.listCodeWrapper}>
        <TouchableOpacity onPress={() => setCopyCodeOverlayVisible(true)} style={styles.listCodeButton}>
          <Icon name="share" type="font-awesome" size={38} />
        </TouchableOpacity>
        <Overlay
          isVisible={copyCodeOverlayVisible}
          onBackdropPress={() => {
            setCopyCodeOverlayVisible(false);
            setCopiedString('');
          }}>
          <View style={commonStyles.overlayChildContainer}>
            <Text style={commonStyles.overlayTitle}>Copy Code</Text>
            <TouchableOpacity
              style={commonStyles.overlayDescription}
              onPress={() => copyToClipboard(sharedListCode, setCopiedString)}>
              <Icon name="clipboard" type="font-awesome" color={APP_PRIMARY_COLOR} size={80} />
            </TouchableOpacity>
            {copiedString ? (
              <Text>
                Code <Text style={{ fontWeight: 'bold', color: APP_PRIMARY_COLOR }}>{copiedString}</Text> Successfully
                Copied!
              </Text>
            ) : null}
            <Button
              onPress={() => {
                setCopyCodeOverlayVisible(false);
                setCopiedString('');
              }}
              title="Close"
              buttonStyle={commonStyles.overlayPrimaryButton}
              containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
          </View>
        </Overlay>

        <TouchableOpacity onPress={() => setDeleteListOverlayVisible(true)} style={styles.deleteListButton}>
          <Icon name="trash" type="font-awesome" size={42} color={DARK_RED} />
        </TouchableOpacity>
        <Overlay isVisible={deleteListOverlayVisible} onBackdropPress={() => setDeleteListOverlayVisible(false)}>
          <View style={commonStyles.overlayChildContainer}>
            <Text style={commonStyles.overlayTitle}>Remove List</Text>
            <Text style={commonStyles.overlayDescription}>
              Are you sure you want to remove this list from your account?
            </Text>
            <Button
              onPress={() => console.log('remove list')}
              title="Remove List"
              buttonStyle={{ backgroundColor: DARK_RED }}
              containerStyle={commonStyles.overlayPrimaryButtonContainer}></Button>
            <Button
              onPress={() => setDeleteListOverlayVisible(false)}
              title="Cancel"
              type="outline"
              titleStyle={commonStyles.overlaySecondaryButtonTitle}
              buttonStyle={commonStyles.overlaySecondaryButton}
              containerStyle={commonStyles.overlaySecondaryButtonContainer}></Button>
          </View>
        </Overlay>
      </View>
    </PageContainer>
  );
};

export default SharedList;
