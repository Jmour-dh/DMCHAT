import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './Login.styles';
import logo from '../../assets/images/logo_DMCHAT.png';

const Login: React.FC = () => {
  const navigation = useNavigation();
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
          <TextInput placeholder="Email" placeholderTextColor="#6C6D72" style={styles.textInputStyle} />
          <TextInput placeholder="Mot de passe" placeholderTextColor="#6C6D72" style={styles.textInputStyle} />
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
