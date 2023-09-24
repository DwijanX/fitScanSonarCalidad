import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import baseStyles from '../styles/baseStyles';


const FoodInDay=({alimentos, totalCalories})=>{

    return(
        <React.Fragment>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <Text style={styles.foodText}>Alimentos:</Text>
                <View style={[styles.ingredientesBox]}>
                    {Object.entries(alimentos).length ? (
                        <Text style={styles.foodText}>
                        {Object.entries(alimentos)
                            .map(([nombre, calorias]) => `${nombre}: ${calorias}`)
                            .join('\n')}
                        </Text>
                    ) : (
                        <Text style={styles.foodText}>no hay datos hoy</Text>
                    )}
                </View>
            </View>
            <View style={[styles.lightBlueBox, styles.box, { marginTop: 10 }]}>
                <Text style={styles.foodText}>calorias totales: {totalCalories}</Text>
            </View>
        </React.Fragment>
            )
}
const styles = StyleSheet.create({
    ...baseStyles,
    ...{
      
      blueBox: {
        backgroundColor: "#336699",
        borderRadius: 10,
        padding: 10,
      },
      lightBlueBox: {
        backgroundColor: "#86BBD8",
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: "75%",
      },
      
      ingredientesBox: {
        backgroundColor: "#86BBD8",
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: "65%",
        height: 200,
        flexWrap: "wrap",
      },
      foodText: {
        color: "#000",
        fontSize: 16,
        fontFamily: "LexendBold",
      },
    },
  });
  
export default FoodInDay