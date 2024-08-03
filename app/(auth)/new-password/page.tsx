// app/(auth)/reset-password/page.tsx

import NewPasswordForm from "@/components/auth/new-password-form";

const ResetPasswordPage = async ({ searchParams }: { searchParams: { token: string } }) => {
  const token = searchParams.token;

  // Vous pouvez ajouter une vérification pour la validité du token ici

  return (
    <div className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
      <NewPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
