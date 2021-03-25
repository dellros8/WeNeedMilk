import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  listCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 20,
    paddingLeft: 30,
  },
  itemsWrapper: {
    alignItems: 'center',
    width: '80%',
  },
  doneItemsWrapper: {
    alignItems: 'center',
    width: '80%',
  },
  listCodeButton: {
    alignItems: 'center',
  },
  deleteListButton: {
    alignItems: 'center',
  },
});

export default styles;
