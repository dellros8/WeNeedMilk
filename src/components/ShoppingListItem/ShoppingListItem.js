import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Button, Text, Icon } from 'react-native-elements';
import { APP_PRIMARY_COLOR_LIGHT } from '../../misc/variables.js';

import commonStyles from '../../styles/CommonStyles.js';
import styles from './ShoppingListItemStyle.js';

const ShoppingListItem = ({ checkItem, item }) => {
  return (
    <LinearGradient
      colors={[APP_PRIMARY_COLOR_LIGHT, 'white']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={commonStyles.shoppingListItemWrapper}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Button
        onPress={() => checkItem(item)}
        icon={<Icon name="check" type="font-awesome" color="#ffffff" size={20} />}
        buttonStyle={styles.checkButton}
      />
    </LinearGradient>
  );
};

export default ShoppingListItem;
