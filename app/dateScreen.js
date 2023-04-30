import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles';
import { useSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router';



export default function dateScreen() {
  const { date } = useSearchParams();
  const router = useRouter();
  const caloriasUsuario = 2000;
  //const ingredientes = []
  const ingredientes = [{ nombre: 'zapallo', calorias: 100 }, { nombre: 'cebolla', calorias: 200 }];
  const totalCalories = ingredientes.reduce((acc, current) => acc + current.calorias, 0);
  const cumplisteDieta = totalCalories <= caloriasUsuario;

  return (
    <View style={styles.mainContainer}>

      <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">{date}</Text>
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


const styles=StyleSheet.create({...baseStyles,...{
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
  })
  
  //