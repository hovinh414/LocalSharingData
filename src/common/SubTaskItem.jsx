import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const SubTaskItem = ({task, onCheckBoxChange}) => {
  const [completed, setCompleted] = useState(task.isDone)

  const handlePress = () => {
    // Xử lý khi người dùng chạm vào văn bản hoặc hình tròn
    onCheckBoxChange(!completed)
    setCompleted(!completed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.touchable}>
        <View style={[styles.circle, completed && styles.completedCircle]}>
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.titleText}>{task.description}</Text>
      </TouchableOpacity>

      <Text style={styles.descText}>{task.text}</Text>
    </View>
  );
};

export default SubTaskItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 15,
    borderColor: COLORS.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  completedCircle: {
    backgroundColor: COLORS.secondary,
  },
  checkmark: {
    color: 'white',
    fontSize: 10,
  },
  textContainer: {
    // Kiểu dáng cho phần văn bản (title và desc)
  },
  titleText: {
    color: COLORS.black,
    fontSize: SIZES.medium,
  },
  descText: {
    marginHorizontal: 25,
    color: COLORS.gray,
    fontSize: SIZES.small + 2,
    textAlign: 'justify',
  },
});
