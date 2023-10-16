import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputManual from '../app/inputManual'; // Asegúrate de importar tu componente

jest.mock('expo-router', () => {
  const useRouter = jest.fn();
  useRouter.mockReturnValue({
    back: jest.fn(), // Mock the back function
  });
  return {
    useRouter,
  };
});

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

jest.mock('../app/dataBase/databaseCalls', () => ({
    newDishesConsumed: jest.fn(),
  }));

  
describe('InputManual component', () => {
    let component;

  beforeEach(() => {
    component = render(<InputManual />);
  });
  it('renders and handles form input and submission', () => {
    render(<InputManual />);
  
    // Simula la entrada de datos en los campos de entrada
    const nombreInput = screen.getByPlaceholderText('Nombre del platillo');
    const caloriasInput = screen.getByPlaceholderText('Cantidad de calorías');
    fireEvent.changeText(nombreInput, 'Ejemplo de comida');
    fireEvent.changeText(caloriasInput, '100');
  
    // Verifica que los valores de los campos de entrada se establecen correctamente
    expect(nombreInput).toHaveProp('value', 'Ejemplo de comida');
    expect(caloriasInput).toHaveProp('value', '100');
  
    // Llama directamente a sendFood
    sendFood();
  
    // Verifica que la función newDishesConsumed se haya llamado con los valores correctos
    expect(databaseCalls.newDishesConsumed).toHaveBeenCalledWith('juan', ['Ejemplo de comida'], [100], expect.any(String));
  });
});

afterEach(() => {
    jest.clearAllMocks();
  });
  
  afterAll(() => {
    delete global.fetch;
  });