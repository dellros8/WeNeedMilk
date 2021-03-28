import { StyleSheet } from 'react-native';
import { LIGHT_GREY, VERY_LIGHT_GREY } from '../../misc/variables';

const styles = StyleSheet.create({
  drawerItemDisabled: {
    opacity: 0.4,
  },
  drawerItemActive: {
    backgroundColor: LIGHT_GREY,
  },
  drawerTitleText: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default styles;
