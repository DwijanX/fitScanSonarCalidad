import {React,useState} from 'react';
import { View, Text,Pressable,StyleSheet,Modal } from 'react-native';
import baseStyles from './styles/baseStyles'
import { Calendar } from 'react-native-calendars';



export default function calendarScreen() {
    const [showModal,setShowModal]=useState(false)

    const eachDayFunction=(date)=>{
        console.log(date);
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