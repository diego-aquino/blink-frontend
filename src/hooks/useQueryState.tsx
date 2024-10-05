import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function useQueryState<QueryValue extends string>(queryKey: string, defaultValue?: QueryValue) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryValue = searchParams.get(queryKey) ?? defaultValue;

  const setQueryValue = useCallback(
    (newValue: QueryValue) => {
      const url = new URL(window.location.href);
      url.searchParams.set(queryKey, newValue);
      router.push(url.toString());
    },
    [queryKey, router],
  );

  return [queryValue, setQueryValue] as const;
}

export default useQueryState;
