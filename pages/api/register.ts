// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type Data = {
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body);
  try {
    // await prisma.user.create({
    //   data: {
    //     name: 'test',
    //     email: 'krzycvhu222u@wp.pl',
    //     posts: {
    //       create: {
    //         title: 'Hellooo World!!',
    //       },
    //     },
    //     profile: {
    //       create: {
    //         bio: 'Testtttttttttt',
    //       },
    //     },
    //   },
    // });
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    console.log(posts);
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
  res.status(200).json({ message: 'error' });
}
