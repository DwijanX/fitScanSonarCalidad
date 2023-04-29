import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles';
import { useSearchParams } from 'expo-router';



export default function dateScreen() {
  const {date}=useSearchParams()
    return (
    <View style={styles.mainContainer }>
        <Text style={styles.Title3}>{date}</Text>
    </View>
    );
}


const styles=StyleSheet.create({...baseStyles,...{

  }
  })
  
  //