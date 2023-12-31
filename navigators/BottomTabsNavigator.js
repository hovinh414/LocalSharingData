import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomFabBar} from 'rn-wave-bottom-bar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../src/screens/home/Home';
import Chat from '../src/screens/chat/Chat';
import Task from '../src/screens/tasks/Task';
import Settings from '../src/screens/settings/Settings';
import {COLORS, SHADOWS, SIZES} from '../constants';

const Bottom = createBottomTabNavigator();

// Define the tab bar icons as separate components
const HomeTabIcon = ({focused}) => (
  <AntDesign
    name="home"
    size={SIZES.xLarge}
    color={focused ? COLORS.yellow : COLORS.white}
    style={styles.tabBarIcon}
  />
);

const TasksTabIcon = ({focused}) => (
  <Ionicons 
    name="calendar-outline"
    size={SIZES.xLarge}
    color={focused ? COLORS.yellow : COLORS.white}
    style={styles.tabBarIcon}
  />
);

const ChatTabIcon = ({focused}) => (
  <AntDesign
    name="message1"
    size={SIZES.xLarge}
    color={focused ? COLORS.yellow : COLORS.white}
    style={styles.tabBarIcon}
  />
);

const SettingsTabIcon = ({focused}) => (
  <AntDesign
    name="setting"
    size={SIZES.xLarge}
    color={focused ? COLORS.yellow : COLORS.white}
    style={styles.tabBarIcon}
  />
);

// Create a separate component for the custom tab bar
function CustomTabBar(props) {
  return (
    <BottomFabBar
      mode={'default'}
      isRtl={false}
      focusedButtonStyle={SHADOWS.large(COLORS.secondary)}
      bottomBarContainerStyle={styles.tabBarBottomContainer}
      {...props}
    />
  );
}

function BottomTabs() {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.dark,
        tabBarInactiveTintColor: COLORS.white,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={CustomTabBar}
      initialRouteName='Tasks'
      >
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{tabBarIcon: HomeTabIcon}}
      />
      <Bottom.Screen
        name="Tasks"
        component={Task}
        options={{tabBarIcon: TasksTabIcon}}
      />
      <Bottom.Screen
        name="Chat"
        component={Chat}
        options={{tabBarIcon: ChatTabIcon}}
      />
      <Bottom.Screen
        name="Settings"
        component={Settings}
        options={{tabBarIcon: SettingsTabIcon}}
      />
    </Bottom.Navigator>
  );
}

const BottomTabNavigator = () => {
  return <BottomTabs />;
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    shadow: true,
  },
  tabBarIcon: {
    alignItems: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  tabBarBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default BottomTabNavigator;
