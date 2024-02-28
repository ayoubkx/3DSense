import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

const printers = [
    { id: '1', name: 'Printer 1', status: 'running' },
    { id: '2', name: 'Printer 2', status: 'idle' },
    { id: '3', name: 'Printer 3', status: 'running' },
    { id: '4', name: 'Printer 4', status: 'running' },
    { id: '5', name: 'Printer 5', status: 'running' },
    { id: '6', name: 'Printer 6', status: 'idle' },
    { id: '7', name: 'Printer 7', status: 'running' },
    { id: '8', name: 'Printer 8', status: 'running' },
    { id: '9', name: 'Printer 9', status: 'idle' },
    { id: '10', name: 'Printer 10', status: 'running' },
    // Add more printers as needed for demonstration
  ];

  

  const ViewClusterScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
      <View style={[
        styles.printerSquare,
        { backgroundColor: item.status === 'running' ? 'green' : 'red' },
      ]}>
        <Text
          style={styles.printerText}
          onPress={() => navigation.navigate('PrinterDetailScreen', { printer: item })}
        >
          {item.name}
        </Text>
      </View>
    );
  
    return (
      <FlatList
        data={printers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    );
  };

const styles = StyleSheet.create({
  printerSquare: {
    flex: 1,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  printerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ViewClusterScreen;
