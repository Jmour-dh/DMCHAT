import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import verifyEmailCode from './src/screens/verifyEmailCode/verifyEmailCode';
import CreateProfile from './src/screens/CreateProfile/CreateProfile';
import { TouchableOpacity, Image } from 'react-native';
import leftArrow from './src/assets/icons/leftArrow.png';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './src/screens/home/Home';

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: '#262A34' },
  headerTintColor: 'white',
  headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
};

const AppContent: React.FC = () => {
  const { isLoggedIn, logout } = useAuth(); // Déplacez la déclaration ici

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const tokenExpiryTime = await AsyncStorage.getItem('tokenExpiryTime');
        if (tokenExpiryTime) {
          const currentTime = new Date().getTime();
          const expiryTime = parseInt(tokenExpiryTime);
          if (currentTime > expiryTime) {
            console.log('Token expiré. Déconnexion automatique...');
            logout();
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'expiration du token :", error);
      }
    };

    // Vérifier l'expiration du token toutes les 4 heures
    const interval = setInterval(checkTokenExpiration, 4 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [logout]);

  const headerLeft = (navigation: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image source={leftArrow} style={{ height: 25, width: 25, marginRight: 5 }} />
      </TouchableOpacity>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="VerifyEmailCode" component={verifyEmailCode} options={{ headerShown: false }} />
            <Stack.Screen
              name="CreateProfile"
              component={CreateProfile}
              options={({ navigation }) => ({
                ...defaultScreenOptions,
                headerLeft: () => headerLeft(navigation),
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
