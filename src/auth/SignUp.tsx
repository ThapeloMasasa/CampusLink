import { AuthProps, AuthStackParamList } from '../types/types';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';

const SignUpScreen = ({setIsLoggedIn}: AuthProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleSignUp = () => {
    setIsLoggedIn(true)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account 📝</Text>
        <Text style={styles.subtitle}>Sign up to get started!</Text>

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
    <TextInput
          placeholder="User Name"
          placeholderTextColor="#999"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signUp}>
            <Text style={styles.haveAccount}>Already have an Account? </Text>
            <Pressable  onPress={()=>navigation.goBack()}>
                <Text style={styles.SignUptext}>Sign In</Text>
            </Pressable>
                           
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50', // Primary green color
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUp:{
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'

  },
  haveAccount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#181c18'

  },
  SignUptext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50'
  }
});
