import { Context, useContext } from 'react';

export class NoContextProviderError extends Error {
  constructor(contextName: string) {
    super(`Cannot access '${contextName}' without a provider.`);
  }
}

export function useStrictContext<ContextValue>(contextName: string, context: Context<ContextValue | undefined>) {
  const contextValue = useContext(context);

  if (contextValue === undefined) {
    throw new NoContextProviderError(contextName);
  }

  return contextValue;
}
