// import { compare } from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
// import { prisma } from '@/lib/prisma'
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.access_token,
        },
        account: token.account,
      }
    },
    jwt: ({ token, user, account }) => {
      if (user && account) {
        const u = user as unknown as any
        return {
          ...token,
          id: u.id,
          access_token: account.access_token,
          refreshToken: account.refresh_token,
          account,
        }
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
