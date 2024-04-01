import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {launchCamera, launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';
import {checkCameraPermissionIOS, checkPhotoLibraryPermissionIOS} from '../Permissions/PermissionIOS';

interface Props {
  onImageSelected: (uri: string) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const ProfileImagePickerIOS: React.FC<Props> = ({onImageSelected, modalVisible, setModalVisible}) => {
  const handleTakePhoto = async () => {
    console.log('Demande de permission de caméra iphone...');
    const hasCameraPermission = await checkCameraPermissionIOS();
    if (!hasCameraPermission) {
      console.log('Permission de caméra refusée iphone');
      Alert.alert('Permission refusée', 'La permission de caméra est nécessaire pour prendre une photo.');
      return;
    }
    console.log('Lancement de la caméra...');
    launchCamera({mediaType: 'photo'}, (response: ImagePickerResponse) => {
      console.log('Réponse de la caméra:', response);
      if (response.didCancel) {
        Alert.alert('Annulé');
      } else if (response.errorCode) {
        Alert.alert('Erreur de la caméra', response.errorMessage || 'Erreur inconnue');
      } else if (response.assets && response.assets.length > 0 && onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
    });
  };

  const handleChooseFromLibrary = async () => {
    console.log('Demande de permission de bibliothèque de photos iphoe...');
    const hasStoragePermission = await checkPhotoLibraryPermissionIOS();
    if (!hasStoragePermission) {
      console.log('Permission de bibliothèque de photos refusée');
      Alert.alert('Permission refusée', 'La permission de lire le stockage est nécessaire pour choisir une photo.');
      return;
    }

    console.log('Ouverture de la bibliothèque de photos Iphone...');
    launchImageLibrary({mediaType: 'photo'}, (response: ImagePickerResponse) => {
      console.log('Réponse de la bibliothèque de photos:', response);
      if (response.didCancel) {
        Alert.alert('Annulé');
      } else if (response.errorCode) {
        Alert.alert('Erreur de la bibliothèque', response.errorMessage || 'Erreur inconnue');
      } else if (response.assets && response.assets.length > 0 && onImageSelected) {
        onImageSelected(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={{marginVertical: 10}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleTakePhoto();
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Prendre une photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleChooseFromLibrary();
                setModalVisible(false);
              }}>
              <Text style={styles.textStyle}>Choisir de la bibliothèque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfileImagePickerIOS;
