// pages/dashboard/page.tsx

import { auth } from '@/auth'; // Ajustez le chemin selon la structure de votre projet
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/auth/signout-button'; // Ajustez le chemin selon la structure de votre projet

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    // Redirection côté client si nécessaire
    redirect('/sign-in');
  }

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="text-xl font-semibold">Dashboard</div>
        <SignOutButton />
      </header>
      <main className="p-4">
        <h1>Hi {session.user.name} {session.user.email}</h1>
      </main>
    </div>
  );
};

export default DashboardPage;
