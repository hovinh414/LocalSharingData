import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants';

const {width, height} = Dimensions.get('window')

const settingText = height * 0.02

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 12,
  },
  header: {
    marginHorizontal: 12,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginBottom: '2%',
    height: 120,
    width:120,
    borderRadius:60,
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
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
  }
});

export default styles;
