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
    const { getByText,getByTestId } = component;
    expect(getByText('October')).toBeTruthy();
    expect(Calendar).toHaveBeenCalledWith(
      expect.objectContaining({
        current: '2023-10-08',
        onDayPress: expect.any(Function),
      }),
      {}
    );

    const calendarElement = getByTestId('dateTest');

    fireEvent.press(calendarElement);

    expect(useRouter().replace).toHaveBeenCalledWith({
      pathname: '/dateScreen',
      params: { date: '2023-10-08' },
    });
  });
  


});
