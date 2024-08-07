// SystemScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, layout, commonStyles} from '../theme/theme';

const IconComponent = ({
  name,
  size = 24,
  color = colors.primary,
}: {
  name: string;
  size?: number;
  color?: string;
}) => <Icon name={name} size={size} color={color} />;

const GlowingButton = ({
  status,
  onPress,
}: {
  status: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.glowingButton,
      status === 'armed'
        ? styles.glowingButtonArmed
        : styles.glowingButtonDisarmed,
    ]}
    onPress={onPress}>
    <Text style={styles.glowingButtonText}>{status}</Text>
  </TouchableOpacity>
);

const SystemScreen: React.FC = () => {
  const [zones, setZones] = useState([
    {
      name: 'Living Area',
      items: [
        {name: 'Living Room', status: 'armed', sensorStatus: 'online'},
        {name: 'Dining Room', status: 'armed', sensorStatus: 'online'},
        {name: 'Kitchen', status: 'armed', sensorStatus: 'online'},
      ],
    },
    {
      name: 'Bedrooms',
      items: [
        {name: 'Master Bedroom', status: 'armed', sensorStatus: 'online'},
        {name: 'Guest Bedroom', status: 'armed', sensorStatus: 'offline'},
        {name: "Kids' Room", status: 'armed', sensorStatus: 'online'},
      ],
    },
    {
      name: 'Utility Areas',
      items: [
        {name: 'Laundry Room', status: 'armed', sensorStatus: 'online'},
        {name: 'Basement', status: 'armed', sensorStatus: 'online'},
        {name: 'Attic', status: 'armed', sensorStatus: 'offline'},
      ],
    },
    {
      name: 'Outdoor',
      items: [
        {name: 'Garden', status: 'armed', sensorStatus: 'online'},
        {name: 'Patio', status: 'armed', sensorStatus: 'online'},
        {name: 'Front Yard', status: 'armed', sensorStatus: 'online'},
      ],
    },
    {
      name: 'Garage',
      items: [
        {name: 'Main Garage', status: 'armed', sensorStatus: 'online'},
        {name: 'Workshop', status: 'armed', sensorStatus: 'offline'},
      ],
    },
  ]);

  const [expandedZone, setExpandedZone] = useState<number | null>(null);

  const toggleZone = (index: number) => {
    setExpandedZone(expandedZone === index ? null : index);
  };

  const toggleItem = (zoneIndex: number, itemIndex: number) => {
    setZones(prevZones => {
      const newZones = [...prevZones];
      const item = newZones[zoneIndex].items[itemIndex];
      item.status = item.status === 'armed' ? 'disarmed' : 'armed';
      return newZones;
    });
  };

  return (
    <ScrollView style={commonStyles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <IconComponent
            name="shield-checkmark"
            size={36}
            color={colors.primary}
          />
          <Text style={styles.title}>Home Security</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zones</Text>
          {zones.map((zone, zoneIndex) => (
            <View key={zoneIndex} style={styles.zoneCard}>
              <TouchableOpacity
                onPress={() => toggleZone(zoneIndex)}
                style={styles.zoneTrigger}>
                <View style={styles.zoneNameContainer}>
                  <Text style={styles.zoneName}>{zone.name}</Text>
                </View>
                <View style={styles.zoneControls}>
                  <Icon
                    name={
                      expandedZone === zoneIndex ? 'chevron-up' : 'chevron-down'
                    }
                    color={colors.text.primary}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
              {expandedZone === zoneIndex && (
                <View style={styles.zoneContent}>
                  {zone.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.itemRow}>
                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                      </View>
                      <View style={styles.itemControls}>
                        <View style={styles.sensorStatus}>
                          <View
                            style={[
                              styles.statusDot,
                              item.sensorStatus === 'triggered'
                                ? styles.statusTriggered
                                : styles.statusNotTriggered,
                            ]}
                          />
                        </View>
                        <GlowingButton
                          status={item.status}
                          onPress={() => toggleItem(zoneIndex, itemIndex)}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    padding: layout.padding,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    ...typography.title,
    fontSize: 32,
    color: colors.primary,
    marginLeft: 10,
  },
  main: {
    padding: layout.padding,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.cardTitle,
    marginBottom: 16,
    color: colors.text.primary,
  },
  zoneCard: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C2C2C',
  },
  zoneTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: layout.padding,
  },
  zoneNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneName: {
    ...typography.cardTitle,
    marginLeft: 8,
    color: colors.text.primary,
  },
  zoneControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneContent: {
    padding: layout.padding,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusSecured: {
    backgroundColor: '#4CAF50',
  },
  statusNotSecured: {
    backgroundColor: '#F44336',
  },
  itemName: {
    color: colors.text.primary,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureText: {
    ...typography.optionDescription,
    fontWeight: '500',
    color: colors.text.secondary,
    marginRight: 8,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  toggleOn: {
    backgroundColor: '#4CAF50',
  },
  toggleOff: {
    backgroundColor: '#424242',
  },
  toggleHandle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.text.primary,
  },
  toggleHandleOn: {
    alignSelf: 'flex-end',
  },
  toggleHandleOff: {
    alignSelf: 'flex-start',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#1E3D1E',
    width: '48%',
  },
  secondaryButton: {
    backgroundColor: '#3D1E1E',
  },
  buttonText: {
    ...commonStyles.buttonText,
  },
  serverStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  statusOnline: {
    backgroundColor: '#4CAF50',
  },
  statusOffline: {
    backgroundColor: '#F44336',
  },
  serverStatusText: {
    ...typography.optionDescription,
    color: colors.text.secondary,
  },
  glowingButton: {
    padding: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
  },
  glowingButtonArmed: {
    borderColor: '#4CAF50',
    backgroundColor: 'transparent',
  },
  glowingButtonDisarmed: {
    borderColor: '#F44336',
    backgroundColor: 'transparent',
  },
  glowingButtonText: {
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  sensorStatus: {
    marginRight: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusTriggered: {
    backgroundColor: '#F44336',
  },
  statusNotTriggered: {
    backgroundColor: '#4CAF50',
  },
});

export default SystemScreen;
