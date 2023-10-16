import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "../app/index";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

//mock status bar
jest.mock("expo-status-bar", () => "StatusBar");

jest.mock("expo-font", () => ({
  useFonts: jest.fn().mockReturnValue([true]), // Assuming fonts are loaded successfully
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

test("renders App correctly with test IDs", () => {
  render(<App />);

  // Check if specific elements are present with their test IDs
  expect(screen.getByTestId("app-component")).toBeTruthy();
  expect(screen.getByTestId("header-container")).toBeTruthy();
  expect(screen.getByTestId("report-button")).toBeTruthy();
  expect(screen.getByTestId("camera-button")).toBeTruthy();
  expect(screen.getByTestId("manual-input-button")).toBeTruthy();
  expect(screen.getByTestId("diary-button")).toBeTruthy();

  // Simulate button clicks and check if router.push is called correctly
  fireEvent.press(screen.getByTestId("report-button"));
  expect(useRouter().push).toHaveBeenCalledWith("/reporte");

  fireEvent.press(screen.getByTestId("camera-button"));
  expect(useRouter().push).toHaveBeenCalledWith("/camera");

  fireEvent.press(screen.getByTestId("manual-input-button"));
  expect(useRouter().push).toHaveBeenCalledWith("/inputManual");

  fireEvent.press(screen.getByTestId("diary-button"));
  expect(useRouter().push).toHaveBeenCalledWith("/meses_diarios");
});
