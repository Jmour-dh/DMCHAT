import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './Register.styles';
import logo from '../../assets/images/logo_DMCHAT.png';

const Register: React.FC = () => {
  const navigation = useNavigation();
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
            <Text style={styles.descriptionTextStyle}>
              Veuillez remplir le formulaire pour continuer
            </Text>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#6C6D72"
            style={styles.textInputStyle}
          />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#6C6D72"
            style={styles.textInputStyle}
          />
          <TextInput
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#6C6D72"
            style={styles.textInputStyle}
          />
          <TouchableOpacity style={styles.nextButtonStyle}>
            <Text style={styles.nextButtonTextStyle}>Suivant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signInButtonContainer}>
          <Text style={styles.signInTextStyle}>Avez déjà un compte?</Text>
          <TouchableOpacity
            style={styles.signInButtonStyle}
            onPress={handleLoginPress}>
            <Text style={styles.signInButtonTextStyle}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;
