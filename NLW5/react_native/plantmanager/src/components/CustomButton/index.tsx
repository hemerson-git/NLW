import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface buttonProps extends RectButtonProperties {
  title: string;
}

function CustomButton({ title = 'Button', ...rest } : buttonProps ) {
  return (
    <RectButton 
      style={styles.button}
      {...rest}
    >
      <Text 
        style={styles.buttonText}
      > 
        {title} 
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    textAlign: 'center',
    borderRadius: 16,
    marginBottom: 16,
    height: 56,
    paddingHorizontal: 10
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.heading
  },
});

export default CustomButton;
