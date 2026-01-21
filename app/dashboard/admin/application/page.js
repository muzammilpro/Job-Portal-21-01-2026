

// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState, useMemo } from "react";
// import {
//   Briefcase,
//   Users,
//   Calendar,
//   Download,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   UserCheck,
//   Mail,
//   Search,
//   Filter,
//   RefreshCw,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Send,
// } from "lucide-react";
// import Link from "next/link";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
//   { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
//   { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
//   { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
//   { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
// ];

// const ITEMS_PER_PAGE = 10;

// export default function AdminApplications() {
//   const { data: session, status } = useSession();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [sendingEmailId, setSendingEmailId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pendingStatusChange, setPendingStatusChange] = useState(null);

//   const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session || !isAdmin) {
//       window.location.href = "/signin";
//       return;
//     }
//     fetchApplications();
//   }, [status, session]);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/admin/applications");
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setApplications(data);
//     } catch (err) {
//       alert("Failed to load applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmStatusChange = (appId, newStatus) => {
//     if (newStatus === "rejected" || newStatus === "hired") {
//       setPendingStatusChange({ appId, newStatus });
//     } else {
//       updateStatus(appId, newStatus);
//     }
//   };

//   const updateStatus = async (appId, newStatus) => {
//     if (updatingId) return;
//     setUpdatingId(appId);

//     try {
//       const res = await fetch("/api/admin/applications", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ applicationId: appId, status: newStatus }),
//       });

//       if (res.ok) {
//         setApplications((prev) =>
//           prev.map((app) =>
//             app._id === appId ? { ...app, status: newStatus } : app
//           )
//         );
//       } else {
//         alert("Failed to update status");
//       }
//     } catch (err) {
//       alert("Error updating status");
//     } finally {
//       setUpdatingId(null);
//       setPendingStatusChange(null);
//     }
//   };

//   const sendInterviewEmail = async (appId, applicantEmail, applicantName, jobTitle) => {
//   if (sendingEmailId) return;

//   setSendingEmailId(appId);

//   try {
//     const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(applicantEmail)}`);
//     const profile = await profileRes.json();
    
//     const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || "Candidate";

//     const res = await fetch("/api/admin/send-interview-email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: applicantEmail,
//         name: fullName, 
//         jobTitle: jobTitle || "Software Engineer",
//       }),
//     });

//     if (res.ok) {
//       alert("Interview invitation email sent successfully!");
//     } else {
//       const data = await res.json();
//       alert(`Failed to send email: ${data.error || "Unknown error"}`);
//     }
//   } catch (err) {
//     alert("Error sending email. Please try again.");
//     console.error(err);
//   } finally {
//     setSendingEmailId(null);
//   }
// };


//   const getStatusInfo = (status) => {
//     return STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0];
//   };

//   const filteredAndSorted = useMemo(() => {
//     let filtered = applications;

//     if (searchTerm) {
//       const lower = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.applicant.name.toLowerCase().includes(lower) ||
//           app.applicant.email.toLowerCase().includes(lower) ||
//           (app.jobTitle || "Software Engineer").toLowerCase().includes(lower)
//       );
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((app) => app.status === statusFilter);
//     }

//     filtered.sort((a, b) => {
//       if (sortBy === "date-desc") return new Date(b.appliedAt) - new Date(a.appliedAt);
//       if (sortBy === "date-asc") return new Date(a.appliedAt) - new Date(b.appliedAt);
//       if (sortBy === "name") return a.applicant.name.localeCompare(b.applicant.name);
//       if (sortBy === "status") return a.status.localeCompare(b.status);
//       return 0;
//     });

//     return filtered;
//   }, [applications, searchTerm, statusFilter, sortBy]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredAndSorted, currentPage]);

//   const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
//           <p className="text-2xl font-semibold text-slate-700">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md">
//           <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h2>
//           <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-10 relative">
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
//             <Sparkles className="w-80 h-80 text-indigo-400 animate-pulse" />
//           </div>
//           <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//           <p className="mt-3 text-lg text-slate-600">Next-Gen Application Management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
//           {STATUS_OPTIONS.map((stat) => {
//             const Icon = stat.icon;
//             const count = applications.filter((a) => a.status === stat.value).length;
//             return (
//               <div
//                 key={stat.value}
//                 className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 text-center transition-transform hover:scale-105"
//               >
//                 <div className={`w-16 h-16 ${stat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md`}>
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <p className="text-3xl font-bold text-slate-800">{count}</p>
//                 <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Controls */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search name, email, job..."
//                 value={searchTerm}
//                 onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//                 className="w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="all">All Status</option>
//               {STATUS_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//               ))}
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="date-desc">Newest First</option>
//               <option value="date-asc">Oldest First</option>
//               <option value="name">Name A-Z</option>
//               <option value="status">Status</option>
//             </select>

