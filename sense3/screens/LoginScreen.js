import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Formik } from 'formik';
import { useAuth } from '../config/contexts/AuthContext';
import * as Yup from 'yup';

import { loginUser } from '../config/UserService'; 

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  const handleLogin = async (values, actions) => {
    const { username, password } = values;
    const result = await loginUser(username, password);

    if (result.user) {
      console.log('Login successful:', result.user);
      login(result.user);  // Set the user in context
      navigation.navigate('Profile');
    } else {
      console.error('Login error:', result.error);
      actions.setFieldError('general', result.error);
    }

    actions.setSubmitting(false);
  };


  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
          <View>
            <TextInput
              label="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              mode="contained"
              error={touched.username && errors.username}
            />
            <Text style={styles.errorText}>{touched.username && errors.username}</Text>

            <TextInput
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              mode="contained"
              error={touched.password && errors.password}
            />
            <Text style={styles.errorText}>{touched.password && errors.password}</Text>

            {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

            <Button onPress={handleSubmit} mode="contained" style={styles.button} disabled={!isValid || isSubmitting}>
              Log In
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#240046',  // Applying the dark background color
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6411ad',  // Using one of your theme colors for the button
  },
  errorText: {
    fontSize: 14,
    color: 'red',  // You might want to adjust this if you have a specific color for errors in your theme
    marginBottom: 10,
  },
});

export default LoginScreen;