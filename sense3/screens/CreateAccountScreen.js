import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { createUser } from '../config/controllers/user/createUser.js';

// Updated Validation Schema
const AccountSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const CreateAccountScreen = ({ navigation }) => {
  const handleSignUp = async (values, actions) => {
    const { username, email, password } = values;

    const result = await createUser(username, email, password);

    if (result.user) {
      console.log('User created successfully:', result.user);
      navigation.navigate('LoginScreen');
    } else if (result.error) {
      console.error('Error creating user:', result.error);
      actions.setFieldError('general', result.error);
    }

    actions.setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={AccountSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Username"
              mode="contained"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              style={styles.input}
              error={touched.username && errors.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              label="Email"
              mode="contained"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              label="Password"
              mode="contained"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              label="Confirm Password"
              mode="contained"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              style={styles.input}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              Create Account
            </Button>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#240046', // Dark background color from the theme
  },
  formContainer: {
    marginTop: 15,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6411ad', // Theme color for the button
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateAccountScreen;
