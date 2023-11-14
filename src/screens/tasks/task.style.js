import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  calendarStrip: {
    paddingTop: 5,
    paddingBottom: 15,
    height: '13%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  filterContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 20,
    marginHorizontal: '3%',
    marginTop: '2%',
    borderRadius: 5,
  },

  filterItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
  },

  activeFilterItem: {
    backgroundColor: COLORS.dark,
  },

  inactiveFilterItem: {
    backgroundColor: COLORS.white,
    elevation: 5,
    // borderColor: 'red',
    // borderWidth: 1
  },

  filterText: {
    fontWeight: '500',
    fontSize: 14,
  },

  activeFilterText: {
    color: COLORS.white,
  },

  inactiveFilterText: {
    color: COLORS.gray,
  },

  taskList: {
    marginBottom: '20%',
    flex: 1,
    // backgroundColor: 'red'
  },

  noTasksContainer: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  noTasksImage: {
    height: '25%',
    resizeMode: 'contain',
  },

  noTasks: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.gray,
  },
  buttonAdd: {
    zIndex: 999,
    position: 'absolute',
    bottom: 80,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  textAdd: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  imageAdd: {
    width: 32,
    height: 32,
  },
});

export default styles;
