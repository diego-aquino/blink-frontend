'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import environment from '@/config/environment';
import useAPI from '@/hooks/useAPI';

import useWorkspaceParams from '../../hooks/useWorkspaceParams';

const DOMAIN_INPUT_REM_WIDTH_PER_CHARACTER = 9.2 / 21;

const formSchema = z.object({
  name: z.string().trim().optional(),
  url: z.string().min(1, 'Obrigatório').url('Link inválido'),
  redirectId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function CreateBlinkForm() {
  const api = useAPI();
  const router = useRouter();

  const { workspaceId } = useWorkspaceParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const submitBlinkCreation = useMutation({
    async mutationFn(values: FormValues) {
      if (!workspaceId) {
        throw new Error(`Expected a workspace identifier, but found ${workspaceId}.`);
      }

      const blink = await api.backend.workspaces.blinks.create(workspaceId, {
        name: values.name,
        url: values.url,
        redirectId: values.redirectId,
      });

      return blink;
    },

    onSuccess(blink) {
      router.push(`/workspaces/${workspaceId}/blinks/${blink.id}`);
    },
  });

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit((values) => submitBlinkCreation.mutateAsync(values))}
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
            className="px-1 text-sm"
            style={{ width: `${DOMAIN_INPUT_REM_WIDTH_PER_CHARACTER * environment.NEXT_PUBLIC_BACKEND_URL.length}rem` }}
          />
          <span className="mb-1">/</span>
          <Input
            {...form.register('redirectId')}
            label="Identificador de redirecionamento"
            hideLabel
            required={false}
            placeholder="(será gerado automaticamente)"
            errorMessage={form.formState.errors.redirectId?.message}
            labelClassName="flex-1"
            className="px-1 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Link href={`/workspaces/${workspaceId}`} className="flex-1">
          <Button variant="secondary" type="button" className="w-full">
            Cancelar
          </Button>
        </Link>

        <Button type="submit" loading={form.formState.isSubmitting || submitBlinkCreation.isPending} className="flex-1">
          Criar
        </Button>
      </div>
    </form>
  );
}

export default CreateBlinkForm;
