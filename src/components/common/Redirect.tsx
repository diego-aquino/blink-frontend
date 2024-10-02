'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  to: string;
}

function Redirect({ to }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return null;
}

export default Redirect;
