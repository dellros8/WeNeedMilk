import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { firebaseDB } from '../../firebase/firebase.js';
import { APP_PRIMARY_COLOR, MAX_LENGTH_SHOPPING_LIST_NAME } from '../../misc/variables.js';
import { PageContainer } from '../../components';
import { guidGenerator } from '../../misc/helpers.js';
import commonStyles from '../../styles/CommonStyles.js';

const CreateList = ({ navigation, userId }) => {
  const [shoppingListName, setShoppingListName] = useState('');

  const createShoppingList = () => {
    const shoppinglistUniqueCode = guidGenerator();
    const shoppingListObj = {
      code: shoppinglistUniqueCode,
      name: shoppingListName,
      createdBy: userId,
    };
    firebaseDB.ref(`shoppinglists/${shoppinglistUniqueCode}`).set(shoppingListObj);
    firebaseDB.ref(`users/${userId}/myshoppinglists/${shoppinglistUniqueCode}`).set(shoppingListObj);
    setShoppingListName('');
    navigation.navigate({
      name: 'sharedlist',
      params: { shoppingListTitle: shoppingListName, sharedListCode: shoppinglistUniqueCode },
    });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Create Shopping List">
      <Input
        placeholder="Name"
        value={shoppingListName}
        onChangeText={setShoppingListName}
        maxLength={MAX_LENGTH_SHOPPING_LIST_NAME}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <Button
        title="Create List"
        onPress={() => createShoppingList()}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default CreateList;
