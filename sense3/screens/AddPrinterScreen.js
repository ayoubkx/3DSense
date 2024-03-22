import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import { createPrinter } from '../config/controllers/printer/createPrinter'; 

const AddPrinterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printerName, setPrinterName] = useState('');

  const handleAddPrinter = async () => {
    if (!printerName.trim()) {
      Alert.alert('Error', 'Please enter a printer name.');
      return;
    }

    // Call the createPrinter function with the current user's username and the provided printer name
    const result = await createPrinter(user.username, printerName);

    // Handle the response from the createPrinter function
    if (result.success) {
      console.log('Printer added successfully:', result.printerData);
      Alert.alert('Success', 'Printer added successfully.');
      navigation.navigate('ProfileScreen');
    } else {
      console.error('Error adding printer:', result.error);
      Alert.alert('Error', result.error || 'Failed to add printer.');
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
