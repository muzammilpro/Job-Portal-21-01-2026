import connectDB from "@/lib/mongoose"; // your connect function
import Job from "@/models/Job";

export async function PATCH(req) {
  await connectDB();

  try {
    const { jobId, email, status } = await req.json();

    if (!jobId || !email || !status) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, "applications.userEmail": email },
      { $set: { "applications.$.status": status } },
      { new: true }
    );

    if (!updatedJob) {
      return Response.json({ message: "Application not found" }, { status: 404 });
    }

    return Response.json({ message: "Status updated successfully" });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 });
  }
}