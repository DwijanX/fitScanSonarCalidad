// Import necessary dependencies from React Native
import { Pressable, TextInput } from "react-native";

// Mock TextInput component
jest.mock(
  "react-native/Libraries/Components/TextInput/TextInput",
  () => "TextInput"
);

// Mock Pressable component
jest.mock("react-native/Libraries/Components/Pressable/Pressable", () => {
  const RealPressable = jest.requireActual(
    "react-native/Libraries/Components/Pressable/Pressable"
  );
  const MockPressable = jest.fn((props) => {
    return RealPressable(props, false);
  });
  return MockPressable;
});

// Now you can import and use Pressable and TextInput in your tests as usual

import { render, screen, fireEvent } from "@testing-library/react-native";
import InputManual from "../app/inputManual";
import * as database from "../app/dataBase/databaseCalls";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

jest.mock("../app/dataBase/databaseCalls", () => ({
  newDishesConsumed: jest.fn(),
}));

describe("InputManual component", () => {
  it("renders and handles form input and submission", () => {
    render(<InputManual />);

    // Simulate input changes
    const nombreInput = screen.getByPlaceholderText("Nombre del platillo");
    const caloriasInput = screen.getByPlaceholderText("Cantidad de calorías");
    fireEvent.changeText(nombreInput, "Ejemplo de comida");
    fireEvent.changeText(caloriasInput, "100");

    // Verify input values
    expect(nombreInput.props.value).toBe("Ejemplo de comida");
    expect(caloriasInput.props.value).toBe("100");

    // Call the submit function
    fireEvent.press(screen.getByText("Añadir"));

    // Verify if the database function was called with the correct arguments
    expect(database.newDishesConsumed).toHaveBeenCalledWith(
      "juan",
      ["Ejemplo de comida"],
      [100],
      expect.any(String)
    );
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
