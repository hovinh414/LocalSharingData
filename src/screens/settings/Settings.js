import {Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './settings.style';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
