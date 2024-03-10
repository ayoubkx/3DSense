import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddPrinterScreen')}
        style={styles.button}
        color="#6411ad" // Consistent with your theme's button color
        labelStyle={styles.buttonText}
      >
        Add Printer
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RemovePrintersScreen')}
        style={styles.button}
        color="#6411ad"
        labelStyle={styles.buttonText}
      >
        Remove Printers
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ViewClusterScreen')}
        style={styles.button}
        color="#6411ad"
        labelStyle={styles.buttonText}
      >
        View Cluster
      </Button>
      <View style={styles.spacer} />
      <Button
        mode="contained"
        onPress={() => {
          // Implement log out functionality
          navigation.navigate('LoginScreen');
        }}
        style={styles.button}
        color="#6411ad"
        labelStyle={styles.buttonText}
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
    backgroundColor: '#240046', // Sets the background color to match the dark theme
  },
  button: {
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Sets the button text color to white for contrast
  },
  spacer: {
    height: 200,  // Adjust the height to create more or less space
  },
  logoutButton: {
    marginTop: 50,  // Adds extra space above the logout button
  },
});

export default ProfileScreen;