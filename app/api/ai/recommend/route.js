import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";
import User from "@/models/User";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
    try {
        await connectDB();

        /* ================= AUTH CHECK ================= */
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { jobId } = await req.json();

        if (!jobId) {
            return NextResponse.json(
                { message: "Job ID is required" },
                { status: 400 }
            );
        }

        /* ================= FETCH JOB ================= */
        const job = await Job.findById(jobId).lean();

        if (!job) {
            return NextResponse.json(
                { message: "Job not found" },
                { status: 404 }
            );
        }

        if (!job.applications || job.applications.length === 0) {
            return NextResponse.json(
                { message: "No applications found for this job" },
                { status: 400 }
            );
        }

        /* ================= FETCH USERS ================= */
        const userIds = job.applications.map(app => app.userId);
        const users = await User.find({ _id: { $in: userIds } }).lean();

        /* ================= PREPARE AI INPUT ================= */
        const applicantsText = users
            .map((user, i) => `
${i + 1}. Name: ${user.name}
Email: ${user.email}

Skills:
${user.skills?.join(", ") || "None"}

Experience:
${user.experience?.map(
                e => `- ${e.title} at ${e.company} (${e.years})`
            ).join("\n") || "No experience"}

Education:
${user.education?.map(
                ed => `- ${ed.degree} from ${ed.institute}`
            ).join("\n") || "No education"}

About:
${user.about || "Not provided"}
`)
            .join("\n");

        /* ================= AI PROMPT ================= */
        const prompt = `
You are a senior HR recruiter.

JOB DETAILS:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Required Skills: ${job.skills.join(", ")}
Experience Required: ${job.experience || "Not specified"} years
Job Type: ${job.type}
Description: ${job.description}

APPLICANTS:
${applicantsText}

TASK:
- Rank candidates from best to worst
- Give a score out of 100
- Mention strengths and weaknesses
- Be strict and realistic

Return ONLY valid JSON in this format:
[
  {
    "name": "",
    "email": "",
    "score": 0,
    "strengths": "",
    "weaknesses": "",
    "finalVerdict": "Highly Suitable | Suitable | Not Suitable"
  }
]
`;

        /* ================= GROQ CALL ================= */
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // ✅ UPDATED MODEL
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        });

        return NextResponse.json({
            success: true,
            aiResult: completion.choices[0].message.content,
        });

    } catch (error) {
        console.error("AI RECOMMEND ERROR:", error);

        return NextResponse.json(
            {
                message: "AI recommendation failed",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
