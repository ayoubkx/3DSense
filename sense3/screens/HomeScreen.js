import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/4.png')}
        style={styles.logo}
      />
      <Button
        mode="contained"
        color="#6411ad" // Button background color
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Log In
      </Button>
      <Button
        mode="outlined"
        color="#571089" // Button text and border color for outlined button
        onPress={() => navigation.navigate('CreateAccountScreen')}
        style={[styles.button, styles.outlinedButton]}
        labelStyle={styles.buttonLabel}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#240046', // Dark background color
  },
  button: {
    marginVertical: 10,
    borderRadius: 15, // Makes the button edges squared
    elevation: 4, // Adds a drop shadow for Android
    // Shadow settings for iOS
    shadowColor: '#e0aaff', // Shadow color
    shadowOffset: {
      width: 5,
      height: 2, // Shadow direction and distance
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },
  buttonLabel: {
    color: '#FFFFFF', // Ensuring text is visible on dark buttons
  },
  outlinedButton: {
    borderColor: '#571089', // Outline color for the outlined button
    borderWidth: 1,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default HomeScreen;
