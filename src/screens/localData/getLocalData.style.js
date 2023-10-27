import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    paddingBottom: 50,
  },
  textInput: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
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
  itemContainer: {
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 8,
  },
  itemType: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  itemImg: {
    paddingVertical: 4,
    marginLeft: 12,
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  itemName: {
    top: 30,
    color: '#000',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  btnDel: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#C5C7C7',
    borderRadius: 12,
    padding: 5,
  },
  iconImg: {
    paddingVertical: 4,
    width: 20,
    height: 20,
    borderRadius: 12,
  },
});

export default styles;
