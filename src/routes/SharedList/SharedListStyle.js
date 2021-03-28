import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  itemsWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  doneItemsWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  listCodeButton: {
    alignItems: 'center',
  },
  removeListButton: {
    alignItems: 'center',
  },
});

export default styles;