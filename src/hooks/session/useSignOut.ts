import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useSession from '@/hooks/session/useSession';

function useSignOut() {
  const session = useSession();
  const router = useRouter();

  const signOutMutation = useMutation({
    async mutationFn() {
      await session.logout();
    },

    onSuccess() {
      router.push('/sign-in');
    },
  });

  return {
    run: signOutMutation.mutateAsync,
    isRunning: signOutMutation.isPending,
  };
}

export default useSignOut;
