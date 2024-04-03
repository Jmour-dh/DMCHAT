import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Styles {
  menuItem: TextStyle;
  modal: ViewStyle;
  modalContent: ViewStyle;
  modalText: TextStyle;
  modalButton: ViewStyle;
  modalButtonText: TextStyle;
}

const styles: Styles = StyleSheet.create({
  menuItem: {
    padding: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2196F3',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default styles;
