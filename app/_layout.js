import { Stack } from "expo-router";
import baseStyles from './styles/baseStyles'


export default layout=>{
    return <Stack
            screenOptions={{
            headerShown: false
            }}
        >
        <Stack.Screen name="index" options={
            {title:"Home"}}></Stack.Screen>
        <Stack.Screen name="inputManual" options={{title:"inputManual"}}></Stack.Screen>
        <Stack.Screen name="camera" options={{title:"Photo Scan"}}></Stack.Screen>
        <Stack.Screen name="calendarScreen" options={{title:"calendarScreen"}}></Stack.Screen>
    
    </Stack>
}