//             <div className="flex items-center justify-start sm:justify-end text-slate-600">
//               <span className="font-medium text-lg">{filteredAndSorted.length}</span>
//               <span className="ml-2 hidden sm:inline">applications</span>
//             </div>
//           </div>
//         </div>

//         {/* Applications Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
//               <Briefcase className="w-9 h-9 text-indigo-600" />
//               Applications ({filteredAndSorted.length})
//             </h2>
//           </div>

//           {paginated.length === 0 ? (
//             <div className="p-16 sm:p-24 text-center">
//               <Users className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300 mx-auto mb-6" />
//               <p className="text-xl sm:text-2xl text-slate-500">No applications match your filters</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200">
//               {paginated.map((app) => {
//                 const statusInfo = getStatusInfo(app.status);
//                 const StatusIcon = statusInfo.icon;

//                 return (
//                   <div
//                     key={app._id}
//                     className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-purple-50/30 transition-all duration-300"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
//                       {/* Applicant */}
//                       <div className="md:col-span-4 flex items-center gap-4">
//                         <div className="relative flex-shrink-0">
//                           <img
//                             src={app.applicant.image || "/default-avatar.png"}
//                             alt={`${app.applicant.firstName} ${app.applicant.lastName}`}
//                             className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-slate-900">
//                             {`${app.applicant.firstName || ''} ${app.applicant.lastName || ''}`.trim() || app.applicant.name || "User"}
//                           </h3>
//                           <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
//                             <Mail className="w-4 h-4" />
//                             {app.applicant.email}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Job & Date */}
//                       <div className="md:col-span-3">
//                         <p className="font-medium text-slate-800">{app.jobTitle || "Software Engineer"}</p>
//                         <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(app.appliedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
//                         </p>
//                       </div>

//                       {/* Status */}
//                       <div className="md:col-span-2">
//                         <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${statusInfo.color} font-medium shadow-sm`}>
//                           <StatusIcon className="w-5 h-5" />
//                           {statusInfo.label}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="md:col-span-3 flex flex-wrap items-center gap-3 justify-start md:justify-end">
//                         <Link
//                           href={`/profile?email=${encodeURIComponent(app.applicant.email)}`}
//                           target="_blank"
//                           className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                         >
//                           <Eye className="w-4 h-4" />
//                           Profile
//                         </Link>

//                         {app.applicant.hasResume && (
//                           <a
//                             href={`/api/profile/resume?email=${encodeURIComponent(app.applicant.email)}`}
//                             download
//                             className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                           >
//                             <Download className="w-4 h-4" />
//                             Resume
//                           </a>
//                         )}

//                         <button
//                           onClick={() => sendInterviewEmail(app._id, app.applicant.email, app.applicant.name, app.jobTitle)}
//                           disabled={sendingEmailId === app._id}
//                           className="px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
//                         >
//                           <Send className="w-4 h-4" />
//                           {sendingEmailId === app._id ? "Sending..." : "Interview Email"}
//                         </button>

//                         <select
//                           value={app.status}
//                           onChange={(e) => confirmStatusChange(app._id, e.target.value)}
//                           disabled={updatingId === app._id}
//                           className="px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition cursor-pointer"
//                         >
//                           {STATUS_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50/20 to-purple-50/20">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                 disabled={currentPage === 1}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 <ChevronLeft className="w-5 h-5" /> Previous
//               </button>
//               <span className="text-slate-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                 disabled={currentPage === totalPages}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 Next <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal for Status Change */}
//       {pendingStatusChange && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/50">
//             <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm Status Change</h3>
//             <p className="text-slate-600 mb-8">
//               Mark this application as{" "}
//               <span className={`font-bold ${pendingStatusChange.newStatus === "hired" ? "text-green-600" : "text-red-600"}`}>
//                 {pendingStatusChange.newStatus === "hired" ? "Hired" : "Rejected"}
//               </span>?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setPendingStatusChange(null)}
//                 className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => updateStatus(pendingStatusChange.appId, pendingStatusChange.newStatus)}
//                 className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition ${
//                   pendingStatusChange.newStatus === "hired"
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
//                     : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
//                 }`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState, useMemo } from "react";
// import {
//   Briefcase,
//   Users,
//   Calendar,
//   Download,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   UserCheck,
//   Mail,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Send,
// } from "lucide-react";
// import Link from "next/link";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
//   { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
//   { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
//   { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
//   { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
// ];

// const ITEMS_PER_PAGE = 10;

