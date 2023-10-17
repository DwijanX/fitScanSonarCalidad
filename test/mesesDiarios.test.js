import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MesesDiario from "../app/meses_diarios";
import { useRouter } from "expo-router";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("MesesDiario component", () => {
  let component;
  let mockRouter;

  beforeEach(() => {
    mockRouter = { replace: jest.fn(), back: jest.fn() };
    useRouter.mockReturnValue(mockRouter);

    component = render(<MesesDiario />);
  });

  it("renders correctly", () => {
    const { getByText } = component;
    expect(getByText("Mi diario")).toBeTruthy();
  });

  it("navigates to the correct month when button is pressed", () => {
    const { getByText } = component;
    
    const months = [
      { button: "Enero", month: "enero", date: "2023-01-01" },
      { button: "Febrero", month: "febrero", date: "2023-02-01" },
      { button: "Marzo", month: "marzo", date: "2023-03-01" },
      { button: "Abril", month: "abril", date: "2023-04-01" },
      { button: "Mayo", month: "mayo", date: "2023-05-01" },
      { button: "Junio", month: "junio", date: "2023-06-01" },
      { button: "Julio", month: "julio", date: "2023-07-01" },
      { button: "Agosto", month: "agosto", date: "2023-08-01" },
      { button: "Septiembre", month: "septiembre", date: "2023-09-01" },
      { button: "Octubre", month: "octubre", date: "2023-10-01" },
      { button: "Noviembre", month: "noviembre", date: "2023-11-01" },
      { button: "Diciembre", month: "diciembre", date: "2023-12-01" },
    ];

    months.forEach(({ button, month, date }) => {
      fireEvent.press(getByText(button));
      expect(mockRouter.replace).toHaveBeenCalledWith({
        pathname: "/calendarScreen",
        params: { month, date },
      });
      mockRouter.replace.mockClear();
    });
  });

  it("navigates back when back button is pressed", () => {
    const { getByTestId } = component;
    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);
    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
