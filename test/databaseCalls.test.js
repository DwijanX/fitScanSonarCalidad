import { saveCaloriesForUser,getUserCalories,getCalories,getFoodOfADate,newDishesConsumed } from '../app/dataBase/databaseCalls';
import { db } from '../app/dataBase/database';
import * as firestore from "firebase/firestore"; 


jest.mock('../app/dataBase/database', () => ({
    db: {
      doc: jest.fn(),
      updateDoc: jest.fn(),
    },
  }));
jest.mock('firebase/firestore', () => ({
    doc: jest.fn(),
    updateDoc:jest.fn(),
    getDoc:jest.fn(),
    setDoc:jest.fn()
}));
  
describe('saveCaloriesForUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should update user daily calories and store in userMaxCalories', async () => {
    const username = 'testUser';
    const newCalories = 200;
    const docRef="docref"
    firestore.doc.mockReturnValue(docRef);

    await saveCaloriesForUser(username, newCalories);

    expect(firestore.doc).toHaveBeenCalledWith(db, 'User', username);
    expect(firestore.updateDoc).toHaveBeenCalledWith(docRef,{"dailyCalories": newCalories});
  });

});

describe('getUserCalories', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return userMaxCalories when available', async () => {
      const username = 'testUser';
      const userMaxCalories = { [username]: 200 };
  
      const result = await getUserCalories(username, userMaxCalories);
  
      expect(result).toEqual(userMaxCalories[username]);
    });
  
    it('should fetch user daily calories from Firestore and store in userMaxCalories', async () => {
      const username = 'testUser';
      const dailyCalories = 200;
      const docRef = "docref";
  
      firestore.doc.mockReturnValue(docRef);
      firestore.getDoc.mockResolvedValue({
        exists:()=> true,
        data: () => ({ "dailyCalories":dailyCalories}),
      });
  
      const userMaxCalories = {};
  
      const result = await getUserCalories(username, userMaxCalories);
  
      expect(result).toEqual(dailyCalories);
      expect(userMaxCalories[username]).toEqual(dailyCalories);
    });
  
    it('should handle user not found in Firestore', async () => {
        const username = 'nonExistentUser';
        const docRef = "docref";
    
        firestore.doc.mockReturnValue(docRef);
        firestore.getDoc.mockResolvedValue({
            exists:()=> false,
          });
        const userMaxCalories = {};
    
        const result = await getUserCalories(username, userMaxCalories);
    
        expect(result).toEqual(undefined);
      });
  });
  describe('getCalories', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should fetch and return food data for ingredients', async () => {
      const ingredients = ['ingredient1', 'ingredient2',"ingredient1"];
  
      const mockData = {
        'ingredient1': { nombre: 'Food 1', calories: 100 },
        'ingredient2': { nombre: 'Food 2', calories: 200 },
      };
      firestore.doc.mockImplementation((db,collName,Ingredient)=>{return {"id":Ingredient}})
      firestore.getDoc.mockImplementation((docRef) => ({
        exists: ()=>true,
        data: () => mockData[docRef.id],
      }));
  
      const result = await getCalories(ingredients);
  
      expect(result).toEqual([
        { nombre: 'Food 1', calorias: 100 },
        { nombre: 'Food 1', calorias: 100 },
        { nombre: 'Food 2', calorias: 200 },
      ]);
    });
  
    it('should handle ingredients with no matching documents', async () => {
      const ingredients = ['nonExistentIngredient'];
  
      firestore.getDoc.mockImplementation(() => ({
        exists: ()=>false,
      }));
  
      const result = await getCalories(ingredients);
  
      expect(result).toEqual([]);
    });
    it('should handle empty ingredients array', async () => {
      const ingredients = [];
      const result = await getCalories(ingredients);
  
      expect(result).toEqual([]);
    });
  });
  describe('getFoodOfADate', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should fetch and return data for an existing date', async () => {
      const username = 'testUser';
      const date = '2023-10-14';
  
      const mockData = { someData: 'data for the date' };
  
      const dateRef = firestore.doc(db, `User/${username}/Days`, date);
      firestore.getDoc.mockResolvedValue({
        exists: ()=>true,
        data: () => mockData,
      });
  
      const result = await getFoodOfADate(username, date);
  
      expect(result).toEqual(mockData);
    });
  
    it('should handle date not found in Firestore', async () => {
      const username = 'testUser';
      const date = 'nonExistentDate';
  
      const dateRef = firestore.doc(db, `User/${username}/Days`, date);
      firestore.getDoc.mockResolvedValue({
        exists: ()=>false,
      });
  
      const result = await getFoodOfADate(username, date);
  
      expect(result).toEqual([]);
    });
  });
  describe('newDishesConsumed', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should update a document with new dishes and calories', async () => {
      const username = 'testUser';
      const date = '2023-10-14';
      const dishes = ['dish1', 'dish2'];
      const calories = [100, 200];
  
      const dateRef = firestore.doc(db, `User/${username}/Days`, date);
  
      const expectedData = {
        dish1: 100,
        dish2: 200,
      };
  
      await newDishesConsumed(username, dishes, calories, date);
  
      expect(firestore.setDoc).toHaveBeenCalledWith(dateRef, expectedData, { merge: true });
    });
    it('should handle non existent dishes array', async () => {
      const username = 'testUser';
      const date = '2023-10-14';
      const dishes = [];
      const calories = [];
  
      const dateRef = firestore.doc(db, `User/${username}/Days`, date);
  
      const expectedData = {
        
      };
  
      await newDishesConsumed(username, dishes, calories, date);
  
      expect(firestore.setDoc).toHaveBeenCalledWith(dateRef, expectedData, { merge: true });
    });
  });