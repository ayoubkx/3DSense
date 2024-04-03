import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import { deletePrinter } from '../config/controllers/printer/deletePrinter';

const PrinterDetailScreen = ({ route, navigation }) => {
  const { user } = useAuth();
  const { printer } = route.params;

  const handleDeletePrinter = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this printer?",
      [
        // The "No" button
        // Does nothing but dismiss the dialog when pressed
        {
          text: "No",
          style: "cancel",
        },
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            const response = await deletePrinter(user.username, printer.printerName);
            if (response.success) {
              Alert.alert('Success', 'Printer deleted successfully');
              // Navigate back to the cluster screen
              navigation.navigate('ViewClusterScreen');
            } else {
              Alert.alert('Error', response.error || 'Failed to delete printer');
            }
          },
        },
      ],
      { cancelable: true } // This allows the alert to be dismissed by tapping outside of the alert dialog
    );
  };

  const calculateRunningTime = () => {
    if (!printer.startTime) return 'N/A';
  
    // Parse the date string
    const dateTimeParts = printer.startTime.match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+) (\w+)/);
    if (!dateTimeParts) return 'N/A';
  
    const [ , month, day, year, hour, minute, second, meridiem] = dateTimeParts;
    let hours = parseInt(hour, 10);
    // Adjust for AM/PM
    if (meridiem === 'PM' && hours < 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;
  
    // Construct a Date object using local time
    const startTime = new Date(year, month - 1, day, hours, parseInt(minute, 10), parseInt(second, 10));
    const currentTime = new Date(); // Already in local timezone
    const diff = currentTime - startTime; // Difference in milliseconds
  
    const elapsedHours = Math.floor(diff / (3600 * 1000));
    const elapsedMinutes = Math.floor((diff / (60 * 1000)) % 60);
    const elapsedSeconds = Math.floor((diff / 1000) % 60); // Calculate seconds
  
    return `${elapsedHours}h ${elapsedMinutes}m ${elapsedSeconds}s`;
  };

  const runningTimeDisplay = printer.runningTime ? printer.runningTime : calculateRunningTime();

  
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
        <Text style={styles.label}>Start Time:</Text>
        <Text style={styles.value}>{printer.startTime || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>End Time:</Text>
        <Text style={styles.value}>{printer.endTime || 'N/A'}</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.label}>Running Time:</Text>
        <Text style={styles.value}>{runningTimeDisplay}</Text>
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