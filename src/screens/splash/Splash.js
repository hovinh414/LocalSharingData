import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const wait = time => new Promise(resolve => setTimeout(resolve, time));

const navigateToHome = async navigation => {
  await wait(2000);
  navigation.navigate('Home');
};

const Splash = ({ navigation }) => {
  useEffect(() => {
    navigateToHome(navigation);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>SPLASH SCREEN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
