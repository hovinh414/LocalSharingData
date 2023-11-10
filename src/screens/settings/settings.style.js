import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants';

const {width, height} = Dimensions.get('window')

const settingText = height * 0.02

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    paddingHorizontal: 20,
    // backgroundColor: COLORS.primary,
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  avatarContainer: {
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingTop: '5%',
    marginBottom: '5%'
  },

  avatar: {
    resizeMode: 'contain',
    // backgroundColor: 'green',
    marginBottom: '2%',
    height: height * 0.15
  },

  name: {
    color: COLORS.black,
    fontSize: height * 0.033,
  },

  settingContainer: {
    // backgroundColor:'yellow',
    paddingVertical: '3%',
    gap: 8,
    paddingHorizontal: '1%'
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    backgroundColor: '#f6f6f6',
    paddingHorizontal: '2%',
    borderRadius: 5
  },

  settingText: {
    flex: 1,
    marginLeft: '3%',
    color: COLORS.black,
    fontSize: settingText
  }
});

export default styles;
