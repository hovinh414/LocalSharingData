import React, {useState, useEffect, useCallback} from 'react';
import {View, Text} from 'react-native';
import styles from './welcome.style';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

const Welcome = ({user}) => {
  const [role, setRole] = useState('');
  const [connection, setConnection] = useState('');

  const checkRole = useCallback(() => {
    if (user.isOwner === undefined) {
      setRole('Undefined');
    } else if (user.isOwner) {
      setRole('Admin');
    } else {
      setRole('Employee');
    }
  }, [user.isOwner]);

  const checkConnection = useCallback(() => {
    if (user.connection.groupFormed) {
      setConnection('Connected');
    } else {
      setConnection('Disconnected');
    }
  }, [user.connection.groupFormed]);

  useEffect(() => {
    checkRole();
    checkConnection();
  }, [checkRole, checkConnection]);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.userName}>Hello {user.deviceName}</Text>
          <Text style={styles.welcomeMessage}>Find your connect</Text>
        </View>

        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 10,
            gap: 5,
          }}>
          <Text style={styles.connectionText}>
            Connection Status:
            <Text style={styles.statusConnectText(connection)}>
              {' '}
              {connection}
            </Text>
          </Text>
          <Text style={styles.roleText}>Role: {role}</Text>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
