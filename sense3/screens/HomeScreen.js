import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.button}
      >
        Log In
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('CreateAccountScreen')}
        style={styles.button}
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
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
