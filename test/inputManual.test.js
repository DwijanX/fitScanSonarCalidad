import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputManual from '../app/inputManual'; // Asegúrate de importar tu componente

// Mock the entire expo-router module
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

describe('InputManual component', () => {
    let component;

  beforeEach(() => {
    component = render(<InputManual />);
  });
  it('renders and handles form input and submission', () => {

    // Simula la entrada de datos en los campos de entrada
    const nombreInput = screen.getByPlaceholderText('Nombre del platillo');
    const caloriasInput = screen.getByPlaceholderText('Cantidad de calorías');
    fireEvent.changeText(nombreInput, 'Ejemplo de comida');
    fireEvent.changeText(caloriasInput, '100');

    // Verifica que los valores de los campos de entrada se establecen correctamente
    expect(nombreInput).toHaveProp('value', 'Ejemplo de comida');
    expect(caloriasInput).toHaveProp('value', '100');

    // Simula el envío del formulario
    const addButton = screen.getByText('Añadir');
    fireEvent.press(addButton);

    // Realiza las aserciones necesarias para verificar el comportamiento esperado
    // Por ejemplo, puedes verificar si `sendFood` se llama con los valores correctos.
    
    // Ejemplo de aserción si `sendFood` es un método jest.fn():
    // expect(sendFood).toHaveBeenCalledWith();

    // También puedes verificar si el useRouter().back() se llama correctamente si lo mockeas.
    expect(useRouter().back).toHaveBeenCalled();
  });
});