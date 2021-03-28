import React, { useState } from 'react';
import { Button, Input, Text, Icon } from 'react-native-elements';

import { setList, setListToUser } from '../../firebase/functions.js';
import { firebaseDB } from '../../firebase/config.js';
import { APP_PRIMARY_COLOR, MAX_LENGTH_SHOPPING_LIST_NAME } from '../../misc/variables.js';
import { PageContainer } from '../../components';
import { guidGenerator } from '../../misc/helpers.js';
import commonStyles from '../../styles/CommonStyles.js';

const CreateList = ({ navigation, userId }) => {
  const [shoppingListName, setShoppingListName] = useState('');

  const createShoppingList = () => {
    const listCode = guidGenerator();
    const listObj = {
      code: listCode,
      name: shoppingListName,
      createdBy: userId,
    };
    setList(listCode, listObj).then(() => {
      setListToUser(listCode, shoppingListName, userId).then(() => {
        navigation.navigate({
          name: 'sharedlist',
          params: { shoppingListTitle: shoppingListName, sharedListCode: listCode, userId },
        });
      });
    });
    setShoppingListName('');
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
