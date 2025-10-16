// Greeting.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

describe('Greeting Component', () => {
  it('renders default greeting when no name is provided', () => {
    render(<Greeting />);
    expect(screen.getByText('Hello, Guest!')).toBeInTheDocument();
  });

  it('renders personalized greeting when name is provided', () => {
    render(<Greeting name="Alice" />);
    expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
  });
});
