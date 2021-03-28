import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';

import styles from './ShoppingListItemStyle.js';

const ShoppingListItem = ({ checkItem, item }) => {
  return (
    <View style={styles.shoppingListItemWrapper}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
        onPress={() => checkItem(item)}
        icon={<Icon name="check" type="font-awesome" color="#ffffff" size={20} />}
        buttonStyle={styles.checkButton}
      />
    </View>
  );
};

export default ShoppingListItem;
