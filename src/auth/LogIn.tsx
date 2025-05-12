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
    backgroundColor: '#F9FAFB', 
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6', 
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#ffffff', 
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB', 
  },
  button: {
    backgroundColor: '#FB923C', 
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    color: '#8B5CF6', 
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  signUp: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  haveAccount: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  SignUptext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6', 
  }
});
