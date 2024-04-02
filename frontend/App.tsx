import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationOptions} from '@react-navigation/native-stack';
import Login from './src/screens/login/Login';
import Register from './src/screens/register/Register';
import verifyEmailCode from './src/screens/verifyEmailCode/verifyEmailCode';
import CreateProfile from './src/screens/CreateProfile/CreateProfile';
import {TouchableOpacity, Image} from 'react-native';
import leftArrow from './src/assets/icons/leftArrow.png';

const Stack = createNativeStackNavigator();

const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: {backgroundColor: '#262A34'},
  headerTintColor: 'white',
  headerTitleStyle: {fontWeight: 'bold', fontSize: 18},
};

const AppContent: React.FC = () => {
  const headerLeft = (navigation: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Image source={leftArrow} style={{height: 25, width: 25, marginRight: 5}} />
      </TouchableOpacity>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
        <Stack.Screen name="VerifyEmailCode" component={verifyEmailCode} options={{headerShown: false}} />
        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
          options={({navigation}) => ({
            ...defaultScreenOptions,
            headerLeft: () => headerLeft(navigation),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
