import React, {useRef, useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import styles from './verifyEmailCode.styles';
import paste from '../../assets/icons/paste.png';
import { hostname } from '../../hostname/hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const VerifyEmailCode: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [pins, setPins] = useState<string[]>(Array(4).fill(''));
  const pinRefs = useRef([...Array(4)].map(() => React.createRef()));

  const verificationSchema = yup.object().shape({
    verificationCode: yup.string()
      .matches(/^[0-9]+$/, 'Le code doit contenir uniquement des chiffres')
      .length(4, 'Le code doit avoir une longueur de 4 chiffres')
      .required('Veuillez saisir le code de vérification'),
  });

  useEffect(() => {
    getEmailFromStorage();
  }, []);

  const getEmailFromStorage = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'e-mail depuis le AsyncStorage", error);
    }
  };

  const handleVerification = async (): Promise<void> => {
    const verificationCode: string = pins.join('');
    if (!verificationCode) {
      setErrorMessage('Veuillez entrer le code de vérification.');
      return;
    }
    try {
      await verificationSchema.validate({ verificationCode });
      const response = await axios.post(`${hostname}/verifyEmailCode`, {
        verificationCode,
      });
      if (response.status === 200) {
        navigation.navigate("CreateProfile");
        await AsyncStorage.setItem('verifiedEmailCode', 'true');
        setErrorMessage('');
      } else {
        if (response.status === 404) {
          setErrorMessage("Code incorrect ou expiré");
        } else {
          // Afficher le message d'erreur brut pour les autres cas
          setErrorMessage("Code incorrect ou expiré");
        }
      }
    } catch (error: any) {
      setErrorMessage("Code incorrect ou expiré");
    }
  };
  
  



  const handlePasteText = async () => {
    const text = await Clipboard.getString();
    const filteredText = text.replace(/[^\d]/g, '');
    const textArray = filteredText.split('').slice(0, 4);

    if (text !== filteredText) {
      setErrorMessage('Seuls les chiffres sont acceptés lors du collage.');
    } else {
      setErrorMessage('');
      setPins(pins.map((pin, index) => textArray[index] || pin));
    }
  };

  const updatePin = (index: number, value: string) => {
    // Vérifie si la référence existe avant d'y accéder
    if (pinRefs.current[index] && /^\d*$/.test(value)) {
      const newPins = [...pins];
      newPins[index] = value;
      setPins(newPins);
      setErrorMessage('');
  
      // Valider la longueur du code immédiatement
      if (newPins.join('').length < 4) {
        setErrorMessage('Le code doit avoir une longueur de 4 chiffres');
      } else {
        try {
          verificationSchema.validateAt('verificationCode', { verificationCode: newPins.join('') });
        } catch (error: any) {
          setErrorMessage(error.message);
        }
      }
  
      // Logique pour déplacer le focus
      if (value && index < 5) {
        pinRefs.current[index + 1]?.current?.focus();
      } else if (!value && index > 0) {
        pinRefs.current[index - 1]?.current?.focus();
      }
    } else {
      setErrorMessage('Seuls les chiffres sont acceptés.');
    }
  };
  
  const sendVerificationEmail = async (email: string) => {
    try {
      await axios.post(`${hostname}/sendVerification`, {email});
    } catch (error) {
      console.error("Erreur lors de l'envoi de la demande de vérification par e-mail :", error);
    }
  };
  
  
  

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleTextStyle}>Vérifier email</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTextStyle}>Veuillez vérifier votre email pour continuer</Text>
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.InputContainer}>
            {pins.map((pin, index) => (
              <TextInput key={index} ref={pinRefs.current[index]} style={styles.textInputStyle} keyboardType={'number-pad'} maxLength={1} value={pin} onChangeText={value => updatePin(index, value)} />
            ))}
          </View>
          <TouchableOpacity onPress={handlePasteText}>
            <Image style={styles.imageStyle} source={paste} />
          </TouchableOpacity>
        </View>
        <View>
        <Text style={styles.errorTextStyle}>{errorMessage}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.verifyButtonStyle} onPress={handleVerification}>
            <Text style={styles.verifyButtonTextStyle}>Vérifier</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resendButtonContainer}>
          <Text style={styles.resendTextStyle}>Si vous n'avez pas eu le code</Text>
          <TouchableOpacity style={styles.resendButtonStyle}  onPress={() => sendVerificationEmail(email)}>
            <Text style={styles.resendButtonTextStyle}>Renvoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmailCode;
