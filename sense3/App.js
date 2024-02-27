import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddPrinterScreen  from './screens/AddPrinterScreen';
import RemovePrintersScreen from  "./screens/RemovePrintersScreen";
import ViewClusterScreen from  "./screens/ViewClusterScreen";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'profile' }}/>
        <Stack.Screen name="AddPrinterScreen" component={AddPrinterScreen} options={{ title: 'Add printer' }}/>
        <Stack.Screen name="RemovePrintersScreen" component={RemovePrintersScreen} options={{ title: 'Remove Printer' }}/>
        <Stack.Screen name="ViewClusterScreen" component={ViewClusterScreen} options={{ title: 'View Cluster' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
