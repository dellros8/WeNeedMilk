import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';

import { setList, setListToUser } from '../../firebase/functions.js';
import { MAX_LENGTH_SHOPPING_LIST_NAME } from '../../misc/variables.js';
import { InformationText, PageContainer } from '../../components';
import { guidGenerator } from '../../misc/helpers.js';
import commonStyles from '../../styles/CommonStyles.js';

const CreateList = ({ navigation, userId }) => {
  const [shoppingListName, setShoppingListName] = useState('');

  const createShoppingList = (listName) => {
    setShoppingListName('');
    const listCode = guidGenerator();
    const listObj = {
      code: listCode,
      name: listName,
      createdBy: userId,
    };
    setList(listCode, listObj).then(() => {
      setListToUser(listCode, listName, userId).then(() => {
        navigation.navigate({
          name: 'sharedlist',
          params: { shoppingListTitle: listName, sharedListCode: listCode, userId },
        });
      });
    });
  };

  return (
    <PageContainer openDrawer={navigation.openDrawer} title="Skapa ny lista">
      <Input
        placeholder="Namn"
        value={shoppingListName}
        onChangeText={setShoppingListName}
        maxLength={MAX_LENGTH_SHOPPING_LIST_NAME}
        containerStyle={commonStyles.defaultPageInputContainer}
      />
      <InformationText>
        När du har skapat listan och är inne på den, klicka i vänster nedre hörn för att kopiera en kod. Personen
        du skickar koden till ska sedan klistra in den under "Lägg till lista" i menyn
      </InformationText>
      <Button
        title="Skapa"
        onPress={() => createShoppingList(shoppingListName)}
        containerStyle={commonStyles.defaultPageButtonContainer}
        buttonStyle={commonStyles.defaultPageButton}></Button>
    </PageContainer>
  );
};

export default CreateList;
