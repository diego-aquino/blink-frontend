import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { LoginCredentials } from '@/clients/backend/auth/AuthClient';
import useSession from '@/hooks/session/useSession';
import useMe from '@/providers/session/useMe';

function useSignIn() {
  const session = useSession();
  const router = useRouter();
  const me = useMe();

  const signInMutation = useMutation({
    async mutationFn(credentials: LoginCredentials) {
      await session.login(credentials);
    },

    onSuccess() {
      void me.prefetch();
      router.push('/workspaces');
    },
  });

  return {
    run: signInMutation.mutateAsync,
    isRunning: signInMutation.isPending,
  };
}

export default useSignIn;