// export default function AdminApplications() {
//   const { data: session, status } = useSession();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [sendingEmailId, setSendingEmailId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pendingStatusChange, setPendingStatusChange] = useState(null);

//   const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session || !isAdmin) {
//       window.location.href = "/signin";
//       return;
//     }
//     fetchApplications();
//   }, [status, session]);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/admin/applications");
//       if (!res.ok) throw new Error("Failed to fetch");
//       const data = await res.json();
//       setApplications(data);
//     } catch (err) {
//       alert("Failed to load applications");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmStatusChange = (appId, newStatus) => {
//     if (newStatus === "rejected" || newStatus === "hired") {
//       setPendingStatusChange({ appId, newStatus });
//     } else {
//       // For pending, shortlisted, interview → just update status (no email)
//       updateStatus(appId, newStatus);
//     }
//   };

//   const updateStatus = async (appId, newStatus) => {
//     if (updatingId) return;
//     setUpdatingId(appId);

//     try {
//       const res = await fetch("/api/admin/applications", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ applicationId: appId, status: newStatus }),
//       });

//       if (res.ok) {
//         setApplications((prev) =>
//           prev.map((app) =>
//             app._id === appId ? { ...app, status: newStatus } : app
//           )
//         );
//       } else {
//         const error = await res.json();
//         alert(`Failed to update status: ${error.message || "Unknown error"}`);
//       }
//     } catch (err) {
//       alert("Error updating status");
//       console.error(err);
//     } finally {
//       setUpdatingId(null);
//       setPendingStatusChange(null);
//     }
//   };

//   const sendInterviewEmail = async (appId, applicantEmail, applicantName, jobTitle) => {
//     if (sendingEmailId) return;
//     setSendingEmailId(appId);

//     try {
//       const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(applicantEmail)}`);
//       if (!profileRes.ok) throw new Error("Profile not found");
//       const profile = await profileRes.json();

//       const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || applicantName || "Candidate";

//       const res = await fetch("/api/admin/send-interview-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: applicantEmail,
//           name: fullName,
//           jobTitle: jobTitle || "Software Engineer",
//         }),
//       });

//       if (res.ok) {
//         alert("Interview invitation email sent successfully! 🎉");
//       } else {
//         const data = await res.json();
//         alert(`Failed to send email: ${data.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       alert("Error sending email. Please try again.");
//       console.error(err);
//     } finally {
//       setSendingEmailId(null);
//     }
//   };

//   const getStatusInfo = (status) => {
//     return STATUS_OPTIONS.find((opt) => opt.value === status) || {
//       value: "unknown",
//       label: "Unknown",
//       color: "bg-gray-100 text-gray-800",
//       icon: Clock,
//     };
//   };

//   const getApplicantName = (applicant) => {
//     if (applicant.firstName || applicant.lastName) {
//       return `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim();
//     }
//     return applicant.name || "Candidate";
//   };

//   const filteredAndSorted = useMemo(() => {
//     let filtered = applications;

//     if (searchTerm) {
//       const lower = searchTerm.toLowerCase();
//       filtered = filtered.filter((app) => {
//         const name = getApplicantName(app.applicant).toLowerCase();
//         const email = app.applicant.email.toLowerCase();
//         const job = (app.jobTitle || "Software Engineer").toLowerCase();
//         return name.includes(lower) || email.includes(lower) || job.includes(lower);
//       });
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter((app) => app.status === statusFilter);
//     }

//     filtered.sort((a, b) => {
//       if (sortBy === "date-desc") return new Date(b.appliedAt) - new Date(a.appliedAt);
//       if (sortBy === "date-asc") return new Date(a.appliedAt) - new Date(b.appliedAt);
//       if (sortBy === "name") return getApplicantName(a.applicant).localeCompare(getApplicantName(b.applicant));
//       if (sortBy === "status") return a.status.localeCompare(b.status);
//       return 0;
//     });

//     return filtered;
//   }, [applications, searchTerm, statusFilter, sortBy]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredAndSorted, currentPage]);

//   const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
//           <p className="text-2xl font-semibold text-slate-700">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md">
//           <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h2>
//           <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10 relative">
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
//             <Sparkles className="w-80 h-80 text-indigo-400 animate-pulse" />
//           </div>
//           <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//           <p className="mt-3 text-lg text-slate-600">Next-Gen Application Management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
//           {STATUS_OPTIONS.map((stat) => {
//             const Icon = stat.icon;
//             const count = applications.filter((a) => a.status === stat.value).length;
//             return (
//               <div
//                 key={stat.value}
//                 className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 text-center transition-transform hover:scale-105"
//               >
//                 <div className={`w-16 h-16 ${stat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md`}>
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <p className="text-3xl font-bold text-slate-800">{count}</p>
//                 <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Controls */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search name, email, job..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="all">All Status</option>
//               {STATUS_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//               ))}
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="date-desc">Newest First</option>
//               <option value="date-asc">Oldest First</option>
//               <option value="name">Name A-Z</option>
//               <option value="status">Status</option>
//             </select>

