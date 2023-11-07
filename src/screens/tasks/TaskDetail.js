import {SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import styles from './taskDetail.style';

const TaskDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Task Detail</Text>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetail;
