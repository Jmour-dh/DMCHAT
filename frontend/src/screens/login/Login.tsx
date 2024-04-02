import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.styles';
import logo from '../../assets/images/logo_DMCHAT.png';
import { hostname } from '../../hostname/hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import * as yup from 'yup';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Login: React.FC = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleValidationSchema = yup.object().shape({
    email: yup.string().matches(emailRegex, 'Adresse e-mail invalide').required('Champ requis'),
    password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Champ requis'),
  });

  const handleLogin = async () => {
    try {
      await handleValidationSchema.validate({ email, password }, { abortEarly: false });

      // Envoyer les données de connexion au serveur
      const response = await fetch(`${hostname}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Stocker le token d'authentification dans AsyncStorage
        await AsyncStorage.setItem('token', data.authToken);
        // Stocker l'ID de l'utilisateur dans AsyncStorage (s'il est disponible)
        await AsyncStorage.setItem('userId', data._id || '');
        // Connecter l'utilisateur
        login(data.token, data.userId || '');
      } else {
        const errorMessage = await response.text();
        Alert.alert('Erreur', errorMessage);
      }
    } catch (error) {
      // Gérer les erreurs de validation
      if (error.name === 'ValidationError') {
        error.inner.forEach((err: any) => {
          if (err.path === 'email') {
            setEmailError(err.message);
          } else if (err.path === 'password') {
            setPasswordError(err.message);
          }
        });
      } else {
        console.error('Erreur lors de la connexion :', error);
      }
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };
  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleTextStyle}>Bienvenue !</Text>
          <View style={styles.logoContainer}>
            <Image source={logo} alt="logo" />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTextStyle}>Veuillez vous connecter à votre compte</Text>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput placeholder="Email" placeholderTextColor="#6C6D72" style={styles.textInputStyle} value={email} onChangeText={setEmail} />
          {emailError ? <Text style={styles.errorTextStyle}>{emailError}</Text> : null}
          <TextInput placeholder="Mot de passe" placeholderTextColor="#6C6D72" style={styles.textInputStyle} value={password} onChangeText={setPassword} secureTextEntry />
          {passwordError ? <Text style={styles.errorTextStyle}>{passwordError}</Text> : null}
          <TouchableOpacity style={styles.forgotButtonStyle}>
            <Text style={styles.forgotPasswordTextStyle}>Mode de passe oublié ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signInButtonStyle} onPress={handleHomePress}>
            <Text style={styles.signInButtonTextStyle}>Se connecter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUpButtonContainer}>
          <Text style={styles.signUpTextStyle}>Vous n’avez pas de compte?</Text>
          <TouchableOpacity style={styles.signUpButtonStyle} onPress={handleRegisterPress}>
            <Text style={styles.signUpButtonTextStyle}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
