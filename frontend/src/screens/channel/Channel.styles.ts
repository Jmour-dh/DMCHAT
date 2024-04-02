import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  header: ViewStyle;
  title: TextStyle;
  messageContainer: ViewStyle;
  messageUserName: TextStyle;
  messageText: TextStyle;
  noMessagesText: TextStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  sendButton: ViewStyle;
  sendButtonText: TextStyle;
  textInputContainer: ViewStyle;
  textInputStyle: TextStyle;
  mainContainer:ViewStyle;
  button:ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({

 button: {
    marginBottom:30,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Couleur du titre du chat
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  messageUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#007bff', // Couleur du nom d'utilisateur du message
  },
  messageText: {
    fontSize: 16,
    color: '#333', // Couleur du texte du message
  },
  noMessagesText: {
    fontSize: 16,
    color: '#555', // Couleur du texte "Aucun message"
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd', // Couleur de la bordure de l'entrée
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:30,
  },
  textInputContainer: {
    marginTop: '5%',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 10,
  },
  textInputStyle: {
    height: 60,
    marginBottom: 8,
    fontSize: 16,
    paddingLeft: 32,
    backgroundColor: '#262A34',
    color: '#4c5dec',
    borderRadius: 20,
  },
  sendButton: {
   backgroundColor: '#4c5dec', // Couleur du bouton d'envoi
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white', // Couleur du texte du bouton d'envoi
    fontSize: 16,
    margin:10,
    marginBottom:0,
  },
});

export default styles;
