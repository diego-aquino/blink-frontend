'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  to: string;
}

/** Componente para redirecionar o usuário para outra rota. */
function Redirect({ to }: Props) {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = to;
    router.replace(url.toString());
  }, [router, to]);

  return null;
}

export default Redirect;
