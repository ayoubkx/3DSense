import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth(); // Use the context to access user and logout function

  const handleLogout = () => {
    logout();  // Call logout from context
    navigation.replace('LoginScreen'); // Use replace to avoid going back to the profile after logging out
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user ? user.username : ''}!</Text> 

      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPrinterScreen')}
        style={[styles.button, styles.addButton]}
        labelStyle={styles.buttonText}
        color="#7D3C98"
      >
        Add Printer
      </Button>

      

      <Button
        mode="contained"
        onPress={() => navigation.navigate('ViewClusterScreen')}
        style={[styles.button, styles.viewButton]}
        labelStyle={styles.buttonText}
        color="#239B56"
      >
        View Cluster
      </Button>

      <View style={styles.spacer} />

      <Button
        mode="contained"
        onPress={handleLogout}
        style={[styles.button, styles.logoutButton]}
        labelStyle={styles.buttonText}
        color="#515A5A"
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
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30, // Space above the buttons
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