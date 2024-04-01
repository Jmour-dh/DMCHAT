import {StyleSheet, ViewStyle, ImageStyle, TextStyle} from 'react-native';

interface Styles {
  mainContainer: ViewStyle;
  pictureContainer: ViewStyle;
  pressableContainer: ImageStyle;
  cameraContainer: ViewStyle;
  textInputContainer: ViewStyle;
  textInputStyle: TextStyle;
  validateButtonStyle: ViewStyle;
  validateButtonTextStyle: TextStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  mainContainer: {
    backgroundColor: '#181A1F',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  pictureContainer: {
    marginTop: '15%',
    position: 'relative',
  },
  pressableContainer: {
    width: 120,
    height: 120,
  },
  cameraContainer: {
    marginTop:"13%",
    position: 'absolute',
    top: 80,
    right: '35%',
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
  validateButtonStyle: {
    marginTop: 24,
    backgroundColor: '#5467FF',
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateButtonTextStyle: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
