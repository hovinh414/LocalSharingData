import {StyleSheet} from 'react-native';
import {COLORS, FONT, SIZES} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: SIZES.large,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  connectionText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
  statusConnectText: check => ({
    color: check === 'Connected' ? COLORS.green : COLORS.red,
  }),
  roleText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    color: COLORS.dark,
  },
});
export default styles;
