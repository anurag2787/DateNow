// UserProfile.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';
import * as api from '../api/user'; // Mocked API module

jest.mock('../api/user');

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'A regular guy.',
};

describe('UserProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(api.fetchUser).toHaveBeenCalled());
  });

  test('displays user info after loading', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const name = await screen.findByDisplayValue(mockUser.name);
    expect(name).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.bio)).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    api.fetchUser.mockRejectedValue(new Error('Failed to fetch user'));
    render(<UserProfile userId={1} />);

    const error = await screen.findByText(/failed to fetch user/i);
    expect(error).toBeInTheDocument();
  });

  test('allows editing user fields', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(nameInput.value).toBe('Jane Doe');
  });

  test('validates empty name field', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: '' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    const error = await screen.findByText(/name is required/i);
    expect(error).toBeInTheDocument();
  });

  test('submits updated user data', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    api.updateUser.mockResolvedValue({ ...mockUser, name: 'Jane Doe' });

    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    await waitFor(() => expect(api.updateUser).toHaveBeenCalledWith(1, expect.objectContaining({ name: 'Jane Doe' })));
    const success = await screen.findByText(/profile updated/i);
    expect(success).toBeInTheDocument();
  });

  test('handles update error', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    api.updateUser.mockRejectedValue(new Error('Update failed'));

    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    const error = await screen.findByText(/update failed/i);
    expect(error).toBeInTheDocument();
  });

  test('cancel button resets form fields', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: 'Someone Else' } });

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(nameInput.value).toBe(mockUser.name);
  });

  test('form does not submit if required fields are empty', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: '' } });

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    expect(api.updateUser).not.toHaveBeenCalled();
  });

  test('form is disabled while submitting', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    let resolveUpdate;
    const updatePromise = new Promise((res) => {
      resolveUpdate = res;
    });
    api.updateUser.mockReturnValue(updatePromise);

    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    expect(saveBtn).toBeDisabled();

    resolveUpdate();
    await waitFor(() => expect(saveBtn).not.toBeDisabled());
  });

  test('shows spinner while updating', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    let resolve;
    const updatePromise = new Promise((res) => (resolve = res));
    api.updateUser.mockReturnValue(updatePromise);

    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);

    expect(screen.getByTestId('updating-spinner')).toBeInTheDocument();
    resolve();
  });

  test('does not refetch on re-render with same userId', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    const { rerender } = render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);
    rerender(<UserProfile userId={1} />);
    expect(api.fetchUser).toHaveBeenCalledTimes(1);
  });

  test('refetches if userId changes', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    const { rerender } = render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    const newUser = { id: 2, name: 'Alice', email: 'alice@example.com', bio: '' };
    api.fetchUser.mockResolvedValueOnce(newUser);
    rerender(<UserProfile userId={2} />);

    const name = await screen.findByDisplayValue(newUser.name);
    expect(name).toBeInTheDocument();
  });

  test('renders form fields with correct labels', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
  });

  test('matches snapshot', async () => {
    api.fetchUser.mockResolvedValue(mockUser);
    const { asFragment } = render(<UserProfile userId={1} />);
    await screen.findByDisplayValue(mockUser.name);
    expect(asFragment()).toMatchSnapshot();
  });
});
