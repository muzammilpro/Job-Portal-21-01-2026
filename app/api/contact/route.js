import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
