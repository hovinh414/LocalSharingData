import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  chatList: {
    flex: 1,
    // padding: 16,
  },
});

export default styles;
