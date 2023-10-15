import { json } from 'stream/consumers';
import processPhoto from '../app/apiMediator'; // Import the function you want to test

// Mock the database module
jest.mock('../app/dataBase/databaseCalls', () => ({
  getCalories: jest.fn(),
}));

describe('processPhoto', () => {
    
  it('should process a photo and return the expected result', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(JSON.stringify({
            image: 'base64_image_data',
            objects: ['ingredient1', 'ingredient2'],
            })),
        })
        );
    const expectedCalories = [
      { nombre: 'ingredient1', calorias: 100 },
      { nombre: 'ingredient2', calorias: 200 },
    ];
    require("../app/dataBase/databaseCalls").getCalories.mockResolvedValue(expectedCalories);

    const uri = 'example.jpg';
    const result = await processPhoto(uri);

    const expected = {
      image: 'base64_image_data',
      food: expectedCalories,
    };
    expect(result).toEqual(expected);
  });

  it('should handle API request error and log an error message', async () => {
    const uri = 'example.jpg';
    global.fetch = jest.fn(() =>
        Promise.reject('API request failed')
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await processPhoto(uri);

    } catch (error) {
      // Ensure that the error message is logged
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error uploading file:', 'API request failed');
    }

    // Clean up the console error spy
    consoleErrorSpy.mockRestore();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  delete global.fetch;
});
