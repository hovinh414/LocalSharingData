import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splashImage from '../../../assets/images/splash.png'

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const navigateToHome = async navigation => {
  await wait(2000);
  navigation.navigate('BottomTabsNavigator');
};

const Splash = ({ navigation }) => {
  useEffect(() => {
    navigateToHome(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.splashImage}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  splashImage: {
    width: '60%',
    resizeMode: 'contain'
  }
});

export default Splash;
