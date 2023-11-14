import {StyleSheet, Dimensions} from 'react-native';
import VideoPlayer from 'react-native-media-console';
import {useAnimations} from '@react-native-media-console/reanimated';
import React from 'react';

const {width, height} = Dimensions.get('window');

const ViewVideo = uri => {
  return (
    <VideoPlayer
      useAnimations={useAnimations}
      source={uri}
      containerStyle={styles.vidPlayer}
      toggleResizeModeOnFullscreen
      onBack={() => {}}
    />
  );
};

export default ViewVideo;

const styles = StyleSheet.create({
  vidPlayer: {
    ưidth: width,
    height: height * 0.5,
  },
});
