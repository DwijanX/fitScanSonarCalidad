import { useFonts } from "expo-font";
import Home from "./home";


export default function App(navigation) {

  const [fontsLoaded] = useFonts({
    LexendExtraBold: require("./assets/fonts/static/Lexend-ExtraBold.ttf"),
    LexendBold: require("./assets/fonts/static/Lexend-Bold.ttf"),
    LexendNormal: require("./assets/fonts/static/Lexend-Medium.ttf"),
    LexendLight: require("./assets/fonts/static/Lexend-Light.ttf"),
  });

  let now = new Date();
  now.setHours(now.getHours() - 4);

  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <Home/>
  );
}
