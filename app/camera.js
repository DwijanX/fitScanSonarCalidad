import { Camera, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Image, View } from 'react-native';

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
    console.log(photo.uri);
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
    <View style={styles.container}>
      {image!=null ?
      <Image source={{uri:image}} style={styles.camera}/>
      :
      <Camera
      style={styles.camera}
      type={cameraType}
      ref={cameraRef}
    ></Camera>
      }
        
      <View >
        <Button title='Take Photo' onPress={takePicture}>Take Photo</Button>
      </View>
      <View >
        <Button title='Take another Photo' onPress={refreshPhoto}>Take Photo</Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({ 
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
  camera:{
    flex:0.5,
    borderRadius:20,
  },
  buttonContainer:{
    flex:0.5,
    alignContent:'center',
    alignItems:'center'
  }

}); 