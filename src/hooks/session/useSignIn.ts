import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { LoginCredentials } from '@/clients/backend/auth/AuthClient';
import useSession from '@/hooks/session/useSession';

function useSignIn() {
  const session = useSession();
  const router = useRouter();

  const signInMutation = useMutation({
    async mutationFn(credentials: LoginCredentials) {
      await session.login(credentials);
    },

    onSuccess() {
      router.push('/workspaces');
    },
  });

  return {
    run: signInMutation.mutateAsync,
    isRunning: signInMutation.isPending,
  };
}

export default useSignIn;
