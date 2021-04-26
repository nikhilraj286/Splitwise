import { render, screen } from '@testing-library/react';
import Dashboard from '../components/home/centerBar/dashboard';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from '../store/store'

test('renders Dashboard', () => {
  render(
    <Provider store={Store}>
      <Router dashboard={Dashboard}>
        <Dashboard />
      </Router>
  </Provider>);
  const linkElement = screen.getByText(/Create New Group/i);
  expect(linkElement).toBeInTheDocument();
});