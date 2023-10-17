import React from "react";
import {
  render,
  waitFor,
  screen,
  fireEvent,
} from "@testing-library/react-native";
import DateScreen from "../app/dateScreen"; // Adjust the import path based on your project structure
import * as database from "../app/dataBase/databaseCalls";
import { useRouter, useSearchParams } from "expo-router";

jest.mock("../app/dataBase/databaseCalls", () => ({
  getFoodOfADate: jest.fn(),
  getUserCalories: jest.fn(),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-08" })),
}));

test("renders DateScreen with valid date and calories", async () => {
  // Mock the database calls with sample data
  database.getFoodOfADate.mockResolvedValue({
    zapallo: 100,
    cebolla: 200,
  });
  database.getUserCalories.mockResolvedValue(2000);

  // Render the component
  render(<DateScreen />);

  // Wait for async operations to complete
  await waitFor(() => {
    // Check if specific text and elements are rendered
    expect(screen.getByText(/zapallo: 100/)).toBeTruthy();
    expect(screen.getByText(/cebolla: 200/)).toBeTruthy();
    expect(screen.getByText("2023-10-08")).toBeTruthy(); // Replace this with the expected date format
    expect(screen.getByText("no Cumpliste Dieta")).toBeTruthy();
  });

  // Check if the database calls were made with the correct arguments
  expect(database.getFoodOfADate).toHaveBeenCalledWith("juan", "2023_10_08");
  expect(database.getUserCalories).toHaveBeenCalledWith("juan");
});

test("renders DateScreen with valid date and 0 calories", async () => {
  // Mock the database calls with 0 calories
  database.getFoodOfADate.mockResolvedValue({});
  database.getUserCalories.mockResolvedValue(2000);

  // Render the component
  render(<DateScreen />);

  // Wait for async operations to complete
  await waitFor(() => {
    // Check if specific text and elements are rendered
    expect(screen.getByText("no hay datos hoy")).toBeTruthy();
  });

  // Check if the database calls were made with the correct arguments
  expect(database.getFoodOfADate).toHaveBeenCalledWith("juan", "2023_10_08");
  expect(database.getUserCalories).toHaveBeenCalledWith("juan");
});

test("renders DateScreen with invalid date", async () => {
  // Mock the database calls with invalid date
  useSearchParams.mockReturnValue({ date: undefined });

  // Render the component
  render(<DateScreen />);

  // Wait for async operations to complete
  await waitFor(() => {
    // Check if specific text and elements are rendered
    expect(screen.getByText("no hay datos hoy")).toBeTruthy();
  });
});
