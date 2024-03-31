import React, { useState, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CreateProfileSetp1 from './CreateProfileSetp1/CreateProfileSetp1';
import CreateProfileSetp2 from './CreateProfileSetp2/CreateProfileSetp2';
import leftArrow from '../../assets/icons/leftArrow.png';

const CreateProfile: React.FC = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState<number>(1);

  const onNextStep = () => {
    if (step === 2) {
      setStep(1);
    } else  {
      setStep(prevStep => prevStep + 1);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Création de profil',
      headerStyle: { backgroundColor: '#262A34' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
      headerLeft: () => (
        step === 2 && (
          <TouchableOpacity onPress={onNextStep}>
            <Image source={leftArrow} style= {{height: 25, width: 25, marginRight:5}}/>
          </TouchableOpacity>
        )
      ),
    });
  }, [navigation, step]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CreateProfileSetp1 onNextStep={onNextStep} />;
      case 2:
        return <CreateProfileSetp2 onNextStep={onNextStep} />;
      default:
        return null;
    }
  };

  return <ScrollView style={styles.container}>{renderStep()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateProfile;
