import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles'
import { Calendar } from 'react-native-calendars';
import { Redirect,useRouter  } from 'expo-router';
import dateScreen from './dateScreen';



export default function calendarScreen() {
    const [showModal,setShowModal]=useState(false)
    const router=useRouter()

    const eachDayFunction=(date)=>{
        
        router.replace(href={
            pathname:'/dateScreen',
            params:{"date":date.dateString}
        });
    }
    return (
    <View style={styles.mainContainer }>
        <View >
            <Calendar style={{borderRadius:10,elevation:4,margin:40}}
                onDayPress={eachDayFunction}
                markedDates={{
                    "2023-04-30":{selected:true,selectedColor:"green"},
                    "2023-04-15":{selected:true,selectedColor:"red"}
                }}
            />
        </View>
    </View>
    );
}


const styles=StyleSheet.create({...baseStyles,...{

  }
  })
  
  //