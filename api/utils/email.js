const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

function createTransporter() {
    // Use Gmail with MY_EMAIL and MY_PASSWORD exclusively
    const user = process.env.MY_EMAIL;
    const pass = process.env.MY_PASSWORD;
    const debug =
        String(process.env.EMAIL_DEBUG || "").toLowerCase() === "true";
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
        logger: debug,
        debug,
    });
    return transporter;
}

async function sendEmail({ to, subject, text, html }) {
    // Use the Gmail account as the From to avoid SPF/DMARC rejections
    const from = process.env.MY_EMAIL;
    let transporter = createTransporter();
    try {
        // Verify transporter to surface auth/connectivity issues early
        await transporter.verify();
    } catch (e) {
        console.error(
            "[Email] Transport verify failed (gmail service):",
            e?.message || e
        );
        // Fallback to explicit Gmail SMTP config (some environments require this)
        try {
            transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_PASSWORD,
                },
            });
            await transporter.verify();
        } catch (e2) {
            console.error(
                "[Email] Transport verify failed (smtp.gmail.com):",
                e2?.message || e2
            );
        }
    }
    return transporter.sendMail({ from, to, subject, text, html });
}

async function sendPasswordResetEmail(to, resetUrl) {
    const subject = "Password reset instructions";
    const text = `You requested a password reset. Use the link below to set a new password. This link expires in 15 minutes.\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`;
    const html = `<p>You requested a password reset. Use the link below to set a new password. This link expires in <strong>15 minutes</strong>.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, you can ignore this email.</p>`;
    return sendEmail({ to, subject, text, html });
}

module.exports = { sendEmail, sendPasswordResetEmail };
