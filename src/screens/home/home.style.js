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
});
export default styles;
