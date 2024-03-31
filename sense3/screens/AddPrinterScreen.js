import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Modal } from 'react-native';
import { Button, TextInput, FAB } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import { createPrinter } from '../config/controllers/printer/createPrinter';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AddPrinterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printerName, setPrinterName] = useState('');
  const [printerId, setPrinterId] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setPrinterId(data);
    setScannerVisible(false);
    Alert.alert('Scan successful!', `Printer ID: ${data}`);
  };

  const handleAddPrinter = async () => {
    if (!printerName.trim() || !printerId.trim()) {
      Alert.alert('Error', 'Please enter both printer name and ID.');
      return;
    }

    const result = await createPrinter(user.username, printerName, printerId);

    if (result.success) {
      Alert.alert('Success', 'Printer added successfully.');
      navigation.navigate('Profile');
    } else {
      Alert.alert('Error', result.error || 'Failed to add printer.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWithIcon}>
      <TextInput
        label="Printer ID"
        value={printerId}
        onChangeText={setPrinterId}
        mode="contained"
        style={styles.input}
      />
      {hasPermission === false && <Text>No access to camera</Text>}
      <FAB
        style={styles.fab}
        small
        icon="qrcode-scan"
        onPress={() => setScannerVisible(true)}
        color="#6411ad"
      />
      </View>
      <TextInput
        label="Printer Name"
        value={printerName}
        onChangeText={setPrinterName}
        mode="contained"
       
        style={styles.inputName}
      />
      <Button
        mode="contained"
        onPress={handleAddPrinter}
        style={styles.button}
        color="#6411ad"
      >
        Add Printer
      </Button>


      {scannerVisible && (
        <Modal
          visible={scannerVisible}
          onRequestClose={() => setScannerVisible(false)}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalView}>
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <Button 
              icon="camera-off" 
              mode="contained" 
              onPress={() => setScannerVisible(false)} 
              style={styles.modalButton}
              color="#D32F2F"
            >
              Cancel Scan
            </Button>
          </View>
        </Modal>
      )}
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
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10, 
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  inputName: {
    
    marginBottom: 34,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6411ad',
    paddingVertical: 10,
    borderRadius: 15, 
  
    paddingHorizontal: 20,
  },
  fab: {
    position: 'relative',
    margin: 16,
    marginBottom: 34,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
  },
});

export default AddPrinterScreen;
