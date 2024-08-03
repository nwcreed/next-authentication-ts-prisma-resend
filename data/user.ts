import { database } from "@/lib/database";

export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = await database.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        });

        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await database.user.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch (error) {
        console.error("Error fetching user by id:", error);
        return null;
    }
};

// Nouvelle fonction pour récupérer l'utilisateur par token de réinitialisation
export const getUserByResetToken = async (token: string) => {
    try {
        const user = await database.user.findFirst({
            where: {
                
            }
        });

        return user;
    } catch (error) {
        console.error("Error fetching user by reset token:", error);
        return null;
    }
};

// Nouvelle fonction pour mettre à jour le mot de passe de l'utilisateur
export const updateUserPassword = async (id: string, hashedPassword: string) => {
    try {
        const user = await database.user.update({
            where: {
                id
            },
            data: {
                password: hashedPassword,
            }
        });

        return user;
    } catch (error) {
        console.error("Error updating user password:", error);
        return null;
    }
};
