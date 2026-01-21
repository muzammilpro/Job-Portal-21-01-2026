import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import ContactMessage from "@/models/ContactMessage";

/* ===== GET ALL MESSAGES ===== */
export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("GET CONTACT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

/* ===== DELETE MESSAGE ===== */
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "Message ID required" },
        { status: 400 }
      );
    }

    await connectDB();
    await ContactMessage.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
