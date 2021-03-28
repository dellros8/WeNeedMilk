import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';

import { getList, setListToUser } from '../../firebase/functions.js';
import { PageContainer } from '../../components';
import commonStyles from '../../styles/CommonStyles.js';

const AddList = ({ navigation, userId }) => {
  const [shoppingListCode, setShoppingListCode] = useState('');

  const addShoppingList = () => {
    getList(shoppingListCode).then((shoppingList) => {
      setShoppingListCode('');

      const sharedListCode = shoppingList.child('code').val();
      const shoppingListTitle = shoppingList.child('name').val();

      setListToUser(sharedListCode, shoppingListTitle, userId).then(() => {
        navigation.navigate({
          name: 'sharedlist',
          params: { shoppingListTitle, sharedListCode, userId },
        });
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
