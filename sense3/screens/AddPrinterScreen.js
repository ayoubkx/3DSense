import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';

const AddPrinterScreen = ({ navigation }) => {
  const [printerName, setPrinterName] = useState('');
  const [printerId, setPrinterId] = useState('');

  const handleAddPrinter = () => {
    // Here you would usually send the printer data to your backend or database
    console.log('Adding Printer:', printerName, printerId);

    
    navigation.navigate('ProfileScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Printer Name"
        value={printerName}
        onChangeText={setPrinterName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Printer ID"
        value={printerId}
        onChangeText={setPrinterId}
        mode="outlined"
        style={styles.input}
      />
      <Button title="Add Printer" onPress={handleAddPrinter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
});

export default AddPrinterScreen;
