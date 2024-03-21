import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';

const AddPrinterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printerName, setPrinterName] = useState('');
  
  const handleAddPrinter = () => {
    console.log('Adding Printer:', printerName);
    navigation.navigate('ProfileScreen');
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
