import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  btnLabel: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 15,
  },
});
export default styles;
