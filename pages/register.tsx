import type { NextPage } from 'next';
import Head from 'next/head';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { Router, useRouter } from 'next/router';

export interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: RegisterFormData): void => {
    try {
      const response = await axios.post('/api/register', formData);
      const { message } = response.data;
      if (message.error) {
        setError(message.errorType, { type: 'custom', message: message.text });
      } else {
        router.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="App-header">
        <nav className="nav"></nav>
      </header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="text" alt="name" placeholder="Podaj imię" label="name" {...register('name', { required: 'Pole Imię jest wymagane' })} />
          {errors.name && <ErrorMessage message={errors.name.message} />}
          <Input
            type="text"
            alt="surname"
            placeholder="Podaj nazwisko"
            label="surname"
            {...register('surname', { required: 'Pole Nazwisko jest wymagane' })}
          />
          {errors.surname && <ErrorMessage message={errors.surname.message} />}

          <Input
            type="email"
            alt="email"
            placeholder="Podaj e-mail"
            label="email"
            {...register('email', { required: 'Pole e-mail jest wymagane' })}
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}

          <Input
            type="password"
            alt="password"
            placeholder="Podaj hasło"
            label="password"
            {...register('password', { required: 'Pole Hasło jest wymagane' })}
          />
          {errors.password && <ErrorMessage message={errors.password.message} />}

          <Input
            type="password"
            alt="repeatPassword"
            placeholder="Powtórz hasło"
            label="Powtórz hasło"
            {...register('repeatPassword', { required: 'Pole Powtórz hasło jest wymagane' })}
          />
          {errors.repeatPassword && <ErrorMessage message={errors.repeatPassword.message} />}

          <Button type="submit">Zarejestruj się!</Button>
        </form>
      </main>
      <footer></footer>
    </div>
  );
};

export default Register;