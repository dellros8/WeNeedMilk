import { StyleSheet } from 'react-native';
import { DARK_RED } from '../../misc/variables';

const styles = StyleSheet.create({
  itemName: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'double',
  },
  removeButton: {
    backgroundColor: DARK_RED,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default styles;
