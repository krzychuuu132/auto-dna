import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FB_ID as string,
      clientSecret: process.env.FB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
});
