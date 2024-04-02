import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface Styles {
  screenContainer: ViewStyle;
  mainContainer: ViewStyle;
  headerContainer: ViewStyle;
  titleTextStyle: TextStyle;
  descriptionContainer: ViewStyle;
  descriptionTextStyle: TextStyle;
  logoContainer: ViewStyle;
  textInputContainer: ViewStyle;
  textInputStyle: TextStyle;
  forgotButtonStyle: ViewStyle;
  forgotPasswordTextStyle?: TextStyle;
  signInButtonStyle: ViewStyle;
  signInButtonTextStyle: TextStyle;
  signUpButtonContainer: ViewStyle;
  signUpTextStyle: TextStyle;
  signUpButtonStyle: ViewStyle;
  signUpButtonTextStyle?: TextStyle;
  errorTextStyle: TextStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: '#181A1F',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  headerContainer: {
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Noto Sans',
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTextStyle: {
    fontSize: 15,
    color: '#696A6F',
  },
  logoContainer: {
    marginTop: 20,
  },
  textInputContainer: {
    marginTop: '30%',
    justifyContent: 'center',
    width: '80%',
  },
  textInputStyle: {
    height: 60,
    marginBottom: 8,
    fontSize: 16,
    paddingLeft: 32,
    backgroundColor: '#262A34',
    color: '#fff',
    borderRadius: 20,
  },
  forgotButtonStyle: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  forgotPasswordTextStyle: {
    color: '#6C6D72',
  },
  signInButtonStyle: {
    marginTop: 24,
    backgroundColor: '#5467FF',
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonTextStyle: {
    color: '#fff',
    fontWeight: '600',
  },
  signUpButtonContainer: {
    marginTop: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signUpTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
  signUpButtonStyle: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 8,
  },
  signUpButtonTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#519bf4',
  },
  errorTextStyle: {
    color: 'red',
    marginBottom: 5,
  },
});
export default styles;
