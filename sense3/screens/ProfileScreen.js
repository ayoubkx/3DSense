import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Add Printer"
        onPress={() => navigation.navigate('AddPrinterScreen')}
      />
      <Button
        title="Remove Printers"
        onPress={() => navigation.navigate('RemovePrintersScreen')}
      />
      <Button
        title="View Cluster"
        onPress={() => navigation.navigate('ViewClusterScreen')}
      />
      <Button
        title="Log Out"
        onPress={() => {
          // Implement log out functionality
          navigation.navigate('LoginScreen');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
