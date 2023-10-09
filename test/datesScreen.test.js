import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DateScreen from "../app/dateScreen";

// Mock any dependencies or hooks used in the component
jest.mock("../app/dataBase/databaseCalls", () => ({
  getFoodOfADate: jest.fn(() =>
    Promise.resolve({
      /* mock food data */
    })
  ),
  getUserCalories: jest.fn(() => Promise.resolve({ juan: 2000 })),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-08" })),
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

test("renders DateScreen correctly", async () => {
  // Render the component
  const { getByText, getByTestId } = render(<DateScreen />);

  // Wait for async operations to complete
  await waitFor(() => {
    expect(getByText("zapallo")).toBeTruthy(); // Check if specific text is rendered
    expect(getByTestId("back-button")).toBeTruthy(); // Assuming there's a back button with this testID
  });

  // Perform interaction (press back button)
  fireEvent.press(getByTestId("back-button"));

  // Check if the interaction results in the expected behavior (for example, router.back() is called)
  expect(useRouter().back).toHaveBeenCalled();
});
