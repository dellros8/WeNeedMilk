import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './ShoppingListItemStyle.js';

const ShoppingListItem = ({ checkItem, item }) => {
  return (
    <View style={commonStyles.shoppingListItemWrapper}>
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
