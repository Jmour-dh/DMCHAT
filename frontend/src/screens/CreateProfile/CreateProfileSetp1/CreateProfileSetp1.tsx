import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'; // Import de Yup pour la validation des données
import styles from './CreateProfileSetp1.styles';
import maleSign from '../../../assets/icons/maleSign.png';
import femaleSign from '../../../assets/icons/femaleSign.png';

const CreateProfileSetp1: React.FC = ({ onNextStep }) => {
  const [selectedSexe, setSelectedSexe] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: any }>({});

  const validationSchema = yup.object().shape({
    firstname: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Le prénom doit contenir uniquement des caractères alphabétiques')
      .min(2, 'Le prénom doit comporter au moins 2 caractères')
      .max(30, 'Le prénom peut comporter au plus 30 caractères'),
    lastname: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, 'Le nom de famille doit contenir uniquement des caractères alphabétiques')
      .min(2, 'Le nom de famille doit comporter au moins 2 caractères')
      .max(30, 'Le nom de famille peut comporter au plus 30 caractères'),
    sexe: yup.string().required('Veuillez sélectionner votre sexe'), // Ajout de la règle pour le sexe
  });

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedFirstname = await AsyncStorage.getItem('firstname');
        const storedLastname = await AsyncStorage.getItem('lastname');
        const storedSexe = await AsyncStorage.getItem('sexe');
        if (storedFirstname && storedLastname) {
          setFirstname(storedFirstname);
          setLastname(storedLastname);
          setSelectedSexe(storedSexe);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données depuis AsyncStorage:', error);
      }
    };

    loadStoredData();
  }, []);

  const handleSexePress = async (option: string) => {
    setSelectedSexe(option);
    try {
      await AsyncStorage.setItem('sexe', option);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du sexe:', error);
    }
  };

  const handleNextStep = async (): Promise<void> => {
    try {
      await validationSchema.validate({ firstname, lastname, sexe: selectedSexe }, { abortEarly: false });
      setValidationErrors({});
      await AsyncStorage.setItem('firstname', firstname);
      await AsyncStorage.setItem('lastname', lastname);
      onNextStep();
    } catch (error: any) {
      if (error.inner) {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((err: any) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      }
      console.error('Erreur lors de la validation :', error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.sexeContainer}>
        <Pressable style={() => [styles.pressableMale, selectedSexe === 'homme' && styles.activePressable]} onPress={() => handleSexePress('homme')}>
          <View style={styles.male}>
            <View style={styles.icon}>
              <Image source={maleSign} style={{ height: 35, width: 35 }} />
            </View>
            <View style={styles.textBtn}>
              <Text style={styles.textSexe}>Homme</Text>
            </View>
          </View>
        </Pressable>
        <Pressable style={() => [styles.pressableFemale, selectedSexe === 'femme' && styles.activePressable]} onPress={() => handleSexePress('femme')}>
          <View style={styles.female}>
            <View style={styles.icon}>
              <Image source={femaleSign} style={{ height: 35, width: 35 }} />
            </View>
            <View style={styles.textBtn}>
              <Text style={styles.textSexe}>Femme</Text>
            </View>
          </View>
        </Pressable>
      </View>
      {validationErrors.sexe && <Text style={styles.errorTextStyle}>{validationErrors.sexe}</Text>}
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Nom" placeholderTextColor="#6C6D72" style={styles.textInputStyle} value={firstname} onChangeText={text => setFirstname(text)} />
        {validationErrors.firstname && <Text style={styles.errorTextStyle}>{validationErrors.firstname}</Text>}
        <TextInput
          placeholder="Prénom"
          placeholderTextColor="#6C6D72"
          style={styles.textInputStyle}
          value={lastname}
          onChangeText={text => setLastname(text)}
        />
        {validationErrors.lastname && <Text style={styles.errorTextStyle}>{validationErrors.lastname}</Text>}
        
        <TouchableOpacity style={styles.nextButtonStyle} onPress={handleNextStep}>
          <Text style={styles.nextButtonTextStyle}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProfileSetp1;
