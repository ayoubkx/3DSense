import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';

const printers = [
  { id: '1', name: 'Printer 1', status: 'running' },
  { id: '2', name: 'Printer 2', status: 'idle' },
  { id: '3', name: 'almost printer', status: 'running' },
  { id: '4', name: 'Cool printer', status: 'running' },
  { id: '5', name: 'CornerPrint', status: 'running' },
  { id: '6', name: 'HappyPrint', status: 'idle' },
  { id: '7', name: 'HugePrinter', status: 'running' },
  { id: '8', name: 'Amazing printer', status: 'running' },
  { id: '9', name: 'RightPrinter', status: 'idle' },
  { id: '10', name: 'Left Printer', status: 'running' },
  // Additional printers can be added for demonstration
];

const ViewClusterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const runningCount = printers.filter(printer => printer.status === 'running').length;
  const idleCount = printers.length - runningCount;

  const renderItem = ({ item }) => (
    <View style={[
      styles.printerSquare,
      { backgroundColor: item.status === 'running' ? '#4CAF50' : '#F44336' },
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
    <View style={styles.screen}>
      <Text style={styles.username}>Hello, {user.username}</Text>
      <View style={styles.statusContainer}>
        <Card style={styles.card}>
          <Card.Title
            title="Running"
            subtitle={`${runningCount} printers`}
            left={(props) => <Avatar.Icon {...props} icon="printer" style={styles.iconRunning} />}
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
        </Card>
        <Card style={styles.card}>
          <Card.Title
            title="Idle"
            subtitle={`${idleCount} printers`}
            left={(props) => <Avatar.Icon {...props} icon="printer-off" style={styles.iconIdle} />}
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
        </Card>
      </View>
      <FlatList
        data={printers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#240046',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  card: {
    backgroundColor: '#381e72',
    width: '45%',
  },
  iconRunning: {
    backgroundColor: '#4CAF50',
  },
  iconIdle: {
    backgroundColor: '#F44336',
  },
  cardTitle: {
    color: '#FFFFFF',
  },
  cardSubtitle: {
    color: '#FFFFFF',
  },
  printerSquare: {
    flex: 1,
    height: 100,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Smoother edges
    borderWidth: 1,
    borderColor: '#FFFFFF', // Border color for the squares
  },
  printerText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ViewClusterScreen;
