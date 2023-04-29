import * as FileSystem from "expo-file-system";
import { Buffer } from 'buffer';

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
async function sendPhotoToAnalyze(uri) {
    // Create a new FormData object
    const formData = new FormData();
    let ansObj
    // Append the file to the form data
    formData.append('file', { uri, name: 'file.jpg', type: 'image/jpeg' });
  
    try {
      const response = await fetch('https://0ad3-181-177-170-131.ngrok-free.app/identifyPhoto', {
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

export default sendPhotoToAnalyze