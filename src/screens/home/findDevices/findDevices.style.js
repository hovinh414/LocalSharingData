import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light,
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

  createGroupBtn: {
    borderRadius: 5,
    padding: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnLabel: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 15,
  },
});
export default styles;
