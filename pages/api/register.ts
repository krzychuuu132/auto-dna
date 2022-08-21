// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { RegisterFormData } from '../register';
import bcrypt from 'bcrypt';

interface MessageDetails {
  error: Boolean;
  errorType: string;
  text: string;
  user?: RegisterFormData;
}

type Data = {
  message: MessageDetails;
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { name, email, surname, password, repeatPassword }: RegisterFormData = req.body;
  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (userExist) {
    return res.json({
      message: {
        error: true,
        text: 'Użytkownik o takim e-mailu znajduje się już w bazie',
        errorType: 'email',
      },
    });
  }

  if (password !== repeatPassword) {
    return res.json({
      message: {
        error: true,
        text: 'Hasła nie są takie same!',
        errorType: 'password',
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await prisma.user.create({
    data: {
      name,
      surname,
      email,
      password: hashedPassword,
    },
  });
  console.log(user);
  res.status(200).json({
    message: {
      error: false,
      text: 'Użytkownik został stworzony!',
      user,
    },
  });
}
