import { StyleSheet } from 'react-native';
import { GREY } from '../../misc/variables';

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
  copyCodeDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: GREY,
    padding: 10,
  },
});

export default styles;
