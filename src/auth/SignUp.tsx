import { AuthProps, AuthStackParamList } from '../types/types';
import React, { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Image, Alert } from 'react-native';
import { supabase } from '../../supabaseClient';

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Email and password are required.');
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
    },
  });

  if (error) {
    Alert.alert('Signup Failed', error.message);
  } else {
    Alert.alert(
      'Verify Your Email',
      'A confirmation link has been sent to your email. Please verify before signing in.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(), // ✅ navigate back to sign-in
        },
      ]
    );
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.innerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>

        <View style={styles.formCard}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="User Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Email (School Email Only)"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              style={[styles.input, { borderWidth: 0, flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
              <Text style={{ color: '#3B82F6', paddingHorizontal: 16 }}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.haveAccount}>Already have an Account? </Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.signUpText}>Sign In</Text>
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
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  formCard: {
    backgroundColor: '#b8c8e4',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    backgroundColor: '#eceff4',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eceff4',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  button: {
    backgroundColor: "#032554",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUp: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haveAccount: {
    fontSize: 16,
    color: "#032554",
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FB923C',
  },
});
