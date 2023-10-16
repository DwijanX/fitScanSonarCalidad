import { render, fireEvent, waitFor } from "@testing-library/react-native";
import DateScreen from "../app/dateScreen";
import * as database from "../app/dataBase/databaseCalls"; // Import the actual module for mocking

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
  useSearchParams: jest.fn(() => ({ date: "2023-10-16" })),
}));

jest.mock("../app/dataBase/databaseCalls", () => ({
  getFoodOfADate: jest.fn(() =>
    Promise.resolve({
      /* mock food data */
    })
  ),
  getUserCalories: jest.fn(() => Promise.resolve({ juan: 2000 })),
}));

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

test("renders DateScreen correctly", async () => {
  // Mock the functions with expected return values
  database.getFoodOfADate.mockResolvedValue({
    /* mock food data */
  });
  database.getUserCalories.mockResolvedValue({ juan: 2000 });

  // Render the component
  const { getByText, getByTestId } = render(<DateScreen />);

  // Wait for async operations to complete
  await waitFor(() => {
    expect(getByText("Alimentos:")).toBeTruthy(); // Check if specific text is rendered
    expect(getByTestId("back-button")).toBeTruthy(); // Assuming there's a back button with this testID
  });

  // Perform interaction (press back button)
  fireEvent.press(getByTestId("back-button"));
});
