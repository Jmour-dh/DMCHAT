import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Demande de permission pour la caméra sur iOS
export const checkCameraPermissionIOS = async (): Promise<boolean> => {
  const permission = PERMISSIONS.IOS.CAMERA;
  const result = await check(permission);
  if (result === RESULTS.GRANTED) {
    console.info('Permission de caméra déjà accordée.');
    return true;
  }

  console.log('Demande de permission de caméra...');
  const requestResult = await request(permission);
  if (requestResult === RESULTS.GRANTED) {
    console.info('Permission de caméra accordée.');
    return true;
  } else {
    console.error('Permission de caméra refusée.');
    return false;
  }
};

// Demande de permission pour la bibliothèque de photos sur iOS
export const checkPhotoLibraryPermissionIOS = async (): Promise<boolean> => {
  const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  const result = await check(permission);
  if (result === RESULTS.GRANTED) {
    console.info('Permission de bibliothèque de photos déjà accordée.');
    return true;
  }

  console.log('Demande de permission de bibliothèque de photos...');
  const requestResult = await request(permission);
  if (requestResult === RESULTS.GRANTED) {
    console.info('Permission de bibliothèque de photos accordée.');
    return true;
  } else {
    console.error('Permission de bibliothèque de photos refusée.');
    return false;
  }
};
