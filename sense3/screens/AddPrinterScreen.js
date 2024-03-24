import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import { createPrinter } from '../config/controllers/printer/createPrinter'; 

const AddPrinterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printerName, setPrinterName] = useState('');
  const [printerId, setPrinterId] = useState('');

  const handleAddPrinter = async () => {
    if (!printerName.trim() || !printerId.trim()) {
      Alert.alert('Error', 'Please enter both printer name and ID.');
      return;
    }

    // Call the createPrinter function 
    const result = await createPrinter(user.username, printerName, printerId);

    // Handle the response from the createPrinter function
    if (result.success) {
      console.log('Printer added successfully:', result.printerData);
      Alert.alert('Success', 'Printer added successfully.');
      navigation.navigate('Profile');
    } else {
      console.error('Error adding printer:', result.error);
      Alert.alert('Error', result.error || 'Failed to add printer.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Printer ID"
        value={printerId}
        onChangeText={setPrinterId}
        mode="contained"
        style={styles.input}
      />
      <TextInput
        label="Printer Name"
        value={printerName}
        onChangeText={setPrinterName}
        mode="contained"
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
