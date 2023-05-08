import type { Account, DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    account: Account
    user: {
      /** Oauth access token */
      accessToken?: string
    } & DefaultSession['user']
  }
}
