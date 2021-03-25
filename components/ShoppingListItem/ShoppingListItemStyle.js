import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shoppingListItemWrapper: {
    padding: 3,
    marginTop: 10,
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
  }
});

export default styles;
