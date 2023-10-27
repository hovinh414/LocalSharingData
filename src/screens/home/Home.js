import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import styles from './home.style';
import {FlatList} from 'react-native-gesture-handler';
import ChatCard from '../../common/ChatCard';
import {COLORS, SIZES, images} from '../../../constants';
import FindDevices from './findDevices/FindDevices';
import Welcome from './welcome/Welcome';

const Home = () => {
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
