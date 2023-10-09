import { render, fireEvent } from '@testing-library/react-native';
import CalendarScreen from '../app/calendarScreen';
import { Calendar } from 'react-native-calendars';

// Define your custom Calendar component
const CustomCalendar = ({ current, onDayPress }) => {
  return (
    <p onPress={() => onDayPress({ dateString: '2023-10-08' })} testID="dateTest">
      {current}
    </p>
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
  const replace = jest.fn(); // Mock the replace function
  return {
    useRouter,
    useSearchParams,
    replace,
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


});
