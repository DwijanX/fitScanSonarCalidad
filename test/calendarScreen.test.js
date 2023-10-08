import { render, screen, fireEvent } from '@testing-library/react-native';
import CalendarScreen from '../app/calendarScreen';
import { Calendar } from 'react-native-calendars';

// Mock the entire expo-router module and its functions
jest.mock('expo-router', () => {
  const useRouter = jest.fn();
  const useSearchParams = jest.fn(() => ({ month: 'October', date: '2023-10-08' }));
  return {
    useRouter,
    useSearchParams,
  };
});
jest.mock('react-native-calendars', () => {
  return {
    Calendar: jest.fn().mockReturnValue(null), // Replace with your mock implementation
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
  });

  it('renders the Calendar component with the correct props', () => {
    const { getByText } = component;
    expect(Calendar).toHaveBeenCalledWith(
      expect.objectContaining({
        current: '2023-10-08',
        onDayPress: expect.any(Function),
      }),
      {}
    );
  });
});

