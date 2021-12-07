import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { query as q } from 'faunadb';

import { fauna } from '../../../services/fauna';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    // ...add more providers here
  ],
  jwt: { secret: process.env.SIGNING_KEY },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await fauna.query(
          q.Create(q.Collection('users'), { data: { email: user.email } })
        );

        return true;
      } catch (err: any) {
        console.error(err.message);
        return false;
      }
    },
  },
});
