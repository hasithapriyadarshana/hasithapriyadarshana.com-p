import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

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

    if (!RECAPTCHA_SECRET_KEY) {
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

    // TODO: Send the email here (e.g. via Resend, SendGrid, Nodemailer)
    // For now, log and return success
    console.log("Contact form submission:", {
      name,
      email,
      service,
      subject,
      message,
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
