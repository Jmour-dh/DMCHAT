import React, {useState, useEffect, useContext, createContext, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import { hostname } from '../hostname/hostname';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, userId: string) => Promise<void>; // Modification de la signature de login pour retourner une promesse
  logout: () => Promise<void>; // Modification de la signature de logout pour retourner une promesse
}

// Création d'un contexte pour gérer l'authentification
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook pour accéder au contexte d'authentification
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Composant fournisseur d'authentification
// Composant fournisseur d'authentification
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  // Déclaration de l'état local pour le statut de connexion et les données de l'utilisateur
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null); // Nouvel état pour stocker les données de l'utilisateur

  // Effet de bord pour récupérer les données de l'utilisateur lors de la connexion
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Récupérer les données de l'utilisateur avec le token
          const response = await axios.get(`${hostname}/users`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Vérifier si la récupération de l'utilisateur est réussie
          if (response.status === 200) {
            // Mettre à jour l'état de l'utilisateur dans AsyncStorage
            await AsyncStorage.setItem('userData', JSON.stringify(response.data));

            // Mettre à jour l'état d'authentification
            setIsLoggedIn(true);

            // Mettre à jour l'état de l'utilisateur avec les données récupérées
            setUser(response.data);
          } else {
            // En cas d'échec, afficher un message d'erreur
            console.error('Erreur lors de la récupération des données de l\'utilisateur:', response.statusText);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    loadUserData();
  }, []);

  // Fonction de connexion utilisateur
  const login = async (token: string): Promise<void> => {
    try {
      // Stocker le token d'authentification
      await AsyncStorage.setItem('userToken', token);

      // Récupérer les données de l'utilisateur
      const response = await axios.get(`${hostname}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Vérifier si la récupération de l'utilisateur est réussie
      if (response.status === 200) {
        // Mettre à jour l'état de l'utilisateur dans AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        console.log('Utilisateur connecté');
        

        // Mettre à jour l'état d'authentification
        setIsLoggedIn(true);

        // Mettre à jour l'état de l'utilisateur avec les données récupérées
        setUser(response.data);
      } else {
        // En cas d'échec, afficher un message d'erreur
        console.error('Erreur lors de la récupération des données de l\'utilisateur:', response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur:", error);
      throw error;
    }
  };

  // Fonction de déconnexion utilisateur
  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.clear(); // Efface toutes les données d'AsyncStorage
      setIsLoggedIn(false); // Met à jour l'état isLoggedIn à false
      setUser(null); // Réinitialiser l'état de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la déconnexion de l'utilisateur:", error);
      throw error;
    }
  };

  // Crée une valeur de contexte memoisée pour éviter les rendus inutiles
  const value = useMemo(() => ({isLoggedIn, user, login, logout}), [isLoggedIn, user]);

  // Rendu du fournisseur d'authentification avec le contexte de valeur fourni aux enfants
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
