import {SafeAreaView, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './home.style';
import {useDispatch, useSelector} from 'react-redux';
import FindDevices from './findDevices/FindDevices';
import Welcome from './welcome/Welcome';
import {GetPermissions} from '../../../hook/GetPermissions';
import {InitWifiP2P} from '../../../hook/FunctionsP2P';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function constructor() {
      const check = await GetPermissions();
      if (check) {
        await InitWifiP2P(dispatch);
      }
    }
    constructor();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Welcome />
        <FindDevices />
      </ScrollView>
      {/* <FindDevices /> */}
    </SafeAreaView>
  );
};

export default Home;
