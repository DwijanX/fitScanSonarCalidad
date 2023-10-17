import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
  const router = useRouter();

  let now = new Date();
  now.setHours(now.getHours() - 4);
  let date = now.toISOString().substring(0, 10);

  return (
    <View style={styles.container} testID="app-component">
      <View style={styles.header} testID="header-container">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>FitScan</Text>
          <Pressable
            style={styles.circle}
            onPress={() => {
              router.push("/user");
            }}
            testID='userBut'
          >
            <Ionicons name="person-circle-outline" size={50}></Ionicons>
          </Pressable>
        </View>
      </View>
      <View style={[styles.box, styles.box1]} testID="report-button">
        <Pressable
          style={[styles.box, styles.box1]}
          onPress={() => {
            router.push("/reporte");
          }}
          testID='dailyReport'
        >
          <Text style={styles.boxText}>Reporte Diario</Text>
          <Text style={styles.boxTextWide}>{date}</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable
          style={[styles.box, styles.box2a]}
          onPress={() => router.push("/camera")}
          testID="cameraButton"
          
        >
          <Text style={styles.boxText}>Foto Scan</Text>
          <Ionicons name="camera-outline" size={150}></Ionicons>
        </Pressable>
        <Pressable
          style={[styles.box, styles.box2b]}
          onPress={() => router.push("/inputManual")}
          testID="manualInput"
        >
          <Text style={styles.boxText}>Input Manual</Text>
          <Ionicons name="list-circle-outline" size={140}></Ionicons>
        </Pressable>
      </View>
      <Pressable
        style={[styles.box, styles.box3]}
        onPress={() => router.push("/meses_diarios")}
        testID="myDiary"

      >
        <Text style={styles.boxText}>Mi Diario</Text>
        <Ionicons name="book-outline" size={100}></Ionicons>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2f4858",
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      height: 80,
      width: "100%",
      justifyContent: "center",
    },
    titleContainer: {
      flexDirection: "row",
    },
    title: {
      fontFamily: "LexendExtraBold",
      marginLeft: 90,
      fontSize: 40,
      marginTop: 30,
      color: "#FFF",
    },
    circle: {
      marginLeft: 34,
      backgroundColor: "#86BBD8",
      borderRadius: 10,
      marginTop: 30,
    },
    box: {
      borderRadius: 10,
      height: 220,
      width: 150,
      alignItems: "center",
      justifyContent: "flex-end",
      flexDirection: "column-reverse",
    },
    box1: {
      height: 160,
      width: 300,
      backgroundColor: "#9EE493",
      marginVertical: 20,
      flexDirection: "column",
    },
    box2a: {
      backgroundColor: "#336699",
      marginRight: 5,
      flexDirection: "column",
    },
    box2b: {
      backgroundColor: "#DAF7DC",
      marginLeft: 5,
      flexDirection: "column",
    },
    box3: {
      width: 300,
      height: 150,
      backgroundColor: "#86BBD8",
      marginTop: 20,
      flexDirection: "column",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 20,
    },
    boxText: {
      fontSize: 24,
      textAlign: "center",
      color: "#000",
      fontFamily: "LexendBold",
    },
    boxTextWide: {
      fontSize: 50,
      textAlign: "center",
      color: "#000",
      fontFamily: "LexendBold",
      marginBottom: 30,
    },
  });
  