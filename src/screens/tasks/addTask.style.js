import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  textInputContainer: {
    backgroundColor: '#F0F0F0',
    width: '100%',
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
    marginTop: 50,
    marginBottom: 10,
  },
  iconInputContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    paddingLeft: 22,
  },
  textInput: {
    width: '100%',
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top:10,
  },
  backButton: {
    position: 'absolute',
    top:10,
    flexDirection:'row'
  },
  icon: {
    marginRight: 10,
  },
  textInputView: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    width: '100%',
    borderRadius: 16,
    marginBottom: 10,
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerAddDetail: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  headerText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
  },
  contentAddDetail: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 5,
    paddingLeft: 15,
    flexDirection: 'column',
  },
  contentInput: {
    fontSize: 14,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.lightgray,
  },
  taskTextInput: {
    flex: 1,

    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
  buttonView: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    alignItems: 'center',
    padding: 14,
    marginTop: 10, // Adjust this value based on your design
  },
  buttonText: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateTimeView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateTime: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    width: '90%',
    shadowColor: '#000',
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
