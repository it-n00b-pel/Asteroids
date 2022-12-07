import React from 'react';
import { render, screen } from '@testing-library/react';

import Asteroids from './Asteroids';

test('renders learn react link', () => {
  render(<Asteroids />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
