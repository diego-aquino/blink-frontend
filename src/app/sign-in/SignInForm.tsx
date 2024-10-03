'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import useApi from '@/hooks/useApi';

const formSchema = z.object({
  email: z.string().min(1, 'Obrigatório').email('Email inválido'),
  password: z.string().min(1, 'Obrigatório'),
});

type FormValues = z.infer<typeof formSchema>;

function SignInForm() {
  const api = useApi();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitLogin = useMutation({
    async mutationFn(values: FormValues) {
      await api.backend.auth.login({
        email: values.email,
        password: values.password,
      });
    },

    onSuccess() {
      router.push('/workspaces');
    },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((values) => submitLogin.mutateAsync(values))}
      className="flex min-w-72 flex-col space-y-6"
    >
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
