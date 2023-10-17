import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import App from "../app/index";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

describe("App component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<App />);
    // your expect statements
  });

  it("navigates to the correct route when Reporte Diario button is pressed", () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId("report-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/reporte");
  });

  it("navigates to the correct route when Foto Scan button is pressed", () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId("camera-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/camera");
  });

  it("navigates to the correct route when Input Manual button is pressed", () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId("manual-input-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/inputManual");
  });

  it("navigates to the correct route when Mi Diario button is pressed", () => {
    const mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId("diary-button"));

    expect(mockRouter.push).toHaveBeenCalledWith("/meses_diarios");
  });
});
