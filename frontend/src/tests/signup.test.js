import { render, screen } from '@testing-library/react';
import Signup from '../components/signup/Signup';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from '../store/store'

test('renders Sign up', () => {
  render(
    <Provider store={Store}>
      <Router login={Signup}>
        <Signup />
      </Router>
  </Provider>);
  const linkElement1 = screen.getByText(/INTRODUCE YOURSELF/);
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Sign me up!/);
  expect(linkElement2).toBeInTheDocument();
});