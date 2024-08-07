import React, {useState, useMemo, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
  ViewStyle,
  Animated,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, typography, layout, commonStyles} from '../theme/theme';

interface Event {
  id: number;
  name: string;
  time: string;
  zone: string;
  type: 'danger' | 'okay';
}

interface Filters {
  date: string;
  zone: string;
  type: string;
}

interface CustomPickerProps {
  options: {label: string; value: string}[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  style?: ViewStyle;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[styles.pickerTrigger, style]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerTriggerText}>
          {selectedValue || placeholder}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {options.map(option => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionItem}
                  onPress={() => {
                    onValueChange(option.value);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.optionItemText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const EventsLogScreen: React.FC = () => {
  const [filters, setFilters] = useState({
    date: '',
    zone: '',
    type: '',
  });
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const headerHeight = useRef(new Animated.Value(100)).current;

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: 'Server Overload',
      time: '2023-07-01 12:34:56',
      zone: 'Zone A',
      type: 'danger',
    },
    {
      id: 2,
      name: 'System Armed',
      time: '2023-07-01 14:00:00',
      zone: 'Zone B',
      type: 'okay',
    },
    {
      id: 3,
      name: 'Motion Detected',
      time: '2023-07-01 15:30:45',
      zone: 'Zone C',
      type: 'danger',
    },
    {
      id: 4,
      name: 'System Disarmed',
      time: '2023-07-01 18:00:00',
      zone: 'Zone B',
      type: 'okay',
    },
    {
      id: 5,
      name: 'Door Opened',
      time: '2023-07-02 09:15:30',
      zone: 'Zone A',
      type: 'okay',
    },
    {
      id: 6,
      name: 'Fire Alarm Triggered',
      time: '2023-07-02 11:45:22',
      zone: 'Zone C',
      type: 'danger',
    },
    {
      id: 7,
      name: 'System Armed',
      time: '2023-07-02 20:00:00',
      zone: 'Zone A',
      type: 'okay',
    },
    {
      id: 8,
      name: 'Unauthorized Access Attempt',
      time: '2023-07-03 02:30:15',
      zone: 'Zone B',
      type: 'danger',
    },
    {
      id: 9,
      name: 'System Disarmed',
      time: '2023-07-03 08:00:00',
      zone: 'Zone A',
      type: 'okay',
    },
    {
      id: 10,
      name: 'Power Outage',
      time: '2023-07-03 14:20:10',
      zone: 'Zone C',
      type: 'danger',
    },
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [eventsPerPage] = useState<number>(5);

  const toggleHeader = (visible: boolean) => {
    setIsHeaderVisible(visible);
    Animated.timing(headerHeight, {
      toValue: visible ? 100 : 0, // Adjust 100 to match your header height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [field]: value,
    }));
    toggleHeader(false);
  };

  const handleDateChange = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    handleFilterChange('date', formattedDate);
    setDatePickerOpen(false);
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const {date, zone, type} = filters;
      return (
        (!date || event.time.includes(date)) &&
        (!zone || event.zone === zone) &&
        (!type || event.type === type)
      );
    });
  }, [events, filters]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent,
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderEvent = ({item}: {item: Event}) => (
    <View
      style={[
        styles.eventContainer,
        item.type === 'danger' ? styles.dangerBg : styles.okayBg,
      ]}>
      <View style={styles.iconContainer}>
        <Icon
          name={item.type === 'danger' ? 'alert-circle' : 'checkmark-circle'}
          size={24}
          color={item.type === 'danger' ? '#FF453A' : '#32D74B'}
        />
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventInfo}>{`${item.time} - ${item.zone}`}</Text>
      </View>
    </View>
  );

  const filterOptions = [
    {label: 'All Events', value: 'all'},
    {label: 'Date', value: 'date'},
    {label: 'Zone', value: 'zone'},
    {label: 'Type', value: 'type'},
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        onScrollBeginDrag={() => toggleHeader(false)}
        onScrollEndDrag={() => toggleHeader(true)}>
        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <Text style={commonStyles.title}>Events Log</Text>
          <Text style={commonStyles.subtitle}>
            View and manage all events that have occurred in your system.
          </Text>
        </Animated.View>
        <View style={styles.filterContainer}>
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.filterButton,
                filterType === option.value && styles.filterButtonActive,
              ]}
              onPress={() => setFilterType(option.value)}>
              <Text
                style={[
                  styles.filterButtonText,
                  filterType === option.value && styles.filterButtonTextActive,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.filterContent}>
          {filterType === 'date' && (
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setDatePickerOpen(true)}>
              <Text style={styles.datePickerButtonText}>
                {filters.date || 'Select Date'}
              </Text>
            </TouchableOpacity>
          )}
          {filterType === 'zone' && (
            <CustomPicker
              options={[
                {label: 'All Zones', value: ''},
                {label: 'Zone A', value: 'Zone A'},
                {label: 'Zone B', value: 'Zone B'},
                {label: 'Zone C', value: 'Zone C'},
              ]}
              selectedValue={filters.zone}
              onValueChange={value => handleFilterChange('zone', value)}
              placeholder="Select Zone"
              style={styles.filterPicker}
            />
          )}
          {filterType === 'type' && (
            <CustomPicker
              options={[
                {label: 'All Types', value: ''},
                {label: 'Danger', value: 'danger'},
                {label: 'Okay', value: 'okay'},
              ]}
              selectedValue={filters.type}
              onValueChange={value => handleFilterChange('type', value)}
              placeholder="Select Type"
              style={styles.filterPicker}
            />
          )}
        </View>
        <FlatList
          data={currentEvents}
          renderItem={renderEvent}
          keyExtractor={item => item.id.toString()}
          style={styles.eventsList}
          scrollEnabled={false}
        />
        <View style={styles.pagination}>
          {Array.from({length: totalPages}, (_, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.pageButton,
                currentPage === i + 1 && styles.activePageButton,
              ]}
              onPress={() => handlePageChange(i + 1)}>
              <Text
                style={[
                  styles.pageButtonText,
                  currentPage === i + 1 && styles.pageButtonTextActive,
                ]}>
                {i + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={datePickerOpen}
        date={filters.date ? new Date(filters.date) : new Date()}
        onConfirm={handleDateChange}
        onCancel={() => setDatePickerOpen(false)}
        mode="date"
        theme="dark"
      />
    </SafeAreaView>
  );
};

