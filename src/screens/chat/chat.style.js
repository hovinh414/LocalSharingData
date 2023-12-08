import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

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
    justifyContent: 'center',
    // padding: 16,
  },
  chatText: {
    alignSelf: 'center',
    fontSize: SIZES.medium,
    fontStyle: 'italic',
    color: COLORS.dark,
  },
  buttonAdd: {
    zIndex: 999,
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
