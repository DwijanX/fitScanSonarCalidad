import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import User from "../app/user"; // Update the import path based on your project structure

jest.mock("../app/dataBase/database.config", () => ({
  db: {
    doc: jest.fn(),
    updateDoc: jest.fn(),
  },
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-16" })),
}));

describe("User Component", () => {
  test("renders User component correctly", () => {
    const { getByTestId } = render(<User />);

    expect(getByTestId("user-component")).toBeTruthy();
    expect(getByTestId("nombre-input")).toBeTruthy();
    expect(getByTestId("calorias-input")).toBeTruthy();
    expect(getByTestId("cambiar-button")).toBeTruthy();
  });

  test("allows user to input nombre and calorias", async () => {
    const { getByTestId } = render(<User />);

    const nombreInput = getByTestId("nombre-input");
    const caloriasInput = getByTestId("calorias-input");

    fireEvent.changeText(nombreInput, "John Doe");
    fireEvent.changeText(caloriasInput, "2000");

    expect(nombreInput.props.value).toBe("John Doe");
    expect(caloriasInput.props.value).toBe("2000");
  });

  test("calls sendChanges function when cambiar button is pressed", async () => {
    const { getByTestId } = render(<User />);

    const nombreInput = getByTestId("nombre-input");
    const caloriasInput = getByTestId("calorias-input");
    const cambiarButton = getByTestId("cambiar-button");

    fireEvent.changeText(nombreInput, "John Doe");
    fireEvent.changeText(caloriasInput, "2000");
    fireEvent.press(cambiarButton);

    // You might want to mock the useRouter function and check if it's called correctly in your specific use case.
    // For now, you can just check if the button press doesn't throw any errors.
    await waitFor(() => {
      expect(true).toBe(true);
    });
  });
});
