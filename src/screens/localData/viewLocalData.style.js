import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, SIZES} from '../../constants';

const styles = StyleSheet.create({
  contentText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  contextImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default styles;
