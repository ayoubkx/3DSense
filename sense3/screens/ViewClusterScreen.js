import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useAuth } from '../config/contexts/AuthContext';
import API from '../config/api';
import db from '../config/firebaseconfig';
import { getDatabase, ref, onValue, query, orderByChild, equalTo } from 'firebase/database';;

const ViewClusterScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [printers, setPrinters] = useState([]);

  useEffect(() => {
    const dbRef = ref(db, 'printers');
    const printersQuery = query(dbRef, orderByChild('username'), equalTo(user.username));
  
    const unsubscribe = onValue(printersQuery, (snapshot) => {
      const data = snapshot.val();
      const fetchedPrinters = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setPrinters(fetchedPrinters);
    });
  
    return () => unsubscribe();
  }, [user.username]);
  

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
        {item.printerName}
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
