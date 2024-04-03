import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './Login.styles';
import logo from '../../assets/images/logo_DMCHAT.png';
import { hostname } from '../../hostname/hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import * as yup from 'yup';
import axios from 'axios';

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
      // Validation des champs de formulaire
      await handleValidationSchema.validate({ email, password });

      // Effectuer la requête POST pour la connexion
      const response = await axios.post(`${hostname}/login`, {
        email,
        password,
      });

      // Vérifier la réponse de l'API
      if (response.status === 200) {
        // Récupérer le token d'authentification depuis la réponse de l'API
        const { authToken } = response.data;

        // Stocker le token d'authentification dans AsyncStorage et se connecter
        await AsyncStorage.setItem('userToken', authToken);
        await login(authToken);

        // Connexion réussie, rediriger l'utilisateur vers la page de profil ou toute autre action nécessaire
        console.log('Connexion réussie !');
      } else {
        // Afficher un message d'erreur en cas de problème avec la connexion
        Alert.alert('Erreur de connexion', 'Veuillez vérifier vos identifiants et réessayer.');
      }
    } catch (error: any) {
      // Gérer les erreurs de validation des champs de formulaire
      if (error.name === 'ValidationError') {
        error.inner.forEach((err: any) => {
          if (err.path === 'email') {
            setEmailError(err.message);
          }
          if (err.path === 'password') {
            setPasswordError(err.message);
          }
        });
      } else {
        // Gérer les autres erreurs
        console.error('Erreur lors de la connexion :', error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion.');
      }
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
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
          <TouchableOpacity style={styles.signInButtonStyle} onPress={handleLogin}>
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
