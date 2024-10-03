import ApiContext from '@/app/providers/api/ApiContext';
import { useStrictContext } from '@/utils/react';

function useApi() {
  return useStrictContext('ApiContext', ApiContext);
}

export default useApi;
