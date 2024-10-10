import SignInForm from './SignInForm';

/** Página de login. */
function SignInPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <main className="mx-auto flex w-fit flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-lg">
        <SignInForm />
      </main>
    </div>
  );
}

export default SignInPage;
