import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles'
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router';


export default function meses_diario() {
  const [fontsLoaded] = useFonts({
    'LexendExtraBold': require('./assets/fonts/static/Lexend-ExtraBold.ttf'),
    'LexendBold': require('./assets/fonts/static/Lexend-Bold.ttf'),
    'LexendNormal': require('./assets/fonts/static/Lexend-Medium.ttf'),
    'LexendLight': require('./assets/fonts/static/Lexend-Light.ttf'),
  });
    return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable >
          <Text style={[styles.Title3,styles.pageTitle]} title="test">   Mi diario</Text>
        </View>
        <View style={styles.row}>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Abril</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Marzo</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Febrero</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Enero</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box3]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Diciembre</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box3]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Noviembre</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box4]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Octubre</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box4]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Septiembre</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Agosto</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Julio</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Junio</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Mayo</Text>
        </Pressable>
      </View>
    </View>
    );
};
const styles = StyleSheet.create({
    ...baseStyles,
    container: {
      flex: 1,
      backgroundColor: '#2f4858',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    header: {
      height: 80,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'LexendExtraBold',
      fontSize: 20,
      marginTop: 30,
      color: '#FFF',
    },
    circle: {
      width: 20,
      height: 20,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginLeft: 5,
    },
    row: {
      flexDirection: 'row',
      marginTop: 50,
    },
    box: {
      height: 100,
      width: 150,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'column-reverse',
    },
    boxText: {
      fontSize: 24,
      textAlign: 'center',
      color: '#000',
      fontFamily: "LexendBold",
    },
    box1: {
      backgroundColor: '#DAF7DC',
      marginLeft: 5,
        marginRight: 5,
    },
    box2: {
      backgroundColor: '#86BBD8',
      marginLeft: 5,
        marginRight: 5,
    },
    box3: {
        backgroundColor: '#9EE493',
        marginLeft: 5,
        marginRight: 5,
      },
    box4: {
        backgroundColor: '#336699',
        marginLeft: 5,
        marginRight: 5,
      },
  });
