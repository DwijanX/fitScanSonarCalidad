import React, { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import baseStyles from "./styles/baseStyles";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as database from "./dataBase/databaseCalls";
import FoodInDay from "./components/FoodInDay";

function Reporte() {
  const router = useRouter();
  const [alimentos, setAlimentos] = useState([
    { nombre: "zapallo", calorias: 100 },
    { nombre: "cebolla", calorias: 200 },
  ]);
  const [totalCalories, setCalories] = useState(0);
  const [, setCaloriesUser] = useState(0);
  const [cumplisteDieta, setDietaMeta] = useState(0);
  let now = new Date();
  now.setHours(now.getHours() - 4);
  let fecha = now.toISOString().substring(0, 10);

  useEffect(() => {
    let now = new Date();
    now.setHours(now.getHours() - 4);
    let fecha = now.toISOString().substring(0, 10).replace(/-/g, "_");
    const getFood = async () => {
      let alimentosDatabase = await database.getFoodOfADate("juan", fecha);
      let userCalories = await database.getUserCalories("juan");
      console.log(userCalories);
      let totalCalories = 0;
      let alimentosKeys = Object.keys(alimentosDatabase);
      for (const alimentosKey of alimentosKeys) {
        totalCalories += alimentosDatabase[alimentosKey];
      }

      console.log(totalCalories);
      console.log(userCalories);
      console.log(userCalories - totalCalories);

      setAlimentos(alimentosDatabase);
      setCalories(totalCalories);
      setCaloriesUser(userCalories);
      setDietaMeta(userCalories - totalCalories);
    };
    getFood();
  }, []);

  useFonts({
    LexendExtraBold: require("./assets/fonts/static/Lexend-ExtraBold.ttf"),
    LexendBold: require("./assets/fonts/static/Lexend-Bold.ttf"),
    LexendNormal: require("./assets/fonts/static/Lexend-Medium.ttf"),
    LexendLight: require("./assets/fonts/static/Lexend-Light.ttf"),
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32}></Ionicons>
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          {fecha}
        </Text>
      </View>
      <FoodInDay alimentos={alimentos} totalCalories={totalCalories}></FoodInDay>
      {totalCalories != 0 ? (
        <View
          style={[
            styles.HicisteBox,
            styles.box,
            {
              marginTop: 10,
              backgroundColor: cumplisteDieta > 0 ? "#9EE493" : "red",
            },
          ]}
        >
          <Text style={styles.foodText}>
            {cumplisteDieta > 0 ? "cumpliste Dieta" : "no Cumpliste Dieta"}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.HicisteBox,
            styles.box,
            { marginTop: 10, backgroundColor: "#336699" },
          ]}
        >
          <Text style={styles.foodText}>no hay datos hoy</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ...baseStyles,
  ...{
    header: {
      height: 80,
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
    },
    blueBox: {
      backgroundColor: "#336699",
      borderRadius: 10,
      padding: 10,
    },
    lightBlueBox: {
      backgroundColor: "#86BBD8",
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
      width: "75%",
    },
    greenBox: {
      backgroundColor: "#86BBD8",
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
      width: "75%",
    },
    HicisteBox: {
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
      width: "60%",
      alignItems: "center",
      justifyContent: "center",
    },
    ingredientesBox: {
      backgroundColor: "#86BBD8",
      borderRadius: 10,
      padding: 10,
      marginLeft: 10,
      width: "65%",
      height: 200,
      flexWrap: "wrap",
    },
    foodText: {
      color: "#000",
      fontSize: 16,
      fontFamily: "LexendBold",
    },
  },
});

export default Reporte;
