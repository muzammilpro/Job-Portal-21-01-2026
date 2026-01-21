import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_APP_PASSWORD,
    },
});

export async function POST(request) {
    try {
        const { email, name, jobTitle } = await request.json();

        if (!email || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const mailOptions = {
            from: `"HR Team" <${process.env.ADMIN_EMAIL}>`,
            to: email,
            subject: `Interview Invitation - ${jobTitle}`,
            text: `Dear ${name},

We are pleased to invite you for an interview for the position of ${jobTitle}.

Please reply to this email or contact us to schedule a suitable time.

Best regards,
The Hiring Team`,
            html: `
        <h2>Dear ${name},</h2>
        <p>We are excited to invite you for an interview for the <strong>${jobTitle}</strong> position.</p>
        <p>Please reply to this email to schedule a convenient time.</p>
        <br/>
        <p>Best regards,<br/>The Hiring Team</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}