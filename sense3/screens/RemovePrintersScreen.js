import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, TouchableOpacity, Text, TextInput } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import API from '../config/api'; 

const RemovePrinterScreen = () => {
  const { user } = useAuth();
  const [printers, setPrinters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await API.get(`/printers.json?orderBy="username"&equalTo="${user.username}"`);
        const fetchedPrinters = response.data ? Object.entries(response.data).map(([id, data]) => ({
          id,
          ...data
        })) : [];
        setPrinters(fetchedPrinters);
      } catch (error) {
        console.error("Error fetching printers:", error);
        Alert.alert("Error", "Failed to fetch printers.");
      }
    };

    fetchPrinters();
  }, [user.username]);

  const handleRemovePrinter = async (printerId) => {
    Alert.alert(
      'Remove Printer',
      'Are you sure you want to remove this printer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: async () => {
            try {
              await API.delete(`/printers/${printerId}.json`);
              const updatedPrinters = printers.filter(printer => printer.id !== printerId);
              setPrinters(updatedPrinters);
              Alert.alert("Success", "Printer removed successfully.");
            } catch (error) {
              console.error("Error removing printer:", error);
              Alert.alert("Error", "Failed to remove printer.");
            }
          }
        },
      ]
    );
  };

  const onChangeSearch = query => setSearchQuery(query);

  const filteredPrinters = searchQuery.length > 0
    ? printers.filter(printer => printer.printerName.toLowerCase().includes(searchQuery.toLowerCase()))
    : printers;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.printerItem}
      onPress={() => handleRemovePrinter(item.id)}
    >
      <Text style={styles.printerText}>{item.printerName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search Printers"
        placeholderTextColor="#FFFFFF" 
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchInput} 
        theme={{ colors: { text: '#FFFFFF' } }} 
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
    backgroundColor: '#240046',  
  },
  list: {
    backgroundColor: '#240046', 
  },
  printerItem: {
    margin: 10,
    padding: 20,
    backgroundColor: '#6411ad', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, 
  },
  printerText: {
    fontSize: 16,
    color: '#FFFFFF', 
  },
  searchbar: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#381e72', 
  },
  searchInput: {
    color: '#FFFFFF', 
  },
});

export default RemovePrinterScreen;
