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
});
export default styles;
