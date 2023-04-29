import { Camera, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable , StyleSheet, Text, Image, View,Button } from 'react-native';
import baseStyles from './styles/baseStyles'

export default function camera() {
  const [cameraType, setcameraType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null)

  const cameraRef=useRef(null);
  const router=useRouter()

  const askForCameraPermissons=async()=>{
    await Camera.requestCameraPermissionsAsync().then((cameraStatus)=>{
      let CameraStatus=cameraStatus
      setCameraPermission(CameraStatus.status==='granted')
      if (CameraStatus.status!='granted')
      {
          alert("You have to accept permissons")
          router.back()
      }
    }); 
  }
  const sendPhotoToAnalyze = async () => {
  }
  const refreshPhoto = async () => {
    setImage(null)
  }
  const takePicture = async () => {
    if (!cameraRef) return
    try{
    const photo = await cameraRef.current.takePictureAsync()
    setImage(photo.uri)
    }
    catch(e)
    {
      console.log(e);
    }
  }

  useEffect(()=>{
    askForCameraPermissons()
  },[])
  return (
    <View style={styles.mainContainer }>
      <View style={styles.headerContainer}>
          <Pressable style={styles.backButton} onPress={()=>router.back()}>
            <Text> --</Text>
          </Pressable >
          <Text style={[styles.Title3,styles.pageTitle]} title="test"> Photo Scan</Text>
        </View>
      <View style={styles.imageContainer}>
          {image!=null ?
          <Image source={{uri:image}} style={styles.camera}/>
          :
          <Camera
          style={styles.camera}
          type={cameraType}
          ref={cameraRef}
        ></Camera>
          }
      </View>
      <View style={styles.buttonContainer}>
        {image==null ?
          <Pressable style={styles.backButton} onPress={takePicture}>
            <Text>Take photo</Text>
          </Pressable >
          :
          <View>
            <Pressable style={styles.backButton} onPress={sendPhotoToAnalyze}>
              <Text>Confirm</Text>
            </Pressable >
            <Pressable style={styles.backButton} onPress={refreshPhoto}>
              <Text>Take anotherPhoto</Text>
            </Pressable >
          </View>
          }
      </View>  
    </View>
  );
}
const styles=StyleSheet.create({...baseStyles,...{
  
  camera:{
    flex:0.90,
    borderRadius:20,
  },
  buttonContainer:{
    flex:1,
    alignContent:'center',
    alignItems:'center'
  },
  imageContainer:{
    flex:3.5,
    width:"90%",
    height:"100%"
  },
  blackBox:{
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:"black"
  },
  
}
})

//