import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import baseStyles from "./styles/baseStyles";
import { useSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as database from "./dataBase/databaseCalls";
import FoodInDay from "./components/FoodInDay";

export default function DateScreen() {
  const router = useRouter();
  const [alimentos, setAlimentos] = useState([
    { nombre: "zapallo", calorias: 100 },
    { nombre: "cebolla", calorias: 200 },
  ]);
  const [totalCalories, setCalories] = useState(0);
  const [cumplisteDieta, setDietaMeta] = useState(0);

  const { date } = useSearchParams();

  let fecha = date;

  useEffect(() => {
    let fecha = date.replace(/-/g, "_");
    const getFood = async () => {
      let alimentosDatabase = await database.getFoodOfADate("juan", fecha);
      let userCalories = await database.getUserCalories("juan");
      userCalories = parseInt(parseInt(userCalories["juan"]));
      let totalCalories = 0;
      let alimentosKeys = Object.keys(alimentosDatabase);
      for (const alimentosKey of alimentosKeys) {
        totalCalories += alimentosDatabase[alimentosKey];
      }
      setAlimentos(alimentosDatabase);
      setCalories(totalCalories);
      setDietaMeta(userCalories - totalCalories);
    };
    getFood();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          testID="back-button"
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={32}></Ionicons>
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          {fecha}
        </Text>
      </View>
      <FoodInDay
        alimentos={alimentos}
        totalCalories={totalCalories}
      ></FoodInDay>

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
