"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  try {
    // Validation des champs
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid email format!" };
    }

    const { email } = validatedFields.data;

    // Vérification de l'existence de l'utilisateur
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email not found!" };
    }

    // Génération du token et envoi de l'email
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendResetPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: "Reset email sent successfully!" };

  } catch (error) {
    console.error("Error during password reset:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
