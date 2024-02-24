import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} options={{ title: 'Create Account' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
