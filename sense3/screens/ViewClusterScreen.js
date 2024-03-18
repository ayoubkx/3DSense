import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useAuth } from '../config/contexts/AuthContext';

const printers = [
  { id: '1', name: 'Printer 1', status: 'running' },
  { id: '2', name: 'Printer 2', status: 'idle' },
  { id: '3', name: 'Printer 3', status: 'running' },
  { id: '4', name: 'Printer 4', status: 'running' },
  { id: '5', name: 'Printer 5', status: 'running' },
  { id: '6', name: 'Printer 6', status: 'idle' },
  { id: '7', name: 'Printer 7', status: 'running' },
  { id: '8', name: 'Printer 8', status: 'running' },
  { id: '9', name: 'Printer 9', status: 'idle' },
  { id: '10', name: 'Printer 10', status: 'running' },
  // Additional printers can be added for demonstration
];

const ViewClusterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const runningCount = printers.filter(printer => printer.status === 'running').length;
  const idleCount = printers.length - runningCount;

  const renderItem = ({ item }) => (
    <View style={[
      styles.printerSquare,
      { backgroundColor: item.status === 'running' ? '#4CAF50' : '#F44336' }, // Green for running, red for idle
    ]}>
      <Text
        style={styles.printerText}
        onPress={() => navigation.navigate('PrinterDetailScreen', { printer: item })}
      >
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Running: {runningCount}</Text>
        <Text style={styles.statusText}>Idle: {idleCount}</Text>
      </View>
      <FlatList
        data={printers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#240046', // Background color from your theme
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#240046', // Consistent with the theme's background color
  },
  statusText: {
    color: '#FFFFFF', // White color for better readability
    fontSize: 18,
    fontWeight: 'bold',
  },
  printerSquare: {
    flex: 1,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Smoother edges
    borderWidth: 1,
    borderColor: '#FFFFFF', // Border color for the squares
  },
  printerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ViewClusterScreen;
