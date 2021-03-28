import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './ShoppingListDoneItemStyle.js';

const ShoppingListDoneItem = ({ removeItem, item }) => {
  return (
    <View style={commonStyles.shoppingListItemWrapper}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
        onPress={() => removeItem(item)}
        icon={<Icon name="remove" type="font-awesome" size={20} color="white" />}
        buttonStyle={styles.removeButton}
      />
    </View>
  );
};

export default ShoppingListDoneItem;
