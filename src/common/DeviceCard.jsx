import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {images} from '../../constants';

const DeviceCard = ({device}) => {
  return (
    <TouchableOpacity style={styles.deviceCard}>
      <Image source={images.phone} style={styles.phoneIcon} />
      <Text style={styles.deviceName}>{device.deviceName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  deviceCard: {
    flexDirection: 'row',
    marginBottom: 20,
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },

  phoneIcon: {
    width: 50,
    height: 50,
  },

  deviceName: {
    fontWeight: '500',
    color: '#000',
  },
});

export default DeviceCard;
