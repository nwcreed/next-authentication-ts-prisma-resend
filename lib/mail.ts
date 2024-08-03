import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

const domain = "http://localhost:3000"

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmationLink = `${domain}/verify-email?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
    })
}

export const sendResetPasswordEmail = async (email: string, token: string) => {
    const resetLink = `${domain}/new-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Password Reset Request",
        html: `
            <p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>
            <p>If you did not request this, please ignore this email.</p>
        `
    });
};