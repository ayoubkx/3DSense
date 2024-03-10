import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';

const mockPrinters = [
  { id: '1', name: 'Printer 1', status: 'running' },
  { id: '2', name: 'Printer 2', status: 'idle' },
  { id: '3', name: 'almost printer', status: 'running' },
  { id: '4', name: 'Cool printer', status: 'running' },
  { id: '5', name: 'CornerPrint', status: 'running' },
  { id: '6', name: 'HappyPrint', status: 'idle' },
  { id: '7', name: 'HugePrinter', status: 'running' },
  { id: '8', name: 'Amazing printer', status: 'running' },
  { id: '9', name: 'RightPrinter', status: 'idle' },
  { id: '10', name: 'Left Printer', status: 'running' },
  // Additional printers can be added for demonstration
];


const RemovePrinterScreen = () => {
  const [printers, setPrinters] = useState(mockPrinters);
  const [searchQuery, setSearchQuery] = useState('');

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

  const onChangeSearch = query => setSearchQuery(query);

  const filteredPrinters = searchQuery.length > 0
    ? printers.filter(printer => printer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : printers;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.printerItem}
      onPress={() => handleRemovePrinter(item.id)}
    >
      <Text style={styles.printerText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Printers"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredPrinters}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#240046',  // Sets the background color of the container to match the theme
  },
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
  searchbar: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#381e72', // A slightly different shade for contrast while fitting the theme
  },
});

export default RemovePrinterScreen;
