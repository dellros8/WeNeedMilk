import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem, Divider } from 'react-native-elements';

import { myListsRef } from '../../firebase/functions.js';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import styles from './DrawerContentStyle.js';
import commonStyles from '../../styles/CommonStyles.js';

const DrawerContent = ({ navigation, userId }) => {
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    myListsRef(userId).on('value', setListsFromDB);
    return () => {
      myListsRef(userId).off('value', setListsFromDB);
    };
  }, [userId]);

  const setListsFromDB = (listsSnapshot) => {
    if (listsSnapshot) {
      const newShoppingLists = [];
      listsSnapshot.forEach((data) => {
        newShoppingLists.push(data.val());
      });
      setShoppingLists(newShoppingLists);
    }
  };

  return (
    <View style={styles.container}>
      <ListItem onPress={() => navigation.navigate('authenticate')}>
        <Icon name={userId ? 'user' : 'sign-in'} type="font-awesome" color={APP_PRIMARY_COLOR} />
        <ListItem.Content>
          <ListItem.Title>{userId ? 'Profile' : 'Login'}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      {!userId && (
        <ListItem onPress={() => navigation.navigate('signup')}>
          <Icon name="user-plus" type="font-awesome" color={APP_PRIMARY_COLOR} />
          <ListItem.Content>
            <ListItem.Title>Sign up</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      <Divider style={commonStyles.divider} />
      <ListItem onPress={() => navigation.navigate('quicklist')}>
        <Icon name="check" type="font-awesome" color={APP_PRIMARY_COLOR} />
        <ListItem.Content>
          <ListItem.Title>Quick List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        disabled={userId ? false : true}
        disabledStyle={styles.navItemDisabled}
        onPress={() => navigation.navigate('createlist')}>
        <Icon name="plus" type="font-awesome" color={APP_PRIMARY_COLOR} />
        <ListItem.Content>
          <ListItem.Title>Create List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem
        disabled={userId ? false : true}
        disabledStyle={styles.navItemDisabled}
        onPress={() => navigation.navigate('addlist')}>
        <Icon name="qrcode" type="font-awesome" color={APP_PRIMARY_COLOR} />
        <ListItem.Content>
          <ListItem.Title>Add List</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <Divider style={commonStyles.divider} />
      {shoppingLists.length
        ? shoppingLists.map((list) => {
            return (
              <ListItem
                key={list.code}
                onPress={() =>
                  navigation.navigate({
                    name: 'sharedlist',
                    params: { shoppingListTitle: list.name, sharedListCode: list.code, userId },
                  })
                }>
                <ListItem.Content>
                  <ListItem.Title>{list.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })
        : null}
    </View>
  );
};

export default DrawerContent;