//             <div className="flex items-center justify-start sm:justify-end text-slate-600">
//               <span className="font-medium text-lg">{filteredAndSorted.length}</span>
//               <span className="ml-2 hidden sm:inline">applications</span>
//             </div>
//           </div>
//         </div>

//         {/* Applications Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
//               <Briefcase className="w-9 h-9 text-indigo-600" />
//               Applications ({filteredAndSorted.length})
//             </h2>
//           </div>

//           {paginated.length === 0 ? (
//             <div className="p-16 sm:p-24 text-center">
//               <Users className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300 mx-auto mb-6" />
//               <p className="text-xl sm:text-2xl text-slate-500">No applications match your filters</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200">
//               {paginated.map((app) => {
//                 const statusInfo = getStatusInfo(app.status);
//                 const StatusIcon = statusInfo.icon;
//                 const applicantName = getApplicantName(app.applicant);

//                 return (
//                   <div
//                     key={app._id}
//                     className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-purple-50/30 transition-all duration-300"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
//                       {/* Applicant */}
//                       <div className="md:col-span-4 flex items-center gap-4">
//                         <div className="relative flex-shrink-0">
//                           <img
//                             src={app.applicant.image || "/default-avatar.png"}
//                             alt={applicantName}
//                             className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-slate-900">{applicantName}</h3>
//                           <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
//                             <Mail className="w-4 h-4" />
//                             {app.applicant.email}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Job & Date */}
//                       <div className="md:col-span-3">
//                         <p className="font-medium text-slate-800">{app.jobTitle || "Software Engineer"}</p>
//                         <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(app.appliedAt).toLocaleDateString(undefined, {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </p>
//                       </div>

//                       {/* Status Badge */}
//                       <div className="md:col-span-2">
//                         <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${statusInfo.color} font-medium shadow-sm`}>
//                           <StatusIcon className="w-5 h-5" />
//                           {statusInfo.label}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="md:col-span-3 flex flex-wrap items-center gap-3 justify-start md:justify-end">
//                         <Link
//                           href={`/profile?email=${encodeURIComponent(app.applicant.email)}`}
//                           target="_blank"
//                           className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                         >
//                           <Eye className="w-4 h-4" />
//                           Profile
//                         </Link>

//                         {app.applicant.hasResume && (
//                           <a
//                             href={`/api/profile/resume?email=${encodeURIComponent(app.applicant.email)}`}
//                             download
//                             className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                           >
//                             <Download className="w-4 h-4" />
//                             Resume
//                           </a>
//                         )}

//                         <button
//                           onClick={() => sendInterviewEmail(app._id, app.applicant.email, applicantName, app.jobTitle)}
//                           disabled={sendingEmailId === app._id}
//                           className="px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
//                         >
//                           <Send className="w-4 h-4" />
//                           {sendingEmailId === app._id ? "Sending..." : "Interview Email"}
//                         </button>

//                         <select
//                           value={app.status}
//                           onChange={(e) => confirmStatusChange(app._id, e.target.value)}
//                           disabled={updatingId === app._id}
//                           className="px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition cursor-pointer"
//                         >
//                           {STATUS_OPTIONS.map((opt) => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50/20 to-purple-50/20">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
//                 disabled={currentPage === 1}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 <ChevronLeft className="w-5 h-5" /> Previous
//               </button>
//               <span className="text-slate-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
//                 disabled={currentPage === totalPages}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 Next <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal for Hired/Rejected */}
//       {pendingStatusChange && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/50">
//             <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm Status Change</h3>
//             <p className="text-slate-600 mb-8">
//               Mark this application as{" "}
//               <span className={`font-bold ${pendingStatusChange.newStatus === "hired" ? "text-green-600" : "text-red-600"}`}>
//                 {pendingStatusChange.newStatus === "hired" ? "Hired" : "Rejected"}
//               </span>?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setPendingStatusChange(null)}
//                 className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => updateStatus(pendingStatusChange.appId, pendingStatusChange.newStatus)}
//                 className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition ${
//                   pendingStatusChange.newStatus === "hired"
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
//                     : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
//                 }`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";

// import { useSession } from "next-auth/react";
// import { useEffect, useState, useMemo } from "react";
// import {
//   Briefcase,
//   Users,
//   Calendar,
//   Download,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   UserCheck,
//   Mail,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   Send,
// } from "lucide-react";
// import Link from "next/link";

