import { StyleSheet } from 'react-native';
import { DARK_RED } from '../../misc/variables';

const styles = StyleSheet.create({
  shoppingListItemWrapper: {
    padding: 3,
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 4,
    opacity: 0.8,
  },
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
