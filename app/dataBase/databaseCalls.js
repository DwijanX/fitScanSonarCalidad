import  {db} from "./database"
import * as firestore from "firebase/firestore"; 
import data from './csvjson.json';

let userMaxCalories = {}

export async function saveCaloriesForUser(username,calories)
{
    const userRef = firestore.doc(db, "User",username);
    if (Object.keys(userMaxCalories).includes(username))
      {
        userMaxCalories[username] = calories;
      }
    await firestore.updateDoc(userRef, {
        dailyCalories: calories
      });
}

export async function getUserCalories(username)
{

    const userRef = firestore.doc(db, "User",username);
    if (Object.keys(userMaxCalories).includes(username))
      {
        return userMaxCalories
      }
    const docSnap = await firestore.getDoc(userRef);
    console.log(docSnap)
    if (docSnap.exists()) {
      if (Object.keys(userMaxCalories).includes(username)=== false)
      {
        userMaxCalories[username] = docSnap.data()["dailyCalories"];
      }
        return userMaxCalories[username];
      } else {
        return []
      }

}

export async function getCalories(ingredients)
{
    const counts = {};
    for (const num of ingredients) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let uniqueIngredients=Object.keys(counts)
    let answerList=[]
    for (let i=0;i<uniqueIngredients.length;i++) {
        const docRef = firestore.doc(db, "Food", uniqueIngredients[i]);
        const docSnap = await firestore.getDoc(docRef);
        
        if (docSnap.exists()) {
            let foodData={ nombre: docSnap.data()["nombre"], calorias: docSnap.data()["calories"] }
            for(let times=0;times<counts[uniqueIngredients[i]];times++)
            {
                answerList.push(foodData)
            }
          } else {
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
    console.log(docSnap)
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
    objToSave={}
    for(let i=0;i<dishes.length;i++)
    {
      objToSave[dishes[i]]=calories[i]
    }
    await firestore.updateDoc(dateRef, objToSave);
}

async function loadIngredient(ingredient,calories)
{
    await firestore.setDoc(firestore.doc(db, "Food", ingredient), 
    {
        "nombre":ingredient,
        "calories":calories
    });
}
