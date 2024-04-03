import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Home from '../screens/home/Home';
import MyProfile from '../screens/myProfile/MyProfile';
import LogoutButton from './LogoutButton/LogoutButton';

const Drawer = createDrawerNavigator();
const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Déconnexion" onPress={() => {}} style={{display: 'none'}} />
            <LogoutButton {...props} />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="Accueil" component={Home} />
      <Drawer.Screen name="Mon profil" component={MyProfile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
