import React, {createContext, useContext, useState, useEffect} from 'react';
import {hostname} from '../hostname/hostname';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
  _id: string;
  pseudo: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  sexe: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  allUsers: User[];
  fetchUser: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  updateUser: (userId: string, updatedData: any) => Promise<void>;
  updateUserProfileImage: (userId: string, imageFile: File) => Promise<void>;
  updateUserState: (userData: User) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  allUsers: [],
  fetchUser: async () => {},
  getAllUsers: async () => {},
  updateUser: async () => {},
  updateUserProfileImage: async () => {},
  updateUserState: () => {},
  isLoading: false,
});

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get<User>(`${hostname}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.get<User[]>(`${hostname}/users`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setAllUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUser = async (userId: string, updatedData: any) => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.put<User>(`${hostname}/users/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      setUser(response.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfileImage = async (userId: string, imageFile: File) => {
    if (!imageFile) {
      console.log('No image file to submit.');
      return;
    }

    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const formData = new FormData();
      formData.append('profileImage', imageFile);

      const response = await axios.put<User>(`${hostname}/users/${userId}/profileImage`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      console.log('Profile image updated successfully.');
    } catch (error) {
      console.error('Error updating profile image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserState = (userData: User) => {
    setUser(userData);
  };

  useEffect(() => {
    getAllUsers();
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        fetchUser,
        updateUser,
        updateUserProfileImage,
        getAllUsers,
        updateUserState,
        isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => useContext(UserContext);
