import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    width: 25,
    height: 25,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: COLORS.lightgray,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  headerText: {
    flex: 1,
    fontSize: SIZES.xLarge,
    fontWeight: '600',
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.primary,
  },

  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  frameContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  inforContainer: {
    width: '90%',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.lightgray,
    // backgroundColor: COLORS.secondary,
  },
  titleText: {
    fontWeight: '600',
    fontSize: SIZES.large,
    color: COLORS.black,
  },
  descText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    textAlign: 'justify',
  },
  imgFlatList: {
    marginTop: 10,
  },
  imgItem: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 12,
    resizeMode: 'cover',
  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  timeText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.red,
    marginHorizontal: 7,
  },

  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  memberText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    marginHorizontal: 7,
  },

  inputContainer: {
    width: '90%',
    gap: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.lightgray,
    // backgroundColor: COLORS.red,
  },
  btnDelete: {
    position: 'absolute',
    top: -2,
    right: 8,
    zIndex: 1,
  },
  fileContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  fileImg: {
    width: 135,
    height: 135,
    marginRight: 10,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  fileName: {
    maxWidth: 150,
    overflow: 'hidden',
    paddingHorizontal: 5,
    textAlign: 'left',
  },
  textInput: {},

  subContainer: {
    width: '90%',
    gap: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.lightgray,
    // backgroundColor: COLORS.yellow,
  },
  titleSubText: {
    fontSize: SIZES.large - 2,
    color: COLORS.black,
  },
  flatList: {},

  footer: {
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: COLORS.red,
  },
  submitBtn: {
    height: 40,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    backgroundColor: COLORS.primary,
  },
  btnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
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
    height: '30%',
    borderRadius: 12,
    paddingHorizontal: '4%',
    backgroundColor: COLORS.white,
  },
  modalItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.gray,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textModalItem: color => ({
    color: color,
    fontSize: SIZES.medium,
    // backgroundColor: COLORS.primary,
  }),

  insideModalDetail: {
    width: '90%',
    maxHeight: '60%',
    borderRadius: 12,
    padding: '4%',
    backgroundColor: COLORS.white,
  },
  fileContentImg: {
    width: 'auto',
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 12,
  },
  fileText: {
    alignSelf: 'flex-start',
  },
});

export default styles;
