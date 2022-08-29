import GoogleProvider from 'next-auth/providers/google';
import InstagramProvider from 'next-auth/providers/instagram';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const options = {
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'Email', placeholder: 'text@wp.pl' },
        password: { label: 'Password', type: 'Password', placeholder: '123456' },
      },
      async authorize(credentials, req) {
        const { email, password }: any = req.body;
        console.log(email);
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        if (!user) return null;

        console.log(password, user, 'siemaa');

        const isValidPassword = bcrypt.compare(password, user.password!);

        if (!isValidPassword) {
          console.log('złe hasło');
          return null;
        }

        if (user) {
          return {
            ...user,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === 'google') {
        console.log(account, profile);
        // return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);
