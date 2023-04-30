import * as FileSystem from "expo-file-system";
import { Buffer } from 'buffer';
import * as database from './dataBase/databaseCalls'
api="https://f6a1-181-177-170-131.ngrok-free.app/identifyPhoto"

function decodeImage(encodedImage) {
    const decodedImage = Buffer.from(encodedImage, 'base64');
    const blob = new Blob([decodedImage], { type: 'image/jpeg' });
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
async function analizePhotoUsingApi(uri) {
    const formData = new FormData();
    formData.append('file', { uri, name: 'file.jpg', type: 'image/jpeg' });
  
    try {
      const response = await fetch(api, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = await response.json();
      obj=JSON.parse(data)
      let imageSource = `data:image/jpeg;base64,${obj["image"]}`;
      obj["srcimg"]=imageSource
      return obj
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

async function processPhoto(uri){
  apiAnswer=await analizePhotoUsingApi(uri)
  food=apiAnswer["objects"]
  foodWithCalories=await database.getCalories(food)
  return {"image":apiAnswer["image"],"food":foodWithCalories}
}
export default processPhoto