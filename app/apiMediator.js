import * as database from './dataBase/databaseCalls'
let api="https://053e-181-177-170-131.ngrok-free.app/identifyPhoto"

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
      let obj=JSON.parse(data)
      return obj
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

async function processPhoto(uri){
  let apiAnswer=await analizePhotoUsingApi(uri)
  let food=apiAnswer["objects"]
  let foodWithCalories=await database.getCalories(food)
  return {"image":apiAnswer["image"],"food":foodWithCalories}
}
export default processPhoto