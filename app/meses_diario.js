import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';


export default function meses_diario() {
    return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mi diario</Text>
          <View style={styles.circle} />
        </View>
      <View className={[styles.box,styles.rectangle1]}>
        <View className={styles.abril}>Abril</View>
      </View>
      <View className={[styles.box,styles.rectangle1]}>
        <View className={styles.septiembre}>Septiembre</View>
      </View>
      <View className={[styles.box,styles.rectangle2]}>
        <View className={styles.octubre}>Octubre</View>
      </View>
      <View className={[styles.box,styles.rectangle2]}>
        <View className={styles.noviembre}>Noviembre</View>
      </View>
      <View className={[styles.box,styles.rectangle3]}>
        <View className={styles.diciembre}>Diciembre</View>
      </View>
      <View className={[styles.box,styles.rectangle3]}>
        <View className={styles.enero}>Enero</View>
      </View>
      <View className={[styles.box,styles.rectangle4]}>
        <View className={styles.febrero}>Febrero</View>
      </View>
      <View className={[styles.box,styles.rectangle4]}>
        <View className={styles.marzo}>Marzo</View>
      </View>
      <View className={[styles.box,styles.rectangle5]}>
        <View className={styles.agosto}>Agosto</View>
      </View>
      <View className={[styles.box,styles.rectangle5]}>
        <View className={styles.mayo}>Mayo</View>
      </View>
        <View className={[styles.box,styles.rectangle6]}>
      <View className={styles.junio}>Junio</View>
      </View>
      <View className={[styles.box,styles.rectangle6]}>
        <View className={styles.julio}>Julio</View>
      </View>
      </View>
    </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2f4858',
      alignItems: 'center',
      justifyContent: 'center',
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
    box: {
      height: 220,
      width: 150,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'column-reverse',
    },
    box1: {
      height: 160,
      width: 300,
      backgroundColor: '#9EE493',
      marginVertical: 20,
    },
    box2a: {
      backgroundColor: '#336699',
      marginRight: 5,
    },
    box2b: {
      backgroundColor: '#DAF7DC',
      marginLeft: 5,
    },
    box3: {
      width: 300,
      height: 150,
      backgroundColor: '#86BBD8',
      marginTop: 20,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    boxText: {
      fontSize: 24,
      textAlign: 'center',
      color: '#000',
      fontFamily: "LexendBold",
    },
    rectangle1:{
        height: 160,
        width: 300,
        backgroundColor: '#9EE493',
        marginVertical: 20,
    },
    rectangle2:{
        
    },
    rectangle3:{
        
    },
    rectangle4:{
        
    },
    rectangle5:{
        
    },
    rectangle6:{
        
    },
    abril:{},
    marzo:{},
    febrero:{},
    enero:{},
    diciembre:{},
    noviembre:{},
    octubre:{},
    septiembre:{},
    agosto:{},
    julio:{},
    junio:{}
  });