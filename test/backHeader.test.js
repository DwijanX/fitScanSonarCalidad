import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BackHeader from "../app/components/BackHeader";
import { useRouter } from "expo-router";

// Mock useRouter to provide a mock implementation of router.back()
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

test("Pressable in BackHeader calls router.back() on press", () => {
  const mockBack = jest.fn();
  useRouter.mockReturnValue({ back: mockBack });

  const { getByTestId } = render(<BackHeader pageTitle="Test Page" />);

  const pressableButton = getByTestId("back-button");
  fireEvent.press(pressableButton);

  expect(mockBack).toHaveBeenCalled();
});