// const STATUS_OPTIONS = [
//   { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
//   { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
//   { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
//   { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
//   { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
// ];

// const ITEMS_PER_PAGE = 10;

// export default function AdminApplications() {
//   const { data: session, status } = useSession();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [updatingId, setUpdatingId] = useState(null);
//   const [sendingEmailId, setSendingEmailId] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("date-desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pendingStatusChange, setPendingStatusChange] = useState(null);

//   const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session || !isAdmin) {
//       window.location.href = "/signin";
//       return;
//     }
//     fetchApplications();
//   }, [status, session]);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/admin/applications");
//       if (!res.ok) throw new Error("Failed to fetch applications");
//       const data = await res.json();

//       // Normalize status values (very important fix)
//       const normalizedApplications = data.map(app => ({
//         ...app,
//         status: (app.status || "pending").toLowerCase().trim()
//       }));

//       setApplications(normalizedApplications);
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//       alert("Failed to load applications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmStatusChange = (appId, newStatus) => {
//     if (newStatus === "rejected" || newStatus === "hired") {
//       setPendingStatusChange({ appId, newStatus });
//     } else {
//       updateStatus(appId, newStatus);
//     }
//   };

//   const updateStatus = async (appId, newStatus) => {
//     if (updatingId) return;
//     setUpdatingId(appId);

//     try {
//       const res = await fetch("/api/admin/applications", {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ applicationId: appId, status: newStatus }),
//       });

//       if (res.ok) {
//         setApplications(prev =>
//           prev.map(app =>
//             app._id === appId ? { ...app, status: newStatus } : app
//           )
//         );
//       } else {
//         const error = await res.json();
//         alert(`Failed to update: ${error.message || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error updating status");
//     } finally {
//       setUpdatingId(null);
//       setPendingStatusChange(null);
//     }
//   };

//   const sendInterviewEmail = async (appId, applicantEmail, applicantName, jobTitle) => {
//     if (sendingEmailId) return;
//     setSendingEmailId(appId);

//     try {
//       const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(applicantEmail)}`);
//       if (!profileRes.ok) throw new Error("Profile not found");
//       const profile = await profileRes.json();

//       const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || applicantName || "Candidate";

//       const res = await fetch("/api/admin/send-interview-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: applicantEmail,
//           name: fullName,
//           jobTitle: jobTitle || "Software Engineer",
//         }),
//       });

//       if (res.ok) {
//         alert("Interview invitation sent successfully! 🎉");
//       } else {
//         const data = await res.json();
//         alert(`Failed to send email: ${data.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending email");
//     } finally {
//       setSendingEmailId(null);
//     }
//   };

//   const getStatusInfo = (status) => {
//     const normalized = (status || "pending").toLowerCase().trim();
//     return (
//       STATUS_OPTIONS.find(opt => opt.value === normalized) || {
//         value: "unknown",
//         label: "Unknown",
//         color: "bg-gray-100 text-gray-800",
//         icon: Clock,
//       }
//     );
//   };

//   const getApplicantName = (applicant) => {
//     if (applicant?.firstName || applicant?.lastName) {
//       return `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim();
//     }
//     return applicant?.name || "Candidate";
//   };

//   const filteredAndSorted = useMemo(() => {
//     let filtered = [...applications];

//     if (searchTerm) {
//       const lower = searchTerm.toLowerCase();
//       filtered = filtered.filter(app => {
//         const name = getApplicantName(app.applicant).toLowerCase();
//         const email = app.applicant?.email?.toLowerCase() || "";
//         const job = (app.jobTitle || "Software Engineer").toLowerCase();
//         return name.includes(lower) || email.includes(lower) || job.includes(lower);
//       });
//     }

//     if (statusFilter !== "all") {
//       filtered = filtered.filter(app => app.status === statusFilter);
//     }

//     filtered.sort((a, b) => {
//       if (sortBy === "date-desc") return new Date(b.appliedAt) - new Date(a.appliedAt);
//       if (sortBy === "date-asc") return new Date(a.appliedAt) - new Date(b.appliedAt);
//       if (sortBy === "name") return getApplicantName(a.applicant).localeCompare(getApplicantName(b.applicant));
//       if (sortBy === "status") return a.status.localeCompare(b.status);
//       return 0;
//     });

//     return filtered;
//   }, [applications, searchTerm, statusFilter, sortBy]);

//   const paginated = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredAndSorted, currentPage]);

//   const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

