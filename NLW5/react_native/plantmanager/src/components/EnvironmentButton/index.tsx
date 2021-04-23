import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProperties {
  title: string;
  active?: boolean;
}

function EnvironmentButton({ title, active, ...rest}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[
        styles.btnEnviroment,
        active && styles.btnEnviromentActive,
      ]}
      {...rest}
    >
      <Text style={[
        styles.buttonText,
        active && styles.buttonTextActive
      ]}>
        { title || 'Button'}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  btnEnviroment: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },

  btnEnviromentActive: {
    backgroundColor: colors.green_light
  },
  
  buttonText: {
    color: colors.heading,
    fontFamily: fonts.text
  },

  buttonTextActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading
  }
});

export default EnvironmentButton;
