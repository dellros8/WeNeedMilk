import { StyleSheet } from 'react-native';
import { APP_PRIMARY_COLOR, GREY, LIGHT_RED, VERY_LIGHT_GREY } from '../misc/variables';

const styles = StyleSheet.create({
  overlayChildContainer: {
    width: 300,
    alignItems: 'center',
  },
  overlayTitle: {
    color: APP_PRIMARY_COLOR,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  overlayDescription: {
    textAlign: 'center',
    marginTop: 30,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  overlayPrimaryButton: {
    backgroundColor: APP_PRIMARY_COLOR,
  },
  overlayPrimaryButtonContainer: {
    marginTop: 30,
    width: '100%',
  },
  overlaySecondaryButton: {
    borderColor: APP_PRIMARY_COLOR,
  },
  overlaySecondaryButtonContainer: {
    marginTop: 10,
    width: '100%',
  },
  overlaySecondaryButtonTitle: {
    color: APP_PRIMARY_COLOR,
  },
  defaultPageButtonContainer: {
    width: '80%',
  },
  defaultPageButton: {
    backgroundColor: APP_PRIMARY_COLOR,
  },
  defaultPageInputContainer: {
    width: '85%',
  },
  inputLeftIcon: {
    marginRight: 8,
  },
  formErrorText: {
    color: LIGHT_RED,
    width: '80%',
    margin: 8,
  },
  defaultPageWidth: {
    width: '80%',
  },
  scrollViewChildContainer: {
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: GREY,
  },
  shoppingListItemWrapper: {
    padding: 3,
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: VERY_LIGHT_GREY,
  },
});

export default styles;
