import React, {useState} from 'react';
import {View, Text, Image, SafeAreaView, TouchableOpacity, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import * as yup from 'yup';
import styles from './Register.styles';
import logo from '../../assets/images/logo_DMCHAT.png';
import axios from 'axios';
import {hostname} from '../../hostname/hostname';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [verificationMessage, setVerificationMessage] = useState<string>('');

  const handleValidationSchema = yup.object().shape({
    email: yup.string().matches(emailRegex, 'Adresse e-mail invalide').required('Champ requis'),
    password: yup.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères').required('Champ requis'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Les mots de passe doivent correspondre')
      .required('Champ requis'),
  });

  const handleSubmit = async (values: {email: string; password: string}) => {
    try {
      const response = await verifyEmail(values.email);

      if (response && response.message === "L'email existe déjà.") {
        setVerificationMessage(response.message);
      } else {
        await AsyncStorage.setItem('email', values.email);
        await AsyncStorage.setItem('password', values.password);
        console.log('email', values.email);
        console.log('password', values.password);
        await sendVerificationEmail(values.email);
        navigation.navigate('VerifyEmailCode');
      }
    } catch (error: any) {
      console.error('Erreur lors de la validation :', error.message);
      if (error.response && error.response.status === 400) {
        Alert.alert('Cet e-mail existe déjà.');
      }
    }
  };

  const verifyEmail = async (emailValue: string) => {
    try {
      if (emailValue && emailValue.trim() !== '') {
        const response = await axios.post<{message: string}>(`${hostname}/verifyEmail`, {
          email: emailValue,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'e-mail :", error);
      throw error;
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      await axios.post(`${hostname}/sendVerification`, {email});
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de vérification par e-mail :", error);
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleTextStyle}>Créer un nouveau compte</Text>
          <View style={styles.logoContainer}>
            <Image source={logo} alt="logo" />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTextStyle}>Veuillez remplir le formulaire pour continuer</Text>
          </View>
        </View>
        <Formik initialValues={{email: '', password: '', confirmPassword: ''}} validationSchema={handleValidationSchema} onSubmit={handleSubmit}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={styles.textInputContainer}>
              <TextInput placeholder="Email" placeholderTextColor="#6C6D72" style={styles.textInputStyle} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
              {errors.email && <Text style={styles.errorTextStyle}>{errors.email}</Text>}
              <TextInput
                placeholder="Mot de passe"
                placeholderTextColor="#6C6D72"
                style={styles.textInputStyle}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && <Text style={styles.errorTextStyle}>{errors.password}</Text>}
              <TextInput
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#6C6D72"
                style={styles.textInputStyle}
                secureTextEntry={true}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {errors.confirmPassword && <Text style={styles.errorTextStyle}>{errors.confirmPassword}</Text>}
              {verificationMessage !== '' && <Text style={styles.errorTextStyle}>{verificationMessage}</Text>}
              <TouchableOpacity style={styles.nextButtonStyle} onPress={handleSubmit}>
                <Text style={styles.nextButtonTextStyle}>Suivant</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={styles.signInButtonContainer}>
          <Text style={styles.signInTextStyle}>Avez déjà un compte?</Text>
          <TouchableOpacity style={styles.signInButtonStyle} onPress={handleLoginPress}>
            <Text style={styles.signInButtonTextStyle}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
