import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

const CreateProfileSetp1: React.FC = ({onNextStep}) => {
  const handleContinue = () => {
    onNextStep();
  };
  return (
    <TouchableOpacity onPress={handleContinue}>
      <Text>S'inscrire</Text>
    </TouchableOpacity>
  );
};

export default CreateProfileSetp1;
