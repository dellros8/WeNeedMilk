import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';

import { firebaseDB } from '../../firebase/firebase.js';
import { PageContainer } from '../../components';
import { APP_PRIMARY_COLOR } from '../../misc/variables.js';
import commonStyles from '../../styles/CommonStyles.js';

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
        placeholder="Code"
        value={shoppingListCode}
        onChangeText={setShoppingListCode}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <Button
        title="Add List"
        onPress={() => addShoppingList()}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default AddList;
