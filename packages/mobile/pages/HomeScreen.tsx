// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, layout, commonStyles} from '../theme/theme';

const IconComponent = ({name}: {name: string}) => (
  <View style={styles.iconContainer}>
    <Icon name={name} size={24} color={colors.primary} />
  </View>
);

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={styles.header}>
          <Text style={commonStyles.title}>Connect Your Device</Text>
          <Text style={commonStyles.subtitle}>
            Pair your application with your alarm device.
          </Text>
        </View>
        <View style={commonStyles.card}>
          <Text style={commonStyles.cardTitle}>Connect Options</Text>
          <View style={styles.optionsContainer}>
            <Option
              iconName="qr-code-outline"
              title="Scan QR Code"
              description="Quickly pair your device by scanning a QR code."
            />
            <Option
              iconName="keypad-outline"
              title="Manual Entry"
              description="Enter your device name and ID to connect."
            />
            <Option
              iconName="wifi-outline"
              title="Auto Connect"
              description="Automatically detect and connect to your device."
            />
          </View>
        </View>
        <TouchableOpacity style={commonStyles.buttonOutline}>
          <Text style={commonStyles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Option = ({
  iconName,
  title,
  description,
}: {
  iconName: string;
  title: string;
  description: string;
}) => (
  <View style={styles.option}>
    <IconComponent name={iconName} />
    <View style={styles.optionText}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    ...typography.optionTitle,
    color: colors.text.primary,
  },
  optionDescription: {
    ...typography.optionDescription,
    color: colors.text.secondary,
  },
});

export default HomeScreen;
