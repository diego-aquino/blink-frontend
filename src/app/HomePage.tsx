import Redirect from '@/components/common/Redirect';

/** Página inicial sem conteúdo, apenas redirecionando para a página de login. */
function HomePage() {
  return <Redirect to="sign-in" />;
}

export default HomePage;
