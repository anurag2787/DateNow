// ToastMessage.test.jsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastMessage from './ToastMessage';

jest.useFakeTimers();

describe('ToastMessage Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      message: 'Test notification',
      type: 'success',
      onClose: jest.fn(),
      duration: null,
      ...props,
    };

    render(<ToastMessage {...defaultProps} />);
    return defaultProps;
  };

  test('renders the message', () => {
    setup();
    expect(screen.getByText(/test notification/i)).toBeInTheDocument();
  });

  test('renders success styling', () => {
    setup({ type: 'success' });
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-success');
  });

  test('renders error styling', () => {
    setup({ type: 'error' });
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-error');
  });

  test('renders info styling', () => {
    setup({ type: 'info' });
    const toast = screen.getByRole('alert');
    expect(toast).toHaveClass('toast-info');
  });

  test('calls onClose when close button is clicked', () => {
    const props = setup();
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalled();
  });

  test('auto closes after duration', () => {
    const props = setup({ duration: 3000 });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(props.onClose).toHaveBeenCalled();
  });

  test('does not auto close if duration is not provided', () => {
    const props = setup();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(props.onClose).not.toHaveBeenCalled();
  });

  test('has accessible alert role', () => {
    setup();
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
  });

  test('close button is accessible', () => {
    setup();
    const button = screen.getByRole('button', { name: /close/i });
    expect(button).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <ToastMessage message="Snapshot!" type="info" onClose={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
