import React, { useState } from 'react';
import { Pressable , StyleSheet, Text, Image, View,Button, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import baseStyles from './styles/baseStyles'
import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as database from './dataBase/databaseCalls'

function User() {
  const router=useRouter()
  const [nombre, setNombre] = useState('');
  const [calorias, setCalorias] = useState('');

  
  const sendChanges = async()=>{
    await database.saveCaloriesForUser(nombre,calorias)
    router.back()
};

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
              
              <Ionicons name="arrow-back" size={32}></Ionicons>
          </Pressable>
          <Text style={[styles.Title3,styles.pageTitle]} title="test">   Usuario</Text>
        </View>
      <View style={styles.box}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNombre}
          value={nombre}
          placeholder="Tu nombre que quieras usar"
        />
      </View>
      <View style={styles.box}>
        <Text style={styles.bigLabel}>Tu numero de calorias diarias depende de tu peso, altura, edad y estilo de vida; consultar con un nutricionista para mayor información</Text>
        <Text style={styles.label}>Calorías</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCalorias}
          value={calorias}
          placeholder="calorias en tu dieta"
          keyboardType="numeric"
        />
      </View>
      <Pressable style={styles.addButton} onPress={sendChanges}>
          <Text style={styles.buttonText}>cambiar</Text>
          </Pressable >

          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.1</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({...baseStyles,...{
  container: {
    flex: 1,
    backgroundColor: '#2f4858',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#336699',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginBottom: 30,
    marginTop: 30,
    width: '80%',
    
  },
  label: {
    marginBottom: 5,
    fontFamily: 'LexendBold',
    fontSize: 22,
  },
  BigLabel: {
    marginBottom: 5,
    backgroundColor: '#fff',
    fontFamily: 'LexendLight',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    fontSize: 16,
    fontFamily: 'LexendNormal',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#9EE493',
    width: '60%',
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#2f4858',
    padding: 10,

  },
  versionText: {
    marginTop: 20,
    color: '#fff',
    fontFamily: 'LexendLight',
    fontSize: 16,
    textAlign: 'center',
  },
}
});

export default User;

