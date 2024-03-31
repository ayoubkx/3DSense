import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './config/contexts/AuthContext';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPrinterScreen from './screens/AddPrinterScreen';

import ViewClusterScreen from "./screens/ViewClusterScreen";
import PrinterDetailScreen from './screens/PrinterDetailScreen';


const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#240046', 
            },
            headerTintColor: '#fff', // Sets the color of the header title and buttons
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Welcome' }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In' }} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ title: 'Create Account' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerLeft: () => null }} />
          <Stack.Screen name="AddPrinterScreen" component={AddPrinterScreen} options={{ title: 'Add printer' }} />
        
          <Stack.Screen name="ViewClusterScreen" component={ViewClusterScreen} options={{ title: 'View Cluster' }} />
          <Stack.Screen name="PrinterDetailScreen" component={PrinterDetailScreen} options={{ title: 'Status' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
