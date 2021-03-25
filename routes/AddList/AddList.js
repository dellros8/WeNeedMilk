import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { firebaseDB } from '../../firebase/firebase.js';
import { PageContainer } from '../../components';
import { guidGenerator } from '../../misc/helpers.js';

const AddList = ({ navigation, userId }) => {
  const [shoppingListCode, setShoppingListCode] = useState('');

  const addShoppingList = () => {
    firebaseDB
      .ref(`shoppinglists/${shoppingListCode}`)
      .once('value')
      .then((shoppingList) => {
        const sharedListCode = shoppingList.child('code').val();
        const shoppingListTitle = shoppingList.child('name').val();

        firebaseDB.ref(`users/${userId}/myshoppinglists/${sharedListCode}`).set({
          code: sharedListCode,
          name: shoppingListTitle,
        });
        setShoppingListCode('');
        navigation.navigate({
          name: 'sharedlist',
          params: { shoppingListTitle, sharedListCode },
        });
      });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Add Shopping List">
      <Input
        leftIcon={<Icon name="qrcode" type="font-awesome" size={24} />}
        placeholder={`e.g. ${guidGenerator()}`}
        label="Code"
        value={shoppingListCode}
        onChangeText={setShoppingListCode}
      />
      <Button title="Add List" onPress={() => addShoppingList()}></Button>
    </PageContainer>
  );
};

export default AddList;
