import {React} from 'react';
import { View, Text,Pressable,StyleSheet } from 'react-native';
import baseStyles from './styles/baseStyles'
import { useRouter,useSearchParams  } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons'
import { Calendar } from 'react-native-calendars';

export default CalendarScreen=()=> {

    const router=useRouter();

    const {month, date}=useSearchParams()

    
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
                  data-testid="dateTest"
                  current={date}
                  onDayPress={eachDayFunction}/>
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