import Redirect from '@/components/common/Redirect';
import useSession from '@/hooks/session/useSession';

import PageLoading from '../common/PageLoading';

function withAuth<Props extends JSX.IntrinsicAttributes>(Component: (props: Props) => JSX.Element) {
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
