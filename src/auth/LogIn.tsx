import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthProps,AuthStackParamList } from '../types/types';

const LoginScreen = ({setIsLoggedIn}: AuthProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here (API call, etc.)
    setIsLoggedIn(true)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}> Campus Link 👋</Text>
        <Text style={styles.subtitle}>Enjoy Campus Vibes</Text>

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
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
     

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signUp}>
            <Text style={styles.haveAccount}>Don't have an Account? </Text>
                <Pressable  onPress={()=>navigation.navigate('SignUp')}>
                    <Text style={styles.SignUptext}>Sign Up</Text>
                </Pressable>
                   
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    backgroundColor: '#4CAF50', // App's primary theme color
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
  forgotPassword: {
    color: '#4CAF50',
    fontSize: 14,
    textAlign: 'center',
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
