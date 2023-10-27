import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../constants';

const CustomButton = ({onPress, title, isLoading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // fontFamily: 'monterrat',
    color: '#FFF',
  },
});
