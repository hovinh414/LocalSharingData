import {
    View,
    Text,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';
  import styles from '../auth/login.style';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {COLORS, SHADOWS, SIZES} from '../../../constants';
  export default function AddTask() {
    const navigation = useNavigation();
    const [isPasswordShow, setIsPasswordShow] = useState(true);
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/images/background.png')}
        />
  
        {/* lights */}
        <View style={styles.header}>
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            source={require('../../../assets/images/light.png')}
            style={styles.light1}
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(1000).springify()}
            source={require('../../../assets/images/light.png')}
            style={styles.light2}
          />
        </View>
  
        <View style={styles.formContainer}>
          <View style={styles.title}>
            <Animated.Text
              entering={FadeInUp.duration(1000).springify()}
              style={styles.titleStyle}>
              Login
            </Animated.Text>
          </View>
  
          <View style={styles.inputContainer}>
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              style={styles.user}>
              <TextInput
                style={styles.textInput}
                placeholder="User"
                placeholderTextColor={'gray'}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              style={styles.password}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor={'gray'}
                secureTextEntry={isPasswordShow}
              />
              <TouchableOpacity
                onPress={() =>
                  isPasswordShow
                    ? setIsPasswordShow(false)
                    : setIsPasswordShow(true)
                }
                style={styles.passwordShow}>
                {isPasswordShow == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </Animated.View>
  
            <Animated.View
              style={styles.buttonContainer}
              entering={FadeInDown.delay(400).duration(1000).springify()}>
              <TouchableOpacity style={styles.buttonLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
  
            {/* <Animated.View
              entering={FadeInDown.delay(600).duration(1000).springify()}
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('Signup')}>
                <Text>SignUp</Text>
              </TouchableOpacity>
            </Animated.View> */}
          </View>
        </View>
      </View>
    );
  }
  