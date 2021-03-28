import { StyleSheet } from 'react-native';
import { LIGHT_GREEN } from '../../misc/variables';

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
  },
  itemName: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  checkButton: {
    backgroundColor: LIGHT_GREEN,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

export default styles;
