// import connectDB from "@/lib/mongoose"; // your connect function
// import Job from "@/models/Job";

// export async function PATCH(req) {
//   await connectDB();

//   try {
//     const { jobId, email, status } = await req.json();

//     if (!jobId || !email || !status) {
//       return Response.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     const updatedJob = await Job.findOneAndUpdate(
//       { _id: jobId, "applications.userEmail": email },
//       { $set: { "applications.$.status": status } },
//       { new: true }
//     );

//     if (!updatedJob) {
//       return Response.json({ message: "Application not found" }, { status: 404 });
//     }

//     return Response.json({ message: "Status updated successfully" });
//   } catch (error) {
//     return Response.json({ message: error.message }, { status: 500 });
//   }
// }

import connectDB from "@/lib/mongoose";
import Job from "@/models/Job";

export async function PATCH(req) {
  await connectDB();

  try {
    const { jobId, email, status } = await req.json();

    console.log("=== API REQUEST ===");
    console.log("jobId:", jobId);
    console.log("email:", email);
    console.log("status:", status);

    if (!jobId || !email || !status) {
      console.log("Missing required fields");
      return Response.json({ 
        message: "Missing required fields: jobId, email, status" 
      }, { status: 400 });
    }

    // Validate status
    const validStatuses = ["pending", "shortlisted", "rejected"];
    if (!validStatuses.includes(status)) {
      return Response.json({ 
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` 
      }, { status: 400 });
    }

    // Find job
    const job = await Job.findById(jobId);
    
    if (!job) {
      return Response.json({ message: "Job not found" }, { status: 404 });
    }

    console.log("Total applications:", job.applications.length);
    console.log("Looking for email:", email.toLowerCase().trim());

    // Find application by email (case-insensitive)
    const applicationIndex = job.applications.findIndex(app => {
      if (!app.userEmail) return false;
      return app.userEmail.toLowerCase().trim() === email.toLowerCase().trim();
    });

    if (applicationIndex === -1) {
      console.log("Available emails:", job.applications.map(app => app.userEmail));
      return Response.json({ 
        message: `Application not found for email: ${email}`,
        availableEmails: job.applications.map(app => app.userEmail).filter(e => e)
      }, { status: 404 });
    }

    console.log(`Found application at index ${applicationIndex}`);
    
    // Update the status
    job.applications[applicationIndex].status = status;
    
    // Save the updated job
    await job.save();

    console.log("Status updated successfully");

    return Response.json({ 
      success: true,
      message: "Status updated successfully",
      candidateEmail: email,
      newStatus: status,
      updatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ 
      message: error.message || "Internal server error" 
    }, { status: 500 });
  }
}