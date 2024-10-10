import Redirect from '@/components/common/Redirect';

/** Página de erro 404. Redireciona para a página de login. */
function NotFound() {
  return <Redirect to="/sign-in" />;
}

export default NotFound;
