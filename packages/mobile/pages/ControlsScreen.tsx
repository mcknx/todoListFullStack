import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {colors, typography, layout, commonStyles} from '../theme/theme';

interface Section {
  title: string;
  icon: string;
  items: {
    label: string;
    icon: string;
  }[];
}

interface OutputItemProps {
  label: string;
  icon: string;
}

const OutputItem: React.FC<OutputItemProps> = ({label, icon}) => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleOutput = () => setIsEnabled(prevState => !prevState);

  return (
    <TouchableOpacity style={styles.item} onPress={toggleOutput}>
      <View style={styles.itemContent}>
        <Icon
          name={icon}
          size={24}
          color={isEnabled ? '#4CAF50' : colors.text.secondary}
        />
        <Text style={[styles.itemLabel, isEnabled && styles.itemLabelEnabled]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const sections: Section[] = [
  {
    title: 'Lighting',
    icon: 'sun',
    items: [
      {label: 'Front Porch Light', icon: 'zap'},
      {label: 'Backyard Floodlight', icon: 'zap'},
      {label: 'Garage Overhead Light', icon: 'zap'},
    ],
  },
  {
    title: 'Irrigation',
    icon: 'droplet',
    items: [
      {label: 'Front Lawn Sprinklers', icon: 'cloud-drizzle'},
      {label: 'Backyard Garden Drip System', icon: 'cloud-drizzle'},
    ],
  },
  {
    title: 'Security',
    icon: 'shield',
    items: [
      {label: 'Front Door Camera', icon: 'video'},
      {label: 'Backyard Motion Sensor', icon: 'activity'},
    ],
  },
];

export default function ControlsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = sections
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(section => section.items.length > 0);

  return (
    <View style={commonStyles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search outputs..."
          placeholderTextColor={colors.text.secondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView style={styles.main}>
        {filteredSections.map((section, index) => (
          <View key={index} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name={section.icon} size={24} color={colors.text.primary} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <View style={styles.itemsContainer}>
              {section.items.map((item, itemIndex) => (
                <OutputItem
                  key={itemIndex}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.background,
    padding: layout.padding,
  },
  searchBar: {
    ...typography.subtitle,
    color: colors.text.primary,
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
    padding: layout.padding / 2,
  },
  main: {
    flex: 1,
    padding: layout.padding,
  },
  section: {
    marginBottom: layout.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.padding / 2,
  },
  sectionTitle: {
    ...typography.cardTitle,
    marginLeft: layout.padding / 2,
    color: colors.text.primary,
  },
  itemsContainer: {},
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: layout.borderRadius,
    backgroundColor: colors.card,
    marginBottom: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    color: colors.text.secondary,
    marginLeft: 12,
  },
  itemLabelEnabled: {
    color: '#4CAF50',
  },
});
