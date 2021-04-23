import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottiewView from 'lottie-react-native';

import loadAnimation from '../../assets/load.json';

function Load() {
  return (
    <View style={styles.container}>
      <LottiewView 
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  animation: {
    width: 200,
    height: 200
  }
});

export default Load;
