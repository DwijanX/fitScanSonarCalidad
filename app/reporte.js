import React, { useState } from 'react';
import { Pressable , StyleSheet, Text, Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import baseStyles from './styles/baseStyles'
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

function Reporte() {
  const router=useRouter()

  const now = new Date();
  now.setHours(now.getHours() - 4);
  const fecha = now.toISOString().substring(0, 10);
  
  //const ingredientes = []

  const ingredientes = [{ nombre: 'zapallo', calorias: 100 }, { nombre: 'cebolla', calorias: 200 }];
  const totalCalories = ingredientes.reduce((acc, current) => acc + current.calorias, 0);
  const caloriasUsuario = 2000;
  const cumplisteDieta = totalCalories <= caloriasUsuario;
  const [fontsLoaded] = useFonts({
    'LexendExtraBold': require('./assets/fonts/static/Lexend-ExtraBold.ttf'),
    'LexendBold': require('./assets/fonts/static/Lexend-Bold.ttf'),
    'LexendNormal': require('./assets/fonts/static/Lexend-Medium.ttf'),
    'LexendLight': require('./assets/fonts/static/Lexend-Light.ttf'),
  });

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">{fecha}</Text>
        </View>

      <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text style={styles.foodText}>Alimentos:</Text>
        <View style={[styles.ingredientesBox]}>
          {ingredientes.length ? (
            <Text style={styles.foodText}>{ingredientes.map((item) => `${item.nombre}: ${item.calorias}`).join('\n')}</Text>
          ) : (
            <Text style={styles.foodText}>no hay datos hoy</Text>
          )}
        </View>
      </View>
      <View style={[styles.lightBlueBox, styles.box, { marginTop: 10 }]}>
        <Text style={styles.foodText}>calorias totales: {totalCalories}</Text>
      </View>
      {ingredientes.length ? (
        <View style={[styles.HicisteBox, styles.box, { marginTop: 10, backgroundColor: cumplisteDieta ? '#9EE493' : 'red' }]}>
          <Text style={styles.foodText}>{cumplisteDieta ? 'cumpliste Dieta' : 'no Cumpliste Dieta'}</Text>
        </View>
        ) : (
        <View style={[styles.HicisteBox, styles.box, { marginTop: 10, backgroundColor:"#336699" }]}>
          <Text style={styles.foodText}>no hay datos hoy</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({...baseStyles,...{
    header: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      blueBox: {
        backgroundColor: '#336699',
        borderRadius: 10,
        padding: 10,
    },
    lightBlueBox: {
        backgroundColor: '#86BBD8',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: '75%'
      },
    greenBox: {
        backgroundColor: '#86BBD8',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: '75%'
      },
    HicisteBox: {
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      ingredientesBox: {
        backgroundColor: '#86BBD8',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: '65%',
        height: 200,
        flexWrap: 'wrap', 
      },
    foodText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'LexendBold',
    },
}
});

export default Reporte;