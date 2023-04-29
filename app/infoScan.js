import { useRouter } from 'expo-router';
import { Pressable , StyleSheet, Text, Image, View,Button } from 'react-native';
import baseStyles from './styles/baseStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function infoScan() {
  const router = useRouter();
  const imageUri = router.params?.imageUri;


  const sendFood = () => {
    // Implement logic for adding the data entered by the user
    console.log("lali");
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} />
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          Photo Scan
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Nombre:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>Nombre</Text>
            </View>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>Calorias:</Text>
            <View style={styles.lightBlueBox}>
                <Text style={styles.foodText}>Calorias</Text>
            </View>
        </View>
        <View style={[styles.blueBox, styles.box, styles.thirdBox, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text style={styles.foodText}>ingredientes:</Text>
            <View style={styles.ingredientesBox}>
                <Text style={styles.foodText}>ingredientes</Text>
            </View>
        </View>
        <Pressable style={styles.addButton} onPress={sendFood}>
          <Text style={styles.buttonText}>Añadir</Text>
          </Pressable >
    </View>
  );
}
/*

      */

const styles = StyleSheet.create({
  ...baseStyles,
  imageContainer: {
    flex: 1,
    elevation: 1,
  },
  image: {
    resizeMode: 'contain',
  },
  box: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
},
blueBox: {
    backgroundColor: '#336699',
    borderRadius: 10,
    padding: 10,
},
lightBlueBox: {
    backgroundColor: '#86BBD8',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    width: '75%'
  },
  ingredientesBox: {
    backgroundColor: '#86BBD8',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    width: '65%',
    height: 200,
    flexWrap: 'wrap', 
  },
foodText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'LexendBold',
},

});