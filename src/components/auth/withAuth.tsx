import { PropsWithChildren } from 'react';

import Redirect from '@/components/common/Redirect';
import useSession from '@/hooks/session/useSession';

import PageLoading from '../common/PageLoading';

/**
 * Componente de alta ordem que aguarda a sessão carregar e redireciona para a página de login caso o usuário não esteja
 * autenticado.
 */
function withAuth<Props extends JSX.IntrinsicAttributes | PropsWithChildren>(Component: (props: Props) => JSX.Element) {
  return function WrappedComponent(props: Props) {
    const session = useSession();

    if (session.isLoading) {
      return <PageLoading />;
    }

    if (session.user === null) {
      return <Redirect to="/sign-in" />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
