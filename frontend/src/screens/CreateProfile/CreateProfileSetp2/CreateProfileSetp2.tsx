import {View, Pressable, Image, Text, TextInput,TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './CreateProfileSetp2.styles';
import noGender from '../../../assets/images/noGender.png';
import camera from '../../../assets/icons/camera.png';

const CreateProfileSetp2: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.pictureContainer}>
        <Pressable>
          <Image style={styles.pressableContainer} source={noGender} />
        </Pressable>
      </View>
      <View style={styles.cameraContainer}>
        <Pressable>
          <Image style={{width:30, height:30}} source={camera} />
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
