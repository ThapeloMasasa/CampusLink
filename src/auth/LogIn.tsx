import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
} from 'react-native';
import { useGlobalContext } from '../contexts/GlobalContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList, myday } from '../types/types';
import { supabase } from '../../supabaseClient';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 const { dispatch } = useGlobalContext();
 const handleLogin = async () => {
  
  try {
    // 1. Sign the user in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !signInData.user) {
      console.log("Login failed", signInError?.message);
      return;
    }

    const user = signInData.user;

    // 2. Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('Profile')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      console.log("Failed to get profile", profileError?.message);
      return;
    }

    // 3. Fetch posts
    const { data: posts, error: postsError } = await supabase.from('Posts').select('*');
    if (!postsError) dispatch({ type: 'SET_POSTS', payload: posts });
    else console.log(postsError);
    

    // 4. Fetch yaps
    const { data: yaps, error: yapsError } = await supabase.from('Yaps').select('*');
    if (!yapsError) dispatch({ type: 'SET_YAPS', payload: yaps });
    else console.log(yapsError);

    // 5. Fetch all profiles
    const { data: allProfiles, error: profilesError } = await supabase.from('Profile').select('*');
    if (!profilesError) dispatch({ type: 'SET_PROFILES', payload: allProfiles });
    else console.log(profilesError);
    // 6. fetch Sales
    const { data: sales, error: salesError } = await supabase.from('Deals').select('*');
    if (!postsError) dispatch({ type: 'SET_SALES', payload: sales });
    else console.log(salesError);

    // 6. Fetch all Myday entries
    const { data: allMyDays, error: mydaysError } = await supabase.from('Myday').select('*');

    if (!mydaysError && allMyDays) {
      // Create a map for quick profile lookup
      const profilesMap = new Map(allProfiles?.map((p) => [p.id, p]));

      // Group Myday entries by owner
      const groupedByOwner: { [ownerId: string]: myday[] } = {};

      allMyDays.forEach((entry) => {
        if (!groupedByOwner[entry.owner]) {
          groupedByOwner[entry.owner] = [];
        }
        groupedByOwner[entry.owner].push(entry);
      });

      // Convert the object to a 2D array, prepending the profile pic object
      const mydays2DArray: any[][] = Object.entries(groupedByOwner).map(([ownerId, stories]) => {
        const profile = profilesMap.get(ownerId);
        const profilePic = {
          image: profile?.avatar_url || '', // use your profile picture field name here
          isProfilePic: true,
          id: `profile-${ownerId}`, // unique id for React keys if needed
        };
        return [profilePic, ...stories];
      });

      dispatch({ type: 'SET_MYDAYS', payload: mydays2DArray });
    } else {
      console.log(mydaysError);
    }

     // 7. Fetch Messages
    const { data: messages, error: messagesError } = await supabase.from('Messages').select('*').eq('sender_id',user.id);
    if (!postsError) dispatch({ type: 'SET_MESSAGES', payload: messages });
    else console.log(messagesError);

    // 8. Dispatch login
    dispatch({
      type: 'LOGIN',
      payload: {
        isLoggedIn: true,
        currentUserId: user.id,
        currentProfile: profileData,
      },
    });
    console.log("should be done")

  } catch (e) {
    console.log("Unexpected error during login:", e);
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
            placeholder="Email"
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
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
              <Text style={{ color: '#3B82F6', paddingHorizontal: 16 }}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.haveAccount}>Don't have an Account? </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};



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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
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
  forgotPassword: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  googleButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUp: {
    paddingTop: 15,
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
export default LoginScreen;