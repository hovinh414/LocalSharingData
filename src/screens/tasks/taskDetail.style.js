import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.yellow,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
  },

  content: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  titleContainer: {},
  titleText: {
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  descText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  timeText: {
    fontSize: SIZES.medium,
    color: COLORS.red,
  },

  inputContainer: {},

  footer: {
    alignItems: 'center',
    backgroundColor: COLORS.red,
  },
  submitBtn: {
    height: '20%',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default styles;
