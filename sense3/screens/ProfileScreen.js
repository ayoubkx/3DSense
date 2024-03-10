import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPrinterScreen')}
        style={[styles.button, styles.addButton]}
        labelStyle={styles.buttonText}
        color="#7D3C98" // A distinct color for this button
      >
        Add Printer
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RemovePrintersScreen')}
        style={[styles.button, styles.removeButton]}
        labelStyle={styles.buttonText}
        color="#C0392B" // A distinct color for this button
      >
        Remove Printers
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ViewClusterScreen')}
        style={[styles.button, styles.viewButton]}
        labelStyle={styles.buttonText}
        color="#239B56" // A distinct color for this button
      >
        View Cluster
      </Button>
      <View style={styles.spacer} />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
        style={[styles.button, styles.logoutButton]}
        labelStyle={styles.buttonText}
        color="#515A5A" // A distinct color for this button
      >
        Log Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#240046',
  },
  button: {
    marginVertical: 10,
    width: '75%', 
    borderRadius: 10, 
    paddingVertical: 10, 
    elevation: 3, 
  },
  buttonText: {
    color: '#FFFFFF',
  },
  spacer: {
    flex: 0.7, 
  },
  addButton: {
    backgroundColor: '#7D3C98',
  },
  removeButton: {
    backgroundColor: '#C0392B',
  },
  viewButton: {
    backgroundColor: '#239B56',
  },
  logoutButton: {
    backgroundColor: '#515A5A',
  },
});

export default ProfileScreen;
