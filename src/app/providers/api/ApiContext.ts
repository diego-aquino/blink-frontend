import { createContext } from 'react';

import BackendClient from '@/clients/backend/BackendClient';

export interface ApiContextValue {
  backend: BackendClient;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export default ApiContext;
