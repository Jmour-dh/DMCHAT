import React, { useState, useEffect } from 'react';
import { View, Pressable, Image, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './CreateProfileSetp2.styles';
import noGender from '../../../assets/images/noGender.png';
import camera from '../../../assets/icons/camera.png';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { hostname } from '../../../hostname/hostname';
import axios from 'axios';
import ProfileImagePickerModal from '../../../components/ImagePicker/ProfileImagePickerModal';

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
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: any }>({});
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formDataToSend, setFormDataToSend] = useState<FormData>(new FormData());

  const validationSchema = yup.object().shape({
    pseudo: yup
      .string()
      .required('Veuillez renseigner votre pseudo')
      .matches(/^[A-Za-z0-9\s]+$/, 'Le pseudo doit contenir uniquement des lettres, des chiffres et des espaces')
      .min(2, 'Le pseudo doit comporter au moins 2 caractères')
      .max(30, 'Le pseudo peut comporter au plus 30 caractères'), // Modifier le message d'erreur
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

  const openImagePickerModal = () => {
    setModalVisible(true);
  };

  const onImageSelectedHandler = (uri: string) => {
    setSelectedImage(uri);
  };

  const saveProfile = async (): Promise<void> => {
    setIsLoading(true);
  
    try {
      await validationSchema.validate({ pseudo }, { abortEarly: false });
  
      const profileData = new FormData(); 
  
      // Ajoutez les autres champs du formulaire
      profileData.append('sexe', sexe);
      profileData.append('firstname', firstName);
      profileData.append('lastname', lastName);
      profileData.append('email', email);
      profileData.append('password', password);
      profileData.append('pseudo', pseudo);
  
      // Vérifiez si une image a été sélectionnée
      if (selectedImage) {
        // Ajoutez l'image sélectionnée à l'objet FormData
        const imageUriParts = selectedImage.split('.');
        const imageType = imageUriParts[imageUriParts.length - 1];
        profileData.append('profileImage', {
          uri: selectedImage,
          name: `profile.${imageType}`,
          type: `image/${imageType}`,
        });
      }
  
      const response = await fetch(`${hostname}/users`, {
        method: 'POST',
        body: profileData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        navigation.navigate('Login');
      } else {
        console.error('Échec de la sauvegarde du profil sur le serveur:', response.status, response.statusText);
        console.error("Détails de l'erreur du serveur:", await response.text());
        Alert.alert('Erreur lors de la sauvegarde du profil. Veuillez réessayer plus tard.');
      }
    } catch (error: any) {
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
  
  
  

  console.log('selectedImage', selectedImage);
  
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={openImagePickerModal} style={styles.pictureContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Image style={styles.pressableContainer} source={noGender} />
        )}
      </Pressable>

      {isLoading && <ProgressBar progress={progress} />}
      <View style={styles.cameraContainer}>
        <Pressable onPress={openImagePickerModal}>
          <Image style={{ width: 30, height: 30 }} source={camera} />
        </Pressable>
      </View>
      {modalVisible && <ProfileImagePickerModal onImageSelected={onImageSelectedHandler} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Pseudo" placeholderTextColor="#6C6D72" style={styles.textInputStyle} value={pseudo} onChangeText={text => setPseudo(text)} />
        {validationErrors.pseudo && <Text style={styles.errorTextStyle}>{validationErrors.pseudo}</Text>}
        <TouchableOpacity style={styles.validateButtonStyle} onPress={saveProfile}>
          <Text style={styles.validateButtonTextStyle}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProfileSetp2;
