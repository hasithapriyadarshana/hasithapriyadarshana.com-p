import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "chathasitha@gmail.com";

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
    const { name, email, phone, service, subject, message, captchaToken } = body;

    if (!name || !email || !subject || !message || !captchaToken) {
      return NextResponse.json(
        { message: "All required fields must be filled." },
        { status: 400 },
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { message: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    if (!RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is not set");
      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 },
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { message: "Email service not configured." },
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

    const phoneRow = phone
      ? `<tr><td style="padding:8px 0;color:#555;font-weight:500;width:120px;">Phone</td><td style="padding:8px 0;color:#333;">${phone}</td></tr>`
      : "";

    const serviceRow = service
      ? `<tr><td style="padding:8px 0;color:#555;font-weight:500;width:120px;">Service</td><td style="padding:8px 0;color:#333;">${service}</td></tr>`
      : "";

    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:30px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">New Contact Form Submission</h1>
                  <p style="margin:8px 0 0;color:#a8b2d1;font-size:13px;">hasithapriyadarshana.com</p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #eee;">
                    <tr><td style="padding:8px 0;color:#555;font-weight:500;width:120px;">Name</td><td style="padding:8px 0;color:#333;font-weight:600;">${name}</td></tr>
                    <tr><td style="padding:8px 0;color:#555;font-weight:500;">Email</td><td style="padding:8px 0;color:#333;"><a href="mailto:${email}" style="color:#1a73e8;text-decoration:none;">${email}</a></td></tr>
                    ${phoneRow}
                    ${serviceRow}
                    <tr><td style="padding:8px 0;color:#555;font-weight:500;">Subject</td><td style="padding:8px 0;color:#333;">${subject}</td></tr>
                  </table>
                  <div style="margin-top:24px;">
                    <p style="margin:0 0 8px;color:#555;font-weight:500;">Message</p>
                    <div style="background-color:#f8f9fa;border-left:4px solid #1a1a2e;padding:16px 20px;border-radius:0 8px 8px 0;color:#444;line-height:1.7;font-size:15px;">
                      ${message.replace(/\n/g, "<br/>")}
                    </div>
                  </div>
                  <div style="margin-top:30px;text-align:center;">
                    <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background-color:#1a1a2e;color:#ffffff;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${name.split(" ")[0]}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f8f9fa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
                  <p style="margin:0;color:#999;font-size:12px;">This message was sent via the contact form on hasithapriyadarshana.com</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);padding:30px 40px;text-align:center;">
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">Thank You, ${name.split(" ")[0]}!</h1>
                  <p style="margin:8px 0 0;color:#a8b2d1;font-size:13px;">hasithapriyadarshana.com</p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 40px;text-align:center;">
                  <div style="width:60px;height:60px;background-color:#e8f5e9;border-radius:50%;margin:0 auto 20px;line-height:60px;font-size:28px;">&#10003;</div>
                  <h2 style="margin:0 0 12px;color:#333;font-size:20px;">Message Received!</h2>
                  <p style="margin:0 0 20px;color:#666;line-height:1.7;font-size:15px;">
                    Thank you for reaching out. I have received your message and will get back to you within <strong>24-48 hours</strong>.
                  </p>
                  <div style="background-color:#f8f9fa;border-radius:8px;padding:20px;margin:20px 0;text-align:left;">
                    <p style="margin:0 0 8px;color:#555;font-weight:500;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Your Submission</p>
                    <p style="margin:0;color:#333;font-size:14px;"><strong>Subject:</strong> ${subject}</p>
                    <p style="margin:6px 0 0;color:#333;font-size:14px;"><strong>Service:</strong> ${service || "Not specified"}</p>
                  </div>
                  <p style="margin:20px 0 0;color:#888;font-size:13px;">
                    If your matter is urgent, feel free to reach me directly at<br/>
                    <a href="mailto:chathasitha@gmail.com" style="color:#1a73e8;text-decoration:none;">chathasitha@gmail.com</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f8f9fa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
                  <p style="margin:0;color:#999;font-size:12px;">Hasitha Priyadarshana &mdash; hasithapriyadarshana.com</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    const notificationResult = await resend.emails.send({
      from: "Hasitha Portfolio <contact@hasithapriyadarshana.com>",
      to: CONTACT_EMAIL,
      subject: `New Contact Form Submission - ${subject}`,
      html: notificationHtml,
      replyTo: email,
    });

    if (notificationResult.error) {
      console.error("Resend notification error:", notificationResult.error);
    }

    const confirmResult = await resend.emails.send({
      from: "Hasitha Priyadarshana <contact@hasithapriyadarshana.com>",
      to: email,
      subject: `Thank you for contacting me - ${subject}`,
      html: confirmationHtml,
    });

    if (confirmResult.error) {
      console.error("Resend confirmation error:", confirmResult.error);
    }

    if (notificationResult.error) {
      return NextResponse.json(
        { message: "Failed to send email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
