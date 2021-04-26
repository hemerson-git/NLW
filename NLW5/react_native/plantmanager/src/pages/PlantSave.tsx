import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { SvgFromUri } from "react-native-svg";

import waterDrop from "../assets/waterdrop.png";

import CustomButton from "../components/CustomButton";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

function PlantSave() {
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri="" height={150} width={150} />

        <Text style={styles.plantName}>Nome da Planta</Text>

        <Text style={styles.plantDescription}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id a
          consectetur ea reprehenderit temporibus neque?
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDrop} style={styles.tipImage} />

          <Text style={styles.tipText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lemmbrado:
        </Text>

        <CustomButton
          title="Cadastrar Planta"
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape
  },

  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15
  },
  
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  }
});

export default PlantSave;
