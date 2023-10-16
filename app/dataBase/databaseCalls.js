import  {db} from "./database"
import * as firestore from "firebase/firestore"; 

let UserMaxCalories = {}

export async function saveCaloriesForUser(username,calories,userMaxCalories=UserMaxCalories)
{
    const userRef = firestore.doc(db, "User",username);
    userMaxCalories[username] = calories;
    await firestore.updateDoc(userRef, {
        dailyCalories: calories
      });
}

export async function getUserCalories(username,userMaxCalories=UserMaxCalories)
{
    const userRef = firestore.doc(db, "User",username);
    if (Object.keys(userMaxCalories).includes(username))
    {
      return userMaxCalories[username]
    }
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
    const counts = {};
    for (const num of ingredients) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let uniqueIngredients=Object.keys(counts)
    let answerList=[]
    for (const uniqueIngredient of uniqueIngredients) {
      const docRef = firestore.doc(db, "Food", uniqueIngredient);
        const docSnap = await firestore.getDoc(docRef);

        if (docSnap.exists()) {
            let foodData={ nombre: docSnap.data()["nombre"], calorias: docSnap.data()["calories"] }
            for(let times=0;times<counts[uniqueIngredient];times++)
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
    let objToSave={}

    for(let i=0;i<dishes.length;i++)
    {
      objToSave[dishes[i]]=calories[i]
    }
    await firestore.setDoc(dateRef, objToSave, {merge:true});
}
