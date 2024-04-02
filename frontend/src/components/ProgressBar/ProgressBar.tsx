import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

interface Styles {
  progressBarContainer: ViewStyle;
  progressBar: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  progressBarContainer: {
    height: 5,
    width: '60%',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#59C09B',
    borderRadius: 5,
  },
});

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, {width: `${progress * 100}%`}]} />
  </View>
);

export default ProgressBar;
