import {React} from 'react';
import { View, Text,Pressable,StyleSheet } from 'react-native';
import baseStyles from './styles/baseStyles'
import { Calendar } from 'react-native-calendars';
import { useRouter,useSearchParams  } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'


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
    
  });
  
  //