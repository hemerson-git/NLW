import React from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import CustomButton from "../components/CustomButton";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

function Confirmation() {
  const navigation = useNavigation();
  
  function handleConfirmation() {
    navigation.navigate('PlantSelect');
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <CustomButton title="Começar" onPress={handleConfirmation}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 30,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },

  emoji: {
    fontSize: 78,
  },

  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20
  },
});

export default Confirmation;
