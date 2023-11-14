import {StyleSheet} from 'react-native';
import {COLORS, SHADOWS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  light1: {
    height: 225,
    width: 90,
  },
  light2: {
    height: 160,
    width: 65,
  },
  formContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 50,
    paddingBottom: 10,
  },
  title: {
    paddingTop:60,
    display: 'flex',
    alignItems: 'center',
  },
  titleStyle: {
    
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 35,
  },
  textInput: {
    marginLeft:15,
  },
  inputContainer: {
    display:'flex',
    alignItems:'center',
    marginHorizontal:5,
  },
  user: {
    backgroundColor:'#0000000D',
    padding:5,
    borderRadius:15,
    width:'90%',
    height:60,
    marginBottom:20,
    borderWidth:0.5,
  },
  password: {
    backgroundColor:'#0000000D',
    padding:5,
    borderRadius:15,
    width:'90%',
    height:60,
    marginBottom:30,
    borderWidth:0.5,
  },
  buttonContainer: {
    width:'90%',
  },
  buttonLogin: {
    width:'100%',
    backgroundColor:COLORS.primary,
    borderRadius:15,
    padding:5,
    marginBottom:3,
  },
  buttonText: {
    fontWeight:'bold',
    color:COLORS.white,
    textAlign:'center',
    fontSize:20,
    padding:5,
  },
  passwordShow: {
    position: 'absolute',
    right: 12,
    top: 17.5,
  }
});
export default styles;
