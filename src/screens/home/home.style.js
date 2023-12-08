import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  textInput: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    backgroundColor: COLORS.primary,
    borderWidth: 0.5,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  buttonContainer: {
    padding: 15,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#D3D3D3',
    marginTop: 5,
  },
  errorStyle: {
    alignSelf: 'center',
    color: '#ff0000',
    marginBottom: 5,
    fontSize: 12,
  },

  modalContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  insideModalOption: {
    width: '85%',
    height: 150,
    borderRadius: 12,
    padding: '4%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.dark,
  },
  modalTextInput: {
    backgroundColor: COLORS.light,
    height: '50%',
    width: 200,
    borderRadius: 12,
    borderWidth: 0.5,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  modalItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  modalBtn: {
    height: 35,
    width: 70,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBtnText: {
    fontSize: 14,
    color: COLORS.light,
    fontWeight: '500',
  },
});
export default styles;
