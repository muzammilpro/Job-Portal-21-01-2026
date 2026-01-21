// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/mongoose';
// import Job from '@/models/Job';

// // import { NextResponse } from 'next/server';
// // import connectDB from '@/lib/db';
// // import Job from '@/models/Job';

// export async function PATCH(request, { params }) {
//   try {
//     await connectDB();
    
//     // Await the params promise
//     const { id } = await params;
    
//     const { candidateEmail, status } = await request.json();

//     // Validate input
//     if (!candidateEmail || !status) {
//       return NextResponse.json(
//         { success: false, message: 'Candidate email and status are required' },
//         { status: 400 }
//       );
//     }

//     // Valid status values
//     const validStatuses = ['pending', 'shortlisted', 'rejected'];
//     if (!validStatuses.includes(status)) {
//       return NextResponse.json(
//         { success: false, message: 'Invalid status value' },
//         { status: 400 }
//       );
//     }

//     // Update using findOneAndUpdate
//     const job = await Job.findOneAndUpdate(
//       {
//         _id: id,
//         $or: [
//           { 'applications.email': candidateEmail },
//           { 'applications.userEmail': candidateEmail }
//         ]
//       },
//       {
//         $set: {
//           'applications.$.status': status,
//           'applications.$.updatedAt': new Date()
//         }
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!job) {
//       return NextResponse.json(
//         { success: false, message: 'Job or application not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { 
//         success: true,
//         message: 'Application status updated successfully',
//         job: job
//       },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error('Error updating application status:', error);
//     return NextResponse.json(
//       { 
//         success: false,
//         message: error.message || 'Internal server error' 
//       },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db';
// import Job from '@/models/Job';

export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    // In App Router, params is a Promise
    const { id } = await params;
    
    const { candidateEmail, status } = await request.json();

    // Validate input
    if (!candidateEmail || !status) {
      return NextResponse.json(
        { success: false, message: 'Candidate email and status are required' },
        { status: 400 }
      );
    }

    // Valid status values
    const validStatuses = ['pending', 'shortlisted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Find the job and update directly
    const job = await Job.findById(id);
    
    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      );
    }

    // Find and update the specific application
    let updated = false;
    if (job.applications && Array.isArray(job.applications)) {
      for (let app of job.applications) {
        if (app.email === candidateEmail || app.userEmail === candidateEmail) {
          app.status = status;
          app.updatedAt = new Date();
          updated = true;
          break;
        }
      }
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Application not found for this candidate' },
        { status: 404 }
      );
    }

    // Save the updated job
    await job.save();

    return NextResponse.json(
      { 
        success: true,
        message: `Status updated to ${status}`,
        job: job
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}