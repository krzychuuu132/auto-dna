import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { signIn, useSession, getCsrfToken, getProviders } from 'next-auth/react';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { useForm } from 'react-hook-form';
import { options } from './api/auth/[...nextauth]';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';

export interface LoginFormData {
  email: string;
  password: string;
}

const Login = ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (data && status === 'authenticated') {
      router.push('/');
    }
  }, [data, status, router]);

  const mapNextAuthProviders = useCallback(() => {
    return Object.values(providers!).map((provider, key) =>
      provider.id !== 'credentials' ? (
        <button key={key} onClick={() => signIn(provider.id)}>
          {provider.name}
        </button>
      ) : null
    );
  }, [providers]);

  const onSubmit = (formData: LoginFormData) => {
    const { email, password } = formData;
    signIn('credentials', { email, password });
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <Input type="email" id="email" {...register('email', { required: 'Pole Email jest wymagane' })} />
          <Input type="password" id="password" {...register('password', { required: 'Pole Hasło jest wymagane' })} />
          <Button type="submit">Zaloguj się</Button>
        </form>
        {mapNextAuthProviders()}
      </main>
      <footer></footer>
    </div>
  );
};

export default Login;

interface SignInPageProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
  csrfToken: Awaited<ReturnType<typeof getCsrfToken>>;
}

export const getServerSideProps: GetServerSideProps<SignInPageProps> = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, options);
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  console.log(csrfToken);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
