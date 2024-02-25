import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loginUser } from '../config/UserService'; 

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (values, actions) => {
    const { username, password } = values;
    const result = await loginUser(username, password);

    if (result.user) {
        // User found and password confirmed
        console.log('Login successful:', result.user);
        // Perform navigation or state updates as needed
    } else {
        // Login failed, display error message from result.error
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
              mode="outlined"
              error={touched.username && errors.username}
            />
            <Text style={styles.errorText}>{touched.username && errors.username}</Text>

            <TextInput
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              mode="outlined"
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
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
