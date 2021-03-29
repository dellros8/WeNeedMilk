import React from 'react';
import { Button, Text, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './ShoppingListDoneItemStyle.js';
import { APP_PRIMARY_COLOR_LIGHT } from '../../misc/variables.js';

const ShoppingListDoneItem = ({ removeItem, item }) => {
  return (
    <LinearGradient
      colors={[APP_PRIMARY_COLOR_LIGHT, 'white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={commonStyles.shoppingListItemWrapper}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
        onPress={() => removeItem(item)}
        icon={<Icon name="remove" type="font-awesome" size={20} color="white" />}
        buttonStyle={styles.removeButton}
      />
    </LinearGradient>
  );
};

export default ShoppingListDoneItem;
