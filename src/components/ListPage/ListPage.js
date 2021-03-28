import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import ShoppingListDoneItem from '../ShoppingListDoneItem/ShoppingListDoneItem.js';
import ShoppingListItem from '../ShoppingListItem/ShoppingListItem.js';
import commonStyles from '../../styles/CommonStyles.js';
import { MAX_LENGTH_ITEM_INPUT } from '../../misc/variables.js';

const ListPage = ({ items, addNewItem, checkItem, removeDoneItem }) => {
  const [newItem, setNewItem] = useState('');

  return (
    <>
      <Input
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              addNewItem(newItem);
              setNewItem('');
            }}>
            <Icon name="tag" type="font-awesome" size={40} />
          </TouchableOpacity>
        }
        placeholder="Milk... or something else"
        value={newItem}
        onChangeText={setNewItem}
        maxLength={MAX_LENGTH_ITEM_INPUT}
        containerStyle={commonStyles.defaultPageInputContainer}
        onSubmitEditing={() => {
          addNewItem(newItem);
          setNewItem('');
        }}
      />
      <ScrollView style={commonStyles.defaultPageWidth}>
        <View style={commonStyles.scrollViewChildContainer} onStartShouldSetResponder={() => true}>
          {items.map((item) => {
            if (item.checked) {
              return <ShoppingListDoneItem key={item.id} item={item} removeItem={removeDoneItem} />;
            } else {
              return <ShoppingListItem key={item.id} item={item} checkItem={checkItem} />;
            }
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default ListPage;
