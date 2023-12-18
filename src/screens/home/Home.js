import {
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styles from './home.style';
import {useDispatch, useSelector} from 'react-redux';
import FindDevices from './findDevices/FindDevices';
import Welcome from './welcome/Welcome';
import {GetPermissions} from '../../../hook/GetPermissions';
import {
  cleanUpWifiP2P,
  initWifiP2P,
  onGetConnectionInfo,
  onGetGroupInfo,
  onRemoveGroup,
} from '../../../hook/FunctionsP2P';
import p2pService from '../../../hook/P2PService';
import DeviceInfo from 'react-native-device-info';
import {updateConnection, updateUser} from '../../redux/reducers';
import {images} from '../../../constants';
import {ADMIN_CODE} from '@env';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.P2P.user);
  let connectionInterval = useRef();
  const [checkPermission, setCheckPermission] = useState(false);
  const [initedWifiP2P, setInitedWifiP2P] = useState(false);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [codeText, setCodeText] = useState('');

  const handleCreateGroup = () => {
    if (codeText === ADMIN_CODE) {
      const itemWithIsOwner = {...user, isOwner: true};
      dispatch(updateUser(itemWithIsOwner));
      ToastAndroid.show('Tạo nhóm thành công!!', ToastAndroid.SHORT);

      setIsOptionModalOpen(false);
      p2pService.initialize(true);
    } else {
      ToastAndroid.show('Sai mã code, vui lòng nhập lại!!', ToastAndroid.SHORT);
    }
    setCodeText('');
  };

  useEffect(() => {
    let isMounted = true; // Sử dụng biến để kiểm tra xem component còn tồn tại hay không

    const fetchData = async () => {
      try {
        const name = await DeviceInfo.getDeviceName();
        const newUser = {
          img: images.profile,
          deviceName: name,
          available: true,
        };

        if (isMounted) {
          dispatch(updateUser(newUser));
          console.log('User after fetchData:', newUser); // Sử dụng newUser thay vì user
        }

        const check = await onGetGroupInfo();
        if (check) {
          onRemoveGroup();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateConnectionInfo = async () => {
      try {
        const connection = await onGetConnectionInfo();
        if (isMounted) {
          dispatch(updateConnection(connection));
        }
      } catch (error) {
        console.error('Error updating connection:', error);
      }
    };

    async function constructor() {
      const check = await GetPermissions();
      if (isMounted) {
        setCheckPermission(check);
      }

      if (check && !initedWifiP2P && isMounted) {
        await initWifiP2P(dispatch);
        if (isMounted) {
          setInitedWifiP2P(true);
          await fetchData();
          console.log('User after initial update:', user);
          connectionInterval.current = setInterval(updateConnectionInfo, 10000);
        }
      }
    }

    constructor();

    return () => {
      clearInterval(connectionInterval.current);
      cleanUpWifiP2P(dispatch);
      isMounted = false; // Component sẽ unmount, đặt isMounted về false để không cập nhật state nữa
    };
  }, []);

  // Log the updated user state
  useEffect(() => {
    console.log('User updated:', user);
  }, [user]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Welcome user={user} />
        <FindDevices
          navigation={navigation}
          user={user}
          setIsOptionModalOpen={setIsOptionModalOpen}
        />

        <Modal
          animationType="fade"
          visible={isOptionModalOpen}
          transparent={true}
          onRequestClose={() => setIsOptionModalOpen(false)}>
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setIsOptionModalOpen(false)}>
            <TouchableWithoutFeedback>
              <View style={styles.insideModalOption}>
                <View style={styles.modalItem}>
                  <Text style={styles.modalTitle}>
                    Vui lòng nhập code để tạo nhóm
                  </Text>
                  <TextInput
                    value={codeText}
                    onChangeText={text => setCodeText(text)}
                    placeholder="____"
                    maxLength={6}
                    style={styles.modalTextInput}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.modalItem}>
                  <TouchableOpacity
                    style={styles.modalBtn}
                    onPress={() => handleCreateGroup()}>
                    <Text style={styles.modalBtnText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
