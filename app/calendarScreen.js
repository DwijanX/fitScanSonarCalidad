import {React} from 'react';
import { View,StyleSheet } from 'react-native';
import baseStyles from './styles/baseStyles'
import { useRouter,useSearchParams  } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import BackHeader from './components/BackHeader';
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
        <BackHeader pageTitle={month}></BackHeader>
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