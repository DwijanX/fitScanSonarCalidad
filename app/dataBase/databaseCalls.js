import  {db} from "./database"
import * as firestore from "firebase/firestore"; 

let UserMaxCalories = {}

export async function saveCaloriesForUser(username,calories)
{
    const userRef = firestore.doc(db, "User",username);
    UserMaxCalories[username] = calories;
    await firestore.updateDoc(userRef, {
        dailyCalories: calories
      });
}

export async function getUserCalories(username,userMaxCalories=UserMaxCalories)
{
    if (Object.keys(userMaxCalories).includes(username))
    {
      return userMaxCalories[username]
    }
    const userRef = firestore.doc(db, "User",username);
    const docSnap = await firestore.getDoc(userRef);
    console.log(docSnap)
    if (docSnap.exists()) {
        userMaxCalories[username] = docSnap.data()["dailyCalories"];
        return userMaxCalories[username];
      } else {
        return undefined
      }
}

export async function getCalories(ingredients)
{
    const counts = ingredients.reduce((acc, ingredient) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
      return acc;
    }, {});
    let uniqueIngredients=Object.keys(counts)
    let answerList=[]
    for (const uniqueIngredient of uniqueIngredients) {
      const docRef = firestore.doc(db, "Food", uniqueIngredient);
      const docSnap = await firestore.getDoc(docRef);
      if (docSnap.exists()) {
        let foodData={ nombre: docSnap.data()["nombre"], calorias: docSnap.data()["calories"] }
        const times = counts[uniqueIngredient];
        Array.from({ length: times }, () => answerList.push(foodData));
        
      } 
      else {
          console.log("No such document!");
      }
    }
    return answerList
}

export async function getFoodOfADate(username,date)
{
    let collection='User/'+username+'/Days'
    const dateRef = firestore.doc(db, collection,date);
    const docSnap = await firestore.getDoc(dateRef);
    if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return []
      }
}

export async function newDishesConsumed(username,dishes,calories,date)
{
    let collection='User/'+username+'/Days'
    const dateRef = firestore.doc(db, collection,date);
    let objToSave={}

    dishes.forEach((dish, index) => {
      objToSave[dish] = calories[index];
    });
    await firestore.setDoc(dateRef, objToSave, {merge:true});
}
