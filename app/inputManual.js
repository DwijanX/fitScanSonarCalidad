import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import baseStyles from "./styles/baseStyles";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as database from "./dataBase/databaseCalls";

function InputManual() {
  const router = useRouter();
  useFonts({
    LexendExtraBold: require("./assets/fonts/static/Lexend-ExtraBold.ttf"),
    LexendBold: require("./assets/fonts/static/Lexend-Bold.ttf"),
    LexendNormal: require("./assets/fonts/static/Lexend-Medium.ttf"),
    LexendLight: require("./assets/fonts/static/Lexend-Light.ttf"),
  });

  const [nombre, setNombre] = useState("");
  const [calorias, setCalorias] = useState("");

  let now = new Date();
  now.setHours(now.getHours() - 4);
  let date = now.toISOString().substring(0, 10).replace(/-/g, "_");

  const sendFood = () => {
    //console.log("juan",[nombre],[parseInt(calorias)],date)
    database.newDishesConsumed("juan", [nombre], [parseInt(calorias)], date);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32}></Ionicons>
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          Input Manual
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder="Nombre del platillo"
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>Calorías</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCalorias}
          value={calorias}
          placeholder="Cantidad de calorías"
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.addButton} onPress={sendFood}>
        <Text style={styles.buttonText}>Añadir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  ...baseStyles,
  ...{
    container: {
      flex: 1,
      backgroundColor: "#2f4858",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      backgroundColor: "#336699",
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      marginBottom: 20,
      width: "80%",
      height: 120,
    },
    label: {
      marginBottom: 5,
      fontFamily: "LexendBold",
      fontSize: 22,
    },
    smallLabel: {
      marginBottom: 5,
      fontFamily: "LexendLight",
      fontSize: 14,
    },
    input: {
      backgroundColor: "#FFF",
      padding: 10,
      fontSize: 16,
      fontFamily: "LexendNormal",
    },
    multilineInput: {
      height: 100,
      textAlignVertical: "top",
    },
  },
});

export default InputManual;
