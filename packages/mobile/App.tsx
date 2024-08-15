import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  PanResponder,
  LayoutChangeEvent,
  PanResponderGestureState,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, commonStyles, typography} from './theme/theme';
// Import screens
import HomeScreen from './pages/HomeScreen';
import SystemScreen from './pages/SystemScreen';
import EventsScreen from './pages/EventsLogScreen';
import ControlsScreen from './pages/ControlsScreen';
import CamerasScreen from './pages/CamerasScreen';

const GRID_SIZE = 3; // 3x3 grid
const ITEM_SIZE = 110; // Size of each item in the grid

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [items, setItems] = useState(() =>
    [
      {id: '1', name: 'Home', iconName: 'home-outline'},
      {id: '2', name: 'System', iconName: 'shield-outline'},
      {id: '3', name: 'Controls', iconName: 'toggle-outline'},
      {id: '4', name: 'Events', iconName: 'list-outline'},
      {id: '5', name: 'Cameras', iconName: 'camera-outline'},
      {id: '6', name: 'Timers', iconName: 'time-outline'},
      {id: '7', name: 'Keypad', iconName: 'keypad-outline'},
      {id: '8', name: 'Notify', iconName: 'notifications-outline'},
      {id: '9', name: 'Help', iconName: 'help-outline'},
    ].map((item, index) => ({
      ...item,
      position: new Animated.ValueXY({x: 0, y: 0}),
    })),
  );
  const [savedItems, setSavedItems] = useState(items);

  const panResponderRefs = useState(() =>
    items.map((_, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          onMove(index, gestureState);
        },
        onPanResponderRelease: (_, gestureState) => {
          onRelease(index, gestureState);
        },
      }),
    ),
  )[0];

  const onMove = (
    draggedItemIndex: number,
    gestureState: PanResponderGestureState,
  ) => {
    const draggedItem = items[draggedItemIndex];

    draggedItem.position.setValue({
      x: gestureState.moveX - ITEM_SIZE / 2,
      y: gestureState.moveY - ITEM_SIZE / 2,
    });
  };

  const onRelease = (
    draggedItemIndex: number,
    gestureState: PanResponderGestureState,
  ) => {
    const {moveX, moveY} = gestureState;

    const row = Math.floor(moveY / ITEM_SIZE);
    const col = Math.floor(moveX / ITEM_SIZE);
    const dropIndex = row * GRID_SIZE + col;

    if (dropIndex >= 0 && dropIndex < GRID_SIZE * GRID_SIZE) {
      const updatedItems = [...items];
      const draggedItem = updatedItems.splice(draggedItemIndex, 1)[0];
      updatedItems.splice(dropIndex, 0, draggedItem);

      setItems(updatedItems);

      items.forEach((item, index) => {
        const x = (index % GRID_SIZE) * ITEM_SIZE;
        const y = Math.floor(index / GRID_SIZE) * ITEM_SIZE;
        Animated.spring(item.position, {
          toValue: {x, y},
          useNativeDriver: false,
        }).start();
      });
    } else {
      const x = (draggedItemIndex % GRID_SIZE) * ITEM_SIZE;
      const y = Math.floor(draggedItemIndex / GRID_SIZE) * ITEM_SIZE;
      Animated.spring(items[draggedItemIndex].position, {
        toValue: {x, y},
        useNativeDriver: false,
      }).start();
    }
  };

  const onLayout = (e: LayoutChangeEvent) => {
    items.forEach((item, index) => {
      const x = (index % GRID_SIZE) * ITEM_SIZE;
      const y = Math.floor(index / GRID_SIZE) * ITEM_SIZE;
      item.position.setValue({x, y});
    });
  };

  const handleSave = () => {
    setSavedItems(items);
    setIsMoreModalVisible(false);
  };

  const handleReset = () => {
    setItems(savedItems);
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
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Screen content */}
      <View style={styles.content}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        {savedItems.slice(0, 4).map(tab => (
          <TabButton key={tab.id} name={tab.name} iconName={tab.iconName} />
        ))}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsMoreModalVisible(true)}>
          <Icon
            name="ellipsis-horizontal-outline"
            size={24}
            color={colors.tabBar.inactive}
          />
          <Text style={styles.tabButtonText}>More</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMoreModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsMoreModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rearrange Menu</Text>
            <View style={styles.gridContainer} onLayout={onLayout}>
              {items.map((item, index) => (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.item,
                    {transform: item.position.getTranslateTransform()},
                  ]}
                  {...panResponderRefs[index].panHandlers}>
                  <Icon
                    name={item.iconName}
                    size={24}
                    color={colors.text.primary}
                  />
                  <Text style={styles.gridItemText}>{item.name}</Text>
                </Animated.View>
              ))}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    // your screen content styles here
  },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    ...typography.title,
    color: colors.text.primary,
    textAlign: 'center',
  },
  gridContainer: {
    width: GRID_SIZE * ITEM_SIZE + 20, // Adjusted width to include padding
    height: GRID_SIZE * ITEM_SIZE + 20, // Adjusted height to include padding
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10, // Added padding
  },
  item: {
    width: ITEM_SIZE - 10, // Adjusted width for padding
    height: ITEM_SIZE - 10, // Adjusted height for padding
    backgroundColor: colors.tabBar.background,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5, // Added margin for spacing between items
  },

  gridItemText: {
    ...typography.tabButtonText,
    color: colors.text.primary,
    marginTop: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resetButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.text.secondary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  resetButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.text.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: colors.background,
    fontWeight: 'bold',
  },
});

export default App;
