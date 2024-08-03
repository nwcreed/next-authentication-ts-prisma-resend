import { v4 as uuidv4 } from 'uuid';
import { database } from './database';
import { getVerificationTokenByEmail } from '@/data/verification-token';

// Fonction pour générer un token de vérification
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 heure

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await database.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await database.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};

// Fonction pour générer un token de réinitialisation de mot de passe
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 heure

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await database.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await database.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return passwordResetToken;
};
