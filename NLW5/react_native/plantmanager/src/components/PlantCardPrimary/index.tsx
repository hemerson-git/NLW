import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { SvgFromUri } from 'react-native-svg';

interface PlantProps extends RectButtonProperties {
  data: {
    name: string;
    photo: string;
  }
}

function PlantCardPrimary({ data, ...rest } : PlantProps) {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri 
        uri={data.photo} 
        width={70} 
        height={70}
      />
      <Text style={styles.buttonText}>
        {data.name}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },

  buttonText: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
    marginVertical: 16
  }
});

export default PlantCardPrimary;
