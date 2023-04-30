import {React, useEffect, useState} from 'react';
import { useRouter,useSearchParams } from 'expo-router';
import { Pressable , StyleSheet, Text, Image, View } from 'react-native';
import baseStyles from './styles/baseStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Base64 from 'Base64';

export default function infoScan() {
  const router = useRouter();
  const [image,setImage]=useState(null)
  const {imgSource,classes}=useSearchParams()
  hora = "10:20"
  calorias = 100
  const alimentos = [{ nombre: 'zapallo', calorias: 100 }, { nombre: 'cebolla', calorias: 200 }];
  const encodedBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==';

    const getDate = () => {
      const now = new Date();
      now.setHours(now.getHours() - 4);
      return now
    };

  const sendFood = () => {
    // Implement logic for adding the data entered by the user
    console.log(getDate());
  };

  useState(()=>{
setImage(Base64.atob(imgSource));
  },[])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} />
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          Photo Scan
        </Text>
      </View>

      <View style={styles.imageContainer}>
        {
          image?
          <View>
            <Image source={{ uri: image }} style={{ width: 200, height: 200, marginLeft: '22%'}} />
          </View>
          :
          <Text> null</Text>
        }
      </View>
    
      <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Hora:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>{hora}</Text>
            </View>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Calorias:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>{calorias}</Text>
            </View>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>alimentos:</Text>
            <View style={[styles.ingredientesBox]}>
          {alimentos.length ? (
            <Text style={styles.foodText}>{alimentos.map((item) => `${item.nombre}: ${item.calorias}`).join('\n')}</Text>
          ) : (
            <Text style={styles.foodText}>no hay datos hoy</Text>
          )}
        </View>
        </View>
        <Pressable style={styles.addButton} onPress={sendFood}>
          <Text style={styles.buttonText}>Añadir</Text>
          </Pressable>
    </View>
  );
}

const styles=StyleSheet.create({...baseStyles,...{
  imageContainer: {
    flex: 1,
    elevation: 1,
    width:"100%",
    height:"100%"
  },
  image: {
    flex:1,
    width:"100%",
    height:"100%"
  },
  box: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
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

}});