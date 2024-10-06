import { createContext } from 'react';

import BackendClient from '@/clients/backend/BackendClient';

export interface APIContextValue {
  backend: BackendClient;
}

const APIContext = createContext<APIContextValue | undefined>(undefined);

export default APIContext;
