import React, {useRef, useState} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Image} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import styles from './verifyEmailCode.styles';
import paste from '../../assets/icons/paste.png';

const VerifyEmailCode: React.FC = () => {
  const navigation = useNavigation();
  const handleNextPress = () => {
    navigation.navigate('CreateProfile');
  };
  const pinRefs = useRef<Array<React.RefObject<TextInput>>>(
    Array(4)
      .fill(null)
      .map(() => React.createRef()),
  );
  const [pins, setPins] = useState<string[]>(Array(4).fill(''));
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    if (/^\d*$/.test(value)) {
      const newPins = [...pins];
      newPins[index] = value;
      setPins(newPins);
      setErrorMessage('');

      if (value && index < 3) {
        pinRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        pinRefs.current[index - 1]?.focus();
      }
    } else {
      setErrorMessage('Seuls les chiffres sont acceptés.');
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
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.verifyButtonStyle} onPress={handleNextPress}>
            <Text style={styles.verifyButtonTextStyle}>Vérifier</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resendButtonContainer}>
          <Text style={styles.resendTextStyle}>Si vous n'avez pas eu le code</Text>
          <TouchableOpacity style={styles.resendButtonStyle}>
            <Text style={styles.resendButtonTextStyle}>Renvoyer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmailCode;
