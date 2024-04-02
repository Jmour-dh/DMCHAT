import {View, Pressable, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './CreateProfileSetp2.styles';
import noGender from '../../../assets/images/noGender.png';
import camera from '../../../assets/icons/camera.png';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {hostname} from '../../../hostname/hostname';

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
      .matches(/^[A-Za-z\s]+$/, 'Le pseudo doit contenir uniquement des caractères alphabétiques')
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
      if (!pseudo) {
        console.error("Le nom d'utilisateur n'est pas défini.");
        setIsLoading(false);
        return;
      }
  
      // Validation du champ pseudo avec validationSchema
      await validationSchema.validate({ pseudo }, { abortEarly: false });
  
      const formDataToSend = new FormData();
      const userData = {
        sexe,
        firstName,
        lastName,
        email,
        password,
        pseudo,
      };
  
      Object.keys(userData).forEach(key => formDataToSend.append(key, userData[key]));
  
      const response = await fetch(`${hostname}/users`, {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        navigation.navigate('Login');
      } else {
        console.error('Échec de la sauvegarde du profil sur le serveur:', response.status, response.statusText);
        console.error("Détails de l'erreur du serveur:", await response.text());
      }
    } catch (error: any) {
      // Gestion des erreurs de validation
      if (error.name === 'ValidationError') {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error('Erreur lors de la sauvegarde du profil:', error);
      }
    } finally {
      setIsLoading(false);
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
