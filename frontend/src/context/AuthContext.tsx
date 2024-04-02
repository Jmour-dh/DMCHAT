import React, {useState, useEffect, useContext, createContext, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

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
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  // Déclaration de l'état local pour le statut de connexion
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Effet de bord pour vérifier si un token utilisateur est présent dans le stockage local
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token); // Met à jour l'état isLoggedIn en fonction de la présence du token
      } catch (error) {
        console.error('Erreur lors de la récupération du token depuis AsyncStorage:', error);
      }
    };

    loadToken();
  }, []);

  // Fonction de connexion utilisateur
  const login = async (token: string, userId: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('userToken', token); // Stocke le token utilisateur dans AsyncStorage
      await AsyncStorage.setItem('userId', userId); // Stocke l'ID de l'utilisateur dans AsyncStorage
      setIsLoggedIn(true); // Met à jour l'état isLoggedIn à true
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
    } catch (error) {
      console.error("Erreur lors de la déconnexion de l'utilisateur:", error);
      throw error;
    }
  };

  // Crée une valeur de contexte memoisée pour éviter les rendus inutiles
  const value = useMemo(() => ({isLoggedIn, login, logout}), [isLoggedIn]);

  // Rendu du fournisseur d'authentification avec le contexte de valeur fourni aux enfants
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Spécification des types de props attendus pour le composant AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
