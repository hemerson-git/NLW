import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from "../components/CustomButton";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState("");
  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  async function handleConfirmation() {
    if(!user.trim()) {
      return Alert.alert('Me diz como chamar você 😢', 'Por favor, Insira o seu Nome!')
    }
    
    try {
      await AsyncStorage.setItem('@plantmanager:user', user.trim());
      navigation.navigate("Confirmation");
    } catch {
      return Alert.alert('Opss 😢', 'Não foi possível salver o seu Nome!')
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{!!user ? "😄" : "😀"}</Text>

                <Text style={styles.title}>
                  Como podemos {"\n"}
                  chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || !!user) && { borderColor: colors.green },
                ]}
                placeholder="Digite o seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                value={user}
                onChangeText={(text) => setUser(text)}
              />

              <View style={styles.footer}>
                <CustomButton title="Confirmar" onPress={handleConfirmation} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  content: {
    flex: 1,
    width: "100%",
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 54,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 44,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: Dimensions.get('window').width * .7,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },

  footer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default UserIdentification;
