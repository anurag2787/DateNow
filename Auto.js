// Removing because of the confict 
// SearchBar.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const setup = (value = '') => {
    const props = {
      placeholder: 'Search users...',
      value,
      onChange: jest.fn(),
      onSubmit: jest.fn(),
    };

    render(<SearchBar {...props} />);
    return props;
  };

  test('renders input with placeholder', () => {
    setup();
    const input = screen.getByPlaceholderText(/search users/i);
    expect(input).toBeInTheDocument();
  });

  test('renders current value in input', () => {
    setup('admin');
    const input = screen.getByDisplayValue('admin');
    expect(input).toBeInTheDocument();
  });

  test('calls onChange when typing', () => {
    const props = setup('');
    const input = screen.getByPlaceholderText(/search users/i);
    fireEvent.change(input, { target: { value: 'john' } });
    expect(props.onChange).toHaveBeenCalledWith('john');
  });

  test('calls onSubmit when Enter key is pressed', () => {
    const props = setup('developer');
    const input = screen.getByDisplayValue('developer');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(props.onSubmit).toHaveBeenCalled();
  });

  test('calls onSubmit when search button is clicked', () => {
    const props = setup('test');
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalled();
  });

  test('disables search button when input is empty', () => {
    setup('');
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
  });

  test('enables search button when input is not empty', () => {
    setup('foo');
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeEnabled();
  });

  test('input has accessible name', () => {
    setup();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName(/search users/i);
  });

  test('search button has accessible name', () => {
    setup('abc');
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <SearchBar
        placeholder="Search..."
        value="hello"
        onChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
