import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MesesDiario from "../app/meses_diarios";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("MesesDiario component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<MesesDiario />);
    expect(getByText("Mi diario")).toBeTruthy();
  });

  it("navigates to the correct month when button is pressed", () => {
    const mockRouter = { replace: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByText } = render(<MesesDiario />);

    fireEvent.press(getByText("Abril"));
    expect(mockRouter.replace).toHaveBeenCalledWith({
      pathname: "/calendarScreen",
      params: { month: "abril", date: "2023-04-01" },
    });
  });

  it("navigates to March when March button is pressed", () => {
    const { getByText } = render(<MesesDiario />);
    const marchButton = getByText("Marzo");
    fireEvent.press(marchButton);
    // Add your assertion here, for example, you could check if the router navigates to March.
  });

  it("navigates to February when February button is pressed", () => {
    const { getByText } = render(<MesesDiario />);
    const februaryButton = getByText("Febrero");
    fireEvent.press(februaryButton);
    // Add your assertion here, for example, you could check if the router navigates to February.
  });

  it("navigates to January when January button is pressed", () => {
    const { getByText } = render(<MesesDiario />);
    const januaryButton = getByText("Enero");
    fireEvent.press(januaryButton);
    // Add your assertion here, for example, you could check if the router navigates to January.
  });

  it("navigates back when back button is pressed", () => {
    const mockRouter = { back: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    const { getByTestId } = render(<MesesDiario />);
    const backButton = getByTestId("back-button");

    fireEvent.press(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
