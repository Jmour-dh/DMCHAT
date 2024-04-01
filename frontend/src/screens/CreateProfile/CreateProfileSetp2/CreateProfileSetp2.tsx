import {View, Pressable, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './CreateProfileSetp2.styles';
import noGender from '../../../assets/images/noGender.png';
import camera from '../../../assets/icons/camera.png';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

const CreateProfileSetp2: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
        <TextInput placeholder="Pseudo" placeholderTextColor="#6C6D72" style={styles.textInputStyle} />
        <TouchableOpacity style={styles.validateButtonStyle}>
          <Text style={styles.validateButtonTextStyle}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProfileSetp2;
