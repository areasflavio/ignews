import { render, screen, fireEvent } from '@testing-library/react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { mocked } from 'jest-mock';

import SubscribeButton from '.';

jest.mock('next-auth/react');

jest.mock('next/router');

describe('SubscribeButton component', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'authenticated',
    });

    render(<SubscribeButton></SubscribeButton>);

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'authenticated',
    });

    render(<SubscribeButton></SubscribeButton>);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          image: '',
        },
        activeSubscription: 'fake-subscription',
        expires: 'fake-expires',
      },
      status: 'authenticated',
    });

    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton></SubscribeButton>);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });
});
