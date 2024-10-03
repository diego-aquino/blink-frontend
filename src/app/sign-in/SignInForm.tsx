'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/common/Button';
import PageLoading from '@/components/common/PageLoading';
import Input from '@/components/form/Input';
import useSession from '@/hooks/session/useSession';

const formSchema = z.object({
  email: z.string().min(1, 'Obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Obrigatório'),
});

type FormValues = z.infer<typeof formSchema>;

function SignInForm() {
  const session = useSession();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitLogin = useMutation({
    async mutationFn(values: FormValues) {
      await session.login({
        email: values.email,
        password: values.password,
      });
    },

    onSuccess() {
      router.push('/workspaces');
    },
  });

  useEffect(() => {
    if (!session.isLoading && session.user !== null) {
      router.push('/workspaces');
    }
  }, [router, session.isLoading, session.user]);

  if (session.isLoading || session.user !== null) {
    return <PageLoading />;
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((values) => submitLogin.mutateAsync(values))}
      className="flex min-w-72 flex-col space-y-6"
    >
      <h1 className="text-center text-3xl font-medium">Blink</h1>

      <div className="space-y-3">
        <Input
          {...form.register('email')}
          label="E-mail"
          type="email"
          errorMessage={form.formState.errors.email?.message}
        />
        <Input
          {...form.register('password')}
          label="Senha"
          type="password"
          errorMessage={form.formState.errors.password?.message}
        />
      </div>

      <Button type="submit" loading={form.formState.isSubmitting}>
        Entrar
      </Button>
    </form>
  );
}

export default SignInForm;
