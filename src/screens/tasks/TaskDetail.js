import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import styles from './taskDetail.style';

const TaskDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Detail Task</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Title Task</Text>
          <Text style={styles.descText}> kdasfkdsa</Text>
          <Text style={styles.timeText}>08:30 PM</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="Typing...." />

          <TouchableOpacity>
            <Text>Attach</Text>
          </TouchableOpacity>
          {/* <Image /> */}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetail;
