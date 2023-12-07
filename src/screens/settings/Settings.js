import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './settings.style';
import profile from '../../../assets/images/profile.png';
const Settings = ({navigation}) => {
  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const navigateToSecurity = () => {
    console.log('Security function');
  };

  const navigateToNotifications = () => {
    console.log('Notifications function');
  };

  const navigateToPrivacy = () => {
    console.log('Privacy function');
  };

  const navigateToSubscription = () => {
    console.log('Subscription function');
  };

  const navigateToSupport = () => {
    console.log('Support function');
  };

  const navigateToTermsAndPolicies = () => {
    console.log('Terms and Policies function');
  };

  const navigateToFreeSpace = () => {
    console.log('Free Space function');
  };

  const navigateToDateSaver = () => {
    console.log('Date saver');
  };

  const navigateToReportProblem = () => {
    console.log('Report a problem');
  };

  const addAccount = () => {
    console.log('Aadd account ');
  };

  const logout = () => {
    Alert.alert('Notification', 'Do you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Log out',
        onPress: () => {
          navigation.navigate('LoginScreen');
        },
      },
    ]);
  };

  const accountItems = [
    {
      icon: 'person-outline',
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },
    {icon: 'lock-closed-outline', text: 'Security', action: navigateToSecurity},
    {
      icon: 'notifications-outline',
      text: 'Notifications',
      action: navigateToNotifications,
    },
    {
      icon: 'shield-checkmark-outline',
      text: 'Privacy',
      action: navigateToPrivacy,
    },
  ];

  const supportItems = [
    {
      icon: 'card-outline',
      text: 'My Subscription',
      action: navigateToSubscription,
    },
    {
      icon: 'help-circle-outline',
      text: 'Help & Support',
      action: navigateToSupport,
    },
    {
      icon: 'information-circle-outline',
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
    },
  ];

  const actionsItems = [
    {
      icon: 'flag-outline',
      text: 'Report a problem',
      action: navigateToReportProblem,
    },
    {icon: 'people-outline', text: 'Add Account', action: addAccount},
    {icon: 'log-out-outline', text: 'Log out', action: logout},
  ];
  const [name, setName] = useState('Hoang Nhi');
  const renderSettingsItem = ({icon, text, action}) => (
    <TouchableOpacity onPress={action} style={styles.container}>
      <Ionicons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 600,
          fontSize: 16,
          color: COLORS.black,
        }}>
        {text}{' '}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
      }}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 22, color: COLORS.black}}>
          Settings
        </Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image source={profile} style={styles.avatar} />

        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={{marginHorizontal: 12}}>
        {/* Account Settings */}
        <View style={{marginBottom: 12}}>
          <Text style={styles.settingText}>Account</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: '#E8E8E8',
            }}>
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{marginBottom: 12}}>
          <Text style={styles.settingText}>Support & About </Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: '#E8E8E8',
            }}>
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{marginBottom: 12}}>
          <Text style={styles.settingText}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: '#E8E8E8',
            }}>
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;