//   if (status === "loading" || loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
//           <p className="text-2xl font-semibold text-slate-700">Loading applications...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md">
//           <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h2>
//           <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10 relative">
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
//             <Sparkles className="w-80 h-80 text-indigo-400 animate-pulse" />
//           </div>
//           <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
//             Admin Dashboard
//           </h1>
//           <p className="mt-3 text-lg text-slate-600">Next-Gen Application Management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
//           {STATUS_OPTIONS.map((stat) => {
//             const Icon = stat.icon;
//             const count = applications.filter(a => a.status === stat.value).length;
//             return (
//               <div
//                 key={stat.value}
//                 className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 text-center transition-transform hover:scale-105"
//               >
//                 <div className={`w-16 h-16 ${stat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md`}>
//                   <Icon className="w-8 h-8" />
//                 </div>
//                 <p className="text-3xl font-bold text-slate-800">{count}</p>
//                 <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Controls */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 mb-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search name, email, job..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//               />
//             </div>

//             <select
//               value={statusFilter}
//               onChange={(e) => {
//                 setStatusFilter(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="all">All Status</option>
//               {STATUS_OPTIONS.map(opt => (
//                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//               ))}
//             </select>

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//             >
//               <option value="date-desc">Newest First</option>
//               <option value="date-asc">Oldest First</option>
//               <option value="name">Name A-Z</option>
//               <option value="status">Status</option>
//             </select>

//             <div className="flex items-center justify-start sm:justify-end text-slate-600">
//               <span className="font-medium text-lg">{filteredAndSorted.length}</span>
//               <span className="ml-2 hidden sm:inline">applications</span>
//             </div>
//           </div>
//         </div>

//         {/* Applications List */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
//           <div className="p-6 border-b border-slate-200">
//             <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
//               <Briefcase className="w-9 h-9 text-indigo-600" />
//               Applications ({filteredAndSorted.length})
//             </h2>
//           </div>

//           {paginated.length === 0 ? (
//             <div className="p-16 sm:p-24 text-center">
//               <Users className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300 mx-auto mb-6" />
//               <p className="text-xl sm:text-2xl text-slate-500">No applications match your filters</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-slate-200">
//               {paginated.map(app => {
//                 const statusInfo = getStatusInfo(app.status);
//                 const StatusIcon = statusInfo.icon;
//                 const applicantName = getApplicantName(app.applicant);

//                 return (
//                   <div
//                     key={app._id}
//                     className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-purple-50/30 transition-all duration-300"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
//                       {/* Applicant Info */}
//                       <div className="md:col-span-4 flex items-center gap-4">
//                         <div className="relative flex-shrink-0">
//                           <img
//                             src={app.applicant?.image || "/default-avatar.png"}
//                             alt={applicantName}
//                             className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-slate-900">{applicantName}</h3>
//                           <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
//                             <Mail className="w-4 h-4" />
//                             {app.applicant?.email || "—"}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Job & Date */}
//                       <div className="md:col-span-3">
//                         <p className="font-medium text-slate-800">{app.jobTitle || "Software Engineer"}</p>
//                         <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
//                           <Calendar className="w-4 h-4" />
//                           {new Date(app.appliedAt).toLocaleDateString(undefined, {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </p>
//                       </div>

//                       {/* Status */}
//                       <div className="md:col-span-2">
//                         <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${statusInfo.color} font-medium shadow-sm`}>
//                           <StatusIcon className="w-5 h-5" />
//                           {statusInfo.label}
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="md:col-span-3 flex flex-wrap items-center gap-3 justify-start md:justify-end">
//                         <Link
//                           href={`/profile?email=${encodeURIComponent(app.applicant?.email || '')}`}
//                           target="_blank"
//                           className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                         >
//                           <Eye className="w-4 h-4" />
//                           Profile
//                         </Link>

//                         {app.applicant?.hasResume && (
//                           <a
//                             href={`/api/profile/resume?email=${encodeURIComponent(app.applicant?.email || '')}`}
//                             download
//                             className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
//                           >
//                             <Download className="w-4 h-4" />
//                             Resume
//                           </a>
//                         )}

//                         <button
//                           onClick={() => sendInterviewEmail(app._id, app.applicant?.email, applicantName, app.jobTitle)}
//                           disabled={sendingEmailId === app._id}
//                           className="px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
//                         >
//                           <Send className="w-4 h-4" />
//                           {sendingEmailId === app._id ? "Sending..." : "Interview Email"}
//                         </button>

//                         <select
//                           value={app.status}
//                           onChange={(e) => confirmStatusChange(app._id, e.target.value)}
//                           disabled={updatingId === app._id}
//                           className="px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition cursor-pointer"
//                         >
//                           {STATUS_OPTIONS.map(opt => (
//                             <option key={opt.value} value={opt.value}>
//                               {opt.label}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50/20 to-purple-50/20">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                 disabled={currentPage === 1}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 <ChevronLeft className="w-5 h-5" /> Previous
//               </button>

