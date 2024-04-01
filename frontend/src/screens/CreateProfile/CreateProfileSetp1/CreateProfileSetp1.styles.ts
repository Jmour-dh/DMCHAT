import {StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface Styles {
  mainContainer: ViewStyle;
  sexeContainer: ViewStyle;
  pressableMale: ViewStyle;
  activePressable: ViewStyle;
  male: ViewStyle;
  icon: ViewStyle;
  textBtn: ViewStyle;
  textSexe: TextStyle;
  pressableFemale: ViewStyle;
  female: ViewStyle;
  textInputContainer: ViewStyle;
  textInputStyle: TextStyle;
  nextButtonStyle: ViewStyle;
  nextButtonTextStyle: TextStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  mainContainer: {
    backgroundColor: '#181A1F',
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  sexeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '10%',
  },
  pressableMale: {
    height: 60,
    backgroundColor: '#262A34',
    width: '40%',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    padding: 5,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#181A1F',
  },
  activePressable: {
    backgroundColor: '#55efc4',
  },
  male: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginHorizontal: '5%',
  },
  textBtn: {
    alignItems: 'center',
    width: '60%',
  },
  textSexe: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  pressableFemale: {
    height: 60,
    backgroundColor: '#262A34',
    justifyContent: 'center',
    width: '40%',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    padding: 5,
    borderWidth: 1,
    borderColor: '#181A1F',
  },
  female: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  nextButtonStyle: {
    marginTop: 24,
    backgroundColor: '#5467FF',
    width: '100%',
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonTextStyle: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;
