import { Text, View, ScrollView, Switch, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './settings.style';
import profile from '../../../assets/images/profile.png'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../../../constants';
import { setDarkMode } from '../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window')

const Settings = () => {
  const [avatar, setAvatar] = useState(profile)
  const [name, setName] = useState('Ho va ten')
  const [isEnabled, setIsEnabled] = useState(false);


  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.P2P.darkMode)

  const toggleSwitch = () => {
    dispatch(setDarkMode(!isEnabled))
    setIsEnabled(!isEnabled)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={avatar} style={styles.avatar} />

        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name='person-outline' size={height * 0.02} color={COLORS.black} />

          <Text style={styles.settingText}>Profile</Text>

          <Ionicons name='chevron-forward' size={height * 0.02} color={COLORS.black} />
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <MaterialIcons name='dark-mode' size={height * 0.02} color={COLORS.black} />

          <Text style={styles.settingText}>Dark Mode</Text>

          <Switch
            trackColor={{ false: '#767577', true: COLORS.primary }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name='lock-outline' size={height * 0.02} color={COLORS.black} />

          <Text style={styles.settingText}>Privacy</Text>

          <Ionicons name='chevron-forward' size={height * 0.02} color={COLORS.black} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name='information-circle-outline' size={height * 0.02} color={COLORS.black} />

          <Text style={styles.settingText}>About</Text>

          <Ionicons name='chevron-forward' size={height * 0.02} color={COLORS.black} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <MaterialIcons name='logout' size={height * 0.02} color={COLORS.black} />

          <Text style={styles.settingText}>Log out</Text>

          <Ionicons name='chevron-forward' size={height * 0.02} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Settings;
