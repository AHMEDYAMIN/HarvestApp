import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Slices/authSlice';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [pinErrorMsg, setPinErrorMsg] = useState('');
  const [showPin, setShowPin] = useState(true);

  const dispatch = useDispatch(); 

  const handleEmailChange = (masked) => {
    const filteredEmail = masked.replace(/[^a-zA-Z0-9@._-]/g, '');

    if (filteredEmail.length === 0) {
      setEmail('');
      setEmailErrorMsg('');
    } else if (filteredEmail) {
      setEmail(filteredEmail);
      setEmailErrorMsg('');
    } else {
      setEmail('');
      setEmailErrorMsg('Invalid characters detected.');
    }
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setEmailErrorMsg('Please enter a valid email address.');
    }
  };

  const handlePinChange = (code) => {
    // Updated regex to allow numbers, alphabets, and special characters
    const filteredPin = code.replace(/[^a-zA-Z0-9!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]/g, '');
    if (filteredPin.length === 0) {
      setPin('');
      setPinErrorMsg('');
    } else if (filteredPin) {
      setPin(filteredPin);
      setPinErrorMsg('');
    } else {
      setPin('');
      setPinErrorMsg('PIN must be alphanumeric or contain special characters.');
    }
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.getharvest.app/auth/login', {
        email,
        password: pin,
      });

      console.log(response.data); // Log the entire response data

      if (response.data.access_token) { // Check for access_token instead of token
        dispatch(loginSuccess(response.data.access_token)); // Save the token in Redux
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
          position: 'bottom',
        });
        navigation.navigate('MutualFunds'); // Navigate to MutualFundsScreen upon successful login
      } else {
        // setPinErrorMsg('Invalid login credentials');
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid login credentials.',
          position: 'bottom',
        });
      }
    } catch (error) {
      console.log('Error:', error.response ? error.response.data : error.message);
      setPinErrorMsg('Login failed. Please try again.');
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please check your credentials and try again.',
        position: 'bottom',
      });
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.loginContainer}>
          <Text style={styles.heading}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#9a9a9a"
            value={email}
            onChangeText={handleEmailChange}
            returnKeyType="done"
            onSubmitEditing={handleEmailSubmit}
            keyboardType="email-address"
            color="#000"
          />
          {emailErrorMsg ? <Text style={styles.errorMsg}>{emailErrorMsg}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputWithIcon}
              placeholder="Login pin"
              placeholderTextColor="#9a9a9a"
              secureTextEntry={showPin}
              value={pin}
              onChangeText={handlePinChange}
              keyboardType="default"  // Changed from "numeric" to "default"
              color="#000"
            />

            <TouchableOpacity onPress={() => setShowPin(!showPin)}>
              <Ionicons name={showPin ? "eye-off" : "eye"} size={24} color="#9a9a9a" />
            </TouchableOpacity>
          </View>
          {pinErrorMsg ? <Text style={styles.errorMsg}>{pinErrorMsg}</Text> : null}

          <View style={styles.forgotPinContainer}>
            <Text style={styles.forgotPinText}>Forgot pin?</Text>
            <TouchableOpacity>
              <Text style={styles.resetText}>reset</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign up</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  loginContainer: {
    justifyContent: 'flex-start',
  },
  heading: {
    fontFamily: 'PublicSans-Medium',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#D0D5DD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    color: '#000',
  },
  forgotPinContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    fontFamily: 'PublicSans-Medium',
  },
  forgotPinText: {
    color: '#667085',
    fontFamily: 'PublicSans-Medium',
  },
  resetText: {
    color: '#7081FF',
    marginLeft: 5,
    fontFamily: 'PublicSans-Medium',
  },
  loginButton: {
    backgroundColor: '#7081FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PublicSans-Medium',
  },
  signUpContainer: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#667085',
    fontFamily: 'PublicSans-Medium',
  },
  signUpLink: {
    color: '#7081FF',
    fontWeight: 'bold',
    fontFamily: 'PublicSans-Medium',
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});
