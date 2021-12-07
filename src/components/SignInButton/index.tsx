import { FaGithub } from 'react-icons/fa';
import { signIn, useSession, signOut } from 'next-auth/react';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

const SignInButton: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04de61" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      SignIn with Github
    </button>
  );
};

export default SignInButton;
