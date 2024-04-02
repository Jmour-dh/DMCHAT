import {View, Pressable, Image, Text, TextInput, TouchableOpacity,Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './CreateProfileSetp2.styles';
import noGender from '../../../assets/images/noGender.png';
import camera from '../../../assets/icons/camera.png';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {hostname} from '../../../hostname/hostname';
import axios from 'axios';

const CreateProfileSetp2: React.FC = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [sexe, setSexe] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: any}>({});

  const validationSchema = yup.object().shape({
    pseudo: yup
      .string()
      .required('Veuillez renseigner votre pseudo')
      .matches(/^[A-Za-z0-9\s]+$/, 'Le pseudo doit contenir uniquement des lettres, des chiffres et des espaces')
      .min(2, 'Le prénom doit comporter au moins 2 caractères')
      .max(30, 'Le prénom peut comporter au plus 30 caractères'),
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const savedSexe = await AsyncStorage.getItem('sexe');
        const savedFirstName = await AsyncStorage.getItem('firstname');
        const savedLastName = await AsyncStorage.getItem('lastname');
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');

        setSexe(savedSexe || '');
        setFirstName(savedFirstName || '');
        setLastName(savedLastName || '');
        setEmail(savedEmail || '');
        setPassword(savedPassword || '');
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur depuis AsyncStorage", error);
      }
    };

    fetchUserDetails();
  }, []);

  const saveProfile = async (): Promise<void> => {
    setIsLoading(true);
  
    try {
      await validationSchema.validate({ pseudo }, { abortEarly: false });
  
      const pseudoExistsResponse = await verifyPseudo(pseudo);
      if (pseudoExistsResponse.message === 'Le pseudo existe déjà.') {
        setValidationErrors({ pseudo: 'Ce pseudo est déjà utilisé. Veuillez en choisir un autre.' });
        setIsLoading(false);
        
      }else {
        const userData = {
          sexe,
          firstName,
          lastName,
          email,
          password,
          pseudo,
        };
    
        const response = await axios.post(`${hostname}/users`, userData);
    
        if (response.status === 201) {
          navigation.navigate('Login');
        } else {
          console.error('Échec de la sauvegarde du profil sur le serveur:', response.status, response.statusText);
          console.error("Détails de l'erreur du serveur:", response.data);
        }
      }
  
      
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else if (error.response && error.response.status === 500) {
        Alert.alert('Ce pseudo est déjà utilisé. Veuillez en choisir un autre.');
        setIsLoading(false);
        return;
      } else {
        console.error('Erreur lors de la sauvegarde du profil:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  const verifyPseudo = async (pseudoValue: string) => {
    try {
      if (pseudoValue && pseudoValue.trim() !== '') {
        const response = await axios.post<{message: string}>(`${hostname}/verifyPseudo`, {
          email: pseudoValue,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de le pseudo :", error);
      throw error;
    }
  };

  
  

  return (
    <View style={styles.mainContainer}>
      <View style={styles.pictureContainer}>
        <Pressable>
          <Image style={styles.pressableContainer} source={noGender} />
        </Pressable>
      </View>
      {isLoading && <ProgressBar progress={progress} />}
      <View style={styles.cameraContainer}>
        <Pressable>
          <Image style={{width: 30, height: 30}} source={camera} />
        </Pressable>
      </View>
      <View style={styles.textInputContainer}>
  <TextInput 
    placeholder="Pseudo" 
    placeholderTextColor="#6C6D72" 
    style={styles.textInputStyle} 
    value={pseudo} // Lier la valeur de l'état pseudo à la prop value
    onChangeText={text => setPseudo(text)} // Associer la fonction setPseudo à onChangeText
  />
  {validationErrors.pseudo && (
    <Text style={styles.errorTextStyle}>{validationErrors.pseudo}</Text>
  )}
  <TouchableOpacity style={styles.validateButtonStyle} onPress={saveProfile}>
    <Text style={styles.validateButtonTextStyle}>Valider</Text>
  </TouchableOpacity>
</View>

    </View>
  );
};

export default CreateProfileSetp2;
