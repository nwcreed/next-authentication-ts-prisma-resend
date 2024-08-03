"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Ajustez le chemin selon la structure de votre projet

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' }); // Redirige vers la page de connexion après la déconnexion
  };

  return (
    <Button onClick={handleSignOut} className="ml-auto">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
