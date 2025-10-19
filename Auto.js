// TodoItem.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Buy groceries',
    completed: false,
  };

  const setup = (overrides = {}) => {
    const props = {
      ...mockTodo,
      onToggle: jest.fn(),
      onDelete: jest.fn(),
      ...overrides,
    };

    render(<TodoItem {...props} />);
    return props;
  };

  test('renders todo text', () => {
    setup();
    expect(screen.getByText(/buy groceries/i)).toBeInTheDocument();
  });

  test('calls onToggle when checkbox is clicked', () => {
    const props = setup();
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(props.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  test('calls onDelete when delete button is clicked', () => {
    const props = setup();
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);
    expect(props.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  test('checkbox reflects completed state', () => {
    setup({ completed: true });
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('applies "completed" class when completed', () => {
    setup({ completed: true });
    const textEl = screen.getByText(/buy groceries/i);
    expect(textEl).toHaveClass('completed');
  });

  test('does not apply "completed" class when not completed', () => {
    setup({ completed: false });
    const textEl = screen.getByText(/buy groceries/i);
    expect(textEl).not.toHaveClass('completed');
  });

  test('checkbox has correct accessibility label', () => {
    setup();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAccessibleName(/mark buy groceries as done/i);
  });

  test('delete button has correct accessibility label', () => {
    setup();
    const deleteBtn = screen.getByRole('button', { name: /delete buy groceries/i });
    expect(deleteBtn).toBeInTheDocument();
  });

  test('matches snapshot when not completed', () => {
    const { asFragment } = render(
      <TodoItem {...mockTodo} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot when completed', () => {
    const { asFragment } = render(
      <TodoItem
        {...mockTodo}
        completed={true}
        onToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
