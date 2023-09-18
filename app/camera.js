import { Camera, CameraType } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, Image, View, Button } from "react-native";
import baseStyles from "./styles/baseStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import Base64 from "Base64";
import processPhoto from "./apiMediator";
import * as FileSystem from "expo-file-system";

export default function camera() {
  const [cameraType, setcameraType] = useState(CameraType.back);
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);
  const router = useRouter();

  const askForCameraPermissons = async () => {
    await Camera.requestCameraPermissionsAsync().then((cameraStatus) => {
      let CameraStatus = cameraStatus;
      setCameraPermission(CameraStatus.status === "granted");
      if (CameraStatus.status != "granted") {
        alert("You have to accept permissons");
        router.back();
      }
    });
  };
  async function uriToBase64(uri) {
    let base64String = null;
    try {
      const fileContent = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      base64String = Base64.encode(fileContent);
    } catch (error) {
      console.error(error);
    }
    return base64String;
  }
  const sendPhotoToAnalyze = async () => {
    let ans = await processPhoto(image);
    const imageBytes = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageURI = `data:image/jpeg;base64,${ans["image"]}`;
    let encoded = Base64.btoa(imageURI);
    router.replace({
      pathname: "/infoScan",
      params: { imgSource: encoded, classes: JSON.stringify(ans["food"]) },
    });
  };

  const refreshPhoto = async () => {
    setImage(null);
  };
  const takePicture = async () => {
    if (!cameraRef) return;
    try {
      let opts = { quality: 0.35 };
      const photo = await cameraRef.current.takePictureAsync((options = opts));
      setImage(photo.uri);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    askForCameraPermissons();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32}></Ionicons>
        </Pressable>
        <Text style={[styles.Title3, styles.pageTitle]} title="test">
          {" "}
          Photo Scan
        </Text>
      </View>
      <View style={styles.imageContainer}>
        {image != null ? (
          <Image source={{ uri: image }} style={styles.camera} />
        ) : (
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={cameraRef}
          ></Camera>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {image == null ? (
          <Pressable style={styles.cameraButton} onPress={takePicture}>
            <Ionicons name="camera" size={50}></Ionicons>
          </Pressable>
        ) : (
          <View style={styles.yesNoContainer}>
            <Pressable
              style={[styles.cameraButton, styles.noButton]}
              onPress={refreshPhoto}
            >
              <Ionicons name="close-circle-outline" size={32}></Ionicons>
            </Pressable>
            <Pressable style={styles.cameraButton} onPress={sendPhotoToAnalyze}>
              <Ionicons name="checkmark-circle" size={32}></Ionicons>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  ...baseStyles,
  ...{
    camera: {
      flex: 0.9,
      borderRadius: 20,
    },
    buttonContainer: {
      flex: 1,
      width: "100%",
      alignContent: "center",
      alignItems: "center",
    },
    yesNoContainer: {
      flex: 1,
      flexDirection: "row",
      width: "75%",
      alignContent: "center",
      justifyContent: "space-evenly",
    },
    imageContainer: {
      flex: 3.5,
      width: "90%",
      height: "100%",
      elevation: 4,
    },
    blackBox: {
      flex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "black",
    },
    cameraButton: {
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 80,
      backgroundColor: "#9EE493",
      borderRadius: 100,
    },
    noButton: {
      backgroundColor: "#EB0202",
    },
  },
});

/** */
