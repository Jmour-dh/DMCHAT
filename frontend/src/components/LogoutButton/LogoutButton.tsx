import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {hostname} from '../../hostname/hostname';
import styles from './LogoutButton.styles';

const LogoutButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();
  const {logout} = useAuth();

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const tokenExpiryTime = await AsyncStorage.getItem('tokenExpiryTime');
      const currentTime = new Date().getTime();

      if (currentTime > parseInt(tokenExpiryTime || '0')) {
        // Le token a expiré
        console.log('Token expiré. Déconnexion...');
        logout();
        navigation.navigate('Login');
      } else {
        // Le token n'a pas encore expiré, continuez avec la déconnexion
        const response = await fetch(`${hostname}/logout`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log('Token supprimé de AsyncStorage');
          logout();
          navigation.navigate('Login');
        } else {
          console.error('Erreur de déconnexion');
        }
      }
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion : ', error.message);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={styles.menuItem}>Déconnexion</Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent={true} animationType="slide" onRequestClose={() => setShowModal(false)}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Voulez-vous vraiment vous déconnecter ?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.modalButtonText}>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogoutButton;
