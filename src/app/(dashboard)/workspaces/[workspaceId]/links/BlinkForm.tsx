'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import environment from '@/config/environment';

const DOMAIN_INPUT_REM_WIDTH_PER_CHARACTER = 10.8 / 21;

const formSchema = z.object({
  name: z.string().trim().optional(),
  url: z.string().min(1, 'Obrigatório').url('Link inválido'),
  redirectId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  defaultName?: string | null;
  defaultURL?: string;
  defaultRedirectId?: string;
  cancelHref: string;
  onSubmit: (values: FormValues) => void;
}

function BlinkForm({ defaultName, defaultURL, defaultRedirectId, cancelHref, onSubmit }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName ?? '',
      url: defaultURL,
      redirectId: defaultRedirectId,
    },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-6 rounded-lg bg-white p-8"
    >
      <Input
        {...form.register('url')}
        label="Link original"
        type="url"
        placeholder="https://..."
        errorMessage={form.formState.errors.url?.message}
      />
      <Input
        {...form.register('name')}
        label="Nome"
        placeholder="Meu link"
        required={false}
        errorMessage={form.formState.errors.name?.message}
      />

      <div className="space-y-2">
        <div className="flex items-end space-x-3">
          <Input
            label="Link curto"
            value={environment.NEXT_PUBLIC_BACKEND_URL}
            readOnly
            className="px-2"
            style={{ width: `${DOMAIN_INPUT_REM_WIDTH_PER_CHARACTER * environment.NEXT_PUBLIC_BACKEND_URL.length}rem` }}
          />
          <span className="mb-1">/</span>
          <Input
            {...form.register('redirectId')}
            label="Identificador de redirecionamento"
            hideLabel
            required={false}
            placeholder={defaultRedirectId ? '' : '(gerar automaticamente)'}
            errorMessage={form.formState.errors.redirectId?.message}
            labelClassName="flex-1"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Link href={cancelHref} className="flex-1">
          <Button variant="secondary" type="button" className="w-full">
            Cancelar
          </Button>
        </Link>

        <Button type="submit" loading={form.formState.isSubmitting} className="flex-1">
          Salvar
        </Button>
      </div>
    </form>
  );
}

export default BlinkForm;
export type { FormValues as BlinkFormValues };
