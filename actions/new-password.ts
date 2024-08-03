"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { getUserByResetToken, updateUserPassword } from "@/data/user";
import { ResetPasswordSchema } from "@/schemas";

// Fonction pour mettre à jour le mot de passe de l'utilisateur
export const changePassword = async (token: string, newPassword: string) => {
  try {
    // Validation du nouveau mot de passe
    const validatedPassword = ResetPasswordSchema.safeParse({ password: newPassword });

    if (!validatedPassword.success) {
      return { error: validatedPassword.error.errors[0].message };
    }

    // Vérification du token et récupération de l'utilisateur
    const user = await getUserByResetToken(token);

    if (!user) {
      return { error: "Invalid or expired reset token!" };
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mise à jour du mot de passe de l'utilisateur
    await updateUserPassword(user.id, hashedPassword);

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Error during password update:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
