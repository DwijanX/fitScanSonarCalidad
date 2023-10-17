import { render,fireEvent} from '@testing-library/react-native';
import Home from '../app/home';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter:jest.fn().mockReturnValue ({
    push:jest.fn()
  },
  )
}));



jest.mock('expo-font', () => ({
  useFonts: jest.fn({}).mockReturnValue([true]),
  isLoaded:jest.fn().mockReturnValue(true)
}));


describe('App', () => {
  it('tests profile Button', async () => {
    
    const {getByTestId} = render(<Home />);
    const userButton = getByTestId('userBut');
    fireEvent.press(userButton);

    expect(useRouter().push).toHaveBeenCalledWith('/user');
  });
  it('tests daily report button', async () => {
    
    const {getByTestId} = render(<Home />);
    const Button = getByTestId('dailyReport');
    fireEvent.press(Button);

    expect(useRouter().push).toHaveBeenCalledWith('/reporte');
  });
  it('tests camera button', async () => {
    
    const {getByTestId} = render(<Home />);
    const Button = getByTestId('cameraButton');
    fireEvent.press(Button);

    expect(useRouter().push).toHaveBeenCalledWith('/camera');
  });
  it('tests manual input button', async () => {
    
    const {getByTestId} = render(<Home />);
    const Button = getByTestId('manualInput');
    fireEvent.press(Button);

    expect(useRouter().push).toHaveBeenCalledWith('/inputManual');
  });
  it('tests my diary button', async () => {
    
    const {getByTestId} = render(<Home />);
    const Button = getByTestId('myDiary');
    fireEvent.press(Button);

    expect(useRouter().push).toHaveBeenCalledWith('/meses_diarios');
  });
});
