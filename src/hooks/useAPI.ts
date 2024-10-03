import APIContext from '@/app/providers/api/APIContext';
import { useStrictContext } from '@/utils/react';

function useAPI() {
  return useStrictContext('APIContext', APIContext);
}

export default useAPI;
