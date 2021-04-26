import { render, screen } from '@testing-library/react';
import AddGroup from '../components/group/addGroup';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from '../store/store'

test('renders add group', () => {
  render(
    <Provider store={Store}>
      <Router AddGroup={AddGroup}>
        <AddGroup />
      </Router>
  </Provider>);
  const linkElement = screen.getByText(/START A NEW GROUP/i);
  expect(linkElement).toBeInTheDocument();
});