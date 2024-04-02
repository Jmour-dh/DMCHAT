import React from 'react';
import {Modal, View} from 'react-native';
import ProfileImagePickerIOS from './ImagePickerIOS';
import ProfileImagePickerAndroid from './ImagePickerAndroid';
import {Platform} from 'react-native';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onImageSelected: (uri: string) => void;
}

const ProfileImagePickerModal: React.FC<Props> = ({modalVisible, setModalVisible, onImageSelected}) => {
  const ProfileImagePickerComponent = Platform.select({
    ios: () => <ProfileImagePickerIOS onImageSelected={onImageSelected} modalVisible={modalVisible} setModalVisible={setModalVisible} />,
    android: () => <ProfileImagePickerAndroid onImageSelected={onImageSelected} modalVisible={modalVisible} setModalVisible={setModalVisible} />,
  })();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={{flex: 1}}>{ProfileImagePickerComponent}</View>
    </Modal>
  );
};

export default ProfileImagePickerModal;
