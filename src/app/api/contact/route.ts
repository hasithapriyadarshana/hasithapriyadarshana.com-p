import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "chathasitha@gmail.com";
const SITE_URL = "https://hasithapriyadarshana.com";
const LOGO_URL = `${SITE_URL}/favicon.ico`;

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
    const isLocalRequest =
      process.env.NODE_ENV === "development" &&
      ["localhost", "127.0.0.1", "::1"].includes(req.nextUrl.hostname);
    const body = await req.json();
    const { name, email, phone, service, subject, message, captchaToken } = body;

    if (!name || !email || !subject || !message || (!isLocalRequest && !captchaToken)) {
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

    if (!isLocalRequest && !RECAPTCHA_SECRET_KEY) {
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

    const captchaValid = isLocalRequest || await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { message: "Captcha verification failed. Please try again." },
        { status: 403 },
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const phoneRow = phone
      ? `<tr><td style="padding:10px 0;color:#888;font-weight:500;width:120px;font-family:'Poppins',sans-serif;font-size:13px;">Phone</td><td style="padding:10px 0;color:#e4e4df;font-family:'Poppins',sans-serif;font-size:14px;">${phone}</td></tr>`
      : "";

    const serviceRow = service
      ? `<tr><td style="padding:10px 0;color:#888;font-weight:500;width:120px;font-family:'Poppins',sans-serif;font-size:13px;">Service</td><td style="padding:10px 0;color:#e4e4df;font-family:'Poppins',sans-serif;font-size:14px;">${service}</td></tr>`
      : "";

    const emailFonts = `<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />`;

    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">${emailFonts}</head>
      <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Poppins',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#070707;border-radius:16px;overflow:hidden;border:1px solid rgba(228,228,223,0.08);">
              <tr>
                <td style="padding:35px 40px 30px;text-align:center;border-bottom:1px solid rgba(228,228,223,0.08);">
                  <img src="${LOGO_URL}" alt="Hasitha Priyadarshana" width="48" height="48" style="display:block;margin:0 auto 18px;border-radius:10px;" />
                  <h1 style="margin:0;color:#e4e4df;font-size:20px;font-weight:600;font-family:'Oswald',sans-serif;letter-spacing:1px;text-transform:uppercase;">New Contact Form Submission</h1>
                  <p style="margin:8px 0 0;color:#666;font-size:12px;font-family:'Poppins',sans-serif;letter-spacing:0.5px;">hasithapriyadarshana.com</p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr><td style="padding:10px 0;color:#888;font-weight:500;width:120px;font-family:'Poppins',sans-serif;font-size:13px;">Name</td><td style="padding:10px 0;color:#e4e4df;font-family:'Poppins',sans-serif;font-size:14px;font-weight:600;">${name}</td></tr>
                    <tr><td style="padding:10px 0;color:#888;font-weight:500;font-family:'Poppins',sans-serif;font-size:13px;">Email</td><td style="padding:10px 0;font-family:'Poppins',sans-serif;font-size:14px;"><a href="mailto:${email}" style="color:#e4e4df;text-decoration:none;border-bottom:1px solid rgba(228,228,223,0.3);padding-bottom:1px;">${email}</a></td></tr>
                    ${phoneRow}
                    ${serviceRow}
                    <tr><td style="padding:10px 0;color:#888;font-weight:500;font-family:'Poppins',sans-serif;font-size:13px;">Subject</td><td style="padding:10px 0;color:#e4e4df;font-family:'Poppins',sans-serif;font-size:14px;">${subject}</td></tr>
                  </table>
                  <div style="margin-top:24px;">
                    <p style="margin:0 0 10px;color:#888;font-weight:500;font-family:'Oswald',sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
                    <div style="background-color:rgba(228,228,223,0.04);border-left:3px solid #e4e4df;padding:18px 22px;border-radius:0 8px 8px 0;color:#ccc;line-height:1.8;font-size:14px;font-family:'Poppins',sans-serif;">
                      ${message.replace(/\n/g, "<br/>")}
                    </div>
                  </div>
                  <div style="margin-top:30px;text-align:center;">
                    <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;background-color:#e4e4df;color:#070707;padding:13px 36px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;font-family:'Poppins',sans-serif;letter-spacing:0.3px;">Reply to ${name.split(" ")[0]}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;text-align:center;border-top:1px solid rgba(228,228,223,0.08);">
                  <p style="margin:0;color:#555;font-size:12px;font-family:'Poppins',sans-serif;">Sent via the contact form on <a href="${SITE_URL}" style="color:#888;text-decoration:none;">hasithapriyadarshana.com</a></p>
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
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">${emailFonts}</head>
      <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Poppins',sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color:#070707;border-radius:16px;overflow:hidden;border:1px solid rgba(228,228,223,0.08);">
              <tr>
                <td style="padding:35px 40px 30px;text-align:center;border-bottom:1px solid rgba(228,228,223,0.08);">
                  <img src="${LOGO_URL}" alt="Hasitha Priyadarshana" width="48" height="48" style="display:block;margin:0 auto 18px;border-radius:10px;" />
                  <h1 style="margin:0;color:#e4e4df;font-size:24px;font-weight:600;font-family:'Oswald',sans-serif;letter-spacing:0.5px;text-transform:uppercase;">Thank You, ${name.split(" ")[0]}!</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:35px 40px;text-align:center;">
                  <div style="width:64px;height:64px;background:linear-gradient(135deg,#e4e4df,#c0c0bc);border-radius:50%;margin:0 auto 24px;line-height:64px;font-size:28px;color:#070707;">&#10003;</div>
                  <h2 style="margin:0 0 14px;color:#e4e4df;font-size:20px;font-family:'Oswald',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message Received!</h2>
                  <p style="margin:0 0 24px;color:#888;line-height:1.8;font-size:15px;font-family:'Poppins',sans-serif;">
                    Thank you for reaching out. I have received your message and will get back to you within <strong style="color:#e4e4df;">24-48 hours</strong>.
                  </p>
                  <div style="background-color:rgba(228,228,223,0.04);border-radius:10px;padding:22px;margin:24px 0;text-align:left;border:1px solid rgba(228,228,223,0.06);">
                    <p style="margin:0 0 12px;color:#888;font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;font-family:'Oswald',sans-serif;">Your Submission</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;width:90px;">Name</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;">${name}</td></tr>
                      <tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;">Email</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;">${email}</td></tr>
                      ${phone ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;">Phone</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;">${phone}</td></tr>` : ""}
                      ${service ? `<tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;">Service</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;">${service}</td></tr>` : ""}
                      <tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;">Subject</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;">${subject}</td></tr>
                      <tr><td style="padding:6px 0;color:#888;font-size:13px;font-family:'Poppins',sans-serif;vertical-align:top;">Message</td><td style="padding:6px 0;color:#e4e4df;font-size:14px;font-family:'Poppins',sans-serif;font-weight:500;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td></tr>
                    </table>
                  </div>
                  <p style="margin:24px 0 0;color:#555;font-size:13px;font-family:'Poppins',sans-serif;line-height:1.7;">
                    If your matter is urgent, feel free to reach me directly at<br/>
                    <a href="mailto:chathasitha@gmail.com" style="color:#e4e4df;text-decoration:none;border-bottom:1px solid rgba(228,228,223,0.3);padding-bottom:1px;">chathasitha@gmail.com</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;text-align:center;border-top:1px solid rgba(228,228,223,0.08);">
                  <p style="margin:0;color:#555;font-size:12px;font-family:'Poppins',sans-serif;">Hasitha Priyadarshana &mdash; <a href="${SITE_URL}" style="color:#888;text-decoration:none;">hasithapriyadarshana.com</a></p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    const notificationResult = await resend.emails.send({
      from: "Hasitha Priyadarshana <contact@hasithapriyadarshana.com>",
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