//               <span className="text-slate-700 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                 disabled={currentPage === totalPages}
//                 className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
//               >
//                 Next <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {pendingStatusChange && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
//           <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/50">
//             <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm Status Change</h3>
//             <p className="text-slate-600 mb-8">
//               Mark this application as{" "}
//               <span className={`font-bold ${pendingStatusChange.newStatus === "hired" ? "text-green-600" : "text-red-600"}`}>
//                 {pendingStatusChange.newStatus === "hired" ? "Hired" : "Rejected"}
//               </span>?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setPendingStatusChange(null)}
//                 className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => updateStatus(pendingStatusChange.appId, pendingStatusChange.newStatus)}
//                 className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition ${
//                   pendingStatusChange.newStatus === "hired"
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
//                     : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
//                 }`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import {
  Briefcase,
  Users,
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Send,
} from "lucide-react";
import Link from "next/link";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  { value: "shortlisted", label: "Shortlisted", color: "bg-blue-100 text-blue-800", icon: UserCheck },
  { value: "interview", label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  { value: "hired", label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
];

const ITEMS_PER_PAGE = 10;

export default function AdminApplications() {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [sendingEmailId, setSendingEmailId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com";

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !isAdmin) {
      window.location.href = "/signin";
      return;
    }
    fetchApplications();
  }, [status, session]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();

      // Normalize status values (very important fix)
      const normalizedApplications = data.map(app => ({
        ...app,
        status: (app.status || "pending").toLowerCase().trim()
      }));

      setApplications(normalizedApplications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const confirmStatusChange = (appId, newStatus) => {
    if (newStatus === "rejected" || newStatus === "hired") {
      setPendingStatusChange({ appId, newStatus });
    } else {
      updateStatus(appId, newStatus);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    if (updatingId) return;
    setUpdatingId(appId);

    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId, status: newStatus }),
      });

      if (res.ok) {
        setApplications(prev =>
          prev.map(app =>
            app._id === appId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        const error = await res.json();
        alert(`Failed to update: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    } finally {
      setUpdatingId(null);
      setPendingStatusChange(null);
    }
  };

  const sendInterviewEmail = async (appId, applicantEmail, applicantName, jobTitle) => {
    if (sendingEmailId) return;
    setSendingEmailId(appId);

    try {
      // First update status to "interview"
      const statusRes = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: appId, status: "interview" }),
      });

      if (!statusRes.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state immediately
      setApplications(prev =>
        prev.map(app =>
          app._id === appId ? { ...app, status: "interview" } : app
        )
      );

      // Get applicant profile for name
      const profileRes = await fetch(`/api/profile?email=${encodeURIComponent(applicantEmail)}`);
      if (!profileRes.ok) throw new Error("Profile not found");
      const profile = await profileRes.json();

      const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.name || applicantName || "Candidate";

      // Send interview email
      const emailRes = await fetch("/api/admin/send-interview-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: applicantEmail,
          name: fullName,
          jobTitle: jobTitle || "Software Engineer",
        }),
      });

      if (emailRes.ok) {
        alert("Interview invitation sent successfully! 🎉 Status updated to 'Interview Scheduled'.");
      } else {
        const data = await emailRes.json();
        alert(`Failed to send email: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email");
    } finally {
      setSendingEmailId(null);
    }
  };

  const getStatusInfo = (status) => {
    const normalized = (status || "pending").toLowerCase().trim();
    return (
      STATUS_OPTIONS.find(opt => opt.value === normalized) || {
        value: "unknown",
        label: "Unknown",
        color: "bg-gray-100 text-gray-800",
        icon: Clock,
      }
    );
  };

  const getApplicantName = (applicant) => {
    if (applicant?.firstName || applicant?.lastName) {
      return `${applicant.firstName || ''} ${applicant.lastName || ''}`.trim();
    }
    return applicant?.name || "Candidate";
  };

  const filteredAndSorted = useMemo(() => {
    let filtered = [...applications];

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(app => {
        const name = getApplicantName(app.applicant).toLowerCase();
        const email = app.applicant?.email?.toLowerCase() || "";
        const job = (app.jobTitle || "Software Engineer").toLowerCase();
        return name.includes(lower) || email.includes(lower) || job.includes(lower);
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === "date-desc") return new Date(b.appliedAt) - new Date(a.appliedAt);
      if (sortBy === "date-asc") return new Date(a.appliedAt) - new Date(b.appliedAt);
      if (sortBy === "name") return getApplicantName(a.applicant).localeCompare(getApplicantName(b.applicant));
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

    return filtered;
  }, [applications, searchTerm, statusFilter, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSorted.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSorted, currentPage]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-indigo-600 mx-auto mb-6"></div>
          <p className="text-2xl font-semibold text-slate-700">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Denied</h2>
          <p className="text-lg text-slate-600">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50 py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <Sparkles className="w-80 h-80 text-indigo-400 animate-pulse" />
          </div>
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-lg text-slate-600">Next-Gen Application Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {STATUS_OPTIONS.map((stat) => {
            const Icon = stat.icon;
            const count = applications.filter(a => a.status === stat.value).length;
            return (
              <div
                key={stat.value}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 text-center transition-transform hover:scale-105"
              >
                <div className={`w-16 h-16 ${stat.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md`}>
                  <Icon className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{count}</p>
                <p className="text-sm font-medium text-slate-600 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, job..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-11 pr-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="status">Status</option>
            </select>

            <div className="flex items-center justify-start sm:justify-end text-slate-600">
              <span className="font-medium text-lg">{filteredAndSorted.length}</span>
              <span className="ml-2 hidden sm:inline">applications</span>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <Briefcase className="w-9 h-9 text-indigo-600" />
              Applications ({filteredAndSorted.length})
            </h2>
          </div>

          {paginated.length === 0 ? (
            <div className="p-16 sm:p-24 text-center">
              <Users className="w-24 h-24 sm:w-32 sm:h-32 text-slate-300 mx-auto mb-6" />
              <p className="text-xl sm:text-2xl text-slate-500">No applications match your filters</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {paginated.map(app => {
                const statusInfo = getStatusInfo(app.status);
                const StatusIcon = statusInfo.icon;
                const applicantName = getApplicantName(app.applicant);
                const isRejected = app.status === "rejected";

                return (
                  <div
                    key={app._id}
                    className="p-6 hover:bg-gradient-to-r hover:from-indigo-50/40 hover:to-purple-50/30 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Applicant Info */}
                      <div className="md:col-span-4 flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={app.applicant?.image || "/default-avatar.png"}
                            alt={applicantName}
                            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{applicantName}</h3>
                          <p className="text-sm text-slate-600 flex items-center gap-2 mt-1">
                            <Mail className="w-4 h-4" />
                            {app.applicant?.email || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Job & Date */}
                      <div className="md:col-span-3">
                        <p className="font-medium text-slate-800">{app.jobTitle || "Software Engineer"}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(app.appliedAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2">
                        <div className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${statusInfo.color} font-medium shadow-sm`}>
                          <StatusIcon className="w-5 h-5" />
                          {statusInfo.label}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-3 flex flex-wrap items-center gap-3 justify-start md:justify-end">
                        <Link
                          href={`/profile?email=${encodeURIComponent(app.applicant?.email || '')}`}
                          target="_blank"
                          className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Profile
                        </Link>

                        {app.applicant?.hasResume && (
                          <a
                            href={`/api/profile/resume?email=${encodeURIComponent(app.applicant?.email || '')}`}
                            download
                            className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Resume
                          </a>
                        )}

                        {/* Only show email button if NOT rejected */}
                        {!isRejected && (
                          <button
                            onClick={() => sendInterviewEmail(app._id, app.applicant?.email, applicantName, app.jobTitle)}
                            disabled={sendingEmailId === app._id}
                            className="px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
                          >
                            <Send className="w-4 h-4" />
                            {sendingEmailId === app._id ? "Sending..." : "Interview Email"}
                          </button>
                        )}

                        <select
                          value={app.status}
                          onChange={(e) => confirmStatusChange(app._id, e.target.value)}
                          disabled={updatingId === app._id}
                          className="px-4 py-3 bg-white border border-slate-300 rounded-xl font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition cursor-pointer"
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-50/20 to-purple-50/20">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>

              <span className="text-slate-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-5 py-3 bg-white/80 rounded-xl shadow-md disabled:opacity-50 flex items-center gap-2 hover:bg-white transition"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingStatusChange && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-white/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Confirm Status Change</h3>
            <p className="text-slate-600 mb-8">
              Mark this application as{" "}
              <span className={`font-bold ${pendingStatusChange.newStatus === "hired" ? "text-green-600" : "text-red-600"}`}>
                {pendingStatusChange.newStatus === "hired" ? "Hired" : "Rejected"}
              </span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPendingStatusChange(null)}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 rounded-xl font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={() => updateStatus(pendingStatusChange.appId, pendingStatusChange.newStatus)}
                className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition ${
                  pendingStatusChange.newStatus === "hired"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}