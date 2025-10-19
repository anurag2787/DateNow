// ConfirmModal.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmModal from './ConfirmModal';

describe('ConfirmModal Component', () => {
  const defaultProps = {
    isOpen: true,
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  const setup = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };
    render(<ConfirmModal {...finalProps} />);
    return finalProps;
  };

  test('renders title and message when open', () => {
    setup();
    expect(screen.getByText(/delete item/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  test('calls onConfirm when "Yes" button is clicked', () => {
    const props = setup();
    fireEvent.click(screen.getByRole('button', { name: /yes/i }));
    expect(props.onConfirm).toHaveBeenCalled();
  });

  test('calls onCancel when "Cancel" button is clicked', () => {
    const props = setup();
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(props.onCancel).toHaveBeenCalled();
  });

  test('does not render when isOpen is false', () => {
    setup({ isOpen: false });
    expect(screen.queryByText(/delete item/i)).not.toBeInTheDocument();
  });

  test('has accessible role "dialog"', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  test('focus is on the modal when opened', () => {
    setup();
    const dialog = screen.getByRole('dialog');
    expect(document.activeElement).toBe(dialog);
  });

  test('"Yes" and "Cancel" buttons are present', () => {
    setup();
    expect(screen.getByRole('button', { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  test('renders with custom title and message', () => {
    setup({
      title: 'Custom Title',
      message: 'Custom message content',
    });
    expect(screen.getByText(/custom title/i)).toBeInTheDocument();
    expect(screen.getByText(/custom message content/i)).toBeInTheDocument();
  });

  test('matches snapshot when open', () => {
    const { asFragment } = render(<ConfirmModal {...defaultProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot when closed', () => {
    const { asFragment } = render(
      <ConfirmModal {...defaultProps} isOpen={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
