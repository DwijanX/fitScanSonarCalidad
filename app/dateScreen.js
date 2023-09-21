import React, { useState,useEffect } from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles';
import { useSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router';
import * as database from './dataBase/databaseCalls'


export default function dateScreen() {
  
  const router = useRouter();
  const [alimentos,setAlimentos] = useState([{ nombre: 'zapallo', calorias: 100 }, { nombre: 'cebolla', calorias: 200 }])
  const [totalCalories, setCalories] = useState(0)
  const [cumplisteDieta, setDietaMeta] = useState(0)

  const { date } = useSearchParams();
  
  let fecha = date;

  useEffect(()=>{
    let fecha = date.replace(/-/g, "_");
    const getFood = async()=>{
        let alimentosDatabase = await database.getFoodOfADate("juan",fecha)
        let userCalories = await database.getUserCalories("juan")
        userCalories = parseInt(parseInt(userCalories["juan"]))
        let totalCalories = 0
        let alimentosKeys = Object.keys(alimentosDatabase)
        for (let i=0; i<alimentosKeys.length; i++)
        {
            totalCalories += alimentosDatabase[alimentosKeys[i]]
        }

        console.log(totalCalories)
        console.log(userCalories)
        console.log(userCalories-totalCalories)

        setAlimentos(alimentosDatabase)
        setCalories(totalCalories)
        setDietaMeta(userCalories-totalCalories)
    }
    getFood()
    },[])

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
            {Object.entries(alimentos).length ? (
                <Text style={styles.foodText}>
                {Object.entries(alimentos)
                    .map(([nombre, calorias]) => `${nombre}: ${calorias}`)
                    .join('\n')}
                </Text>
            ) : (
                <Text style={styles.foodText}>no hay datos hoy</Text>
            )}
        </View>
      </View>
      <View style={[styles.lightBlueBox, styles.box, { marginTop: 10 }]}>
        <Text style={styles.foodText}>calorias totales: {totalCalories}</Text>
      </View>
      {totalCalories != 0? (
        <View style={[styles.HicisteBox, styles.box, { marginTop: 10, backgroundColor: cumplisteDieta>0 ? '#9EE493' : 'red' }]}>
          <Text style={styles.foodText}>{cumplisteDieta>0 ? 'cumpliste Dieta' : 'no Cumpliste Dieta'}</Text>
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