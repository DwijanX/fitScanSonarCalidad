import { render } from '@testing-library/react-native';
import App from '../app/index';

describe('App', () => {
  it('renders the App component', () => {
    const component= render(<App />);
    expect(component).toBeTruthy();
  });
});
