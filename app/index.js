import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
SplashScreen.preventAutoHideAsync();


export default function App(navigation) {
  const router=useRouter()
  const [fontsLoaded] = useFonts({
    'LexendExtraBold': require('./assets/fonts/static/Lexend-ExtraBold.ttf'),
    'LexendBold': require('./assets/fonts/static/Lexend-Bold.ttf'),
    'LexendNormal': require('./assets/fonts/static/Lexend-Medium.ttf'),
    'LexendLight': require('./assets/fonts/static/Lexend-Light.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>FitScan</Text>
          <View style={styles.circle} />
        </View>
      </View>
      <View style={[styles.box, styles.box1]}>
        <Text style={styles.boxText}>Reporte Diario</Text>
      </View>
      <View style={styles.row}>
        <Pressable style={[styles.box, styles.box2a]} onPress={()=>{router.push("/camera")} }>
          <Text style={styles.boxText}>Foto Scan</Text>
        </Pressable>
        <Pressable style={[styles.box, styles.box2b]} onPress={()=>{router.push("/inputManual")} }>
            <Text style={styles.boxText}>Input Manual</Text>
        </Pressable>
      </View>
      <Pressable style={[styles.box, styles.box3]} onPress={()=>{router.push("/calendarScreen")} }>
            <Text style={styles.boxText}>Mi Diario</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

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
});