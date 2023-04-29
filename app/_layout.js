import { Stack } from "expo-router";


export default layout=>{
    return <Stack>
        <Stack.Screen name="index" options={{title:"Home"}}></Stack.Screen>
        <Stack.Screen name="inputManual" options={{title:"inputManual"}}></Stack.Screen>
    
    </Stack>
}