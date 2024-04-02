import {PermissionsAndroid, Platform} from 'react-native';

export const checkCameraAndStoragePermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] !== PermissionsAndroid.RESULTS.GRANTED ||
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.error('Permission refusée');
      return false;
    } else {
      console.info('Vous pouvez utiliser la caméra et accéder au stockage');
      return true;
    }
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Permission de Caméra',
      message: "Cette application a besoin d'accéder à votre caméra",
      buttonNeutral: 'Demander Plus Tard',
      buttonNegative: 'Annuler',
      buttonPositive: 'OK',
    });

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.error('Permission de caméra refusée');
      return false;
    } else {
      console.info('Vous pouvez utiliser la caméra');
      return true;
    }
  }

  return false;
};
