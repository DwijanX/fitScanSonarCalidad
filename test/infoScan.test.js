import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InfoScan from "../app/infoScan";
import * as database from "../app/dataBase/databaseCalls";

const mockUseRouter = {
  back: jest.fn(),
};

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => mockUseRouter),
  useSearchParams: jest.fn(() => ({
    imgSource: "base64image",
    classes:
      '[{"nombre": "zapallo", "calorias": 100}, {"nombre": "cebolla", "calorias": 200}]',
  })),
}));

jest.mock("Base64", () => ({
  atob: jest.fn(() => "base64image"),
}));

jest.mock("../app/dataBase/databaseCalls", () => ({
  newDishesConsumed: jest.fn(),
}));

describe("InfoScan component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders correctly", () => {
    const { getByText } = render(<InfoScan />);
    expect(getByText("Photo Scan")).toBeTruthy();
  });

  it("calls sendFood function when Add button is pressed", () => {
    const { getByText } = render(<InfoScan />);
    fireEvent.press(getByText("Añadir"));
    expect(database.newDishesConsumed).toHaveBeenCalledWith(
      "juan",
      ["zapallo", "cebolla"],
      [100, 200],
      expect.any(String)
    );
    expect(mockUseRouter.back).toHaveBeenCalled(); // Verify that router.back() is called
  });

  it("displays image correctly", () => {
    const { getByTestId } = render(<InfoScan />);
    const image = getByTestId("info-scan-image");
    expect(image.props.source.uri).toBe("base64image");
  });

  // Add more test cases as needed for other functionality in InfoScan component
});
