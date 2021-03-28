import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Divider, Text } from 'react-native-elements';

import { myListsRef } from '../../firebase/functions.js';
import { APP_PRIMARY_COLOR, GREY, LIGHT_GREY } from '../../misc/variables.js';
import DrawerItem from './DrawerItem.js';
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
      <DrawerItem
        navigation={navigation}
        to="authenticate"
        iconName={userId ? 'user' : 'sign-in'}
        text={userId ? 'Profile' : 'Login'}
      />
      {!userId && <DrawerItem to="signup" iconName="user-plus" iconSize={18} text="Sign up" />}
      <DrawerItem navigation={navigation} to="personallist" iconName="file-text-o" text="Personal List" />
      <Divider style={commonStyles.divider} />
      <Text style={styles.drawerTitleText}>Shared Lists</Text>
      <DrawerItem
        navigation={navigation}
        to="createlist"
        disabled={userId ? false : true}
        disabledStyle={styles.drawerItemDisabled}
        iconName="plus"
        text="Create List"
      />
      <DrawerItem
        navigation={navigation}
        to="addlist"
        disabled={userId ? false : true}
        disabledStyle={styles.drawerItemDisabled}
        iconName="qrcode"
        text="Add List"
      />
      <Divider style={commonStyles.divider} />
      {shoppingLists.length
        ? shoppingLists.map((list) => {
            return (
              <DrawerItem
                key={list.code}
                navigation={navigation}
                to={{
                  name: 'sharedlist',
                  params: { shoppingListTitle: list.name, sharedListCode: list.code, userId },
                }}
                disabled={userId ? false : true}
                disabledStyle={styles.drawerItemDisabled}
                iconName="file-text-o"
                text={list.name}
              />
            );
          })
        : null}
    </View>
  );
};

export default DrawerContent;
