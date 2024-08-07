// src/App.tsx
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, commonStyles} from './theme/theme';

import HomeScreen from './pages/HomeScreen';
import SystemScreen from './pages/SystemScreen';
import EventsScreen from './pages/EventsLogScreen';
import ControlsScreen from './pages/ControlsScreen';
import CamerasScreen from './pages/CamerasScreen';
import MoreScreen from './pages/MoreScreen';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'System':
        return <SystemScreen />;
      case 'Events':
        return <EventsScreen />;
      case 'Controls':
        return <ControlsScreen />;
      case 'Cameras':
        return <CamerasScreen />;
      case 'More':
        return <MoreScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const TabButton = ({name, iconName}: {name: string; iconName: string}) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === name && styles.activeTabButton]}
      onPress={() => setActiveTab(name)}>
      <Icon
        name={iconName}
        size={24}
        color={
          activeTab === name ? colors.text.primary : colors.tabBar.inactive
        }
      />
      <Text
        style={[
          styles.tabButtonText,
          activeTab === name && styles.activeTabButtonText,
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        <TabButton name="Home" iconName="home-outline" />
        <TabButton name="System" iconName="shield-outline" />
        <TabButton name="Controls" iconName="toggle-outline" />
        <TabButton name="Events" iconName="list-outline" />
        <TabButton name="More" iconName="ellipsis-horizontal-outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.tabBar.background,
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.tabBar.border,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 1,
    borderColor: colors.tabBar.border,
    backgroundColor: colors.tabBar.background,
  },
  activeTabButton: {
    backgroundColor: colors.tabBar.active,
  },
  tabButtonText: {
    ...typography.tabButtonText,
    color: colors.tabBar.inactive,
    marginTop: 4,
  },
  activeTabButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});

export default App;
