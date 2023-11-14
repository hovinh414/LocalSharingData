import {SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './home.style';
import {useDispatch, useSelector} from 'react-redux';
import FindDevices from './findDevices/FindDevices';
import Welcome from './welcome/Welcome';
import {GetPermissions} from '../../../hook/GetPermissions';
import {cleanUpWifiP2P, initWifiP2P} from '../../../hook/FunctionsP2P';

const Home = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function constructor() {
      const check = await GetPermissions();
      if (check) {
        await initWifiP2P(dispatch);
      }
    }
    constructor();

    // Hàm này sẽ được gọi khi component unmount
    return () => {
      cleanUpWifiP2P(dispatch);
    };
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Welcome />
        <FindDevices navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
