import {ImageStyle, StyleSheet, TextStyle, ViewStyle} from 'react-native';

interface Styles {
  screenContainer: ViewStyle;
  mainContainer: ViewStyle;
  headerContainer: ViewStyle;
  titleTextStyle: TextStyle;
  descriptionContainer: ViewStyle;
  descriptionTextStyle: TextStyle;
  textInputContainer: ViewStyle;
  InputContainer: ViewStyle;
  textInputStyle: TextStyle;
  imageStyle: ImageStyle;
  btnContainer: ViewStyle;
  verifyButtonStyle: ViewStyle;
  verifyButtonTextStyle: TextStyle;
  resendButtonContainer: ViewStyle;
  resendTextStyle: TextStyle;
  resendButtonStyle: ViewStyle;
  resendButtonTextStyle: TextStyle;
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
  textInputContainer: {
    marginTop: '30%',
    justifyContent: 'center',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: '1%',
  },
  imageStyle: {
    width: 25,
    height: 25,
    marginLeft: 2,
  },
  textInputStyle: {
    width: 41.61,
    height: 38.56,
    fontSize: 16,
    backgroundColor: '#262A34',
    color: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginHorizontal: 7,
  },
  btnContainer: {
    justifyContent: 'center',
    width: '50%',
    marginTop: '10%',
  },
  verifyButtonStyle: {
    marginTop: 24,
    backgroundColor: '#5467FF',
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonTextStyle: {
    color: '#fff',
    fontWeight: '600',
  },
  resendButtonContainer: {
    marginTop: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  resendTextStyle: {
    fontSize: 14,
    color: '#fff',
  },
  resendButtonStyle: {
    height: 40,
    justifyContent: 'center',
    marginLeft: 8,
  },
  resendButtonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#519bf4',
  },
});
export default styles;
