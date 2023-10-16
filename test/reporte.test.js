import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import Reporte from "../app/reporte"; // Adjust the import path based on your project structure
import * as database from "../app/dataBase/databaseCalls";

jest.mock("../app/dataBase/databaseCalls", () => ({
  getFoodOfADate: jest.fn(),
  getUserCalories: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-16" })),
}));

jest.fn().mockReturnValue([true, null]);

test("renders Reporte correctly", async () => {
  // Mock the database calls with sample data
  database.getFoodOfADate.mockResolvedValue({
    zapallo: 100,
    cebolla: 200,
  });
  database.getUserCalories.mockResolvedValue(2000);

  // Render the component
  render(<Reporte />);

  // Wait for async operations to complete
  await waitFor(() => {
    // Check if specific text and elements are rendered
    expect(screen.getByText("Alimentos:")).toBeTruthy();
    expect(screen.getByText(/zapallo: 100/)).toBeTruthy();
    expect(screen.getByText(/cebolla: 200/)).toBeTruthy();
    expect(screen.getByText("2023-10-16")).toBeTruthy(); // Replace this with the expected date format
  });

  // Check if the database calls were made with the correct arguments
  expect(database.getFoodOfADate).toHaveBeenCalledWith("juan", "2023_10_16");
  expect(database.getUserCalories).toHaveBeenCalledWith("juan");
});
