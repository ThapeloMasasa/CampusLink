import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Pressable, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../supabaseClient';
import { AuthStackParamList } from '../types/types';

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [groupName, setGroupName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'Student' |  'Group' | null>(null);
const handleSignUp = async () => {
  if (!email || !password || !selectedRole) {
    Alert.alert('Error', 'All fields including role are required.');
    return;
  }

  if ((selectedRole === 'Student') && (!fullName || !username)) {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  if (selectedRole === 'Group' && !groupName) {
    Alert.alert('Error', 'Please enter a group name.');
    return;
  }

  try {
    // Sign up user with Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: selectedRole === 'Group' ? groupName : fullName,
          username: selectedRole === 'Group' ? groupName.toLowerCase().replace(/\s+/g, '_') : username,
          role: selectedRole,
        },
      },
    });

    if (signUpError) {
      Alert.alert('Signup Failed', signUpError.message);
      return;
    }

    // signUpData.user contains the user object
    const user = signUpData.user;
    console.log(user)
    if (!user) {
      Alert.alert('Signup Failed', 'User data not returned.');
      return;
    }

    // Insert user profile into "profiles" table
    console.log('About to insert profile...');
    const {  data:profiledata, error: profileError } = await supabase.from('Profile').insert([
      {
        id: user.id,  // user id from auth
        full_name: selectedRole === 'Group' ? groupName : fullName,
        role: selectedRole,
        linkedIn_url: "https://randomuser.me/api/portraits/men/46.jpg",
        rating: 0,
        created_at: new Date(),
      },
    ]);

    if (profileError) {
      console.log('error here',profileError)
      Alert.alert('Profile Creation', profileError.message);
      
    }

    // Success alert for email verification
    Alert.alert(
      'Verify Your Email',
      'A confirmation link has been sent to your email. Please verify before signing in.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  } catch (error: any) {
    Alert.alert('Error', "something is wrong");
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
          <Text style={styles.roleLabel}>Sign up as:</Text>
          <View style={styles.radioGroup}>
            {['Student', 'Group'].map(role => (
              <TouchableOpacity
                key={role}
                style={styles.radioButton}
                onPress={() => setSelectedRole(role as 'Student' |  'Group')}
              >
                <Ionicons
                  name={selectedRole === role ? 'radio-button-on' : 'radio-button-off'}
                  size={22}
                  color="#032554"
                />
                <Text style={styles.radioText}>{role}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedRole === 'Student'? (
            <>
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
            </>
          ) : selectedRole === 'Group' ? (
            <TextInput
              placeholder="Group Name"
              placeholderTextColor="#999"
              style={styles.input}
              value={groupName}
              onChangeText={setGroupName}
            />
          ) : null}

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
  roleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#032554',
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#032554',
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
    backgroundColor: '#032554',
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
  signUp: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  haveAccount: {
    fontSize: 16,
    color: '#032554',
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FB923C',
  },
});
