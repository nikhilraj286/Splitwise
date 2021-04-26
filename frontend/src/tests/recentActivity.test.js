import { render, screen } from '@testing-library/react';
import RecentActivity from '../components/home/centerBar/recentActivity';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import Store from '../store/store'

test('renders Recent Activity', () => {
  render(
    <Provider store={Store}>
      <Router recentActivity={RecentActivity}>
        <RecentActivity />
      </Router>
  </Provider>);
  const linkElement = screen.getByText(/Recent Activity/i);
  expect(linkElement).toBeInTheDocument();
});