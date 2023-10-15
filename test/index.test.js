import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "../app/index";

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("expo-font", () => ({
  useFonts: jest.fn(() => [true]),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

test("renders App correctly", async () => {
  // Render the component
  render(<App />);

  // Wait for async operations to complete
  // SplashScreen.hideAsync is called after fonts are loaded
  await waitFor(() => {
    expect(screen.getByText("FitScan")).toBeTruthy(); // Check if the app title is rendered
    expect(screen.getByTestId("report-button")).toBeTruthy(); // Assuming there's a button with this testID
  });

  // Perform interaction (press report button)
  fireEvent.press(screen.getByTestId("report-button"));

  // Check if the interaction results in the expected behavior (for example, router.push() is called)
  expect(useRouter().push).toHaveBeenCalledWith("/reporte");
});
