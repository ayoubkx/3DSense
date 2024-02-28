import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrinterDetailScreen = ({ route }) => {
  const { printer } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.detailText}>Name: {printer.name}</Text>
      <Text style={styles.detailText}>Status: {printer.status}</Text>
      <Text style={styles.detailText}>Printing Time: {printer.printingTime || 'N/A'}</Text>
      <Text style={styles.detailText}>Idle Time: {printer.idleTime || 'N/A'}</Text>
      <Text style={styles.detailText}>Uptime in Last 24hrs: {printer.uptime || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PrinterDetailScreen;
