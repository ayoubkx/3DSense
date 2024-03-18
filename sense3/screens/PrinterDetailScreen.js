import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../config/contexts/AuthContext';

const PrinterDetailScreen = ({ route }) => {
  const { user } = useAuth();
  const { printer } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{printer.name}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#240046', // Dark background for the theme
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#6411ad', // Border color for separation, aligning with theme
    paddingVertical: 10,
  },
  label: {
    color: '#FFFFFF', // White color for labels to ensure readability
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    color: '#FFFFFF', // White color for values to ensure readability
    fontSize: 18,
  },
});

export default PrinterDetailScreen;
