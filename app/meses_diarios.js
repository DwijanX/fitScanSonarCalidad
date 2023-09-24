import {React} from 'react';
import { View, Text,Pressable,StyleSheet, ScrollView } from 'react-native';
import baseStyles from './styles/baseStyles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router';


export default function MesesDiario() {
  const router=useRouter();
  const change_page=(month)=>{

    const year = new Date().getFullYear();
    const firstDay = new Date(year, month - 1, 1);
    const date = firstDay.toISOString().split("T")[0];
    const monthString = firstDay.toLocaleString('es-ES', { month: 'long' });
    const href = {
      pathname: '/calendarScreen',
      params: {"month": monthString, "date": date}
    };
    
    router.replace(href);
  }

    return(
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">   Mi diario</Text>
        </View>
        <View style={styles.row}>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{change_page(4)}}>
          <Text style={styles.boxText}>Abril</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{change_page(3)} }>
            <Text style={styles.boxText}>Marzo</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{change_page(2)} }>
          <Text style={styles.boxText}>Febrero</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{change_page(1)} }>
            <Text style={styles.boxText}>Enero</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box3]} onPress={()=>{change_page(12)} }>
          <Text style={styles.boxText}>Diciembre</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box3]} onPress={()=>{change_page(11)} }>
            <Text style={styles.boxText}>Noviembre</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box4]} onPress={()=>{change_page(10)} }>
          <Text style={styles.boxText}>Octubre</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box4]} onPress={()=>{change_page(9)} }>
            <Text style={styles.boxText}>Septiembre</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{change_page(8)} }>
          <Text style={styles.boxText}>Agosto</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box1]} onPress={()=>{change_page(7)} }>
            <Text style={styles.boxText}>Julio</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{change_page(6)} }>
          <Text style={styles.boxText}>Junio</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box2]} onPress={()=>{change_page(5)} }>
            <Text style={styles.boxText}>Mayo</Text>
        </Pressable>
      </View>
    </ScrollView>
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
    row: {
      flexDirection: 'row',
      marginTop: 50,
    },
    box: {
      borderRadius: 10,
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
