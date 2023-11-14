import React from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import styles from './addTask.style';
import {COLORS} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DateTimeModal = ({
  visible,
  onDateChanged,
  setDate,
  handleOnPressStartDate,
}) => {
  const currentDate = new Date();
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <DatePicker
            minimumDate={format(currentDate, 'yyyy-MM-dd')}
            onDateChanged={onDateChanged}
            onSelectedChange={setDate}
            options={{
              backgroundColor: '#FFF',
              textHeaderColor: COLORS.primary,
              textDefaultColor: COLORS.black,
              selectedTextColor: COLORS.white,
              mainColor: COLORS.primary,
              textSecondaryColor: COLORS.lightblack,
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
          />
          {/* <DatePicker
            mode="time"
            minuteInterval={5}
            onTimeChange={setTime}
            options={{
              backgroundColor: '#FFF',
              textHeaderColor: COLORS.primary,
              textDefaultColor: COLORS.black,
              selectedTextColor: '#fff',
              mainColor: COLORS.primary,
              textSecondaryColor: '#FFFFFF',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            
          /> */}
          <TouchableOpacity
          style={styles.closeButton}
            onPress={handleOnPressStartDate}>
            <Ionicons name="close-outline" size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DateTimeModal;
