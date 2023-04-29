import React, { useState } from 'react';
import { Pressable , StyleSheet, Text, Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import baseStyles from './styles/baseStyles'
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';

function Reporte() {
  const router=useRouter()
  const [fontsLoaded] = useFonts({
    'LexendExtraBold': require('./assets/fonts/static/Lexend-ExtraBold.ttf'),
    'LexendBold': require('./assets/fonts/static/Lexend-Bold.ttf'),
    'LexendNormal': require('./assets/fonts/static/Lexend-Medium.ttf'),
    'LexendLight': require('./assets/fonts/static/Lexend-Light.ttf'),
  });

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">Reporte Diario</Text>
        </View>
        <View style={[styles.greenBox, styles.box]}>
            <Text style={styles.dayText}>17/04/23</Text>
        </View>
        <View style={[styles.lightBox, styles.box, styles.secondBox]}>
            <Text style={styles.dayText}>10:42</Text>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Nombre:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>Nombre</Text>
            </View>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Calorias:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>Calorias</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({...baseStyles,...{
    container: {
        flex: 1,
        backgroundColor: '#2f4858',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
    },
    secondBox: {
        width: '70%',
    },
    thirdBox: {
        width: '95%',
    },
    greenBox: {
        backgroundColor: '#9EE493',
        borderRadius: 10,
        padding: 10,
    },
    lightBox: {
        backgroundColor: '#DAF7DC',
        borderRadius: 10,
        padding: 10,
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
        width: '70%'
      },
    dayText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'LexendBold',
        textAlign: 'center',
    },
    hourText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'LexendBold',
    },
    foodText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'LexendBold',
    },
}
});

export default Reporte;