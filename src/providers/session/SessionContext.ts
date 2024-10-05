import { createContext } from 'react';

import { LoginCredentials } from '@/clients/backend/auth/AuthClient';
import { User } from '@/clients/backend/users/UserClient';

export interface SessionContextValue {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export default SessionContext;
