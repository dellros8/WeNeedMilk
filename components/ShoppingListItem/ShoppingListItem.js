import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text, Icon, Card } from 'react-native-elements';

import styles from './ShoppingListItemStyle.js';

const ShoppingListItem = ({ onButtonPress, item, doneItem }) => {
  const itemIcon = <Icon name="check-square-o" type="font-awesome" color="#ffffff" size={20}/>;
  const doneItemIcon = <Icon name="trash" type="font-awesome" size={20} />;
  return (
    <View style={styles.shoppingListItemWrapper}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
        onPress={() => onButtonPress(item)}
        icon={doneItem ? doneItemIcon : itemIcon}
        buttonStyle={{ backgroundColor: doneItem ? 'red' : 'green', paddingLeft: 15, paddingRight: 15 }}
      />
    </View>
  );
};

export default ShoppingListItem;
