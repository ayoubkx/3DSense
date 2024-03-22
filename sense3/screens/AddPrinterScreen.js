import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
// Assuming createPrinter is exported similarly to createUser
import { createPrinter } from '../config/controllers/printer/createPrinter';

const AddPrinterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printerName, setPrinterName] = useState('');
  
  const handleAddPrinter = async () => {
    if (!printerName.trim()) {
      Alert.alert('Error', 'Please enter a printer name.');
      return;
    }
  
    try {
      // Directly use createPrinter function, assuming it's set up to handle printer creation
      // This requires that createPrinter is designed to be used both on the backend and can be called directly from the frontend
      // If createPrinter is not designed this way, you might need a different approach or to adjust its implementation
      const result = await createPrinter(user.username, printerName);

      if (result.success) {
        console.log('Printer added successfully:', result.printerData);
        navigation.navigate('ProfileScreen'); // Ensure this screen is in your navigation configuration
      } else {
        Alert.alert('Error', result.error || 'Failed to add printer');
      }
    } catch (error) {
      console.error('Error adding printer:', error);
      Alert.alert('Error', 'An error occurred while adding the printer');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Printer Name"
        value={printerName}
        onChangeText={setPrinterName}
        mode="contained"
        theme={{ colors: { primary: '#6411ad', underlineColor: 'transparent', background: '#240046' } }}
        style={styles.input}
      />
      <Button
        icon="printer"
        mode="contained"
        onPress={handleAddPrinter}
        style={styles.button}
        color="#6411ad"
      >
        Add Printer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#240046',
  },
  input: {
    marginBottom: 20,
    
  },
  button: {
    marginTop: 10,
  },
});

export default AddPrinterScreen;
