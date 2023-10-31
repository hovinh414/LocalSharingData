import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS } from '../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderBottomColor: COLORS.lightgray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  avatarDetail: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  viewIcon: {
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'column',
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  myMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    margin: 5,
    padding: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  theirMessage: {
    backgroundColor: '#D3D3D3',
    alignSelf: 'flex-start',
    margin: 5,
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
  },
  messageMyText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTheirText: {
    color: '#000',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 55,
    marginBottom: 55,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    fontSize: 16,
  },
  input: {
    flex: 1,
    marginLeft: 12,
  },
  sendButton: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewListImage: {
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 12,
  },
  viewImage: {
    position: 'relative',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    paddingVertical: 4,
    marginLeft: 12,
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  btnRemoveImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#C5C7C7',
    borderRadius: 12, // Bo tròn góc
    padding: 5,
  },
  viewFile: {
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
    marginRight: 10,
  },
  file: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  fileIcon: {
    paddingVertical: 4,
    marginLeft: 12,
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  fileName: {
    top: 30,
    color: '#000',
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  btnRemoveFile: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#C5C7C7',
    borderRadius: 12,
    padding: 5,
  },

  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    zIndex: 999,
    // backgroundColor: 'red'
  },

  bottomSheetItemContainer: {
    height: '100%',
  },

  bottomSheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    height: '50%',
    paddingHorizontal: '5%'
  },

  btnText: {
    marginLeft: '4%',
    fontSize: 15,
    fontWeight: '500'
  }
});
