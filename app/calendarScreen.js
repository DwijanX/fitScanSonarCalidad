import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles'
import { Calendar } from 'react-native-calendars';
import { Redirect,useRouter  } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useSearchParams } from 'expo-router';


export default function CalendarScreen() {

    const router=useRouter();

    const {month, date}=useSearchParams()
    console.log(month,date)
    
    const eachDayFunction=(date)=>{
        
      const href = {
        pathname: '/dateScreen',
        params: { "date": date.dateString }
      };
      
      router.replace(href);
    }
    return (
    <View style={styles.container }>
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">{month}</Text>
        </View>
        <View >
            <Calendar style={{borderRadius:10,elevation:4,margin:40}}
                current={date}
                onDayPress={eachDayFunction}
                // markedDates={{
                //     "2023-04-30":{selected:true,selectedColor:"green"},
                //     "2023-04-15":{selected:true,selectedColor:"red"}
                // }}
            />
        </View>
    </View>
    );
}


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
  
  //