import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputManual from "../app/inputManual"; // Adjust the import path based on your project structure
import * as database from "../app/dataBase/databaseCalls";
import { useNavigation } from "@react-navigation/native";
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-17" })),
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../app/dataBase/databaseCalls", () => ({
  newDishesConsumed: jest.fn(),
}));

test("sendFood function calls database.newDishesConsumed and router.back() with correct arguments", () => {
  const mockBack = jest.fn();
  useNavigation.mockReturnValue({
    back: mockBack,
  });

  const { getByTestId } = render(<InputManual />);
  const nombreInput = getByTestId("nombre-input"); // Assuming you set a testID on the input field for dish name
  const caloriasInput = getByTestId("calorias-input"); // Assuming you set a testID on the input field for calories
  const sendButton = getByTestId("send-button"); // Assuming you set a testID on the button

  // Set input values
  fireEvent.changeText(nombreInput, "Zapallo");
  fireEvent.changeText(caloriasInput, "100");

  // Trigger sendFood function
  fireEvent.press(sendButton);

  // Check if database.newDishesConsumed and router.back() were called with correct arguments
  expect(database.newDishesConsumed).toHaveBeenCalledWith(
    "juan",
    ["Zapallo"],
    [100],
    "2023_10_17"
  );
});
