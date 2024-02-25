import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { createUser } from '../config/UserService';

// Updated Validation Schema
const AccountSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const CreateAccountScreen = ({ navigation }) => {
  const handleSignUp = async (values, actions) => {
    const { username, email, password } = values;
    
    // Call the createUser function and pass the necessary data
    const result = await createUser(username, email, password);
    
    if (result.user) {
      console.log('User created successfully:', result.user);
      // Optionally navigate to the login screen or main app screen
      // navigation.navigate('LoginScreen');
    } else if (result.error) {
      console.error('Error creating user:', result.error);
      // Show an error message to the user
      actions.setFieldError('general', result.error);
    }
  
    // Reset form or perform additional actions after submission
    actions.setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={AccountSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View style={styles.formContainer}>
            <TextInput
              label="Username"
              mode="outlined"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              error={touched.username && errors.username}
            />
            {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && errors.email}
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <TextInput
              label="Password"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password}
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <TextInput
              label="Confirm Password"
              mode="outlined"
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
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
  },
  formContainer: {
    marginTop: 15,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CreateAccountScreen;