// const BadgeAlertIcon: React.FC = () => <Text style={styles.icon}>⚠️</Text>;

// const CheckIcon: React.FC = () => <Text style={styles.icon}>✅</Text>;
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },

  header: {
    overflow: 'hidden',
    paddingHorizontal: layout.padding,
    paddingTop: layout.padding,
    marginBottom: layout.padding
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: layout.padding,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: layout.borderRadius,
    backgroundColor: colors.card,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    ...typography.buttonText,
    color: colors.text.primary,
  },
  filterButtonTextActive: {
    color: 'yellow',
  },
  filterContent: {
    paddingHorizontal: layout.padding,
    marginBottom: 16,
  },
  datePickerButton: {
    ...commonStyles.button,
    backgroundColor: colors.card,
  },
  datePickerButtonText: {
    ...commonStyles.buttonText,
    color: colors.text.primary,
  },
  pickerTrigger: {
    ...commonStyles.button,
    backgroundColor: colors.card,
    marginBottom: 8,
  },
  pickerTriggerText: {
    ...commonStyles.buttonText,
    color: colors.text.primary,
  },
  eventsList: {
    flex: 1,
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: layout.borderRadius,
    marginBottom: 16,
  },
  dangerBg: {
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
  okayBg: {
    backgroundColor: 'rgba(50, 215, 75, 0.1)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventDetails: {
    flex: 1,
  },
  eventName: {
    ...typography.optionTitle,
    color: colors.text.primary,
  },
  eventInfo: {
    ...typography.optionDescription,
    color: colors.text.secondary,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  pageButton: {
    padding: 8,
    marginHorizontal: 4,
    borderRadius: layout.borderRadius,
    backgroundColor: colors.card,
  },
  activePageButton: {
    backgroundColor: colors.primary,
  },
  pageButtonText: {
    ...typography.tabButtonText,
    color: colors.text.primary,
  },
  pageButtonTextActive: {
    color: colors.text.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
    padding: layout.padding,
    width: '80%',
    maxHeight: '60%',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.tabBar.border,
  },
  optionItemText: {
    ...typography.optionTitle,
    color: colors.text.primary,
  },
  zonePickerTrigger: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: layout.borderRadius,
    borderBottomLeftRadius: layout.borderRadius,
    borderRightWidth: 1,
    borderRightColor: colors.tabBar.border,
  },
  typePickerTrigger: {
    flex: 1,
    backgroundColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopRightRadius: layout.borderRadius,
    borderBottomRightRadius: layout.borderRadius,
  },

  filterPicker: {
    backgroundColor: colors.card,
    borderRadius: layout.borderRadius,
  },
});

export default EventsLogScreen;
