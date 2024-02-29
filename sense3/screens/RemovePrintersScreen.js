import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from 'react-native';

const mockPrinters = [
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
  
];

const RemovePrinterScreen = () => {
  const [printers, setPrinters] = useState(mockPrinters);

  const handleRemovePrinter = (printerId) => {
    Alert.alert(
      'Remove Printer',
      'Are you sure you want to remove this printer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            const updatedPrinters = printers.filter(printer => printer.id !== printerId);
            setPrinters(updatedPrinters);
            // Backend removal logic should also go here
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.printerItem}
      onPress={() => handleRemovePrinter(item.id)}
    >
      <Text style={styles.printerText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={printers}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#240046',  // Sets the background color of the list to match the theme
  },
  printerItem: {
    margin: 10,
    padding: 20,
    backgroundColor: '#6411ad', // Using the accent color for item background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Optional: for slightly rounded corners
  },
  printerText: {
    fontSize: 16,
    color: '#FFFFFF', // Ensuring text is visible against the dark background
  },
});

export default RemovePrinterScreen;
