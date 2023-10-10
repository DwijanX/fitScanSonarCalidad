import { render, fireEvent } from '@testing-library/react-native';
import CalendarScreen from '../app/calendarScreen';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
// Define your custom Calendar component
const CustomCalendar = ({ current, onDayPress }) => {
  return (
    <div onPress={()=>onDayPress({dateString:current})} testID="dateTest">
      {current}
    </div>
  );
};

// Mock the entire react-native-calendars module
jest.mock('react-native-calendars', () => ({
  Calendar: jest.fn(({ current, onDayPress }) => {
    return <CustomCalendar current={current} onDayPress={onDayPress} />;
  }),
}));

// Mock the entire expo-router module and its functions
jest.mock('expo-router', () => {
  const useRouter = jest.fn();
  const useSearchParams = jest.fn(() => ({ month: 'October', date: '2023-10-08' }));
  useRouter.mockReturnValue({
    replace: jest.fn(), // Mock the replace function
  });
  return {
    useRouter,
    useSearchParams,
  };
});

jest.mock('@expo/vector-icons/Ionicons', () => 'Ionicons');

describe('CalendarScreen', () => {
  let component;

  beforeEach(() => {
    component = render(<CalendarScreen />);
  });

  it('renders the month "October" correctly', () => {
    const { getByText } = component;
    expect(getByText('October')).toBeTruthy();
    expect(Calendar).toHaveBeenCalledWith(
      expect.objectContaining({
        current: '2023-10-08',
        onDayPress: expect.any(Function),
      }),
      {}
    );
  });
  it('triggers the onDayPress function correctly', () => {
    const { getByTestId } = component;
    // Find the Calendar component by its test ID
    const calendarElement = getByTestId('dateTest');

    // Simulate a button press on the Calendar component
    fireEvent.press(calendarElement);

    // Assert that the replace function is called with the expected parameters
    expect(useRouter().replace).toHaveBeenCalledWith({
      pathname: '/dateScreen',
      params: { date: '2023-10-08' },
    });
  });


});
