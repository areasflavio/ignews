import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { mocked } from 'jest-mock';

import SignInButton from '.';

jest.mock('next-auth/react');

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticate', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    });

    render(<SignInButton></SignInButton>);

    expect(screen.getByText('SignIn with Github')).toBeInTheDocument();
  });

  it('renders correctly when user is authenticate', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          image: '',
        },
        expires: 'fake-expires',
      },
      status: 'authenticated',
    });

    render(<SignInButton></SignInButton>);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
