import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text } from 'react-native';

const mockPrinters = [
    { id: 'printer1', name: 'Printer 1', status: 'running' },
    { id: 'printer2', name: 'Printer 2', status: 'idle' },
    { id: 'printer3', name: 'Printer 3', status: 'running' },
    // Add more printers as needed
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
            // Here, you would also handle the removal from your backend or state management
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
      numColumns={1} // Set to 1 for a list (change this to 3 for a grid layout)
    />
  );
};

const styles = StyleSheet.create({
  printerItem: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  printerText: {
    fontSize: 16,
  },
});

export default RemovePrinterScreen;
