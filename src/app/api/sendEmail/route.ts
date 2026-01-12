import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateContactFormPayload } from "./guards";

export async function POST(req: Request) {
  if (!process.env.NODEMAILER_AUTH_USER || !process.env.NODEMAILER_AUTH_PASS) {
    console.error("Missing email credentials");
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    const body: unknown = await req.json();

    const validation = validateContactFormPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { error: validation.error },
        { status: validation.status }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });

    // Verify SMTP connection configuration
    await transporter.verify();

    const mailOptions = {
      from: process.env.NODEMAILER_AUTH_USER, // Use your verified email as sender
      replyTo: email, // Set reply-to as the form submitter's email
      to: "federer.kristijan@gmail.com",
      subject: `New message from ${name}`,
      text: message,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send email", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
