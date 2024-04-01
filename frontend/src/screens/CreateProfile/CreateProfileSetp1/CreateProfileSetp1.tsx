import {View, Pressable, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import styles from './CreateProfileSetp1.styles';
import maleSign from '../../../assets/icons/maleSign.png';
import femaleSign from '../../../assets/icons/femaleSign.png';

const CreateProfileSetp1: React.FC = ({onNextStep}) => {
  const [selectedSexe, setSelectedSexe] = useState<string | null>(null);

  const handleSexePress = async (option: string) => {
    setSelectedSexe(option);
    try {
      await AsyncStorage.setItem('sexe', option);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du sexe:', error);
    }
  };

  const handleContinue = () => {
    onNextStep();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.sexeContainer}>
        <Pressable style={() => [styles.pressableMale, selectedSexe === 'homme' && styles.activePressable]} onPress={() => handleSexePress('homme')}>
          <View style={styles.male}>
            <View style={styles.icon}>
              <Image source={maleSign} style={{height: 35, width: 35}} />
            </View>
            <View style={styles.textBtn}>
              <Text style={styles.textSexe}>Homme</Text>
            </View>
          </View>
        </Pressable>
        <Pressable style={() => [styles.pressableFemale, selectedSexe === 'femme' && styles.activePressable]} onPress={() => handleSexePress('femme')}>
          <View style={styles.female}>
            <View style={styles.icon}>
              <Image source={femaleSign} style={{height: 35, width: 35}} />
            </View>
            <View style={styles.textBtn}>
              <Text style={styles.textSexe}>Femme</Text>
            </View>
          </View>
        </Pressable>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Nom" placeholderTextColor="#6C6D72" style={styles.textInputStyle} />
        <TextInput placeholder="Prénom" placeholderTextColor="#6C6D72" style={styles.textInputStyle} />
        <TouchableOpacity style={styles.nextButtonStyle} onPress={handleContinue}>
          <Text style={styles.nextButtonTextStyle}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProfileSetp1;
