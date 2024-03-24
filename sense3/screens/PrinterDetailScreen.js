import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import { deletePrinter } from '../config/controllers/printer/deletePrinter';

const PrinterDetailScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { printer } = route.params;

  const handleDeletePrinter = async () => {
    // Call the deletePrinter function with the username and printer name
    const response = await deletePrinter(user.username, printer.printerName);
    if (response.success) {
      Alert.alert('Success', 'Printer deleted successfully');
      // Navigate back to the previous screen 
      navigation.navigate('ViewClusterScreen');
    } else {
      Alert.alert('Error', 'Failed to delete printer');
    }
  };

  return (
    <View style={styles.container}>
      {/* Printer details */}
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{printer.printerName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{printer.status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Printing Time:</Text>
        <Text style={styles.value}>{printer.printingTime || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Idle Time:</Text>
        <Text style={styles.value}>{printer.idleTime || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Uptime in Last 24hrs:</Text>
        <Text style={styles.value}>{printer.uptime || 'N/A'}</Text>
      </View>
      {/* Additional details */}
      <Button
        icon="delete"
        mode="contained"
        onPress={handleDeletePrinter}
        style={styles.deleteButton}
      >
        Delete Printer
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#240046',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#6411ad',
    paddingVertical: 10,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
  },
});

export default PrinterDetailScreen;