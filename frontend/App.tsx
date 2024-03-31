import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import verifyEmailCode from './src/screens/verifyEmailCode/verifyEmailCode';
import CreateProfile from './src/screens/CreateProfile/CreateProfile';
import {View, TouchableOpacity, Image} from 'react-native';

const Stack = createNativeStackNavigator();

const AppContent: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="VerifyEmailCode" component={verifyEmailCode} options={{headerShown: false}} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
