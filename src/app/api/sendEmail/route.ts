import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactFormPayload } from "./guards";
import { hitRateLimit } from "@/db/queries/rateLimit";

// Rate limit: max 3 submissions per IP per 60 s, stored in Postgres.
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX = 3;

function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  if (!process.env.NODEMAILER_AUTH_USER || !process.env.NODEMAILER_AUTH_PASS) {
    console.error("Missing email credentials");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  try {
    const ip = getClientIp(req);
    if (!(await hitRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_SECONDS))) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();

    const validation = validateContactFormPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const { name, email, message } = validation.data;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: process.env.NODEMAILER_AUTH_USER,
      replyTo: email,
      to: "federer.kristijan@gmail.com",
      subject: `New message from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap">${safeMessage}</pre>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
