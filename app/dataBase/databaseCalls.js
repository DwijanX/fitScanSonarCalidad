import  {db} from "./database"
import * as firestore from "firebase/firestore"; 
import data from './csvjson.json';



export async function saveCaloriesForUser(username,calories)
{
    const userRef = firestore.doc(db, "User",username);
    await firestore.updateDoc(userRef, {
        dailyCalories: calories
      });
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
    if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
}
function fdsdf(username,ingredient,calories,date)
{

}

async function loadIngredient(ingredient,calories)
{
    await firestore.setDoc(firestore.doc(db, "Food", ingredient), 
    {
        "nombre":ingredient,
        "calories":calories
    });
}
