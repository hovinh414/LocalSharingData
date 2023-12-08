import {StyleSheet} from 'react-native';
import {COLORS, FONT, SHADOWS} from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    marginTop: -10,
  },
  contentContainer: {
    paddingHorizontal: 10,
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
  devicesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
  },
  findingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '5%',
  },
  findingGif: {
    height: 140,
    width: 140,
  },
  findingTitle: {
    fontSize: 18,
    marginTop: 10,
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
  btnDisable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray,
  },

  btnLabel: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 15,
  },
});
export default styles;
