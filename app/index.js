import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import '/css/styles.css'
export default function App() {
  return (
    <View style="container">
      <View style="header">
        <View style="titleContainer">
          <Text style="title">FitScan</Text>
          <View style="circle" />
        </View>
      </View>
      <View style={["box", "box1"]}>
        <Text style="boxText">Reporte Diario</Text>
      </View>
      <View style="row">
        <View style={["box", "box2a"]}>
          <Text style="boxText">Foto Scan</Text>
        </View>
        <View style={["box", "box2b"]}>
          <Text style="boxText">Input Manual</Text>
        </View>
      </View>
      <View style={["box", "box3"]}>
        <Text style="boxText">Mi Manual</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
});
