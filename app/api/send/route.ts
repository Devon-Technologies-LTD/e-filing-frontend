import { NextRequest, NextResponse } from "next/server";
import mailjet from "node-mailjet";

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY!,
  process.env.MAILJET_API_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    await mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "info@devontech.io",
            Name: "Devon Technologies",
          },
          To: [
            {
              Email: "info@devontech.io",
              Name: "Devon Technologies",
            },
          ],
          Subject: "New Contact Support Message",
          HTMLPart: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>${message}</p>
          `,
          CustomID: "ContactForm",
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mailjet error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
