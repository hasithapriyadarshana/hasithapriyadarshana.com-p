import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = "chathasitha@gmail.com";

async function verifyCaptcha(token: string): Promise<boolean> {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, subject, message, captchaToken } = body;

    if (!name || !email || !subject || !message || !captchaToken) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    if (!RECAPTCHA_SECRET_KEY || !RESEND_API_KEY) {
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 },
      );
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { message: "Captcha verification failed. Please try again." },
        { status: 403 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
